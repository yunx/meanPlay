'use strict';

angular.module('mean.product').factory('streamService', ['streamHeaderService','streamChartService',
    function(streamHeaderService,streamChartService) {    	
    	return {
    		update : function(data){
    			streamHeaderService.update(data);
    			streamChartService.update(data);
    		},
    		start : function($scope){	
    			streamHeaderService.start($scope);
    		}
    	};    	
    }
]).factory('streamHeaderService', ['$timeout',
	function($timeout) {    	
		var blank = blankStream(100);
		var stream = ""; 
		var display = blank;
		
		function blankStream(maxLength){
			var str = "";
			for(var i=0; i < maxLength; i++){
				str += " ";
			}
			return str;
		}
		
		function interval(fn,delay){
			$timeout(function(){
				fn();
				interval(fn,delay);
			},delay);  		
		}  	
		    	
		function getProductStream(){    	
			var c = " ";
			if(stream.length > 0){
				c = stream.charAt(0);
				stream = stream.substring(1)
			}    		
			display = display.substring(1) + c;
			return display;
		}
		
		return {
			update : function(data){
				var str = data.productType;
				var list = data.productList;
				for(var i=0; i< list.length; i++){
					var item = list[i];
					str += '['+item.productName+" sold "+item.volume+" units @" + item.itemPrice+']';
				}
				stream += str;
			},
			start : function($scope){	
				interval(function(){
					$scope.productStream = getProductStream();
				},200);
			}
		};    	
	}
]).factory('streamChartService', ['streamChart',
   	function(streamChart) {
   		var volumeChart = streamChart("volumeChart",'Volume Chart','Time','Sold in Volume');
   		var priceChart = streamChart("priceChart",'Price Chart','Time','Sold in Price');
   		
   		function sum(data,cb){
   			var products = {};
   			var type = data.productType;
   			var list = data.productList;
   			for(var i=0; i < list.length; i++){
   				var item = list[i];
   				var name = item.productName;   				
   				products[type+' '+name] = (products[type+' '+name] || 0 ) + cb(item);
   			}
   			return products;
   		}
   		
   		return {
   			/**
   			 * data = {"productType" :"String",
   			 *  "productList" : [{"productName ":"String","volume":1,"itemPrice":200}]
   			 *  }
   			 */
   			update : function(data){
   				volumeChart.update(sum(data,function(item){
   					return item.volume;
   				}));
   				priceChart.update(sum(data,function(item){
   					return item.volume * item.itemPrice;
   				}));
			}
   		};
	}
]).factory('streamChart', [
	function() {
		return function(id,chartTitle, xLabel, yLabel){
			var count = 0;
			var data = [];
			var labels = [];
			
			var options = {
					title : chartTitle,
					legend: {
						show : true,
			            renderer: $.jqplot.EnhancedLegendRenderer,
			            placement: 'outsideGrid',
			            labels: labels	            
			        },
			        axes:{
			        	xaxis :{
			        		label : xLabel
			        	},
			        	yaxis :{
			        		label : yLabel
			        	}
			        }
			};
			var seriesMap = {};
			var chart = jQuery.jqplot(id,[[0,0]],options);
			return {				
				update : function(series){
					for(var name in series){
						var index = seriesMap[name]; 
						if(index === undefined){
							index = seriesMap[name] = labels.length;
							labels.push(name);
							data.push([]);
						}
						data[index].push([count,series[name]]);						
					}
					count++;
					chart.destroy();
					chart = jQuery.jqplot(id,data,options);		
				}				
			};
		};    	
	}
]);
