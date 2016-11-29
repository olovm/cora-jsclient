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
"use strict";

QUnit.module("loginManagerTest.js", {
	beforeEach : function() {

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManager = CORA.loginManager();
	assert.strictEqual(loginManager.type, "loginManager");
});

QUnit.test("testGetCurrentAuthToken", function(assert) {
	var loginManager = CORA.loginManager();
	assert.strictEqual(loginManager.getCurrentAuthToken(), "");
});

QUnit.test("testHasCurrentAuthToken", function(assert) {
	var loginManager = CORA.loginManager();
	assert.notOk(loginManager.hasCurrentAuthToken());
});

QUnit.test("testSetCurrentAuthToken", function(assert) {
	var loginManager = CORA.loginManager();
	loginManager.setCurrentAuthToken("someToken");
	assert.strictEqual(loginManager.getCurrentAuthToken(), "someToken");
});

QUnit.test("testSetCurrentAuthTokenResultsInHasTokenTrue", function(assert) {
	var loginManager = CORA.loginManager();
	loginManager.setCurrentAuthToken("someToken");
	assert.ok(loginManager.hasCurrentAuthToken());
});

