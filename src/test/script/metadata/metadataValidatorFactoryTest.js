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
QUnit.module("metadataValidatorFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			// "metadataProvider" : CORATEST.metadataProviderSpy(),
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy()
		};
		this.spec = {
			"metadataId" : "groupIdOneTextChild",
			"data" : undefined,
		};
		this.metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	assert.strictEqual(metadataValidatorFactory.type, "metadataValidatorFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	var metadataValidatorFactory = CORA.metadataValidatorFactory(this.dependencies);
	assert.strictEqual(metadataValidatorFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var metadataController = this.metadataValidatorFactory.factor(this.spec);
	assert.strictEqual(metadataController.type, "metadataValidator");
});

// QUnit.test("testSpec", function(assert) {
// var metadataController = this.metadataValidatorFactory.factor(this.spec);
// var factoredSpec = metadataController.getSpec();
// assert.strictEqual(factoredSpec.metadataId, this.spec.metadataId);
// assert.strictEqual(factoredSpec.data, this.spec.data);
// });
//
// QUnit.test("testSpecThatReallyShouldBeDependency", function(assert) {
// var metadataController = this.metadataValidatorFactory.factor(this.spec);
// var factoredSpec = metadataController.getSpec();
// assert.strictEqual(factoredSpec.metadataProvider, this.dependencies.metadataProvider);
// assert.strictEqual(factoredSpec.pubSub, this.dependencies.pubSub);
// });
