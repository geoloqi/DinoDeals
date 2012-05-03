 
// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

// open a single window
var window = Ti.UI.createWindow({
                                backgroundColor:'white'
                                });

var geoloqi = require('ti.geoloqi');
geoloqi.setDebug(true);

geoloqi.addEventListener('onValidate',function(e){
                              //alert("Request completed");
                              alert("[Validation Error] " + e.response.error_description);
                              });  

var scrollViewer = Ti.UI.createScrollView({
                                          contentWidth: 'auto',
                                          contentHeight: 1000,
                                          width: 1024,
                                          //height: 400,
                                          backgroundColor: '#c5c5c5',
                                          showVerticalScrollIndicator:true,
                                          showHorizontalScrollIndicator:false,
                                          zIndex: 10
                                          });


// android specific
if (Ti.Platform.name == "android") {
    var extras = {
    EXTRA_SDK_ID: "b272bc7b3add8b4cb32a0c9b222ab6c4",
    EXTRA_SDK_SECRET: "db9181529c7922e6d23764c4614966b4",
    EXTRA_USERNAME: "sapan.varshney@globallogic.com",
    EXTRA_PASSWORD: "S@pan123"
    }
    geoloqi.startLQService("ACTION_AUTH_USER",extras);
}



var getAccessToken=Ti.UI.createButton({
                                                 title:'Get Access Token',
                                                 top:5,
                                                 height:30,
                                                 width:200
                                                 });


var buttonIsPushEnabled=Ti.UI.createButton({
                                           title:'Is Push Disabled',
                                           top:60,
                                           height:30,
                                           width:200
                                           });

var buttonSetPushEnabled=Ti.UI.createButton({
                                            title:'Set Push Disbled',
                                            top:120,
                                            height:30,
                                            width:200
                                            });

var buttonGetUserName=Ti.UI.createButton({
                                         title:'Get UserID',
                                         top:180,
                                         height:30,
                                         width:200
                                         });

var buttonIsAnonymus=Ti.UI.createButton({
                                        title:'Is Anonymous',
                                        top:240,
                                        height:30,
                                        width:200
                                        });

var buttonCreateAccountWithAnonymusUser=Ti.UI.createButton({
                                                           title:'Create Anonymous User',
                                                           top:300,
                                                           height:30,
                                                           width:200
                                                           });

var buttonCreateAccountWithUserName=Ti.UI.createButton({
                                                       title:'Create Account With UserName',
                                                       top:360,
                                                       height:30,
                                                       width:200
                                                       });

var buttonAuthenticateUser=Ti.UI.createButton({
                                              title:'Authenticate User',
                                              top:420,
                                              height:30,
                                              width:200
                                              });

var buttonregisterDeviceToken=Ti.UI.createButton({
                                                 title:'Register Device User',
                                                 top:480,
                                                 height:30,
                                                 width:200
                                                 });

var buttonRunGetrequest=Ti.UI.createButton({
                                           title:'Run Get Request',
                                           top:540,
                                           height:30,
                                           width:200
                                           });

var buttonrunPostRequestWithJSONObject=Ti.UI.createButton({
                                                          title:'Run Post Request(Object)',
                                                          top:600,
                                                          height:30,
                                                          width:200
                                                          });

var runPostRequestWithJSONArray=Ti.UI.createButton({
                                                   title:'Run Post Request(Array)',
                                                   top:660,
                                                   height:30,
                                                   width:200
                                                   });

var runAPI=Ti.UI.createButton({
                              title:'Run API',
                              top:720,
                              height:30,
                              width:200
                              });

var buttonformatTimeStamp=Ti.UI.createButton({
                                             title:'Format TimeStamp',
                                             top:780,
                                             height:30,
                                             width:200
                                             });

var sessionProxy=geoloqi.createLQSession({
                                         apiKey:"b272bc7b3add8b4cb32a0c9b222ab6c4",
                                         apiSecret: "db9181529c7922e6d23764c4614966b4"
                                         });


getAccessToken.addEventListener('click',function(){
                                           var result=sessionProxy.getAccessToken();
                                           alert(result);
                                           });

buttonIsPushEnabled.addEventListener('click',function(){
                                     var result=sessionProxy.isPushEnabled();
                                     alert(result);
                                     });

buttonSetPushEnabled.addEventListener('click',function(){
                                      var result=sessionProxy.setPushEnabled(true);
                                      alert(result);
                                      });

buttonGetUserName.addEventListener('click',function(){
                                   //var result=sessionProxy.getUSerName();
                                   alert('Not available on iphone');
                                   });

buttonIsAnonymus.addEventListener('click',function(){
                                  //var result=sessionProxy.isAnonymous();
                                  alert('Not available on iphone');
                                  });

