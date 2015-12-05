/**
 * Main AngularJS Web Application
 */
var app = angular.module('propServerUI', [
  'ngRoute',
  'ui.bootstrap'    
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "client/partials/home.html", controller: "PageCtrl"})
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

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope) {
    
    $scope.selectedProject = "Select Project";
    $scope.selectedRelease = "Select Release";
    $scope.selectedPropGroup = "Select Property Group";
    $scope.selectedEnvironment = "";
    
    $scope.projects = [ "ABCD", "DEF", "JKDKD" ] ; 
    $scope.releases = [ "0.0", "0.5", "1.0.0", "1.0.1"] ; 
    $scope.propGroups = [ "database", "network", "thirdPartyIntegration", "redis"] ; 
    $scope.environments = [ "DEV", "QA", "ENV" ] ; 
    
    
  console.log("Page Controller reporting for duty.");
    $scope.show = function(prj) {
       $scope.selectedProject = prj;
    };
    
    
    $scope.changeRelease = function(release) {
       $scope.selectedRelease = release;
        console.log("Current Release = " , $scope.selectedRelease);
    };
    
    $scope.changePropGroup = function(propGroup) {
       $scope.selectedPropGroup = propGroup;
    };
    
    
    $scope.$watch('selectedProject',function(val) {
        console.log("Value = ", val);
    }); 


});