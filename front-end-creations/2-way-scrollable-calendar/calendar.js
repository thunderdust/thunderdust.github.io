$(document).ready(function() {
	$('.mobile-talk-message-panel-calendar-table-event-wrap').on('scroll', throttle(function(){
		$('.mobile-talk-message-panel-calendar-table-hours-wrap').scrollTop($(this).scrollTop());
	    $('.mobile-talk-message-panel-calendar-table-days-wrap').scrollLeft($(this).scrollLeft());
	}, 0));
    
	$('.mobile-talk-message-panel-calendar-table-hours-wrap').on('scroll', debounce(function () {
	    $('.mobile-talk-message-panel-calendar-table-event-wrap').scrollTop($(this).scrollTop());
	}, 0));
	
	$('.mobile-talk-message-panel-calendar-table-days-wrap').on('scroll', debounce(function () {
		$('.mobile-talk-message-panel-calendar-table-event-wrap').scrollLeft($(this).scrollLeft());
	}, 0)); 
});

// https://gist.github.com/maxwihlborg/1911a28f988444db3ddc
function debounce(fn, wait) {
	var timeout;
	return function() {
		var ctx = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
		    fn.apply(ctx, args);
		}, wait || 100);
	};
};

// http://stackoverflow.com/questions/27078285/simple-throttle-in-js
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};