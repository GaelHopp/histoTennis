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

    matchService.getPlayers().then(function(values){

        $scope.players = values;

      }
    	);


    $scope.init = function(){
    	$scope.set1TB = false;
    	$scope.set2TB = false;
    	$scope.set3TB = false;
    	$scope.is3sets = false;
    	$scope.scoreCorrect = false;
    }


    $scope.checkScore = function(){
    	var set1Correct = $scope.checkSet(1, $scope.pointsSet1Player1, $scope.pointsSet1Player2);
    	var set2Correct = $scope.checkSet(2, $scope.pointsSet2Player1, $scope.pointsSet2Player2);
    	var correct = false;

    	if(set1Correct === true && set2Correct === true){
    		
    		$scope.isA3Set($scope.pointsSet1Player1, $scope.pointsSet1Player2, $scope.pointsSet2Player1, $scope.pointsSet2Player2);
    		if($scope.is3sets === true){
    			correct = $scope.checkSet3($scope.pointsSet3Player1, $scope.pointsSet3Player2);
    		}else{
    			correct = true;
    		}
    	}else{
    		$scope.is3sets = false;
    	}

    	$scope.scoreCorrect = correct;
    };

	

	/*
				UTILS
	*/

	$scope.checkSet = function(setNumber, pointsPlayer1, pointsPlayer2){
		var correct = false;

		if(setNumber === 1){
			$scope.set1TB = false;
		}
		if(setNumber === 2){
			$scope.set2TB = false;
		}

		if(pointsPlayer1 != "" && pointsPlayer2 != ""){
			if(isNaN(pointsPlayer1) === false && isNaN(pointsPlayer2) === false){
				var pointsPlayer1Number = parseInt(pointsPlayer1);
				var pointsPlayer2Number = parseInt(pointsPlayer2);

				if(pointsPlayer1Number === 6 && (pointsPlayer2Number < 5 || pointsPlayer2Number === 7)){
					if(pointsPlayer2Number === 7 && pointsPlayer1Number === 6){
						if(setNumber === 1){
							$scope.set1TB = true;
							var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet1Player1TB, $scope.pointsSet1Player2TB);
							if(tbCorrect){
								correct = true;
							}
						}
						if(setNumber === 2){
							$scope.set2TB = true;
							var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet2Player1TB, $scope.pointsSet2Player2TB);
							if(tbCorrect){
								correct = true;
							}
						}

					}else{
						correct = true;
					}
					
					
				}

				if(pointsPlayer2Number === 6 && (pointsPlayer1Number < 5 || pointsPlayer1Number === 7)){
					if(pointsPlayer1Number === 7 && pointsPlayer2Number === 6){
						if(setNumber === 1){
							$scope.set1TB = true;
							var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet1Player1TB, $scope.pointsSet1Player2TB);
							if(tbCorrect){
								correct = true;
							}
						}
						if(setNumber === 2){
							$scope.set2TB = true;
							var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet2Player1TB, $scope.pointsSet2Player2TB);
							if(tbCorrect){
								correct = true;
							}
						}
					}else{
						correct = true;
					}
					
				}

			}
		
		}

		return correct;

	};


	$scope.checkSet3 = function(pointsPlayer1, pointsPlayer2){
		var correct = false;

		$scope.set3TB = false;

		if(pointsPlayer1 != "" && pointsPlayer2 != ""){
			if(isNaN(pointsPlayer1) === false && isNaN(pointsPlayer2) === false){
				var pointsPlayer1Number = parseInt(pointsPlayer1);
				var pointsPlayer2Number = parseInt(pointsPlayer2);

				if(pointsPlayer1Number === 6 && (pointsPlayer2Number < 5 || pointsPlayer2Number === 7)){
					if(pointsPlayer2Number === 7 && pointsPlayer1Number === 6){
						$scope.set3TB = true;
						var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet3Player1TB, $scope.pointsSet3Player2TB);
							if(tbCorrect){
								correct = true;
							}
					}else{
						correct = true;
					}
					
				}

				if(pointsPlayer2Number === 6 && (pointsPlayer1Number < 5 || pointsPlayer1Number === 7)){
					if(pointsPlayer1Number === 7 && pointsPlayer2Number === 6){
						$scope.set3TB = true;
						var tbCorrect = $scope.checkSetTB(pointsPlayer1, pointsPlayer2, $scope.pointsSet3Player1TB, $scope.pointsSet3Player2TB);
							if(tbCorrect){
								correct = true;
							}
					}else{
						correct = true;
					}
					
				}

				if(pointsPlayer1Number === 10 && pointsPlayer2Number <= 8){
					correct = true;
				}

				if(pointsPlayer2Number === 10 && pointsPlayer1Number <= 8){
					correct = true;
				}

				if(pointsPlayer1Number > 10 && pointsPlayer2Number === pointsPlayer1Number-2){
					correct = true;
				}

				if(pointsPlayer2Number > 10 && pointsPlayer1Number === pointsPlayer2Number-2){
					correct = true;
				}

			}
		
		}

		return correct;

	};


	$scope.checkSetTB = function(pointsPlayer1Set, pointsPlayer2Set, pointsPlayer1, pointsPlayer2){
		var correct = false;


		if(pointsPlayer1 != "" && pointsPlayer2 != ""){
			if(isNaN(pointsPlayer1) === false && isNaN(pointsPlayer2) === false){
				var pointsPlayer1Number = parseInt(pointsPlayer1);
				var pointsPlayer2Number = parseInt(pointsPlayer2);
				var pointsPlayer1SetNumber = parseInt(pointsPlayer1Set);
				var pointsPlayer2SetNumber = parseInt(pointsPlayer2Set);

				if(pointsPlayer1Number === 7 && pointsPlayer2Number <= 5 && pointsPlayer1Set > pointsPlayer2Set){
					correct = true;
				}

				if(pointsPlayer2Number === 7 && pointsPlayer1Number <= 5 && pointsPlayer2Set > pointsPlayer1Set){
					correct = true;
				}

				if(pointsPlayer2Number > 7 && pointsPlayer1Number === pointsPlayer2Number-2 && pointsPlayer2Set > pointsPlayer1Set){
					correct = true;
				}

				if(pointsPlayer1Number > 7 && pointsPlayer2Number === pointsPlayer1Number-2 && pointsPlayer1Set > pointsPlayer2Set){
					correct = true;
				}
				

			}
		
		}

		return correct;

	};

	$scope.isA3Set = function(pointsSet1Player1, pointsSet1Player2, pointsSet2Player1, pointsSet2Player2){
		
		$scope.is3sets = false;

		if(pointsSet1Player1 > pointsSet1Player2 && pointsSet2Player2 > pointsSet2Player1){
			$scope.is3sets = true;
		}

		if(pointsSet1Player2 > pointsSet1Player1 && pointsSet2Player1 > pointsSet2Player2){
			$scope.is3sets = true;
		}
	};

	$scope.init();

  });
