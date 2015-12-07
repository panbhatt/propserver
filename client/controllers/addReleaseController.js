(function() {

    var app = angular.module('propAddReleaseController', [], function() {
    });

    app.controller('addReleaseController', [
        '$scope',
        '$http',
        '$location',
        '$element',
        'projectName',
        'close',

        function($scope, $http, $location,$element,projectName, close) {

            console.log("Project Name = " , projectName);
            $scope.projectName = projectName; 
        
             $scope.close = function() {
                  close({
                  release : $scope.projectRelease,
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
