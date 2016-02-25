function lastRecipesController($scope, $state, $stateParams, APIService,
  $ionicPlatform, $window, $cordovaGoogleAnalytics) {

  $scope.navTitle = 'Últimas recetas';
  $scope.lastRecipes = [];
  $scope.loading = false;

  $ionicPlatform.ready(function() {
    if($window.cordova && $window.analytics) {
      $cordovaGoogleAnalytics.trackView('Last Recipes');
    }
  });

  getLastRecipes();

  function getLastRecipes() {
    $scope.loading = true;
    APIService.getLastRecipes({number: 6})
    .then(function(response) {
      $scope.lastRecipes = response.lastRecipes;
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

lastRecipesController.$inject = ['$scope', '$state', '$stateParams', 'APIService',
  '$ionicPlatform', '$window', '$cordovaGoogleAnalytics'];

export default lastRecipesController;
