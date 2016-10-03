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
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ],
						"actionLinks" : {
							"read" : {
								"requestMethod" : "GET",
								"rel" : "read",
								"url" : "http://localhost:8080/therest/rest/record/system/cora",
								"accept" : "application/uub+record+json"
							}
						},
						"name" : "dataDivider"
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
		this.workView = document.createElement("span");
		this.menuView = document.createElement("span");
		this.jsClientSpy = {
			"getMetadataIdForRecordTypeId" : function(recordTypeId) {
				return "recordTypeGroup2";
			}
		};

		this.presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
		};

		var presentation = this.presentation;
		this.presentationIdUsed = [];
		var presentationIdUsed = this.presentationIdUsed;
		this.recordGui = {
			"getPresentation" : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
			},
			"dataHolder" : {
				"getData" : function() {
					return {};
				}
			}
		};

		var recordGui = this.recordGui;
		this.metadataIdUsed = [];
		var metadataIdUsed = this.metadataIdUsed;
		this.dataDividerUsed = [];
		var dataDividerUsed = this.dataDividerUsed;
		this.recordGuiFactorySpy = {
			"factor" : function(metadataId, data, dataDivider) {
				metadataIdUsed.push(metadataId);
				dataDividerUsed.push(dataDivider);
				return recordGui;
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
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

QUnit.test("initCheckRemoveOnMenu", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var workView = this.workView;
	var menuView = this.menuView;

	assert.strictEqual(menuView.textContent, "List");

	var removeButton = menuView.childNodes[1];
	assert.strictEqual(removeButton.className, "removeButton");
	var event = document.createEvent('Event');

	removeButton.onclick(event);
	assert.strictEqual(menuView.parentNode, null);
	assert.strictEqual(workView.parentNode, null);
});

QUnit.test("initCheckRemoveOnMenuWhereParentsExist", function(assert) {
	var menuView = document.createElement("span");
	var menuViewParent = document.createElement("span");
	menuViewParent.appendChild(menuView);

	var workView = document.createElement("span");
	var workViewParent = document.createElement("span");
	workViewParent.appendChild(workView);

	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"views" : {
			"workView" : workView,
			"menuView" : menuView
		},
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var removeButton = menuView.childNodes[1];
	assert.strictEqual(removeButton.className, "removeButton");
	var event = document.createEvent('Event');

	removeButton.onclick(event);
	assert.strictEqual(menuView.parentNode, null);
	assert.strictEqual(workView.parentNode, null);
});

QUnit.test("fetchListCheckGeneratedList", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	assert.strictEqual(this.workView.childNodes.length, 15);
});

QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var firstListItem = this.workView.childNodes[0];
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

	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	assert.strictEqual(this.workView.childNodes[0].textContent, "404");
});

QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var listItemWorkView = document.createElement("span");
	var listText;
	function createListItem(listTextIn) {
		listText = listTextIn;
		return {
			"workView" : listItemWorkView,
			"menuView" : this.menuView
		};
	}
	var createRecordHandlerMethodCalledWithPresentationMode;
	var createRecordHandlerMethodCalledWithRecord;
	var listHandlerSpec = {
		"createListItemMethod" : createListItem,
		"createRecordHandlerMethod" : function(presentationMode, record) {
			createRecordHandlerMethodCalledWithPresentationMode = presentationMode;
			createRecordHandlerMethodCalledWithRecord = record;
		},
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);

	var firstListItem = this.workView.childNodes[0];
	firstListItem.onclick();

	var firstRecord = recordTypeListData.dataList.data[0].record;
	assert.stringifyEqual(createRecordHandlerMethodCalledWithPresentationMode, "view");
	assert.stringifyEqual(createRecordHandlerMethodCalledWithRecord, firstRecord);
});

QUnit.test("fetchListCheckUsedPresentationId", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var listItemWorkView = document.createElement("span");
	var listText;
	function createListItem(listTextIn) {
		listText = listTextIn;
		return {
			"workView" : listItemWorkView,
			"menuView" : this.menuView
		};
	}
	var createRecordHandlerMethodCalledWithPresentationMode;
	var createRecordHandlerMethodCalledWithRecord;

	var listHandlerSpec = {
		"createListItemMethod" : createListItem,
		"createRecordHandlerMethod" : function(presentationMode, record) {
			createRecordHandlerMethodCalledWithPresentationMode = presentationMode;
			createRecordHandlerMethodCalledWithRecord = record;
		},
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"views" : {
			"workView" : this.workView,
			"menuView" : this.menuView
		},
		"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);
	assert.stringifyEqual(this.presentationIdUsed[0], "recordTypeListPGroup");
	assert.stringifyEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.dataDividerUsed[0], "cora");
});
QUnit.test("fetchListBroken", function(assert) {
	var recordTypeListData = CORATEST.recordTypeBrokenList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var listItemWorkView = document.createElement("span");
	var listText;
	function createListItem(listTextIn) {
		listText = listTextIn;
		return {
			"workView" : listItemWorkView,
			"menuView" : this.menuView
		};
	}
	var createRecordHandlerMethodCalledWithPresentationMode;
	var createRecordHandlerMethodCalledWithRecord;
	
	var listHandlerSpec = {
			"createListItemMethod" : createListItem,
			"createRecordHandlerMethod" : function(presentationMode, record) {
				createRecordHandlerMethodCalledWithPresentationMode = presentationMode;
				createRecordHandlerMethodCalledWithRecord = record;
			},
			"recordTypeRecord" : this.record,
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"views" : {
				"workView" : this.workView,
				"menuView" : this.menuView
			},
			"jsClient" : this.jsClientSpy
	};
	var recordListHandler = CORA.recordListHandler(listHandlerSpec);
	var firstListItem = this.workView.childNodes[0];
	assert.strictEqual(this.workView.textContent.substring(0,10), "TypeError:");
});
