(function(angular) {

// 创建首页模块
angular
	.module('moviecat.home_page', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/home_page', {
			// 路径是相对于 index.html 页面的
			templateUrl: './home_page/view.html'
		})
		.otherwise({
			redirectTo: '/home_page'
		})
	}])
	.controller('SearchController', ['$scope', '$location', function($scope, $location){
		$scope.searchText = '';

		$scope.search = function() {
			if($scope.searchText.trim() === '') {
				return;
			}

			// console.log('查水表')
			// $scope.searcText
			// 
			// 通过 $location.url() 传入参数，就表示设置hash值
			$location.url('/search?q=' + $scope.searchText)
		};

	}]);

})(angular);