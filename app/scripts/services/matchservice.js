'use strict';

/**
 * @ngdoc service
 * @name histoTennisApp.matchService
 * @description
 * # matchService
 * Service in the histoTennisApp.
 */
angular.module('histoTennisApp')
  .service('matchService', function ($q, remoteService, statsService) {
   
  	let promises = {
  		matches : remoteService.get('/matches'),
  		players : remoteService.get('/players')
  	};

  	var colorsPie = ['#FE6600', '#222'];

    var months = {
      '01' : "Jan",
      '02' : "Fev",
      '03' : "Mar",
      '04' : "Avr",
      '05' : "Mai",
      '06' : "Juin",
      '07' : "Juil",
      '08' : "Aoû",
      '09' : "Sep",
      '10' : "Oct",
      '11' : "Nov",
      '12' : "Dec"
    };


/*

######### CONSTRUCT MATCHES FOR TOTAL VICTORIES ##########

*/
  	this.constructMatchesForTotalVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;

  			var stats = statsService.generateVictoriesPercentage(matches, players[0], players[1]);
  			var types = [];

  			for(var i = 0; i < stats.length; i++){
  				var type = {};
  				type.type = players[i].firstName + ' ' + players[i].lastName;
  				type.percent = stats[i].victories;
  				type.percentToDisplay = stats[i].victories;
  				type.color = colorsPie[i];
  				type.subs = [];
  				var subType2Sets = {'type' : '2 sets', 
  									'percent' : stats[i].victories2Sets.real, 
  									'percentToDisplay' : stats[i].victories2Sets.displayed, 
  									'color' : colorsPie[i]};
  				var subType3Sets = {'type' : '3 sets', 
  									'percent' : stats[i].victories3Sets.real, 
  									'percentToDisplay' : stats[i].victories3Sets.displayed, 
  									'color' : colorsPie[i]};
  				
  				type.subs.push(subType2Sets);
  				type.subs.push(subType3Sets);

  				types.push(type);
  			}

  		
  			return $q.when(types);

  		});
  	};



  	this.constructMatchesForInOutVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;

  			var stats = statsService.generateInOutPercentageWithVictories(matches, players[0], players[1]);
  			var types = [];

  			for(var i = 0; i < stats.length; i++){
  				var type = {};
  				type.type = stats[i].type;
  				type.percent = stats[i].percent;
  				type.percentToDisplay = stats[i].percent;
  				type.color = colorsPie[i];
  				type.subs = [];
  				var subTypePlayer1 = {'type' : players[0].firstName + ' ' + players[0].lastName, 
  									'percent' : stats[i].statsPlayer[0].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[0].percentToDisplay, 
  									'color' : colorsPie[i]};
  				var subTypePlayer2 = {'type' : players[1].firstName + ' ' + players[1].lastName, 
  									'percent' : stats[i].statsPlayer[1].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[1].percentToDisplay, 
  									'color' : colorsPie[i]};
  				
  				type.subs.push(subTypePlayer1);
  				type.subs.push(subTypePlayer2);

  				types.push(type);
  			}

  		
  			return $q.when(types);

  		});
  	};

  	this.constructMatchesForSBVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;
  			

  			var stats = statsService.generateSuperTieBreakPercentage(matches, players[0], players[1]);
  			var types = [];

  			for(var i = 0; i < stats.length; i++){
  				var type = {};
  				type.type = stats[i].type;
  				type.percent = stats[i].percent;
  				type.percentToDisplay = stats[i].percent;
  				type.color = colorsPie[i];
  				type.subs = [];
  				var subTypePlayer1 = {'type' : players[0].firstName + ' ' + players[0].lastName, 
  									'percent' : stats[i].statsPlayer[0].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[0].percentToDisplay, 
  									'color' : colorsPie[i]};
  				var subTypePlayer2 = {'type' : players[1].firstName + ' ' + players[1].lastName, 
  									'percent' : stats[i].statsPlayer[1].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[1].percentToDisplay, 
  									'color' : colorsPie[i]};
  				
  				type.subs.push(subTypePlayer1);
  				type.subs.push(subTypePlayer2);

  				types.push(type);
  			}

  			
  			return $q.when(types);

  		});
  	};

  	this.constructMatchesForTBVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;
  			

  			var stats = statsService.generateTieBreakPercentage(matches, players[0], players[1]);
  			var types = [];

  			for(var i = 0; i < stats.length; i++){
  				var type = {};
  				type.type = stats[i].type;
  				type.percent = stats[i].percent;
  				type.percentToDisplay = stats[i].percentToDisplay;
  				type.color = colorsPie[i];
  				type.subs = [];
  				var subTypePlayer1 = {'type' : players[0].firstName + ' ' + players[0].lastName, 
  									'percent' : stats[i].statsPlayer[0].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[0].percentToDisplay, 
  									'color' : colorsPie[i]};
  				var subTypePlayer2 = {'type' : players[1].firstName + ' ' + players[1].lastName, 
  									'percent' : stats[i].statsPlayer[1].percent, 
  									'percentToDisplay' : stats[i].statsPlayer[1].percentToDisplay, 
  									'color' : colorsPie[i]};
  				
  				type.subs.push(subTypePlayer1);
  				type.subs.push(subTypePlayer2);

  				types.push(type);
  			}

  			
  			return $q.when(types);

  		});
  	};


    this.constructMatchesForAfterWonFirstSetVictories = function(){
      return $q.all(promises).then(function(values){
        
        var matches = values.matches.data;
        var players = values.players.data;
        

        var stats = statsService.generateAfterWonFirstSetPercentage(matches, players[0], players[1]);
        var types = [];

        for(var i = 0; i < stats.length; i++){
          var type = {};
          type.type = stats[i].type;
          type.percent = stats[i].percent;
          type.percentToDisplay = stats[i].percentToDisplay;
          type.color = colorsPie[i];
          type.subs = [];
          var subTypePlayer1 = {'type' : players[0].firstName + ' ' + players[0].lastName, 
                    'percent' : stats[i].statsPlayer[0].percent, 
                    'percentToDisplay' : stats[i].statsPlayer[0].percentToDisplay, 
                    'color' : colorsPie[i]};
          var subTypePlayer2 = {'type' : players[1].firstName + ' ' + players[1].lastName, 
                    'percent' : stats[i].statsPlayer[1].percent, 
                    'percentToDisplay' : stats[i].statsPlayer[1].percentToDisplay, 
                    'color' : colorsPie[i]};
          
          type.subs.push(subTypePlayer1);
          type.subs.push(subTypePlayer2);

          types.push(type);
        }

        
        return $q.when(types);

      });
    };


    this.constructDatasForTable = function(){
      return $q.all(promises).then(function(values){

        var matches = values.matches.data;
        var players = values.players.data;

        for(var i = 0; i < players.length; i++){
          players[i].victories = statsService.countVictoriesForPlayer(matches, players[i]);
          players[i].straightVictories = statsService.countStraightVictoriesForPlayer(matches, players[i]);
          players[i].setsPerMatches = statsService.countSetsPerMatchesForPlayer(matches, players[i]);
          players[i].gamesPerSets = statsService.countGamesPerSetForPlayer(matches, players[i]);
          players[i].tbWon = statsService.countTBWon(matches, players[i]);
          players[i].pointsPerTB = statsService.countPointsPerTBForPlayer(matches, players[i]);
          players[i].stbWon = statsService.countSTBWon(matches, players[i]);
          players[i].pointsPerSTB = statsService.countPointsPerSTBForPlayer(matches, players[i]);

        }
        return players;

      });
    };


    /*

######### CONSTRUCT MATCHES FOR HISTO DISPLAY ##########

*/

this.constructMatches = function(){
      return $q.all(promises).then(function(values){

        var matches = values.matches.data;
        
        for(var i = 0; i < matches.length; i++){

          var dateSplit = matches[i].dateMatch.split('-');

          matches[i].dateMatchYear = dateSplit[0];
          matches[i].dateMatchMonth = months[dateSplit[1]];
          matches[i].dateMatchDay = dateSplit[2];


          for(var j = 0; j < matches[i].sets.length; j++){
            if(matches[i].sets[j].tiebreakLoserPoints){
              var loserPoints = Number(matches[i].sets[j].tiebreakLoserPoints);
              if(loserPoints < 6){
                matches[i].sets[j].tiebreakWinnerPoints = 7;
              }else{
                matches[i].sets[j].tiebreakWinnerPoints = loserPoints + 2;
              }
            }
          }
        }
        return matches;

      });
    };



  });
