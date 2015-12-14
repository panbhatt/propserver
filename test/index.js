'use strict';

var test = require('tape'); 
var request = require('supertest'); 
var after = require('tape');

var app = require('./../app.js'); 



test('First Test', function(t){
    console.log("First here");
    //t.same('ab','ab',"first");
     t.end();
    
});

/*
test('Second test',function(t){
    console.log(" STart the server " ) ; 
    setTimeout(function(){
       var endReq =       request(app).get('/projects').expect(200)
       .end(function(err,res){
           //console.log("Response = " , res);
           console.log("BOdy = " , res.body); 
           t.error(err,'No Report Reported');
           t.same("abc","abc", 'Users as expected' ); 
           t.end();
                endReq.close();  
       });
        console.log(new Date()); 
    },2000); 
  
    
});
*/
/*
test('after',function(t){
   t.end();
 process.exit();
}); */






