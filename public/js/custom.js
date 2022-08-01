$(document).ready(function(){
	// Declare global variables
	var session = true;
	var countDown = false;
	var timer = setInterval(MainLoop ,1000);
	const SESSION = 'SESSION';
	const BREAK = 'BREAK';
	var interval;
	var minutesRemaining = 25; // default to 25
	var secondsRemaining = 0;
	
	
	$('#btn_start').on('click', function(){
		countDown = true;
	});
	
	$('#btn_stop').on('click', function(){
		countDown = false;
	});
	
	$('#btn_reset').on('click', function(){
		secondsRemaining = 0;
		minutesRemaining = session ? $('#sessionDuration').text() : $('#breakDuration').text();
		Set_updatedTimeElements();
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
	
	function MainLoop(){
		if (countDown)
		{
			if (secondsRemaining === 0)
			{
				if (minutesRemaining > 0) 
				{
					minutesRemaining--;
					secondsRemaining = 59;
				} 
				else 
				{
					// make a sound
					session = !session;
					
					minutesRemaining = session ? $('#sessionDuration').text() : $('#breakDuration').text();
					$('#timerType').text(session ? SESSION : BREAK);

					countDown = false;
				}
			} 
			else 
			{
				secondsRemaining--;
			}
			
			Set_updatedTimeElements();
		}
	}
	
	function Get_updatedTime(){
		let min = minutesRemaining;
		let sec = secondsRemaining;
		if (min.toString().length == 1){ min = '0' + min.toString(); }
		if (sec.toString().length == 1) { sec = '0' + secondsRemaining.toString();}
		
		return min.toString() + ':' + sec.toString();
	}
	
	function IncrementBreak(){
		let min = parseInt($('#breakDuration').text()); 
		if (min < 59) { min += 1; } // don't allow user to break more than 59 minutes
		
		$('#breakDuration').text(min.toString());

		if (!session && !countDown && secondsRemaining === 0)
		{
			minutesRemaining = min;
			Set_updatedTimeElements();
		}
	}
	
	function DecrementBreak(){
		let min = parseInt($('#breakDuration').text()); 
		if (min > 1) { min -= 1; } // don't allow user to break less than 1 minute
		
		$('#breakDuration').text(min.toString());

		if (!session && !countDown && secondsRemaining === 0)
		{
			minutesRemaining = min;
			Set_updatedTimeElements();
		}
	}
	
	function IncrementSession(){
		let min = parseInt($('#sessionDuration').text()); 
		if (min < 120) { min += 1; } // don't allow user to session more than 120 minutes (2 hours)
		
		$('#sessionDuration').text(min.toString());

		if (session && !countDown && secondsRemaining === 0)
		{
			minutesRemaining = min;
			Set_updatedTimeElements();
		}
	}
	
	function DecrementSession(){
		let min = parseInt($('#sessionDuration').text()); 
		if (min > 1) { min -= 1; } // don't allow user to session less than 1 minute
		
		$('#sessionDuration').text(min.toString());

		if (session && !countDown && secondsRemaining === 0)
		{
			minutesRemaining = min;
			Set_updatedTimeElements();
		}
	}

	function Set_updatedTimeElements(){
		var updatedTime = Get_updatedTime();
		var titleText = (minutesRemaining == 0 && secondsRemaining == 0) ?
			(session ? "TIME FOR BREAK" : "BREAK IS OVER") :
			`${updatedTime} remaining till:  ${session ? BREAK : SESSION}`;

		$('#timer').text(updatedTime);
		$('title').text(titleText);
	}
});