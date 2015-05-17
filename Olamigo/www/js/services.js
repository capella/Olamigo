angular.module('services', [])
.factory('Conta', function($resource) {
	  return $resource(pagina+'/conta/:id');
	})
.factory('Gostos', function($resource) {
	  return $resource(pagina+'/gostos/');
})


.service('User', function($cordovaFacebook) {
  var usuario = {};
  return {
    save: function(data) {
      window.localStorage['face'] = JSON.stringify(data);
      usuario = data;
      return usuario;
    },
    data: function(){
    	return JSON.parse(window.localStorage['face']);
    }
  }

});

