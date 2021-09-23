module.exports = (db,type) => {

    return db.define('societes', {
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true

        },
        name: {
            type:type.STRING,
            allowNull:false
        },
        adresse: {
            type:type.STRING,
            allowNull:false
            
        },
        employeesId:{
           type:type.JSON,
            default:[]
        }
     
    })
}