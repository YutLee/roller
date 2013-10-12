(function($) {
	$.fn.roller = function(options) {
		var o = $.extend({
			speed: 300,
			delay: 3000,
			item: 5,
			isAuto: true
		}, options || {});
		return this.each(function() {
			var $t = $(this),
				prev = $t.find('.prev'),
				next = $t.find('.next'),
				$wrapper = $t.find('.wrapper'),
				$roller = $wrapper.children(),
				$item = $roller.children(),
				len = $item.length,
				iWidth = $item.outerWidth(true),
				wWidth = iWidth * o.item,
				rWidth = iWidth * len,
				sWidth = iWidth * (len % o.item),
				minLeft = -(rWidth - wWidth);
			var isRolling = false,
				play;
				
			$wrapper.width(wWidth);
			
			function roll(ra) {
				if(!isRolling) {
					var mLeft = parseInt($roller.css('margin-left'), 10);
					if(ra === 'prev') {
						var aniWidth = (-mLeft >= wWidth) ? wWidth : sWidth;
						if(mLeft < 0) {
							isRolling = true;
							$roller.animate({'margin-left': mLeft + aniWidth}, o.speed, function() {
								isRolling = false;
							});
						}
					}else if(ra === 'next') {
						var aniWidth = (mLeft - minLeft >= wWidth) ? wWidth : sWidth;
						if(mLeft > minLeft) {
							isRolling = true;
							$roller.animate({'margin-left': mLeft - aniWidth}, o.speed, function() {
								isRolling = false;
							});
						}
					}
				}
			}
			
			prev.bind({
				'click': function() {
					roll('prev');
					return false;
				}
			});
			next.bind({
				'click': function() {
					roll('next');
					return false;
				}
			});
			
			function autoRoll() {
				if(!isRolling) {
					var mLeft = parseInt($roller.css('margin-left'), 10);
					if(mLeft === minLeft) {
						$roller.animate({'margin-left': 0}, o.speed, function() {
							isRolling = false;
						});
					}else {
						next.click();
					}
				}
			}
			
			play = setInterval(autoRoll, o.delay);
			
			$t.bind({
				'mouseenter': function() {
					clearInterval(play);
				},
				'mouseleave': function() {
					play = setInterval(autoRoll, o.delay);
				}
			});
			
		});
	};
})(jQuery);