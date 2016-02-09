import loginController from './login/loginController';
import mainController from './main/mainController';
import lastRecipesController from './recipe/lastRecipesController';
import searcherController from './searcher/searcherController';
import showRecipeController from './recipe/showRecipeController';
import userRecipesController from './user/userRecipesController';
import favsRecipesController from './recipe/favsRecipesController';

function appConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('login');

  $stateProvider
  // .state('landing', {
  //   url: '/',
  //   templateUrl: './landing/landing.html',
  //   controller: landingController
  // })

  .state('login', {
    url: '/login',
    templateUrl: './login/login.html',
    controller: loginController
  })

  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: './main/main.html',
    controller: mainController
  })

  .state('main.searcher', {
    url: '/searcher',
    views: {
      'menuContent': {
        templateUrl: './searcher/searcher.html',
        controller: searcherController
      }
    }
  })

  .state('main.lastRecipes', {
    cache: false,
    url: '/lastRecipes',
    views: {
      'menuContent': {
        templateUrl: './recipe/last.html',
        controller: lastRecipesController
      }
    }
  })

  .state('main.userRecipes', {
    url: '/userRecipes',
    views: {
      'menuContent': {
        templateUrl: './user/userRecipes.html',
        controller: userRecipesController
      }
    }
  })

  .state('main.favRecipes', {
    cache: false,
    url: '/favRecipes',
    views: {
      'menuContent': {
        templateUrl: './recipe/favs.html',
        controller: favsRecipesController
      }
    }
  })

  .state('main.searcher.search', {
    url: '/search',
    views: {
      'search-tab':{
        templateUrl: './searcher/search.html'
      }
    }
  })

  .state('main.searcher.parameters', {
    url: '/parameters',
    views: {
      'parameters-tab':{
        templateUrl: './searcher/parameters.html'
      }
    }
  })

  .state('main.recipeShow', {
    url: '/recipe/:idRecipe',
    views: {
      'menuContent':{
        templateUrl: './recipe/show.html',
        controller: showRecipeController
      }
    }
  });
};

export default appConfig;
