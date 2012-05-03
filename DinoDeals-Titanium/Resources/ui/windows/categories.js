data = [{ 
  title:"Activities & Events",
  layers: [
    { title: "Bowling", subscribed: true },
    { title: "City Tours", subscribed: true },
    { title: "Comedy Clubs", subscribed: true },
    { title: "Concerts", subscribed: true },
    { title: "Dance Classes", subscribed: true },
    { title: "Golf", subscribed: true },
    { title: "Life Skills Classes", subscribed: true },
    { title: "Museums", subscribed: true },
    { title: "Outdoor Adventures", subscribed: true },
    { title: "Skiing", subscribed: true },
    { title: "Skydiving", subscribed: true },
    { title: "Sporting Events", subscribed: true },
    { title: "Theater", subscribed: true },
    { title: "Wine Tasting", subscribed: true}
    ]},{
  title:"Dining & Nightlife",
  layers: [
    { title: "Bars & Clubs", subscribed: true },
    { title: "Restaurants", subscribed:true}
    ]},{
  title:"Fitness",
  layers: [
    { title: "Boot Camp", subscribed: true },
    { title: "Fitness Classes", subscribed: true },
    { title: "Gym", subscribed: true },
    { title: "Martial Arts", subscribed: true },
    { title: "Personal Training", subscribed: true },
    { title: "Pilates", subscribed: true },
    { title: "Yoga", subscribed: true}
    ]},{
  title:"Health & Beauty",
  layers: [
    { title: "Chiropractic", subscribed: true },
    { title: "Dental", subscribed: true },
    { title: "Dermatology", subscribed: true },
    { title: "Eye & Vision", subscribed: true },
    { title: "Facial", subscribed: true },
    { title: "Hair Removal", subscribed: true },
    { title: "Hair Salon", subscribed: true },
    { title: "Makeup", subscribed: true },
    { title: "Manicure & Pedicure", subscribed: true },
    { title: "Massage", subscribed: true },
    { title: "Spa", subscribed: true },
    { title: "Tanning", subscribed: true },
    { title: "Teeth Whitening", subscribed: true }
    ]},{
  title:"Retail & Services",
  layers: [
    { title: "Automotive Services", subscribed:true },
    { title: "Food & Grocery", subscribed:true },
    { title: "Home Services", subscribed:true },
    { title: "Men's Clothing", subscribed:true },
    { title: "Photography Services", subscribed:true },
    { title: "Treats", subscribed:true },
    { title: "Women's Clothing", subscribed:true }
    ]},{
  title:"Special Interest",
  layers: [
    { title: "Baby", subscribed:true },
    { title: "Bridal", subscribed:true },
    { title: "College", subscribed:true },
    { title: "Gay", subscribed:true },
    { title: "Jewish", subscribed:true },
    { title: "Kids", subscribed:true },
    { title: "Kosher", subscribed:true },
    { title: "Pets", subscribed:true },
    { title: "Travel", subscribed:true }
    ]}
];

sections = [];

// use a loop to add some rows
for(var s=0; s < data.length; s++) {
  sections.push(Ti.UI.createTableViewSection({
    headerTitle:data[s].title
  }));
  for (var l=0; l < data[s].layers.length; l++) {
    var row = Ti.UI.createTableViewRow({
      height:45
    });
    section = sections[s];
    layer = data[s].layers[l];

    var label = Ti.UI.createLabel({
      left: 10,
      text: layer.title
    });
    
    var button = Ti.UI.createSwitch({
      right: 10,
      value: layer.subscribed
    });

    button.addEventListener("change", function(e){
      action = (e.value) ? "Subscribe to " : "Unsubscribe from ";
      alert(action + " to " + e.source.row.children[0].getText());
    });
    
    button.row = row;
    
    row.add(label);
    row.add(button);

    section.add(row);
  }
}

var tv = Ti.UI.createTableView({
  data:sections
});

Titanium.UI.currentWindow.add(tv);