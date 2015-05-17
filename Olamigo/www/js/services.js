angular.module('services', [])
.factory('Conta', function($resource) {
	  return $resource(pagina+'/conta/:id');
	})
.factory('Gostos', function($resource) {
	  return $resource(pagina+'/gostos/');
})

.factory('Acontecendo', function($resource) {
	  return $resource(pagina+'/location/getNearest/');
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
    	 if (window.localStorage.getItem("face") !== 'undefined' 
      && window.localStorage.getItem("face") !== null) {
    	return JSON.parse(window.localStorage['face']);
		}
    }
  }

})

.service('ListaPrincipal', function() {  
  var lista = {};
  return {
    save: function(data) {
      lista = data;
      return lista;
    },
    all: function() {
      return lista;
    },
    get: function(Id) {
      // Simple index lookup
      return lista[Id];
    },
    atualizac: function(Id, num) {
      lista[Id].likes += num;
      return lista;
    },
    atualiza: function(Id, num) {
      lista[Id].likes = num;
      return lista;
    }
  }
  
});;

