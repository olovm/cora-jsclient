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
QUnit.module("metadataHelperTest.js", {
	beforeEach : function() {
		this.metadataHelper = CORA.metadataHelper({
			"metadataProvider" : new MetadataProviderStub()
		})
	},
	afterEach : function() {
	}
});

QUnit.test("testNoAttributes", function(assert) {
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChild");
	assert.stringifyEqual(attributesObject, {});
});

QUnit.test("testOneAttributes", function(assert) {
	var expectedObject = {
		"anAttribute" : [ "aFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildOneAttribute");
	assert.stringifyEqual(attributesObject, expectedObject);
});

QUnit.test("testTwoAttributes", function(assert) {
	var expectedObject = {
		"anAttribute" : [ "aFinalValue" ],
		"anOtherAttribute" : [ "aOtherFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildTwoAttributes");
	assert.stringifyEqual(attributesObject, expectedObject);
});

QUnit.test("testAbstractAttributes", function(assert) {
	var expectedObject = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attributesObject = this.metadataHelper
			.collectAttributesAsObjectForMetadataId("textVarRepeat1to3InGroupParentAttribute");
	assert.stringifyEqual(attributesObject, expectedObject);
});