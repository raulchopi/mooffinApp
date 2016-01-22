
function searcherController($scope, $state, $ionicHistory, APIService, $ionicTabsDelegate, $cordovaOauth) {

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
    $state.go("searcher.recipeShow", {idRecipe: recipe.id});
  }

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

  $scope.$on('changeHideTabs', function(event, args) {
    $scope.hideTabs = args;
  });

  $scope.$on('$ionicView.enter', function(){
    if($state.current.name != "searcher.recipeShow"){
      $scope.hideTabs = false;
    }
  });

  // $scope.googleLogin = function googleLogin() {
  //   $cordovaOauth.google("306861178343-44gvfs26krqj4usqj4vkfkn438kh795e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
  //     $scope.data = result.access_token;
  //     $state.go("searcher.search");
  //   }, function(error) {
  //     console.log(error);
  //   });
  // };
  //
  // $scope.facebookLogin = function facebookLogin() {
  //
  //   $cordovaOauth.facebook("1473730946221977", ["email"], {redirect_uri: 'http://www.mooffin.es/callback'}).then(function(result) {
  //     $scope.data = result.access_token;
  //     $state.go("searcher.search");
  //   }, function(error) {
  //     console.log(error);
  //   });
  // };


};

searcherController.$inject = ['$scope', '$state', '$ionicHistory', 'APIService', '$ionicTabsDelegate', '$cordovaOauth'];

export default searcherController;
