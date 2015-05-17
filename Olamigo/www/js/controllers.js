var atividades_lista = [
    "Music",
    "Sports",
    "Food",
    "Videogame",
    "Hackaton",
    "Others"];

angular.module('starter.controllers', [])

.controller('AppCtrl', function($ionicLoading, $scope, $ionicModal, $timeout, $cordovaFacebook, User, $cordovaDatePicker, $cordovaBackgroundGeolocation, $http, $cordovaPush) {
  
  $scope.atividades_lista = atividades_lista;
//teste


 var options = {
    // https://github.com/christocracy/cordova-plugin-background-geolocation#config
  };

  document.addEventListener("deviceready", function () {

    // `configure` calls `start` internally
    $cordovaBackgroundGeolocation.configure(options)
    .then(
      null, // Background never resolves
      function (err) { // error callback
        console.error(err);
      },
      function (location) { // notify callback
        console.log(location);
      });


    $scope.stopBackgroundGeolocation = function () {
      $cordovaBackgroundGeolocation.stop();
    };

    $cordovaBackgroundGeolocation.start();

  }, false);

  //--------------------


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

          $cordovaPush.register(androidConfig).then(function(result) {
      console.log(JSON.stringify(result));
    }, function(err) {
      console.log(JSON.stringify(err));
    });

      $scope.modal.hide();

      $cordovaFacebook.api("me", ["public_profile"])
      .then(function(success) {
        $scope.User = User.save(success);

          $http.post(pagina+'/login/', {face_id: $scope.User.id, name: $scope.User.name}).
          success(function(data, status, headers, config) {
            console.log(JSON.stringify(data));
          }).
          error(function(data, status, headers, config) {
              $ionicLoading.show({
                template: 'Connection Erro',
                duration: 1500
              });
          });



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
    { url: '#/app/interacoes', text: 'Interações' },
    { url: '#/app/chat', text: 'Chat' },
    { url: '#/app/playlists',text:'Playlist'},
    { url: '#/app/request',text:'Request'}
  ];

  $scope.User = User.data();


  //MODAL ATIVIDADE

  $scope.newpost = function (){
    $ionicModal.fromTemplateUrl('templates/novaatividade.html', {
        scope: $scope
      }).then(function(modal2) {
        $scope.modal2 = modal2;
        $scope.cat = $scope.atividades_lista[0];
        $scope.modal2.show();
      });

      $scope.newpost_close = function (){
        $scope.modal2.hide();
      };


      $scope.save90 = function(text,categoria){

          $http.post(pagina+'/atividades/', {face_id: window.localStorage['idface'], name: text, category: categoria}).
            success(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
              $scope.modal2.hide();
              $scope.modal.remove();
            }).
            error(function(data, status, headers, config) {
                $ionicLoading.show({
                  template: 'Connection Erro',
                  duration: 1500
                });
            });

      };
  };


})

.controller('GostosCtrl', function($scope,Gostos, $http,$ionicLoading) {

// Retrieve
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




$scope.customStyle = {};


  $scope.gostos2 = [];
  for(i=0;i<$scope.acoes.length/2;i++){
    $scope.gostos2[i] = [];
      $scope.gostos2[i][0]= $scope.acoes[i*2];
      $scope.gostos2[i][1]= $scope.acoes[i*2+1];
  }
  console.log($scope.gostos2);


var confirmado = [];
 $scope.change = function(id, item) {
   var check = 0;


        for(i=0;i<confirmado.length;i++){
          if(confirmado[i] == id){
            check=1
            item.color = "white";

            delete confirmado[i];
          }
        }
        if(check == 0){
         item.color = "coral";
          confirmado.push(id);
        }
         console.log(confirmado);
  };

 $scope.submit = function() {
 
          $http.post(pagina+'/gostos/', {face_id: window.localStorage['idface'], gostos: confirmado}).
          success(function(data, status, headers, config) {
            console.log(JSON.stringify(data));
          }).
          error(function(data, status, headers, config) {
              $ionicLoading.show({
                template: 'Connection Erro',
                duration: 1500
              });
          });
 };

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

.controller('AcontecendoCtrl', function($scope, Acontecendo,$http,$ionicLoading, $cordovaGeolocation, ListaPrincipal) {
  $scope.cat2 = $scope.atividades_lista[0];
  $scope.atividades = [];

   var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $http.post(pagina+'/location/getNearest/', {face_id: window.localStorage['idface'], geo: position.coords.latitude+","+position.coords.longitude, dist:1, cat: $scope.cat2}).
        success(function(data, status, headers, config) {
          $scope.atividades = data.content;
          ListaPrincipal.save(data.content);
          console.log(JSON.stringify(data));
        }).
        error(function(data, status, headers, config) {
            $ionicLoading.show({
              template: 'Connection Erro',
              duration: 1500
            });
        });
    }, function(err) {
      $ionicLoading.show({
              template: 'Verify your GPS!!!',
              duration: 1500
            });
    });


    $scope.invite1 = function(face_id){

         $http.post(pagina+'/invite/', {face_id: face_id, face_id_interessado: window.localStorage['idface']}).
            success(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
            }).
            error(function(data, status, headers, config) {
                $ionicLoading.show({
                  template: 'Connection Erro',
                  duration: 1500
                });
            });

    }
})



.controller('AcontecendoShowCtrl', function($scope, $stateParams, ListaPrincipal) {
   console.log($stateParams.id);
  $scope.acontece = ListaPrincipal.get($stateParams.id);

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

.controller('ChatCtrl', function($scope, $stateParams) {
  $scope.chat = [
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
})
.controller('ChatShowCtrl', function($scope, $stateParams, ListaPrincipal) {
})
.controller('RequestCtrl', function($scope, $stateParams) {
  $scope.request = [];
   $scope.atividades = [];

   var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $http.post(pagina+'/location/getNearest/', {face_id: 4, geo: position.coords.latitude+","+position.coords.longitude, dist:1}).
        success(function(data, status, headers, config) {
          $scope.atividades = data.content;
          ListaPrincipal.save(data.content);
          console.log(JSON.stringify(data));
        }).
        error(function(data, status, headers, config) {
            $ionicLoading.show({
              template: 'Connection Erro',
              duration: 1500
            });
        });
    }, function(err) {
      $ionicLoading.show({
              template: 'Verify your GPS!!!',
              duration: 1500
            });
    });
})
.controller('RequestShowCtrl', function($scope, $stateParams) {
    console.log($stateParams.id);
  $scope.acontece = ListaPrincipal.get($stateParams.id);

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
