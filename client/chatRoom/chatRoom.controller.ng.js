'use strict'

angular.module('chatApp')
.controller('ChatCtrl', function($scope, $reactive, $rootScope, $timeout, utils, $state, $window) {
  var vm = this;

  $scope.viewModel(vm);

  vm.subscribe('messages');
  vm.subscribe('usersOnline');

  vm.helpers({
    messages: function() {
      return Messages.find({});
    },
    userList: function() {
      return Meteor.users.find({ 'status.online': true });
    }
  });

  vm.init = function() {
    vm.content = '';

    $timeout(function() {
      vm.user = Meteor.user();
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
    if(!!vm.nickName) {
      Meteor.call('save-nick', vm.user.profile.nickName);
    }

    vm.isEdit = false;
  };

  vm.select = function(n) {
    return vm.currentNote = n;
  };

  vm.logout = function() {
    Meteor.logout(function() {
      $state.go('main');
    });
  };

  vm.init();
});
