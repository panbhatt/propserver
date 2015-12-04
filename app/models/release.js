var mongoose = require('mongoose');
var ReleaseSchema = require('../schemas/release');

var modelDocType  = "release"; 

ReleaseSchema.statics = {
    
    list : function(prjName, callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName
        };
        
        this.find(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0 } , function(err, releases){
            callback(null,releases) ;
        });
    },
    
    insert : function(release, callback){
        var releaseObj = Object.create(null); 
        releaseObj._docType = modelDocType;
        releaseObj.projectName = release.projectName; 
        releaseObj.release = release.release; 
        releaseObj.desc = release.desc; 
        
        var search = { 
                "_docType" : modelDocType,
                "projectName" : release.projectName,
                "release" : release.release
        };
        
        this.findOneAndUpdate(search, releaseObj, { "upsert" : true, "new" : "true" },function(err,result){
                if(err) {
                    callback(err,null) ;
                } else { 
                    callback(null,result) ;
                }
            
        })  
    },
    
     single : function(prjName,releaseName,callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName,
                "release" : releaseName
        };
        
        this.findOne(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0  } , function(err, release){
            callback(null,release) ;
        });
    }
    
    
}


var ReleaseModel = mongoose.model('Release',ReleaseSchema,"zuul");

module.exports = ReleaseModel; 