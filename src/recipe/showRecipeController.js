
function showRecipeController($scope, $stateParams, $ionicHistory, APIService) {

  $scope.recipe = {};
  $scope.loading = false;

  getRecipe();

  function getRecipe() {
    $scope.loading = true;
    APIService.getRecipe({id: $stateParams.idRecipe})
    .then(function(response) {
      $scope.recipe = response;
      $scope.loading = false;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.loading = false;
      $scope.$apply();
      console.log(JSON.stringify(error));
    });
  }

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

};

showRecipeController.$inject = ['$scope', '$stateParams', '$ionicHistory', 'APIService'];

export default showRecipeController;
