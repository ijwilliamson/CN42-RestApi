const {Router} = require ('express');

const {loginUser} = require('./authController');

const {checkPass} = require('../middleware/authentication')

const authRouter = Router();

authRouter.post('/auth', checkPass, loginUser);

module.exports = authRouter;

