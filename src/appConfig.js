import landingController from './landing/landingController';
import searcherController from './searcher/searcherController';

function appConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: './landing/landing.html',
    controller: landingController
  })

  .state('searcher', {
    url: '/searcher',
    templateUrl: './searcher/searcher.html',
    controller: searcherController
  });
};

export default appConfig;
