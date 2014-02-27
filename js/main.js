var app = angular.module('app', ['ngRoute','ngSanitize','ui.bootstrap']);

app.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
		when('/probability', {
			templateUrl: 'partials/probability.html',
			controller: 'CouponCollectionCtrl'
		}).
		otherwise({
			templateUrl: 'partials/home.html'
		});
}]);

app.controller('NavCtrl', function($scope) {
	$scope.items = { home: "Home", probability: "Probability"};
	$scope.selectedIndex = 0;
	$scope.itemClicked = function ($index) {
		$scope.selectedIndex = $index;
	}
});

app.controller('CouponCollectionCtrl', function ($scope, $http, $window) {
	$scope.x = 2;
	$scope.result = function(){
		var y = 0.5772156649;
		var n = $scope.x;
		return n * Math.log(n) + y * n + 0.5;
	};
	/*
	$scope.lookupWiki = function (wikipediaPage){
		$http({method: 'JSONP', 
						url: 'http://en.wikipedia.org/w/api.php?action=parse&format=json&page='+wikipediaPage+'&prop=text|images&callback=JSON_CALLBACK&redirects'}).
			success(function(data, status) {
				var dataTree = $('<div>' + data.parse.text["*"] + '</div>');
				$scope.title = data.parse.title;
				//$scope.data = data.parse.text['*'];;
				$scope.text = dataTree[0].innerText;
				console.log(dataTree[0].innerHTML);
			}).
			error(function(data, status) {
				$scope.data = data || "Request failed";
		});
	}
	$scope.lookupWiki("Coupon collector's problem");
	*/
});

app.controller('BinomialDistCtrl', function ($scope, $http, $window) {
	$scope.n = 50;
	$scope.r = 10;
	$scope.p = 0.2;
	$scope.result = function(){
		var nCr = function (n, r){
			var factorial = function(n){
				if( n < 0 ) return null;
				var result = 1;
				for(var i = n; i > 0; i--){
					result*=i;
				}
				return result;
			}
			return factorial(n) / ( factorial(n-r)*factorial(r) );
			
		}
		return nCr($scope.n, $scope.r) * Math.pow($scope.p,$scope.r) * Math.pow(1 - $scope.p,$scope.n - $scope.r);
	};
	$scope.expectedValue = function(){
		return $scope.p * $scope.n;
	}
});
