'use strict';

/**
 * @ngdoc service
 * @name histoTennisApp.statsService
 * @description
 * # statsService
 * Service in the histoTennisApp.
 */
angular.module('histoTennisApp')
  .service('statsService', function () {
    
    this.generateVictoriesPercentage = function(matches, player1, player2){

    	var countVictoriesPlayer1 = 0;
    	var countVictoriesPlayer2 = 0;

    	var countVictoriesPlayer1In2Sets = 0;
    	var countVictoriesPlayer2In2Sets = 0;


    	var victoriesDatas = [];

    	for(var i = 0; i < matches.length; i++){
    		var match = matches[i];
    		if(match.idWinner == player1.idPlayer){
    			countVictoriesPlayer1++;
    			if(match.sets.length == 2)
    				countVictoriesPlayer1In2Sets++;
    		}
    			
    		else if(match.idWinner == player2.idPlayer){
    			countVictoriesPlayer2++; 
    			if(match.sets.length == 2)
    				countVictoriesPlayer2In2Sets++;
    		}
    			

    	}

    	var victoriesPlayer1Percentage = this.roundTo2decimals((countVictoriesPlayer1*100)/(countVictoriesPlayer1+countVictoriesPlayer2));
    	
    	var victoriesPlayer1In2SetsPercentage = this.roundTo2decimals(countVictoriesPlayer1In2Sets*100/(countVictoriesPlayer1+countVictoriesPlayer2));
    	var victoriesPlayer1In3SetsPercentage = this.roundTo2decimals(victoriesPlayer1Percentage - victoriesPlayer1In2SetsPercentage);
    	var victoriesPlayer1In2SetsPercentageInOwnVictories = this.roundTo2decimals(countVictoriesPlayer1In2Sets*100/countVictoriesPlayer1);
    	var victoriesPlayer1In3SetsPercentageInOwnVictories = this.roundTo2decimals(100 - victoriesPlayer1In2SetsPercentageInOwnVictories);

    	var victoriesPlayer2Percentage = this.roundTo2decimals((countVictoriesPlayer2*100)/(countVictoriesPlayer1+countVictoriesPlayer2));
    	
    	var victoriesPlayer2In2SetsPercentage = this.roundTo2decimals(countVictoriesPlayer2In2Sets*100/(countVictoriesPlayer2+countVictoriesPlayer1));
    	var victoriesPlayer2In3SetsPercentage = this.roundTo2decimals(victoriesPlayer2Percentage - victoriesPlayer2In2SetsPercentage);
    	var victoriesPlayer2In2SetsPercentageInOwnVictories = this.roundTo2decimals(countVictoriesPlayer2In2Sets*100/countVictoriesPlayer2);
    	var victoriesPlayer2In3SetsPercentageInOwnVictories = this.roundTo2decimals(100 - victoriesPlayer2In2SetsPercentageInOwnVictories);

    	var victoriesPlayer1 = {}
    	victoriesPlayer1.type = player1.firstName + " " + player1.lastName;
    	victoriesPlayer1.percent = victoriesPlayer1Percentage;
    	victoriesPlayer1.percentToDisplay = victoriesPlayer1Percentage;
    	victoriesPlayer1.color = "#ff9e01";


    	var splitVictoriesPlayer1 = [];
    	var victoriesIn2SetsPlayer1 = {}
    	victoriesIn2SetsPlayer1.type = "2 sets";
    	victoriesIn2SetsPlayer1.percent = victoriesPlayer1In2SetsPercentage;
    	victoriesIn2SetsPlayer1.percentToDisplay = victoriesPlayer1In2SetsPercentageInOwnVictories;

    	var victoriesIn3SetsPlayer1 = {}
    	victoriesIn3SetsPlayer1.type = "3 sets";
    	victoriesIn3SetsPlayer1.percent = victoriesPlayer1In3SetsPercentage;
    	victoriesIn3SetsPlayer1.percentToDisplay = victoriesPlayer1In3SetsPercentageInOwnVictories;

    	splitVictoriesPlayer1.push(victoriesIn2SetsPlayer1);
    	splitVictoriesPlayer1.push(victoriesIn3SetsPlayer1);
    	victoriesPlayer1.subs = splitVictoriesPlayer1;


    	var victoriesPlayer2 = {}
    	victoriesPlayer2.type = player2.firstName + " " + player2.lastName;
    	victoriesPlayer2.percent = victoriesPlayer2Percentage;
    	victoriesPlayer2.percentToDisplay = victoriesPlayer2Percentage;
    	victoriesPlayer2.color = "#b0de09";

    	var splitVictoriesPlayer2 = [];
    	var victoriesIn2SetsPlayer2 = {}
    	victoriesIn2SetsPlayer2.type = "2 sets";
    	victoriesIn2SetsPlayer2.percent = victoriesPlayer2In2SetsPercentage;
    	victoriesIn2SetsPlayer2.percentToDisplay = victoriesPlayer2In2SetsPercentageInOwnVictories;
    	
    	var victoriesIn3SetsPlayer2 = {}
    	victoriesIn3SetsPlayer2.type = "3 sets";
    	victoriesIn3SetsPlayer2.percent = victoriesPlayer2In3SetsPercentage;
    	victoriesIn3SetsPlayer2.percentToDisplay = victoriesPlayer2In3SetsPercentageInOwnVictories;

    	splitVictoriesPlayer2.push(victoriesIn2SetsPlayer2);
    	splitVictoriesPlayer2.push(victoriesIn3SetsPlayer2);
    	victoriesPlayer2.subs = splitVictoriesPlayer2;



    	victoriesDatas.push(victoriesPlayer1);
    	victoriesDatas.push(victoriesPlayer2);

    	return victoriesDatas;

    }


    this.roundTo2decimals = function(value){
    	return +(Math.round(value + "e+2") + "e-2");
    }


  });
