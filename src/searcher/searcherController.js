
function searcherController($scope, $state, $ionicHistory, APIService) {

  $scope.ingredients = [];
  $scope.ingSelected = [];
  $scope.proposals = [];
  $scope.nameFilter = "";

  APIService.getIngredients({})
  .then(function(response) {
    $scope.ingredients = response.ingredientes;
  })
  .catch(function(error) {
    console.error('an error has ocurred');
    console.error(error || "Undefined error");
  });

  $scope.addIng = function addIng(ing) {
    $scope.nameFilter = "";
    $scope.ingSelected.push(ing.id);
    this.getProposals();
  }


  $scope.getProposals = function getProposals() {
    APIService.getProposals({
      params: {'ids[]': $scope.ingSelected}
    })
    .then(function(response) {
      $scope.proposals = response.recetas;
    })
    .catch(function(error) {
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }

  $scope.goToRecipe = function goToRecipe(recipe) {
    $state.go("recipeShow", {idRecipe: recipe.id});
  }

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

};

searcherController.$inject = ['$scope', '$state', '$ionicHistory', 'APIService'];

export default searcherController;
