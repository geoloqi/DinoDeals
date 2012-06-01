var activityWindow = Ti.UI.currentWindow,
		Config = activityWindow.Config,
		geoloqi = activityWindow.geoloqi;

var tableView,
		noMessagesView;
		rows = [],
		activityIndicator = Ti.UI.createActivityIndicator({ 
	  	style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
	  	message: (Ti.Platform.osname === "android") ? "Loading Categories" : null
	  });

function loadDeals() {
	Ti.API.info("loading new deals");
	geoloqi.session.getRequest("timeline/messages", {
		limit: "30"
	} , {
		onSuccess: function(data){
			Ti.API.info("timelime/messages Success");
			Ti.API.info(data);
			cacheDeals(data.response);
			updateView(data.response);
		},
		onComplete: function(data){
			Ti.API.info("timelime/messages Complete");
			Ti.API.info(data);
		},
		onFailure: function(error){
			Ti.API.info("timelime/messages Error");
			Ti.API.info(error);
		}
	});
}

function openDeal(e){
	Ti.API.info(e);
}

function updateView(data){
	hideLoadIndicator();
	messages = (typeof data.items === "string") ? JSON.parse(data.items) : data.items;
	rows = [];
	Ti.API.info(messages.length);
	Ti.API.info(messages);
	if(messages.length) {
		hideNoMessages();
	  for(var i=0; i < messages.length; i++) {
			message = messages[i];
			if(message){
				
				var row = Ti.UI.createTableViewRow({
					hasDetail: true,
					height: 'auto',
					layout: 'vertical',
					dealUrl: message.object.sourceURL
				});
		
		    var label = Ti.UI.createLabel({
		      top: 10,
		      left: 10,
		      text: message.object.summary,
		      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		      color: "#444"
		    });
		    
		    var time = Ti.UI.createLabel({
		      bottom: 10,
		      left:10,
		      font: {fontSize: 12},
		      text: message.displayDate,
		      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		      color: "#666"
		    });
		        
		    if (Ti.Platform.osname === "android") {
					// Override the label color on Android
					label.setColor("#222222");
		    }
		    
				row.add(label);
				row.add(time);
		    rows.push(row);
		  }
	  }
	  
		if(!tableView && rows.length){
			Ti.API.info("create table view");
			createTableView({data:rows});
		} else if(rows.length){
			Ti.API.info("update view");
			tableView.setData(rows);
		} else {
			Ti.API.info("what the hell");
		}
	} else {
		showNoMessages();
	}
}

function createTableView(rows){
	tableView = Ti.UI.createTableView(rows);
	
	tableView.addEventListener("click", function(e){
		Ti.App.fireEvent("openURL", {url: e.rowData.dealUrl })
	});
	
	activityWindow.add(tableView);
}

function showLoadIndicator(){
	if(Ti.Platform.osname === "iphone"){
  	activityIndicator.show();
	}
}

function hideLoadIndicator(){
	if(Ti.Platform.osname === "iphone"){
		activityIndicator.hide();
	}
}

function cacheDeals(data){
	Ti.App.Properties.setString("messageHistory", JSON.stringify(data));
}

function hideNoMessages(){
	if(noMessagesView){
		activityWindow.remove(noMessagesView);
	}
}

function showNoMessages(){
	if(!noMessagesView){
		noMessagesView = Ti.UI.createView({
			top:20,
			left:40,
			right:40,
			layout: "vertical"
		});
		noMessagesView.add(Ti.UI.createLabel({
			text:"You haven't picked up any deals yet. When you get near a deal we'll send you a notification.",
			font: {fontSize:24},
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:"#444"
		}));
		noMessagesView.add(Ti.UI.createLabel({
			text:"Try subscribing to more categories.",
			font: {fontSize:32, fontWeight: "bold"},
			color: "#137fae",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
		}));
		hideLoadIndicator();
		activityWindow.add(noMessagesView);
	}
}

function init(){
	Ti.App.Properties.removeProperty("messageHistory");
	if(Ti.App.Properties.hasProperty("messageHistory")){
		Ti.API.info("found cached messages");
		updateView(JSON.parse(Ti.App.Properties.getString("messageHistory")));
		loadDeals();
	} else if (geoloqi.session.getAccessToken()){
		Ti.API.info("no cached messages, getting new messages");
		showLoadIndicator();
		loadDeals();
	} else {
		Ti.API.info("no session found");
		showNoMessages();
	}
}

activityWindow.add(activityIndicator);

Ti.API.info("Listen");

if(geoloqi.session.getAccessToken()){
	init();
} else {
	Ti.App.addEventListener("geoloqi:ready", function(e){
		init();
	});
}

Ti.App.addEventListener("refreshDeals", function(e){
	loadDeals();
});

// Platform specific refresh button
if(Ti.Platform.osname === "iphone"){
	var refresh = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});

	refresh.addEventListener("click", function(e){
		loadDeals();
	});
	
	activityWindow.setRightNavButton(refresh);
} else {
	var OPT_ENABLE = 1, OPT_DISABLE = 2;
	var activity = activityWindow.activity;

	activity.onCreateOptionsMenu = function(e){
		var menu, menuItem;

		menu = e.menu;

		// Refresh
		menuItem = menu.add({ title: "Refresh" });
		menuItem.addEventListener("click", function(e) {
			loadDeals();
		});
		
		// Disable location
		menuItem = menu.add({ title: "Disable Location", itemId: OPT_DISABLE });
		menuItem.addEventListener("click", function(e) {
			geoloqi.tracker.setProfile("OFF");
		});
				
		// Enable location
		menuItem = menu.add({ title: "Enable Location", itemId: OPT_ENABLE });
		menuItem.addEventListener("click", function(e) {
			geoloqi.tracker.setProfile("PASSIVE");
		});
	};
	
	activity.onPrepareOptionsMenu = function(e) {
		var menu = e.menu;
		
		// Toggle the correct menu item visibility
		if (geoloqi.tracker.getProfile() === "OFF") {
			menu.findItem(OPT_DISABLE).setVisible(false);
			menu.findItem(OPT_ENABLE).setVisible(true);
		} else {
			menu.findItem(OPT_DISABLE).setVisible(true);
			menu.findItem(OPT_ENABLE).setVisible(false);	
		}
	};
}