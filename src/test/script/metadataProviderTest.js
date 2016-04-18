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
		this.record = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataCollectionItem"
					}, {
						"name" : "type",
						"value" : "recordType"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"value" : "metadataCollectionItemGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataCollectionItemViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataCollectionItemFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataCollectionItemNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataCollectionItemFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataCollectionItemMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataCollectionItemListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataCollectionItemSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataCollectionItemFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATACOLLECTIONITEM"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataCollectionItemViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem"
				}
			}
		};
		this.createRecordHandlerViewFactory = function() {
			return {
				"factor" : function(recordHandlerViewSpec) {
					return CORA.recordHandlerView(recordHandlerViewSpec);
				}
			};
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
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

	var metadataProvider = CORA.metadataProvider(spec);

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
QUnit.test("getMetadataById", function(assert) {
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
	var metadataProvider = CORA.metadataProvider(spec);
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
	var metadataProvider = CORA.metadataProvider(spec);
	var error = false;
	try {
		var x = metadataProvider.getMetadataById("someNonExistingMetadataId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
