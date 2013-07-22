/* js-reusable-input by John Shammas, lab.johnshammas.com */

$.fn.reusableInput = function(options) {

	var settings = $.extend({
		blur: true,
		blurColor: "#999999",
		caretPosition: 0,
		once: false
	}, options);

	return this.each(function() {
		var e = this;
		
		// If haven't been clicked yet
		$(e).on('mousedown', function(event) {
		
			if (!$(e).data('on') && !$(e).data('finished')) {
			
				// Set caret position
				if (e.setSelectionRange) {
					e.setSelectionRange(settings.caretPosition,settings.caretPosition);
				} else if (this.createTextRange) {
					var range = e.createTextRange();
					range.collapse(true);
					range.moveEnd('character', settings.caretPosition);
					range.moveStart('character', settings.caretPosition);
					range.select();
				}
				
				// Blur text
				if (settings.blur) {
					$(e).css('color', settings.blurColor);
				}
				
				if (settings.once) {
					$(e).data('finished', true);
				}
				
				// Prepare for next action
				$(e).data('on', true);
				$(e).data('blurred', true);
				event.preventDefault();
				
			} else {
				
				// Do default action, and unblur
				$(e).data('blurred', false);
				$(e).css('color', '');
				
			}
			
		});
		
		// Reset for next click
		$(e).on('blur', function() {
		
			$(e).data('on', false);
			$(e).data('blurred', false);
			$(e).css('color', '');
			
		});
		
		// Write over previous text
		$(e).on('keydown', function() {
			
			if ($(e).data('blurred')) {
				$(e).data('on', false);
				$(e).data('blurred', false);
				$(e).css('color', '');
				
				var current = $(e).val();
				$(e).val(current.substring(0,settings.caretPosition));
			}
			
		});
	
	});

};