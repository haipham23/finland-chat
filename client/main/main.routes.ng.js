'use strict'

angular.module('chatApp')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'client/main/main.view.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  });
});
