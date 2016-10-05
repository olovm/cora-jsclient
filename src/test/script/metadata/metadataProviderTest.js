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
		var xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(200);
		var responseText = JSON.stringify(CORATEST.metadataList);
		xmlHttpRequestFactoryMultipleSpy.setResponseText(responseText);

		var dependencies = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactoryMultipleSpy,
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

		this.xmlHttpRequestFactoryMultipleSpy = xmlHttpRequestFactoryMultipleSpy;
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var metadataProvider = CORA.metadataProvider(this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var xmlHttpRequestSpy1 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(1);
	var xmlHttpRequestSpy2 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(2);

	var openUrl0 = xmlHttpRequestSpy.getOpenUrl();
	var openUrl1 = xmlHttpRequestSpy1.getOpenUrl();
	var openUrl2 = xmlHttpRequestSpy2.getOpenUrl();

	assert.strictEqual(openUrl0.substring(0, openUrl0.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/metadata/");
	assert.strictEqual(openUrl1.substring(0, openUrl1.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/presentation/");
	assert.strictEqual(openUrl2.substring(0, openUrl2.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/text/");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+recordList+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);

});

QUnit.test("initCallWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}
	
	var xmlHttpRequestFactoryMultipleSpy = this.xmlHttpRequestFactoryMultipleSpy;
	xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
	
	var spec = this.spec;
	spec.callWhenReady = providerReady;
	var provider = CORA.metadataProvider(spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var xmlHttpRequestSpy1 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(1);
	var xmlHttpRequestSpy2 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(2);

	assert.notOk(providerStarted);

	xmlHttpRequestSpy.runLoadFunction();

	assert.notOk(providerStarted);

	xmlHttpRequestSpy2.runLoadFunction();

	assert.notOk(providerStarted);
	
	xmlHttpRequestSpy1.runLoadFunction();
	
	assert.ok(providerStarted);
});

QUnit.test("initCallWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}
	
	var xmlHttpRequestFactoryMultipleSpy = this.xmlHttpRequestFactoryMultipleSpy;
	xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
	
	var spec = this.spec;
//	spec.callWhenReady = providerReady;
	var provider = CORA.metadataProvider(spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var xmlHttpRequestSpy1 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(1);
	var xmlHttpRequestSpy2 = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(2);

	assert.notOk(providerStarted);

	xmlHttpRequestSpy.runLoadFunction();

	assert.notOk(providerStarted);

	xmlHttpRequestSpy2.runLoadFunction();

	assert.notOk(providerStarted);
	
	xmlHttpRequestSpy1.runLoadFunction();
	
	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredLinksIsNotChanged", function(assert) {
	var provider = CORA.metadataProvider(this.spec);
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
	var provider = CORA.metadataProvider(this.spec);
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
					"value" : "textTextVar"
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
	var x = provider.getMetadataById("textPartEnGroup");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getMetadataByIdNotFound", function(assert) {
	var provider = CORA.metadataProvider(this.spec);
	var error = false;
	try {
		var x = provider.getMetadataById("someNonExistingMetadataId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
