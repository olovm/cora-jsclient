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

QUnit.module("indexHandlerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"uploadManager" : CORATEST.uploadManagerSpy()
		};
		this.spec = {
			"dataList" : CORATEST.listWithDataToIndex.dataList
		};
		this.indexHandlerFactory = CORA.indexHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.indexHandlerFactory);
	assert.strictEqual(this.indexHandlerFactory.type, "indexHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.indexHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var indexHandler = this.indexHandlerFactory.factor(this.spec);
	assert.ok(indexHandler);
	assert.strictEqual(indexHandler.type, "indexHandler");
});

QUnit.test("factorTestUsedIncomingDependencies", function(assert) {
	var indexHandler = this.indexHandlerFactory.factor(this.spec);
	var createdDependencies = indexHandler.getDependencies();
	assert.strictEqual(createdDependencies.ajaxCallFactory,
			this.dependencies.ajaxCallFactory);
	assert.strictEqual(createdDependencies.uploadManager,
		this.dependencies.uploadManager);

});

QUnit.test("factorTestSpec", function(assert) {
	var indexHandler = this.indexHandlerFactory.factor(this.spec);
	var indexHandlerSpec = indexHandler.getSpec();
	assert.strictEqual(indexHandlerSpec, this.spec);
});
