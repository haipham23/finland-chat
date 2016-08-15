'use strict';

angular.module('chatApp')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  // markedProvider.setOptions({
  //   gfm: true,
  //   break: true,
  //   smartypants: true
  // });
});
