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

// Make sure the things for the XEditable option. 
app.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope,ModalService, projectService) {
    
    $scope.selectedProject = "Select Project";
    $scope.selectedRelease = "Select Release";
    $scope.selectedPropGroup = "Select Property Group";
    $scope.selectedEnvironment = "";
    
    $scope.projects = [ "ABCD", "DEF", "JKDKD" ] ; 
    $scope.releases = [ "0.0", "0.5", "1.0.0", "1.0.1"] ; 
    $scope.propGroups = [ "database", "network", "thirdPartyIntegration", "redis"] ; 
    $scope.environments = [ "DEV", "QA", "ENV" ] ; 
    
    
    projectService.listProjects().then(function(prjList) {
                    console.log("login info @ angular", prjList) ;
                    if(prjList && prjList.length > 0 ) {
                        var listOfProjects = [] ; 
                        prjList.forEach(function(prjData) {
                            listOfProjects.push(prjData.projectName) ;   
                        });
                        $scope.projects = listOfProjects;
                    }
                
                }, function(err) {
                    console.error("An Error has occured", prjList);
                });
    
    
    
    console.log("Page Controller reporting for duty.");
    $scope.show = function(prj) {
       $scope.selectedProject = prj;
    };
    
    
    $scope.changeRelease = function(release) {
       $scope.selectedRelease = release;
        console.log("Current Release = " , $scope.selectedRelease);
    };
    
    $scope.changeEnv = function(env) {
       $scope.selectedEnvironment = env;
        console.log("Current Env = " , $scope.selectedEnvironment);
    };    
 
    
    $scope.changePropGroup = function(propGroup) {
       $scope.selectedPropGroup = propGroup;
    };
    
    
    $scope.$watch('selectedProject',function(val) {
        console.log("Value = ", val);
    });
    
    $scope.addProject = function() {

            
            ModalService.showModal({
              templateUrl: "client/partials/modals/addProject.html",
              controller: "addProjectController"
            }).then(function(modal) {
              
              modal.element.modal();
              modal.close.then(function(result) {
                console.log(result);
              });
            });

    };
    
    $scope.addRelease = function() {

            // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
              templateUrl: "client/partials/modals/addRelease.html",
              controller: "addReleaseController",
              inputs : {
                "projectName" : $scope.selectedProject    
              }
            }).then(function(modal) {
            
              modal.element.modal();
              modal.close.then(function(result) {
                console.log(result);
              });
            });

    };
    
     $scope.addPropGroup = function() {

            ModalService.showModal({
              templateUrl: "client/partials/modals/addPropGroup.html",
              controller: "addPropGroupController",
              inputs : {
                "projectName" : $scope.selectedProject    
              }
            }).then(function(modal) {
            
              modal.element.modal();
              modal.close.then(function(result) {
                console.log(result);
              });
            });

    };
    
     $scope.addEnvironment = function() {

            ModalService.showModal({
              templateUrl: "client/partials/modals/addEnvironment.html",
              controller: "addEnvironmentController",
            }).then(function(modal) {
            
              modal.element.modal();
              modal.close.then(function(result) {
                console.log(result);
              });
            });

    };
    
      $scope.users = [
        {id: 1, name: 'awesome user1', status: 2},
        {id: 2, name: 'awesome user2', status: undefined},
        {id: 3, name: 'awesome user3', status: 2}
      ]; 

      $scope.statuses = [
        {value: 1, text: 'status1'},
        {value: 2, text: 'status2'},
        {value: 3, text: 'status3'},
        {value: 4, text: 'status4'}
      ]; 

    $scope.groups = [];
    
     $scope.showGroup = function(user) {
    if(user.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };
    
    $scope.addUser = function() {
        $scope.inserted = {
          id: $scope.users.length+1,
          name: '',
          status: 2,
          group: null 
        };
        $scope.users.push($scope.inserted);
      };
    
      


});
