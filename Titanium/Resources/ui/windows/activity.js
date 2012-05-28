var activityWindow = Ti.UI.currentWindow,
		Config = activityWindow.Config,
		geoloqi = activityWindow.geoloqi;

// Create a webview for the deals tab
var token = (geoloqi.session) ? geoloqi.session.getAccessToken() : null; 
var url = "../webviews/activity.html#/"+geoloqi.session.getAccessToken();
var webview = Titanium.UI.createWebView({
	url: url,
	backgroundColor:'transparent'
});
activityWindow.add(webview);

// Listen for the app event `openURl` and open a new browser window
Ti.App.addEventListener('openURL', function(e){
  dealView = Ti.UI.createWindow({
  	url: "browser.js",
  	tabBarHidden: true,
  	openURL: e.url,
  	modal:true,
  	barColor: "#15a6e5"
  });
  dealView.open();
});

// Platform specific refresh button
if(Ti.Platform.osname === "iphone"){
	var refresh = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	});

	refresh.addEventListener("click", function(e){
		webview.evalJS("window.location.reload();");
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
			webview.evalJS("window.location.reload();");
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