
function searcherController($scope, APIService) {

  $scope.ingredients = [];
  $scope.ingSelected = [];
  $scope.proposals = [];

  APIService.getIngredients({})
  .then(function(response) {
    $scope.ingredients = response.ingredientes;
  })
  .catch(function(error) {
    console.error('an error has ocurred');
    console.error(error || "Undefined error");
  });

  $scope.addIng = function addIng(ing) {
    $scope.ingSelected.push(ing.id);
    $scope.nameFilter = '';
    this.getProposals();
  }


  $scope.getProposals = function getProposals() {
    APIService.getProposals({
      params: {'ids[]': $scope.ingSelected}
    })
    .then(function(response) {
      $scope.proposals = response.recetas;
      console.log($scope.proposals);
    })
    .catch(function(error) {
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }

};

searcherController.$inject = ['$scope', 'APIService'];

export default searcherController;
