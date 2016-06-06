'use strict';

(function () {

  var Auth = function ($http, User, $cookies, $q) {

    var currentUser = {};

    /**
     * TODO - User.get() returns a $promise, with '$resolved:false' despite of this 'current user is getting a value'
     * @author - ks
     * @date - 22/3/16
     * @time - 3:16 AM
     */
    //
    // if ($cookies.get('token')) {
    //
    //
    //
    //    User.get().$promise.then(function (data) {
    //
    //     currentUser = User.get();
    //
    //   },function (err) {
    //      logout();
    //    });
    //
    //
    // }


    /**
     * Authenticate user and save token
     */

    var login = function (user, callback) {

      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).success(function (res) {


        $cookies.put('token', res.data);

        User.get().$promise.then(function (user) {

          currentUser = user;
          deferred.resolve(user);

        });

        return cb(user);
      }).error(function (err) {

        logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;

    };


    /**
     * Delete access token and user info
     */

    var logout = function () {
      $cookies.remove('token');
      currentUser = {};
    };

    /**
     * Create a new user
     * @param user
     * @param callback
     * @returns {*|Function}
     */

    var createUser = function (user, callback) {

      var cb = callback || angular.noop;
      var deferred = $q.defer();

      User.save(user, function (data) {

          deferred.resolve(data);


          return cb(user);
        },
        function (err) {

          logout();
          deferred.reject(err);
          return cb(err);
        });

      return deferred.promise;
    };

    /**
     *  Gets all available info on a user
     * @returns {{}}
     */

    var getCurrentUser = function () {

      /**
       * TODO - <>##1 Working fine; Need some permanent fix of ##1
       * @author - ks
       * @date - 23/3/16
       * @time - 12:15 PM
       */

      var deferred = $q.defer();

      User.get().$promise.then(function (user) {
        currentUser = user;
        deferred.resolve(user);

      }, function (err) {
        logout();
        deferred.reject(err);
      });

      return deferred.promise;
    };

    /**
     * Check if a user is logged in
     * @returns {boolean}
     */

    var isLoggedIn = function () {

      if (_.isEmpty(currentUser)) {

        return false;
      }
      return currentUser.user.hasOwnProperty('role');
    };


    /**
     * Check if a user is an admin
     * @returns {boolean}
     */

    var isAdmin = function () {


      if (_.isEmpty(currentUser)) {

        return false;
      }

      return currentUser.user.role === 'admin';
    };

    /**
     * Get auth token
     * @returns {*}
     */

    var getToken = function getToken() {
      return $cookies.get('token');
    };

    return {
      login: login,
      logout: logout,
      createUser: createUser,
      isLoggedIn: isLoggedIn,
      getCurrentUser: getCurrentUser,
      isAdmin: isAdmin,
      getToken: getToken
    };fetchUserProfile

  };

  angular.module('coderDecoder2App').factory('Auth', ['$http', 'User', '$cookies', '$q', Auth]);

})();
