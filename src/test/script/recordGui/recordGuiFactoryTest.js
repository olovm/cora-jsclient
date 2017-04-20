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
QUnit.module("recordGuiFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			// "metadataProvider" : CORATEST.metadataProviderSpy(),
			"textProvider" : CORATEST.textProviderStub(),
		};
		this.spec = {
			"metadataId" : "groupIdOneTextChild",
			"data" : {},
			"dataDivider" : "someDataDivider"
		};
		this.recordGuiFactory = CORA.recordGuiFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var recordGuiFactory = CORA.recordGuiFactory(this.dependencies);
	assert.strictEqual(recordGuiFactory.type, "recordGuiFactory");
});

QUnit.test("testFactor", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	assert.strictEqual(recordGui.type, "recordGui");
});

QUnit.test("testFactorSpec", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	assert.strictEqual(recordGui.getSpec(), this.spec);
});

QUnit.test("testFactorDependencies", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var factoredDependencies = recordGui.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(factoredDependencies.textProvider, this.dependencies.textProvider);
});
// TODO: test pubSub, dataHolder, jsBookkeeper, presentationFactory

QUnit.test("testFactorDependencyPresentationHolderFactory", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var presentationHolderFactory = recordGui.getDependencies().presentationHolderFactory;
	assert.strictEqual(presentationHolderFactory.type, "presentationHolderFactory");
	// var dependenciesPH = presentationHolderFactory.getDependencies();
	// assert.strictEqual(dependenciesPH.metadataProvider, this.dependencies.metadataProvider);
	// assert.strictEqual(dependenciesPH.pubSub.type, "pubSub");
});

QUnit.test("testFactorDependencyMetadataController", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var metadataControllerFactory = recordGui.getDependencies().metadataControllerFactory;
	assert.strictEqual(metadataControllerFactory.type, "metadataControllerFactory");
	var dependenciesCF = metadataControllerFactory.getDependencies();
	assert.strictEqual(dependenciesCF.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(dependenciesCF.pubSub.type, "pubSub");
});

QUnit.test("testFactorDependencyMetadataValidator", function(assert) {
	var recordGui = this.recordGuiFactory.factor(this.spec);
	var metadataValidatorFactory = recordGui.getDependencies().metadataValidatorFactory;
	assert.strictEqual(metadataValidatorFactory.type, "metadataValidatorFactory");
	var dependenciesMV = metadataValidatorFactory.getDependencies();
	assert.strictEqual(dependenciesMV.metadataProvider, this.dependencies.metadataProvider);
	assert.strictEqual(dependenciesMV.pubSub.type, "pubSub");
});
