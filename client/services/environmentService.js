(function(){

    var app = angular.module('propEnvironmentService', [], function() {
    });

    app.service('environmentService', function($http, $q, $rootScope) {
        var url = "/envs";

        this.listEnvironments = function() {
            var deferred = $q.defer();
            $http.get(url).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                $log("error");
                deferred.reject('error during /projects');
            });
            return deferred.promise;
        };
        
         this.addEnvironment = function(name,desc) {
            var deferred = $q.defer();
            var envDetails = {
                    "name" : name, 
                    "desc" : desc
            };
            $http.post(url,envDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error(err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

      


    });
})();
