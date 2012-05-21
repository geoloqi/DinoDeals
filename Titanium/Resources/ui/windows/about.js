// Create a local webview for the about tab
webview = Titanium.UI.createWebView({
	url: "../webviews/about.html",
	backgroundColor:'transparent'
});
Titanium.UI.currentWindow.add(webview);