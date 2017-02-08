/*
 * Copyright 2016, 2017 Uppsala University Library
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
"use strict";

QUnit.module("loginManagerTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"loginManagerViewFactory" : CORATEST.loginManagerViewFactorySpy(),
			"appTokenLoginFactory" : CORATEST.appTokenLoginFactorySpy(),
			"authTokenHolder" : CORATEST.authTokenHolderSpy()
		};
		this.afterLoginMethod = function() {

		};
		var errorMessage;
		this.setErrorMessage = function(errorMessageIn) {
			errorMessage = errorMessageIn;
		}
		this.getErrorMessage = function() {
			return errorMessage;
		}
		this.spec = {
			"afterLoginMethod" : this.afterLoginMethod,
			"setErrorMessage" : this.setErrorMessage
		// "afterLogoutMethod":yy,
		// "afterUserInactiveMethod":zz
		};
		this.loginManager = CORA.loginManager(this.dependencies, this.spec);

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetDependencies", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getDependencies(), this.dependencies);
});
QUnit.test("testGetSpec", function(assert) {
	var loginManager = this.loginManager;
	assert.strictEqual(loginManager.getSpec(), this.spec);
});

QUnit.test("testInitCreatesALoginManagerView", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.ok(factoredView !== undefined);
});

QUnit.test("testInitCreatesALoginManagerViewsViewIsReturnedForGetHtml", function(assert) {
	var loginManager = this.loginManager;
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	var loginManagerHtml = loginManager.getHtml();
	assert.strictEqual(loginManagerHtml, factoredView.getHtml());
});

QUnit.test("testAppTokenLoginFactoryIsCalledOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenLogin(0);
	var factored1 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.ok(factored1);
	// var expectedSpec = {
	// "requestMethod" : "POST",
	// "url" : "http://localhost:8080/apptokenverifier/rest/apptoken/",
	// "accept" : "",
	// "authInfoCallback" : loginManager.appTokenAuthInfoCallback,
	// "errorCallback" : loginManager.appTokenErrorCallback,
	// "timeoutCallback" : loginManager.appTokenTimeoutCallback
	// };
	var spec0 = this.dependencies.appTokenLoginFactory.getSpec(0);
	assert.strictEqual(spec0.requestMethod, "POST");
	assert.strictEqual(spec0.url, "http://localhost:8080/apptokenverifier/rest/apptoken/");
	assert.strictEqual(spec0.accept, "");
	assert.strictEqual(spec0.authInfoCallback, loginManager.appTokenAuthInfoCallback);
	assert.strictEqual(spec0.errorCallback, loginManager.appTokenErrorCallback);
	assert.strictEqual(spec0.timeoutCallback, loginManager.appTokenTimeoutCallback);
});

QUnit.test("testAppTokenLoginCallsServerOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenLogin(0);
	var factored0 = this.dependencies.appTokenLoginFactory.getFactored(0);
	assert.strictEqual(factored0.getUserId(0), "131313");
	assert.strictEqual(factored0.getAppToken(0), "e11264ff-bb40-4fd4-973b-7be6461f0958");
});

QUnit.test("testAuthTokenIsSetInAuthTokenHolderOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	var authInfo = {
		"userId" : "131313",
		"token" : "fake authToken from here",
		"validForNoSeconds" : "131"
	};
	loginManager.appTokenAuthInfoCallback(authInfo);
	var authTokenHolder = this.dependencies.authTokenHolder;
	assert.strictEqual(authTokenHolder.getToken(0), "fake authToken from here");
});

QUnit.test("testUserIdIsSetInViewOnAppTokenLogin", function(assert) {
	var loginManager = this.loginManager;
	var authInfo = {
		"userId" : "141414",
		"token" : "fake authToken from here",
		"validForNoSeconds" : "131"
	};
	loginManager.appTokenAuthInfoCallback(authInfo);
	var factoredView = this.dependencies.loginManagerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getUserId(0), "141414");
});

QUnit.test("testErrorMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenErrorCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login failed!");
});

QUnit.test("testTimeoutMessage", function(assert) {
	var loginManager = this.loginManager;
	loginManager.appTokenTimeoutCallback();
	assert.strictEqual(this.getErrorMessage(), "AppToken login timedout!");
});
