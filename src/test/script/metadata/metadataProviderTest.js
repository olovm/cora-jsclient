/*
 * Copyright 2016 Olov McKie
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

QUnit.module("metadataProviderTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		var metadataListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/metadata/",
			"accept" : "application/uub+recordList+json"
		};
		var presentationListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/presentation/",
			"accept" : "application/uub+recordList+json"
		};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/uub+recordList+json"
		};
		var spec = {
			"dependencies" : dependencies,
			"metadataListLink" : metadataListLink,
			"textListLink" : textListLink,
			"presentationListLink" : presentationListLink
		};
		this.spec = spec;
		this.metadataListLink = metadataListLink;
		this.metadataListLinkJson = JSON.stringify(this.metadataListLink);
		this.presentationListLink = presentationListLink;
		this.presentationListLinkJson = JSON.stringify(this.presentationListLink);
		this.textListLink = textListLink;
		this.textListLinkJson = JSON.stringify(this.textListLink);

		this.metadataAnswer = {
			"responseText" : JSON.stringify(CORATEST.metadataList)
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	function assertAjaxCallSpecIsCorrect(ajaxCallSpy, recordType) {
		var ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/" + recordType
				+ "/");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/uub+recordList+json");
		assert.strictEqual(ajaxCallSpec.loadMethod, metadataProvider.processFetchedMetadata);
	}
	var metadataProvider = CORA.metadataProvider(this.spec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	assertAjaxCallSpecIsCorrect(ajaxCallSpy0, "metadata");

	var ajaxCallSpy1 = this.ajaxCallFactorySpy.getFactored(1);
	assertAjaxCallSpecIsCorrect(ajaxCallSpy1, "presentation");

	var ajaxCallSpy2 = this.ajaxCallFactorySpy.getFactored(2);
	assertAjaxCallSpecIsCorrect(ajaxCallSpy2, "text");
});

QUnit.test("callWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	this.spec.callWhenReady = providerReady;
	var metadataProvider = CORA.metadataProvider(this.spec);

	var metadataAnswer = {
		"responseText" : JSON.stringify(CORATEST.metadataList)
	};

	assert.notOk(providerStarted);
	metadataProvider.processFetchedMetadata(metadataAnswer);

	assert.notOk(providerStarted);
	metadataProvider.processFetchedMetadata(metadataAnswer);

	assert.notOk(providerStarted);
	metadataProvider.processFetchedMetadata(metadataAnswer);

	assert.ok(providerStarted);
});

QUnit.test("callWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	// this.spec.callWhenReady = providerReady;
	var metadataProvider = CORA.metadataProvider(this.spec);

	metadataProvider.processFetchedMetadata(this.metadataAnswer);
	metadataProvider.processFetchedMetadata(this.metadataAnswer);
	metadataProvider.processFetchedMetadata(this.metadataAnswer);

	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredLinksIsNotChanged", function(assert) {
	var metadataProvider = CORA.metadataProvider(this.spec);

	var metadataListLinkJson = this.metadataListLinkJson;
	var metadataListLinkJsonAfter = JSON.stringify(this.metadataListLink);
	assert.deepEqual(metadataListLinkJsonAfter, metadataListLinkJson);

	var presentationListLinkJson = this.presentationListLinkJson;
	var presentationListLinkJsonAfter = JSON.stringify(this.presentationListLink);
	assert.deepEqual(presentationListLinkJsonAfter, presentationListLinkJson);

	var textListLinkJson = this.textListLinkJson;
	var textListLinkJsonAfter = JSON.stringify(this.textListLink);
	assert.deepEqual(textListLinkJsonAfter, textListLinkJson);
});

QUnit.test("getMetadataById", function(assert) {
	var metadataProvider = CORA.metadataProvider(this.spec);
	metadataProvider.processFetchedMetadata(this.metadataAnswer);
	var expected = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textPart"
		}, {
			"children" : [ {
				"name" : "id",
				"value" : "textPartEnGroup"
			}, {
				"name" : "type",
				"value" : "metadataGroup"
			}, {
				"name" : "createdBy",
				"value" : "userId"
			}, {
				"name" : "updatedBy",
				"value" : "userId"
			} ],
			"name" : "recordInfo"
		}, {
			"name" : "textId",
			"value" : "textPartEnGroupText"
		}, {
			"name" : "defTextId",
			"value" : "textPartEnGroupDefText"
		}, {
			"children" : [ {
				"repeatId" : "1",
				"children" : [ {
					"name" : "ref",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataTextVariable"
						},
						{
							"name": "linkedRecordId",
							"value": "textTextVar"
						}
					],"attributes": {
						"type": "textVariable"
					}
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ],
				"name" : "childReference"
			} ],
			"name" : "childReferences"
		}, {
			"name" : "refParentId",
			"value" : "textPartAlternativeGroup"
		}, {
			"children" : [ {
				"name" : "ref",
				"value" : "textPartTypeAlternativeCollectionVar"
			}, {
				"name" : "ref",
				"value" : "systemLanguageEnCollectionVar"
			} ],
			"name" : "attributeReferences"
		} ],
		"name" : "metadata",
		"attributes" : {
			"type" : "group"
		}
	};
	var x = metadataProvider.getMetadataById("textPartEnGroup");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getMetadataByIdNotFound", function(assert) {
	var metadataProvider = CORA.metadataProvider(this.spec);
	metadataProvider.processFetchedMetadata(this.metadataAnswer);
	var error = false;
	try {
		var x = metadataProvider.getMetadataById("someNonExistingMetadataId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
