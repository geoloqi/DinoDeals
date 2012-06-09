// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

// open a single window
var window = Ti.UI.createWindow({
                                backgroundColor:'white'
                                });

var scrollViewer = Ti.UI.createScrollView({
                                          contentWidth: 'auto',
                                          contentHeight: 1500,
                                          backgroundColor: '#c5c5c5',
                                          // showVerticalScrollIndicator:true,
                                          // showHorizontalScrollIndicator:true,
                                          });

window.add(scrollViewer);

window.open();

var geoloqi = require('ti.geoloqi');

geoloqi.isLowBatteryTrackingEnabled();

var objSession;

geoloqi.init({
             clientId: "b272bc7b3add8b4cb32a0c9b222ab6c4",
             clientSecret: "db9181529c7922e6d23764c4614966b4",
             trackingProfile: "OFF",
             lowBatteryTracking: true,
             allowAnonymousUsers:false
             },
             {
             onSuccess:function(e)
             {
             objSession	=	geoloqi.session;
             if (objSession==null)
             {
             alert("No Session Found");
             }
             else
             {
             alert("Session Found");
             }	
             
             },
             onFailure:function(e)
             {
             alert(e.error_description);
             }
             }
             );


//EVENT LISTNERS
geoloqi.addEventListener('onValidate',function(e){
                         //alert("Request completed");
                         alert("[Validation Error] " + e.error_description);
                         });  

var btnAutheticateUser=Ti.UI.createButton({
                                          title:'Authenticate user',
                                          top:5,
                                          height:30,
                                          width:200
                                          });

btnAutheticateUser.addEventListener('click',function(){
                                    geoloqi.authenticateUser('t.sharma@globallogic.com',
                                                             '12344321',
                                                             {
                                                             onSuccess:function(e)
                                                             {
                                                             objSession	=	geoloqi.session;
                                                             if (objSession==null)
                                                             {
                                                             alert("No Session Found");
                                                             }
                                                             else
                                                             {
                                                             alert("Session Found");
                                                             }
                                                             },
                                                             onFailure:function(e)
                                                             {
                                                             alert(e);
                                                             }
                                                             }
                                                             );
                                    });


scrollViewer.add(btnAutheticateUser);


var btnAnonUser=Ti.UI.createButton({
                                   title:'Create Anon User',
                                   top:40,
                                   height:30,
                                   width:200
                                   });

btnAnonUser.addEventListener('click',function(){
                             geoloqi.createAnonymousUser({},{
                                                         onSuccess:function(e)
                                                         {
                                                         objSession	=	geoloqi.session;
                                                         if (objSession==null)
                                                         {
                                                         alert("No Session Found");
                                                         }
                                                         else
                                                         {
                                                         alert("Session Found");
                                                         }
                                                         },
                                                         onFailure:function(e)
                                                         {
                                                         alert(e);
                                                         }
                                                         });
                             });


scrollViewer.add(btnAnonUser);

var btnCreateUser=Ti.UI.createButton({
                                     title:'Create User',
                                     top:75,
                                     height:30,
                                     width:200
                                     });

btnCreateUser.addEventListener('click',function(){
                               geoloqi.createUser({username:"test06",password:"1234"},{
                                                  onSuccess:function(e)
                                                  {
                                                  objSession	=	geoloqi.session;
                                                  if (objSession==null)
                                                  {
                                                  alert("No Session Found");
                                                  }
                                                  else
                                                  {
                                                  alert("Session Found");
                                                  }
                                                  },
                                                  onFailure:function(e)
                                                  {
                                                  alert(e);
                                                  }
                                                  });
                               });


scrollViewer.add(btnCreateUser);


var btnGetUserId=Ti.UI.createButton({
                                    title:'Get UserID',
                                    top:110,
                                    height:30,
                                    width:200
                                    });

btnGetUserId.addEventListener('click',function(){
                              var userID    =   geoloqi.session.getUserId();
                              alert("user id "+ userID);
                              });

scrollViewer.add(btnGetUserId);

var btnAPIRequest=Ti.UI.createButton({
                                     title:'apiRequest',
                                     top:150,
                                     height:30,
                                     width:200
                                     });

