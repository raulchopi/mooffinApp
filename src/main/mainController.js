function mainController($scope, $state, $stateParams, $localStorage, UserService) {

  $scope.goToSearcher = function goToSearcher() {
    $state.go("main.searcher.search");
  };

  $scope.logout = function logout() {
    UserService.setUser(false);
    $localStorage.token = false;
    $state.go("login");
  };

  $scope.login = function login() {
    $state.go("login");
  };

  $scope.userLogged = UserService.isUserLogged();
  $scope.user = UserService.getUser();
};

mainController.$inject = ['$scope', '$state', '$stateParams', '$localStorage', 'UserService'];

export default mainController;
