import R from 'ramda'
import Q from 'q';

function APIService(ajaxService, $http) {

  let basePath = "http://www.mooffin.es/api/v1"
  // let basePath = "http://192.168.20.56:8100/api"
  // let basePath = "http://localhost:8100/api"


  // $http.defaults.headers.common["Authorization"] = $localStorage.token;
  $http.defaults.headers.post["Content-Type"] = "application/json";

  let handledCall = R.curry(function handledCall(method, path, cache, form) {
    // $http.defaults.headers.common["Authorization"] = $localStorage.token;
    let defer = Q.defer();

    ajaxService.cachedCall(method, path, cache, angular.copy(form))
    .then(defer.resolve)
    .catch(function(e) {
      // if(e.code==401) { $state.go("login"); $localStorage.session = false; }
      defer.reject(e);
    })

    return defer.promise;
  });

  // let loginHandledCall = function loginHandledCall(form) {
  //   let defer = $q.defer();
  //
  //   ajaxService.call('post', `${basePath}/user/auth`, form)
  //   .then(function(response) {
  //     if(response.token) {
  //       $localStorage.token = response.token;
  //       $http.defaults.headers.common["Authorization"] = $localStorage.token;
  //       defer.resolve(response);
  //     }
  //     else{
  //       defer.reject;
  //     }
  //   })
  //   .catch(defer.reject);
  //
  //   return defer.promise;
  // }

  return {
    path: basePath,

    getIngredients: handledCall('get', `${basePath}/ingredients`, undefined),
    getProposals:  handledCall('get', `${basePath}/proposals`, undefined),
    getRecipe:  handledCall('get', `${basePath}/recipes/{id}`, undefined),
    getLastRecipes:  handledCall('get', `${basePath}/lastRecipes/{number}`, undefined),
    getUserByUid:  handledCall('post', `${basePath}/userByUid`, undefined),
  }
}

APIService.$inject = ['ajaxService', '$http'];

export default APIService