btnAPIRequest.addEventListener('click',function(){
                               geoloqi.session.apiRequest("GET","account/profile",{},
                                                          {
                                                          onSuccess:function(e)
                                                          {
                                                          alert(e);
                                                          },
                                                          onFailure:function(e)
                                                          {
                                                          alert(e);
                                                          }
                                                          });
                               
                               });

scrollViewer.add(btnAPIRequest);

var btnPost=Ti.UI.createButton({
                               title:'POST',
                               top:185,
                               height:30,
                               width:200
                               });

btnPost.addEventListener('click',function(){
                         geoloqi.session.postRequest("link/create",{description:"this is test link"},
                                                     {
                                                     onSuccess:function(e)
                                                     {
                                                     alert(e);
                                                     },
                                                     onFailure:function(e)
                                                     {
                                                     alert(e);
                                                     }
                                                     });
                         
                         });

scrollViewer.add(btnPost);


var btnGet=Ti.UI.createButton({
                              title:'GET',
                              top:220,
                              height:30,
                              width:200
                              });
btnGet.addEventListener('click',function(){
                        geoloqi.session.getRequest("location/last",{},
                                                   {
                                                   onSuccess:function(e)
                                                   {
                                                   alert(e);
                                                   },
                                                   onFailure:function(e)
                                                   {
                                                   alert(e);
                                                   }
                                                   });
                        });

scrollViewer.add(btnGet);

var btnGetProfile=Ti.UI.createButton({
                                     title:'GET PROFILE',
                                     top:255,
                                     height:30,
                                     width:200
                                     });

btnGetProfile.addEventListener('click',function(){
                               alert(geoloqi.tracker.getProfile());
                               });

scrollViewer.add(btnGetProfile);


var btnSetProfile=Ti.UI.createButton({
                                     title:'SET PROFILE(ADAPTIVE)',
                                     top:290,
                                     height:30,
                                     width:200
                                     });

btnSetProfile.addEventListener('click',function(){
                               alert(geoloqi.tracker.setProfile("ADAPTIVE"));
                               });

scrollViewer.add(btnSetProfile);




var button1=Ti.UI.createButton({
                               title:'tracker obj',
                               top:350,
                               height:30,
                               width:200
                               });

button1.addEventListener('click',function(){
                         alert(geoloqi.tracker);
                         });

scrollViewer.add(button1);

var button2=Ti.UI.createButton({
                               title:'iOS obj',
                               top:400,
                               height:30,
                               width:200
                               });

button2.addEventListener('click',function(){
                         alert(geoloqi.iOS);
                         });

scrollViewer.add(button2);

var button3=Ti.UI.createButton({
                               title:'dateOfLastSyncedLocationUpdate',
                               top:450,
                               height:30,
                               width:200
                               });

button3.addEventListener('click',function(){
                         alert(geoloqi.tracker.dateOfLastSyncedLocationUpdate);
                         });


scrollViewer.add(button3);

var button4=Ti.UI.createButton({
                               title:'getDateOfLastSyncedLocationUpdate()',
                               top:500,
                               height:30,
                               width:200
                               });

button4.addEventListener('click',function(){
                         alert(geoloqi.tracker.getDateOfLastSyncedLocationUpdate());
                         });

scrollViewer.add(button4);

var button5=Ti.UI.createButton({
                               title:'dateOfLastLocationUpdate',
                               top:550,
                               height:30,
                               width:200
                               });

button5.addEventListener('click',function(){
                         alert(geoloqi.tracker.dateOfLastLocationUpdate);
                         });

scrollViewer.add(button5);

var button6=Ti.UI.createButton({
                               title:'getDateOfLastLocationUpdate()()',
                               top:600,
                               height:30,
                               width:200
                               });

button6.addEventListener('click',function(){
                         alert(geoloqi.tracker.getDateOfLastLocationUpdate());
                         });

scrollViewer.add(button6);

var button7=Ti.UI.createButton({
                               title:'status',
                               top:650,
                               height:30,
                               width:200
                               });

button7.addEventListener('click',function(){   
                         alert(geoloqi.tracker.status);
                         
                         });

scrollViewer.add(button7);

var button8=Ti.UI.createButton({
                               title:'getStatus()',
                               top:700,
                               height:30,
                               width:200
                               });

button8.addEventListener('click',function(){
                         alert(geoloqi.tracker.getStatus());
                         });

