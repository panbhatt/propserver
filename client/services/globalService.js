(function(){

    var app = angular.module('propGlobalService', [], function() {
    });

    app.service('globalService', function($http, $q, $rootScope) {
        var url = "/projects";

        this.listProjects = function() {
            var deferred = $q.defer();
            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                $log("error");
                deferred.reject('error during /projects');
            });
            return deferred.promise;
        };

      


    });
})();
