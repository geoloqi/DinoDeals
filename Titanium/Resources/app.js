// import the Geolqoi Module
var Geoloqi = require('ti.geoloqi');
var Config = require("config");

Ti.UI.setBackgroundImage("/images/BkgWhite.png");

Geoloqi.init({
  clientId: Config.clientId,
  clientSecret: Config.clientSecret,
  trackingProfile: "PASSIVE",
},{
  onSuccess: function(){
    Ti.API.info("Tracking Profile: " + Geoloqi.tracker.getProfile());
    Ti.API.info("Access Token: " + Geoloqi.session.getAccessToken());
    Ti.API.info("User ID: " + Geoloqi.session.getUserId());
    Ti.API.info("Username: " + Geoloqi.session.getUsername());
    Ti.API.info("Anonymous?: " + Geoloqi.session.isAnonymous());
    
    Ti.Network.registerForPushNotifications({
    	types:[
        Titanium.Network.NOTIFICATION_TYPE_ALERT
      ],
      callback: function(data){
        Geoloqi.iOS.handlePush(data);
      },
      success:function(data){
        Geoloqi.iOS.registerDeviceToken(data.deviceToken);
      },
      error: function(data){
        Ti.API.error("Could Not Register For Push" + data.error + data.type);
      }
    });
    
  },
  onFailure: function(){
    Ti.API.error("Geoloqi Config Failed");
  }
});

// create a simple namespace under DinoDeals
var DinoDeals = {
  Windows: {},
  Tabs: {}
};

(function() {
  
  // create a window to hold a webview for recent activity
  DinoDeals.Windows.activity = Ti.UI.createWindow({
    url: "ui/windows/activity.js",
    title: "Activity",
    barColor: "#15a6e5",
    backgroundColor:"transparent",
    backgroundImage:"/images/BkgWhite.png",
    Config: Config,
    Geoloqi:Geoloqi
  });

  // create a window to hold a map of nearby deals
  DinoDeals.Windows.map = Ti.UI.createWindow({
    url: "ui/windows/map.js",
    title: "Nearby Deals",
    barColor: "#15a6e5",
    backgroundColor:"transparent",
    backgroundImage:"/images/BkgWhite.png"
  });
  
  // create a window to hold list of categories
  DinoDeals.Windows.categories = Ti.UI.createWindow({
    url: "ui/windows/categories.js",
    title: "Categories",
    barColor: "#15a6e5",
    backgroundColor:"transparent",
    backgroundImage:"/images/BkgWhite.png",
    Geoloqi: Geoloqi
  });

  // create a window to hold about section
  DinoDeals.Windows.about = Ti.UI.createWindow({
    url: "ui/windows/about.js",
    title: "About",
    barColor: "#15a6e5",
    backgroundColor:"transparent",
    backgroundImage:"/images/BkgWhite.png",
    Geoloqi: Geoloqi
  });

  // create tab group
  DinoDeals.tabGroup = Ti.UI.createTabGroup();

  // activity view tab
  DinoDeals.Tabs.activity = Ti.UI.createTab({
    title: 'Activity',
    icon: (Ti.Platform.osname === "android") ? Ti.App.Android.R.drawable.tabs_categories_drawable : '/images/tabs_categories.png',
    window: DinoDeals.Windows.activity
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.activity);
	
  // category view tab
  DinoDeals.Tabs.categories = Ti.UI.createTab({
    title: 'Categories',
    icon: (Ti.Platform.osname === "android") ? Ti.App.Android.R.drawable.tabs_activity_drawable : '/images/tabs_activity.png',
    window: DinoDeals.Windows.categories,
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.categories);
	
   // about view tab
  DinoDeals.Tabs.about = Ti.UI.createTab({
    title: 'About',
    icon: (Ti.Platform.osname === "android") ? Ti.App.Android.R.drawable.tabs_about_drawable : '/images/tabs_about.png',
    window: DinoDeals.Windows.about,
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.about);
	
	Ti.App.addEventListener('openURL', function(e){
    Ti.Platform.openURL(e.url);
	});
	
	Ti.App.addEventListener('openCategories', function(e){
    DinoDeals.tabGroup.setActiveTab(1);
	});
	
  // open the activity tab
  DinoDeals.tabGroup.open();

})();