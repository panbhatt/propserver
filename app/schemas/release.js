var mongoose = require('mongoose');


var ReleaseSchema = new mongoose.Schema({
    
    "_docType" : { type : String, default : "release"},
    "projectName" : String,
    "release" : String,
    "desc" : String
    
});

module.exports = ReleaseSchema;