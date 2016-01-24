function loginController($scope, $state, $stateParams, $cordovaOauth) {

  $scope.logIn = function logIn() {
    $state.go("main.searcher");
  };


  $scope.googleLogin = function googleLogin() {
    $cordovaOauth.google("306861178343-44gvfs26krqj4usqj4vkfkn438kh795e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
      console.log(result);
      $scope.data = result.access_token;
      $state.go("main.searcher");
    }, function(error) {
      console.log(error);
    });
  };

  $scope.facebookLogin = function facebookLogin() {

    $cordovaOauth.facebook("1473730946221977", ["email"]).then(function(result) {
      // $scope.data = result.access_token;
      console.log(result);
      $state.go("main.searcher");
    }, function(error) {
      console.log(error);
    });
  };
};

loginController.$inject = ['$scope', '$state', '$stateParams', '$cordovaOauth'];

export default loginController;
