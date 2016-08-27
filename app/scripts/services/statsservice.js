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

    	var matchesConcerned = 0;

    	for(var i = 0; i < matches.length; i++){
    		var match = matches[i];
    		if(match.idWinner == player1.idPlayer){
    			countVictoriesPlayer1++;
    			matchesConcerned++;
    			if(match.sets.length == 2)
    				countVictoriesPlayer1In2Sets++;
    		}
    			
    		else if(match.idWinner == player2.idPlayer){
    			countVictoriesPlayer2++; 
    			matchesConcerned++;
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

    	return stats;

    }


    this.generateInOutPercentageWithVictories = function(matches, player1, player2){

    	var stats = [];
    	var statsIn = {}
    	var statsOut = {}

    	var countMatchIn = 0;

    	var countVictoriesPlayer1In = 0;
    	var countVictoriesPlayer2In = 0;

    	var countVictoriesPlayer1Out = 0;
    	var countVictoriesPlayer2Out = 0;

    	for(var i = 0; i < matches.length; i++){
    		var match = matches[i];
    		if(match.indoorMatch == "1"){ 
	    		countMatchIn++;
	    		if(match.idWinner == player1.idPlayer)
	    			countVictoriesPlayer1In++;   			
	    		else if(match.idWinner == player2.idPlayer)
	    			countVictoriesPlayer2In++; 
	    		
    		}else{
    			if(match.idWinner == player1.idPlayer)
	    			countVictoriesPlayer1Out++;   			
	    		else if(match.idWinner == player2.idPlayer)
	    			countVictoriesPlayer2Out++; 
    		}
    			
    	}

    	statsIn.type = "Matches IN";
    	statsIn.percent = this.roundTo2decimals(countMatchIn*100/matches.length);
    	statsIn.percentToDisplay = this.roundTo2decimals(countMatchIn*100/matches.length);
    	
    	var statsInPlayers = [];
    	var statsInPlayer1 = {'name' : player1.firstName + " " + player1.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer1In*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer1In*100/countMatchIn)
    						}
    	var statsInPlayer2 = {'name' : player2.firstName + " " + player2.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer2In*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer2In*100/countMatchIn)
    						}

    	statsInPlayers.push(statsInPlayer1);
    	statsInPlayers.push(statsInPlayer2);
    	statsIn.statsPlayer = statsInPlayers;

    	statsOut.type = "Matches OUT";
    	statsOut.percent = this.roundTo2decimals(100 - countMatchIn*100/matches.length);
    	statsIn.percentToDisplay = this.roundTo2decimals(100 - countMatchIn*100/matches.length);
    	
    	var statsOutPlayers = [];
    	var statsOutPlayer1 = {'name' : player1.firstName + " " + player1.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer1Out*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer1Out*100/(matches.length - countMatchIn))
    						}
    	var statsOutPlayer2 = {'name' : player2.firstName + " " + player2.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer2Out*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer2Out*100/(matches.length - countMatchIn))
    						}

    	statsOutPlayers.push(statsOutPlayer1);
    	statsOutPlayers.push(statsOutPlayer2);
    	statsOut.statsPlayer = statsOutPlayers;

    	stats.push(statsIn);
    	stats.push(statsOut);

    	return stats;

    }


    this.generateSuperTieBreakPercentage = function(matches, player1, player2){

        var stats = []
        var statsMatchesWithSB = {}
        var statsMatchesWithoutSB = {}

        var countMatchWithSB = 0;
        var countMatchWithSBWonByPlayer1 = 0;
        var countMatchWithSBWonByPlayer2 = 0;

        var countMatchWithoutSBWonByPlayer1 = 0;
        var countMatchWithoutSBWonByPlayer2 = 0;

        

        for(var i = 0; i < matches.length; i++){
            var isMatchWithSB = false;
            for(var j = 0; j < matches[i].sets.length; j++){
                if(matches[i].sets[j].superTieBreak == "1"){
                    countMatchWithSB++;
                    isMatchWithSB = true;
                    if(matches[i].idWinner == player1.idPlayer)
                        countMatchWithSBWonByPlayer1++;
                    else if(matches[i].idWinner == player2.idPlayer)
                        countMatchWithSBWonByPlayer2++;
                    
                }
                    
            }
            if(!isMatchWithSB){
                 if(matches[i].idWinner == player1.idPlayer)
                        countMatchWithoutSBWonByPlayer1++;
                    else if(matches[i].idWinner == player2.idPlayer)
                        countMatchWithoutSBWonByPlayer2++;
            }

                
        }

        statsMatchesWithSB.type = "Matches avec SB";
        statsMatchesWithSB.percent = this.roundTo2decimals(countMatchWithSB*100/matches.length);
        statsMatchesWithSB.percentToDisplay = this.roundTo2decimals(countMatchWithSB*100/matches.length);

        var statsMatchWithSBPlayer1Victories = {}
        statsMatchWithSBPlayer1Victories.percent = this.roundTo2decimals(countMatchWithSBWonByPlayer1*100/matches.length);
        statsMatchWithSBPlayer1Victories.percentToDisplay = this.roundTo2decimals(countMatchWithSBWonByPlayer1*100/countMatchWithSB);
        
        var statsMatchWithSBPlayer2Victories = {}
        statsMatchWithSBPlayer2Victories.percent = this.roundTo2decimals(countMatchWithSBWonByPlayer2*100/matches.length);
        statsMatchWithSBPlayer2Victories.percentToDisplay = this.roundTo2decimals(countMatchWithSBWonByPlayer2*100/countMatchWithSB);

        var statsPlayersWithSB = [];
        statsPlayersWithSB.push(statsMatchWithSBPlayer1Victories);
        statsPlayersWithSB.push(statsMatchWithSBPlayer2Victories);

        statsMatchesWithSB.statsPlayer = statsPlayersWithSB;

        statsMatchesWithoutSB.type = "Matches sans SB";
        statsMatchesWithoutSB.percent = this.roundTo2decimals(100 - (countMatchWithSB*100/matches.length));
        statsMatchesWithoutSB.percent = this.roundTo2decimals(100 - (countMatchWithSB*100/matches.length));

        var statsMatchWithoutSBPlayer1Victories = {}
        statsMatchWithoutSBPlayer1Victories.percent = this.roundTo2decimals(countMatchWithoutSBWonByPlayer1*100/matches.length);
        statsMatchWithoutSBPlayer1Victories.percentToDisplay = this.roundTo2decimals(countMatchWithoutSBWonByPlayer1*100/(matches.length - countMatchWithSB));
        
        var statsMatchWithoutSBPlayer2Victories = {}
        statsMatchWithoutSBPlayer2Victories.percent = this.roundTo2decimals(countMatchWithoutSBWonByPlayer2*100/matches.length);
        statsMatchWithoutSBPlayer2Victories.percentToDisplay = this.roundTo2decimals(countMatchWithoutSBWonByPlayer2*100/(matches.length - countMatchWithSB));

        var statsPlayersWithoutSB = [];
        statsPlayersWithoutSB.push(statsMatchWithoutSBPlayer1Victories);
        statsPlayersWithoutSB.push(statsMatchWithoutSBPlayer2Victories);

        statsMatchesWithoutSB.statsPlayer = statsPlayersWithoutSB;

        stats.push(statsMatchesWithSB);
        stats.push(statsMatchesWithoutSB);

        console.log(stats);       
        return stats;

    }


/*

################## UTILS FUNCTIONS #######################

*/


    this.roundTo2decimals = function(value){
    	return +(Math.round(value + "e+2") + "e-2");
    }


  });
