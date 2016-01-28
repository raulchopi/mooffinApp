function UserService(APIService, $state, $localStorage) {

    // function getUserData() {
    //   try {
    //     return jwt($localStorage.token);
    //   } catch(e) {
    //     console.error(e);
    //     $state.go('login');
    //   }
    // }

    function getUser() {
      return $localStorage.user; // || getUserData().user;
    }

    function setUser(user) {
      $localStorage.user = user;
    }

    function isUserLogged() {
      return $localStorage.user && $localStorage.user != false && $localStorage.user.id ? true : false;
    }

    function getUserId() {
      return $localStorage.user && $localStorage.user.id != undefined ? $localStorage.user.id : null;
    }

    return {
      getUser: getUser,
      getUserId: getUserId,
      setUser: setUser,
      isUserLogged: isUserLogged
    }

}

UserService.$inject = ['APIService', '$state', '$localStorage'];

export default UserService;
