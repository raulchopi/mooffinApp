
function searcherController($scope, APIService) {

  $scope.ingredients = [];
  $scope.ingSelected = [];
  $scope.propostals = [];

  APIService.getIngredients({})
  .then(function(response) {
    $scope.ingredients.push(response.ingredientes[0]);
  })
  .catch(function(error) {
    console.error('an error has ocurred');
    console.error(error || "Undefined error");
  });


  $scope.getProposals = function getProposals() {
    APIService.getProposals({
      ids: $scope.ingSelected,
    })
    .then(function(response) {
      $scope.proposals = response;
    })
    .catch(function(error) {
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }

};

searcherController.$inject = ['$scope', 'APIService'];

export default searcherController;
