'use strict'

angular.module('chatApp')
.controller('ChatCtrl', function($scope, $reactive, $rootScope, $timeout, utils, $state, $window, $sce, marked) {
  var vm = this;

  $scope.viewModel(vm);

  vm.subscribe('messages');
  vm.subscribe('usersOnline');
  vm.subscribe('emojis');

  vm.helpers({
    messages: function() {
      return Messages.find({});
    },
    usersOnline: function() {
      return Meteor.users.find({}, { fields: { profile: 1 } });
    }
  });

  vm.init = function() {
    vm.msg = {};

    Meteor.call('get-details', function(err, profile) {
      vm.user = profile;
      utils.stopLoading(200);
    });
  };

  vm.saveMsg = function() {
    if(vm.msg.owner && !vm.msg.content) {
      vm.msg.content = '<span class="is-edited">- Deleted</span>';
    }

    if(/^.{1,1000}$/.test(vm.msg.content)) {

      if(!vm.msg.nickName) {
        vm.msg.nickName = vm.user.nickName;
      }

      Meteor.call('saveMessage', vm.msg);

      // clear content
      vm.msg = {};
    }
  };

  vm.parseHtml = function(msg) {

    if(msg) {
      var m = Emojis.parse(msg);

      m = m.replace(/https?:\/\/(.*?)\.(jpg|png|gif)(\?\w+=\w+)?/i, function(link) {
        return `![](${link})`;
      });

      return marked(m);
    }

    return msg;

  };

  vm.editMsg = function(msg) {
    vm.msg = angular.copy(msg);
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
