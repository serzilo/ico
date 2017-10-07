(function(document) {
	// var expirationDate = 'December 31 2017 23:59:59 GMT+03:00';
	var expirationDate = 'Oct 17 2017 19:14:00 GMT+0300';

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
			'days': frmt(days),
			'hours': frmt(hours),
			'minutes': frmt(minutes),
			'seconds': frmt(seconds)
		};
	}

	function frmt(val) {
		return val < 0 ? 0 : val;
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


	var languageLink = document.getElementById("language_link");
	var languageMenuItem = document.getElementById("language_menu_item");
	var activeClass = 'active';
	var body = document.body;

	addListener(languageLink, "click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		toggleClass(languageMenuItem, activeClass);
	});

	addListener(body, "click", function(e) {
		if (hasClass(languageMenuItem, activeClass) === true) {
			removeClass(languageMenuItem, activeClass);
		}
	});


	// COMMON FUNCTIONS

	function addListener(obj, evt, fnc) {
		// W3C model
		if (obj.addEventListener) {
			obj.addEventListener(evt, fnc, false);
			return true;
		}
		// Microsoft model
		else if (obj.attachEvent) {
			return obj.attachEvent('on' + evt, fnc);
		}
		// Browser don't support W3C or MSFT model, go on with traditional
		else {
			evt = 'on'+evt;
			if(typeof obj[evt] === 'function'){
				// Object already has a function on traditional
				// Let's wrap it with our own function inside another function
				fnc = (function(f1,f2){
					return function(){
						f1.apply(this,arguments);
						f2.apply(this,arguments);
					}
				})(obj[evt], fnc);
			}
			obj[evt] = fnc;
			return true;
		}
		return false;
	}

	function toggleClass(element, className){
		if (!element || !className) { return; }

		var classString = element.className, nameIndex = classString.indexOf(className);
		if (nameIndex === -1) {
			classString += ' ' + className;
		}
		else {
			classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
		}
		element.className = classString;
	}

	function hasClass(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}

	function removeClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	}

})(document);
