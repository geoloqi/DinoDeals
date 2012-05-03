// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

// open a single window
var window = Ti.UI.createWindow({
	backgroundColor : 'white'
});

var geoloqi = require('ti.geoloqi');
geoloqi.setDebug(true);
geoloqi.addEventListener("onValidate", function(e) {
	alert("Validation Error: error_code: " + e.error_code
			+ ", error_description: " + e.error_description);
});
geoloqi.addEventListener("onServiceConnected", function() {
	sessionProxy = geoloqi.getLQSession();
	Ti.API.debug("Session received: " + sessionProxy);
});
geoloqi.addEventListener("onServiceDisconnected", function() {

});

var scrollViewer = Ti.UI.createScrollView({
	contentWidth : 'auto',
	contentHeight : 1000,
	width : 1024,
	// height: 400,
	backgroundColor : '#c5c5c5',
	showVerticalScrollIndicator : true,
	showHorizontalScrollIndicator : false,
	zIndex : 10
});

var sessionProxy;
// android specific
if (Ti.Platform.name == "android") {
	var extras = {
		EXTRA_SDK_ID : "b272bc7b3add8b4cb32a0c9b222ab6c4",
		EXTRA_SDK_SECRET : "db9181529c7922e6d23764c4614966b4",
		EXTRA_USERNAME : "sapan.varshney@globallogic.com",
		EXTRA_PASSWORD : "S@pan123"
	}

	geoloqi.startLQService("ACTION_AUTH_USER", extras);

}

var buttonrestoreSavedSession = Ti.UI.createButton({
	title : 'Restore Saved Session',
	top : 5,
	width : 200
});

var buttonIsPushEnabled = Ti.UI.createButton({
	title : 'Is Push Enabled',
	top : 60,
	width : 200
});

var buttonSetPushEnabled = Ti.UI.createButton({
	title : 'Set Push Enabled',
	top : 120,
	width : 200
});

var buttonGetUserName = Ti.UI.createButton({
	title : 'Get UserName',
	top : 180,
	width : 200
});

var buttonIsAnonymus = Ti.UI.createButton({
	title : 'Is Anonymus',
	top : 240,
	width : 200
});

var buttonCreateAccountWithAnonymusUser = Ti.UI.createButton({
	title : 'Create Acct With Anonymus User',
	top : 300,
	width : 200
});

var buttonCreateAccountWithUserName = Ti.UI.createButton({
	title : 'Create Account With User Name',
	top : 360,
	width : 200
});

var buttonAuthenticateUser = Ti.UI.createButton({
	title : 'Authenticate User',
	top : 420,
	width : 200
});

var buttonregisterDeviceToken = Ti.UI.createButton({
	title : 'Register Device User',
	top : 480,
	width : 200
});

var buttonRunGetrequest = Ti.UI.createButton({
	title : 'Run Get Request',
	top : 540,
	width : 200
});

var buttonrunPostRequestWithJSONObject = Ti.UI.createButton({
	title : 'Run Post Request With JSON Object',
	top : 600,
	width : 200
});

var runPostRequestWithJSONArray = Ti.UI.createButton({
	title : 'Run Post Request With JSON Array',
	top : 660,
	width : 200
});

var runAPI = Ti.UI.createButton({
	title : 'Run API',
	top : 720,
	width : 200
});

var buttonformatTimeStamp = Ti.UI.createButton({
	title : 'Format Time Stamp',
	top : 780,
	width : 200
});

var buttoncreateLQSession = Ti.UI.createButton({
	title : 'Create Session',
	top : 840,
	width : 200
});

// createLqSession();

buttoncreateLQSession.addEventListener('click', function() {
	createLqSession();
});

buttonrestoreSavedSession.addEventListener('click', function() {
	var result = sessionProxy.restoreSavedSession();
	alert(result);
});

buttonIsPushEnabled.addEventListener('click', function() {
	var result = sessionProxy.isPushEnabled();
	alert(result);
});

buttonSetPushEnabled.addEventListener('click', function() {
	var result = sessionProxy.setPushEnabled(true);
	alert(result);
});

buttonGetUserName.addEventListener('click', function() {
	var result = sessionProxy.getUSerName();
	alert(result);
});

buttonIsAnonymus.addEventListener('click', function() {
	var result = sessionProxy.isAnonymous();
	alert(result);
});

buttonCreateAccountWithAnonymusUser.addEventListener('click', function() {
	sessionProxy.createAnonymousUserAccount({}, {
		onComplete : function(e) {
			alert(e);
		},
		onFailure : function(e) {
			alert(e);
		},
		onSuccess : function(e) {
			alert(e);
			// Ti.App.Properties.setString('responsedata', JSON.stringify(e));
			// mainwindow.add(getResponseView(mainwindow));
		}

	});
});

buttonCreateAccountWithUserName.addEventListener('click', function() {
	sessionProxy.createAccountWithUsername('pritisrivastava',
			'sapan.varshney@gmail.com', {
				onComplete : function(e) {
					alert(e);
				},
				onFailure : function(e) {
					alert(e);
				},
				onSuccess : function(e) {
					alert(e);
				}
			});
});

