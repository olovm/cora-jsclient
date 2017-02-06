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
	cora.loginManager = function(dependencies) {
		var out;
		var loginManagerView;

		function start() {
			loginManagerView = dependencies.loginManagerViewFactory.factor();
			// calculateListOfLogins
			
			var loginOptions = [ {
				"text" : "appToken as 131313",
				"call" : function(){appTokenLogin(0);}
			}, {
				"text" : "webRedirect uu",
				"call" : appTokenLogin
			}, {
				"text" : "webRedirect gbg",
				"call" : appTokenLogin
			} ];

			 loginManagerView.setLoginOptions(loginOptions);
		}
		function appTokenLogin(numberInList){
			if(numberInList === 0 ){
				alert(numberInList);
				var spec = {
						"requestMethod" : "POST",
						"url" : "http://localhost:8080/apptokenverifier/rest/apptoken/",
						"accept" : "",
						"authInfoCallback" : function(authInfoIn) {
							authInfo = authInfoIn;
						},
						"errorCallback" : function(error) {
							errorInfo = error;
						},
						"timeoutCallback" : function(timeout) {
							timeoutInfo = timeout;
						}
					}
				dependencies.appTokenLoginFactory.factor(spec);
			}else{
				
				alert("hej 2");
			}
			
		}

		function getDependencies() {
			return dependencies;
		}

		function getHtml() {
			return loginManagerView.getHtml();
		}

		out = Object.freeze({
			"type" : "loginManager",
			getDependencies : getDependencies,
			getHtml : getHtml,
			appTokenLogin:appTokenLogin
		});
		start();
		return out;
	};
	return cora;
}(CORA));