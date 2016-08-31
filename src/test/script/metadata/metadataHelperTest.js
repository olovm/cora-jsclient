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

QUnit.test("testGetChildRefPartOfMetadata", function(assert) {
	var parentMetadata = {
		"name" : "metadata",
		"attributes" : {
			"type" : "group"
		},
		"children" : [ {
			"name" : "childReferences",
			"children" : [ {
				"name" : "childReference",
				"repeatId" : "1",
				"children" : [ {
					"name" : "ref",
					"value" : "textVariableId"
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ]
			} ]
		}, {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "groupIdOneTextChild"
			}, {
				"name" : "type",
				"value" : "metadataGroup"
			}, {
				"name" : "createdBy",
				"value" : "userId"
			}, {
				"name" : "updatedBy",
				"value" : "userId"
			} ]
		}, {
			"name" : "nameInData",
			"value" : "groupIdOneTextChild"
		}, {
			"name" : "textId",
			"value" : "groupIdOneTextChildText"
		}, {
			"name" : "defTextId",
			"value" : "groupIdOneTextChildDefText"
		} ]
	};

	var cParentMetadataChildRefPart = this.metadataHelper.getChildRefPartOfMetadata(CORA
			.coraData(parentMetadata), "textVariableId");
	var expectedData = {
		"name" : "childReference",
		"repeatId" : "1",
		"children" : [ {
			"name" : "ref",
			"value" : "textVariableId"
		}, {
			"name" : "repeatMin",
			"value" : "1"
		}, {
			"name" : "repeatMax",
			"value" : "1"
		} ]
	};
	assert.stringifyEqual(cParentMetadataChildRefPart.getData(), expectedData);
});

QUnit.test("testSameAttributeUndefined", function(assert) {
	assert.ok(this.metadataHelper.attributesMatch(undefined, undefined));
});

QUnit.test("testSameAttributeOneUndefined", function(assert) {
	var attribute1 = {};
	assert.ok(this.metadataHelper.attributesMatch(attribute1, undefined));
	var attribute2 = {};
	assert.ok(this.metadataHelper.attributesMatch(undefined, attribute2));
});

QUnit.test("testSameAttributeEmpty", function(assert) {
	var attribute1 = {};
	var attribute2 = {};
	assert.ok(this.metadataHelper.attributesMatch(attribute1, attribute2));
});

QUnit.test("testSameAttributeOneEmpty", function(assert) {
	var attribute1 = {
		"anAttribute" : [ "aFinalValue" ]
	};
	var attribute2 = {};
	assert.notOk(this.metadataHelper.attributesMatch(attribute1, attribute2));
});

QUnit.test("testattributesMatchame", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	assert.ok(this.metadataHelper.attributesMatch(attribute1, attribute2));
});

QUnit.test("testSameAttributeDifferentAttributeValues", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	assert.ok(this.metadataHelper.attributesMatch(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentAttributeValues", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	assert.ok(this.metadataHelper.attributesMatch(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferent", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
	};
	assert.notOk(this.metadataHelper.attributesMatch(attribute1, attribute2));
});
QUnit.test("testSameAttributeDifferentName", function(assert) {
	var attribute1 = {
		"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
	};
	var attribute2 = {
		"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
	};
	assert.notOk(this.metadataHelper.attributesMatch(attribute1, attribute2));
});
