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
            
                var dialogWindowOptions = { windowClass : 'center-modal', size : 'sm'} ;
            
    


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
                          modal.close.then(function(prjData) {
                              console.log(prjData);
                              if(prjData.cancel === false) {
                                    // Call the project service. 
                                  projectService.addProject(prjData.projectName, prjData.projectDesc).then(function(prjAddResult){
                                    console.log("Project has been successfully added");   
                                      $scope.projects.push(prjData.projectName); 
                                     dialogs.notify("Property Manager", "<b>"+prjData.projectName + "</b> Project has been successfully saved", dialogWindowOptions ); 
                                  }, function(err) {
                                    console.error("An error occured, while adding the project");   
                                    dialogs.error("Property Manager", "An Error occured while adding project : " + ( err.error || "" ), dialogWindowOptions  );   
                                  }
                                  );
                              }
                            
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
                          modal.close.then(function(relData) {
                            console.log(relData);
                                if(relData.cancel === false) {
                                    // Call the project service. 
                                  releaseService.addRelease($scope.selectedProject, relData.release, relData.desc).then(function(relAddResult){
                                    console.log("Release has been successfully added");   
                                      $scope.releases.push(relData.release); 
                                     dialogs.notify("Property Manager", "<b>"+relData.release + "</b> Release has been successfully added to <b>" + $scope.selectedProject + "</b>" , dialogWindowOptions ); 
                                  }, function(err) {
                                    console.error("An error occured, while adding the project");   
                                    dialogs.error("Property Manager", "An Error occured while adding the release <br/>: " + ( err.error || "" ), dialogWindowOptions  );   
                                  }
                                  );
                              } 
 
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
                          modal.close.then(function(propGrupData) {
                                        console.log(propGrupData);
                                    if(propGrupData.cancel === false ) {
                                        // Call the Prop Group Service to add the data.    
                                        propGroupService.addPropGroup($scope.selectedProject, 
                                            propGrupData.propGroupName, propGrupData.propGroupDesc).
                                        then(function(result) {
                                            console.log("PROP Group Added = ",propGrupData.propGroupName); 
                                            $scope.propGroups.push(propGrupData.propGroupName);
                                            dialogs.notify("Property Manager", "<b>"+propGrupData.propGroupName + "</b> Group has been successfully added to <b>" + $scope.selectedProject + "</b>" , dialogWindowOptions ); 
                                        }, function(err) {
                                             dialogs.error("Property Manager", "An Error occured while adding the property group :<br/> " + ( err.error || "" ), dialogWindowOptions  );   
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
                           dialogs.notify("Property Manager", "<b>"+data.keyName + "</b> Key has been successfully saved", dialogWindowOptions ); 
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
