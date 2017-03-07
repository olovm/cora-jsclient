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

QUnit.module("pChildRefHandlerViewFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {};
		this.spec = {
			"presentationId" : "pVarTextVariableId"
		};
		this.pChildRefHandlerViewFactory = CORA.pChildRefHandlerViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.pChildRefHandlerViewFactory);
	assert.strictEqual(this.pChildRefHandlerViewFactory.type, "pChildRefHandlerViewFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.pChildRefHandlerViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var pChildRefHandlerView = this.pChildRefHandlerViewFactory.factor(this.spec);
	assert.ok(pChildRefHandlerView);
	assert.strictEqual(pChildRefHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var pChildRefHandlerView = this.pChildRefHandlerViewFactory.factor(this.spec);
	assert.ok(pChildRefHandlerView);
	assert.strictEqual(pChildRefHandlerView.type, "pChildRefHandlerView");
});

QUnit.test("factorTestSpec", function(assert) {
	var pChildRefHandlerView = this.pChildRefHandlerViewFactory.factor(this.spec);
	var pChildRefHandlerViewSpec = pChildRefHandlerView.getSpec();
	assert.strictEqual(pChildRefHandlerViewSpec, this.spec);
});
