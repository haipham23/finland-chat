'use strict';

angular.module('chatApp')
.directive('loader', function($rootScope) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/loader/loader.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $rootScope.$on('start-loading', function() {
        elem.addClass('loader-active');
      });

      $rootScope.$on('stop-loading', function() {
        elem.removeClass('loader-active');
      });
    }
  };
});
