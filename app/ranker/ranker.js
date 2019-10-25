'use strict';

angular.module('myApp.ranker', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ranker', {
    templateUrl: 'ranker/ranker.html',
    controller: 'RankerCtrl'
  });
}])

.controller('RankerCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.addRanker = async ({ name }) => {
		const url = 'http://localhost:61000/rankers';

		const { data } = await $http({
			url, 
			method: 'PUT',
			data: { ranker: name }
		});

		if(data) {
			window.location.href = "/";
		}
	};
}]);