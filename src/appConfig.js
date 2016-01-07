import landingController from './landing/landingController';

function appConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: './landing/landing.html',
    controller: landingController
  });
};

export default appConfig;
