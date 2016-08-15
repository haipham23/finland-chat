'use strict';

angular.module('chatApp')
.factory('utils', function($q, $rootScope, $timeout, $window) {

	// Public API
	return {
		getInt: getInt,
		startLoading: startLoading,
		stopLoading: stopLoading,
		changePassword: changePassword,
		getLabel: getLabel,
		displayMsg: displayMsg
	};

	function getInt(str) {
		var _num = 0;
		if(str) {
			if(angular.isNumber(str)) {
				_num = str * 1;
			} else {
				_num = str.replace(/[^0-9]+/gi, '');
				_num = parseInt(_num, 10);
			}
		}
		return angular.isNumber(_num) ? _num : 0;
	}

	function startLoading(time) {
		$timeout(function() {
			$rootScope.$emit('start-loading');
		}, time);
	}

	function stopLoading(time) {
		$timeout(function() {
			$rootScope.$emit('stop-loading');
		}, time);
	}

	function changePassword(newPass, oldPass) {
		return $q(function(resolve, reject) {
			Accounts.changePassword(newPass, oldPass, function(err) {
				if(err) reject(err);
				else resolve('SUCCESS');
			});
		});
	}

	function getLabel(str) {
		if(str.length > 0) {
			var brIdx = str.indexOf('\n');
			return brIdx > -1 ? str.substr(0, brIdx) : str;
		} else {
			return 'New Note';
		}
	}

	function displayMsg(str) {
		return Materialize.toast(str, 3000);
	}
});
