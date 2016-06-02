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

QUnit.module("jsClientTest.js", {
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
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}

	var dependencies = {
		"metadataProvider" : CORATEST.metadataProviderRealStub(),
		"textProvider" : CORATEST.textProviderRealStub(),
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"presentationFactoryFactory" : "not implemented yet"
	}
	var spec = {
		"dependencies" : dependencies,
		"name" : "The Client",
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);
	var mainView = jsClient.getView();

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, undefined);

	assert.strictEqual(mainView.modelObject, jsClient);

	assert.strictEqual(mainView.className, "jsClient mainView");

	var header = mainView.childNodes[0];
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.innerHTML, "The Client");

	var sideBar = mainView.childNodes[1];
	assert.strictEqual(sideBar.className, "sideBar");

	var workArea = mainView.childNodes[2];
	assert.strictEqual(workArea.className, "workArea");

	var recordTypeList = jsClient.getRecordTypeList();
	assert.strictEqual(recordTypeList.length, 15);

	var firstRecordType = sideBar.childNodes[0];
	assert.strictEqual(firstRecordType.className, "recordType");
	assert.strictEqual(firstRecordType.firstChild.textContent, "metadata");
});

QUnit.test("initRecordTypesAreSortedByType", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	
	var dependencies = {
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderRealStub(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"presentationFactoryFactory" : "not implemented yet"
	}
	var spec = {
			"dependencies" : dependencies,
			"name" : "The Client",
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);
	var mainView = jsClient.getView();
	
	var sideBar = mainView.childNodes[1];
	assert.strictEqual(sideBar.className, "sideBar");
	
	var firstRecordType = sideBar.childNodes[0];
	assert.strictEqual(firstRecordType.className, "recordType");
	assert.strictEqual(firstRecordType.firstChild.textContent, "metadata");
	
	assert.strictEqual(sideBar.childNodes[1].firstChild.textContent, "metadataGroup");
	assert.strictEqual(sideBar.childNodes[2].firstChild.textContent, "metadataCollectionItem");
	
	assert.strictEqual(sideBar.childNodes[7].firstChild.textContent, "presentation");
	assert.strictEqual(sideBar.childNodes[8].firstChild.textContent, "presentationVar");
	
	assert.strictEqual(sideBar.childNodes[14].firstChild.textContent, "recordType");
});

QUnit.test("showView", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}

	var dependencies = {
		"metadataProvider" : CORATEST.metadataProviderRealStub(),
		"textProvider" : CORATEST.textProviderRealStub(),
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"presentationFactoryFactory" : "not implemented yet"
	};
	var spec = {
		"dependencies" : dependencies,
		"name" : "The Client",
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);
	var mainView = jsClient.getView();

	var workAreaChildren = mainView.childNodes[2].childNodes;
	assert.strictEqual(workAreaChildren.length, 0);

	var workView1 = document.createElement("span");
	var menuView1 = document.createElement("span");
	menuView1.className = "menuView1";
	var aView = {
		"workView" : workView1,
		"menuView" : menuView1
	};
	jsClient.showView(aView);
	assert.strictEqual(workAreaChildren[0], aView.workView);
	assert.strictEqual(menuView1.className, "menuView1 active");
	assert.strictEqual(menuView1.style.display, "");
	assert.strictEqual(workView1.style.display, "");

	var workView2 = document.createElement("span");
	var menuView2 = document.createElement("span");
	menuView2.className = "menuView2";
	var aDifferentView = {
		"workView" : workView2,
		"menuView" : menuView2
	};
	jsClient.showView(aDifferentView);

	assert.strictEqual(menuView1.className, "menuView1");
	assert.strictEqual(menuView2.className, "menuView2 active");
	assert.strictEqual(workView1.style.display, "none");
	assert.strictEqual(workView2.style.display, "");

	jsClient.showView(aView);
	assert.strictEqual(workView1.style.display, "");
	assert.strictEqual(workView2.style.display, "none");
});

QUnit.test("testFactories", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}

	var dependencies = {
		"metadataProvider" : CORATEST.metadataProviderRealStub(),
		"textProvider" : CORATEST.textProviderRealStub(),
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"presentationFactoryFactory" : "not implemented yet"
	}
	var spec = {
		"dependencies" : dependencies,
		"name" : "The Client",
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);

	var viewSpec = {
		"headerText" : "some text",
		"fetchListMethod" : function() {
		}
	};
	var recordTypeHandlerView = jsClient.createRecordTypeHandlerViewFactory().factor(viewSpec);

	var workView = document.createElement("span");
	var menuView = document.createElement("span");
	var listHandlerSpec = {
		"recordTypeRecord" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"views" : {
			"workView" : workView,
			"menuView" : menuView
		},
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var recordListHandler = jsClient.createRecordListHandlerFactory().factor(listHandlerSpec);

	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"presentationMode" : "view",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
	};
	var recordHandler = jsClient.createRecordHandlerFactory().factor(recordHandlerSpec);

	assert.notStrictEqual(recordTypeHandlerView, undefined);
	assert.notStrictEqual(recordListHandler, undefined);
	assert.notStrictEqual(recordHandler, undefined);
});

QUnit.test("getMetadataIdForRecordType", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var dependencies = {
		"metadataProvider" : CORATEST.metadataProviderRealStub(),
		"textProvider" : CORATEST.textProviderRealStub(),
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"presentationFactoryFactory" : "not implemented yet"
	}
	var spec = {
		"dependencies" : dependencies,
		"name" : "The Client",
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);
	var metadataId = jsClient.getMetadataIdForRecordTypeId("textSystemOne");
	assert.strictEqual(metadataId, "textSystemOneGroup");
});
