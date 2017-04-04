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
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemGroup"
					} ]
				}, {
					"name" : "presentationViewId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemViewPGroup"
					} ]
				}, {
					"name" : "presentationFormId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemFormPGroup"
					} ]
				}, {
					"name" : "newMetadataId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemNewGroup"
					} ]
				}, {
					"name" : "newPresentationFormId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemFormNewPGroup"
					} ]
				}, {
					"name" : "menuPresentationViewId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemMenuPGroup"
					} ]
				}, {
					"name" : "listPresentationViewId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "presentationGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadataCollectionItemListPGroup"
					} ]
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
					"name" : "selfPresentationViewId",
					"value" : "metadataCollectionItemViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "metadata"
					} ]
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
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();

		this.dependencies = {
			"loginManagerFactory" : CORATEST.loginManagerFactorySpy(),
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderRealStub(),
			"searchProvider" : CORATEST.searchProviderSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"presentationFactoryFactory" : "not implemented yet",
			"jsClientViewFactory" : CORATEST.jsClientViewFactorySpy(),
			"searchRecordHandlerFactory" : CORATEST.searchRecordHandlerFactorySpy(),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
		}
		this.spec = {
			"name" : "The Client",
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/",
			"appTokenBaseUrl" : "someAppTokenBaseUrl/"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var mainView = jsClient.getView();
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	assert.strictEqual(jsClientView.getView(), mainView);

	// assert.strictEqual(mainView.modelObject, jsClient);

	var recordTypeList = jsClient.getRecordTypeList();
	assert.strictEqual(recordTypeList.length, 19);

	var firstRecordType = jsClientView.getRecordTypesView(0);
	assert.strictEqual(firstRecordType.className, "recordType");
	assert.strictEqual(firstRecordType.firstChild.textContent, "metadata");

	var lastRecordType = jsClientView.getRecordTypesView(18);
	assert.strictEqual(lastRecordType.className, "recordType");
	assert.strictEqual(lastRecordType.firstChild.textContent, "recordType");
});

QUnit.test("testInitCreatesALoginManager", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var factored = this.dependencies.loginManagerFactory.getFactored(0);
	assert.ok(factored !== undefined);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).afterLoginMethod,
			jsClient.afterLogin);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).afterLogoutMethod,
			jsClient.afterLogout);
	assert.strictEqual(this.dependencies.loginManagerFactory.getSpec(0).appTokenBaseUrl,
			"someAppTokenBaseUrl/");
});

QUnit.test("testInitCreatesALoginManagerAndAddsItsHtmlToTheHeader", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getLoginManagerView(0).className, "loginManagerSpy");
});

QUnit.test("initFactoresSearchRecordHandlersAndAddsToView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var addedSearchRecordHandlerView = jsClientView.getSearchesView(0);
	var factoredSearchRecordHandler = this.dependencies.searchRecordHandlerFactory.getFactored(0);
	assert.strictEqual(addedSearchRecordHandlerView, factoredSearchRecordHandler.getView());
	var factoredSpec = this.dependencies.searchRecordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);

	var addedSearchRecordHandlerView2 = jsClientView.getSearchesView(1);
	var factoredSearchRecordHandler2 = this.dependencies.searchRecordHandlerFactory.getFactored(1);
	assert.strictEqual(addedSearchRecordHandlerView2, factoredSearchRecordHandler2.getView());
	var factoredSpec2 = this.dependencies.searchRecordHandlerFactory.getSpec(1);
	assert.strictEqual(factoredSpec2.baseUrl, this.spec.baseUrl);

	var addedSearchRecordHandlerView3 = jsClientView.getSearchesView(2);
	var factoredSearchRecordHandler3 = this.dependencies.searchRecordHandlerFactory.getFactored(2);
	assert.strictEqual(addedSearchRecordHandlerView3, factoredSearchRecordHandler3.getView());
	var factoredSpec3 = this.dependencies.searchRecordHandlerFactory.getSpec(2);
	assert.strictEqual(factoredSpec3.baseUrl, this.spec.baseUrl);
});

QUnit.test("initRecordTypesAreSortedByType", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var recordType = jsClientView.getRecordTypesView(0);
	assert.strictEqual(recordType.firstChild.textContent, "metadata");

	recordType = jsClientView.getRecordTypesView(2);
	assert.strictEqual(recordType.firstChild.textContent, "metadataCollectionItem");

	recordType = jsClientView.getRecordTypesView(7);
	assert.strictEqual(recordType.firstChild.textContent, "presentation");

	recordType = jsClientView.getRecordTypesView(8);
	assert.strictEqual(recordType.firstChild.textContent, "presentationVar");

	recordType = jsClientView.getRecordTypesView(18);
	assert.strictEqual(recordType.firstChild.textContent, "recordType");
});

