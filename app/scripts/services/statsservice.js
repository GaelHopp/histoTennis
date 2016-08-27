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

    	var stats = [];
    	var statsPlayer1 = {'id' : player1.idPlayer}
    	var statsPlayer2 = {'id' : player2.idPlayer}

    	var countVictoriesPlayer1 = 0;
    	var countVictoriesPlayer2 = 0;

    	var countVictoriesPlayer1In2Sets = 0;
    	var countVictoriesPlayer2In2Sets = 0;

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

    	var statsPlayer1Victories = this.roundTo2decimals((countVictoriesPlayer1*100)/(countVictoriesPlayer1+countVictoriesPlayer2));
    	statsPlayer1.victories = statsPlayer1Victories;

    	statsPlayer1.victories2Sets = {} 
    	statsPlayer1.victories3Sets = {} 
    	statsPlayer2.victories2Sets = {} 
    	statsPlayer2.victories3Sets = {}

    	var statsPlayer1Victories2Sets = this.roundTo2decimals(countVictoriesPlayer1In2Sets*100/(countVictoriesPlayer1+countVictoriesPlayer2));
    	statsPlayer1.victories2Sets.real = statsPlayer1Victories2Sets;
    	statsPlayer1.victories2Sets.displayed = this.roundTo2decimals(countVictoriesPlayer1In2Sets*100/(countVictoriesPlayer1));

    	statsPlayer1.victories3Sets.real = this.roundTo2decimals(statsPlayer1Victories - statsPlayer1Victories2Sets);
    	statsPlayer1.victories3Sets.displayed = this.roundTo2decimals(100-statsPlayer1.victories2Sets.displayed);
    	
    	var statsPlayer2Victories = this.roundTo2decimals((countVictoriesPlayer2*100)/(countVictoriesPlayer1+countVictoriesPlayer2));
    	statsPlayer2.victories = statsPlayer2Victories;

    	var statsPlayer2Victories2Sets = this.roundTo2decimals(countVictoriesPlayer2In2Sets*100/(countVictoriesPlayer2+countVictoriesPlayer1));
    	statsPlayer2.victories2Sets.real = statsPlayer2Victories2Sets;
    	statsPlayer2.victories2Sets.displayed = this.roundTo2decimals(countVictoriesPlayer2In2Sets*100/(countVictoriesPlayer2));

    	statsPlayer2.victories3Sets.real = this.roundTo2decimals(statsPlayer2Victories - statsPlayer2Victories2Sets);
    	statsPlayer2.victories3Sets.displayed = this.roundTo2decimals(100-statsPlayer2.victories2Sets.displayed);
    	
    	stats.push(statsPlayer1);
    	stats.push(statsPlayer2);

    	console.log(stats);

    	return stats;

    }


    this.roundTo2decimals = function(value){
    	return +(Math.round(value + "e+2") + "e-2");
    }


  });
