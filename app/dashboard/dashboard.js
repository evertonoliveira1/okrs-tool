'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/dashboard', {
		templateUrl: 'dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	})
	.when('/dashboard/:rankerId', {
		templateUrl: 'dashboard/edit.html',
		controller: 'DashboardEditCtrl'
	});
}])

.controller('DashboardCtrl', ['$scope', '$http', function($scope, $http) {

	const BASE_URL = "http://localhost:61000";

	$scope.statuses = [
		{ description: 'Pendentes' },
		{ description: 'Concluídos' },
	];

	$scope.applyFilter = () => {

		const { ranker, status } = $scope.filter;
		$scope.rankers = $scope.rankersOriginal;

		if(status && status !== "Todos"){
			$scope.rankers = $scope.rankers.filter(r => r.cerimony.hasFinished === (status === "Concluídos"));
		}

		if(ranker && ranker !== "Todos"){
			$scope.rankers = $scope.rankers.filter(r => r.ranker === ranker);
		}
	};

	const init = async () => {
		const url = `${BASE_URL}/rankers`;
		const { data } = await $http.get(url);
		$scope.rankers = data;
		$scope.rankersOriginal = data;
		$scope.$apply();
	};

	init();
}])

.controller('DashboardEditCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	
	const BASE_URL = "http://localhost:61000";

	const fields  = [
		"welcomeEmail",
		"welcomeMeeting",
		"tasksEmail",	
		"crossword",
		"quiz",
		"feedbackMeeting",
		"cerimony"
	];

	$scope.calculateTotal = (grade, index) => {		
		const { measurable, cohesion, porposal, clarity } = grade || {};
		grade.total = (measurable + cohesion + porposal + clarity);
	};

	const init = async () => {
		const { rankerId } = $routeParams;
		const url = `${BASE_URL}/rankers/${rankerId}`;
		const { data } = await $http.get(url);
		$scope.ranker = data;
		formatDate();
		$scope.$apply();
	};

	$scope.save = async () => {
		const { rankerId } = $routeParams;
		const url = `${BASE_URL}/rankers/${rankerId}`;
		const { data } = await $http({
			url, 
			method: 'PUT',
			data: $scope.ranker
		});
		if(data) $scope.goBack();
	};

	$scope.goBack = () => {
		window.history.back();
	};
	
	const formatDate = () => {

		fields.forEach(prop => {		
			if($scope.ranker && $scope.ranker[prop].date) {
				const dateObj = new Date($scope.ranker[prop].date);
				const formattedDate = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
				$scope.ranker[prop].date = formattedDate;
				$scope.$apply();
			}
		});
		
	};

	init();
}]);