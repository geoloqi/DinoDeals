Ti.include("../../config.js");

exports = (function(Config){
  // Setup some variables
  var exports = {},
  //header = Ti.UI.createTableViewSection({headerTitle:"Available Deals"}),
  rows = [],
  tableView = null,
  addTableView = true,
  categoriesWindow = Ti.UI.currentWindow,
  refreshButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.REFRESH }),
  activityIndicator = Ti.UI.createActivityIndicator({ 
  	style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
  	message: (Ti.Platform.osname === "android") ? "Loading Categories" : null
  }),
  geoloqi = categoriesWindow.geoloqi;
  
  // Configure xhr object to talk to DinoDeals server
  var xhr = Titanium.Network.createHTTPClient();

  xhr.onload = function() {
  	createTableView();
    updateRows(JSON.parse(this.responseText).categories);
    activityIndicator.hide();
  };

  xhr.error = function(error){
    Ti.API.error(error);
  };

  // Platform specific refresh button
  if(Ti.Platform.osname === "iphone"){
    categoriesWindow.setRightNavButton(refreshButton);
  
    // Listen for click on refresh
    refreshButton.addEventListener("click", function(e){
      refreshCategories();
    });
  } else {
		var OPT_ENABLE = 1, OPT_DISABLE = 2;
		var categories = categoriesWindow.activity;
	
		categories.onCreateOptionsMenu = function(e){
			var menu, menuItem;
	
			menu = e.menu;
	
			// Refresh		
			menuItem = menu.add({ title: "Refresh" });
			menuItem.addEventListener("click", function(e) {
				refreshCategories();
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
		
		categories.onPrepareOptionsMenu = function(e) {
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

  // Update the list of categories from the server
  function refreshCategories(){
    Ti.API.info("Refreshing Categories");
    xhr.open("GET", Config.baseURL+"/api/categories");
    xhr.setRequestHeader("Authorization", "Bearer " + geoloqi.session.getAccessToken());
    xhr.send();
  }

	// callback for the `change` event on switches
	toggleCallback = function(e){
  	layerid = e.source.row.layerid;
    subscribed = e.value;
          
  	if(subscribed){
    	subscribe(layerid);
    } else {
    	unsubscribe(layerid);
    }
  }
  
  // callback for when rows are tapped
  rowCallback = function(e){
  	state = (e.row.children[1].value) ? false : true;
    e.row.children[1].setValue(state);
  }

  // Build new tableViewRows from the server response
  function updateRows(categories){
    //rows = [header];
    if(categories){
      for(var i=0; i < categories.length; i++) {
        category = categories[i];
        
        var row = Ti.UI.createTableViewRow({
          height:'auto',
          layerid: category.id
        });
        
        var label = Ti.UI.createLabel({
          left: "10dp",
          top:10,
          bottom:10,
          height:'auto',
          text: category.name,
          touchEnabled: false
        });
        
        if (Ti.Platform.osname === "android") {
        	// Override the label color on Android
        	label.setColor("#222222");
        }
        
        var toggle = Ti.UI.createSwitch({
          right: "10dp",
          value: category.subscribed,
          row: row
        });

        toggle.addEventListener("change", toggleCallback);

        row.add(label);
        row.add(toggle);
        rows.push(row);
      }
    }
    
    tableView.setData(rows);
    
    if(addTableView){
    	categoriesWindow.add(tableView);
    	addTableView = false;
    }
  }

  // Create a table view for the categories
  function createTableView(){
    Ti.API.info("Creating Table View");
    tableView = Ti.UI.createTableView({
      data:rows
    });
    
    if(Ti.Platform.osname === "iphone"){
    	tableView.addEventListener("click", rowCallback);
    }
  }

  // Subscribe the user to a layer
  function subscribe(layerid){
    Ti.API.info("Subscribing to "+ layerid);
    geoloqi.session.postRequest("layer/subscribe/"+layerid, {}, {
      onSuccess: function(data){
				Ti.API.info(data);
        Ti.API.info(data.headers);
        Ti.API.info(data.response);      },
      onFailure: function(error){
        Ti.API.error(error);
      }
    });
  }
  
  // Unsubscribe the user to a layer
  function unsubscribe(layerid){
    Ti.API.info("Unsubscribing from "+ layerid);
    geoloqi.session.postRequest("layer/unsubscribe/"+layerid, {}, {
      onSuccess: function(data){
        Ti.API.info(data);
        Ti.API.info(data.headers);
        Ti.API.info(data.response);
      },
      onFailure: function(error){
        Ti.API.error(error);
      }
    });
  }

  categoriesWindow.add(activityIndicator);
  activityIndicator.show();
  createTableView();
  refreshCategories();
  
  return exports;
})(Config);