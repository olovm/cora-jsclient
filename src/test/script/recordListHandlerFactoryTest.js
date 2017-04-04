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

QUnit.module("recordListHandlerFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"managedGuiItemFactory" : CORATEST
					.standardFactorySpy("managedGuiItemSpy")
		};
		this.spec = {
			"presentationId" : "pVarTextVariableId",
			"recordTypeRecord" : CORATEST.recordTypeRecord,
			"jsClient" : CORATEST.jsClientSpy()
		};
		this.recordListHandlerFactory = CORA
				.recordListHandlerFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.recordListHandlerFactory);
	assert.strictEqual(this.recordListHandlerFactory.type,
			"recordListHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.recordListHandlerFactory.getDependencies(),
			this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	assert.ok(recordListHandler);
	// assert.strictEqual(recordListHandler.getDependencies(),
	// this.dependencies);
	assert.strictEqual(
			recordListHandler.getDependencies().managedGuiItemFactory.type,
			"managedGuiItemFactory");
});

QUnit.test("factorTestType", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	assert.ok(recordListHandler);
	assert.strictEqual(recordListHandler.type, "recordListHandler");
});

QUnit.test("factorTestSpec", function(assert) {
	var recordListHandler = this.recordListHandlerFactory.factor(this.spec);
	var recordListHandlerSpec = recordListHandler.getSpec();
	assert.strictEqual(recordListHandlerSpec, this.spec);
});
