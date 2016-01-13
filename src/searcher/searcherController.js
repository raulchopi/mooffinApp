
function searcherController($scope, $state, $ionicHistory, APIService) {

  $scope.ingredients = [];
  $scope.ingSelected = [];
  $scope.idsIngSelected = [];
  $scope.proposals = [];
  $scope.nameFilter = {value: ''};
  $scope.loading = false;

  getIngredients();

  function getIngredients() {
    $scope.loading = true;
    APIService.getIngredients({})
    .then(function(response) {
      $scope.loading = false;
      $scope.ingredients = response.ingredientes;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.loading = false;
      $scope.$apply();
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }

  $scope.addIng = function addIng(ing) {
    $scope.nameFilter.value = '';
    $scope.idsIngSelected.push(ing.id);
    $scope.ingSelected.push(ing);
    $scope.getProposals();
  }


  $scope.getProposals = function getProposals() {
    APIService.getProposals({
      params: {'ids[]': $scope.idsIngSelected}
    })
    .then(function(response) {
      $scope.proposals = response.recetas;
      $scope.$apply();
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
