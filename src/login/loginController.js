import Q from 'q';

function loginController($scope, $state, $stateParams, $cordovaOauth, $http, $localStorage, APIService) {

  $scope.logIn = function logIn() {
    $state.go("main.searcher");
  };

  $scope.userInfo = {};


  $scope.googleLogin = function googleLogin() {
    $cordovaOauth.google("306861178343-44gvfs26krqj4usqj4vkfkn438kh795e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
      console.log("result");
      console.log(result);
      $localStorage.token = result.access_token;
      var auth = {};
      getUserInfoGoogle(result.access_token).then(function(response) {
        console.log("resp - ");
        console.log(response);
        getUserByUid(response);
        $state.go("main.searcher");
      }, function(error) {
        console.log(error);
      });

    }, function(error) {
      console.log(error);
    });
  };

  $scope.facebookLogin = function facebookLogin() {

    $cordovaOauth.facebook("1473730946221977", ["email"]).then(function(result) {
      // $localStorage.token = result.access_token;
      console.log(result);
      $state.go("main.searcher");
    }, function(error) {
      console.log(error);
    });
  };


  function getUserInfoGoogle(access_token) {
    let defer = Q.defer();
    var http = $http({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        method: 'GET',
        params: {
            access_token: access_token
        }
    });
    http.then(function (data) {
        var user_data = data.data;
        console.log("http.then");
        console.log(user_data);
        var auth = {
          provider: 'google_oauth2',
          name: user_data.given_name,
          surname: user_data.family_name,
          username: user_data.sub,
          gender: user_data.gender,
          email: user_data.email,
          uid: user_data.sub,
          avatar: user_data.picture,
          profile: user_data.profile
        };
        defer.resolve(auth);
    })
    .catch(defer.reject);

    return defer.promise;
  };

  function getUserInfoFacebook(access_token) {
    var http = $http({
        url: 'https://graph.facebook.com/me',
        method: 'GET',
        params: {
            access_token: access_token
        }
    });
    http.then(function (data) {
        var user_data = data.data;
        var auth = {
            provider: 'facebook',
            name: user_data.given_name,
            surname: user_data.family_name,
            username: user_data.sub,
            gender: user_data.gender,
            email: user_data.email,
            uid: user_data.sub,
            avatar: user_data.picture,
            profile: user_data.profile
        };
        return auth;
    });
  };


  function getUserByUid(data) {
    console.log(data);
    var auth = {auth: data}
    console.log("y esto que");
    console.log(auth);
    APIService.getUserByUid(auth)
    .then(function(response) {
      $localStorage.user = response.user;
      console.log("YEAH OOOOOH");
      console.log($response.user);
      $scope.$apply();
    })
    .catch(function(error) {
      $localStorage.user = {};
      $scope.$apply();
      console.error('an error has ocurred');
      console.error(error || "Undefined error");
    });
  }


};

loginController.$inject = ['$scope', '$state', '$stateParams', '$cordovaOauth', '$http', '$localStorage', 'APIService'];

export default loginController;
