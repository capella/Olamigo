angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaFacebook, User, $cordovaDatePicker) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();


      //window.localStorage.removeItem("idface");

      console.log("p"+window.localStorage.getItem("idface") );

    if (window.localStorage.getItem("idface") !== 'undefined' 
      && window.localStorage.getItem("idface") !== null) {
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
      $scope.modal.hide();

      $cordovaFacebook.api("me", ["public_profile"])
      .then(function(success) {
        $scope.User = User.save(success);
      }, function (error) {
        // error
      });


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
    { url: '#/app/gostos', text: 'Gostos' },
    { url: '#/app/atividades', text: 'Atividades' },
    { url: '#/app/interacoes', text: 'Interações' },
    { url: '#/app/chat', text: 'Chat' }
  ];

  $scope.User = User.data();


  //MODAL ATIVIDADE
  $ionicModal.fromTemplateUrl('templates/novaatividade.html', {
    scope: $scope
  }).then(function(modal2) {
    $scope.modal2 = modal2;
  });
  $scope.newpost = function (){
    $scope.modal2.show();
  };

  $scope.newpost_close = function (){
    $scope.modal2.hide();
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

.controller('AcontecendoCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('NovaAtividadeCtrl', function($scope) {
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
