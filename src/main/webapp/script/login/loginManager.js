/*
 * Copyright 2016 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */
var CORA = (function(cora) {
	"use strict";
	cora.loginManager = function(dependencies, spec) {
		var out;
		var loginManagerView;

		function start() {
			loginManagerView = dependencies.loginManagerViewFactory.factor();

			var loginOptions = [ {
				"text" : "appToken as 131313",
				"call" : appTokenLogin
			} ];

			loginManagerView.setLoginOptions(loginOptions);
		}
		function appTokenLogin() {
			var appTokenLoginFactorySpec = {
				"requestMethod" : "POST",
				//"url" : "http://localhost:8080/apptokenverifier/rest/apptoken/",
				"url" : "http://epc.ub.uu.se/apptokenverifier/rest/apptoken/",
				"accept" : "",
				"authInfoCallback" : appTokenAuthInfoCallback,
				"errorCallback" : appTokenErrorCallback,
				"timeoutCallback" : appTokenTimeoutCallback
			};
			var factoredAppTokenLogin = dependencies.appTokenLoginFactory.factor(appTokenLoginFactorySpec);
			factoredAppTokenLogin.login("131313", "44c17361-ead7-43b5-a938-038765873037");
		}

		function getDependencies() {
			return dependencies;
		}

		function getHtml() {
			return loginManagerView.getHtml();
		}

		function appTokenAuthInfoCallback(authInfo) {
			dependencies.authTokenHolder.setCurrentAuthToken(authInfo.token);
			loginManagerView.setUserId(authInfo.userId);

			spec.afterLoginMethod();
		}
		function appTokenErrorCallback() {
			spec.setErrorMessage("AppToken login failed!");
		}
		function appTokenTimeoutCallback() {
			spec.setErrorMessage("AppToken login timedout!");
		}
		function getSpec() {
			// needed for test
			return spec;
		}
		out = Object.freeze({
			"type" : "loginManager",
			getDependencies : getDependencies,
			getHtml : getHtml,
			appTokenLogin : appTokenLogin,
			appTokenAuthInfoCallback : appTokenAuthInfoCallback,
			appTokenErrorCallback : appTokenErrorCallback,
			appTokenTimeoutCallback : appTokenTimeoutCallback,
			getSpec : getSpec
		});
		start();
		return out;
	};
	return cora;
}(CORA));