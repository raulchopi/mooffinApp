// Ionic Starter App
import 'angular'
import 'ngstorage'
import 'driftyco/ionic-bower';
import APIService from './general/services/APIService';
import appConfig from './appConfig';
import initializer from './initializer';
import zadiaNG from '../zadia-ng/zadia-ng';
import 'ng-cordova';
import 'nraboy/ng-cordova-oauth';

angular.module('mooffin', ['ionic', zadiaNG, 'ngStorage', 'ngCordova', 'ngCordovaOauth'])
.service('APIService', APIService)
.config(appConfig)

.run(initializer);
