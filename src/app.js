// Ionic Starter App

import 'driftyco/ionic-bower';


import APIService from './general/services/APIService';

import zadiaNG from '../zadia-ng/zadia-ng';

import appConfig from './appConfig';

angular.module('mooffin', ['ionic', zadiaNG])
.service('APIService', APIService)
.config(appConfig)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
