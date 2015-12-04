var mongoose = require('mongoose');
var ProjectSchema = require('../schemas/project');

var modelDocType  = "project"; 

ProjectSchema.statics = {
    
    list : function(callback) {
        var search = { 
                "_docType" : modelDocType
        };
        
        this.find(search, {"_id" : 0 , "__v" : 0,"_docType" : 0 } , function(err, projects){
            callback(null,projects) ;
        });
    },
    
    insert : function(prjName, callback){
        var prjObj = Object.create(null); 
        prjObj._docType = modelDocType;
        prjObj.projectName = prjName; 
        
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName
        };
        
        this.findOneAndUpdate(search, prjObj, { "upsert" : true, "new" : "true" },function(err,result){
                if(err) {
                    callback(err,null) ;
                } else { 
                    callback(null,result) ;
                }
            
        })  
    },
    
    single : function(prjName,callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName
        };
        
        this.findOne(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0  } , function(err, project){
            callback(null,project) ;
        });
    }
    
    
}


var ProjectModel = mongoose.model('Project',ProjectSchema,"zuul");

module.exports = ProjectModel; 