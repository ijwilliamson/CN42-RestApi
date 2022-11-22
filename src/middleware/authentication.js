const bcrypt = require('bcrypt');
const User = require('../user/userModel');
const jwt = require('jsonwebtoken');

exports.hashPass = async (request, response, next) =>{
    try {
        // Catch update and check for password
        if (request.method === "PUT"){

            if (!request.body.password){   
                next();
                return;
            }
        }

        // Catch missing password
        if (!request.body.password){
            response.status(500).send(
                {error: "a password is required"}
            );
            return;
        }
        // Hash the password and save back to request body
        request.body.passwordHash = await bcrypt.hash(
            request.body.password, 10);
        next();


    } catch (error) {
        console.log(error)

        response.status(500).send(
            {error: error.message})
    }
}

exports.checkPass = async (request, response, next) =>{
        
    try {
        request.body.authenticated = false;
        // check if both username and password exist
        if (!request.body.username 
            || !request.body.password){
            
            response.status(401).send({
            error: "Both the username and password are required"});
            return;

        }

        // attempt to get a user
        let user = await User.findOne({
            where: {username: request.body.username}
        });

        // if no user is found return with authenticaated false
        if(!user){
            //authentication is false
            next(); return;
        }

        //conpare password with passwordHash
        //true if matched
        const result = await bcrypt.compare(
            request.body.password,
            user.passwordHash)

        if(!result){
            //authentication is false
            next();return;
        }


        //authentication has succeded
        request.body.authenticated = true;
        request.user = user;

        //a new token is issued
        //token is issued with the id and username
        //as well as issue date so that it can become
        //invalid at after a specified time.
        request.token = await jwt.sign(
            {
                id: request.user.id,
                username: request.user.username,
                issued: new Date()
            },
             process.env.SECRET);

        next();

    } catch (error) {
        console.log(error)

        response.status(500).send(
            {error: error.message})
    }
}

exports.validateToken = async(request, response, next) =>{
    try {
        
        //does the authorization header exist?
        if (!request.header("Authorization"))
            {
                response.status(401).send({
                    status: "Not authorized, login required"
                });
                return;
            }

        const token = request.header("Authorization")
                        .replace("Bearer ", "");

        const decodedToken = await jwt.verify(
                    token, process.env.SECRET);
        


        //Check if the token has expired
        const timeout = 120 //life of token in seconds 
        
        if (isTokenExpired(
                new Date(decodedToken.issued),
                timeout))
            
        {
            console.log("token expired")
            response.status(401).send({
                status: "Not authorized, token expired, login required"
            });
            return;
        }
        
        //Check the user is valid
        // attempt to get a user
        let user = await User.findByPk(decodedToken.id);

        if(!user){
            response.status(401).send({
                status: "Not authorized, login required"
            });
            return;
        }

        console.log(decodedToken)

        request.isTokenValid = true;
        next();

    } catch (error) {
        console.log(error)

        response.status(500).send(
            {error: error.message})
    }
}



const isTokenExpired = (date, timeout) =>{
    //return true if Expired
    //timeout in milliseconds
    //date must be a Date

    const dateIssued = date.getTime();
    const now = new Date().getTime();
    
    return (dateIssued+(timeout*1000) < now) ? true : false;

}