
function showRecipeController($scope, $stateParams, $ionicHistory, APIService) {

  $scope.recipe = {};

  getRecipe();

  function getRecipe() {
    console.log($stateParams);
    APIService.getRecipe({id: $stateParams.idRecipe})
    .then(function(response) {
      console.log(response);
      $scope.recipe = response;
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
