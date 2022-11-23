const User = require("./userModel");
const Food = require("../food/foodModel");

exports.createUser = async(request, response) => {
    try {
        const newUser = await User.create(request.body,
            );
        
        if (request.body.food.length>0){

            for (const food of request.body.food){
                 //get food id or insert new food
        
                 let foodId =  await Food.Food.findOne({where: {name: food.name}});
                
                 if (!foodId)
                 {
                    const newFood =  await Food.Food.create({name: food.name});
                     foodId = newFood.id;
                 }
                 
                 //Add the food to the user
                 newUser.addFood(foodId);
            }
        }

        response.status(201).send({ user: newUser.username });
        
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}



exports.readUsers = async(request, response) => {
    // TODO: only available to administrator
    // readUsers must not return the passwordHash
    // use attributes in the sequelize method to specify fields
    try {


        // Query including associated many to many relationship
        // include runs a eager load of the Food items associated
        // through specifies the through table, here, attributes
        // as an empty array specifies no fields from the through
        // table

        //an alternative is User.findAll({ include: {all: true}});

        let users = await User.findAll({
        attributes: ['id', 'username', 'email'],
        include: {
            model: Food.Food,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }}});
        
        response.status(200).send({users: users});
        console.log(users);

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.readOneUser = async(request, response) => {

    //TODO: only read all records from the current user.
    // readUsers must not return the passwordHash
    // use attributes in the sequelize method to specify fields

    try {
        const user = await User.findByPk(
            request.params.id,
            {
                attributes: ['id', 'username', 'email'],
                include: {
                    model: Food.Food,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }}
        });
        response.status(200).send({user: user});
        console.log(user);

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.updateUser = async(request, response) => {

    //TODO: only update if the current user is to be updated
    //or the userId is 1 (admin)

    try {
        await User.update(
            reduceObject(request.body),
            {where: {id: request.params.id}}
        )
        const user = await User.findByPk(
            request.params.id,{
            attributes:['id', 'username', 'email']});
        response.status(200).send({"user": user });   

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.deleteUser = async(request, response) => {

    //TODO: only delete if the current user is to be deleted

    try {
        await User.destroy({
            where: {id: request.params.id}});
        response.status(200).send({"status": "user deleted"})
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

const reduceObject = (obj) => {

    //remove any keys when the value is null
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    let modifiedObj = obj;

    // loop through the values and remove the key from modifiedMovie
    // if the value is falsy.
    for(let i=keys.length; i>=0; i--){
        if (!values[i]){
            let {[keys[i]]: unused, ...tempObj} = modifiedObj;
            modifiedObj = tempObj;
        }
    }

    return modifiedObj;

}

