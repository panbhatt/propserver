(function() {

    var app = angular.module('propAddProjectController', [], function() {
    });

    app.controller('addProjectController', [
        '$scope',
        '$http',
        '$location',
        '$element',
        'close',

        function($scope, $http, $location,$element, close) {

        	
             $scope.projectName = null;
             $scope.projectDesc = null;
        
             $scope.close = function() {
                  close({
                  projectName: $scope.projectName,
                  projectDesc: $scope.projectDesc,
                  cancel : false
                }, 500); // close, but give 500ms for bootstrap to animate
            };
        
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


        }
    ]);


})();
