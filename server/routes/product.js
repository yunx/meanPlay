'use strict';

// User routes use users controller
var product = require('../controllers/product');

module.exports = function(app) {

	var io = app.socketIo;
	
	var productSocket = io
	.of('/productStream');
	
	app.route('/products').post(product.update(productSocket));
};