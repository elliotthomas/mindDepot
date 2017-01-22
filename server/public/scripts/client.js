console.log('IN JS');

var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);


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
        .when('/write', {
        templateUrl: '../views/routes/write.html',
        controller: 'writeController'
        })
        .when('/passageInfo', {
        templateUrl: '../views/routes/passageInfo.html',
        controller: 'passageInfoController'
        })
        .when('/lineByLine', {
        templateUrl: '../views/routes/lineByLine.html',
        controller: 'lineByLineController'
        })
        .when('/fillInBlank', {
        templateUrl: '../views/routes/fillInBlank.html',
        controller: 'fillInBlankController'
        })
        .when('/depot', {
        templateUrl: '../views/routes/depot.html',
        controller: 'depotController'
        })
        .when('/splash', {
        templateUrl: '../views/routes/splash.html',
        controller: 'splashController'
        })
        .otherwise({
			  redirectTo: '/login'
		    });
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
  factory.imageUrl;
  factory.depot;




  return factory
});//end factory





//****Controllers****//

myApp.controller ('homeController', ['$scope', 'passageFactory', '$http', '$location', '$rootScope', function ($scope, passageFactory, $http, $location, $rootScope){
  console.log('In home contoller');
  $rootScope.hideIt = true;
  $rootScope.hideBack = false;
  $rootScope.hideNav = false;
  $rootScope.hideFooter = false;
  $rootScope.hideAddToDepot = true;
  $rootScope.hideInfo = true;

  $scope.getPassages = function (){
    console.log('In get passages function');
    $http({
      method: 'GET',
      url:'/getPassages'
    }).then(function(response) {
      console.log('Passages back from DB ->', response.data);
      var toDepot = [];
      var practice = [];
      var responses = response.data;

      responses.forEach(function(passage){
        if (passage.depot === false) {
          practice.push(passage)
        } else {
          toDepot.push(passage)
        }
      });//end for each

      $scope.passages = practice;



      console.log('practice after for each', practice);


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
      passageFactory.imageUrl = response.data[0].imageUrl;
      passageFactory.depot = response.data[0].depot;
    });//end http

    $location.path('/practice')
  };//end practice function

    $scope.init = function (){
      $scope.getPassages();
    };//end init function

    $scope.toDepot = function () {
      $location.path ('/depot')
    };//end to to depot



}]);//end home controller


