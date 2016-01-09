import landingController from './landing/landingController';
import searcherController from './searcher/searcherController';
import showRecipeController from './recipe/showRecipeController';

function appConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/searcher');

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
  })

  .state('recipeShow', {
    url: '/recipe/:idRecipe',
    templateUrl: './recipe/show.html',
    controller: showRecipeController
  });
};

export default appConfig;
