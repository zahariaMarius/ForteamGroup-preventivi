/**
 * @Author: Zaharia Laurentiu Jr Marius
 * @Date:   2017-11-10T16:49:42+01:00
 * @Email:  laurentiu.zaharia@edu.itspiemonte.it
 * @Project: kebabCase
 * @Filename: indexScript.js
 * @Last modified by:   Zaharia Laurentiu Jr Marius
 * @Last modified time: 2017-11-10T18:46:04+01:00
 */

'use strict'

/**
 * [angular app module]
 * @type {[type]}
 */
var app = angular.module('indexAngularApp', []);

/**
 * [description]
 * @param  {[Object]} $scope [description]
 * @param  {[Object]} $http  [description]
 * @return {[type]}        [description]
 */
app.controller('indexController', function($scope, $http) {

	/**
	 * [userLoginAutentication scope retrive user Object from DB through autentication]
	 * @return {[type]} [description]
	 */
	$scope.userLoginAutentication = function() {
		$("i[id='errorAnimation']").removeClass('animated shake');
		var username = $scope.usernameLogin;
		var password = $scope.passwordLogin;
		var queryUserLogin = "SELECT * FROM utenti WHERE Username = '"+username+"' AND Password = '"+password+"'";
		$http.post('DataBase/DBM.php', {query: queryUserLogin}).then(function (response) {
			localStorage.setItem("user", JSON.stringify(response.data[0]));
			console.log(response.data[0]);
			//control if user exist and aplly the differt error style
			if (response.data[0]) {
				$scope.userNotExist = false;
				$("i[id='errorAnimation']").removeClass('animated shake');
				location.href = 'preventivo.html';
			}else {
				$scope.userNotExist = true;
				$("i[id='errorAnimation']").addClass('animated shake');
			}
		});
	}

});
