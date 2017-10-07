(function(document) {
	var expirationDate = 'December 31 2017 23:59:59 GMT+03:00';
	var daysEl    = document.getElementById("timer_days");
	var hoursEl   = document.getElementById("timer_hours");
	var minutesEl = document.getElementById("timer_minutes");
	var secondsEl = document.getElementById("timer_seconds");

	function getTimeRemaining(endtime){
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		var hours = Math.floor( (t/(1000*60*60)) % 24 );
		var days = Math.floor( t/(1000*60*60*24) );
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	var timeinterval = setInterval(function() {
		var t = getTimeRemaining(expirationDate);

		daysEl.innerHTML    = t.days;
		hoursEl.innerHTML   = t.hours;
		minutesEl.innerHTML = t.minutes;
		secondsEl.innerHTML = t.seconds;

		if(t.total<=0) {
			clearInterval(timeinterval);
		}
	}, 1000);


})(document);
