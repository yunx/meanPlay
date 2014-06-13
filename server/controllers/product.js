'use strict';

var mongoose = require('mongoose'),
Product = mongoose.model('Product');

exports.update = function(productIo) {
		
	function validateFormat(product){
		if(product.productType === undefined){
			return 'Require productType';
		}
		if(product.productList === undefined){
			return 'Require productList';
		}
		if(!Array.isArray(product.productList)){
			return 'productList must be array';
		}
		var list = product.productList;
		for(var i=0; i < list.length; i++){
			var item = list[i];
			if(item.productName === undefined){
				return 'Require productName in productList['+i+']';
			}
			if(typeof item.volume !== 'number'){
				return 'volume must be number for productName = '+item.productName;
			}
			if(typeof item.itemPrice !== 'number'){
				return 'itemPrice must be number for productName = '+item.productName;
			}
		}
	}
	
	function consolidate(product){		
		var list = product.productList;
		var map = {};
		for(var i=0; i < list.length; i++){
			var item = list[i];
			var key = item.productName+item.itemPrice;
			var productItem = map[key];
			if(productItem === undefined){
				map[key] = item;
			}
			else{
				var totalVolume = productItem.volume + item.volume;
				productItem.volume = totalVolume;
			}
		}
		list = [];
		for(var name in map){
			list.push(map[name]);
		}
		return {
			"productType" : product.productType,
			"productList" : list
		};
	}
		
	
	return function(req, res, next){		
		var error = validateFormat(req.body);
		if(error){
			res.send({status:error});
			return;
		}	
		
		var productData = consolidate(req.body);
		var product = new Product(productData);
		product.save(function(err){
			
		});
		
		productIo.emit('productStream', productData);
		res.send({status:'received'});
	};
};
