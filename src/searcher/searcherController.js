
function searcherController($scope, APIService) {

  $scope.ingredients = [];

  APIService.getIngredients({})
  .then(function(response) {
    $scope.ingredients.push(response.ingredientes[0]);
  })
  .catch(function(error) {
    console.error('an error has ocurred');
    console.error(error || "Undefined error");
  });

};

searcherController.$inject = ['$scope', 'APIService'];

export default searcherController;
