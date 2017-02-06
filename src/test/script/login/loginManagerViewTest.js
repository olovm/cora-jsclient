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
		this.spec = {};

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
});

QUnit.test("testSetLoginOptions", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	var menu = this.getMenu();
	var appTokenLoginRun = false;
	var webRedirectLoginRun = false;
	function testAppTokenLogin() {
		appTokenLoginRun = true;
	}
	function testWebRedirectLogin() {
		webRedirectLoginRun = true;
	}
	var loginOptions = [ {
		"text" : "appToken",
		"call" : testAppTokenLogin
	}, {
		"text" : "webRedirect uu",
		"call" : testWebRedirectLogin
	} ];
	loginManagerView.setLoginOptions(loginOptions);
	assert.strictEqual(menu.childNodes.length, 2);
	assert.strictEqual(menu.childNodes[0].textContent, "appToken");
	assert.strictEqual(menu.childNodes[1].textContent, "webRedirect uu");
	
	
	var event = document.createEvent('Event');
	menu.childNodes[0].onclick(event);
	assert.ok(appTokenLoginRun);
	
	var event2 = document.createEvent('Event');
	menu.childNodes[1].onclick(event2);
	assert.ok(webRedirectLoginRun);
	
});
