'use strict';

/**
 * @ngdoc function
 * @name tennisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tennisApp
 */
angular.module('histoTennisApp')
  .controller('ScoreCtrl', function ($rootScope, $scope, $http, $q, $window, matchService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
