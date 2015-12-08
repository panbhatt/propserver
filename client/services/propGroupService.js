(function(){

    var app = angular.module('propPropGroupService', [], function() {
    });

    app.service('propGroupService', function($http, $q, $rootScope) {
        var url = "/projects";

        this.listPropGroups = function(prjName) { 
            var fullUrl = url + "/"+ prjName+"/propgroup";
            var deferred = $q.defer();
            $http.get(fullUrl).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                $log("error");
                deferred.reject('error during '+fullUrl);
            });
            return deferred.promise;
        };
        
         this.addPropGroup = function(prjName, grpName,desc) {
            var fullUrl = url + "/"+ prjName+"/propgroup";
            var deferred = $q.defer();
            var propGroupDetails = {
                    "groupName" : grpName, 
                    "desc" : desc
            };
            $http.post(fullUrl,propGroupDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during creation of a new PropGroup", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

      


    });
})();
