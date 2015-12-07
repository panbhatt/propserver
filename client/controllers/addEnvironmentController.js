(function() {

    var app = angular.module('propAddEnvironmentController', [], function() {
    });

    app.controller('addEnvironmentController', [
        '$scope',
        '$http',
        '$location',
        '$element',
        'close',

        function($scope, $http, $location,$element, close) {

            
        
             $scope.close = function() {
                  close({
                  envName : $scope.envName,
                  envDesc : $scope.envDesc,
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
