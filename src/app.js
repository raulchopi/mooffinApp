// Ionic Starter App

import 'driftyco/ionic-bower';

import APIService from './general/services/APIService';
import zadiaNG from '../zadia-ng/zadia-ng';
import appConfig from './appConfig';
import initializer from './initializer';

angular.module('mooffin', ['ionic', zadiaNG])
.service('APIService', APIService)
.config(appConfig)

.run(initializer);
