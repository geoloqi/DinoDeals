var Config = require("config");

exports = (function(Config){
  // Setup some variables
  var exports = {},
  header = Ti.UI.createTableViewSection({headerTitle:"Available Deals"}),
  rows = [],
  tableView = null,
  categoriesWindow = Ti.UI.currentWindow,
  refreshButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.REFRESH }),
  activityIndicator = Ti.UI.createActivityIndicator({ message: 'Loading...', style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK }),
  xhr = Titanium.Network.createHTTPClient(),
  Geoloqi = categoriesWindow.Geoloqi;
  
  // Set refresh button in menu bar
  if(Ti.Platform.osname === "iphone"){
    categoriesWindow.setRightNavButton(refreshButton);
  
    // Listen for click on refresh
    refreshButton.addEventListener("click", function(e){
      refreshCategories();
    });
  }	else {
		var activity = categoriesWindow.activity;
		activity.onCreateOptionsMenu = function(e){
  		var menu = e.menu;
  		var menuItem = menu.add({ title: "Refresh" });
  		menuItem.addEventListener("click", function(e) {
  			
    		refreshCategories();
  		});
		};
	}

  // Configure xhr object
  xhr.onload = function() {
    updateRows(JSON.parse(this.responseText).categories);
    activityIndicator.hide();
  };

  xhr.error = function(error){
    Ti.API.error(error);
  };

  function refreshCategories(){
    Ti.API.info("Refreshing Categories");
    xhr.open("GET", Config.baseURL+"/api/categories");
    xhr.setRequestHeader("Authorization", "Bearer " + Geoloqi.session.getAccessToken());
    xhr.send();
  }

  function updateRows(categories){
    rows = [header];
    if(categories){
      for(var i=0; i < categories.length; i++) {
        category = categories[i];
        
        var row = Ti.UI.createTableViewRow({
          height:"50dp",
          layerid: category.id
        });
        
        var label = Ti.UI.createLabel({
          left: "10dp",
          text: category.name
        });
        
        var toggle = Ti.UI.createSwitch({
          right: "10dp",
          value: category.subscribed,
          row: row
        });

        toggle.addEventListener("change", function(e){
          layerid = e.source.row.layerid;
          subscribed = e.value;
          
          if(subscribed){
            subscribe(layerid);
          } else {
            unsubscribe(layerid);
          }
        });

        row.add(label);
        row.add(toggle);
        rows.push(row);
      }
    }
    tableView.setData(rows);
  }

  function createTableView(){
    Ti.API.info("Creating Table View");
    tableView = Ti.UI.createTableView({
      data:rows,
      style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
      backgroundColor:'transparent',
      rowBackgroundColor:'white'
    });
    categoriesWindow.add(tableView);
  }

  function subscribe(layerid){
    Ti.API.info("Subscribing to "+ layerid);
    Geoloqi.session.postRequest("layer/subscribe/"+layerid, {}, {
      onSuccess: function(data){
        Ti.API.info(data);
      },
      onFailure: function(error){
        Ti.API.error(error);
      }
    });
  }

  function unsubscribe(layerid){
    Ti.API.info("Unsubscribing from "+ layerid);
    Geoloqi.session.postRequest("layer/unsubscribe/"+layerid, {}, {
      onSuccess: function(data){
        Ti.API.info(data);
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