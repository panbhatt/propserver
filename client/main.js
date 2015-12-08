/**
 * Main AngularJS Web Application
 */
var app = angular.module('propServerUI', [
  'ngRoute',
  'ui.bootstrap' ,
  'xeditable',
  'angularModalService',
    
  'propAddProjectController',
  'propAddReleaseController',
  'propAddPropGroupController',
  'propAddEnvironmentController',
  'propHomeController',
    
  'propGlobalService',
  'propProjectService',
  'propEnvironmentService',
  'propReleaseService',
  'propPropGroupService',
  'propKeysService'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "client/partials/home.html", controller: "homeController"})
    // Pages
    .when("/about", {templateUrl: "client/partials/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "client/partials/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "client/partials/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "client/partials/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "client/partials/contact.html", controller: "PageCtrl"})
    
    // else 404
    .otherwise("/404", {templateUrl: "client/partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

// Make sure the things for the XEditable option. 
app.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope,ModalService, projectService, environmentService) {
    
  
});
