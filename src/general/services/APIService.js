import R from 'ramda'
import Q from 'q';

function APIService(ajaxService, $http) {

  // let basePath = "http://www.mooffin.es/api/v1"
  let basePath = "http://localhost:8100/api"


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
    getProposals:  handledCall('post', `${basePath}/proposals`, undefined),
    // login: loginHandledCall,

    // getUsers: handledCall('post', `${basePath}/user/{page}/{items}`, undefined),
    // getUser: handledCall('get', `${basePath}/user/{id}`, undefined),
    // removeUser: handledCall('get', `${basePath}/user/{id}/remove`, undefined),
    // permissions: handledCall('get', `${basePath}/permission`, undefined),
    // addUser: handledCall('post', `${basePath}/user/register`, undefined),
    // editUser: handledCall('post', `${basePath}/user/{id}/edit`, undefined),
    //
    // getRestaurant: handledCall('get', `${basePath}/restaurant/{id}`, undefined),
    // getRestaurants: handledCall('post', `${basePath}/restaurant/{page}/{items}`, undefined),
    // removeRestaurant: handledCall('get', `${basePath}/restaurant/{id}/remove`, undefined),
    // addRestaurant: handledCall('post', `${basePath}/restaurant/add`, undefined),
    // editRestaurant: handledCall('post', `${basePath}/restaurant/{id}/edit`, undefined),
    //
    // courses: handledCall('get', `${basePath}/restaurant/{id}/course`, undefined),
    // course: handledCall('get', `${basePath}/course/{id}`, undefined),
    // editCourse: handledCall('post', `${basePath}/course/{id}/edit`, undefined),
    // addCourse: handledCall('post', `${basePath}/course/add`, undefined),
    // delCourse: handledCall('get', `${basePath}/course/{id}/remove`, undefined),
    //
    // allergens: handledCall('get', `${basePath}/allergen`, undefined),
    //
    // menus: handledCall('get', `${basePath}/restaurant/{id}/menu`, undefined),
    // menu: handledCall('get', `${basePath}/menu/{id}`, undefined),
    // addMenu: handledCall('post', `${basePath}/menu/add`, undefined),
    // editMenu: handledCall('post', `${basePath}/menu/{id}/edit`, undefined),
    // delMenu: handledCall('get', `${basePath}/menu/{id}/remove`, undefined),
    //
    // tables: handledCall('get', `${basePath}/restaurant/{id}/table`, undefined),
    // table: handledCall('get', `${basePath}/table/{id}`, undefined),
    // addTable: handledCall('post', `${basePath}/table/add`, undefined),
    // editTable: handledCall('post', `${basePath}/table/{id}/edit`, undefined),
    // delTable: handledCall('get', `${basePath}/table/{id}/remove`, undefined),
    // tableStates: handledCall('get', `${basePath}/tablestates`, undefined),
    //
    // orders: handledCall('get', `${basePath}/restaurant/{id}/command`, undefined),
    // ordersTable: handledCall('get', `${basePath}/table/{id}/command`, undefined),
    // order: handledCall('get', `${basePath}/command/{id}`, undefined),
    //
    // getPayments: handledCall('post', `${basePath}/payment/{page}/{items}`, undefined),
    // getPayment: handledCall('post', `${basePath}/payment/{id}`, undefined)
  }
}

APIService.$inject = ['ajaxService', '$http'];

export default APIService
