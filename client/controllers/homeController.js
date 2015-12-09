(function() {

    var app = angular.module('propHomeController', [], function() {
    });

    app.controller('homeController', [
        '$scope',
        '$http',
        '$location',
        'ModalService',
        'dialogs',
       
        'projectService',
        'environmentService',
        'releaseService',
        'propGroupService',
        'keysService',

        function($scope, $http, $location, 
                 ModalService, dialogs, projectService, environmentService, releaseService,propGroupService     ,keysService) {

            
                $scope.selectedProject = "Select Project";
                $scope.project = "";
                $scope.selectedRelease = "Select Release";
                $scope.selectedPropGroup = "Select Property Group";
                $scope.selectedEnvironment = "";

                $scope.projects = [ "ABCD", "DEF", "JKDKD" ] ; 
                $scope.releases = [ ] ; 
                $scope.propGroups = [ ] ; 
                $scope.environments = [ "DEV", "QA", "ENV" ] ; 
            
                $scope.keys = [] ; 
                $scope.keysId = "";
            
                $scope.lang = 'en-US';
		        $scope.language = 'English'; 
            
               
                


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
                     $scope.project = prj; 
                    
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
                    if($scope.selectedProject && $scope.selectedEnvironment && $scope.selectedPropGroup && $scope.selectedRelease) {

                     // Get the Property Value from the server.    
                        keysService.listKeysByAllParams($scope.selectedProject, 
                    $scope.selectedEnvironment , $scope.selectedRelease , $scope.selectedPropGroup). then(function(keyList) {
                                $scope.keys = [] ; 
                                var finalSetOfKeys = [] ; 
                                $scope.keysId = keyList.id ; 
                            
                               if(keyList && keyList.keys) {
                                    for(var keyName in keyList.keys) {
                                        var keyValue = keyList.keys[keyName];
                                        finalSetOfKeys.push({ "name" : keyName, "value" : keyValue,
                                                            "id" : keyList.id});
                                    }
                               }
                            
                                $scope.keys = finalSetOfKeys ; 
                        }, function(err) {
                                $scope.keys = [] ; 
                                console.error(" Error occured, while fetching the list of Keys = " , err) ; 
                            
                        });
                        
                    }
                };    


                $scope.changePropGroup = function(propGroup) {
                console.log("Selected PropGroup = ", propGroup);
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
                          modal.close.then(function(modalResult) {
                                    if(modalResult.cancel === false ) {
                                        // Call the Prop Group Service to add the data.    
                                        propGroupService.addPropGroup($scope.selectedProject, 
                                            modalResult.propGroupName, modalResult.propGroupDesc).
                                        then(function(data) {
                                            console.log("PROP Group Added = ",modalResult.propGroupName); 
                                            $scope.propGroups.push(modalResult.propGroupName);
                                        }, function(err) {
                                            console.log("PROP Group Deleted ");
                                        });
                                        
                                    }
                              
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


              $scope.saveKey = function(data, index) {
                
                  data.id = $scope.keysId; 
                  $scope.keys[index]= { "name" : data.keyName, "value" : data.keyValue,
                                                            "id" : $scope.keysId}; 
                  keysService.addKeyByKeyId($scope.keysId, data.keyName, data.keyValue).then(
                      function(result) {
                          console.log("Key Successfully added"); 
                           dialogs.notify("Key Added", "<b>"+data.keyName + "</b> Key has been successfully saved", { windowClass : 'center-modal', size : 'sm'} ); 
                      },function(err) {
                          console.error("There is a problem adding the new Key, please try again.  " ) ;    
                      });
                  

              };

              // remove user
              $scope.removeKey = function(keyNameToDelete,index) {
                  console.log("Data that is to be deleted " , keyNameToDelete) ; 
                  keysService.deleteKeyById($scope.keysId, keyNameToDelete).then(function(data){
                        console.log("Key " +  keyNameToDelete + " is been successfully deleted. "); 
                       $scope.keys.splice(index, 1);
                  }, function(errr) {
                    console.error("An Error occured, while Remvoing a key from the Server " ) ;  
                  });
                  
              };

                $scope.addUser = function() {
                    $scope.inserted = {
                      id: $scope.keys.length+1,
                      name: 'NEW_KEY',
                      value: 'NEW_VALUE'
                    };
                    $scope.keys.push($scope.inserted);
                  };
    
  
        }
    ]);
})();
