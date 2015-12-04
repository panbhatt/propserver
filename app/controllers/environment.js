var mongoose = require('mongoose');
var _ = require('underscore') ;
var ProjectModel = mongoose.model('Project') ;
var ReleaseModel = mongoose.model('Release') ;
var PropGroupModel = mongoose.model('PropGroup') ;
var EnvironmentModel = mongoose.model('Environment') ;

/**
 * @swagger
 * resourcePath: /ENVS
 * description: Performs various operations related to the Environment entity maintained in the system at global level.
 */

/**
 * @swagger
 * path: /envs
 * operations:
 *   -  httpMethod: GET
 *      summary: List all the environments being maintained in the system. 
 *      notes: List all the environments being maintained in the system. 
 *      nickname: List_Environment
 *      produces: 
 *        - application/json
 *      responseMessages:
 *        - code: 200
 *          message : Environments List
 *        - code: 500
 *          message : Error with the description.
 */


module.exports.getAll = 
    
     function(req,res,next) {
        
        EnvironmentModel.list(function(err, envList) {
            res.json(envList); 
        });
    };
    
/**
 * @swagger
 * path: /envs
 * operations:
 *   -  httpMethod: POST
 *      summary: Add a new Environment in the system. 
 *      notes: Add a new Environment in the system. 
 *      nickname: ADD_Environment
 *      consumes:
 *        - application/json
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: body
 *          description: JSON document having keys "name" & "desc"
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
            EnvironmentModel.single(body.name, function(err, result){
                if(!err && !result) {
                    // It means neither Error and Result is also null
                    EnvironmentModel.insert(body.name,body.desc,function(err,prj){
                          if(!err)      {
                              res.status(201).json({ "success" : "created"});
                          }
                              
                    });
                }  else {
                    res.status(500).json({"error" : "Environment already exists. "}) ;
                }          

            });
            
        } else {
            res.status(500).json({ "error" : "Either Body is not present or the Environment name is missing. "}) ;
        }
        
    };

/**
 * @swagger
 * path: /envs/{envName}
 * operations:
 *   -  httpMethod: GET
 *      summary: List A Single Environment
 *      notes: List A Single Environment Detail
 *      nickname: List_Environment_Detail
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: envName
 *          description: Environment Name
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Environments List
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.get =
    
     function(req,res,next){
        var envName = req.params.envName; 
        EnvironmentModel.single(envName,function(err, result) {
            if(!err && result)  {
                res.json(result) ;
            } else {
                res.status(404).json({"error" : "Not Found"}) ;
            }
        });
        
    }
    


