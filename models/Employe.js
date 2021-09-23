module.exports = (db,type) => {

    return db.define('employees', {
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true

        },
        name: {
            type:type.STRING,
            allowNull:false
        },
        
        image: {
            type:type.STRING,
            //allowNull:false
        },
      
        cv: {
            type:type.STRING,
            
        }
    })
}