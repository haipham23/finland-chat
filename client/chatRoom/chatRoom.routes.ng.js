'use strict'

angular.module('chatApp')
.config(function($stateProvider) {
  $stateProvider
  .state('chatRoom', {
    url: '/room',
    templateUrl: 'client/chatRoom/chatRoom.view.html',
    controller: 'ChatCtrl',
    controllerAs: 'chat',
    resolve: {
      currentUser: ['auth', '$state', function(auth, $state) {
        auth.login().then(function(account) {
          return account;
        }, function(err) {
          return $state.go('main');
        });
      }]
    }
  });
});
