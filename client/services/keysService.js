(function(){

    var app = angular.module('propKeysService', [], function() {
    });

    app.service('keysService', function($http, $q, $rootScope) {
        var url = "/keys";

        this.listKeysByAllParams = function(prjName,envName,releaseName, propGroup) { 
            var fullUrl =  "/projects/" +  prjName+"/env/"+envName+"/release/"+releaseName+"/propgroup/"+propGroup;
            var deferred = $q.defer();
            $http.get(fullUrl).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("An Error occured, while fetching list of Keys for URL = " + fullUrl,err);
                deferred.reject('error during Keys of an project'+fullUrl);
            });
            return deferred.promise;
        };
        
         this.addKey = function(prjName, envName,releaseName, propGroup, keyName, keyValue) {
            var fullUrl =  "/projects/" +  prjName+"/env/"+envName+"/release/"+releaseName+"/propgroup/"+propGroup;
            var deferred = $q.defer();
            var keyDetails = {} ; 
             keyDetails[keyName] = keyValue; 
            $http.post(fullUrl,keyDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during addition of new Keys", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };

         this.addKeyByKeyId = function(keyId, keyName, keyValue) {
            var fullUrl =  url + "/"+ keyId; 
            var deferred = $q.defer();
            var keyDetails = { "key" : keyName, "value" : keyValue} ; 
             
            $http.post(fullUrl,keyDetails).success(function(data) {
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during addition of new Keys by Key ID. ", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };
        
        this.deleteKeyById = function(keyId, keyName) {
            var fullUrl =  url + "/"+ keyId + "/name/" + keyName; 
            var deferred = $q.defer();
             
            $http.delete(fullUrl).success(function(data) {
                console.log("Successfully deleted the Key " , keyName); 
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured during deletion of new Keys by Key ID. ", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };
        
        this.copyAllKeys = function(srcDestInfo) {
            var fullUrl =  url + "/copy/all"; 
            var deferred = $q.defer();
             
            $http.post(fullUrl,srcDestInfo).success(function(data) {
                console.log("Successfully Copied the keys " , data ); 
                deferred.resolve(data);
            }).error(function(err) {
                console.error("Error occured, while copying the keys.  ", err);
                deferred.reject(err);
            });
            return deferred.promise;
        };




    });
})();
