
(function($) {
	var filter_num = 0;
	var size = 3;
	var size_conf = {
		1: {width:422, height:562},
		2: {width:212, height:282},
		3: {width:107, height:142},
		4: {width:44, height:58}
	}
	var window_width;
	var unit_l;
	var unit_t;
	var row_unit;
	var unit_margin = 10;
	var boxes = {};
	$.extend({
		filterByNum: function() {
			window_width = window.innerWidth;
			unit_l = 0;
			unit_t = 0;
			row_unit = 0;
			conf = size_conf[size]
			boxes = $("div.float_box");
			$.map(boxes, function (i, num) {
				var box = boxes[num];
				var val = $(box).attr("data-val");
				if (val != filter_num && filter_num != 0) {
					box.isShow = false;
					box.unit_l = unit_l;
					box.unit_t = unit_t;
				} else {
					unit_l = (row_unit) * (conf.width + unit_margin);
					if (unit_l + conf.width > window_width) {
						unit_t += (conf.height + unit_margin);
						unit_l = 0;
						row_unit = 0;
					}
					row_unit++;
					box.isShow = true;
					box.unit_l = unit_l;
					box.unit_t = unit_t;
				}
			});
			$.adjustTranslate();
			return false;
		},
		adjustTranslate: function() {
			$.map(boxes, function (i, num) {
				var box = boxes[num];
				if (box.isShow === true) {
					$(box).css("-ms-transform", "translate(" + box.unit_l + "px, " + box.unit_t + "px) scale(1, 1)");
					$(box).css("-webkit-transform", "translate3d(" + box.unit_l + "px, " + box.unit_t + "px, 0px) scale3d(1, 1, 1)");
					$(box).css("-moz-transform", "translate(" + box.unit_l + "px, " + box.unit_t + "px) scale(1, 1)");
				} else {
					$(box).css("-ms-transform", "translate(" + box.unit_l + "px, " + box.unit_t + "px) scale(0.001, 0.001)");
					$(box).css("-webkit-transform", "translate3d(" + box.unit_l + "px, " + box.unit_t + "px, 0px) scale3d(0.001, 0.001, 1)");
					$(box).css("-moz-transform", "translate(" + box.unit_l + "px, " + box.unit_t + "px) scale(0.001, 0.001)");
				}
			});
		},
		changeSize: function() {
			boxes = $("div.float_box");
			unit_l = 0;
			unit_t = 0;
			row_unit = 0;
			$.map(boxes, function (i, num) {
				var box = boxes[num];
				conf = size_conf[size]
				$(box).css('width', conf.width + 'px')
				$(box).css('height', conf.height + 'px')
				var img = $(box).children('img')
				$(img).css('width', conf.width + 'px')
				$(img).css('height', conf.height + 'px')
				
				window_width = window.innerWidth;
				unit_margin = 10
				if (box.isShow === true) {
					unit_l = (row_unit) * (conf.width + unit_margin);
					if (unit_l + conf.width > window_width) {
						unit_t += (conf.height + unit_margin);
						unit_l = 0;
						row_unit = 0;
					}
					row_unit++;
					box.unit_l = unit_l;
					box.unit_t = unit_t;
				}
			});
			$.adjustTranslate();
			return false;
		}
	});
	$("a.controller").bind('click', function() {
		filter_num = $(this).attr("data-filter");
		$.filterByNum();
	});
	$("a.size_controller").bind('click', function() {
		size = $(this).attr("data-filter");
		$.changeSize();
	});
	$(window).bind('resize', function(){
		$.filterByNum();
	});
	$.filterByNum();

})($);
