
function searcherController($scope, $state, $ionicHistory, APIService, $ionicTabsDelegate) {

  $scope.ingredients = [];
  $scope.ingSelected = [];
  $scope.idsIngSelected = [];
  $scope.proposals = [];
  $scope.nameFilter = {value: ''};
  $scope.loadingIng = false;
  $scope.loadingProp = false;
  $scope.hideTabs = false;

  getIngredients();

  function getIngredients() {
    $scope.loadingIng = true;
    APIService.getIngredients({})
    .then(function(response) {
      $scope.loadingIng = false;
      $scope.ingredients = response.ingredientes;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.loadingIng = false;
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

  $scope.removeIng = function removeIng(index) {
    $scope.ingSelected.splice(index, 1);
    $scope.idsIngSelected.splice(index, 1);
    if($scope.idsIngSelected.length > 0) {
      $scope.getProposals();
    }
    else{
      $scope.proposals = [];
    }
  }


  $scope.getProposals = function getProposals() {
    $scope.loadingProp = true;
    APIService.getProposals({
      params: {'ids[]': $scope.idsIngSelected}
    })
    .then(function(response) {
      $scope.proposals = response.recetas;
      $scope.loadingProp = false;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.loadingProp = false;
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }

  $scope.goTabForward = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1) {
      $ionicTabsDelegate.select(selected + 1);
    }
  }

  $scope.goTabBack = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1 && selected != 0) {
      $ionicTabsDelegate.select(selected - 1);
    }
  }

  $scope.goToRecipe = function goToRecipe(recipe) {
    $state.go("main.recipeShow", {idRecipe: recipe.id});
  }

  $scope.goToParameters = function goToParameters() {
    $state.go("main.searcher.parameters");
  };

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

  $scope.$on('changeHideTabs', function(event, args) {
    $scope.hideTabs = args;
  });

  $scope.$on('$ionicView.enter', function(){
    if($state.current.name != "main.recipeShow"){
      $scope.hideTabs = false;
    }
  });

};

searcherController.$inject = ['$scope', '$state', '$ionicHistory', 'APIService', '$ionicTabsDelegate'];

export default searcherController;
