var mongoose = require('mongoose');
var KeysSchema = require('../schemas/keys');

var modelDocType  = "keys"; 

KeysSchema.statics = {
    
    list : function(keysInfo, callback) {
         var search = { 
                "_docType" : modelDocType,
                "projectName" : keysInfo.projectName,
                "release": keysInfo.release,
                "env" : keysInfo.env
        };
        
        this.find(search, { "__v" : 0 , "_docType" : 0 } , function(err, propGroups){
            callback(null,propGroups) ;
        });
    },
    
    insert : function(keysInfo, callback){
        var keysObj = Object.create(null); 
        keysObj._docType = modelDocType;
        keysObj.projectName = keysInfo.projectName; 
        keysObj.groupName = keysInfo.groupName; 
        keysObj.release = keysInfo.release; 
        keysObj.env = keysInfo.env; 
        keysObj.desc = keysInfo.desc; 
        keysObj.keys = keysInfo.keys;
        
        var search = { 
                "_docType" : modelDocType,
                "projectName" : keysInfo.projectName,
                "groupName" : keysInfo.groupName,
                "release": keysInfo.release,
                "env" : keysInfo.env
        };
        
        this.findOneAndUpdate(search, keysObj, { "upsert" : true, "new" : "true" },function(err,result){
                if(err) {
                    callback(err,null) ;
                } else { 
                    callback(null,result) ;
                }
            
        })  
    },
    
    single : function(keysInfo,callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : keysInfo.projectName,
                "groupName" : keysInfo.groupName,
                "release": keysInfo.release,
                "env" : keysInfo.env
        };
        
        this.findOne(search, {"__v" : 0, "_docType" : 0  } , function(err, keysObj){
            callback(null,keysObj) ;
        });
    }, 
    
    
    findById : function(id, callback) {
        
        this.findOne({"_id": id}, {"__v" : 0, "_docType" : 0,"_id" : 0  }, function(err,keysObj) {
                    callback(err,keysObj);
        });
    }
    
    
}

var KeysModel = mongoose.model('Keys',KeysSchema,"zuul");

module.exports = KeysModel; 
