var mongoose = require('mongoose');


var KeysSchema = new mongoose.Schema({
    
    "_docType" : { type : String, default : "keys"},
    "projectName" : String,
    "groupName" : String,
    "release" : String,
    "env" : String, 
    "keys" : {}
    
});

module.exports = KeysSchema;