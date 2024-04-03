/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/jquery-3.7.1.min.jss" />

const myAction = new Action('com.crownedhaley.pishock.action');
const myActionShock = new Action('com.crownedhaley.pishock.actionshock');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	console.log('Your key code goes hereeee!');
	console.log(payload);
	var obj = 
	{
		"Username": "uwuyawn",
		"Apikey": "7936f738-9965-461c-af12-bc238dd661b4",
		"Code": "2BDFC3BBFD4",
		"Name": "HaleyStreamDeck"
	};
	
	console.log($SD.getSettings());
	
	$.ajax({
	  url: "https://do.pishock.com/api/apioperate/",
	  contentType: "application/json",
	  method: "POST",
	  data: JSON.stringify(obj),
	  success: function(result){
		console.log('success');
		console.log(result);
	  }
	});
	
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

myActionShock.onKeyUp(({ action, context, device, event, payload }) => {
	console.log('Your key code goes hereeee!');
	
	var settings = payload.settings;
	
	var op = settings.shockType;
	
	if (settings.shockType == -1){
		op = getRandomInt(3);
	}
	
	var obj = 
	{
		"Username": "uwuyawn",
		"Apikey": "7936f738-9965-461c-af12-bc238dd661b4",
		"Code": settings.code,
		"Name": "HaleyStreamDeck",
		"Op": op,
		"Duration": settings.duration,
		"Intensity": settings.power
	};
	
	$.ajax({
	  url: "https://do.pishock.com/api/apioperate/",
	  contentType: "application/json",
	  method: "POST",
	  data: JSON.stringify(obj),
	  success: function(result){
		  if (result != "Operation Attempted.")
		  {
			  $SD.showAlert(context)
		  }
		  else
		  {
		    $SD.showOk(context)
			console.log('success');
			console.log(result);
		  }
	  },
	  error: function(result){
		$SD.showAlert(context)
		console.log('error');
		console.log(result);
	  }
	});
	
});