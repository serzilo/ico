(function(document) {
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
