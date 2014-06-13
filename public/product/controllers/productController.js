'use strict';

angular.module('mean.product').controller('ProductStreamController', ['$scope','streamService',
    function($scope, streamService) {
		
		var socket = io.connect('/productStream');
		streamService.start($scope);
		socket.on('productStream',function(data){
			streamService.update(data);			
			$scope.$apply(function(){
				$scope.product = angular.toJson(data);
			});
		});

    }
]).controller('ProductEnterController', ['$scope','$http',
    function($scope, $http) {	
		$scope.sendProduct = function() {
			var json = undefined;
			try{
				json = angular.fromJson($scope.product);
			}
			catch(e){
				$scope.status = 'Failed to parse above json';
				return;
			}
	        $http.post('/products', json)
	            .success(function(data) {
	            	$scope.status = data.status;
	            })
	            .error(function(error) {
	            	$scope.status = error;
	            });
	    };
	}
]);