scrollViewer.add(button8);

var button9=Ti.UI.createButton({
                               title:'profile',
                               top:750,
                               height:30,
                               width:200
                               });

button9.addEventListener('click',function(){
                         alert(geoloqi.tracker.profile);
                         });

scrollViewer.add(button9);

var button10=Ti.UI.createButton({
                                title:'getProfile()',
                                top:800,
                                height:30,
                                width:200
                                });

button10.addEventListener('click',function(){
                          alert(geoloqi.tracker.getProfile());
                          });

scrollViewer.add(button10);

var button11=Ti.UI.createButton({
                                title:'canSwitchToProfile()',
                                top:850,
                                height:30,
                                width:200
                                });

button11.addEventListener('click',function(){
                          alert(geoloqi.tracker.canSwitchToProfile("ADAPTIVE"));
                          });

scrollViewer.add(button11);

var button12=Ti.UI.createButton({
                                title:'setProfile(LOGGING)',
                                top:900,
                                height:30,
                                width:200
                                });

button12.addEventListener('click',function(){
                          geoloqi.tracker.setProfile("LOGGING");
                          });

scrollViewer.add(button12);

var button13=Ti.UI.createButton({
                                title:'Register for PUSH NOTIFICATION',
                                top:1000,
                                height:30,
                                width:200
                                });

var label = Ti.UI.createLabel({
                              text:'Attempting to register with Apple for Push Notifications...',
                              textAlign:'center',
                              width:'auto',
                              top:1050
                              });

scrollViewer.add(label);

button13.addEventListener('click',function(){ 
                          // register for push notifications
                          Titanium.Network.registerForPushNotifications({
                                                                        types: [
                                                                                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                                                                                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                                                                                Titanium.Network.NOTIFICATION_TYPE_SOUND,
                                                                                Titanium.Network.NOTIFICATION_TYPE_NEWSSTAND
                                                                                ],
                                                                        success:function(e)
                                                                        {
                                                                        var deviceToken = e.deviceToken;
                                                                        
                                                                        geoloqi.iOS.registerDeviceToken(deviceToken);
                                                                        
                                                                        
                                                                        label.text = "Device registered. Device token: \n\n"+deviceToken;
                                                                        Ti.API.info("Push notification device token is: "+deviceToken);
                                                                        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
                                                                        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
                                                                        },
                                                                        error:function(e)
                                                                        {
                                                                        label.text = "Error during registration: "+e.error;
                                                                        },
                                                                        callback:function(e)
                                                                        {
                                                                        // called when a push notification is received.
                                                                        alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
                                                                        
                                                                        geoloqi.iOS.handlePush(e.data);
                                                                        }
                                                                        });	
                          
                          
                          });

scrollViewer.add(button13);

//For Future methods will not work in ios

//GetUserName
var btnGetUserName=Ti.UI.createButton({
                                      title:'Get UserName',
                                      top:1200,
                                      height:30,
                                      width:200
                                      });

btnGetUserName.addEventListener('click',function(){
                                var userName = geoloqi.session.getUsername();
                                alert("UserName:"+ userName);
                                });

scrollViewer.add(btnGetUserName);

//IS Anonoymus
var btnIsAnonymous=Ti.UI.createButton({
                                      title:'Is Anonymous',
                                      top:1250,
                                      height:30,
                                      width:200
                                      });

btnIsAnonymous.addEventListener('click',function(){
                                var isAnonymous = geoloqi.session.isAnonymous();
                                alert("isAnonymous:"+ isAnonymous);
                                });

scrollViewer.add(btnIsAnonymous);

//isLowBatteryTrackingEnabled
var btnIsLowBatteryTrackingEnabled=Ti.UI.createButton({
                                                      title:'isLowBatteryTrackingEnabled',
                                                      top:1300,
                                                      height:30,
                                                      width:200
                                                      });

btnIsLowBatteryTrackingEnabled.addEventListener('click',function(){
                                                var isLowBatteryTrackingEnabled = geoloqi.isLowBatteryTrackingEnabled();
                                                alert("isLowBatteryTrackingEnabled:"+ isLowBatteryTrackingEnabled);
                                                });

scrollViewer.add(btnIsLowBatteryTrackingEnabled);