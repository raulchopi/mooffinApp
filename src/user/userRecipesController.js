function userRecipesController($scope, $state, $stateParams, APIService, UserService) {

  $scope.navTitle = 'Mis recetas';
  $scope.userRecipes = [];
  $scope.loading = false;

  getUserFavsRecipes();

  function getUserFavsRecipes() {
    $scope.loading = true;
    APIService.getUserRecipes({id: UserService.getUserId})
    .then(function(response) {
      $scope.userRecipes = response.recipes;
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

userRecipesController.$inject = ['$scope', '$state', '$stateParams', 'APIService', 'UserService'];

export default userRecipesController;
