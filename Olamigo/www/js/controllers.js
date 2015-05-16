angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaFacebook) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    //$scope.modal.show();

    $cordovaFacebook.getLoginStatus().then(function(success) {
        console.log(JSON.stringify(success));
        if(success.status=="connected"){
            $scope.modal.hide();
        }   
      }, function (error) {
        console.log(JSON.stringify(error));
    });
  });


  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $cordovaFacebook.login(["public_profile", "email", "user_friends"])
    .then(function(success) {
      console.log(JSON.stringify(success));
      $scope.modal.hide();
    }, function (error) {
      // error
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
    //  $scope.closeLogin();
    //}, 1000);
  };




})

.controller('GostosCtrl', function($scope) {

  // Store
localStorage.setItem("id", "face");
// Retrieve
$scope.idFacebook = localStorage.getItem("id");
$scope.acoes = [
    { image: '../img/comedies.png', nome:"Comedies Movies"},
    { image: '../img/action.png', nome:"Action Movies"},
    { image: '../img/terror.jpeg', nome:"Terror Movies"},
    { image: '../img/romance.jpeg', nome:"Romance Movies"},
    { image: '../img/rock.jpeg', nome:"Rock Bands"},
    { image: '../img/metal.jpeg', nome:"Metal Bands"},
    { image: '../img/eletronic.jpeg', nome:"Eletronic Bands"},
    { image: '../img/classic.jpeg', nome:"Classic Concerts"},
    { image: '../img/adventures.jpeg', nome:"Adventures"},
    { image: '../img/playmusic.jpeg', nome:"Playing Music"}

  ];
  $scope.gostos2 = [];
  for(i=0;i<$scope.acoes.length/2;i++){
    $scope.gostos2[i] = [];
      $scope.gostos2[i][0]= $scope.acoes[i*2];
      $scope.gostos2[i][1]= $scope.acoes[i*2+1];
  }
  console.log($scope.gostos2);

})


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
