/*
 * Copyright 2017 Olov McKie
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

QUnit.module("recordHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"workItemViewFactory" : CORATEST.workItemViewFactorySpy()
		};
		this.spec = {
			"presentationId" : "pVarTextVariableId"
		};
		this.recordHandlerViewFactory = CORA.recordHandlerViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordHandlerViewFactory);
	assert.strictEqual(this.recordHandlerViewFactory.type, "recordHandlerViewFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordHandlerViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordHandlerView = this.recordHandlerViewFactory.factor(this.spec);
	assert.ok(recordHandlerView);
	assert.strictEqual(recordHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var recordHandlerView = this.recordHandlerViewFactory.factor(this.spec);
	assert.ok(recordHandlerView);
	assert.strictEqual(recordHandlerView.type, "recordHandlerView");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordHandlerView = this.recordHandlerViewFactory.factor(this.spec);
	var recordHandlerViewSpec = recordHandlerView.getSpec();
	assert.strictEqual(recordHandlerViewSpec, this.spec);
});
