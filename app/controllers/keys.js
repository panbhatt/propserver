var mongoose = require('mongoose');
var _ = require('underscore') ;
var ProjectModel = mongoose.model('Project') ;
var ReleaseModel = mongoose.model('Release') ;
var PropGroupModel = mongoose.model('PropGroup') ;
var EnvironmentModel = mongoose.model('Environment') ;
var KeysModel = mongoose.model('Keys') ;


/**
 * @swagger
 * resourcePath: /KEYS
 * description: Perform various operations on the RELEASE available to on a project in the system.
 */

/**
 * @swagger
 * path: /projects/{prjName}/env/{envName}/release/{releaseName}
 * operations:
 *   -  httpMethod: GET
 *      summary: list all the keys present for a PROJECT in A ENV Under a RELEASE for All PROPGROUP 
 *      notes: list all the keys present for a PROJECT in A ENV Under a RELEASE for All PROPGROUP 
 *      nickname: List_Project_KEYS
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: envName
 *          description: Environment
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: releaseName
 *          description: Release either v0.0 or 1.0.0
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: flatten
 *          description: Determine whether the result to be returned in a flat strucuture or not. 
 *          paramType: query
 *          required: false
 *          dataType: boolean
 *      responseMessages:
 *        - code: 200
 *          message : Successfully returns all the releases of the project
 *        - code: 404
 *          message : Not Found
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.getAllProperties =
    
       function(req,res,next) {
         var keysSearchCrieteria = {
             projectName : req.params.prjName,
             env : req.params.env,
             release : req.params.release,
        }
         
        KeysModel.list(keysSearchCrieteria, function(err, keysList) {
            var result;
            // This will flatten all the project properties of all the PropGroup.
            console.log(req.query.flatten) ;
            if(req.query.flatten && req.query.flatten.toLowerCase()  === "true") {
                
                result = {} ; 
                keysList.forEach(function(keysDetails){
                    for(var key in keysDetails.keys)  {
                        result[key] = keysDetails.keys[key] ;
                    }   
                });
            } else {
                result = [] ; 
                keysList.forEach(function(keysDetails) {
                    var obj = {} ; 
                    obj.groupName = keysDetails.groupName;
                    obj.keys = keysDetails.keys; 
                    obj.id = keysDetails._id;
                    result.push(obj);
                });
            }
            res.json(result); 
        });
    } ;
    
/**
 * @swagger
 * path: /projects/{prjName}/env/{envName}/release/{releaseName}/propgroup/{propGroup}
 * operations:
 *   -  httpMethod: POST
 *      summary: Add a set of keys to a PROJECT in A ENV Under a RELEASE for specific PROPGROUP 
 *      notes: Add a set of keys to a PROJECT in A ENV Under a RELEASE for specific PROPGROUP 
 *      nickname: ADD_PROJECT_KEYS
 *      produces: 
 *        - application/json
 *      consumes: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: envName
 *          description: Environment
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: releaseName
 *          description: Release either v0.0 or 1.0.0
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: propGroup
 *          description: Name of the Property Group 
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: keysAsJson
 *          description: JSON Document containing key-value pair to be added. 
 *          paramType: body
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 201
 *          message : Succesfully Created
 *        - code: 404
 *          message : Not Found
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.add =
    
     function(req,res,next){
        
        var body = req.body; 
        
        var keysSearchCrieteria = {
             projectName : req.params.prjName,
             env : req.params.env,
             release : req.params.release,
             groupName : req.params.propgroup
        }
    
            KeysModel.single(keysSearchCrieteria,  function(err, result){
                if(!err && !result) {
                    // It means neither Error and Result is also null
                   var keysObj = JSON.parse(JSON.stringify(keysSearchCrieteria)) ;
                   if(body) {
                       keysObj.keys = body ; 
                   } else {
                       keysObj.keys = {} ; 
                   }
                    
                   KeysModel.insert(keysObj,function(err,keys){
                          if(!err)      {
                              res.status(201).json({ "success" : "created", "id" : keys._id});
                          }     
                    });
                }  else {
                    res.status(500).json({"error" : "Keys already exists for this project/env/release/propgroup. "}) ;
                }          

            });
    };

/**
 * @swagger
 * path: /projects/{prjName}/env/{envName}/release/{releaseName}/propgroup/{propGroup}
 * operations:
 *   -  httpMethod: GET
 *      summary: list all the keys present for a PROJECT in A ENV Under a RELEASE for All PROPGROUP 
 *      notes: list all the keys present for a PROJECT in A ENV Under a RELEASE for All PROPGROUP 
 *      nickname: List_Project_KEYS_PROPGROUP
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: prjName
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: envName
 *          description: Environment
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: releaseName
 *          description: Release either v0.0 or 1.0.0
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: propGroup
 *          description: Name of the Property Group 
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Successfully returns all the releases of the project
 *        - code: 404
 *          message : Not Found
 *        - code: 500
 *          message : Error with the description.
 */

