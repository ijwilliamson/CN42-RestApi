
exports.validateNewUser = async (request, response, next) => {

    // checks stores an array of validations to perform
    // on a new user

    const checks = [validateEmail, validateUsername, validatePassword];

    for(let i=0; i<checks.length; i++){
        const result = checks[i](request);
        if (!result.status){
            response.status(400).send({error: result.msg });
            return;
        }
    };

    next();
}

exports.validateUserUpdate = async (request, response, next) => {

    let checks = [];

    if(request.email) checks.push(validateEmail);
    if(request.username) checks.push(validateUsername);
    if(request.password) checks.push(validatePassword);

    for(let i=0; i<checks.length; i++){
        const result = checks[i](request);
        if (!result.status){
            response.status(400).send({error: result.msg });
            return;
        }
    };

    next();

}

const validateUsername = (request) => {
//return an object {status: bool, msg: error}
    try {
            
        if(!request.body.username)
        {
            return({status:false, msg: "no username provided"})
        }
        
        const test = /^[a-zA-Z0-9]{8,}$/.test(request.body.username);
        if (!test)
        {
            return ({status:false, msg: "invalid username"});
        }

        return ({status:true})

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

const validatePassword = (request) => {
//return an object {status: bool, msg: error}
//Password must be min 8 char, one letter, one num, one special.
    try {
            
        if(!request.body.password)
        {
            return({status:false, msg: "no password provided"})
        }
        
        const test = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(request.body.password);
        if (!test)
        {
            return ({status:false, msg: "invalid password"});
        }

        return ({status:true})

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

const validateEmail = (request) => {
    //return an object {status: bool, msg: error}
    try {
        
        if(!request.body.email)
        {
            return({status:false, msg: "no email address provided"})
        }
        
        const test = /.+\@.+\..+/.test(request.body.email);
        if (!test)
        {
            return ({status:false, msg: "invalid email address"});

        }

        return ({status:true})

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}