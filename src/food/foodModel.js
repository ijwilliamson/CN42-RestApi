const { DataTypes, STRING } = require ('sequelize');
const {sequelize } = require( '../db/connection');
const User = require('../user/userModel');


const Food = sequelize.define('Food', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    name: {
        type: DataTypes.STRING,
        required: true,
        unique:true}
    },
    {timestamps: false}
);

const UserFood = sequelize.define('UserFood', {
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    FoodId: {
        type: DataTypes.INTEGER,
        references: {
            model: Food,
            key: 'id'
        }
    }
}, {timestamps: false});


module.exports = {Food, UserFood};