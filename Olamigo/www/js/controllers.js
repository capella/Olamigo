angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaFacebook) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();

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
    { image: '../img/comedies.png', id: 1 },
    { image: '../img/action.png', id: 2 },
    { image: '../img/terror.png', id: 3 },
    { image: '../img/romance.png', id: 4 },
    { image: '../img/rock.pmg', id: 5 },
    { image: '../img/classic.png', id: 6 }
    { image: '../img/eletronic', id: 6 }
    { image: '../img/eletronic', id: 6 }
    { image: '../img/eletronic', id: 6 }
    { image: '../img/eletronic', id: 6 }
  ];

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
