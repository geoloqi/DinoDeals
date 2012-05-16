var Config = require("config");

exports = (function(Config){
  // Setup some variables
  var exports = {},
  header = Ti.UI.createTableViewSection({headerTitle:"Available Deals"}),
  rows = [],
  tableView = null,
  categoriesWindow = Ti.UI.currentWindow,
  loadingButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.ACTIVITY }),
  refreshButton = Ti.UI.createButton({ systemButton: Ti.UI.iPhone.SystemButton.REFRESH }),
  activityIndicator = Ti.UI.createActivityIndicator({ message: 'Loading...', style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK }),
  xhr = Titanium.Network.createHTTPClient(),
  Geoloqi = categoriesWindow.Geoloqi; //Pass Geoloqi as a shared reference, ugh...
  
  // Set refresh button in menu bar
  categoriesWindow.setRightNavButton(refreshButton);

  // Listen for click on refresh
  refreshButton.addEventListener("click", function(e){
    refreshCategories();
  });

  // Configure xhr object
  xhr.onload = function() {
    Ti.API.info("Callback");
    Ti.API.info(JSON.parse(this.responseText));
    updateRows(JSON.parse(this.responseText).categories);
    spinnerOff();
    activityIndicator.hide();
  };

  xhr.error = function(error){
    Ti.API.error(error);
  }

  function refreshCategories(){
    Ti.API.info("Refreshing Categories");
    spinnerOn();
    xhr.open("GET", Config.baseURL+"/api/categories");
    xhr.setRequestHeader("Authorization", "Bearer " + Geoloqi.session.getAccessToken());
    xhr.send();
  };

  function updateRows(categories){
    Ti.API.info("Updating Rows");
    Ti.API.info(categories);
    rows = [header];
    if(categories){
      for(var i=0; i < categories.length; i++) {
        category = categories[i];
        Ti.API.info(category);
        Ti.API.info("Creating Row for Layer " + category.id);
        
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

          Ti.API.info("Layer" + layerid +" State " + subscribed);
          
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
    spinnerOn();
    Geoloqi.session.postRequest("layer/subscribe/"+layerid, {}, {
      onSuccess: function(data){
        spinnerOff();
        Ti.API.info(data);
      },
      onFailure: function(error){
        Ti.API.error(error);
      }
    });
  }

  function unsubscribe(layerid){
    Ti.API.info("Unsubscribing from "+ layerid);
    spinnerOn();
    Geoloqi.session.postRequest("layer/subscribe/"+layerid, {}, {
      onSuccess: function(data){
        spinnerOff();
        Ti.API.info(data);
      },
      onFailure: function(error){
        Ti.API.error(error);
      }
    });
  }

  function spinnerOn(){
    categoriesWindow.setLeftNavButton(loadingButton);
  }

  function spinnerOff(){
    categoriesWindow.setLeftNavButton(null);
  }

  categoriesWindow.add(activityIndicator);
  activityIndicator.show();
  createTableView();
  refreshCategories();
  
  return exports;
})(Config);