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
QUnit.module("numberVariableValidatorTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		var dependencies = {
			"metadataProvider" : this.metadataProvider,
//			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
//			"recordGuiFactory" : CORATEST.recordGuiFactorySpy(),
//			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
//			"resultHandlerFactory" : CORATEST.standardFactorySpy("resultHandlerSpy")
		};
		this.dependencies = dependencies;
		
		this.numberValidator;
		this.getNumberValidator = function() {
			if (this.numberValidator === undefined) {
				this.numberValidator = CORA.numberVariableValidator(this.dependencies);
			}
			return this.numberValidator;
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var numberValidator = this.getNumberValidator();
	assert.strictEqual(numberValidator.type, "numberVariableValidator");
	assert.ok(this.numberValidator);
});

//QUnit.test("getDependencies", function(assert) {
//	var numberValidator = CORA.numberVariableValidator(this.dependencies);
//	var cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
//	
//	assert.strictEqual(numberValidator.getDependencies(), this.dependencies);
//});
//QUnit.test("testNotANumber", function(assert) {
////	var attachedPNumVar = this.pNumVarFactory.factor({}, "numVariableId", "pNumVarNumVariableId");
//	var validator = CORA.numberVariableValidator(this.dependencies);
//	
//	var cMetadataElement = CORA.coraData(this.dependencies.metadataProvider.getMetadataById("numVariableId"));
//	
//	var attributesObject = validator
//			.validateData("2", cMetadataElement);
//	assert.stringifyEqual(attributesObject, {});
//});

//QUnit.test("testOneAttributes", function(assert) {
//	var expectedObject = {
//		"anAttribute" : [ "aFinalValue" ]
//	};
//	var attributesObject = this.metadataHelper
//			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildOneAttribute");
//	assert.stringifyEqual(attributesObject, expectedObject);
//});
//
//QUnit.test("testTwoAttributes", function(assert) {
//	var expectedObject = {
//		"anAttribute" : [ "aFinalValue" ],
//		"anOtherAttribute" : [ "aOtherFinalValue" ]
//	};
//	var attributesObject = this.metadataHelper
//			.collectAttributesAsObjectForMetadataId("groupIdOneTextChildTwoAttributes");
//	assert.stringifyEqual(attributesObject, expectedObject);
//});
//
//QUnit.test("testAbstractAttributes", function(assert) {
//	var expectedObject = {
//		"recordTypeTypeCollectionVar" : [ "aFinalValue", "aOtherFinalValue" ]
//	};
//	var attributesObject = this.metadataHelper
//			.collectAttributesAsObjectForMetadataId("textVarRepeat1to3InGroupParentAttribute");
//	assert.stringifyEqual(attributesObject, expectedObject);
//});
//
//QUnit.test("testGetChildRefPartOfMetadata", function(assert) {
//	var parentMetadata = {
//		"name" : "metadata",
//		"attributes" : {
//			"type" : "group"
//		},
//		"children" : [ {
//			"name" : "childReferences",
//			"children" : [ {
//				"name" : "childReference",
//				"repeatId" : "1",
//				"children" : [ {
//					"name" : "ref",
//					"children": [
//						{
//							"name": "linkedRecordType",
//							"value": "metadataTextVariable"
//						},
//						{
//							"name": "linkedRecordId",
//							"value": "textVariableId"
//						}
//					],"attributes": {
//						"type": "textVariable"
//					}
//				}, {
//					"name" : "repeatMin",
//					"value" : "1"
//				}, {
//					"name" : "repeatMax",
//					"value" : "1"
//				} ]
//			} ]
//		}, {
//			"name" : "recordInfo",
//			"children" : [ {
//				"name" : "id",
//				"value" : "groupIdOneTextChild"
//			}, 
//			 {
//				"name" : "type",
//				"children": [
//					{
//						"name": "linkedRecordType",
//						"value": "recordType"
//					},
//					{
//						"name": "linkedRecordId",
//						"value": "metadataGroup"
//					}
//				]
//			}, 
//			{
//				"name" : "createdBy",
//				"children": [
//					{
//						"name": "linkedRecordType",
//						"value": "user"
//					},
//					{
//						"name": "linkedRecordId",
//						"value": "userId"
//					}
//				]
//			}, {
//				"name" : "updatedBy",
//				"value" : "userId"
//			} ]
//		}, {
//			"name" : "nameInData",
//			"value" : "groupIdOneTextChild"
//		}, {
//			"name" : "textId",
//			"value" : "groupIdOneTextChildText"
//		}, {
//			"name" : "defTextId",
//			"value" : "groupIdOneTextChildDefText"
//		} ]
//	};
//
//	var cParentMetadataChildRefPart = this.metadataHelper.getChildRefPartOfMetadata(CORA
//			.coraData(parentMetadata), "textVariableId");
//	var expectedData = {
//		"name" : "childReference",
//		"repeatId" : "1",
//		"children" : [ {
//			"name" : "ref",
//			"children": [
//				{
//					"name": "linkedRecordType",
//					"value": "metadataTextVariable"
//				},
//				{
//					"name": "linkedRecordId",
//					"value": "textVariableId"
//				}
//			],"attributes": {
//				"type": "textVariable"
//			}
//		}, {
//			"name" : "repeatMin",
//			"value" : "1"
//		}, {
//			"name" : "repeatMax",
//			"value" : "1"
//		} ]
//	};
//	assert.stringifyEqual(cParentMetadataChildRefPart.getData(), expectedData);
//});
//assert.ok(this.metadataHelper.firstAttributesExistsInSecond(undefined, attribute2));
//});





