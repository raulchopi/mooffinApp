import landingController from './landing/landingController';
import searcherController from './searcher/searcherController';
import showRecipeController from './recipe/showRecipeController';

function appConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/searcher/search');

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: './landing/landing.html',
    controller: landingController
  })

  .state('searcher', {
    url: '/searcher',
    templateUrl: './searcher/search.html',
    controller: searcherController
  })

  .state('searcher.search', {
    url: '/search',
    views: {
      'search-tab':{
        templateUrl: './searcher/searcher.html'
      }
    }  
  })

  .state('searcher.parameters', {
    url: '/parameters',
    views: {
      'parameters-tab':{
        templateUrl: './searcher/parameters.html'
      }
    }
  })

  .state('recipeShow', {
    url: '/recipe/:idRecipe',
    templateUrl: './recipe/show.html',
    controller: showRecipeController
  });
};

export default appConfig;
