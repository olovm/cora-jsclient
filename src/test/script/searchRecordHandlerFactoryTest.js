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

QUnit.module("searchRecordHandlerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
				"messageHolderFactory" : CORATEST.messageHolderFactorySpy()
		};
		this.spec = {
				"name" : "someName"
		}
		this.searchRecordHandlerFactory = CORA.searchRecordHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.searchRecordHandlerFactory);
	assert.strictEqual(this.searchRecordHandlerFactory.type, "searchRecordHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.searchRecordHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var jsClientView = this.searchRecordHandlerFactory.factor(this.spec);
	assert.strictEqual(jsClientView.type, "jsClientView");

	var jsClientViewSpec = jsClientView.getSpec();
	assert.strictEqual(jsClientViewSpec, this.spec);
});
