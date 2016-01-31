function mainController($scope, $state, $stateParams, $localStorage, UserService) {

  $scope.userLogged = UserService.isUserLogged();
  $scope.user = UserService.getUser();

  $scope.logout = function logout() {
    UserService.setUser(false);
    $localStorage.token = false;
    $scope.userLogged = false;
    $scope.user = {};
    $state.go("login");
  };

  $scope.login = function login() {
    $state.go("login");
  };

};

mainController.$inject = ['$scope', '$state', '$stateParams', '$localStorage', 'UserService'];

export default mainController;
