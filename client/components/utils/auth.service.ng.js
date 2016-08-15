'use strict';

angular.module('chatApp')
.factory('auth', function($q) {

  return {
    login: login
  };

  function login() {
    return $q(function(resolve, reject) {
      var user = Meteor.userId();
      user ? resolve(user) : reject('AUTH_REQUIRED');
    });
  }
});
