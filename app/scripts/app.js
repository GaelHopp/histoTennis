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
    'amChartsDirective',
    'ngMaterial',
    'ngMessages',
    'ngAria',
    '720kb.datepicker'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.delete = {};
    $httpProvider.defaults.headers.options = {};
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
