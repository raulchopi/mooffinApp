function mainController($scope, $state, $stateParams) {

  $scope.goToSearcher = function goToSearcher() {
    $state.go("main.searcher.search");
  };
};

mainController.$inject = ['$scope', '$state', '$stateParams'];

export default mainController;
