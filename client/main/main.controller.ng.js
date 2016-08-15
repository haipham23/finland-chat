'use strict'

angular.module('chatApp')
.controller('MainCtrl', function($scope, $reactive, utils, $state) {
  const vm = this;

  $reactive(vm).attach($scope);

  vm.init = function() {
    vm.errors = {};
    vm.rules = {};

    // stop loading
    utils.stopLoading(1000);
  };

  // function: login
  vm.loginWithFacebook = function() {
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email']
    }, function(err) {
      if (err) {
        throw new Meteor.Error('Facebook login failed');
      } else {
        vm.start();
      }
    });
  };

  vm.loginWithGoogle = function() {
    Meteor.loginWithGoogle({
      requestPermissions: ['public_profile', 'email']
    }, function(err) {
      if (err) {
        throw new Meteor.Error('Google login failed');
      } else {
        vm.start();
      }
    });
  };

  vm.start = function() {
    utils.startLoading(0);
    $state.go('chatRoom');
  };

  vm.init();
});
