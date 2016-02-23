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

QUnit.module("recordListHandlerTest.js", {
	beforeEach : function() {
		this.record = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordType"
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
					"value" : "recordTypeGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "recordTypeViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "recordTypeFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "recordTypeNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "recordTypeFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "recordTypeMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "recordTypeListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "recordTypeSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "recordTypeFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_RECORDTYPE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "recordTypeViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				}
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		// xmlHttpRequestSpy.status = 0;
		// xmlHttpRequestSpy.addedEventListeners["timeout"][0]();
	}
	var workView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"workView" : workView,
		"baseUrl":"http://epc.ub.uu.se/cora/rest/"
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+recordList+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");
});

QUnit.test("fetchListCheckGeneratedList", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var recordGui = {
		"getPresentation" : function() {
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			return recordGui;
		}
	};
	var workView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"workView" : workView
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	assert.strictEqual(workView.childNodes.length, 15);
});

QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var recordGui = {
		"getPresentation" : function() {
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			return recordGui;
		}
	};
	var workView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"workView" : workView
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var firstListItem = workView.childNodes[0];
	assert.strictEqual(firstListItem.className, "listItem recordType");
	assert.notStrictEqual(firstListItem.onclick, undefined);
});

QUnit.test("fetchListCheckError", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 404;
		xmlHttpRequestSpy.responseText = JSON.stringify("Error, something went wrong");
		xmlHttpRequestSpy.addedEventListeners["error"][0]();
	}

	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var recordGui = {
		"getPresentation" : function() {
			return presentation;
		},
		"start" : function start() {
		}
	};
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			return recordGui;
		}
	};
	var workView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"workView" : workView
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	assert.strictEqual(workView.childNodes[0].textContent, "404");
});

QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var recordGui = {
		"getPresentation" : function() {
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			return recordGui;
		}
	};
	// var workView = document.createElement("span");
	// function createListItem (){
	//		
	// }
	var listItemWorkView = document.createElement("span");
	var listText;
	function createListItem(listTextIn) {
		listText = listTextIn;
		return {
			"workView" : listItemWorkView
		};
	}
	var workView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeHandler" : {
			"createListItem" : createListItem
		},
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"workView" : workView
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var firstListItem = workView.childNodes[0];
	firstListItem.onclick();

	assert.strictEqual(listText, "presentationVar");
});
