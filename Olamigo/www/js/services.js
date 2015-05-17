angular.module('services', [])
	.factory('Conta', function($resource) {
	  return $resource(pagina+'/conta/:id');
	})
	.factory('Gostos', function($resource) {
	  return $resource(pagina+'/gostos/');
	});