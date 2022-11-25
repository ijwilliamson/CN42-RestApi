const { Router } = require ("express");

const {createFood, deleteFood, readFoods, readOneFood, updateFood} = require("./foodController");

const foodRouter = Router();

foodRouter.post('/foods', createFood);
foodRouter.get('/foods', readFoods);
foodRouter.get('/foods/:id', readOneFood)
foodRouter.delete('/foods/:id', deleteFood);
foodRouter.put('/foods/:id', updateFood);

module.exports = foodRouter;