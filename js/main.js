var app = angular.module('app', ['ngRoute','ngSanitize','ui.bootstrap']);

app.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.
		when('/probability', {
			templateUrl: 'partials/probability.html',
			controller: 'CouponCollectionCtrl'
		}).
		when('/algorithm', {
			templateUrl: 'partials/algorithm.html',
			controller: 'CouponCollectionCtrl'
		}).
		otherwise({
			templateUrl: 'partials/home.html'
		});
}]);

app.controller('NavCtrl', function($scope) {
	$scope.items = { probability: "Probability", algorithm: "Algorithm"};
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

app.controller('MaxFlowMinCutCtrl', function ($scope, $http, $window) {
	$scope.input = "0 1.75 1.6 0 0 2.5 0\n0 0 2 0 0 0 0\n0 0 0 2 0 0 1\n0 0 0 0 2 0 1.5\n0 0 0 0 0 2 1.2\n0 0 0 0 0 0 1\n0 0 0 0 0 0 0";
	$scope.network = [];
	$scope.path = [];
	$scope.flow = 0;
	$scope.cut = '';
	$scope.main = function(){
		var result = '';
		function existAugmentingPath(t){
			for(var i = 0;i < t+1; i++){
				if($scope.network[i][t] > 0){
					if(i == 0){
						$scope.path[i] = 1;
						$scope.path[t] = 1;
						return true;
					}
					if(existAugmentingPath(i)){
						// i -> t
						$scope.path[i] = 1;
						$scope.path[t] = 1;
						return true;
					}
				}
			}
			return false;
		}
		function getFlow(){
			var s=0,t=0;
			var flow = 100000;
			for(var i=1;i<$scope.network.length;i++){
				if($scope.path[i]==1){
					t = i;
					flow = $scope.network[s][t]>flow?flow:$scope.network[s][t];
					s = t;
				}
			}
			return flow;
		}
		function getCut(t){
			for(var i = 0;i < t+1; i++){
				if($scope.network[i][t] > 0){
					getCut(i);
				}
			}
			$scope.path[t] = 1;
		}
		function assignFlow(flow){
			var i,s=0,t=0;
			for(i=0;i<$scope.network.length;i++){
				if($scope.path[i]==1){
					t = i;
					$scope.network[s][t] -=flow;
					$scope.network[t][s] +=flow;
					s = t;
				}
			}
		}
		function showMinCut(t){
			var result = "Cut : {";
			for(var i=0;i<t;i++){
				if($scope.path[i]==0){
					if(i==0){
						result += "s ";
					}
					else if(i==t-1){
						result += "t ";
					}
					else{
						result += i;
					}
				}
			}
			result += "} ,{";
			for(i=0;i<t;i++){
				if($scope.path[i]==1){
					if(i==0){
						result += "s ";
					}
					else if(i==t-1){
						result += "t ";
					}
					else{
						result += i;
					}
				}
			}
			result += "}";
			return result;
		}
		function showPath(){
			var result = '';
			for(var i=0;i<$scope.path.length;i++){
				if($scope.path[i]==1){
					if(i==0)						result += "s->";
					else if(i==$scope.path.length-1)	result += "t"
					else								result += "" + i + "->";
				}
			}
			return result;
		}
		/* Handle input data...*/
		$scope.network = $scope.input.split("\n");
		for(var i = 0;i<$scope.network.length;i++){
			$scope.network[i] = $scope.network[i].split(' ');
			for(var j = 0; j < $scope.network[i].length;j++){
				$scope.network[i][j] = parseFloat($scope.network[i][j]);
			}
		}
		$scope.flow = 0;
		
		while(existAugmentingPath($scope.network.length-1)){
			var flow = getFlow();
			$scope.flow += flow;
			assignFlow(flow);
			console.log($scope.path);
			result += 'Flow: '+ flow +' | '+ showPath()+'\n';
			$scope.path = [];
		}
		$scope.path = [];
		//getCut($scope.network.length-1);
		//console.log(showMinCut($scope.network.length-1));
		return result;
	}
});
