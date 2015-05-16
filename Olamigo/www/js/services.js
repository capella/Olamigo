angular.module('services', [])
	.factory('Conta', function($resource) {
	  return $resource(pagina+'/conta/:id');
	});
