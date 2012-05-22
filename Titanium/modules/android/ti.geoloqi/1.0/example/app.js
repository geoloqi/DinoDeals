// This is a test harness for your module
// You should do something interesting in this harness
// to test out the module and to provide instructions
// to users on how to use it by example.

// open a single window
var window = Ti.UI.createWindow({
	backgroundColor : 'black',
	layout : 'vertical'
});

var geoloqi = require('ti.geoloqi');

geoloqi.addEventListener(geoloqi.ON_VALIDATE, function(e) {
	Ti.API.debug("Validation Error: error_code: " + e.error_code + ", error_description: " + e.error_description);
});
geoloqi.addEventListener(geoloqi.LOCATION_CHANGED, function(e) {
	Ti.API.debug("LOCATION_CHANGED: Location: " + e.location);
});
geoloqi.addEventListener(geoloqi.LOCATION_UPLOADED, function(e) {
	Ti.API.debug("LOCATION_UPLOADED: number: " + e);
});
geoloqi.addEventListener(geoloqi.TRACKER_PROFILE_CHANGED, function(e) {
	Ti.API.debug("TRACKER_PROFILE_CHANGED: OLD_PROFILE: " + e.OLD_PROFILE + ", NEW_PROFILE: " + e.NEW_PROFILE);
});

geoloqi.init({
	clientId : '',
	clientSecret : '',
	trackingProfile : 'OFF',
	lowBatteryTracking : true,
	// allowAnonymousUsers : true,
	account : 'perminder.singh@globallogic.com',
	icon : ''
}, {
	onSuccess : function() {
		Ti.API.debug('init:onSuccess Called');
		Ti.API.debug('init:Session: ' + geoloqi.session);
		Ti.API.debug('init:Tracker: ' + geoloqi.tracker);
		if(geoloqi.session != null) {
			execute.setEnabled('true');
		}
	},
	onFailure : function(e) {
		Ti.API.debug('init:onFailure Called: error_code: ' + e.error_code + ', error_description: ' + e.error_description);
	}
});

var header = Titanium.UI.createLabel({
	text : 'Geoloqi Android SDK',
	height : '80',
	width : '100%',
	backgroundColor : '#444444',
	color : 'white',
	font : {
		fontSize : 20,
		fontWeight : 'bold'
	},
	textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER
});

var onSuccess = Titanium.UI.createLabel({
	text : 'onSuccess',
	top : '10',
	height : '80',
	width : '100%',
	color : 'white',
	backgroundColor : '#444444',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT
});
var onComplete = Titanium.UI.createLabel({
	text : 'onComplete',
	top : '10',
	height : '80',
	width : '100%',
	color : 'white',
	backgroundColor : '#444444',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT
});
var onFailure = Titanium.UI.createLabel({
	text : 'onFailure',
	top : '10',
	height : '80',
	width : '100%',
	color : 'white',
	backgroundColor : '#444444',
	textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT
});
var execute = Titanium.UI.createButton({
	title : 'Execute',
	top : 10,
	width : 100,
	height : 50,
	enabled : false
});
execute.addEventListener('click', function(e) {
	geoloqi.session.postRequest("oauth/token", {
		"client_secret" : "",
		"client_id" : "",
		"username" : "",
		"password" : "",
		"grant_type" : "password"
	}, {
		onSuccess : function(e) {
			onSuccess.setText(e);
		},
		onFailure : function(e) {
			onFailure.setText(e);
		},
		onComplete : function(e) {
			onComplete.setText(e);
		}
	});
});

window.add(header);
window.add(onSuccess);
window.add(onComplete);
window.add(onFailure);
window.add(execute);
window.open();
