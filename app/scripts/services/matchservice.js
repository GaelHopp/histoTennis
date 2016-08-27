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
  	}

  	var colorsPie = ["#41b5fb", "#3889e5"];

  	this.constructMatchesForTotalVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;

  			var stats = statsService.generateVictoriesPercentage(matches, players[0], players[1]);
  			var types = [];

  			for(var i = 0; i < stats.length; i++){
  				var type = {}
  				type.type = players[i].firstName + " " + players[i].lastName;
  				type.percent = stats[i].victories;
  				type.percentToDisplay = stats[i].victories;
  				type.color = colorsPie[i]
  				type.subs = [];
  				var subType2Sets = {'type' : '2 sets', 
  									'percent' : stats[i].victories2Sets.real, 
  									'percentToDisplay' : stats[i].victories2Sets.displayed, 
  									'color' : colorsPie[i]}
  				var subType3Sets = {'type' : '3 sets', 
  									'percent' : stats[i].victories3Sets.real, 
  									'percentToDisplay' : stats[i].victories3Sets.displayed, 
  									'color' : colorsPie[i]}
  				
  				type.subs.push(subType2Sets);
  				type.subs.push(subType3Sets);

  				types.push(type);
  			}

  			console.log(types);
  			return $q.when(types);

  		});
  	}

  });
