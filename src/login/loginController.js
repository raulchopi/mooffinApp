function loginController($scope, $state, $stateParams) {

  $scope.logIn = function logIn() {
    $state.go("main.searcher");
  };
};

loginController.$inject = ['$scope', '$state', '$stateParams'];

export default loginController;
