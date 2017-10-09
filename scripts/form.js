(function($) {
	var errorInputClass = 'b-input--error';
	var messagePlace = '.form-message';

	$('body').on('submit', '.js-email-form', function(e) {
		e.preventDefault();

		var $this = $(this);
		var $input = $this.find('.b-input');
		var email = $input.val();

		$input.removeClass(errorInputClass);

		if (isValidEmail(email) === true) {
			var $messagePlace = $this.find(messagePlace);
			var action = $this.attr('action');

			$.ajax({
				type: "POST",
				url: action,
				data: {
					email: email
				}
			}).done(function( data ) {
				$messagePlace.html(data.message);
				$input.val('');
			});

		} else {
			$input.addClass(errorInputClass);
		}
	});

	function isValidEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

})(jQuery);
