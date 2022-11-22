const { DataTypes, STRING } = require ('sequelize');
const {sequelize } = require( '../db/connection');

const User = sequelize.define('User', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    username : {
        type: DataTypes.STRING,
        unique:true,
        require: true
    },
    passwordHash : {
        type: DataTypes.STRING,
        require: true
    },
    email : {
        type: DataTypes.STRING,
        require: true
    }

},{
    timestamps: false
});
module.exports = User;

