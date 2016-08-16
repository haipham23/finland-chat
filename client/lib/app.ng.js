angular.module('chatApp', [
  'angular-meteor',
  'ui.router',
  'ngSanitize'
]);

onReady = function() {
  angular.bootstrap(document, ['chatApp']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
