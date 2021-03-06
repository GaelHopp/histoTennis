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
    	var statsPlayer1 = {'id' : player1.idPlayer};
    	var statsPlayer2 = {'id' : player2.idPlayer};

    	var countVictoriesPlayer1 = 0;
    	var countVictoriesPlayer2 = 0;

    	var countVictoriesPlayer1In2Sets = 0;
    	var countVictoriesPlayer2In2Sets = 0;

    	var matchesConcerned = 0;

    	for(var i = 0; i < matches.length; i++){
    		var match = matches[i];
    		if(match.idWinner === player1.idPlayer){
    			countVictoriesPlayer1++;
    			matchesConcerned++;
    			if(match.sets.length === 2){
                    countVictoriesPlayer1In2Sets++;
                }
    		}
    			
    		else if(match.idWinner === player2.idPlayer){
    			countVictoriesPlayer2++; 
    			matchesConcerned++;
    			if(match.sets.length === 2){
                    countVictoriesPlayer2In2Sets++;
                }
    				
    		}
    			
    	}

    	var statsPlayer1Victories = this.roundTo2decimals((countVictoriesPlayer1*100)/(countVictoriesPlayer1+countVictoriesPlayer2));
    	statsPlayer1.victories = statsPlayer1Victories;

    	statsPlayer1.victories2Sets = {}; 
    	statsPlayer1.victories3Sets = {}; 
    	statsPlayer2.victories2Sets = {}; 
    	statsPlayer2.victories3Sets = {};

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

    };


    this.generateInOutPercentageWithVictories = function(matches, player1, player2){

    	var stats = [];
    	var statsIn = {};
    	var statsOut = {};

    	var countMatchIn = 0;

    	var countVictoriesPlayer1In = 0;
    	var countVictoriesPlayer2In = 0;

    	var countVictoriesPlayer1Out = 0;
    	var countVictoriesPlayer2Out = 0;

    	for(var i = 0; i < matches.length; i++){
    		var match = matches[i];
    		if(match.indoorMatch === '1'){ 
	    		countMatchIn++;
	    		if(match.idWinner === player1.idPlayer){
                    countVictoriesPlayer1In++;              

                }
	    		else if(match.idWinner === player2.idPlayer){
                    countVictoriesPlayer2In++; 

                }
	    		
    		}else{
    			if(match.idWinner === player1.idPlayer){
                    countVictoriesPlayer1Out++;             
                }
	    		else if(match.idWinner === player2.idPlayer){
                    countVictoriesPlayer2Out++; 

                }
    		}
    			
    	}

    	statsIn.type = 'Matches IN';
    	statsIn.percent = this.roundTo2decimals(countMatchIn*100/matches.length);
    	statsIn.percentToDisplay = this.roundTo2decimals(countMatchIn*100/matches.length);
    	
    	var statsInPlayers = [];
    	var statsInPlayer1 = {'name' : player1.firstName + ' ' + player1.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer1In*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer1In*100/countMatchIn)
    						};
    	var statsInPlayer2 = {'name' : player2.firstName + ' ' + player2.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer2In*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer2In*100/countMatchIn)
    						};

    	statsInPlayers.push(statsInPlayer1);
    	statsInPlayers.push(statsInPlayer2);
    	statsIn.statsPlayer = statsInPlayers;

    	statsOut.type = 'Matches OUT';
    	statsOut.percent = this.roundTo2decimals(100 - countMatchIn*100/matches.length);
    	statsIn.percentToDisplay = this.roundTo2decimals(100 - countMatchIn*100/matches.length);
    	
    	var statsOutPlayers = [];
    	var statsOutPlayer1 = {'name' : player1.firstName + ' ' + player1.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer1Out*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer1Out*100/(matches.length - countMatchIn))
    						};
    	var statsOutPlayer2 = {'name' : player2.firstName + ' ' + player2.lastName, 
    						  'percent' : this.roundTo2decimals(countVictoriesPlayer2Out*100/matches.length),
    						  'percentToDisplay' : this.roundTo2decimals(countVictoriesPlayer2Out*100/(matches.length - countMatchIn))
    						};

    	statsOutPlayers.push(statsOutPlayer1);
    	statsOutPlayers.push(statsOutPlayer2);
    	statsOut.statsPlayer = statsOutPlayers;

    	stats.push(statsIn);
    	stats.push(statsOut);

    	return stats;

    };


    this.generateSuperTieBreakPercentage = function(matches, player1, player2){

        var stats = [];
        var statsMatchesWithSB = {};
        var statsMatchesWithoutSB = {};

        var countMatchWithSB = 0;
        var countMatchWithSBWonByPlayer1 = 0;
        var countMatchWithSBWonByPlayer2 = 0;

        var countMatchWithoutSBWonByPlayer1 = 0;
        var countMatchWithoutSBWonByPlayer2 = 0;

        

        for(var i = 0; i < matches.length; i++){
            var isMatchWithSB = false;
            for(var j = 0; j < matches[i].sets.length; j++){
                if(matches[i].sets[j].superTieBreak === '1'){
                    countMatchWithSB++;
                    isMatchWithSB = true;
                    if(matches[i].idWinner === player1.idPlayer){
                        countMatchWithSBWonByPlayer1++;

                    }
                    else if(matches[i].idWinner === player2.idPlayer){
                        countMatchWithSBWonByPlayer2++;

                    }
                    
                }
                    
            }
            if(!isMatchWithSB){
                 if(matches[i].idWinner === player1.idPlayer){
                        countMatchWithoutSBWonByPlayer1++;

                 }
                    else if(matches[i].idWinner === player2.idPlayer){
                        countMatchWithoutSBWonByPlayer2++;
                    }
            }

                
        }

        statsMatchesWithSB.type = 'Matches avec STB';
        statsMatchesWithSB.percent = this.roundTo2decimals(countMatchWithSB*100/matches.length);
        statsMatchesWithSB.percentToDisplay = this.roundTo2decimals(countMatchWithSB*100/matches.length);

        var statsMatchWithSBPlayer1Victories = {};
        statsMatchWithSBPlayer1Victories.percent = this.roundTo2decimals(countMatchWithSBWonByPlayer1*100/matches.length);
        statsMatchWithSBPlayer1Victories.percentToDisplay = this.roundTo2decimals(countMatchWithSBWonByPlayer1*100/countMatchWithSB);
        
        var statsMatchWithSBPlayer2Victories = {};
        statsMatchWithSBPlayer2Victories.percent = this.roundTo2decimals(countMatchWithSBWonByPlayer2*100/matches.length);
        statsMatchWithSBPlayer2Victories.percentToDisplay = this.roundTo2decimals(countMatchWithSBWonByPlayer2*100/countMatchWithSB);

        var statsPlayersWithSB = [];
        statsPlayersWithSB.push(statsMatchWithSBPlayer1Victories);
        statsPlayersWithSB.push(statsMatchWithSBPlayer2Victories);

        statsMatchesWithSB.statsPlayer = statsPlayersWithSB;

        statsMatchesWithoutSB.type = 'Matches sans STB';
        statsMatchesWithoutSB.percent = this.roundTo2decimals(100 - (countMatchWithSB*100/matches.length));
        statsMatchesWithoutSB.percent = this.roundTo2decimals(100 - (countMatchWithSB*100/matches.length));

        var statsMatchWithoutSBPlayer1Victories = {};
        statsMatchWithoutSBPlayer1Victories.percent = this.roundTo2decimals(countMatchWithoutSBWonByPlayer1*100/matches.length);
        statsMatchWithoutSBPlayer1Victories.percentToDisplay = this.roundTo2decimals(countMatchWithoutSBWonByPlayer1*100/(matches.length - countMatchWithSB));
        
        var statsMatchWithoutSBPlayer2Victories = {};
        statsMatchWithoutSBPlayer2Victories.percent = this.roundTo2decimals(countMatchWithoutSBWonByPlayer2*100/matches.length);
        statsMatchWithoutSBPlayer2Victories.percentToDisplay = this.roundTo2decimals(countMatchWithoutSBWonByPlayer2*100/(matches.length - countMatchWithSB));

        var statsPlayersWithoutSB = [];
        statsPlayersWithoutSB.push(statsMatchWithoutSBPlayer1Victories);
        statsPlayersWithoutSB.push(statsMatchWithoutSBPlayer2Victories);

        statsMatchesWithoutSB.statsPlayer = statsPlayersWithoutSB;

        stats.push(statsMatchesWithSB);
        stats.push(statsMatchesWithoutSB);

        
        return stats;

    };


    this.generateTieBreakPercentage = function(matches, player1, player2){

        var stats = [];
        var statsSetsWithTB = {};
        var statsSetsWithoutTB = {};

        var countSets = 0;
        var countTB = 0;
        
        var countTBWonByPlayer1 = 0;
        var countTBWonByPlayer2 = 0;

        var countOtherSetsWonByPlayer1 = 0;
        var countOtherSetsWonByPlayer2 = 0;

        


        for(var i = 0; i < matches.length; i++){
            for(var j = 0; j < matches[i].sets.length; j++){
               countSets++;
                if(matches[i].sets[j].tiebreakLoserPoints){
                   
                    countTB++;
                    if(matches[i].idWinner === player1.idPlayer){
                        if(matches[i].sets[j].winnerGames === '7'){
                            countTBWonByPlayer1++;
                        }
                        else{
                            countTBWonByPlayer2++;
                        }
                    }else if(matches[i].idWinner === player2.idPlayer){
                        if(matches[i].sets[j].winnerGames === '7'){
                            countTBWonByPlayer2++;
                        }
                        else{
                            countTBWonByPlayer1++;
                        }
                    }
                    
                }else{
                     
                     if(matches[i].idWinner === player1.idPlayer){
                        if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                            countOtherSetsWonByPlayer1++;
                        }
                        else{
                            countOtherSetsWonByPlayer2++;
                        }
                    }else{
                        if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                            countOtherSetsWonByPlayer2++;
                        }
                        else{
                            countOtherSetsWonByPlayer1++;
                        }
                            
                    }
                }
                    
            }
           
        }

      

        statsSetsWithTB.type = 'Sets avec TB';
        statsSetsWithTB.percent = this.roundTo2decimals(countTB*100/countSets);
        statsSetsWithTB.percentToDisplay = this.roundTo2decimals(countTB*100/countSets);

        var statsSetsWithTBPlayer1 = {};
        statsSetsWithTBPlayer1.percent = this.roundTo2decimals(countTBWonByPlayer1*100/countSets);
        statsSetsWithTBPlayer1.percentToDisplay = this.roundTo2decimals(countTBWonByPlayer1*100/countTB);
        
        var statsSetsWithTBPlayer2 = {};
        statsSetsWithTBPlayer2.percent = this.roundTo2decimals(countTBWonByPlayer2*100/countSets);
        statsSetsWithTBPlayer2.percentToDisplay = this.roundTo2decimals(countTBWonByPlayer2*100/countTB);

        var statsPlayersWithTB = [];
        statsPlayersWithTB.push(statsSetsWithTBPlayer1);
        statsPlayersWithTB.push(statsSetsWithTBPlayer2);

        statsSetsWithTB.statsPlayer = statsPlayersWithTB;

        statsSetsWithoutTB.type = 'Sets sans TB';
        statsSetsWithoutTB.percent = this.roundTo2decimals((countSets - countTB)*100/countSets);
        statsSetsWithoutTB.percentToDisplay = this.roundTo2decimals((countSets - countTB)*100/countSets);

        var statsSetsWithoutTBPlayer1 = {};
        statsSetsWithoutTBPlayer1.percent = this.roundTo2decimals(countOtherSetsWonByPlayer1*100/countSets);
        statsSetsWithoutTBPlayer1.percentToDisplay = this.roundTo2decimals(countOtherSetsWonByPlayer1*100/(countSets - countTB));
        
        var statsSetsWithoutTBPlayer2 = {};
        statsSetsWithoutTBPlayer2.percent = this.roundTo2decimals(countOtherSetsWonByPlayer2*100/countSets);
        statsSetsWithoutTBPlayer2.percentToDisplay = this.roundTo2decimals(countOtherSetsWonByPlayer2*100/(countSets - countTB));

        var statsPlayersWithoutTB = [];
        statsPlayersWithoutTB.push(statsSetsWithoutTBPlayer1);
        statsPlayersWithoutTB.push(statsSetsWithoutTBPlayer2);

        statsSetsWithoutTB.statsPlayer = statsPlayersWithoutTB;

       

        stats.push(statsSetsWithTB);
        stats.push(statsSetsWithoutTB); 

        
        return stats;

    };



    this.generateAfterWonFirstSetPercentage = function(matches, player1, player2){

        var stats = [];
        var statsMatchsWonAfterWonFirstSet = {};
        var statsMatchsWonAfterLoseFirstSet = {};

        var countMatches = matches.length;
        
        var countMatchesWonByPlayer1AfterWonFirstSet = 0;
        var countMatchesWonByPlayer2AfterWonFirstSet = 0;

        var countMatchesWonByPlayer1AfterLoseFirstSet = 0;
        var countMatchesWonByPlayer2AfterLoseFirstSet = 0;

        


        for(var i = 0; i < matches.length; i++){
            
            if(matches[i].sets.length === 2){
                if(matches[i].idWinner === player1.idPlayer){
                    countMatchesWonByPlayer1AfterWonFirstSet++;
                }

                if(matches[i].idWinner === player2.idPlayer){
                    countMatchesWonByPlayer2AfterWonFirstSet++;
                }
            }else{
                if(matches[i].idWinner === player1.idPlayer){
                    if(matches[i].sets[0].winnerGames < matches[i].sets[0].loserGames){
                        countMatchesWonByPlayer1AfterLoseFirstSet++;
                    }else{
                        countMatchesWonByPlayer1AfterWonFirstSet++;
                    }
                }

                if(matches[i].idWinner === player2.idPlayer){
                    if(matches[i].sets[0].winnerGames < matches[i].sets[0].loserGames){
                        countMatchesWonByPlayer2AfterLoseFirstSet++;
                    }else{
                        countMatchesWonByPlayer2AfterWonFirstSet++;
                    }
                }
            }
           
        }

      

        statsMatchsWonAfterWonFirstSet.type = 'Gain 1er set';
        statsMatchsWonAfterWonFirstSet.percent = this.roundTo2decimals((countMatchesWonByPlayer1AfterWonFirstSet+countMatchesWonByPlayer2AfterWonFirstSet)*100/countMatches);
        statsMatchsWonAfterWonFirstSet.percentToDisplay = this.roundTo2decimals((countMatchesWonByPlayer1AfterWonFirstSet+countMatchesWonByPlayer2AfterWonFirstSet)*100/countMatches);

        var statsMatchsWonAfterWonFirstSetPlayer1 = {};
        statsMatchsWonAfterWonFirstSetPlayer1.percent = this.roundTo2decimals(countMatchesWonByPlayer1AfterWonFirstSet*100/countMatches);
        statsMatchsWonAfterWonFirstSetPlayer1.percentToDisplay = this.roundTo2decimals(countMatchesWonByPlayer1AfterWonFirstSet*100/(countMatchesWonByPlayer1AfterWonFirstSet+countMatchesWonByPlayer2AfterWonFirstSet));
        
        var statsMatchsWonAfterWonFirstSetPlayer2 = {};
        statsMatchsWonAfterWonFirstSetPlayer2.percent = this.roundTo2decimals(countMatchesWonByPlayer2AfterWonFirstSet*100/countMatches);
        statsMatchsWonAfterWonFirstSetPlayer2.percentToDisplay = this.roundTo2decimals(countMatchesWonByPlayer2AfterWonFirstSet*100/(countMatchesWonByPlayer1AfterWonFirstSet+countMatchesWonByPlayer2AfterWonFirstSet));

        var statsPlayersWonAfterWonFirstSet = [];
        statsPlayersWonAfterWonFirstSet.push(statsMatchsWonAfterWonFirstSetPlayer1);
        statsPlayersWonAfterWonFirstSet.push(statsMatchsWonAfterWonFirstSetPlayer2);

        statsMatchsWonAfterWonFirstSet.statsPlayer = statsPlayersWonAfterWonFirstSet;

        
        statsMatchsWonAfterLoseFirstSet.type = 'Défaite 1er set';
        statsMatchsWonAfterLoseFirstSet.percent = this.roundTo2decimals((countMatchesWonByPlayer1AfterLoseFirstSet+countMatchesWonByPlayer2AfterLoseFirstSet)*100/countMatches);
        statsMatchsWonAfterLoseFirstSet.percentToDisplay = this.roundTo2decimals((countMatchesWonByPlayer1AfterLoseFirstSet+countMatchesWonByPlayer2AfterLoseFirstSet)*100/countMatches);

        var statsMatchsWonAfterLoseFirstSetPlayer1 = {};
        statsMatchsWonAfterLoseFirstSetPlayer1.percent = this.roundTo2decimals(countMatchesWonByPlayer1AfterLoseFirstSet*100/countMatches);
        statsMatchsWonAfterLoseFirstSetPlayer1.percentToDisplay = this.roundTo2decimals(countMatchesWonByPlayer1AfterLoseFirstSet*100/(countMatchesWonByPlayer1AfterLoseFirstSet+countMatchesWonByPlayer2AfterLoseFirstSet));
        
        var statsMatchsWonAfterLoseFirstSetPlayer2 = {};
        statsMatchsWonAfterLoseFirstSetPlayer2.percent = this.roundTo2decimals(countMatchesWonByPlayer2AfterLoseFirstSet*100/countMatches);
        statsMatchsWonAfterLoseFirstSetPlayer2.percentToDisplay = this.roundTo2decimals(countMatchesWonByPlayer2AfterLoseFirstSet*100/(countMatchesWonByPlayer1AfterLoseFirstSet+countMatchesWonByPlayer2AfterLoseFirstSet));

        var statsPlayersWonAfterLoseFirstSet = [];
        statsPlayersWonAfterLoseFirstSet.push(statsMatchsWonAfterLoseFirstSetPlayer1);
        statsPlayersWonAfterLoseFirstSet.push(statsMatchsWonAfterLoseFirstSetPlayer2);

        statsMatchsWonAfterLoseFirstSet.statsPlayer = statsPlayersWonAfterLoseFirstSet;

       

        stats.push(statsMatchsWonAfterWonFirstSet);
        stats.push(statsMatchsWonAfterLoseFirstSet); 

        
        return stats;

    };


    this.countVictoriesForPlayer = function(matches, player){

        var victories = 0;

        for(var i = 0; i < matches.length; i++){
            if(matches[i].idWinner === player.idPlayer){
                victories++;
            }
           
        }

        return victories;
    };


    this.countStraightVictoriesForPlayer = function(matches, player){

        var straightVictories = 0;
        var tempCount = 0;

        for(var i = 0; i < matches.length; i++){
            if(matches[i].idWinner === player.idPlayer){
                tempCount++;
                
                if(tempCount > straightVictories){
                straightVictories = tempCount;
                }
            }else{
                tempCount = 0;
            }
           
        }

        return straightVictories;
    };


    this.countSetsPerMatchesForPlayer = function(matches, player){

        var setsWon = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
                if(matches[i].idWinner === player.idPlayer){
                    if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                        setsWon++;
                    }

                }else{
                    if(parseInt(matches[i].sets[j].winnerGames) < parseInt(matches[i].sets[j].loserGames)){
                        setsWon++;
                    }
                }
           }
        }

        return this.roundTo2decimals(setsWon/matches.length);
    };

    this.countGamesPerSetForPlayer = function(matches, player){

        var gamesWon = 0;
        var countSets = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
                countSets++;
                if(matches[i].idWinner === player.idPlayer){
                    gamesWon = this.addUpStrings(gamesWon,matches[i].sets[j].winnerGames);
                }else{
                   gamesWon = this.addUpStrings(gamesWon,matches[i].sets[j].loserGames);
                }
           }
        }

        return this.roundTo2decimals(gamesWon/countSets);
    };

    this.countPointsPerTBForPlayer = function(matches, player){

        var pointsTB = 0;
        var countTB = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
                if(matches[i].sets[j].tiebreakLoserPoints !== null){
                    var loserGames = parseInt(matches[i].sets[j].tiebreakLoserPoints);
                    countTB++;
                    if(matches[i].idWinner === player.idPlayer){
                        if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                            if(loserGames <= 5){
                                pointsTB += 7;
                            }else{
                                pointsTB += loserGames+2;
                            }
                        }else{
                            pointsTB += loserGames;
                        }
                    }else{
                       if(parseInt(matches[i].sets[j].winnerGames) < parseInt(matches[i].sets[j].loserGames)){
                            if(loserGames <= 5){
                                pointsTB += 7;
                            }else{
                                pointsTB += loserGames+2;
                            }
                        }else{
                            pointsTB += loserGames;
                        }
                    }
                }
           }
        }

        return this.roundTo2decimals(pointsTB/countTB);
    };

    this.countPointsPerSTBForPlayer = function(matches, player){

        var pointsSTB = 0;
        var countSTB = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
                if(matches[i].sets[j].superTieBreak === '1'){
                    var loserGames = parseInt(matches[i].sets[j].loserGames);
                    var winnerGames = parseInt(matches[i].sets[j].winnerGames);
                    countSTB++;
                    if(matches[i].idWinner === player.idPlayer){
                        pointsSTB += winnerGames;
                    }else{
                        pointsSTB += loserGames;
                    }
                }
           }
        }

        return this.roundTo2decimals(pointsSTB/countSTB);
    };

    this.countTBWon = function(matches, player){

        var tbWon = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
               if(matches[i].sets[j].tiebreakLoserPoints !== null){ 
                    if(matches[i].idWinner === player.idPlayer){
                        if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                            tbWon++;
                        }
                    }else{
                        if(parseInt(matches[i].sets[j].winnerGames) < parseInt(matches[i].sets[j].loserGames)){
                            tbWon++;
                        }
                    }
                }
           }
        }

        return tbWon;
    };

    this.countSTBWon = function(matches, player){

        var stbWon = 0;

        for(var i = 0; i < matches.length; i++){
           for(var j = 0; j < matches[i].sets.length; j++){
               if(matches[i].sets[j].superTieBreak === '1'){ 
                    if(matches[i].idWinner === player.idPlayer){
                       
                        if(parseInt(matches[i].sets[j].winnerGames) > parseInt(matches[i].sets[j].loserGames)){
                            stbWon++;
                        }
                    }else{
                        if(parseInt(matches[i].sets[j].winnerGames) < parseInt(matches[i].sets[j].loserGames)){
                            stbWon++;
                        }
                    }
                }
           }
        }

        return stbWon;
    };


/*

################## UTILS FUNCTIONS #######################

*/


    this.roundTo2decimals = function(value){
    	return +(Math.round(value + 'e+2') + 'e-2');
    };

    this.addUpStrings = function(value1, value2){
        var int1 = parseInt(value1);
        var int2 = parseInt(value2);
        return int1+int2;
    };


  });
