// connection avec database on utilise orm sequelize 
   
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

//connect to database

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: "localhost",
    //port: "3307",
    dialect: "mysql",
    operatorAliases: false
  } 
)