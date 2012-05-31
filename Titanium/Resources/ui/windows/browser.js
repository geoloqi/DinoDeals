browserWindow = Titanium.UI.currentWindow;

webView = Ti.UI.createWebView({
	url: browserWindow.openURL
});

browserWindow.add(webView);

Ti.App.addEventListener('updateURL', function(e){
	webView.setUrl(e.url);
});

if(Ti.Platform.osname === "iphone"){
	activityIndicator = Ti.UI.createActivityIndicator({ style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK }),

	refresh = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
	});
	
	refresh.addEventListener("click", function(){
		webView.reload();
	});
	
	flexSpace = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	fixSpace = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.FIXED_SPACE,
		width:20
	});
	
	safari = Ti.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.ACTION
	});
	
	safari.addEventListener("click", function(){
		Ti.Platform.openURL(webView.getUrl());
	});
	
	close = Ti.UI.createButton({
 		title: "Close",
		systemButton: Titanium.UI.iPhone.SystemButton.CLOSE
	});
	
	close.addEventListener("click", function(){
		browserWindow.close();
		Ti.App.fireEvent("dealClosed");
	});
	
	back_button = Ti.UI.createButton({
  	image: '/images/btn_back.png',
  	enabled:false
  });
  
  back_button.addEventListener('click', function(){
  	webView.goBack();
  });
	
	forward_button = Ti.UI.createButton({
  	image: '/images/btn_fwd.png',
  	enabled:false
  });
  
  forward_button.addEventListener('click', function(){
  	webView.goForward();
  });
	
	toolbar = Titanium.UI.iOS.createToolbar({
    items: [refresh, flexSpace, back_button, flexSpace, forward_button, flexSpace, safari],
    bottom: 0,
    borderTop: true,
    borderBottom: false,
    barColor: "#15a6e5"
	});
	
	browserWindow.setRightNavButton(close);
	browserWindow.add(toolbar);
	
	// show activity when loading
	webView.addEventListener('beforeload',function(e){
		activityIndicator.show();
	}); 
	
	webView.addEventListener('load',function(e){
		activityIndicator.hide();
	  if(webView.canGoForward()){
	  	forward_button.enabled = true;
	  } else {            
	  	forward_button.enabled = false;
	  }
	  if(webView.canGoBack()){
	  	back_button.enabled = true;
	  } else {            
			back_button.enabled = false;
	  }
	  current_url = e.url;
	});
	
} else if(Ti.Platform.osname === "android"){
	// @TODO impliment android menu for navigating the webview
}
