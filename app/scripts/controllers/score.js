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


matchService.getMatchesLive().then(function(values){

        $scope.matchesLive = values;

      }
    	);



$scope.init = function(){
	$scope.player1Serving = true;
	$scope.player1 = "";
	$scope.player2 = "";
}



$scope.saveMatchLive = function(){

	var match = {};
	match.player1 = $scope.player1;
	match.player2 = $scope.player2;
	match.set1Player1 = 0;
	match.set1Player2 = 0;
	match.set2Player1 = 0;
	match.set2Player2 = 0;
	match.set3Player1 = 0;
	match.set3Player2 = 0;
	match.player1Serving = $scope.player1Serving;
	

	matchService.saveMatchLive(match).then(function(values){

       $scope.matchesLive = values;
       $scope.init();

      });
	
}

$scope.areNamesCorrect = function(){
	var correct = true;
	if($scope.player1 === "" || $scope.player2 === ""){
		correct = false;
	}

	return correct;
}

$scope.init();



  });
