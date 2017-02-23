/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("loginManagerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"textProvider" : CORATEST.textProviderSpy()
		};
		var logoutMethodHasBeenCalled = false;
		function logoutMethod() {
			logoutMethodHasBeenCalled = true;
		}
		this.getLogoutMethodHasBeenCalled = function() {
			return logoutMethodHasBeenCalled;
		}

		var appTokenLoginRun = false;
		var webRedirectLoginRun = false;
		function testAppTokenLogin() {
			appTokenLoginRun = true;
		}
		this.getAppTokenLoginRun = function() {
			return appTokenLoginRun;
		}
		function testWebRedirectLogin() {
			webRedirectLoginRun = true;
		}
		this.getWebRedirectLoginRun = function() {
			return webRedirectLoginRun;
		}
		var loginOptions = [ {
			"text" : "appToken",
			"call" : testAppTokenLogin
		}, {
			"text" : "webRedirect uu",
			"call" : testWebRedirectLogin
		} ];
		this.spec = {
			"loginOptions" : loginOptions,
			"logoutMethod" : logoutMethod
		};

		this.loginManagerView;
		this.getLoginManagerView = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView;
		};
		this.getHtml = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView.getHtml();
		};
		this.getMenu = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView.getMenu();
		};
		this.openMenu = function() {
			var view = this.getHtml();
			var event = document.createEvent('Event');
			view.onclick(event);
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.type, "loginManagerView");
	assert.ok(this.loginManagerView);
});

QUnit.test("getDependencies", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.getDependencies(), this.dependencies);
});

QUnit.test("getSpec", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.getSpec(), this.spec);
});

QUnit.test("getHtml", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.className, "iconButton loginManagerView");
});

QUnit.test("testText", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.textContent, "theClient_loginMenuText");
	assert.strictEqual(this.dependencies.textProvider.getFetchedTextIdNo(0),
			"theClient_loginMenuText");
});

QUnit.test("testGetMenu", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = loginManagerView.getMenu();
	assert.strictEqual(menu.nodeName, "SPAN");
	assert.strictEqual(menu.className, "holder loginManagerView");

	assert.notVisible(menu);
	this.openMenu();
	assert.visible(menu);
});

QUnit.test("testLoginOptions", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");

	var event = document.createEvent('Event');
	menu.childNodes[0].onclick(event);
	assert.ok(this.getAppTokenLoginRun());

	var event2 = document.createEvent('Event');
	menu.childNodes[1].onclick(event2);
	assert.ok(this.getWebRedirectLoginRun());
});

QUnit.test("testSetUserId", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	var view = this.getHtml();
	loginManagerView.setUserId("someUserId");
	assert.strictEqual(view.textContent, "someUserId");
});

QUnit.test("testSetStateLoggedin", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	this.openMenu();
	loginManagerView.setState(CORA.loginManager.LOGGEDIN);
	assert.notVisible(menu);
	assert.strictEqual(menu.childNodes.length, 1);
	assert.strictEqual(menu.childNodes[0].textContent, "theClient_logoutMenuText");

	var event2 = document.createEvent('Event');
	menu.childNodes[0].onclick(event2);
	assert.ok(this.getLogoutMethodHasBeenCalled());

});

QUnit.test("testSetStateLoggedout", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	this.openMenu();
	loginManagerView.setState(CORA.loginManager.LOGGEDOUT);
	assert.notVisible(menu);

	var view = this.getHtml();
	assert.strictEqual(view.textContent, "theClient_loginMenuText");

	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");
});

QUnit.test("testSetStateFirstLoggedinThenLoggedout", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();

	loginManagerView.setState(CORA.loginManager.LOGGEDIN);
	loginManagerView.setUserId("someUserId");
	assert.strictEqual(menu.childNodes.length, 1);
	assert.strictEqual(menu.childNodes[0].textContent, "theClient_logoutMenuText");

	loginManagerView.setState(CORA.loginManager.LOGGEDOUT);

	var view = this.getHtml();
	assert.strictEqual(view.textContent, "theClient_loginMenuText");

	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");
});
