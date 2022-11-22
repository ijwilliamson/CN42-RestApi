require('dotenv').config();

const {Sequelize} = require ('sequelize');

exports.sequelize = new Sequelize(process.env.MYSQL_URI);



