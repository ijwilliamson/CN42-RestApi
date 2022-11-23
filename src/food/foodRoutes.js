const { Router } = require ("express");

const {createFood} = require("./foodController");

const foodRouter = Router();

foodRouter.post('/foods', createFood);

module.exports = foodRouter;