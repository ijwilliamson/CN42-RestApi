// require("./db/connection");
const {sequelize } = require( './db/connection');
const express = require("express");
const userRouter = require('./user/userRoutes');
const authRouter = require('./auth/authRoutes');
const foodRouter = require('./food/foodRoutes');


const syncTables = async () => {
    sequelize.sync();
}



syncTables();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(foodRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});