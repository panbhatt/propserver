var mongoose = require('mongoose');
var _ = require('underscore') ;
var ProjectModel = mongoose.model('Project') ;
var ReleaseModel = mongoose.model('Release') ;
var PropGroupModel = mongoose.model('PropGroup') ;
var EnvironmentModel = mongoose.model('Environment') ;


/**
 * @swagger
 * resourcePath: /PROJECTS
 * description: Performs various operations related to the PROJECT entity maintained in the system.
 */

/**
 * @swagger
 * path: /projects
 * operations:
 *   -  httpMethod: GET
 *      summary: List all the projects being maintained in the system. 
 *      notes: List all the projects being maintained in the system. 
 *      nickname: List_Project
 *      produces: 
 *        - application/json
 *      responseMessages:
 *        - code: 200
 *          message : Projects List
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.getAll = 
    
     function(req,res,next) {
        
        ProjectModel.list(function(err, prjList) {
            res.json(prjList); 
        });
    };

/**
 * @swagger
 * path: /projects
 * operations:
 *   -  httpMethod: POST
 *      summary: Add a new Project in the system
 *      notes: Add a new Project in the system
 *      nickname: ADD_Project
 *      consumes:
 *        - application/json
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: body
 *          description: JSON document having "name" as the attribute. 
 *          paramType: body
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 201
 *          message: Signals, that the Entity has been created in the system.
 *        - code: 200
 *          message : Not Returned.
 *        - code: 400
 *          message : Body Format is not correct.
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.add = 
    
     function(req,res,next){
        var body = req.body;
        if(body && body.name) {
            ProjectModel.single(body.name, function(err, result){
                if(!err && !result) {
                    // It means neither Error and Result is also null
                    ProjectModel.insert(body.name,function(err,prj){
                          if(!err)      {
                              res.status(201).json({ "success" : "created"});
                          }
                              
                    });
                }  else {
                    res.status(500).json({"error" : "Project already exists. "}) ;
                }          

            });
            
        } else {
            res.status(500).json({ "error" : "Either Body is not present or the projeect name is missing. "}) ;
        }
        
    };

/**
 * @swagger
 * path: /projects/{prjName}
 * operations:
 *   -  httpMethod: GET
 *      summary: List the current project details
 *      notes: List the current project details
 *      nickname: List_Project_Single
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Project Details
 *        - code: 500
 *          message : Error with the description.
 *        - code: 404
 *          message : Not Found.
 */
module.exports.get = 
    
     function(req,res,next){
        var projName = req.params.prjName; 
        ProjectModel.single(projName,function(err, result) {
            if(!err && result)  {
                res.json(result) ;
            } else {
                res.status(404).json({"error" : "Not Found"}) ;
            }
        });
        
    };
    


