var mongoose = require('mongoose');
var EnvSchema = require('../schemas/environment');

var modelDocType  = "environment"; 

EnvSchema.statics = {
    
    list : function(callback) {
        var search = { 
                "_docType" : modelDocType
        };
        
        this.find(search, {"_id" : 0,"__v" : 0, "_docType" : 0  } , function(err, envs){
            callback(null,envs) ;
        });
    },
    
    insert: function(envName, envDesc, callback){
        var envObj = Object.create(null); 
        envObj._docType = modelDocType;
        envObj.envName = envName; 
        envObj.envDesc = envDesc;
        
        var search = { 
                "_docType" : modelDocType,
                "envName" : envName
        };
        
        this.findOneAndUpdate(search, envObj, { "upsert" : true, "new" : "true" },function(err,result){
                if(err) {
                    callback(err,null) ;
                } else { 
                    callback(null,result) ;
                }
            
        });
        
        
    },
    
     single : function(envName,callback) {
        var search = { 
                "_docType" : modelDocType,
                "envName" : envName
        };
        
        this.findOne(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0  } , function(err, env){
            callback(null,env) ;
        });
    }
}


var EnvModel = mongoose.model('Environment',EnvSchema,"zuul");

module.exports = EnvModel; 