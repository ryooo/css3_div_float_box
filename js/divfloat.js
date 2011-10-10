
(function($) {
	var filter_num = 1;
	var window_width;
	var unit_l;
	var unit_t;
	var row_unit;
	var unit_margin = 10;
	var boxes = {};
	$.fn.extend({
		filterByNum: function() {
			window_width =$(window).width();
			unit_l = 0;
			unit_t = 0;
			row_unit = 0;
			boxes = $("div.float_box");
			$.map(boxes, function (i, num) {
				var box = boxes[num];
				var val = $(box).attr("data-val");
				if (val % filter_num !== 0) {
					box.isShow = false;
					box.unit_l = unit_l;
					box.unit_t = unit_t;
				} else {
					unit_l = (row_unit) * ($(box).width() + unit_margin);
					if (unit_l + $(box).width() > window_width) {
						unit_t += ($(box).height() + unit_margin);
						unit_l = 0;
						row_unit = 0;
					}
					row_unit++;
					box.isShow = true;
					box.unit_l = unit_l;
					box.unit_t = unit_t;
				}
			});
			$(this).adjustTranslate();
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
		}
	});
	$("a.controller").click(function() {
		filter_num = $(this).attr("data-filter");
		$(this).filterByNum();
	});
	$(window).resize(function(){
		$(this).filterByNum();
	});
	$(this).filterByNum();

	var data = 'data:image/jpeg;base64,'+
	'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';
	$("div.image_box > img").each(function() {
		$(this).attr("src", data);
	});
})(jQuery);
