// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var pagina = "melvans.cloudapp.net:9090";
angular.module('starter', ['ionic', 'starter.controllers', 'services', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform, $cordovaPush) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });



})

.run(function($cordovaPush,$rootScope) {

  var androidConfig = {
    "senderID": "652530931197",
  };

  document.addEventListener("deviceready", function(){
    $cordovaPush.register(androidConfig).then(function(result) {
      console.log(JSON.stringify(result));
    }, function(err) {
      console.log(JSON.stringify(err));
    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            console.log('registration ID = ' + notification.regid);
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          console.log('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          console.log('GCM error = ' + notification.msg);
          break;

        default:
          console.log('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
    $cordovaPush.unregister(options).then(function(result) {
      // Success!
    }, function(err) {
      // Error
    })

  }, false);
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


   
  // Pagina principal, carrega o menu
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  // Lista do gostos do usuario
  .state('app.gostos', {
    url: "/gostos",
    views: {
      'menuContent': {
        templateUrl: "templates/gostos.html",
        controller: 'GostosCtrl'
      }
    }
  })

  //Lista as atuvidades atuais que estao por perto
  .state('app.acontecendo', {
    url: "/acontecendo",
    views: {
      'menuContent': {
        controller: 'AcontecendoCtrl',
        templateUrl: "templates/acontecendo.html"
      }
    }
  })

  //Mostra as ultimas interacoes da atividade
  .state('app.atividades', {
    url: "/atividades",
    views: {
      'menuContent': {
        controller: 'AtividadesCtrl',
        templateUrl: "templates/atividades.html"
      }
    }
  })


  //Mostra uma atividade especifica
  .state('app.atividades_show', {
    url: "/atividades_show/:atividadeId",
    views: {
      'menuContent': {
        controller: 'AtividadesShowCtrl',
        templateUrl: "templates/atividades_show.html"
      }
    }
  })

   //Mostra uma atividade especifica
  .state('app.interacoes', {
    url: "/interacoes",
    views: {
      'menuContent': {
        controller: 'InteracoesCtrl',
        templateUrl: "templates/interacoes.html"
      }
    }
  })

  //CHAT GERAL
  .state('app.chat', {
    url: "/chat",
    views: {
      'menuContent': {
        controller: 'ChatCtrl',
        templateUrl: "templates/chat.html"
      }
    }
  })


  //CHAT GERAL
  .state('app.chat_show', {
    url: "/chat_show/:Id",
    views: {
      'menuContent': {
        controller: 'ChatShowCtrl',
        templateUrl: "templates/chat_show.html"
      }
    }
  })



  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/acontecendo');



})
.config(function($cordovaFacebookProvider) {
  var appID = 1427722967536898;
  var version = "v2.3"; // or leave blank and default is v2.0
  facebookConnectPlugin.browserInit(appID, version);
});


