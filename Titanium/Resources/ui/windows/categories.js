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
  geoloqi = categoriesWindow.geoloqi;
  
  // Configure xhr object to talk to DinoDeals server
  var xhr = Titanium.Network.createHTTPClient();

  xhr.onload = function() {
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
    var activity = categoriesWindow.activity;
    activity.onCreateOptionsMenu = function(e){
      var menu = e.menu;
      var menuItem = menu.add({ title: "Refresh" });
      menuItem.addEventListener("click", function(e) {
        refreshCategories();
      });
    };
  }

  // Update the list of categories from the server
  function refreshCategories(){
    Ti.API.info("Refreshing Categories");
    xhr.open("GET", Config.baseURL+"/api/categories");
    xhr.setRequestHeader("Authorization", "Bearer " + geoloqi.session.getAccessToken());
    xhr.send();
  }

  // Build new tableViewRows from the server response
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
        
        if (Ti.Platform.osname === "android") {
        	// Override the label color on Android
        	label.setColor("#222222");
        }
        
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

  // Create a table view for the categories
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

  // Subscribe the user to a layer
  function subscribe(layerid){
    Ti.API.info("Subscribing to "+ layerid);
    geoloqi.session.postRequest("layer/subscribe/"+layerid, {}, {
      onSuccess: function(data){
        Ti.API.info(data);
      },
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