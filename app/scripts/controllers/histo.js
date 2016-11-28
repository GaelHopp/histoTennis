'use strict';

/**
 * @ngdoc function
 * @name tennisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tennisApp
 */
angular.module('histoTennisApp')
  .controller('HistoCtrl', function ($scope, $http, $q, matchService) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    matchService.constructMatches().then(function(values){

        $scope.matches = values;

      }
    	);

  });
