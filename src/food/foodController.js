const Food = require("./foodModel");

exports.createFood = async(request, response) =>{
    try {
        const newFood = await Food.Food.create(request.body);
        response.status(201).send({food: newFood.name});


    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}