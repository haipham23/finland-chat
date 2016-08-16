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

    Meteor.call('get-details', function(err, profile) {
      vm.user = profile;
      utils.stopLoading(200);
    });
  };

  vm.add = function() {

    if(/^.{1,1000}$/.test(vm.content)) {

      var content = angular.copy(vm.content);

      if(/^.*(jpg|png|svg|gif).*/.test(content)) {
        content = `<img src="${content}"/>`;
      }

      var msg = {
        content: content,
        nickName: vm.user.nickName
      };

      Meteor.call('chat-insert', msg);

      // clear content
      vm.content = '';
    }
  };

  vm.saveNick = function() {
    if(/^([a-zA-Z0-9\s]){3,10}$/.test(vm.user.nickName)) {
      Meteor.call('save-nick', vm.user.nickName, function(err) {
        vm.subscribe('messages');
      });

      vm.isNickEdit = false;
    }
  };

  vm.logout = function() {
    Meteor.logout(function() {
      $state.go('main');
    });
  };

  vm.init();
});
