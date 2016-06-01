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

QUnit.module("recordTypeProviderTest.js", {
	beforeEach : function() {
		var recordTypeListData = CORATEST.recordTypeList;
		var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
		function sendFunction() {
			xmlHttpRequestSpy.status = 200;
			xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
			xmlHttpRequestSpy.addedEventListeners["load"][0]();
		}

		var dependencies = {
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		};
		var recordTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
			"accept" : "application/uub+recordList+json"
		};
		var spec = {
			"dependencies" : dependencies,
			"recordTypeListLink" : recordTypeListLink
		};
		this.recordTypeListLink = recordTypeListLink;
		this.recordTypeListLinkJson = JSON.stringify(this.recordTypeListLink);

		var recordTypeProvider = CORA.recordTypeProvider(spec);
		this.recordTypeProvider = recordTypeProvider;
		this.xmlHttpRequestSpy = xmlHttpRequestSpy;
	},
	afterEach : function() {
	}
});

QUnit.test("initCorrectRequestMade", function(assert) {
	var xmlHttpRequestSpy = this.xmlHttpRequestSpy;

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	var openUrls = xmlHttpRequestSpy.getOpenUrls();
	var openUrl0 = openUrls[0];
	assert.strictEqual(openUrl0.substring(0, openUrl0.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+recordList+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);

});

QUnit.test("testInitEnteredLinkIsNotChanged", function(assert) {
	var recordTypeListLinkJson = this.recordTypeListLinkJson;
	var recordTypeListLinkJsonAfter = JSON.stringify(this.recordTypeListLink);
	assert.deepEqual(recordTypeListLinkJsonAfter, recordTypeListLinkJson);
});

QUnit.test("getRecordTypeById", function(assert) {
	var recordTypeProvider = this.recordTypeProvider;
	var expected = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "textSystemOne"
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
				"value" : "textSystemOneGroup"
			}, {
				"name" : "presentationViewId",
				"value" : "textSystemOneViewPGroup"
			}, {
				"name" : "presentationFormId",
				"value" : "textSystemOneFormPGroup"
			}, {
				"name" : "newMetadataId",
				"value" : "textSystemOneNewGroup"
			}, {
				"name" : "newPresentationFormId",
				"value" : "textSystemOneFormNewPGroup"
			}, {
				"name" : "menuPresentationViewId",
				"value" : "textSystemOneMenuPGroup"
			}, {
				"name" : "listPresentationViewId",
				"value" : "textSystemOneListPGroup"
			}, {
				"name" : "searchMetadataId",
				"value" : "textSystemOneSearchGroup"
			}, {
				"name" : "searchPresentationFormId",
				"value" : "textSystemOneFormSearchPGroup"
			}, {
				"name" : "userSuppliedId",
				"value" : "true"
			}, {
				"name" : "permissionKey",
				"value" : "RECORDTYPE_TEXTSYSTEMONE"
			}, {
				"name" : "selfPresentationViewId",
				"value" : "textSystemOneViewSelfPGroup"
			}, {
				"name" : "abstract",
				"value" : "false"
			}, {
				"name" : "parentId",
				"value" : "text"
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
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept" : "application/uub+record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
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
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
			}
		}
	};
	var x = recordTypeProvider.getRecordTypeById("textSystemOne");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getRecordTypeByIdNotFound", function(assert) {
	var recordTypeProvider = this.recordTypeProvider;
	var error = false;
	try {
		var x = recordTypeProvider.getRecordTypeById("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
