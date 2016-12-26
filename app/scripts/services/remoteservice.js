'use strict';

/**
 * @ngdoc service
 * @name histoTennisApp.remoteService
 * @description
 * # remoteService
 * Service in the histoTennisApp.
 */
angular.module('histoTennisApp')
  .service('remoteService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

var domain = 'http://localhost:8888/histoTennisBack/api';


this.get = function(url){
  return $http.get(domain+url);
};

this.post = function(url, data){
  return $http.post(domain+url, data);
};

this.delete = function(url){
  return $http.delete(domain+url);
};




  });
