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
    	$scope.indoorMatch = true;
    	$scope.pointsSet1Player1 = "";
    	$scope.pointsSet1Player2 = "";
    	$scope.pointsSet2Player1 = "";
    	$scope.pointsSet2Player2 = "";
    	$scope.pointsSet3Player1 = "";
    	$scope.pointsSet3Player2 = "";
    	$scope.pointsSet1Player1TB = "";
    	$scope.pointsSet1Player2TB = "";
    	$scope.pointsSet2Player1TB = "";
    	$scope.pointsSet2Player2TB = "";
    	$scope.pointsSet3Player1TB = "";
    	$scope.pointsSet3Player2TB = "";

    	var today = new Date();
    	var stringToday = today.toISOString().substring(0, 10);
    	
    	$scope.matchToSave = {
    		dateMatch : stringToday
    	};

    	

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
    			$scope.pointsSet3Player1TB = "";
    			$scope.pointsSet3Player2TB = "";
    			$scope.pointsSet3Player1 = "";
    			$scope.pointsSet3Player2 = "";
    			correct = true;
    		}
    	}else{
    		$scope.is3sets = false;
    		$scope.pointsSet3Player1TB = "";
    		$scope.pointsSet3Player2TB = "";
    		$scope.pointsSet3Player1 = "";
    		$scope.pointsSet3Player2 = "";
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

				if((pointsPlayer1Number === 6 && (pointsPlayer2Number < 5 || pointsPlayer2Number === 7)) || (pointsPlayer1Number === 7 && pointsPlayer2Number === 5)){
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



				if((pointsPlayer2Number === 6 && (pointsPlayer1Number < 5 || pointsPlayer1Number === 7)) || (pointsPlayer2Number === 7 && pointsPlayer1Number === 5)){
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

				if((pointsPlayer1Number === 6 && (pointsPlayer2Number < 5 || pointsPlayer2Number === 7)) || (pointsPlayer1Number === 7 && pointsPlayer2Number === 5)){
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

				if((pointsPlayer2Number === 6 && (pointsPlayer1Number < 5 || pointsPlayer1Number === 7)) || (pointsPlayer2Number === 7 && pointsPlayer1Number === 5)){
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


	$scope.constructMatchToSave = function(pointsSet1Player1, pointsSet1Player2, pointsSet2Player1, pointsSet2Player2, pointsSet3Player1, pointsSet3Player2, pointsSet1Player1TB, pointsSet1Player2TB, pointsSet2Player1TB, pointsSet2Player2TB, pointsSet3Player1TB, pointsSet3Player2TB){
		
		if($scope.indoorMatch){
			$scope.matchToSave.indoorMatch = 1;
		}else{
			$scope.matchToSave.indoorMatch = 0;
		}
		

		if(pointsSet1Player1 > pointsSet1Player2){
			if(pointsSet2Player1 > pointsSet2Player2){
				$scope.matchToSave.idWinner = 1;
				$scope.matchToSave.idLoser = 2;
			}else{
				if(pointsSet3Player1 > pointsSet3Player2){
					$scope.matchToSave.idWinner = 1;
				$scope.matchToSave.idLoser = 2;
				}else{
					$scope.matchToSave.idWinner = 2;
				$scope.matchToSave.idLoser = 1;
				}
			}

		}else{
			if(pointsSet2Player1 < pointsSet2Player2){
				$scope.matchToSave.idWinner = 2;
				$scope.matchToSave.idLoser = 1;
			}else{
				if(pointsSet3Player1 > pointsSet3Player2){
					$scope.matchToSave.idWinner = 1;
				$scope.matchToSave.idLoser = 2;
				}else{
					$scope.matchToSave.idWinner = 2;
				$scope.matchToSave.idLoser = 1;
				}
			}
		}


		
			
			var tieBreakLoserPointsSet1 = null;
			var tieBreakLoserPointsSet2 = null;
			var tieBreakLoserPointsSet3 = null;

			if(pointsSet1Player1 === 7 && pointsSet1Player2 === 6){
				tieBreakLoserPointsSet1 = pointsSet1Player2TB;
			}
			if(pointsSet1Player1 === 6 && pointsSet1Player2 === 7){
				tieBreakLoserPointsSet1 = pointsSet1Player1TB;
			}

			if(pointsSet2Player1 === 7 && pointsSet2Player2 === 6){
				tieBreakLoserPointsSet2 = pointsSet2Player2TB;
			}
			if(pointsSet2Player1 === 6 && pointsSet2Player2 === 7){
				tieBreakLoserPointsSet2 = pointsSet2Player1TB;
			}

			if(pointsSet3Player1 != null){

				if(pointsSet3Player1 === 7 && pointsSet3Player2 === 6){
					tieBreakLoserPointsSet3 = pointsSet3Player2TB;
				}
				if(pointsSet3Player1 === 6 && pointsSet3Player2 === 7){
					tieBreakLoserPointsSet3 = pointsSet3Player1TB;
				}

			}


			if($scope.matchToSave.idWinner === 1){

				$scope.matchToSave.sets = [{
					winnerGames : $scope.pointsSet1Player1,
					loserGames : $scope.pointsSet1Player2,
					superTieBreak : 0,
					tiebreakLoserPoints : tieBreakLoserPointsSet1
					},
					{
					winnerGames : $scope.pointsSet2Player1,
					loserGames : $scope.pointsSet2Player2,
					superTieBreak : 0,
					tiebreakLoserPoints : tieBreakLoserPointsSet2
					}
				];

				if(pointsSet3Player1 != null){
					var isSTB = 0;
					if(pointsSet3Player1 > 9 || pointsSet3Player2 > 9){
						isSTB = 1;
					}

					$scope.matchToSave.sets[2] = {
						winnerGames : $scope.pointsSet3Player1,
						loserGames : $scope.pointsSet3Player2,
						superTieBreak : isSTB,
						tiebreakLoserPoints : tieBreakLoserPointsSet3
					};

				}
		}


		if($scope.matchToSave.idWinner === 2){

				$scope.matchToSave.sets = [{
					winnerGames : $scope.pointsSet1Player2,
					loserGames : $scope.pointsSet1Player1,
					superTieBreak : 0,
					tiebreakLoserPoints : tieBreakLoserPointsSet1
					},
					{
					winnerGames : $scope.pointsSet2Player2,
					loserGames : $scope.pointsSet2Player1,
					superTieBreak : 0,
					tiebreakLoserPoints : tieBreakLoserPointsSet2
					}
				];

				if(pointsSet3Player1 != null){
					var isSTB = 0;
					if(pointsSet3Player1 > 9 || pointsSet3Player2 > 9){
						isSTB = 1;
					}

					$scope.matchToSave.sets[2] = {
						winnerGames : $scope.pointsSet3Player2,
						loserGames : $scope.pointsSet3Player1,
						superTieBreak : isSTB,
						tiebreakLoserPoints : tieBreakLoserPointsSet3
					};

				}
		}
		
	};

	
	$scope.save = function(){
		var pointsSet3Player1 = null;
		var pointsSet3Player2 = null;
		var pointsSet3Player1TB = null;
		var pointsSet3Player2TB = null;

		var pointsSet1Player1TB = null;
		var pointsSet1Player2TB = null;
		var pointsSet2Player1TB = null;
		var pointsSet2Player2TB = null;

		var pointsSet1Player1 = parseInt($scope.pointsSet1Player1);
		var pointsSet1Player2 = parseInt($scope.pointsSet1Player2);
		var pointsSet2Player1 = parseInt($scope.pointsSet2Player1);
		var pointsSet2Player2 = parseInt($scope.pointsSet2Player2);

		if($scope.pointsSet1Player1TB != "" && isNaN($scope.pointsSet1Player1TB) === false){
			pointsSet1Player1TB = parseInt($scope.pointsSet1Player1TB);
		}

		if($scope.pointsSet1Player2TB != "" && isNaN($scope.pointsSet1Player2TB) === false){
			pointsSet1Player2TB = parseInt($scope.pointsSet1Player2TB);
		}

		if($scope.pointsSet2Player1TB != "" && isNaN($scope.pointsSet2Player1TB) === false){
			pointsSet2Player1TB = parseInt($scope.pointsSet2Player1TB);
		}

		if($scope.pointsSet2Player2TB != "" && isNaN($scope.pointsSet2Player2TB) === false){
			pointsSet2Player2TB = parseInt($scope.pointsSet2Player2TB);
		}

		if($scope.pointsSet3Player1 != "" && isNaN($scope.pointsSet3Player1) === false){
			pointsSet3Player1 = parseInt($scope.pointsSet3Player1);
		}

		if($scope.pointsSet3Player2 != "" && isNaN($scope.pointsSet3Player2) === false){
			pointsSet3Player2 = parseInt($scope.pointsSet3Player2);
		}

		if($scope.pointsSet3Player1TB != "" && isNaN($scope.pointsSet3Player1TB) === false){
			pointsSet3Player1TB = parseInt($scope.pointsSet3Player1TB);
		}

		if($scope.pointsSet3Player2TB != "" && isNaN($scope.pointsSet3Player2TB) === false){
			pointsSet3Player2TB = parseInt($scope.pointsSet3Player2TB);
		}

		$scope.constructMatchToSave(pointsSet1Player1, pointsSet1Player2, pointsSet2Player1, pointsSet2Player2, pointsSet3Player1, pointsSet3Player2, pointsSet1Player1TB, pointsSet1Player2TB, pointsSet2Player1TB, pointsSet2Player2TB, pointsSet3Player1TB, pointsSet3Player2TB);
		matchService.saveMatch($scope.matchToSave).then(function(values){

       $scope.matches = values;
       $scope.init();

      });


	}


	$scope.init();

  });