QUnit.test("showView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var mainView = jsClient.getView();

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	// var workView1 = document.createElement("span");
	// var menuView1 = document.createElement("span");
	// menuView1.className = "menuView1";
	// var aView = {
	// "workView" : workView1,
	// "menuView" : menuView1
	// };
	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	jsClient.showView(aView);

	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	// assert.strictEqual(menuView1.className, "menuView1 active");
	// assert.strictEqual(menuView1.style.display, "");
	// assert.strictEqual(workView1.style.display, "");

//	var workView2 = document.createElement("span");
//	var menuView2 = document.createElement("span");
//	menuView2.className = "menuView2";
//	var aDifferentView = {
//		"workView" : workView2,
//		"menuView" : menuView2 
//	};
	var aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);
	jsClient.showView(aDifferentView);

	assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aDifferentView.getActive(), true);
	// assert.strictEqual(menuView1.className, "menuView1");
	// assert.strictEqual(menuView2.className, "menuView2 active");
	// assert.strictEqual(workView1.style.display, "none");
	// assert.strictEqual(workView2.style.display, "");

	jsClient.showView(aView);
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aDifferentView.getActive(), false);
	// assert.strictEqual(workView1.style.display, "");
	// assert.strictEqual(workView2.style.display, "none");
});
QUnit.test("hideAndRemoveView", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	var mainView = jsClient.getView();

	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

//	var workView1 = document.createElement("span");
//	var menuView1 = document.createElement("span");
//	menuView1.className = "menuView1";
//	var aView = {
//			"workView" : workView1,
//			"menuView" : menuView1
//	};
	var aView = CORATEST.managedGuiItemSpy();
	jsClient.showView(aView);
	
	assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	
	jsClient.hideAndRemoveView(aView);
	assert.strictEqual(jsClientView.getRemovedWorkView(0), aView.getWorkView());
	
});

QUnit.test("testFactories", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;

	var jsClient = CORA.jsClient(this.dependencies, this.spec);

//	var viewSpec = {
//		"headerText" : "some text",
//		"fetchListMethod" : function() {
//		}
//	};
//	var recordTypeHandlerView = jsClient.createRecordTypeHandlerViewFactory().factor(viewSpec);

//	var workView = document.createElement("span");
//	var menuView = document.createElement("span");
//	var listHandlerSpec = {
//		"dependencies" : this.dependencies,
//		"recordTypeRecord" : this.record,
////		"views" : {
////			"workView" : workView,
////			"menuView" : menuView
////		},
//		"views" : CORATEST.managedGuiItemSpy(),
//		
//		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
//	};
//	var recordListHandler = jsClient.createRecordListHandlerFactory().factor(listHandlerSpec);

	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var recordHandlerSpec = {
		"dependencies" : this.dependencies,
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		"presentationMode" : "view",
		// "views" : {
		// "menuView" : menuView,
		// "workView" : workView
		// },
		"views" : CORATEST.managedGuiItemSpy(),
		"record" : this.record,
	};
	var recordHandler = jsClient.createRecordHandlerFactory().factor(recordHandlerSpec);

//	assert.notStrictEqual(recordTypeHandlerView, undefined);
//	assert.notStrictEqual(recordListHandler, undefined);
	assert.notStrictEqual(recordHandler, undefined);
});

QUnit.test("getMetadataIdForRecordType", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;

	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var metadataId = jsClient.getMetadataIdForRecordTypeId("textSystemOne");
	assert.strictEqual(metadataId, "textSystemOneGroup");
});

QUnit.test("testAfterLogin", function(assert) {
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogin();
	assert.strictEqual(this.dependencies.recordTypeProvider.getCallWhenReloadedMethod(),
			jsClient.afterRecordTypeProviderReload);
});

QUnit.test("testAfterLogout", function(assert) {
	this.dependencies.recordTypeProvider = CORATEST.recordTypeProviderSpy();
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	jsClient.afterLogout();
	assert.strictEqual(this.dependencies.recordTypeProvider.getCallWhenReloadedMethod(),
			jsClient.afterRecordTypeProviderReload);
});

QUnit.test("testAfterRecordTypeProviderReload", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);

	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 0);
	jsClient.afterRecordTypeProviderReload();
	assert.strictEqual(jsClientView.getRecordTypesClearedNoOfTimes(), 1);

	var recordType = jsClientView.getRecordTypesView(0);
	assert.strictEqual(recordType.firstChild.textContent, "metadata");
});

QUnit.test("testCreateManagedGuiItem", function(assert) {
	var jsClient = CORA.jsClient(this.dependencies, this.spec);
	var handledBy = function() {
	};
	var managedGuiItem = jsClient.createManagedGuiItem(handledBy);
	var spec  = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(spec.handledBy, handledBy);

//	assert.strictEqual(managedGuiItem.menuView.nodeName, "SPAN");
//	assert.strictEqual(managedGuiItem.menuView.className, "menuView");
//
//	assert.strictEqual(managedGuiItem.workView.nodeName, "SPAN");
//	assert.strictEqual(managedGuiItem.workView.className, "workView");
});

//QUnit.test("testCreateManagedGuiItemMenuViewOnclick", function(assert) {
//	var jsClient = CORA.jsClient(this.dependencies, this.spec);
//	var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
//	var handledBy = function() {
//	};
//	var managedGuiItem = jsClient.createManagedGuiItem(handledBy);
//
//	assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
//	var event = document.createEvent('Event');
//	managedGuiItem.menuView.onclick(event);
//	assert.strictEqual(jsClientView.getAddedWorkView(0), managedGuiItem.workView);
//	assert.strictEqual(managedGuiItem.menuView.className, "menuView active");
//});
//
//QUnit.test("testCreateManagedGuiItemHandledOnReload", function(assert) {
//	var jsClient = CORA.jsClient(this.dependencies, this.spec);
//	var handledByCalledWith = [];
//	var handledBy = function(managedGuiItemIn) {
//		handledByCalledWith.push(managedGuiItemIn);
//	}
//	var managedGuiItem = jsClient.createManagedGuiItem(handledBy);
//	jsClient.afterRecordTypeProviderReload();
//	assert.strictEqual(handledByCalledWith.length, 1);
//});
