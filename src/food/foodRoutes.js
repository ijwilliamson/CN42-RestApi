const { Router } = require("express");

const { createFood, deleteFood, readFoods, readOneFood, updateFood } = require("./foodController");

const foodRouter = Router();

//Routes

/**
 * @swagger
 * components:
 *  schemas:
 *      Food:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The foods Id
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The foods name
 *                  example: pizza
 *
 *      NewFood:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: The foods name
 *                  example: pizza
 *
 */

/**
 * @swagger
 * /foods:
 *  get:
 *      tags:
 *          -   food
 *      description: Use to get a list of foods
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Food'
 */

foodRouter.get("/foods", readFoods);

/**
 * @swagger
 * /foods/{id}:
 *  get:
 *      tags:
 *          -   food
 *      description: Use to get a single food
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          '200':
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Food'
 */
foodRouter.get("/foods/:id", readOneFood);

/**
 * @swagger
 * /foods:
 *  post:
 *      tags:
 *          -   food
 *      description: Use to create a new food
 *
 *      requestBody:
 *          description: Create a new food
 *
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewFood'
 *
 *      responses:
 *          201:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Food'
 *          405:
 *              description: Invalid input
 *
 *
 */
foodRouter.post("/foods", createFood);

/**
 * @swagger
 * /foods/{id}:
 *  delete:
 *      tags:
 *          -   food
 *      description: Use to delete a single food
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      responses:
 *          '200':
 *              description: A successful response
 *          '405': invalid input
 *
 *
 */
foodRouter.delete("/foods/:id", deleteFood);

/**
 * @swagger
 * /foods/{id}:
 *  put:
 *      tags:
 *          -   food
 *      description: Use to update a food
 *      parameters:
 *      -   in: path
 *          name: id
 *          schema:
 *              type: integer
 *          required: true
 *      requestBody:
 *          description: Update a  food
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewFood'
 *
 *      responses:
 *          201:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Food'
 *          405:
 *              description: Invalid input
 *
 *
 */
foodRouter.put("/foods/:id", updateFood);

module.exports = foodRouter;
