(function() {

    var app = angular.module('propHomeController', [], function() {
    });

    app.controller('homeController', [
        '$scope',
        '$http',
        '$location',
        'ModalService',
        'projectService',
        'environmentService',
        'releaseService',
        'propGroupService',

        function($scope, $http, $location, 
                 ModalService, projectService, environmentService, releaseService,propGroupService    ) {

            
                $scope.selectedProject = "Select Project";
                $scope.selectedRelease = "Select Release";
                $scope.selectedPropGroup = "Select Property Group";
                $scope.selectedEnvironment = "";

                $scope.projects = [ "ABCD", "DEF", "JKDKD" ] ; 
                $scope.releases = [ ] ; 
                $scope.propGroups = [ ] ; 
                $scope.environments = [ "DEV", "QA", "ENV" ] ; 


                projectService.listProjects().then(function(prjList) {
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

                 environmentService.listEnvironments().then(function(envList) {

                                if(envList && envList.length > 0 ) {
                                    var listOfEnvs = [] ; 
                                    envList.forEach(function(envData) {
                                        listOfEnvs.push(envData.envName) ;   
                                    });
                                    $scope.environments = listOfEnvs;
                                }

                    }, function(err) {
                        console.error("An Error has occured while getting environments", envList);
                    });



                $scope.changeProject = function(prj) {
                     $scope.selectedProject = prj;
                     releaseService.listReleases(prj).then(function(releaseList) {

                                        var releasesForProject = [] ; 
                                    if(releaseList && releaseList.length > 0 ) {
                                        releaseList.forEach(function(relDetails) {
                                             releasesForProject.push(relDetails.release);
                                        });
                                    }      
                                     $scope.releases = releasesForProject ;
                                } );
                    
                    
                    propGroupService.listPropGroups(prj).then(function(propGroupsList) {

                                        var propGroupsForProject = [] ; 
                                    if(propGroupsList && propGroupsList.length > 0 ) {
                                        propGroupsList.forEach(function(propGroupDetails) {
                                             propGroupsForProject.push(propGroupDetails.groupName);
                                        });
                                    }      
                                     $scope.propGroups = propGroupsForProject ;
                                } );  

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
    

        }
    ]);
})();
