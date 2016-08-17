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
    usersOnline: function() {
      return Meteor.users.find({}, { fields: { profile: 1 } });
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
    if(vm.nickName === vm.user.nickName) {
      delete vm.nickName;
      return;
    }

    if(/^.{1,100}$/.test(vm.nickName)) {
      Meteor.call('save-nick', vm.nickName, function(err) {
        if(err) {
          toastr.error(err.error);
        } else {
          vm.user.nickName = vm.nickName;
          vm.subscribe('messages');

          $timeout(function() {
            delete vm.nickName;
          });
        }

      });
    }
  };

  vm.logout = function() {
    Meteor.logout(function() {
      $state.go('main');
    });
  };

  vm.init();
});
