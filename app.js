var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var swagger = require('swagger-express') ;
var yargs = require('yargs').argv ; 

console.log("Command line arguments are " , yargs.dbUrl); 

var app = express();

// MONGOOSE Setup. 
var dbUrl = yargs.dbUrl ; 
if(dbUrl) {
    mongoose.connect("mongodb://"+dbUrl);
    console.log("Connectd via argument beign passed at command line"); 
} else {
    //mongoose.connect("mongodb://localhost/propserver");
    mongoose.connect("mongodb://propserver:propserver@ds027345.mongolab.com:27345/propserver");
    console.log("Connected to local mongo server [[ DEFAULT ]] ") ;
}



// Load all the Models. 
var modelsDir = __dirname + "/app/models";
var modelFiles = fs.readdirSync(modelsDir) ;
    modelFiles.forEach(function(file){
        if(file.indexOf('.js') != -1) {
            require(modelsDir+ "/"+ file);
        }
    });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cookieParser());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(bodyParser.text({limit: '1mb'}));


// Loading of all the Routes
var routes = require('./routes/index');
var projects = require('./routes/projects');
var environments = require('./routes/environments');
var keys = require('./routes/keys');


app.use('/', routes);
app.use('/projects', projects);
app.use('/envs',environments) ;
app.use('/keys',keys) ;

// Swagger configuration. 
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './node_modules/swagger-ui/dist',
    basePath: 'https://vast-cliffs-8955.herokuapp.com',
    info: {
      title: 'swagger-express sample app',
      description: 'Swagger + Express = {swagger-express}'
    },
    apis: ['./app/controllers/release.js',
           './app/controllers/project.js',
           './app/controllers/environment.js','./app/controllers/propgroup.js',
           './app/controllers/keys.js'
          ],
    middleware: function(req, res){}
  })); 


app.use(express.static(path.join(__dirname, '')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); 


module.exports = app;
