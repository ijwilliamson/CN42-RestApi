const Food = require("./foodModel");

exports.createFood = async(request, response) =>{
    try {
        const newFood = await Food.Food.create(request.body);
        response.status(201).send({food: newFood.name.toLowerCase()});


    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.deleteFood = async(request, response) =>{
    try {
        await Food.Food.destroy({
            where: {id: request.params.id}});
        response.status(200).send({"status": "food deleted"})
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.readFoods = async(request, response) =>{
    try {
        let foods = await Food.Food.findAll({});
        
        response.status(200).send({food: foods});
        console.log(foods);

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.readOneFood = async(request, response) => {

      try {
        const food = await Food.Food.findByPk(
            request.params.id);
        response.status(200).send({food: food});
        console.log(food);

    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}

exports.updateFood = async(request, response) => {
    try {
        // const updateFood = await Food.Food.create(request.body);
        await Food.Food.update(
            {name : request.body.name.toLowerCase()},
            {where: {id: request.params.id}}
        )
        const food = await Food.Food.findByPk(
            request.params.id);   
            response.status(200).send({"food": food });
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