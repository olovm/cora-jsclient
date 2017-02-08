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
			var spec = {
				"requestMethod" : "POST",
				"url" : "http://localhost:8080/apptokenverifier/rest/apptoken/",
				"accept" : "",
				"authInfoCallback" : appTokenAuthInfoCallback,
				"errorCallback" : appTokenErrorCallback,
				"timeoutCallback" : appTokenTimeoutCallback
			};
			var appTokenLogin = dependencies.appTokenLoginFactory.factor(spec);
			appTokenLogin.login("131313", "e11264ff-bb40-4fd4-973b-7be6461f0958");
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