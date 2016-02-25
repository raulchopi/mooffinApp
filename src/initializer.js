import uuid from 'uuid-js';

function initializer($ionicPlatform, UserService, $cordovaGoogleAnalytics, $window) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if ($window.cordova && $window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if ($window.StatusBar) {
      StatusBar.styleDefault();
    }

    if($window.cordova && $window.analytics) {
      let trackerId = 'UA-13073417-5';
      let userId = UserService.isUserLogged() ? UserService.getUserId : uuid.create();
      // let userId = uuid.create();
      // $localStorage.userId = userId;

      $cordovaGoogleAnalytics.debugMode();
      $cordovaGoogleAnalytics.startTrackerWithId(trackerId);
      $cordovaGoogleAnalytics.setUserId(userId);

      console.log(`Analytics started with tracker id ${trackerId}`);
    }

  });
}

initializer.$inject = ['$ionicPlatform', 'UserService', '$cordovaGoogleAnalytics', '$window'];

export default initializer;
