
function showRecipeController($scope, $stateParams, $ionicHistory,
  APIService, UserService, $cordovaToast, $localStorage, $ionicPopover,
  $ionicPlatform, $window, $cordovaGoogleAnalytics, $cordovaSocialSharing) {

  $scope.recipe = {};
  $scope.loading = false;
  $scope.$emit('changeHideTabs', true);
  $scope.doLike = false;
  if(UserService.isUserLogged()) {
    userLikeRecipe();
  }

  $ionicPlatform.ready(function() {
    if($window.cordova && $window.analytics) {
      $cordovaGoogleAnalytics.trackView('Show recipe');
    }
  });

  $ionicPopover.fromTemplateUrl('./shared/popover-social.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

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

  function userLikeRecipe() {
    APIService.userLikeRecipe({userId: UserService.getUserId,
      recipeId: $stateParams.idRecipe})
    .then(function(response) {
      $scope.doLike = response.doLike;
      $scope.$apply();
    })
    .catch(function(error) {
      $scope.doLike = false;
      console.log(JSON.stringify(error));
    });
  }

  $scope.likeThisRecipe = function likeThisRecipe() {
    var data = {data: {userId: $localStorage.user.id,
      recipeId: $stateParams.idRecipe}}
    APIService.doLikeRecipe(data)
    .then(function(response) {
      $scope.doLike = true;
      $scope.$apply();
      $cordovaToast.show('Receta marcada como favorita', 'long', 'bottom');
    })
    .catch(function(error) {
      $scope.$apply();
      $cordovaToast.show('Error al marcar la receta como favorita', 'long', 'bottom');
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  };

  $scope.dontLikeThisRecipe = function dontLikeThisRecipe() {
    var data = {data: {userId: $localStorage.user.id,
      recipeId: $stateParams.idRecipe}}
    APIService.dontLikeRecipe(data)
    .then(function(response) {
      $scope.doLike = false;
      $scope.$apply();
      $cordovaToast.show('Eliminada de la lista de recetas favoritas', 'long', 'bottom');
    })
    .catch(function(error) {
      $scope.$apply();
      $cordovaToast.show('Error al eliminar la receta de la lista de favoritas', 'long', 'bottom');
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  };

  $scope.shareFacebook = function shareFacebook() {
    var message = $scope.recipe.titulo;
    var image =  'http://www.mooffin.es' + $scope.recipe.image;
    var link = 'http://www.mooffin.es/receta/' + $scope.recipe.slug;
    $cordovaSocialSharing.shareViaFacebook(message, image, link)
    .then(function(result) {
    }, function(err) {
        console.error(err || "Undefined error");
    });
  }

  $scope.shareTwitter = function shareTwitter() {
    var message = $scope.recipe.titulo;
    var image =  'http://www.mooffin.es' + $scope.recipe.image;
    var link = 'http://www.mooffin.es/receta/' + $scope.recipe.slug;
    $cordovaSocialSharing.shareViaTwitter(message, image, link)
    .then(function(result) {
    }, function(err) {
        console.error(err || "Undefined error");
    });
  }

  $scope.shareWhatsapp = function shareWhatsapp() {
    var message = $scope.recipe.titulo;
    var image =  'http://www.mooffin.es' + $scope.recipe.image;
    var link = "http://www.mooffin.es/receta/" + $scope.recipe.slug;
    $cordovaSocialSharing.shareViaWhatsApp(message, image, link)
    .then(function(result) {
    }, function(err) {
        console.error(err || "Undefined error");
    });
  }

  $scope.myGoBack = function myGoBack() {
    $ionicHistory.goBack();
  };

};

showRecipeController.$inject = ['$scope', '$stateParams', '$ionicHistory',
  'APIService', 'UserService', '$cordovaToast', '$localStorage', '$ionicPopover',
  '$ionicPlatform', '$window', '$cordovaGoogleAnalytics', '$cordovaSocialSharing'];

export default showRecipeController;
