
function showRecipeController($scope, $stateParams, $ionicHistory, APIService) {

  $scope.recipe = {};

  getRecipe();

  function getRecipe() {
    APIService.getRecipe({id: $stateParams.idRecipe})
    .then(function(response) {
      $scope.recipe = response;
      $scope.$apply();
    })
    .catch(function(error) {
      console.log(JSON.stringify(error));
    });
  }

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

};

showRecipeController.$inject = ['$scope', '$stateParams', '$ionicHistory', 'APIService'];

export default showRecipeController;
