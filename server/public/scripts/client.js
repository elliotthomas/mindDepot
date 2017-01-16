console.log('IN JS');

var myApp = angular.module('myApp', ['ngRoute']);

//****CONFIG for ROUTERS****//

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: '../views/routes/register.html',
            controller: 'registerController'
        })
        .when('/login', {
            templateUrl: '../views/routes/login.html',
            controller: 'loginController'
        })
        .when('/home', {
        templateUrl: '../views/routes/home.html',
        controller: 'homeController'
})
}]); //end my app config



//****Controllers****//

myApp.controller ('homeController', ['$scope', '$http', function ($scope, $http){
  console.log('In home contoller');
}]);//end home controller

myApp.controller('loginController', ['$scope', '$http', function($scope, $http) {
    console.log('IN NG');

}]); //end main controlller

myApp.controller('registerController', ['$scope', '$http', function($scope, $http) {
    console.log('IN register controller');
    $scope.registerUser = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }; //end user object

        $http({
            method: 'POST',
            url: '/',
            data: user
        }).then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(error) {
            console.log('error occurred!');
        }); //end http post
    }; //end register function

}]); //end register controller
