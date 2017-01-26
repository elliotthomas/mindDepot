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
        .when('/depotInfo', {
        templateUrl: '../views/routes/depotInfo.html',
        controller: 'depotInfoController'
        })
        .when('/splashTwo', {
        templateUrl: '../views/routes/splashTwo.html',
        controller: 'splashTwoController'
        })
        .when('/splashThree', {
        templateUrl: '../views/routes/splashThree.html',
        controller: 'splashThreeController'
        })
        .when('/userInfo', {
        templateUrl: '../views/routes/userInfo.html',
        controller: 'userInfoController'
        })
        .otherwise({
			  redirectTo: '/splashTwo'
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
  factory.userFirstName;
  factory.userLastName;
  factory.depotPassages;
  factory.practicePassages;
  factory.users;




  return factory
});//end factory





//****Controllers****//

myApp.controller ('homeController', ['$scope', 'passageFactory', '$http', '$location', '$rootScope', '$timeout', function ($scope, passageFactory, $http, $location, $rootScope, $timeout){
  console.log('In home contoller');
  $rootScope.hideNav = false;
  $rootScope.hideFooter = false;
  $rootScope.hideAddToDepot = true;
  $rootScope.hideInfo = true;
  $rootScope.hidePassage = false;
  $rootScope.hideDepot = false;
  $rootScope.hideNavTwo = false;
  $rootScope.practiceButton = false;
  $rootScope.practiceInfo = true;
  $rootScope.hideAddPassage = true;
  $rootScope.depotInfo = true;
  $rootScope.depotBack = true;
  $rootScope.hideUserInfo = false;


  $scope.getPassages = function (){
    console.log('In get passages function');
    $http({
      method: 'GET',
      url:'/getPassages'
    }).then(function(response) {
      console.log('Passages back from DB ->', response);

      var otherUsers = response.data.memorized
      console.log('other users', otherUsers);

      var grouped = _.groupBy(otherUsers, 'user');
      console.log('grouped', grouped);






      // passageFactory.users = eachUser

      // console.log('eachUser', eachUser);






      var toDepot = [];
      var practice = [];
      var responses = response.data.passageToSend;
      console.log('responses ->', responses);
      console.log('responses from');
      passageFactory.depotPassages = toDepot
      passageFactory.practicePassages = practice;
      passageFactory.userFirstName = response.data.userToSend.first_name;
      passageFactory.userLastName = response.data.userToSend.last_name;


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


    $timeout(function () {
           $location.path ('/practice')
       }, 30);
  };//end practice function

    $scope.init = function (){
      $scope.getPassages();
    };//end init function

    $scope.toDepot = function () {
      $location.path ('/depot')
    };//end to to depot

    $scope.toAddPassage = function () {
      $location.path ('/addPassage')
    };//end to to depot



}]);//end home controller


myApp.controller('depotController', ['$scope', '$http', 'passageFactory', '$location', '$rootScope', function($scope, $http, passageFactory,$location,$rootScope) {
    console.log('In Depot Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = false;
    $rootScope.hideAddToDepot = true;
    $rootScope.hideInfo = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = true;
    $rootScope.practiceInfo = true;
    $rootScope.depotBack = true;
    $rootScope.hideAddPassage = true;
    $rootScope.hideUserInfo = false;
    $rootScope.depotInfo = true;
    $rootScope.userInfoBack = true;

    $scope.getPassages = function (){
      console.log('In get passages function');
      $http({
        method: 'GET',
        url:'/getPassages'
      }).then(function(response) {
        console.log('Passages back from DB ->', response.data);
        var toDepot = [];
        var practice = [];
        passageFactory.depotPassages = toDepot
        passageFactory.practicePassages = practice;
        var responses = response.data.passageToSend;

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

    $scope.toDepotInfo= function(id){
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

    $rootScope.practiceButton = true;
    $location.path ('/depotInfo')

  };//end to passage info



    $scope.toHome = function () {
      $location.path ('/home')
    };//end to home


    $scope.init = function (){
      $scope.getPassages();
    };//end init function




}]); //end depot controlller

myApp.controller('depotInfoController', ['$scope', '$http', '$location', '$timeout', '$rootScope', 'passageFactory', function($scope, $http, $location, $timeout, $rootScope, passageFactory) {
    console.log('In Depot Info Controller');
    $rootScope.hideNav = true;
    $rootScope.hideFooter = false;
    $rootScope.hideAddToDepot = true;
    $rootScope.hideInfo = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = true;
    $rootScope.practiceInfo = true;
    $rootScope.depotBack = false;
    $rootScope.hideAddPassage = true;
    $rootScope.depotInfo = true;
    $rootScope.hideUserInfo = true;



    $scope.toPractice = function () {
      $location.path ('/practice')
    };//end to write

    $scope.toPassageInfo = function () {
      $location.path ('/passageInfo')
    };//end to write

    $scope.returnToPractice = function () {

      console.log('in return to practice');

        var id = passageFactory.passageID

        var addToDepot = {
          idToSend: id
        };

        $http ({
          method: 'PUT',
          url: '/returnToPractice',
          data: addToDepot
        }).then (function (response){
          console.log('response ->', response);
        });

        $location.path ('/home')

      };//end add to depot function



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


}]); //end depot info controlller


myApp.controller ('addPassageController', ['$scope', '$http','$rootScope', '$location', function ($scope, $http, $rootScope, $location){
  console.log('In add passage contoller');
  $rootScope.hideIt = true;
  $rootScope.hideBack = false;
  $rootScope.hideNav = false;
  $rootScope.hideFooter = false;
  $rootScope.hideInfo = true;
  $rootScope.hideAddToDepot = true;
  $rootScope.hidePassage = false;
  $rootScope.hideDepot = false;
  $rootScope.hideNavTwo = false;
  $rootScope.practiceButton = false;
  $rootScope.practiceInfo = true;
  $rootScope.hideUserInfo = false;
  $rootScope.addPassageInfo = true;

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
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = false;
    $rootScope.hideAddToDepot = false;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = true;
    $rootScope.blackBack = true;
    $rootScope.whiteBack = false;
    $rootScope.hideAddPassage = true;
    $rootScope.hideUserInfo = true;

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

    $scope.showPassageInfo = function (){

      $scope.titleInfo = passageFactory.titleByID;
      $scope.authorInfo = passageFactory.authorByID;
      $scope.sourceUrlInfo = passageFactory.sourceUrl;
      $scope.imageUrlInfo = passageFactory.imageUrl;
      $scope.passageByID = passageFactory.passageByID;

    };//end show passage info



    $scope.showPassageInfo();

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

}]); //end practice controlller



myApp.controller('reciteController', ['$scope', '$http', 'passageFactory','$rootScope', '$location', function($scope, $http, passageFactory, $rootScope, $location) {
    console.log('In Recite Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = false;
    $rootScope.hideAddPassage = true;

    console.log('id from factory ->', passageFactory.passageID );

    $scope.toPractice = function () {
      $location.path ('/practice')
    };//end to pracitce


    $scope.getCounter = function (){

      $scope.passageByID = passageFactory.passageByID;
      $scope.titleInfo = passageFactory.titleByID;
      $scope.authorInfo = passageFactory.authorByID;

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

myApp.controller('wordByWordController', ['$scope', '$http', 'passageFactory', '$rootScope', '$location', '$timeout', function($scope, $http, passageFactory, $rootScope, $location, $timeout) {
    console.log('In Word by Word Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = false;
    $rootScope.hideAddPassage = true;

    $scope.authorInfo = passageFactory.authorByID;
    $scope.titleInfo = passageFactory.titleByID;

    var passage = passageFactory.passageByID
    var index = 1;
    var timer;
    var splitPassage = passage.split(" ")
    var speed = 1000;

    if (speed == 1000) {
      $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Second Per Word' + '</p>'
    } else {
      $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Word' + '</p>'
    }

    $scope.toPractice = function () {
      $location.path ('/practice')
    };//end to pracitce

    $scope.showOneWord = function () {
      var splitPassage = passage.split(" ")
      $scope.text = splitPassage[0];
    }

    $scope.addWord = function () {
        console.log('in add word ->', splitPassage);

        $scope.text += (splitPassage[index] + ' ');
        index++;
        if (index > splitPassage.length){
           index = 1;
           $scope.text = splitPassage[0];
         }
      };//end add word

      $scope.stop = function (){
        $timeout.cancel(timer)
        speed = 1000;
        $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' +  'Second Per Word' + '</p>'
      };

      $scope.slowDown = function (){
        speed = speed + 100;
        console.log('speed->', speed);
        if (speed == 1000) {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' +  'Second Per Word' + '</p>'
        } else {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Word' + '</p>'
        }
      }

      $scope.speedUp = function (){
        speed = speed - 100;
        console.log('speed->', speed);
        if (speed == 1000) {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Second Per Word' + '</p>'
        } else {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Word' + '</p>'
        }
      }

      $scope.addTimedWord = function (){

        timer = $timeout(function (){
        addWordTimeout();
      }, speed);
      }

      var addWordTimeout = function () {
        var splitPassage = passage.split(" ")
        $scope.text += (splitPassage[index] + ' ');
        index++;
        if (index > splitPassage.length){
           index = 1;
           $scope.text = splitPassage[0];
         }
         $scope.addTimedWord();
      }

}]); //end word by word controlller

myApp.controller('lineByLineController', ['$scope', '$http', 'passageFactory', '$rootScope', '$location', '$timeout', function($scope, $http, passageFactory, $rootScope, $location, $timeout) {
    console.log('In Line by Line Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = false;
    $rootScope.blackBack = true;
    $rootScope.hideAddPassage = true;

    $scope.authorInfo = passageFactory.authorByID;
    $scope.titleInfo = passageFactory.titleByID;

    var passage = passageFactory.passageByID
    var index = 1;
    var speed = 1000;

    if (speed == 1000) {
      $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Second Per Line' + '</p>'
    } else {
      $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Line' + '</p>'
    }

    $scope.toPractice = function () {
      $location.path ('/practice')
    };//end to pracitce

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

      $scope.stop = function (){
        $timeout.cancel(timer)
        speed = 1000;
        $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' +  'Second Per Line' + '</p>'
      };

      $scope.slowDown = function (){
        speed = speed + 100;
        console.log('speed->', speed);
        if (speed == 1000) {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' +  'Second Per Line' + '</p>'
        } else {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Line' + '</p>'
        }
      }

      $scope.speedUp = function (){
        speed = speed - 100;
        console.log('speed->', speed);
        if (speed == 1000) {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Second Per Line' + '</p>'
        } else {
          $scope.speedOutput = '<p class = "seconds">' + (speed/1000).toFixed(2) + ' ' + 'Seconds Per Line' + '</p>'
        }
      }

      $scope.addTimedLine = function (){

        timer = $timeout(function (){
        addLineTimeout();
      }, speed);
      }

      var addLineTimeout = function () {
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
         $scope.addTimedLine();
       }

}]); //end line by line controlller



myApp.controller('writeController', ['$scope', '$http','passageFactory', '$rootScope', '$location', function($scope, $http, passageFactory, $rootScope, $location) {
    console.log('In write Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = false;
    $rootScope.hideAddPassage = true;

    $scope.title = passageFactory.titleByID

    $scope.toPractice = function () {
      $location.path ('/practice')
    };//end to pracitce

    $scope.compare = function(){
      var passageOriginal = passageFactory.passageByID
      var passageUser = $scope.passageFromUser
      console.log('diffstring', diffString(passageUser, passageOriginal));
      $scope.outputText = diffString(passageUser, passageOriginal);
      $rootScope.hideText = true;
    };//end compare

    $scope.reset = function (){
      $scope.outputText = '';
      $scope.passageFromUser = '';
      $rootScope.hideText = false;
    };


}]); //end write controlller

myApp.controller('passageInfoController', ['$scope', '$http', 'passageFactory', '$location', '$rootScope', function($scope, $http, passageFactory, $location, $rootScope) {
    console.log('In Passage Info Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = true;
    $rootScope.hideAddPassage = true;
    $rootScope.depotInfo = false;
    $rootScope.depotBack = true;
    $rootScope.hideNav = true;
    $rootScope.hideNavTwo = true;
    $rootScope.hideUserInfo = true;

    console.log('author->', passageFactory.titleByID);

  $scope.showPassageInfo = function (){

    $scope.titleInfo = passageFactory.titleByID;
    $scope.authorInfo = passageFactory.authorByID;
    $scope.sourceUrlInfo = passageFactory.sourceUrl;
    $scope.imageUrlInfo = passageFactory.imageUrl;
    $scope.passageByID= passageFactory.passageByID;

  };//end show passage info

}]); //end passage info controlller

myApp.controller('userInfoController', ['$scope', '$http', 'passageFactory', '$location', '$rootScope', function($scope, $http, passageFactory, $location, $rootScope) {
    console.log('In User Info Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = true;
    $rootScope.hideAddPassage = true;
    $rootScope.depotInfo = true;
    $rootScope.depotBack = true;
    $rootScope.hideNav = true;
    $rootScope.hideNavTwo = true;
    $rootScope.userInfoBack = false;
    $rootScope.hideUserInfo = true;

  var users = passageFactory.users




  var practices = passageFactory.practicePassages;
  console.log('practices ->', practices);
  var depots = passageFactory.depotPassages;
  console.log('depots ->', depots);
  var titlePracticePassages = [];
  var titleDepotPassages = [];
  $scope.practicePassages = titlePracticePassages
  $scope.depotPassages = titleDepotPassages


  practices.forEach(function(passage){
    titlePracticePassages.push(passage.title)
  });
  depots.forEach(function(passage){
    titleDepotPassages.push(passage.title)
  });
    $scope.userFirst = passageFactory.userFirstName.toUpperCase();
    $scope.userLast = passageFactory.userLastName.toUpperCase();
    $scope.numberOne = passageFactory.practicePassages.length;
    $scope.numberTwo = passageFactory.depotPassages.length;



}]); //end passage info controlller

myApp.controller('fillInBlankController', ['$scope', '$http', 'passageFactory', '$rootScope', '$location', '$timeout', function($scope, $http, passageFactory, $rootScope, $location, $timeout) {
    console.log('In Fill in Blank Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = true;
    $rootScope.hideNav = false;
    $rootScope.hideFooter = false;
    $rootScope.hideInfo = true;
    $rootScope.hideAddToDepot = true;
    $rootScope.hidePassage = false;
    $rootScope.hideDepot = false;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.practiceInfo = false;
    $rootScope.hideAddPassage = true;
    var counter = 0;

    console.log('passageByID', passageFactory.passageByID);

    $scope.authorInfo = passageFactory.authorByID;
    $scope.titleInfo = passageFactory.titleByID;


    $scope.passageQuestions = [passageFactory.passageByID]

    var randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    var init = function () {
        $scope.randomQuestionNumber = randomIntFromInterval(0, $scope.passageQuestions.length - 1);
        $scope.passageArry = $scope.passageQuestions[$scope.randomQuestionNumber].split(' ');
        $scope.randomWordNumber = randomIntFromInterval(0, $scope.passageArry.length - 1);
        $scope.guess = '';
        var answer = $scope.passageArry[$scope.randomWordNumber].split('\n')
        if (answer.length == 2) {
          $scope.showHintOne = '<p>' + 'The Answer Contains Two Words' + '</p>'
        } else {
          $scope.showHintOne = ''
        }
    };
    $scope.guessIt = function () {
      console.log('guess', $scope.guess.toLowerCase());
      console.log('word', $scope.passageArry[$scope.randomWordNumber].toLowerCase().replace('\n', ' ').replace(',','').replace(':',''));
      if ($scope.guess.toLowerCase() == $scope.passageArry[$scope.randomWordNumber].toLowerCase().replace('\n', ' ').replace(',','').replace(':','').replace(';','').replace('.', '').replace('-', '')) {
          swal("Good job!", "You Guessed Correctly!", "success");
          counter = 0;
          $scope.guess = '';
          $scope.reset();
        } else if (counter == 0) {
          console.log('in else if');
          swal({
          title: "Try Again!",
          text: "See Hint 1!",
          imageUrl: "./images/headTwo.jpg" });
          $scope.showHintOne = '<p>' + 'Hint: The First Letter in Word is' + ' ' + '<u>' + $scope.passageArry[$scope.randomWordNumber][0].toUpperCase() + '</u>' + '<p>'
          $timeout(function (){
            $scope.showHintOne = ''
          }, 20000);
          counter++;
        } else if (counter == 1){
          swal({
          title: "Try Again!",
          text: "See Hint 2!",
          imageUrl: "./images/headTwo.jpg" });
          $scope.showHintOne = '<p>' + 'Hint: The First Two Letters are' + ' ' + '<u>' + $scope.passageArry[$scope.randomWordNumber][0].toUpperCase() + $scope.passageArry[$scope.randomWordNumber][1].toUpperCase() + '</u>' + '<p>'
          $timeout(function (){
            $scope.showHintOne = ''
          }, 20000);
          counter++;
        } else {
          swal({
            title: "Sorry You Lose!",
            text: "See Answer",
            imageUrl: "./images/headTwo.jpg" });
            counter++;
            $scope.showHintOne = '<p>' + 'The Answer is' + ' ' + '<u>' + $scope.passageArry[$scope.randomWordNumber].toUpperCase()  + '</u>' + '<p>'
            $timeout(function (){
              $scope.showHintOne = ''
            }, 20000);
            counter = 0;
            $scope.guess = '';
            $scope.reset();
        }

        console.log(counter);
    };
    init();
    $scope.reset = function () {
        init();
    };

}]); //end fill in blank controlller

myApp.controller('splashController', ['$scope', '$http', '$location', '$timeout', '$rootScope', 'passageFactory', function($scope, $http, $location, $timeout, $rootScope, passageFactory) {
    console.log('In Splash Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;


    $scope.init = function () {
      addToDepot();
    }

  var addToDepot = function () {

    console.log('in add to depot');

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

    };//end add to depot function

    $scope.init = function () {
      addToDepot();
    }

    $timeout(function () {
       $location.path ('/depot')
   }, 1050);

}]); //end splash controlller

myApp.controller('splashTwoController', ['$scope', '$http', '$location', '$timeout', '$rootScope', 'passageFactory', function($scope, $http, $location, $timeout, $rootScope, passageFactory) {
    console.log('In Splash Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.blackBack = true;
    $rootScope.whiteBack = false;


    $timeout(function () {
       $location.path ('/login')
   }, 2000);

}]); //end splash controlller

myApp.controller('splashThreeController', ['$scope', '$http', '$location', '$timeout', '$rootScope', 'passageFactory', function($scope, $http, $location, $timeout, $rootScope, passageFactory) {
    console.log('In Splash three Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;
    $rootScope.blackBack = true;
    $rootScope.whiteBack = false;

    $scope.userFirst = passageFactory.userFirstName.toUpperCase();
    $scope.userLast = passageFactory.userLastName.toUpperCase();

      $http({
        method: 'GET',
        url:'/logout/logout'
      }).then(function(response) {
        console.log('response to log out', response);

      });//end http get call



    $timeout(function () {
       $location.path ('/login')
   }, 2000);

}]); //end splash three controlller



myApp.controller('loginController', ['$scope', '$http', '$rootScope','$location', function($scope, $http, $rootScope, $location) {
    console.log('In Login Controller');
    $rootScope.hideIt = true;
    $rootScope.hideBack = false;
    $rootScope.hideNav = true;
    $rootScope.hideFooter = true;
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;

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
    $rootScope.hideNavTwo = false;
    $rootScope.practiceButton = false;

    $scope.registerUser = function() {
        var user = {
            username: $scope.username,
            password: $scope.password,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            depot: 0
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
