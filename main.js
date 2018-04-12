
class Clock{
	constructor(display) {
		this.display = display;
		this.timeOfday();
		this.time('stop');
	}

	timeOfday() {
		var now = new Date();
		var hour  = now.getHours();
		var background = document.body;
		console.log(hour >= 20 );
		if(hour >= 20 && hour <= 0 || hour >= 0 && hour <= 6 ) {
			background.style.backgroundColor = '#546BAB'
		} else {
			background.style.backgroundColor = '#ECF7CC'
		}
	}

	getTime() {
		var now = new Date();
		var hour  = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		return `${pad0(hour)}:${pad0(min)}:${pad0(Math.floor(sec))}`;
	}
	
	showTime() {
		this.display.innerText = this.getTime();
	}

	time(val) {
		var currentTime;
		var self = this;
		switch(val) {
			case 'startClock':
				startClock();
				break;
			case 'stop':
				stop();
				break;
			case 'startTimer':
				startTImer();
				break;
		}
		function startClock() {
			self.currentTime = setInterval(function(){
				self.showTime();
			},1000);
		}
		function stop() {
			clearTimeout(self.currentTime);
			self.reset();
		}
		function startTImer() {
			self.currentTime = setInterval(function(){
				self.timerStart();
			},10);
		}
	}
	reset() {
		this.timerNums = {
			mins: 0,
			secs: 0,
			msecs: 0
		};
		this.display.innerText = `${pad0(this.timerNums.mins)}:${pad0(this.timerNums.secs)}:${pad0(Math.floor(this.timerNums.msecs))}`;
	}	
	timerStart() {
		this.timerNums.msecs += 1;
		if(this.timerNums.msecs >= 100) {
			this.timerNums.secs += 1;
			this.timerNums.msecs = 0;
		}
		if(this.timerNums.secs >= 60) {
			this.timerNums.mins += 1;
			this.timerNums.secs = 0;
		}
		return this.display.innerHTML = `${pad0(this.timerNums.mins)}:${pad0(this.timerNums.secs)}:${pad0(Math.floor(this.timerNums.msecs))}`;
	}

}

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    } else if (result.length > 2) {
    	result = result.slice(1,2);
    }
    return result;
}

var clock = new Clock( document.querySelector('.clock-display'));
var buttons = document.querySelector('.buttons-wrapper');
var startButton = document.querySelector('.start');
var stopButton = document.querySelector('.stop');
var timerStart = document.querySelector('.timer');

buttons.addEventListener('click', function(e) {
	var target = e.target;
	switch(target) {
		case startButton:  {
			clock.time('startClock');
			timerStart.setAttribute('disabled','disabled');
			startButton.setAttribute('disabled','disabled');
			break;
		}
		case stopButton: {
			timerStart.removeAttribute('disabled');
			startButton.removeAttribute('disabled');
			clock.time('stop');
			break;
		}
		case timerStart: {
			clock.time('startTimer');
			startButton.setAttribute('disabled','disabled');
			timerStart.setAttribute('disabled','disabled');
			break;
		}
	}	
})