var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var stack,
		canvas,
		pad,
		buttons = [],
		guide,
		myGroup,
		doButtons,
		here,
		myEntity = false,
		getWheel,
		dropWheel,
		moveButton,
		myButton,
		i, iz;

	//add stack to web page
	scrawl.addStackToPage({
		stackName: 'stack',
		parentElement: document.getElementById('stackHolder'),
		width: 602,
		height: 402,
	});
	//add canvas to stack
	scrawl.addCanvasToPage({
		stackName: 'stack',
		name: 'canvas',
		width: 600,
		height: 400,
	}).makeCurrent();
	stack = scrawl.stack.stack;
	canvas = scrawl.canvas.canvas;
	pad = scrawl.pad.canvas;

	//dragging entitys to change the curve of the easing path entity
	myGroup = scrawl.makeGroup({
		name: 'myGroup',
	});
	for (i = 0; i < 4; i++) {
		scrawl.makeWheel({
			name: 'wheel_' + i,
			radius: 10,
			lineWidth: 2,
			method: 'fillDraw',
			order: 1,
			group: 'myGroup',
			startX: (i * 155) + 30,
			startY: 200,
			fillStyle: 'yellow',
		});
	}

	//easing path entity
	guide = scrawl.makeBezier({
		name: 'guide',
		lineWidth: 2,
		strokeStyle: '#880000',
		precision: 100,
	});
	//fix easing path Point objects to dragging entitys
	scrawl.point.guide_p1.setToFixed('wheel_0');
	scrawl.point.guide_p2.setToFixed('wheel_1');
	scrawl.point.guide_p3.setToFixed('wheel_2');
	scrawl.point.guide_p4.setToFixed('wheel_3');

	//get DOM buttons and add them to the stack
	stack.addElementsByClassName('mybuttons');
	buttons.push(scrawl.element.button0);
	buttons.push(scrawl.element.button1);
	buttons.push(scrawl.element.button2);
	buttons.push(scrawl.element.button3);

	//position and size buttons
	for (i = 0, iz = buttons.length; i < iz; i++) {
		buttons[i].set({
			startX: 30,
			startY: (i * 100) + 50,
			lockY: true,
			width: 86,
			height: 26,
			path: 'guide',
			pathPlace: 0,
			deltaPathPlace: 0,
			addPathRoll: (i < 2) ? false : true,
			pathSpeedConstant: (i === 0 || i === 2) ? false : true,
		});
	}
	scrawl.renderElements();

	//button animation function
	doButtons = function() {
		for (var j = 0, jz = buttons.length; j < iz; j++) {
			buttons[j].updateStart();
			if (buttons[j].deltaPathPlace) {
				//check to see if animation needs to be stopped
				if (!scrawl.isBetween((buttons[j].pathPlace + buttons[j].deltaPathPlace), 0, 1)) {
					buttons[j].set({
						pathPlace: (buttons[j].pathPlace < 0.5) ? 0 : 1,
						deltaPathPlace: 0,
					});
				}
			}
			buttons[j].renderElement();
		}
	};

	//dragging entity event listeners
	getWheel = function(e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
		here = pad.getMouse();
		myEntity = myGroup.getEntityAt(here);
		if (myEntity) {
			myEntity.pickupEntity(here);
		}
	};
	dropWheel = function(e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}
		if (myEntity) {
			myEntity.dropEntity();
			myEntity = false;
			guide.buildPositions();
		}
	};
	scrawl.addListener('down', getWheel, canvas);
	scrawl.addListener(['up', 'leave'], dropWheel, canvas);

	//button event listeners
	moveButton = function(e) {
		e.preventDefault();
		e.returnValue = false;
		myButton = scrawl.element[e.target.id];
		myButton.set({
			deltaPathPlace: (myButton.pathPlace < 0.5) ? 0.0065 : -0.0065,
		});
	};
	for (i = 0, iz = buttons.length; i < iz; i++) {
		scrawl.elm[buttons[i].name].addEventListener('click', moveButton, false);
	}

	//animation object
	scrawl.makeAnimation({
		fn: function() {

			doButtons();
			pad.render();

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
	extensions: ['wheel', 'path', 'factories', 'animation', 'stacks'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
