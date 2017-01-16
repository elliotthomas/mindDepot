console.log('IN JS');

var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller ('mainController', ['$scope', '$http', function ($scope, $http){
  console.log('IN NG');

}]);//end main controlller
