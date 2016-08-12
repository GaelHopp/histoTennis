'use strict';

/**
 * @ngdoc overview
 * @name histoTennisApp
 * @description
 * # histoTennisApp
 *
 * Main module of the application.
 */
angular
  .module('histoTennisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'amChartsDirective'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/score', {
        templateUrl: 'views/score.html',
        controller: 'ScoreCtrl',
        controllerAs: 'score'
      })
      .when('/histo', {
        templateUrl: 'views/histo.html',
        controller: 'HistoCtrl',
        controllerAs: 'histo'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
