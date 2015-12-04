var mongoose = require('mongoose');
var _ = require('underscore') ;
var ProjectModel = mongoose.model('Project') ;
var ReleaseModel = mongoose.model('Release') ;
var PropGroupModel = mongoose.model('PropGroup') ;
var EnvironmentModel = mongoose.model('Environment') ;

/**
 * @swagger
 * resourcePath: /RELEASE
 * description: Perform various operations on the RELEASE available to on a project in the system.
 */

/**
 * @swagger
 * path: /projects/{prjName}/release
 * operations:
 *   -  httpMethod: GET
 *      summary: list all the releases present under a given project. 
 *      notes: Get All release of the project
 *      nickname: List_Project_Release
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
 *          message : Successfully returns all the releases of the project
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.getAll =   
    
    function(req,res,next) {
        var prjName = req.params.prjName; 
        ReleaseModel.list(prjName, function(err, envList) {
            res.json(envList); 
        });
    };

/**
 * @swagger
 * path: /projects/{prjName}/release
 * operations:
 *   -  httpMethod: POST
 *      summary: Add a new release for an Project. 
 *      notes: Add a new release for an Project. 
 *      nickname: ADD_Project_Release
 *      consumes:
 *        - application/json
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: body
 *          description: JSON document with Keys "release" & "desc" . Release No, it can be like 0.1 or v1.0.0
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
        var prjName = req.params.prjName; 
        var body = req.body;
        if(body && body.release) {
            ReleaseModel.single(prjName, body.release, function(err, result){
                if(!err && !result) {
                    // It means neither Error and Result is also null
                   var rel = {
                       "projectName" : prjName,
                       "release" : body.release,
                       "desc" : body.desc
                   }; ReleaseModel.insert(rel,function(err,prj){
                          if(!err)      {
                              res.status(201).json({ "success" : "created"});
                          }
                              
                    });
                }  else {
                    res.status(500).json({"error" : "Release already exists for this project. "}) ;
                }          

            });
            
        } else {
            res.status(500).json({ "error" : "Either Body is not present or the Release name is missing. "}) ;
        }
        
    }; 
    
/**
 * @swagger
 * path: /projects/{prjName}/release/{release}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Details of an specific release of a project 
 *      notes: Get Details of an specific release of a project 
 *      nickname: GET_PROJECT_RELEASE_SPECIFIC
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: release
 *          description: Release like 0.0 or v1.0, semantic versioning is being preferred.
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Returns with the details of the release.
 *        - code: 404
 *          message : Not Found.
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.get  = 
    
      function(req,res,next){
        var prjName = req.params.prjName; 
        var release = req.params.release; 
        ReleaseModel.single(prjName, release,function(err, result) {
            if(!err && result)  {
                res.json(result) ;
            } else {
                res.status(404).json({"error" : "Not Found"}) ;
            }
        });
        
    }
    
    
    

