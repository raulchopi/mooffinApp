
function searcherController($scope, APIService) {

  $scope.ingredients = [];

  APIService.getIngredients({})
  .then(function(response) {
    $scope.ingredients = response;
  })
  .catch(function(error) {
    console.error('an error has ocurred');
    console.error(error || "Undefined error");
  });

};

searcherController.$inject = ['$scope', 'APIService'];

export default searcherController;
