/*
 * Copyright 2018 Uppsala University Library
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

QUnit.module("recordTypeMenuTest.js", {
	beforeEach : function() {
		var providers = {
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub()
		};
		this.providers = providers;

		this.dependencies = {};
		this.spec = {};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var sorter = CORA.recordTypeMenu(this.providers, {}, {});
	assert.strictEqual(sorter.type, "recordTypeMenu");
});

QUnit.test("testGetProviders", function(assert) {
	var menu = CORA.recordTypeMenu(this.providers, this.dependencies, {});
	assert.strictEqual(menu.getProviders(), this.providers);
});

QUnit.test("testGetDependencies", function(assert) {
	var menu = CORA.recordTypeMenu(this.providers, this.dependencies, {});
	assert.strictEqual(menu.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
	assert.strictEqual(menu.getSpec(), this.spec);
});
