var mongoose = require('mongoose');


var EnvSchema = new mongoose.Schema({
    
    "_docType" : { type : String, default : "environment"},
    "envName" : String,
    "envDesc" : String
    
});

module.exports = EnvSchema;