myApp.controller('depotController', ['$scope', '$http', 'passageFactory', '$location', '$rootScope', function($scope, $http, passageFactory,$location,$rootScope) {
    console.log('In Depot Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideAddToDepot = true;
    $rootScope.hideInfo = true;

    $scope.getPassages = function (){
      console.log('In get passages function');
      $http({
        method: 'GET',
        url:'/getPassages'
      }).then(function(response) {
        console.log('Passages back from DB ->', response.data);
        var toDepot = [];
        var practice = [];
        var responses = response.data;

        responses.forEach(function(passage){
          if (passage.depot === false) {
            practice.push(passage)
          } else {
            toDepot.push(passage)
          }
        });//end for each

        $scope.passages = toDepot;

      });//end http get call
    };//end get passages function

    $scope.toPassageInfo= function(id){
      console.log('in to passage info');
      console.log('id is this ->', id);
      passageFactory.passageID = id

      $http ({
      method: 'GET',
      url: '/getPassageByID/' + id
    }).then (function (response){
      console.log('response ->', response.data[0].title);
      passageFactory.passageByID = response.data[0].passage;
      passageFactory.authorByID = response.data[0].author;
      passageFactory.titleByID = response.data[0].title;
      passageFactory.sourceUrl = response.data[0].sourceUrl;
      passageFactory.counter = response.data[0].recited;
      passageFactory.imageUrl = response.data[0].imageUrl;
      passageFactory.depot = response.data[0].depot;
    });//end http

    console.log('author ->', passageFactory.titleByID);

    $location.path ('/passageInfo')

  };//end to passage info



    $scope.toHome = function () {
      $location.path ('/home')
    };//end to home


    $scope.init = function (){
      $scope.getPassages();
    };//end init function


}]); //end depot controlller


myApp.controller ('addPassageController', ['$scope', '$http','$rootScope', '$location', function ($scope, $http, $rootScope, $location){
  console.log('In add passage contoller');
  $rootScope.hideIt = true;
  $rootScope.hideBack = false;
  $rootScope.hideNav = false;
  $rootScope.hideFooter = false;

$scope.addPassage = function (){
  var passage = $scope.passage.split('\n');

  console.log('each line in an array', passage);

  var passage = {
    title: $scope.title,
    author: $scope.author,
    sourceUrl: $scope.sourceUrl,
    imageUrl: $scope.imageUrl,
    passage: $scope.passage
  };//end passage object

  $http ({
    method: 'POST',
    url: '/addPassage',
    data: passage
  }).then (function (response){
    console.log('response ->', response);
  });

  $location.path ('/home')

};//end add passage function
}]);//end add passage controller

myApp.controller('practiceController', ['$scope', '$http', 'passageFactory', '$location', '$timeout', '$rootScope', function($scope, $http, passageFactory, $location, $timeout, $rootScope) {
    console.log('In Practice Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $scope.title = passageFactory.titleByID
    $scope.author = passageFactory.authorByID

    $scope.toRecite = function () {
      $location.path ('/recite')
    };//end to recite

    $scope.toWrite = function () {
      $location.path ('/write')
    };//end to write

    $scope.toWordByWord = function () {
      $location.path ('/wordByWord')
    };//end to word by word

    $scope.toPassageInfo = function () {
      $location.path ('/passageInfo')
    };//end to passageinfo

    $scope.toLinebyLine = function () {
      $location.path ('/lineByLine')
    };//end to line by line


    $scope.tofillInBlank = function () {
      $location.path ('/fillInBlank')
    };//end to fill in blank

    $scope.addToDepot = function () {

      var id = passageFactory.passageID

      var addToDepot = {
        idToSend: id
      };

      $http ({
        method: 'PUT',
        url: '/addToDepot',
        data: addToDepot
      }).then (function (response){
        console.log('response ->', response);
      });



      $location.path ('/splash')



    };//end add to depot function

}]); //end practice controlller



myApp.controller('reciteController', ['$scope', '$http', 'passageFactory','$rootScope', function($scope, $http, passageFactory, $rootScope) {
    console.log('In Recite Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
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

myApp.controller('wordByWordController', ['$scope', '$http', 'passageFactory', '$rootScope', function($scope, $http, passageFactory, $rootScope) {
    console.log('In Word by Word Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    var passage = passageFactory.passageByID
    var index = 1;

    $scope.showOneWord = function () {
      var splitPassage = passage.split(" ")
      $scope.text = splitPassage[0];
    }

    $scope.addWord = function () {
        var splitPassage = passage.split(" ")
        console.log('in add word ->', splitPassage);

        $scope.text += (splitPassage[index] + ' ');
        index++;
        if (index > splitPassage.length){
           index = 1;
           $scope.text = splitPassage[0];
         }
      };//end add word

}]); //end word by word controlller

myApp.controller('lineByLineController', ['$scope', '$http', 'passageFactory', '$rootScope', function($scope, $http, passageFactory, $rootScope) {
    console.log('In Line by Line Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    var passage = passageFactory.passageByID
    var index = 1;

    $scope.showOneLine = function () {
      var splitPassage = passage.split("\n")
      splitPassage[0] = splitPassage[0] + '<br />'
      $scope.text = splitPassage[0];
    }

    $scope.addLine = function () {
        var splitPassage = passage.split("\n")
        console.log('in add line ->', splitPassage);
        for (var i = 0; i < splitPassage.length; i++) {
          splitPassage[i] = splitPassage[i] + '<br />'
        }
        console.log('split with line break', splitPassage);

        $scope.text += (splitPassage[index] + ' ');
        index++;
        if (index > splitPassage.length){
           index = 1;
           $scope.text = splitPassage[0];
         }
      };//end add line

}]); //end line by line controlller



myApp.controller('writeController', ['$scope', '$http','passageFactory', '$rootScope', function($scope, $http, passageFactory, $rootScope) {
    console.log('In write Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;

    $scope.compare = function(){
      var passageOriginal = passageFactory.passageByID
      var passageUser = $scope.passageFromUser
      $scope.outputText = diffString(passageUser, passageOriginal)
    };//end compare

    $scope.reset = function (){
      $scope.outputText = '';
      $scope.passageFromUser = '';
    };


}]); //end write controlller

myApp.controller('passageInfoController', ['$scope', '$http', 'passageFactory', '$location', '$rootScope', function($scope, $http, passageFactory, $location, $rootScope) {
    console.log('In Passage Info Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;

    console.log('author->', passageFactory.titleByID);

  $scope.showPassageInfo = function (){

    $scope.titleInfo = passageFactory.titleByID;
    $scope.authorInfo = passageFactory.authorByID;
    $scope.sourceUrlInfo = passageFactory.sourceUrl;
    $scope.imageUrlInfo = passageFactory.imageUrl;

  };//end show passage info

$scope.deletePassage = function () {
    var id = passageFactory.passageID
    console.log('id from factory ->', id);

    $http ({
    method: 'DELETE',
    url: '/deletePassage/' + id
  }).then (function (response){
    console.log('response from delete ->', response);
  });

  console.log('passage facory true or false', passageFactory.depot );

  if (passageFactory.depot == false){
    $location.path ('/home')
  } else {
    $location.path ('/depot')
  }

};//end delete passage

}]); //end passage info controlller

myApp.controller('fillInBlankController', ['$scope', '$http', 'passageFactory', '$rootScope', function($scope, $http, passageFactory, $rootScope) {
    console.log('In Fill in Blank Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;

    var passage = passageFactory.passageByID.split(' ')

    var passageWord = passage[Math.floor(Math.random()*passage.length)];


    console.log('one word in passage ->', passageWord);


}]); //end fill in blank controlller

myApp.controller('splashController', ['$scope', '$http', '$location', '$timeout', '$rootScope', function($scope, $http, $location, $timeout, $rootScope) {
    console.log('In Splash Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;

    $timeout(function () {
       $location.path ('/depot')
   }, 1000);

}]); //end splash controlller


myApp.controller('loginController', ['$scope', '$http', '$rootScope','$location', function($scope, $http, $rootScope, $location) {
    console.log('In Login Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;

    $scope.login = function() {
    console.log($scope.username, $scope.password);

    var toSend = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/login',
      data: toSend
    }).then(function(response) {
      $location.path ('/home')
    });
  };

}]); //end login controlller

myApp.controller('registerController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
    console.log('IN register controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;

    $scope.registerUser = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        }; //end user object

        $http({
            method: 'POST',
            url: '/register',
            data: user
        }).then(function successCallback(response) {
          console.log(response);
          $location.path ('/login')
        }, function errorCallback(error) {
            console.log('error occurred!');
        }); //end http post
    }; //end register function

}]); //end register controller
