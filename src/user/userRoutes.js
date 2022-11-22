const { Router } = require ("express");

const { createUser,
        readUsers,
        readOneUser,
        updateUser,
        deleteUser} = require("./userController");

const {hashPass, validateToken} = require('../middleware/authentication')

const userRouter = Router();

userRouter.post('/users', hashPass, createUser);
userRouter.get('/users', validateToken, readUsers);
userRouter.get('/users/:id', validateToken, readOneUser)
userRouter.put('/users/:id',validateToken, hashPass, updateUser)
userRouter.delete('/users/:id',validateToken, deleteUser);

module.exports = userRouter;
