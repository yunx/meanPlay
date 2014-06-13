'use strict';

//Setting up route
angular.module('mean.product').config(['$stateProvider',
    function($stateProvider) {
		$stateProvider              
	    .state('product.send', {
	        url: '/products',
	        templateUrl: 'public/product/views/addProduct.html'
	    });
    }
]);
