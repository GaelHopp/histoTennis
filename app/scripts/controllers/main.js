'use strict';

/**
 * @ngdoc function
 * @name histoTennisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the histoTennisApp
 */
angular.module('histoTennisApp')
  .controller('MainCtrl', function ($scope, $http, $q) {
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
  
  console.log("aaaa"+types);

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



/*

#################################### CONSTRUCT DATAS ##################################

*/



/*
Construct JSon datas with good format for total victories
*/

$scope.constructTypesForTotalVictories = function(){

var deferred = $q.defer();



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


deferred.resolve(types);
return deferred.promise;


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
  labelText: "[[title]]: [[value]]",
  balloonText: "[[title]]: [[value]]",
  titleField: "type",
  valueField: "percent",
  categoryField: "f",
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

      console.log(selected);
      $scope.datasTotalVictories.then(function(value) {
        chart.dataProvider = $scope.generateChartDataForPie(value, selected);
        console.log(chart.dataProvider);
        chart.validateData();
      });

      
      
    }
  }]
} 

$scope.datasTotalVictories.then(function(value){
  amChartOptions.data = $scope.generateChartDataForPie(value, selected);
});

return amChartOptions;

}






/*

#############################################  GENERATE CHART OPTIONS #####################################################

*/

$scope.amChartOptionsTotalVictories = $scope.generateChartOptionsForPie("Victoires totales"); // datas for total victories





 $scope.testJson = function(){
  $http.get('http://localhost:8888/histoTennisBack/api/json').
        success(function(data) {
            $scope.testJsonData = data;
        });
}


  });
