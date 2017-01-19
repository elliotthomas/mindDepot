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
        .when('/addPassage', {
        templateUrl: '../views/routes/addPassage.html',
        controller: 'addPassageController'
        })
        .when('/practice', {
        templateUrl: '../views/routes/practice.html',
        controller: 'practiceController'
        })
        .when('/recite', {
        templateUrl: '../views/routes/recite.html',
        controller: 'reciteController'
        })
        .when('/wordByWord', {
        templateUrl: '../views/routes/wordByWord.html',
        controller: 'wordByWordController'
        })
}]); //end my app config

//****Factory****//

myApp.factory('passageFactory', function(){
  var factory = {};
  factory.passageID;
  factory.passageByID;
  factory.authorByID;
  factory.titleByID;
  factory.sourceUrl;
  factory.counter;



  return factory
});//end factory

//****Controllers****//

myApp.controller ('homeController', ['$scope', 'passageFactory', '$http', '$location', function ($scope, passageFactory, $http, $location){
  console.log('In home contoller');

  $scope.getPassages = function (){
    console.log('In get passages function');
    $http({
      method: 'GET',
      url:'/getPassages'
    }).then(function(response) {
      console.log('Passages back from DB ->', response.data);
      $scope.passages = response.data;
      console.log('scope passages', $scope.passages);
    });//end http get call
  };//end get passages function

  $scope.toPractice = function (id){
    console.log('ID number of click', id);
    passageFactory.passageID = id

    $http ({
      method: 'GET',
      url: '/getPassageByID/' + id
    }).then (function (response){
      console.log('response ->', response.data[0].passage);
      passageFactory.passageByID = response.data[0].passage;
      passageFactory.authorByID = response.data[0].author;
      passageFactory.titleByID = response.data[0].title;
      passageFactory.sourceUrl = response.data[0].sourceUrl;
      passageFactory.counter = response.data[0].recited;
    });//end http

    $location.path('/practice')
  };//end practice function

    $scope.init = function (){
      $scope.getPassages();
    };//end init function

}]);//end home controller

myApp.controller ('addPassageController', ['$scope', '$http', function ($scope, $http){
  console.log('In add passage contoller');

$scope.addPassage = function (){
  var passage = $scope.passage.split('\n');

  console.log('each line in an array', passage);

  var passage = {
    title: $scope.title,
    author: $scope.author,
    sourceUrl: $scope.sourceUrl,
    passage: $scope.passage
  };//end passage object

  $http ({
    method: 'POST',
    url: '/addPassage',
    data: passage
  }).then (function (response){
    console.log('response ->', response);
  });
};//end add passage function
}]);//end home controller

myApp.controller('practiceController', ['$scope', '$http', 'passageFactory', '$location', function($scope, $http, passageFactory, $location) {
    console.log('In Practice Controller');

    $scope.toRecite = function () {
      $location.path ('/recite')
    };//end to recite

    $scope.toWrite = function () {
      $location.path ('/write')
    };//end to write

    $scope.toWordByWord = function () {
      $location.path ('/wordByWord')
    };//end to word by word

}]); //end practice controlller

myApp.controller('reciteController', ['$scope', '$http', 'passageFactory', function($scope, $http, passageFactory) {
    console.log('In Recite Controller');
    console.log('id from factory ->', passageFactory.passageID );


    $scope.getCounter = function (){

      $scope.passageByID = passageFactory.passageByID;

      var id = passageFactory.passageID;

    $http ({
      method: 'GET',
      url: '/getPassageByID/' + id
    }).then (function (response){
      console.log('response ->', response.data[0].passage);
      $scope.counter = response.data[0].recited;
      passageFactory.counter = response.data[0].recited
    });//end http

  };//end get counter

    $scope.increment = function () {
      var id = passageFactory.passageID;

      console.log('id in increment function ->', id);

      var counter = passageFactory.counter

      counter++;

      var counterToSend = {
        counter: counter,
        idToSend: id
      };//end counter var

      console.log('counterToSend ->', counterToSend);

      $http ({
        method: 'PUT',
        url: '/addCounter',
        data: counterToSend
      }).then (function (response){
        console.log('response ->', response);
      });

      $scope.getCounter();

    };//end increment function


}]); //end recite controlller

myApp.controller('wordByWordController', ['$scope', '$http', 'passageFactory', function($scope, $http, passageFactory) {
    console.log('In Word by Word Controller');
    var passage = passageFactory.passageByID
    var index = 1;

    $scope.showOneWord = function () {
      var splitPassage = passage.split(" ")
      $scope.text = splitPassage[0];
    }

    $scope.addWord = function () {
        var splitPassage = passage.split(" ")
        console.log('in add word ->', splitPassage);

        $scope.text = (splitPassage[index] + ' ');
        index++;
      };//end add word




}]); //end word by word controlller

myApp.controller('writeController', ['$scope', '$http', function($scope, $http) {
    console.log('In write Controller');

}]); //end login controlller

myApp.controller('loginController', ['$scope', '$http', function($scope, $http) {
    console.log('In Login Controller');

}]); //end login controlller

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
