var mycode = function() {
	'use strict';
	//hide-start
	var testTicker = Date.now(),
		testTime = testTicker,
		testNow,
		testMessage = document.getElementById('testmessage');
	//hide-end

	//define variables
	var myStar,
		balls,
		goldie,
		pinkie;

	//build a challenging path for balls to follow
	myStar = scrawl.makePath({
		name: 'star',
		data: 'm180,0-325,106q0-177 201,-277l0,342c0,-300 -250,0 -201,-277l325,106z',
		lineWidth: 5,
		strokeStyle: 'green',
		method: 'draw',
		lineJoin: 'round',
		angle: 144,
		startX: 200,
		startY: 200,
		shadowOffsetX: 4,
		shadowOffsetY: 4,
		shadowBlur: 2,
		shadowColor: 'black',
		precision: 20,
	});

	//add balls
	balls = scrawl.makeGroup({
		name: 'balls',
	});
	goldie = scrawl.makeWheel({
		group: 'balls',
		radius: 10,
		fillStyle: 'gold',
		method: 'fillDraw',
		shadowOffsetX: 2,
		shadowOffsetY: 2,
		shadowBlur: 2,
		shadowColor: 'black',
		path: 'star',
		pathPlace: 0,
		deltaPathPlace: 0.001,
		pathSpeedConstant: false,
	});
	pinkie = goldie.clone({
		fillStyle: 'pink',
		pathPlace: 0.5,
		pathSpeedConstant: true,
	});
	for (var i = 1; i < 10; i++) {
		goldie.clone({
			pathPlace: i / 80,
			order: 20 + i,
		});
		pinkie.clone({
			pathPlace: (i / 80) + 0.5,
			order: 40 + i,
		});
	}

	//animation object
	scrawl.makeAnimation({
		fn: function() {
			myStar.setDelta({
				roll: 0.1,
			});
			balls.updateStart('path');
			scrawl.render();

			//hide-start
			testNow = Date.now();
			testTime = testNow - testTicker;
			testTicker = testNow;
			testMessage.innerHTML = 'Milliseconds per screen refresh: ' + parseInt(testTime, 10) + '; fps: ' + parseInt(1000 / testTime, 10);
			//hide-end
		},
	});
};

scrawl.loadExtensions({
	path: '../source/',
	minified: false,
	extensions: ['wheel', 'path', 'animation'],
	callback: function() {
		window.addEventListener('load', function() {
			scrawl.init();
			mycode();
		}, false);
	},
});
