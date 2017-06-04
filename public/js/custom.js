$(document).ready(function(){
	// Declare global variables
	var breakLength = 5;
	var sessionLength = 25;
	var session = true;
	var countDown = false;
	var timer = setInterval(DecreaseTime ,1000);
	const SESSION = 'SESSION';
	const BREAK = 'BREAK';
	var interval;
	
	
	$('#btn_start').on('click', function(){
		countDown = true;
	});
	
	$('#btn_stop').on('click', function(){
		countDown = false;
	});
	
	$('#btn_reset').on('click', function(){
		var updatedTime = Get_updatedTime($('#sessionDuration').text(), 0);
		$('#timer').text(updatedTime);
		session = true;
		countDown = false;
	});
	
	$('#subtractBreak').on('click', function(){
		DecrementBreak();
	});
	
	$('#subtractBreak').mousedown(function(){
		interval = setInterval(DecrementBreak, 100);
	}).mouseup(function(){
		clearInterval(interval);
	}).mouseleave(function(){
		clearInterval(interval);
	});
	
	$('#addBreak').on('click', function(){
		IncrementBreak();
	});
	
	$('#addBreak').mousedown(function(){
		interval = setInterval(IncrementBreak, 100);
	}).mouseup(function(){
		clearInterval(interval);
	}).mouseleave(function(){
		clearInterval(interval);
	});
	
	$('#subtractSession').on('click', function(){
		DecrementSession();
	});
	
	$('#subtractSession').mousedown(function(){
		interval = setInterval(DecrementSession, 100);
	}).mouseup(function(){
		clearInterval(interval);
	}).mouseleave(function(){
		clearInterval(interval);
	});
	
	$('#addSession').on('click', function(){
		IncrementSession();
	});
	
	$('#addSession').mousedown(function(){
		interval = setInterval(IncrementSession, 100);
	}).mouseup(function(){
		clearInterval(interval);
	});
	
	function DecreaseTime(){
		if (countDown){
			var currentTime = $('#timer').text().split(':');
			var min = parseInt(currentTime[0]);
			var sec = parseInt(currentTime[1]);
			var updatedTime;
			
			console.log('min = ' + min + ' sec = ' + sec);
			
			if (sec === 0){
				if (min > 0) {
					min -= 1;
					sec = 59;

				} else {
					// make a sound
					session = !session;
					
					if (session){
						min = $('#sessionDuration').text();
						$('#timerType').text(SESSION);
					} else {
						min = $('#breakDuration').text();
						$('#timerType').text(BREAK);
					}
				}
			} else {
					sec -= 1;
			}
			
			updatedTime = Get_updatedTime(min, sec);
			console.log(updatedTime);
			$('#timer').text(updatedTime);
		}
	} // End of DecreaseTime
	
	function Get_updatedTime(min, sec){
		if (min.toString().length == 1){ min = '0' + min.toString(); }
		if (sec.toString().length == 1) { sec = '0' + sec.toString();}
		
		return min.toString() + ':' + sec.toString();
	}
	
	function IncrementBreak(){
		var min = parseInt($('#breakDuration').text()); 
		if (min < 59) { min += 1; } // don't allow user to break more than 59 minutes
		
		$('#breakDuration').text(min.toString());
	}
	
	function DecrementBreak(){
		var min = parseInt($('#breakDuration').text()); 
		if (min > 1) { min -= 1; } // don't allow user to break less than 1 minute
		
		$('#breakDuration').text(min.toString());
	}
	
	function IncrementSession(){
		var min = parseInt($('#sessionDuration').text()); 
		if (min < 120) { min += 1; } // don't allow user to session more than 120 minutes (2 hours)
		
		$('#sessionDuration').text(min.toString());
	}
	
	function DecrementSession(){
		var min = parseInt($('#sessionDuration').text()); 
		if (min > 1) { min -= 1; } // don't allow user to session less than 1 minute
		
		$('#sessionDuration').text(min.toString());
	}
});