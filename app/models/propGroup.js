var mongoose = require('mongoose');
var PropGroupSchema = require('../schemas/propGroup');

var modelDocType  = "propgroup"; 

PropGroupSchema.statics = {
    
    list : function(prjName, callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName
        };
        
        this.find(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0 } , function(err, propGroups){
            callback(null,propGroups) ;
        });
    },
    
    insert : function(propGroup, callback){
        var propGroupObj = Object.create(null); 
        propGroupObj._docType = modelDocType;
        propGroupObj.projectName = propGroup.projectName; 
        propGroupObj.groupName = propGroup.groupName; 
        propGroupObj.desc = propGroup.desc; 
        
        var search = { 
                "_docType" : modelDocType,
                "projectName" : propGroup.projectName,
                "groupName" : propGroup.groupName
        };
        
        this.findOneAndUpdate(search, propGroupObj, { "upsert" : true, "new" : "true" },function(err,result){
                if(err) {
                    callback(err,null) ;
                } else { 
                    callback(null,result) ;
                }
            
        })  
    },
    
     single : function(prjName,propGroupName,callback) {
        var search = { 
                "_docType" : modelDocType,
                "projectName" : prjName,
                "groupName" : propGroupName
        };
        
        this.findOne(search, {"_id" : 0 ,"__v" : 0, "_docType" : 0  } , function(err, propGroup){
            callback(null,propGroup) ;
        });
    }
    
    
}

var PropGroupModel = mongoose.model('PropGroup',PropGroupSchema,"zuul");

module.exports = PropGroupModel; 