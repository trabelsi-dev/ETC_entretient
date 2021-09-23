const express = require("express")
const router = express.Router()
const { Employe,Societe } = require("../models")








const multer = require("multer");
const { application } = require("express");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
        
    }
})

const upload = multer({storage,storage});



/**
 * @swagger
 * /api/getEmploye:
 *  get:
 *    description: get all employees
 *    tags:
 *      - employe
 *    summary: "get all employes"
 *    parametrs:
 *      - in: body
 *        name: employe
 *        schema:
 *          type: object
 *        properties:
 *           id:
 *             type: integer
 *           name:
 *             type: string
 *           image:
 *             type: string
 *           cv: 
 *             type: string
 *           societeId:
 *             type: integer
 *    responses:
 *      '200':
 *        description: Asucessful response
 *      '500':
 *        description: Internal server error
 *      '400':
 *        description: Bad request
 */

     router.get('/getEmploye',(req,res) => {
        Employe.findAll({
          include: [
            {
              model: Societe,
            }
          ]


        }).then(employe => {
          const resObj = employe.map(soc => {
            //console.log(soc.societeId);

            return Object.assign(
              
              {},
              {
                
                id: soc.id,
                name: soc.name,
                image: soc.image,
                cv: soc.cv,
                societeId: soc.societeId,
                
                societe: [soc.societeId].map(societe =>{
                  //console.log(societe);
                  return Object.assign(
                    {
                      name: soc.societe.name,
                      adresse: soc.societe.adresse,
                    }
                  )
                })


               
                
           

              }
            )
          })
        res.json(resObj)
      });
    });



    
 /**
 * @swagger
 * /api/addEmploye:
 *   post:
 *      description: créer employe
 *      tags:
 *          - employe
 *      summary: "add employe"
 *      parameters:
 *          - in: formData
 *            name: name
 *            type: string
 *            required: true
 *            description: nom d'employe
 * 
 *          - in: formData
 *            name: image
 *            type: file
 *            required: true
 *            description: upload image
 *          
 *          - in: formData
 *            name: cv
 *            type: file
 *            required: true
 *            description: upload cv
 *          - in: formData
 *            name: societeId
 *            type: integer
 *            description: met societeId
 *
 *              
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

    router.post('/addEmploye',upload.fields([{name:'image'},{name:'cv'}]), (req,res) => {
      res.json({
        success:true,
        message:'image uploaded',
      
      });
      console.log(req.body);
     console.log(req.files.image[0].filename);
      const employe = new Employe({
      name:req.body.name,
      image:req.files.image[0].filename,
      cv:req.files.cv[0].filename,
      societeId:req.body.societeId


      })
     //let image = req.file.filename
     
     employe.save().then(employe => {
        res.json(employe)
      })
      .catch((e) => res.json(e.message))
    })



 /**
 * @swagger
 * /api/employe/delete/{id}:
 *   delete:
 *      description: delete employe byId 
 *      tags:
 *          - employe
 *      summary: "delete employe byId"
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
router.delete("/employe/delete/:id", (req, res) => {
  Employe.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});



/**
 * @swagger
 * /api/employe/edit:
 *       put:
 *        description: NB pour modifier l'employe dans l'interface de swagger il faut remplir image et cv pour eviter error.Ensuite dans le partie front-end on peut évitera cette difficulte . 
 *        tags:
 *            - employe
 *        summary: "update employe"
 *        parameters:
 *            - in: formData
 *              name: name
 *              type: string
 *              description: update nom de l'employe 
 *            - in: formData
 *              name: image
 *              type: file
 *              description: updatae image
 *            - in: formData
 *              name: cv
 *              type: file
 *              description: update cv
 *            - in: formData
 *              name: id
 *              type: integer
 *              required: true
 *              description: id d'utilisateur que va le modifier
 *            - in: formData
 *              name: societeId
 *              type: integer
 *              description: update societeId
 *       

 *                  
 *        responses:
 *            '200':
 *              description: Resource added successfully
 *            '500':
 *              description: Internal server error
 *            '400':
 *              description: Bad request
 */
router.put("/employe/edit",upload.fields([{name:'image'},{name:'cv'}]), (req, res) => {
  Employe.update(
    {
      name: req.body.name,
      image:req.files.image[0].filename,
      cv:req.files.cv[0].filename,
      societeId:req.body.societeId
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});




module.exports = router