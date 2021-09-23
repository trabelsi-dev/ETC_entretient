// require modules
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

// require routers
const employeesRouter = require('./routes/employe')
const societesRouter = require('./routes/societe')

// create our app
const app = express()
const port = process.env.port || 5000




app.use(bodyParser.json());

/** Swagger Initialization - START */
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      title: "ETC Oussama Trabelsi api",
      description: "API documentation",
      contact: {
        name: "Developer",
      },
      servers: ["http://localhost:5000/"],
    },
  }),
  apis: ["index.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
/** Swagger Initialization - END */

//config app to use bodyparser 
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//require the connection (DB)

const db = require('./config/database')





// register our routes
app.use('/api/',employeesRouter)
app.use('/api/',societesRouter)

//test connection 
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//start server 
app.listen(port,()=> console.log(`server running on port ${port}`))