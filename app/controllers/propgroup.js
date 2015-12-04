var mongoose = require('mongoose');
var _ = require('underscore') ;
var ProjectModel = mongoose.model('Project') ;
var ReleaseModel = mongoose.model('Release') ;
var PropGroupModel = mongoose.model('PropGroup') ;
var EnvironmentModel = mongoose.model('Environment') ;

/**
 * @swagger
 * resourcePath: /PROPERTY_GROUP
 * description: Perform various operations on the Property Groups available to on a project in the system.
 */

/**
 * @swagger
 * path: /projects/{prjName}/propgroup
 * operations:
 *   -  httpMethod: GET
 *      summary: list all the propgroups present under a given project. 
 *      notes: list all the propgroups present under a given project. 
 *      nickname: List_Project_PROPGROUP
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
 *          message : Successfully returns all the propgroups of the project
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.getAll = 
    
    function(req,res,next) {
        var prjName = req.params.prjName; 
        PropGroupModel.list(prjName, function(err, result) {
            res.json(result); 
        });
    };
    
/**
 * @swagger
 * path: /projects/{prjName}/propgroup
 * operations:
 *   -  httpMethod: POST
 *      summary: Add a new propgroup for an Project. 
 *      notes: Add a new propgroup for an Project. 
 *      nickname: ADD_Project_PropGroup
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
 *          description: JSON document with Keys "groupName" & "desc"
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
        if(body && body.groupName) {
            PropGroupModel.single(prjName, body.groupName, function(err, result){
                if(!err && !result) {
                    // It means neither Error and Result is also null
                   var projGroup = {
                       "projectName" : prjName,
                       "groupName" : body.groupName,
                       "desc" : body.desc
                   }; 
                PropGroupModel.insert(projGroup,function(err,prj){
                          if(!err)      {
                              res.status(201).json({ "success" : "created"});
                          }
                              
                    });
                }  else {
                    res.status(500).json({"error" : "Prop Group already exists for this project. "}) ;
                }          

            });
            
        } else {
            res.status(500).json({ "error" : "Either Body is not present or the PropGroup name is missing. "}) ;
        }
        
    };

/**
 * @swagger
 * path: /projects/{prjName}/propgroup/{propGroup}
 * operations:
 *   -  httpMethod: GET
 *      summary: list a single propgroup present under a given project. 
 *      notes: list details of a single propgroup present under a given project. 
 *      nickname: List_Project_PROPGROUP_SINGLE
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: propGroup
 *          description: Name of the property Group
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Successfully returns all the propgroups of the project
 *        - code: 404
 *          message : Not Found
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.get =
    
     function(req,res,next){
        var prjName = req.params.prjName; 
        var propGroupName = req.params.propgroup; 
        PropGroupModel.single(prjName, propGroupName,function(err, result) {
            if(!err && result)  {
                res.json(result) ;
            } else {
                res.status(404).json({"error" : "Not Found"}) ;
            }
        });
        
    }
    
    
    


