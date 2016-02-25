function favsRecipesController($scope, $state, $stateParams, APIService, UserService, $ionicPlatform, $window, $cordovaGoogleAnalytics) {

  $scope.navTitle = 'Recetas favoritas';
  $scope.userFavsRecipes = [];
  $scope.loading = false;

  $ionicPlatform.ready(function() {
    if($window.cordova && $window.analytics) {
      $cordovaGoogleAnalytics.trackView('Fav recipes');
    }
  });

  getUserFavsRecipes();

  function getUserFavsRecipes() {
    $scope.loading = true;
    APIService.getUserFavsRecipes({id: UserService.getUserId})
    .then(function(response) {
      $scope.userFavsRecipes = response.favs;
      $scope.loading = false;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.loading = false;
      $scope.$apply();
      console.log(JSON.stringify(error));
    });
  }

  $scope.goToRecipe = function goToRecipe(recipe) {
    $state.go("main.recipeShow", {idRecipe: recipe.id});
  }
};

favsRecipesController.$inject = ['$scope', '$state', '$stateParams',
  'APIService', 'UserService', '$ionicPlatform', '$window', '$cordovaGoogleAnalytics'];

export default favsRecipesController;
