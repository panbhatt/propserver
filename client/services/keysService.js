(function(){

    var app = angular.module('propKeysService', [], function() {
    });

    app.service('keysService', function($http, $q, $rootScope) {
        var url = "/keys";

        this.listKeysByAllParams = function(prjName,envName,releaseName, propGroup) { 
            var fullUrl =  "/projects/" +  prjName+"/env"+envName+"/release"+"/propgroup"+propGroup;
            var deferred = $q.defer();
            $http.get(fullUrl).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                $log("error");
                deferred.reject('error during Keys of an project'+fullUrl);
            });
            return deferred.promise;
        };
        
         this.addKey = function(prjName, envName,releaseName, propGroup, keyName, keyValue) {
            var fullUrl =  "/projects/" +  prjName+"/env"+envName+"/release"+"/propgroup"+propGroup;
            var deferred = $q.defer();
            var keyDetails = {} ; 
             keyDetails[keyName] = keyValue; 
            $http.post(fullUrl,releaseDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during addition of new KEys", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

         this.addKeyByKeyId = function(keyId, keyName, keyValue) {
            var fullUrl =  url + "/"+ keyId; 
            var deferred = $q.defer();
            var keyDetails = {} ; 
             keyDetails[keyName] = keyValue; 
            $http.post(fullUrl,releaseDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during addition of new Keys by Key ID. ", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };




    });
})();