buttonAuthenticateUser.addEventListener('click', function() {
	createLqSession();
	sessionProxy.authenticateUser('sapan.varshney@globallogic.com', 'S@pan123',
			{
				onComplete : function(e) {
					alert(e);
				},
				onFailure : function(e) {
					alert(e);
				},
				onSuccess : function(e) {
					//alert(e);
					//alert(e);
					//alert(e.session);
					//alert(e.session.isAnonymous());
					//var trackerProxy=geoloqi.getLQTracker();
					//trackerProxy.setSession(e.session);
				}
			});
});

buttonregisterDeviceToken.addEventListener('click', function() {
	sessionProxy.registerDeviceToken('1234');
});

buttonRunGetrequest.addEventListener('click', function() {
	var result = sessionProxy.runGetRequest("account/profile", {
		onComplete : function(e) {
			alert(e);
		},
		onFailure : function(e) {
			alert(e);
		},
		onSuccess : function(e) {
			alert(e);
		}
	});
});

buttonrunPostRequestWithJSONObject.addEventListener('click', function() {
	var postJSON = {
		text : 'This is test geonote',
		"latitude" : "45.445793867111",
		"longitude" : "-122.64261245728",
		"radius": "10"
		
	};
	sessionProxy.runPostRequestWithJSONObject("geonote/create", postJSON, {
		onComplete : function(e) {
			alert(e);
		},
		onFailure : function(e) {
			alert(e);
		},
		onSuccess : function(e) {
			alert(e);
		}
	});
});
runPostRequestWithJSONArray.addEventListener('click', function() {

	var jsonObjectArray = [ {
		"date" : "2010-07-23T09:19:38-07:00",
		"location" : {
			"position" : {
				"latitude" : "45.445793867111",
				"longitude" : "-122.64261245728",
				"speed" : "10",
				"altitude" : "0",
				"horizontal_accuracy" : "24",
				"vertical_accuracy" : "0"
			},
			"type" : "point"
		},
		"raw" : {
			"distance_filter" : 5,
			"tracking_limit" : 2,
			"rate_limit" : 60,
			"battery" : 86
		},
		"client" : {
			"name" : "Geoloqi",
			"version" : "0.1",
			"platform" : "iPhone OS 4",
			"hardware" : "iPhone2,1"
		}
	}, {
		"date" : "2010-07-23T09:19:38-07:00",
		"location" : {
			"position" : {
				"latitude" : "45.445793867111",
				"longitude" : "-122.64261245728",
				"speed" : "10",
				"altitude" : "0",
				"horizontal_accuracy" : "24",
				"vertical_accuracy" : "0"
			},
			"type" : "point"
		},
		"raw" : {
			"distance_filter" : 5,
			"tracking_limit" : 2,
			"rate_limit" : 60,
			"battery" : 86
		},
		"client" : {
			"name" : "Geoloqi",
			"version" : "0.1",
			"platform" : "iPhone OS 4",
			"hardware" : "iPhone2,1"
		}
	} ];

	sessionProxy.runPostRequestWithJSONArray("location/update",
			jsonObjectArray, {
				onComplete : function(e) {
					alert(e);
				},
				onFailure : function(e) {
					alert(e);
				},
				onSuccess : function(e) {
					alert(e);
				}
			});
});

runAPI.addEventListener('click', function() {
	// var myJSON = {};
	// sessionProxy.runAPIRequest("account/profile","GET",myJSON);
	var postJSON = {
		"name" : "sapanvarshney3"
	};
	sessionProxy.runAPIRequest("account/profile", "POST", postJSON, {
		onComplete : function(e) {
			alert(e);
		},
		onFailure : function(e) {
			alert(e);
		},
		onSuccess : function(e) {
			alert(e);
		}
	});
});

buttonformatTimeStamp.addEventListener('click', function() {
	var result = sessionProxy.formatTimeStamp(1111111111);
	alert(result);
});

window.add(scrollViewer);
scrollViewer.add(buttonrestoreSavedSession);
scrollViewer.add(buttonIsPushEnabled);
scrollViewer.add(buttonSetPushEnabled);
scrollViewer.add(buttonGetUserName);
scrollViewer.add(buttonIsAnonymus);
scrollViewer.add(buttonCreateAccountWithAnonymusUser);
scrollViewer.add(buttonCreateAccountWithUserName);
scrollViewer.add(buttonAuthenticateUser);
scrollViewer.add(buttonregisterDeviceToken);
scrollViewer.add(buttonRunGetrequest);
scrollViewer.add(buttonrunPostRequestWithJSONObject);
scrollViewer.add(runPostRequestWithJSONArray);
scrollViewer.add(runAPI);
scrollViewer.add(buttonformatTimeStamp);
scrollViewer.add(buttoncreateLQSession);
// window.add(button);

// var location = geoloqi.createLQLocation({
// location:
// {"provider":{"name":"gps"}}//,"coords":{"longitude":77,"latitude":28,"speed":0,"accuracy":0,"altitude":0}}
// });
//
// alert("getSystemBatteryLevel: "+location.getSystemBatteryLevel());
//
// location.setBattery("90");
//
// alert("getBattery: "+location.getBattery());
//
// alert("toJson: "+location.toJson());

window.open();

function createLqSession() {
	sessionProxy = geoloqi.createLQSession({
		apiKey : "b272bc7b3add8b4cb32a0c9b222ab6c4",
		apiSecret : "db9181529c7922e6d23764c4614966b4"
	});
}