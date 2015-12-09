(function() {

    var app = angular.module('propCopyPropertiesController', [], function() {
    });

    app.controller('copyPropertiesController', [
        '$scope',
        '$http',
        '$location',
        '$element',
        'dialogs',
        'project',
        'releases',
        'propGroups',
        'environments',
        'close',

        function($scope, $http, $location,$element, dialogs, project, releases, propGroups,  environments, close) {

        	
            $scope.project = project; 
            $scope.releases = releases; 
            $scope.propGroups = propGroups;
            $scope.environments = environments; 
            
            $scope.selRelease = "Pick Release";
            $scope.selPropGroup = "Pick Property Group";
            $scope.selEnvironment = "Pick Environment"; 
            
             var dialogWindowOptions = { windowClass : 'center-modal', size : 'sm'}
        
            $scope.close = function() {
                
                $element.modal('hide');        
                        close({
                            "release" : $scope.selRelease,
                            "propGroup" : $scope.selPropGroup,
                            "environment" : $scope.selEnvironment, 
                            "cancel" : false
                        }, 500); // close, but give 500ms for bootstrap to animate
                
               
            };
            
            $scope.chkValidity = function() {
                
                
                
                if($scope.selRelease == "Pick Release") {
                    dialogs.error("Property Manager", "Please pick a release",dialogWindowOptions); 
                    return; 
                }
                
                if($scope.selPropGroup == "Pick Property Group") {
                    dialogs.error("Property Manager", "Please pick a Property Group",dialogWindowOptions); 
                    return;
                }
                
                if($scope.selEnvironment == "Pick Environment") {
                    dialogs.error("Property Manager", "Please pick a Environment",dialogWindowOptions); 
                    return ; 
                }
                
                $scope.close();                             
                
            }
        
             $scope.dismissModal = function(result) {
                close(result, 200); // close, but give 200ms for bootstrap to animate
             }; 

              $scope.cancel = function() {

                    //  Manually hide the modal.
                    $element.modal('hide');

                    //  Now call close, returning control to the caller.
                    close({
                        "cancel" : true
                    }, 500); // close, but give 500ms for bootstrap to animate
            };
            
            $scope.setRelease = function(rel) {
                $scope.selRelease    =  rel ; 
            };
            
            $scope.setPropGroup = function(propGroup) {
                $scope.selPropGroup    =  propGroup ; 
            };
            
            $scope.setEnvironment = function(env) {
                $scope.selEnvironment    =  env ; 
            };


        }
    ]);


})();