buttonCreateAccountWithAnonymusUser.addEventListener('click',function(){
                                                     sessionProxy.createAnonymousUserAccount({},{
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

buttonCreateAccountWithUserName.addEventListener('click',function(){
                                                 sessionProxy.createAccountWithUsername('pritisrivastava','sapan.varshney@gmail.com',{},
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



buttonAuthenticateUser.addEventListener('click',function(){
                                        sessionProxy.authenticateUser('sapan.varshney@globallogic.com',
                                                                      'S@pan123',
                                                                      {
                                                                      onSuccess:function(e)
                                                                      {
                                                                        alert(e);
                                                                      },
                                                                      onFailure:function(e)
                                                                      {
                                                                        alert(e);
                                                                      }
                                                                      }
                                                                      );
                                        });


buttonregisterDeviceToken.addEventListener('click',function(){
                                           sessionProxy.registerDeviceToken('1234');
                                           });

buttonRunGetrequest.addEventListener('click',function(){
                                     var result=sessionProxy.runGetRequest("account/profile",
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

buttonrunPostRequestWithJSONObject.addEventListener('click',function(){
                                                    var postJSON = {text:'This is test geonote'};
                                                    sessionProxy.runPostRequestWithJSONObject("geonote/create",postJSON);
                                                    });
runPostRequestWithJSONArray.addEventListener('click',function(){
                                             var jsonObjectArray=[{
                                                                  "date": "2010-07-23T09:19:38-07:00",
                                                                  "location": {
                                                                  "position": {
                                                                  "latitude": "45.445793867111",
                                                                  "longitude": "-122.64261245728",
                                                                  "speed": "10",
                                                                  "altitude": "0",
                                                                  "horizontal_accuracy": "24",
                                                                  "vertical_accuracy": "0"
                                                                  },
                                                                  "type": "point"
                                                                  },
                                                                  "raw": {
                                                                  "distance_filter": 5,
                                                                  "tracking_limit": 2,
                                                                  "rate_limit": 60,
                                                                  "battery": 86
                                                                  },
                                                                  "client": {
                                                                  "name": "Geoloqi",
                                                                  "version": "0.1",
                                                                  "platform": "iPhone OS 4",
                                                                  "hardware": "iPhone2,1"
                                                                  }
                                                                  }];
                                             sessionProxy.runPostRequestWithJSONArray("location/update",jsonObjectArray,
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


runAPI.addEventListener('click',function(){
                        var myJSON = {};
                        sessionProxy.runAPIRequest("user/create","POST",{},
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
buttonformatTimeStamp.addEventListener('click',function(){
                                       //var result=sessionProxy.formatTimeStamp('1111111111');
                                        alert('Not available on iphone');
                                       });

 
var setError=Ti.UI.createButton({
                                      title:'setErrorStatus',
                                      top:830,
                                      height:30,
                                      width:200
                                      });

setError.addEventListener('click',function(){
                                       
                          //geoloqi.getLQTracker().setErrorStatus({code:101,userInfo:"ABC"});
                          alert(geoloqi.getLQTracker().getErrorStatus());
                                       });

var canswitch=Ti.UI.createButton({
                                title:'canswitch',
                                top:880,
                                height:30,
                                width:200
                                });

canswitch.addEventListener('click',function(){
                          alert(geoloqi.getLQTracker().canSwitchToProfile("REALTIME"));
                           var abc = geoloqi.getLQTracker();
                           abc.configureAnonymousUserAccountWithUserInfoAndProfile({name:"ashish"},"OFF");
                           alert(geoloqi.getLQTracker().canSwitchToProfile("REALTIME"));
                           abc.setProfile("PASSIVE");
                           alert(geoloqi.getLQTracker().profile);
                           alert(geoloqi.getLQTracker().canSwitchToProfile("PASSIVE"));
                          });



window.add(scrollViewer);
scrollViewer.add(getAccessToken);
scrollViewer.add(buttonIsPushEnabled);
scrollViewer.add(buttonSetPushEnabled);
scrollViewer.add(buttonGetUserName);
scrollViewer.add(buttonIsAnonymus);
scrollViewer.add(buttonCreateAccountWithAnonymusUser);
scrollViewer.add(buttonCreateAccountWithUserName);
scrollViewer.add(buttonAuthenticateUser);
scrollViewer.add(buttonregisterDeviceToken);
scrollViewer.add(buttonRunGetrequest);
scrollViewer.add(buttonrunPostRequestWithJSONObject);
scrollViewer.add(runPostRequestWithJSONArray);
scrollViewer.add(runAPI);
scrollViewer.add(buttonformatTimeStamp);
scrollViewer.add(setError);
scrollViewer.add(canswitch);


window.open();

