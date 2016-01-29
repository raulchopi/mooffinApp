import Q from 'q';

function loginController($scope, $state, $stateParams, $cordovaOauth, $http, $localStorage, APIService, UserService) {

  if(UserService.isUserLogged())
    $state.go('main.searcher');

  $scope.logIn = function logIn() {
    $state.go("main.searcher");
  };

  $scope.userLogged = UserService.isUserLogged();


  // ************** GOOGLE LOGIN

  $scope.googleLogin = function googleLogin() {
    $cordovaOauth.google("306861178343-44gvfs26krqj4usqj4vkfkn438kh795e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
      $localStorage.token = result.access_token;
      getUserInfoGoogle(result.access_token).then(function(response) {
        getUserByUid(response);
        $state.go("main.searcher");
      }, function(error) {
        console.log(error);
      });

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
        var auth = {
          provider: 'google_oauth2',
          first_name: user_data.given_name,
          last_name: user_data.family_name,
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

  // ************** FACEBOOK LOGIN
  $scope.facebookLogin = function facebookLogin() {

    $cordovaOauth.facebook("1473730946221977", ["email"]).then(function(result) {
      $localStorage.token = result.access_token;
      getUserInfoFacebook(result.access_token).then(function(response) {
        getUserByUid(response);
        $state.go("main.searcher");
      }, function(error) {
        console.log(error);
      });
      console.log(result);
      $state.go("main.searcher");
    }, function(error) {
      console.log(error);
    });
  };

  function getUserInfoFacebook(access_token) {
    let defer = Q.defer();
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
            name: user_data.first_name,
            surname: user_data.last_name,
            username: user_data.id,
            gender: user_data.gender,
            email: user_data.email,
            uid: user_data.id,
            avatar: null,
            profile: user_data.link
        };
        defer.resolve(auth);
    })
    .catch(defer.reject);

    return defer.promise;
  };

  // $scope.facebookLogin = function facebookLogin() {
  //
  //   $cordovaOauth.facebook("1473730946221977", ["email"]).then(function(result) {
  //     $localStorage.token = result.access_token;
  //     getUserInfoFacebook(result.access_token).then(function(response) {
  //       getFacebookPicture(response.uid).then(function(pictureUrl) {
  //         console.log("dentro");
  //         console.log(response);
  //         console.log(pictureUrl);
  //         response.avatar = pictureUrl;
  //         console.log(response);
  //         getUserByUid(response);
  //         $state.go("main.searcher");
  //       }, function(error) {
  //         console.log(error);
  //       });
  //
  //     }, function(error) {
  //       console.log(error);
  //     });
  //     console.log(result);
  //     $state.go("main.searcher");
  //   }, function(error) {
  //     console.log(error);
  //   });
  // };


  function getFacebookPicture(id) {
    let defer = Q.defer();
    var http = $http({
        url: 'https://graph.facebook.com/' + auth.uid + '/picture?type=large',
        method: 'GET'
    });

    http.then(function (data) {
      console.log("2");
      console.log(data);
      var auth = data.url;
      console.log(auth);
      defer.resolve(auth);
    })
    .catch(defer.reject);

    return defer.promise;
  };


  function getUserByUid(data) {
    var auth = {auth: data}
    APIService.getUserByUid(auth)
    .then(function(response) {
      $localStorage.user = response.user;
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

loginController.$inject = ['$scope', '$state', '$stateParams', '$cordovaOauth', '$http', '$localStorage', 'APIService', 'UserService'];

export default loginController;
