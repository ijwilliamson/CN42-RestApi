const { Router } = require ("express");

const { createUser,
        readUsers,
        readOneUser,
        updateUser,
        deleteUser,
        deleteFood} = require("./userController");

const {hashPass, validateToken} = require('../middleware/authentication');
const {validateNewUser, validateUserUpdate} = require('../middleware/validation')

const userRouter = Router();

userRouter.post('/users', validateNewUser, hashPass, createUser);
userRouter.get('/users', validateToken, readUsers);
userRouter.get('/users/:id', validateToken, readOneUser)
userRouter.put('/users/:id',validateToken, validateUserUpdate, hashPass, updateUser)
userRouter.delete('/users/:id',validateToken, deleteUser);
userRouter.delete('/users/:id/foods/:fid', validateToken, deleteFood)

module.exports = userRouter;
