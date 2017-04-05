(function(angular) {

angular
	.module('moviecat.jsonp', [])
	.service('JsonpSrv', ['$window', function($window){
		var doc = $window.document;
		
		var jsonp = function(url, params, callback) {
			url += '?';
			for(var k in params) {
				url += k + '=' + params[k] + '&';
			}
			var callbackName = 'itcast_' + (new Date() - 0);

			url += 'callback=' + callbackName;
			$window[callbackName] = function( data ) {
				callback( data );
				doc.body.removeChild( script );
				delete $window[callbackName];
			};

			var script = doc.createElement('script');
			script.src = url;
			doc.body.appendChild( script );
		};

		// 暴露 获取jsonp 数据的方法
		this.jsonp = jsonp;

	}])

})(angular);