// import the Geolqoi Module
var Geoloqi = require('ti.geoloqi');

// import some configuration variables (API keys, ect...)
var geoloqiModuleConfig = require("geoloqi-module-config")

// namespace everything to DinoDeals
var DinoDeals = {
  Windows: {},
  Tabs: {},
  startLocationService: function(userName, password) {
    var extras = {
      EXTRA_SDK_ID : geoloqiModuleConfig.client_id,
      EXTRA_SDK_SECRET : geoloqiModuleConfig.client_secret
    }

    if(Ti.Platform.osname === "android"){
      Geoloqi.startLQService(".ACTION_DEFAULT", extras);
    }
  },
  createLqSession: function() {
    DinoDeals.Session = Geoloqi.createLQSession({
      apiKey : geoloqiModuleConfig.client_id,
      apiSecret : geoloqiModuleConfig.client_secret
    });

  },
  setupAccount: function(){
    if(!DinoDeals.Session.getAccessToken()){
      DinoDeals.Session.createAnonymousUserAccount({}, {
        onComplete: function(e){
        },
        onSuccess: function(e){
          Ti.App.Properties.setString("access_token", DinoDeals.Session.getAccessToken());
          Ti.API.info(DinoDeals.Session.getAccessToken());
          Ti.App.fireEvent("DinoDeals:sessionAvailable");
        },
        onFailure: function(e){          
        }
      })
    } else {
      Ti.API.info(DinoDeals.Session.getAccessToken());
      
    }
    //access_token = Ti.App.Properties.getString("access_token");
    //Ti.API.info("STORED TOKEN: "+access_token);
    /*
    if(geoloqi.savedSession){
      geolqoi.restoreSavedSession();
    } else {
      geoloqi.createAnonymousUserAccount();
      geolqoi.saveSession();
    }
    
    if(access_token){
      DinoDeals.Session.sessionWithAccessToken(access_token);
      Ti.App.fireEvent("DinoDeals:sessionAvailable");
      Ti.API.info(DinoDeals.Session.getAccessToken());
    } else {
      DinoDeals.Session.createAnonymousUserAccount({}, {
        onComplete: function(e){
        },
        onSuccess: function(e){
          Ti.App.Properties.setString("access_token", DinoDeals.Session.getAccessToken());
          Ti.API.info(DinoDeals.Session.getAccessToken());
          Ti.App.fireEvent("DinoDeals:sessionAvailable");
        },
        onFailure: function(e){          
        }
      });
    }
    */
  }
};

(function() {  

  DinoDeals.createLqSession();
  DinoDeals.setupAccount();
  
  Ti.Network.registerForPushNotifications({
    callback: function(data){
      Geoloqi.LQSessionProxy.handlePush(data);
  },
  sucess:function(token){
    Geoloqi.SessionProxy.registerDeviceToken()
  }
  
});


  
  //create windows
  DinoDeals.Windows.activity = Ti.UI.createWindow({
    url: "ui/windows/activity.js",
    title: "Activity"
  });
  
  DinoDeals.Windows.map = Ti.UI.createWindow({
    url: "ui/windows/map.js",
    title: "Nearby Deals"
  });
  
  DinoDeals.Windows.categories = Ti.UI.createWindow({
    url: "ui/windows/categories.js",
    title: "Categories"
  });

  // create tab group
  DinoDeals.tabGroup = Ti.UI.createTabGroup();

  // create tabs
  DinoDeals.Tabs.activity = Ti.UI.createTab({
    title: 'Activity',
    icon: '/images/KS_nav_ui.png',
    window: DinoDeals.Windows.activity
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.activity);

  DinoDeals.Tabs.map = Ti.UI.createTab({
    title: 'Map',
    icon: '/images/KS_nav_views.png',
    window: DinoDeals.Windows.map
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.map);

  DinoDeals.Tabs.categories = Ti.UI.createTab({
    title: 'Categories',
    icon: '/images/KS_nav_views.png',
    window: DinoDeals.Windows.categories
  });
  DinoDeals.tabGroup.addTab(DinoDeals.Tabs.categories);

  DinoDeals.tabGroup.open();

})();