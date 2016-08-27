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
    if (i == selected) {
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
}



/*

#################################### CONSTRUCT DATAS ##################################

*/



/*
Construct JSon datas with good format for total victories
*/

$scope.constructTypesForTotalVictories = function(){

  var variable = matchService.constructMatchesForTotalVictories();
return variable;


}


/*

#################################### GET PROMISES AND CONSTRUCT DATAS ##################################

*/

$scope.datasTotalVictories = $scope.constructTypesForTotalVictories();








/*
Generic function to generate datas for pie chart
*/

$scope.generateChartOptionsForPie = function(title){ 

var selected;

var amChartOptions = {
  type: "pie",
  labelText: "[[title]]: [[description]]%",
  balloonText: "[[title]]: [[description]]%",
  titleField: "type",
  valueField: "percent",
  categoryField: "percentToDisplay",
  descriptionField: "percentToDisplay",
  outlineColor: "#FFFFFF",
  outlineAlpha: 0.7,
  outlineThickness: 3,
  colorField: "color",
  pulledField: "pulled",
  titles: [{
    text: title
  }],"listeners": [{
    "event": "clickSlice",
    "method": function(event) {
      var chart = event.chart;
      if (event.dataItem.dataContext.id != undefined) {
        selected = event.dataItem.dataContext.id;
      } else {
        selected = undefined;
      }
      $scope.datasTotalVictories.then(function(value) {
        chart.dataProvider = $scope.generateChartDataForPie(value, selected);
        chart.validateData();
      });

      
      
    }
  }]
} 

return $scope.datasTotalVictories.then(function(value){
  amChartOptions.data = $scope.generateChartDataForPie(value, selected);
  return amChartOptions;
});



}






/*

#############################################  GENERATE CHART OPTIONS #####################################################

*/

$scope.amChartOptionsTotalVictories = $scope.generateChartOptionsForPie("Victoires totales"); // datas for total victories








  });
