 // add ngResource dependency
  angular.module('app', [])

	.factory('Gostos', ['$resource', function($resource){
    return $resource('/gostos/:id', null, {
    'update': { method:'GET' }
     });
     }])
