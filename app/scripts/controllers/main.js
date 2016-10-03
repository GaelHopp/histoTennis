'use strict';

/**
 * @ngdoc function
 * @name histoTennisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the histoTennisApp
 */
angular.module('histoTennisApp')
  .controller('MainCtrl', function ($scope, $http, $q, matchService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  



/*
Generate function to generate datas with sub types
*/

$scope.generateChartDataForPie = function(types, selected) {
  var chartData = [];
  for (var i = 0; i < types.length; i++) {
    if (i === selected && types[i].subs.length > 0) {
      for (var x = 0; x < types[i].subs.length; x++) {
        chartData.push({
          type: types[i].subs[x].type,
          percent: types[i].subs[x].percent,
          color: types[i].color,
          percentToDisplay : types[i].subs[x].percentToDisplay,
          pulled: true
        });
      }
    } else {
      chartData.push({
        type: types[i].type,
        percent: types[i].percent,
        color: types[i].color,
        percentToDisplay: types[i].percentToDisplay,
        id: i
      });
    }
  }

  return chartData;
};




/*
Generic function to generate datas for pie chart
*/

$scope.generateChartOptionsForPie = function(title, datas){ 

var selected;

var amChartOptions = {
  type: 'pie',
  labelText: '[[title]]: [[description]]%',
  balloonText: '[[title]]: [[description]]%',
  titleField: 'type',
  valueField: 'percent',
  categoryField: 'percentToDisplay',
  descriptionField: 'percentToDisplay',
  outlineColor: '#FFFFFF',
  outlineAlpha: 0.7,
  outlineThickness: 3,
  colorField: 'color',
  pulledField: 'pulled',
  titles: [{
    text: title
  }],'listeners': [{
    'event': 'clickSlice',
    'method': function(event) {
      var chart = event.chart;
      if (event.dataItem.dataContext.id !== undefined) {
        selected = event.dataItem.dataContext.id;
      } else {
        selected = undefined;
      }
      datas.then(function(value) {
        chart.dataProvider = $scope.generateChartDataForPie(value, selected);
        chart.validateData();
      });

      
      
    }
  }]
};

return datas.then(function(value){
  amChartOptions.data = $scope.generateChartDataForPie(value, selected);
  return amChartOptions;
});



};




/*

#############################################  GENERATE CHART OPTIONS #####################################################

*/

$scope.amChartOptionsTotalVictories = $scope.generateChartOptionsForPie('Victoires totales', matchService.constructMatchesForTotalVictories()); // datas for total victories
$scope.amChartOptionsInOutVictories = $scope.generateChartOptionsForPie('Matches IN/OUT', matchService.constructMatchesForInOutVictories()); // datas for IN/OUT victories
$scope.amChartOptionsSBVictories = $scope.generateChartOptionsForPie('Super TieBreak', matchService.constructMatchesForSBVictories()); // datas for Super TieBreak
$scope.amChartOptionsTBVictories = $scope.generateChartOptionsForPie('TieBreak', matchService.constructMatchesForTBVictories()); // datas for TieBreak
$scope.amChartOptionsAfterWonFirstSetVictories = $scope.generateChartOptionsForPie('Victoires fonction 1er set', matchService.constructMatchesForAfterWonFirstSetVictories()); // datas for victories after won first set


/*

#############################################  GENERATE TABLE DATAS #####################################################

*/

matchService.constructDatasForTable().then(function(data) {
    $scope.players = data;
});



  });
