(function(){

    var app = angular.module('propReleaseService', [], function() {
    });

    app.service('releaseService', function($http, $q, $rootScope) {
        var url = "/projects";

        this.listReleases = function(prjName) { 
            var fullUrl = url + "/"+ prjName+"/release";
            var deferred = $q.defer();
            $http.get(fullUrl).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                $log("error");
                deferred.reject('error during '+fullUrl);
            });
            return deferred.promise;
        };
        
         this.addRelease = function(prjName, version,desc) {
            var fullUrl = url + "/"+ prjName+"/release";
            var deferred = $q.defer();
            var releaseDetails = {
                    "release" : version, 
                    "desc" : desc
            };
            $http.post(fullUrl,releaseDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during creation of a new release", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

      


    });
})();
