(function(){

    var app = angular.module('propProjectService', [], function() {
    });

    app.service('projectService', function($http, $q, $rootScope) {
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
        
         this.addProject = function(name,desc) {
            var deferred = $q.defer();
            var projectDetails = {
                    "name" : name, 
                    "desc" : desc
            };
            $http.post(url,projectDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error(err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

      


    });
})();
