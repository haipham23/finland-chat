'use strict'

angular.module('chatApp')
.controller('ChatCtrl', function($scope, $reactive, $rootScope, $timeout, utils, $state, $window) {
  var vm = this;

  $scope.viewModel(vm);

  vm.subscribe('messages');

  vm.helpers({
    messages: function() {
      return Messages.find({});
    }
  });

  vm.init = function() {
    vm.content = '';

    $timeout(function() {
      vm.user = Meteor.user();
      vm.nickName = vm.user.profile.nickName;
      utils.stopLoading(200);
    }, 1000);
  };

  vm.add = function() {

    if(!!vm.content) {
      var msg = {
        content: vm.content,
        nickName: vm.user.profile.nickName
      };

      Meteor.call('chat-insert', msg);

      // clear content
      vm.content = '';
    }
  };

  vm.saveNick = function() {
    if(vm.nickName && /^([a-zA-Z0-9]){3,10}$/.test(vm.nickName)) {
      vm.user.profile.nickName = vm.nickName;
      Meteor.call('save-nick', vm.nickName);
      vm.isEdit = false;
    }
  };

  vm.logout = function() {
    Meteor.logout(function() {
      $state.go('main');
    });
  };

  vm.init();
});