module.exports.get =
   
   function(req,res,next){
        var keysSearchCrieteria = {
             projectName : req.params.prjName,
             env : req.params.env,
             release : req.params.release,
             groupName : req.params.propgroup 
        }
        KeysModel.single(keysSearchCrieteria,function(err, result) {
            if(!err && result)  {
                
                var finalResult = JSON.parse(JSON.stringify(result)) ;
                finalResult.id = finalResult._id;
                delete finalResult._id;
                res.status(200).json(finalResult) ;
            } else {
                res.status(404).json({"error" : "Not Found"}) ;
            }
        });
        
    }; 
    
    
    // All the functions related to the KEYS of an Individual PropGroup in an Env/Release/Project
/**
 * @swagger
 * path: /keys/{keysId}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get All Keys of a specifc Property Group of an Project/Env/Release by its ID.  
 *      notes: Get All Keys of a specifc Property Group of an Project/Env/Release by its ID.  
 *      nickname: GET_KEYS_PROPGROUP
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: keysId
 *          description: KEY ID 
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Returns with all the keys.
 *        - code: 404
 *          message : Not Found.
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.getKeysById =
    
    function(req,res) {
        
        var keysId = req.params.keysId; 
        KeysModel.findById(keysId, function(err, result) {
                if(!err && result) {
                     var finalResult = {} ; 
                    if(result.keys) {
                        finalResult = result.keys ;
                    }
                      res.status(200).json(finalResult) ;
                    
                                              
                } else { 
                    res.status(404).json({"error" : "Keys not found for this ID."}) ;
                }
        });
        
    };
    
    // Add Update Keys to an ID. 
/**
 * @swagger
 * path: /keys/{keysId}
 * operations:
 *   -  httpMethod: POST
 *      summary: Add/Update a single KEY to the the PROJECT/ENV/RELEASE/PROPGROUP identified by a KEY_ID 
 *      notes: Add/Update a single KEY to the the PROJECT/ENV/RELEASE/PROPGROUP identified by a KEY_ID 
 *      nickname: ADD_PROJECT_KEYS_SINGLE
 *      produces: 
 *        - application/json
 *      consumes: 
 *        - application/json
 *      parameters:
 *        - name: keysId
 *          description: Your ProjectName
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: keyObject
 *          description: JSON document containing "key" and "value" attribute that is to be inserted.
 *          paramType: body
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Succesfully Added/updated
 *        - code: 404
 *          message : Not Found
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.addUpdateKeysToId =
    
    function(req,res) {
        var body = req.body ; 
        var keysId = req.params.keysId; 
        KeysModel.findById(keysId, function(err, result ) {
                if(!err && result ) {
                    if(result.keys) {
                        
                    } else {
                        result.keys = {} ; 
                    }
                    result.keys[body.key] = body.value;
                    KeysModel.insert(result, function(err,keysResult) {
                        if(!err && keysResult)  {
                            res.status(200).json({"success" : "Key Succesfully added/Updated. "}) ;
                        } else {
                            console.error("An Error occured, while updating the keys " + body.key, err) ;
                            res.status(500).json({ "error" : err }) ;
                        }
                    });
                } else {
                    res.status(404).json({"error" : "Keys ID not found."}) ;
                }
        });
    };
    
    // Delete the Property from one of the Keys. 
/**
 * @swagger
 * path: /keys/{keysId}/name/{keyName}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete a specific key 
 *      notes: Delete a specific key 
 *      nickname: DELETE_KEYS_SINGLE
 *      produces: 
 *        - application/json
 *      parameters:
 *        - name: keysId
 *          description: KEY ID 
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: keyName
 *          description: KEY NAME 
 *          paramType: path
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 200
 *          message : Successfully deleted. 
 *        - code: 404
 *          message : Not Found.
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.deleteKeysFromId =
    
    function(req,res) {
        var keyName = req.params.keyName; 
        var keysId = req.params.keysId; 
        KeysModel.findById(keysId, function(err, result ) {
                 if(!err && result ) {
                     if(result.keys) {
                         var properties = result.keys; 
                         if(properties.hasOwnProperty(keyName)) {
                             delete properties[keyName] ;
                             result.keys = properties ;
                             KeysModel.insert(result,function(err,keysResult){
                                if(!err && keysResult)  {
                                    res.status(200).json({"success" : "Key Successfully deleted"}) ;
                                } else {
                                    res.status(500).json({"error" : err}) ;
                                }
                             });
                         } else {
                             res.status(404).json({"error" : "Property is not present in the set. "}) ;
                         }
                     } else { 
                         res.status(404).json({ "error" : "Nothing is being set for this project/release/env"}) ;
                     }
                 } else {
                     res.status(404).json({"error" : "Keys not found for this ID."}) ;
                 }
        });
        
    }; 
    
    // Copy Keys from one project to another. 
/**
 * @swagger
 * path: /keys/{keysId}/copy
 * operations:
 *   -  httpMethod: POST
 *      summary: Copy a specific set of keys to another PROJECT/ENV/RELEASE/PROPGROUP
 *      notes: Copy a specific set of keys to another PROJECT/ENV/RELEASE/PROPGROUP
 *      nickname: COPY_KEYS
 *      produces: 
 *        - application/json
 *      consumes: 
 *        - application/json
 *      parameters:
 *        - name: keysId
 *          description: KEY ID 
 *          paramType: path
 *          required: true
 *          dataType: string
 *        - name: targetProjInformation
 *          description: JSON Object including "prjName","env","release","propgroup"
 *          paramType: body
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 201
 *          message : Successfully Copied
 *        - code: 404
 *          message : Not Found.
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.copyKeys =
    
    function(req,res) { 
        var keysId = req.params.keysId; 
        var body = req.body; 
        KeysModel.findById(keysId, function(err,result) {
              if(!err && result ) {
                     var newCopiedKeys = {
                             projectName :body.prjName,
                             env : body.env,
                             release : body.release,
                             groupName : body.propgroup,
                             keys : result.keys,
                             desc : result.desc
                        };
                  
                     KeysModel.insert(newCopiedKeys,function(err,finalResult) {
                            if(!err && result)       {
                                  res.status(201).json({ "success" : "created", "id" : finalResult._id});
                            } else {
                                console.error("An Error occured . ", err) ;
                                res.status(500).json({"error" : err}) ;
                            } 
                     });
              } else { 
                  res.status(404).json({"error" : "Keys not found for this ID."}) ;
              }
        })
    
    
    }

    // Copy Keys from one PROJ/ENV/PROPGroup/Release to another. 
/**
 * @swagger
 * path: /keys/copy/all
 * operations:
 *   -  httpMethod: POST
 *      summary: Copy a specific set of keys to another PROJECT/ENV/RELEASE/PROPGROUP
 *      notes: Copy a specific set of keys to another PROJECT/ENV/RELEASE/PROPGROUP
 *      nickname: COPY_KEYS
 *      produces: 
 *        - application/json
 *      consumes: 
 *        - application/json
 *      parameters:
 *        - name: targetProjInformation
 *          description: JSON Object including "src","dest" two attributes that describes from where we need to copy the properties to where. 
 *          paramType: body
 *          required: true
 *          dataType: string
 *      responseMessages:
 *        - code: 201
 *          message : Successfully Copied
 *        - code: 500
 *          message : Error with the description.
 */
module.exports.copyKeysFromOneToAnother =
    
    function(req,res) { 

        var body = req.body; 
        if(body.src && body.dest) {
            var keysSearchCrieteria = {
                 projectName : body.src.project,
                 env : body.src.environment,
                 release : body.src.release,
                 groupName : body.src.propGroup 
              } ;
            KeysModel.single(keysSearchCrieteria,function(err, result) {
                if(!err && result)  {

                   var destKeysObj = {
                        projectName : body.dest.project,
                        env : body.dest.environment,
                        release : body.dest.release,
                        groupName : body.dest.propGroup 
                   };
                   destKeysObj.keys = result.keys; 

                    
                   KeysModel.insert(destKeysObj,function(err,resultKeys){
                          if(!err)      {
                              res.status(201).json({ "success" : "created", "id" : resultKeys._id});
                        }     
                    });
                } else {
                    res.status(500).json({"error" : "No properties available for the given combination of Project/Env/Release/Property Group"}) ;
                }
            });
        } else {
            
         res.status(500).json({"error" : "Request body does not contain SRC n DEST attribute"}) ;  
        }
    
    
    }
    


