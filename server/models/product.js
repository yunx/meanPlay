'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
/**
 * User Schema
 */
var ProductSchema = new Schema({
    productType: {
        type: String,
        required: true
    },
    productList : [{
    	productName : String,
    	volume : Number,
    	itemPrice : Number
    }]
});

mongoose.model('Product', ProductSchema);
