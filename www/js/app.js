// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('app', ['ionic','ngCordova','app.controllers',  'app.routes','angularSpinner','app.services', 'app.directives','ngSanitize','ui.utils.masks','ngCordovaOauth'])




.run(function($ionicPlatform,$rootScope,$cordovaToast, $ionicPopup,$state) {
  /*var androidConfig = {
        "senderID": "934670702504",
		"badge"      : true,
        "alert"      : true,
        "icon"       : "icon"
    };*/
	//$ionicConfigProvider.navBar.alignTitle('left')

	$ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="login"){
      navigator.app.exitApp();
    // }else if($state.current.name=="tabsController.submissionConfirmation"){
    //   $state.go('tabsController.auditions');
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
  $ionicPlatform.ready(function() {
            var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionCallback, null);
             
            function checkPermissionCallback(status) {
              if(!status.hasPermission) {
                var errorCallback = function() {
                  console.warn('Storage permission is not turned on');
                }
             
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(status) {
                    if(!status.hasPermission) errorCallback();
                  },
                  errorCallback);
              }
            }
 

               
   //   var push = PushNotification.init({
   //   "android" : {
   //    "senderID" : "934670702504"// This is your project number which you've created on Google Developers Console
   //   },
   //   "ios" : {},
   //   "windows" : {}
   //  });

   // push.on('registration', function(data) {
   //  //data.registrationId
   //  //send this token on server

   // });
   // push.on('notification', function(data) {
   //  if (data.sound) {// play specific sound on notification received(When app running)
   //   var snd = new Media('file:///android_asset/www/sound/' + data.sound);
   //   snd.play();
   //  }
    
   //  if (!data.additionalData.foreground) {
   //   // app is NOT RUNNING and new notification is RECEIVED
     
   //  } else {
   //   // app is RUNNING and new notification is RECEIVED
   //  }
   // });

   // push.on('error', function(e) {
   //  //alert(JSON.stringify(data))
   //  // e.message
   // });
   
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  
  });
})


app.filter('removeHTMLTags', function() {

	return function(text) {

		return  text ? String(text).replace(/<[^>]+>/gm, '') : '';

	};

});
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
return function(val) {
    return $sce.trustAsResourceUrl(val);
};

}]);
app.filter('tel', function () {
    return function (phoneNumber) {
        if (!phoneNumber)
            return phoneNumber;

        return formatLocal('US', phoneNumber);

    }
})



