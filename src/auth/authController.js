const User = require("../user/userModel");
const Food = require("../food/foodModel")
exports.loginUser = async (request, response) => {

    //note: the only process performed here is the response including
    //token and any logging of the user logged in. 

    try {

        if(request.body.authenticated){
            const user = await User.findByPk(
                request.user.id,
                {
                    attributes: ['id', 'username', 'email'],
                    
            });
            response.status(200).send({
                status: "Login sucessful",
                user: user,
                token: request.token
            })
        } else {
            response.status(401).send({
                status: "Username or password incorrect"
            })
        }
        
        console.log("logged in")

    } catch (error) {
        console.log(error);
        response.status(500).send(
            {error: error.message});
    }
}

