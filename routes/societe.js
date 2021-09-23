const express = require("express")
const router = express.Router()
const { Employe,Societe } = require("../models")



/**
 * @swagger
 * /api/getSocietes:
 *  get:
 *    description: get all Societes
 *    tags:
 *      - societe
 *    summary: get all Societes
 *    responses:
 *      '200':
 *        description: Asucessful response
 *      '500':
 *        description: Internal server error
 *      '400':
 *        description: Bad request
 */

 router.get('/getSocietes', (req, res) => {

  Societe.findAll({

    include: [

      {

        model: Employe,

      }

    ]

  }).then(societe => {

    const resObj = societe.map(soc => {

      //console.log(soc);

      //tidy up the user data

      return Object.assign(

        {},

        {

          id: soc.id,

          name: soc.name,

          adresse: soc.adresse,

          employees: soc.employees.map(user => {


            //tidy up the post data
            //console.log(user);
            return Object.assign(

              {},

              {

                id: user.id,

                name: user.name,


              }

              )

          })

        }

      )

    });

    res.json(resObj)

  });

});

/*
router.get('/getSocietes',(req,res) => {
  
  Societe.findAll().then(societes => {
  res.json(societes)
})
})
  */

/**
 * @swagger
 * /api/getSociete/{societeId}:
 *  get:
 *    description: get  societe ById
 *    tags:
 *       - societe 
 *    summary: get societe by id
 *    parameters:
 *    - in: path
 *      name: societeId
 *    
 *      
 *      schema:
 *          type:integer
 *    responses:
 *      200:
 *       description: A sucessful response
 *      500:
 *       description: Internal server error
 *      400:
 *       description: Bad error
 *      
 *      
 */


 
    router.get('/getSociete/:societeId?',(req,res) => {
        let params = req.params
        let query
        if(params.societeId){
            query = Societe.findOne({ where: { id: params.societeId } })
        }else {
            query = Societe.findAll()
        }
        query.then(r => res.json(r))
   
    })


 

 /**
 * @swagger
 * /api/addSociete:
 *   post:
 *      description: créer societe
 *      tags:
 *          - societe
 *      summary: créer societe
 *      parameters:
 *          - in: body
 *            name: Societe
 *            description: Societe data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - adresse
 *                 - employeesId
 *                 
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  adresse:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: sousse
 *                  employeesId:
 *                      type: array
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: [1,2]
 *                  
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */


    router.post('/addSociete',(req,res) => {
     
      console.log(req.body);
      const societe = new Societe({
      name:req.body.name,
      adresse:req.body.adresse,
      employeesId:req.body.employeesId,
      
      })
     //let image = req.file.filename
     
     societe.save().then(societe => {
        res.json(societe)
      })
      .catch((e) => res.json(e.message))
    })
     

    
 /**
 * @swagger
 * /api/societe/delete/{id}:
 *   delete:
 *      description: delete Societe byId 
 *      tags:
 *          - societe
 *      summary: delete societe byId
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Societe id
 *            schema:
 *              type: integer
 *            
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
    router.delete("/societe/delete/:id", (req, res) => {
      Societe.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => res.send("success"));
    });


    //edit


/**
 * @swagger
 * /api/societe/edit:
 *   put:
 *      description: edit societe
 *      tags:
 *          - societe
 *      summary: edit societe byId
 *      parameters:
 *          - in: body
 *            name: Societe
 *            description: Societe data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - adresse
 *                 - employeesId
 *                 - id
 *                 
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  adresse:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: sousse
 *                  employeesId:
 *                      type: array
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: [1,2]
 *                  id:
 *                      type: number
 *                      
 *                  
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.put("/societe/edit",(req, res) => {
  Societe.update(
    {
      name:req.body.name,
      adresse:req.body.adresse,
      employeesId:req.body.employeesId,
      
      
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});



/*

router
  .route('/societe/:societeId/employe')
    .get((req,res) => {
        Societe.findAll({
        where: {id: req.params.societeId},
        include: [Employe]
      })
      .then(result => {
        res.json(result)
      })
    })

*/

module.exports = router