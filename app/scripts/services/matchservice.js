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

  	this.constructMatchesForTotalVictories = function(){
  		return $q.all(promises).then(function(values){
  			
  			var matches = values.matches.data;
  			var players = values.players.data;

  			var types = statsService.generateVictoriesPercentage(matches, players[0], players[1]);
  			return $q.when(types);

  		});
  	}

  });
