(function(angular) {

// 创建电影列表模块，统一实现其他三个模块的功能
angular
	.module('moviecat.movieList', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		
		// /:movieType/:page? 能够匹配的路径:
		// /coming_soon/1   /coming_soon   /coming_soon/2
		// /in_theaters/1   /in_theaters   /in_theaters/2
		// /search?q=成龙   /search?q=张艺谋
		$routeProvider.when('/:movieType/:page?', {
			templateUrl: './movie_list/view.html',
			controller: 'MovieListController'
		});

	}])
	.controller('MovieListController', ['$scope', '$http', '$routeParams', '$route', 'JsonpSrv', function($scope, $http, $routeParams, $route, JsonpSrv){
		// 获取到路由参数，即：电影类型
		console.log($routeParams)
		$scope.isLoading = true;


		// 分页的计算:
		// 一共有: 27条
		// 每页有: 5 条
		// 问: 需要多少页??? 6
		// Math.ceil(27 / 5);

		// 用大写字母来表示 固定的值
		var COUNT = 5;
		// 通过路由参数获取当前页, 并设置默认值
		var curPage = ($routeParams.page || '1') - 0;
		// 暴露给视图中使用
		$scope.curPage = curPage;

		// 需要根据页码(curPage) 以及 页大小(COUNT) 计算 start值
		// 第一页: 0 1 2 3 4
		// 第二页: 5 6 7 8 9
		// 第三页: 10 11 12 13 14
		// ...
		// 第 n页: ( curPage - 1 ) * COUNT
		var startNum = (curPage -1) * COUNT;

		// 分页功能
		$scope.goPage = function( currentPage ) {
			// currentPage 就表示当前页码, 就是要根据当前页码获取指定的数据
			// 只需要让 URL 中的值发生改变, 那么控制器中的代码就会重新执行
			// 只要重新执行 就能够获取到当前页码并且发送请求获取数据!!!

			if(currentPage < 1 || currentPage > $scope.totalPage) {
				return;
			}

			// 通过修改路由参数来实现的分页功能!!!
			// 调用 updateParams 方法, 更新路由参数
			$route.updateParams({page: currentPage});
		};

		
		// 根据不同的路由, 请求不同的接口, 获取相应的数据!!!
		JsonpSrv.jsonp('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
			start: startNum,			// 从第几条开始
			count: COUNT,			// 每一页展示多少条数据
			// 这个	q 是为了电影搜索功能添加的参数，但是，对于其他接口来说
			// 因为其他的接口，是不会 获取 q参数的，所以，多了一个q参数，也不会对其他
			// 接口产生影响！！！
			q: $routeParams.q || ''
		}, function( data ) {
			console.log( data );

			// 因为发送 jsonp 请求是一个异步操作,异步操作是不会触发 angular 的双向绑定机制的!!!
			$scope.movieList = data;

			$scope.totalPage = Math.ceil( data.total / COUNT );

			// 隐藏加载动画效果
			$scope.isLoading = false;

			// 手动触发 angualr 的双向绑定机制, 触发该机制, 将数据的变化映射视图中!
			$scope.$apply();
			// console.log( $scope.movieList );
		});

	}])

})(angular);