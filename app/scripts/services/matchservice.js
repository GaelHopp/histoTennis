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



  });
