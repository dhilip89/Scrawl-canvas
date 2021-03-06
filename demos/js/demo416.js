var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var filter,

		current_alpha = 1,
		input_alpha = document.getElementById('alpha'),
		event_alpha,

		current_strength = 0.3,
		input_strength = document.getElementById('strength'),
		event_strength,

		current_roll = 0,
		input_roll = document.getElementById('roll'),
		event_roll,

		current_radiusX = 3,
		input_radiusX = document.getElementById('radiusX'),
		event_radiusX,

		current_radiusY = 3,
		input_radiusY = document.getElementById('radiusY'),
		event_radiusY,

		stopE;

	//set the initial imput values
	input_alpha.value = '1';
	input_strength.value = '0.3';
	input_roll.value = '0';
	input_radiusX.value = '3';
	input_radiusY.value = '3';

	//define filter
	filter = scrawl.makeNoiseFilter({
		name: 'myfilter',
		alpha: 1,
		roll: 0,
		radiusX: 3,
		radiusY: 3,
		strength: 0.3,
	});

	//define entity
	scrawl.makePicture({
		name: 'parrot',
		copyWidth: 360,
		copyHeight: 360,
		pasteWidth: 360,
		pasteHeight: 360,
		copyX: 50,
		pasteX: 20,
		pasteY: 20,
		filters: ['myfilter'],
		// url: 'http://scrawl.rikweb.org.uk/img/carousel/cagedparrot.png',
		url: 'img/carousel/cagedparrot.png',
	});

	//event listeners
	stopE = function(e) {
		e.preventDefault();
		e.returnValue = false;
	};

	event_alpha = function(e) {
		stopE(e);
		current_alpha = parseFloat(input_alpha.value);
		filter.set({
			alpha: current_alpha,
		});
	};
	input_alpha.addEventListener('input', event_alpha, false);
	input_alpha.addEventListener('change', event_alpha, false);

	event_strength = function(e) {
		stopE(e);
		current_strength = parseFloat(input_strength.value);
		filter.set({
			strength: current_strength,
		});
	};
	input_strength.addEventListener('input', event_strength, false);
	input_strength.addEventListener('change', event_strength, false);

	event_roll = function(e) {
		stopE(e);
		current_roll = parseFloat(input_roll.value);
		filter.set({
			roll: current_roll,
		});
	};
	input_roll.addEventListener('input', event_roll, false);
	input_roll.addEventListener('change', event_roll, false);

	event_radiusX = function(e) {
		stopE(e);
		current_radiusX = parseFloat(input_radiusX.value);
		filter.set({
			radiusX: current_radiusX,
		});
	};
	input_radiusX.addEventListener('input', event_radiusX, false);
	input_radiusX.addEventListener('change', event_radiusX, false);

	event_radiusY = function(e) {
		stopE(e);
		current_radiusY = parseFloat(input_radiusY.value);
		filter.set({
			radiusY: current_radiusY,
		});
	};
	input_radiusY.addEventListener('input', event_radiusY, false);
	input_radiusY.addEventListener('change', event_radiusY, false);

	//animation object
	scrawl.makeAnimation({
		fn: function() {

			scrawl.render();

			//hide-start
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + Math.ceil(testTime) + '; fps: ' + Math.floor(1000 / testTime);
			//hide-end
		},
	});

};

scrawl.loadExtensions({
	path: '../source/',
	minified: false,
	extensions: ['images', 'filters', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
