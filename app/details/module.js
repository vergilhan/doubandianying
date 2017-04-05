(function(angular) {

// 电影详情页
angular
	.module('moviecat.details', [])
	.config(['$routeProvider',function($routeProvider) {
		
		$routeProvider.when('/subject/:movieId', {
			templateUrl: './details/view.html',
			controller: 'DetailsController'
		});

	}])
	.controller('DetailsController', ['$scope', '$routeParams', 'JsonpSrv', DetailsController]);


	// 控制器代码
	function DetailsController($scope, $routeParams, JsonpSrv) {
		$scope.isLoading = true;

		JsonpSrv.jsonp(
			'https://api.douban.com/v2/movie/subject/' + $routeParams.movieId, 
			{}, 
			function( data ) {
				$scope.details = data;
				$scope.isLoading = false;

				console.log( data );

				$scope.$apply();
			});
	}

})(angular);