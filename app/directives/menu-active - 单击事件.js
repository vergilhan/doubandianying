(function(angular) {

angular
	.module('moviecat.menu-active', [])
	.directive('menuActive', function() {

		return {
			restrict: 'A',
			templateUrl: './directives/menu-active.html',
			link: function(scope, element) {
				console.log('自定义指令中的代码执行了')
				// 最终的思路: 监视 hash的变化 修改菜单的选中状态


				// 思路:
				// console.log(element) // ==> nav
				// 1 获取到所有的li元素
				// 2 绑定单击事件
				// 3 给当前元素添加 active 类, 让兄弟元素移除 active 类
				var lis = element.children().children();
				// console.log(lis);
				lis.on('click', function() {
					// console.log(this);
					// 因为 jqlite 中没有提供 siblings ,所以获取不到兄弟元素
					// 思路: 给所有的lis移除 active类
					// 		   给当前元素添加这个类, 就可以了
					lis.removeClass('active');
					this.classList.add('active');
					// this.addClass('active');
				});
			}
		};

	});


})(angular);