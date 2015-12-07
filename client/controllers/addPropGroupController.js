(function() {

    var app = angular.module('propAddPropGroupController', [], function() {
    });

    app.controller('addPropGroupController', [
        '$scope',
        '$http',
        '$location',
        '$element',
        'projectName',
        'close',

        function($scope, $http, $location,$element,projectName, close) {

            $scope.projectName = projectName; 
        
             $scope.close = function() {
                  close({
                  propGroupName : $scope.propGroupName,
                  propGroupDesc : $scope.propGroupDesc,      
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
