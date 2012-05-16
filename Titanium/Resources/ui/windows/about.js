var aboutWindow = Ti.UI.currentWindow;
var Geoloqi = aboutWindow.Geoloqi;

//var webview = Titanium.UI.createWebView({
//  url:'http://www.geoloqi.com'
//});

token = Ti.UI.createLabel({
  text: "Token:"+Geoloqi.session.getAccessToken(),
  top:20
});

userid = Ti.UI.createLabel({
  text: "Anonymous:"+Geoloqi.session.getUserId(),
  top:80
});

profile = Ti.UI.createLabel({
  text: "Username:"+Geoloqi.tracker.getProfile(),
  top:120
});

username = Ti.UI.createLabel({
  text: "Username:"+Geoloqi.session.getUsername(),
  top:160
});

anon = Ti.UI.createLabel({
  text: "Anonymous:"+Geoloqi.session.isAnonymous(),
  top:200
});

//Titanium.UI.currentWindow.add(webview);
aboutWindow.add(token);
aboutWindow.add(userid);
aboutWindow.add(profile);
aboutWindow.add(username);
aboutWindow.add(anon);
