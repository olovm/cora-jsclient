/*
 * Copyright 2016 Olov McKie
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
		var metadataListData = CORATEST.metadataList;
		var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
		function sendFunction() {
			xmlHttpRequestSpy.status = 200;
			xmlHttpRequestSpy.responseText = JSON.stringify(metadataListData);
			xmlHttpRequestSpy.addedEventListeners["load"][0]();
		}

		var dependencies = {
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
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
		this.metadataListLink = metadataListLink;
		this.metadataListLinkJson = JSON.stringify(this.metadataListLink);
		this.presentationListLink = presentationListLink;
		this.presentationListLinkJson = JSON.stringify(this.presentationListLink);
		this.textListLink = textListLink;
		this.textListLinkJson = JSON.stringify(this.textListLink);

		var metadataProvider = CORA.metadataProvider(spec);
		this.metadataProvider = metadataProvider;
		this.xmlHttpRequestSpy = xmlHttpRequestSpy;
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = this.xmlHttpRequestSpy;

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	var openUrls = xmlHttpRequestSpy.getOpenUrls();
	var openUrl0 = openUrls[0];
	var openUrl1 = openUrls[1];
	var openUrl2 = openUrls[2];
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

QUnit.test("testInitEnteredLinksIsNotChanged", function(assert) {
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
	var metadataProvider = this.metadataProvider;
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
	var x = metadataProvider.getMetadataById("textPartEnGroup");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getMetadataByIdNotFound", function(assert) {
	var metadataProvider = this.metadataProvider;
	var error = false;
	try {
		var x = metadataProvider.getMetadataById("someNonExistingMetadataId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
