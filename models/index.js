// créer les relations et  les models

//import sequlize and schema
const Sequelize = require('sequelize')
const db = require('../config/database')
const EmployeModel = require('./Employe')
const SocieteModel = require('./Societe')
const SocieteEmploye = db.define('societe_employe')

//create models
const Employe = EmployeModel(db,Sequelize)
const Societe = SocieteModel(db,Sequelize)


//define relationships
Societe.hasMany(Employe)
Employe.belongsTo(Societe)



// generate tables in DB
db.sync().then(() => {
    console.log('Tables created ');
})

module.exports = {
    Employe,
    Societe


}