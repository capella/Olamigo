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

      console.log("p"+window.localStorage.getItem("idface") );

    if (window.localStorage.getItem("idface") !== 'undefined') {
      $scope.modal.hide();
      console.log("p"+window.localStorage.getItem("idface") );
    }

  });


    $cordovaFacebook.getLoginStatus().then(function(success) {
        console.log(JSON.stringify(success)); 
      }, function (error) {
        console.log(JSON.stringify(error));
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
      window.localStorage['idface'] =  success.authResponse.userID;
      console.lo
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

  $scope.menus = [
    { url: '#/app/acontecendo', text: 'Home' },
    { url: '#/app/nova_atividade', text: 'Atividades' },
    { url: '#/app/gostos', text: 'Gostos' },
    { url: '#/app/atividades', text: 'Atividades' },
    { url: '#/app/interacoes', text: 'Interações' },
    { url: '#/app/chat', text: 'Chat' }
  ];

})

.controller('GostosCtrl', function($scope) {




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
