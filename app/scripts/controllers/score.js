'use strict';

/**
 * @ngdoc function
 * @name tennisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tennisApp
 */
angular.module('histoTennisApp')
  .controller('ScoreCtrl', function ($rootScope, $scope, $http, $q, $interval, $window, matchService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



$scope.init = function(){
	$scope.player1Serving = true;
	$scope.player1 = "";
	$scope.player2 = "";
}


$scope.getMatchesLive = function(){

	matchService.refreshMatchesLive().then(function(values){
	
	    $scope.matchesLive = values;
	    $scope.checkSetsFinished();

      });
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

$scope.updateMatchLive = function(match){
	

	matchService.updateMatchLive(match).then(function(values){

       $scope.matchesLive = values;
       $scope.checkSetsFinished();
       $scope.init();

      });
	
}


$scope.deleteMatchLive = function(id){

	matchService.deleteMatchLive(id).then(function(values){

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

$scope.checkSetsFinished = function(){
	
	for(var i = 0; i < $scope.matchesLive.length; i++){

		var set1Player1 = parseInt($scope.matchesLive[i].set1Player1);
		var set1Player2 = parseInt($scope.matchesLive[i].set1Player2);
		var set2Player1 = parseInt($scope.matchesLive[i].set2Player1);
		var set2Player2 = parseInt($scope.matchesLive[i].set2Player2);
		var set3Player1 = parseInt($scope.matchesLive[i].set3Player1);
		var set3Player2 = parseInt($scope.matchesLive[i].set3Player2);



		if(set1Player1 === 6 && (set1Player2 < 5 || set1Player2 === 7)
			|| set1Player1 === 7 && (set1Player2 === 5 || set1Player2 === 6)
			|| set1Player2 === 6 && set1Player1 < 5
			|| set1Player2 === 7 && set1Player1 === 5){

			$scope.matchesLive[i].set1Finished = true;

		}else{
			$scope.matchesLive[i].set1Finished = false;
		}

		if($scope.matchesLive[0].set1Finished === true && (set2Player1 === 6 && (set2Player2 < 5 || set2Player2 === 7)
			|| set2Player1 === 7 && (set2Player2 === 5 || set2Player2 === 6)
			|| set2Player2 === 6 && set2Player1 < 5
			|| set2Player2 === 7 && set2Player1 === 5)){

			$scope.matchesLive[i].set2Finished = true;

		}else{
			$scope.matchesLive[i].set2Finished = false;
		}

		if($scope.matchesLive[0].set2Finished === true && (set3Player1 === 6 && (set3Player2 < 5 || set3Player2 === 7)
			|| set3Player1 === 7 && (set3Player2 === 5 || set2Player2 === 6)
			|| set3Player2 === 6 && set3Player1 < 5
			|| set3Player2 === 7 && set3Player1 === 5)){

			$scope.matchesLive[i].set3Finished = true;

		}else{
			$scope.matchesLive[i].set3Finished = false;
		}

	}
}


$scope.player1Plus = function(match){

		var set1Player1 = parseInt(match.set1Player1);
		var set1Player2 = parseInt(match.set1Player2);
		var set2Player1 = parseInt(match.set2Player1);
		var set2Player2 = parseInt(match.set2Player2);
		var set3Player1 = parseInt(match.set3Player1);
		var set3Player2 = parseInt(match.set3Player2);

	if(match.set1Finished === true){
		if(match.set2Finished === true){
			match.set3Player1 = set3Player1+1;

		}else{
			match.set2Player1 = set2Player1+1;
		}

	}else{
		match.set1Player1 = set1Player1+1;
	}

	if(match.player1Serving === "0"){
		match.player1Serving = 1;
	}else{
		match.player1Serving = 0;
	}

	$scope.updateMatchLive(match);

}

$scope.player1Moins = function(match){

		var set1Player1 = parseInt(match.set1Player1);
		var set1Player2 = parseInt(match.set1Player2);
		var set2Player1 = parseInt(match.set2Player1);
		var set2Player2 = parseInt(match.set2Player2);
		var set3Player1 = parseInt(match.set3Player1);
		var set3Player2 = parseInt(match.set3Player2);

	if(match.set1Finished === true){
		if(match.set2Finished === true){
			if(set3Player1 === 0){
				match.set2Player1 = set2Player1-1;
			}else{
				match.set3Player1 = set3Player1-1;
			}
			

		}else{
			if(set2Player1 === 0){
				match.set1Player1 = set1Player1-1;
			}else{
				match.set2Player1 = set2Player1-1;
			}	
		}

	}else{
		if(set1Player1 > 0){
			match.set1Player1 = set1Player1-1;
		}
		
	}

	if(match.player1Serving === "0"){
		match.player1Serving = 1;
	}else{
		match.player1Serving = 0;
	}

	$scope.updateMatchLive(match);

}

$scope.player2Plus = function(match){

		var set1Player1 = parseInt(match.set1Player1);
		var set1Player2 = parseInt(match.set1Player2);
		var set2Player1 = parseInt(match.set2Player1);
		var set2Player2 = parseInt(match.set2Player2);
		var set3Player1 = parseInt(match.set3Player1);
		var set3Player2 = parseInt(match.set3Player2);

	if(match.set1Finished === true){
		if(match.set2Finished === true){
			match.set3Player2 = set3Player2+1;

		}else{
			match.set2Player2 = set2Player2+1;
		}

	}else{
		match.set1Player2 = set1Player2+1;
	}

	if(match.player1Serving === "0"){
		match.player1Serving = 1;
	}else{
		match.player1Serving = 0;
	}

	$scope.updateMatchLive(match);

}

$scope.player2Moins = function(match){

		var set1Player1 = parseInt(match.set1Player1);
		var set1Player2 = parseInt(match.set1Player2);
		var set2Player1 = parseInt(match.set2Player1);
		var set2Player2 = parseInt(match.set2Player2);
		var set3Player1 = parseInt(match.set3Player1);
		var set3Player2 = parseInt(match.set3Player2);

	if(match.set1Finished === true){
		if(match.set2Finished === true){
			if(set3Player2 === 0){
				match.set2Player2 = set2Player2-1;
			}else{
				match.set3Player2 = set3Player2-1;
			}
			

		}else{
			if(set2Player2 === 0){
				match.set1Player2 = set1Player2-1;
			}else{
				match.set2Player2 = set2Player2-1;
			}	
		}

	}else{
		if(set1Player2 > 0){
			match.set1Player2 = set1Player2-1;
		}
	}

	if(match.player1Serving === "0"){
		match.player1Serving = 1;
	}else{
		match.player1Serving = 0;
	}

	$scope.updateMatchLive(match);

}

$scope.player1CanMoins = function(match){
	var canMoins = true;
		
	var set1Player1 = parseInt(match.set1Player1);
	var set2Player1 = parseInt(match.set2Player1);
	var set3Player1 = parseInt(match.set3Player1);

	if(match.set1Finished === false){
		
		if(set1Player1 <= 0){
			canMoins = false;
		}
	}

	if(match.set2Finished === false){
		if(set2Player1 <= 0){
			if(match.set1Finished === false){
			
				if(set1Player1 <= 0){
					canMoins = false;
				}
			}
		}
		
	}


	if(match.set3Finished === false){
		if(set3Player1 <= 0){
			if(match.set2Finished === false){
		if(set2Player1 <= 0){
			if(match.set1Finished === false){
			
				if(set1Player1 <= 0){
					canMoins = false;
				}
			}
		}
		
	}
		}
	}

	return canMoins;
}

$scope.player2CanMoins = function(match){
	var canMoins = true;
		
	var set1Player2 = parseInt(match.set1Player2);
	var set2Player2 = parseInt(match.set2Player2);
	var set3Player2 = parseInt(match.set3Player2);

	if(match.set1Finished === false){
		
		if(set1Player2 <= 0){
			canMoins = false;
		}
	}

	if(match.set2Finished === false){
		if(set2Player2 <= 0){
			if(match.set1Finished === false){
			
				if(set1Player2 <= 0){
					canMoins = false;
				}
			}
		}
		
	}


	if(match.set3Finished === false){
		if(set3Player2 <= 0){
			if(match.set2Finished === false){
		if(set2Player2 <= 0){
			if(match.set1Finished === false){
			
				if(set1Player2 <= 0){
					canMoins = false;
				}
			}
		}
		
	}
		}
	}

	return canMoins;
}


matchService.getMatchesLive().then(function(values){

        $scope.matchesLive = values;
        $scope.checkSetsFinished();
        $scope.init();

      }
    	);


$interval(function() {
   
   $scope.getMatchesLive();

}, 30000);



  });
