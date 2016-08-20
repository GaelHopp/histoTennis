'use strict';

/**
 * @ngdoc function
 * @name histoTennisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the histoTennisApp
 */
angular.module('histoTennisApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  


$scope.amChartOptionsTotalVictories = generateTotalVictoriesData(); // datas for total victories

/*
Construct JSon datas with good format for total victories
*/

function constructTypesForTotalVictories(){

var types = [{
  type: "Fossil Energy",
  percent: 70,
  color: "#ff9e01",
  subs: [{
    type: "Oil",
    percent: 15
  }, {
    type: "Coal",
    percent: 35
  }, {
    type: "Nuclear",
    percent: 20
  }]
}, {
  type: "Green Energy",
  percent: 30,
  color: "#b0de09",
  subs: [{
    type: "Hydro",
    percent: 15
  }, {
    type: "Wind",
    percent: 10
  }, {
    type: "Other",
    percent: 5
  }]
}];

return types;

}

/*
Generate total victories datas for chart
*/

function generateTotalVictoriesData(){

var selected;
var title = "Victoires totales";
return generateChartOptions(constructTypesForTotalVictories(), title);

  }





/*

#################################### GENERIC FUNCTIONS TO GENERATE CHARTS ##################################

*/




/*
Generic function to generate datas for pie chart
*/

function generateChartOptions(datas, title){ 

var selected;

var amChartOptions = {
  type: "pie",
  data: generateChartData(datas, selected),
  labelText: "[[title]]: [[value]]",
  balloonText: "[[title]]: [[value]]",
  titleField: "type",
  valueField: "percent",
  outlineColor: "#FFFFFF",
  outlineAlpha: 0.8,
  outlineThickness: 5,
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
      chart.dataProvider = generateChartData(datas, selected);
      chart.validateData();
    }
  }]
} 

return amChartOptions;

}

/*
Generate function to generate datas with sub types
*/

 function generateChartData(types, selected) {
  var chartData = [];
  for (var i = 0; i < types.length; i++) {
    if (i == selected) {
      for (var x = 0; x < types[i].subs.length; x++) {
        chartData.push({
          type: types[i].subs[x].type,
          percent: types[i].subs[x].percent,
          color: types[i].color,
          pulled: true
        });
      }
    } else {
      chartData.push({
        type: types[i].type,
        percent: types[i].percent,
        color: types[i].color,
        id: i
      });
    }
  }
  return chartData;
}



 $scope.testJson = function(){
  $http.get('http://localhost:8888/histoTennisBack/api/json').
        success(function(data) {
            $scope.testJsonData = data;
        });
}


  });
