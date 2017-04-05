(function (angular) {
// "use strict";

// start your ride

// 主模块，用于加载其他所有的模块
angular
	.module('moviecat', [
		'moviecat.home_page',
		// 将 details模块在 movieList 之前引入即可！！！
		'moviecat.details',
		'moviecat.movieList',
		'moviecat.jsonp',
		'moviecat.menu-active',
		/*'moviecat.in_theaters',
		'moviecat.top250',
		'moviecat.coming_soon'*/
	]);

})(angular);