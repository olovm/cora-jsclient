/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit
		.module(
				"searchRecordHandlerTest.js",
				{
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
								}, {
									"name" : "textId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "coraText"
									}, {
										"name" : "linkedRecordId",
										"value" : "fdagText"
									} ]
								}, {
									"name" : "defTextId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "coraText"
									}, {
										"name" : "linkedRecordId",
										"value" : "adfgDefText"
									} ]
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/uub+record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/uub+record+json"
								},
								"create" : {
									"requestMethod" : "POST",
									"rel" : "create",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
									"accept" : "application/uub+record+json"
								},
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
									"accept" : "application/uub+recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem"
								}
							}
						};
						this.recordWithoutCreateLink = {
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
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "recordType"
									}, {
										"name" : "linkedRecordId",
										"value" : "metadata"
									} ]
								}, {
									"name" : "textId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "coraText"
									}, {
										"name" : "linkedRecordId",
										"value" : "fdagText"
									} ]
								}, {
									"name" : "defTextId",
									"children" : [ {
										"name" : "linkedRecordType",
										"value" : "coraText"
									}, {
										"name" : "linkedRecordId",
										"value" : "adfgDefText"
									} ]
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/uub+record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/uub+record+json"
								},
								// "create": {
								// "requestMethod": "POST",
								// "rel": "create",
								// "contentType": "application/uub+record+json",
								// "url":
								// "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
								// "accept": "application/uub+record+json"
								// },
								"list" : {
									"requestMethod" : "GET",
									"rel" : "list",
									"url" : "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/",
									"accept" : "application/uub+recordList+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem"
								}
							}
						};

						this.dependencies = {
							"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
							"searchRecordHandlerViewFactory" : CORATEST
									.searchRecordHandlerViewFactorySpy(),
							"recordListHandlerFactory" : CORATEST.recordListHandlerFactorySpy(),
							"recordHandlerFactory" : CORATEST.recordHandlerFactorySpy(),
							"jsClient" : CORATEST.jsClientSpy()
						};

						this.spec = {
							"recordTypeRecord" : this.record,
							"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
						};
					},
					afterEach : function() {
					}
				});

QUnit.test("init", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);

	var view = searchRecordHandler.getView();
	assert.strictEqual(view.className, "recordTypeFromRecordTypeHandlerSpy");

	var factoredViewSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.fetchListMethod, searchRecordHandler.createRecordTypeList);
});

//QUnit.test("initWithCreateButton", function(assert) {
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//	var factoredViewSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
//	assert.strictEqual(factoredViewSpec.createNewMethod, searchRecordHandler.createRecordHandler);
//});
//
//QUnit.test("initWithoutCreateButton", function(assert) {
//	this.spec.recordTypeRecord = this.recordWithoutCreateLink;
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//	var factoredViewSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
//	assert.strictEqual(factoredViewSpec.createNewMethod, undefined);
//});
//
//QUnit.test("fetchList", function(assert) {
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//
//	searchRecordHandler.createRecordTypeList();
//	var factoredListHandlerSpec = this.dependencies.recordListHandlerFactory.getSpec(0);
//	assert.strictEqual(factoredListHandlerSpec.createRecordHandlerMethod, 
//			searchRecordHandler.createRecordHandler);
//	
//	assert.strictEqual(factoredListHandlerSpec.recordTypeRecord, this.record);
//	assert.strictEqual(factoredListHandlerSpec.views, 
//			this.dependencies.jsClient.getCreatedManagedGuiItem(0));
//	assert.strictEqual(factoredListHandlerSpec.baseUrl, this.spec.baseUrl);
//});
//
//QUnit.test("showRecord", function(assert) {
//	var menuView = document.createElement("span");
//	var workView = document.createElement("span");
//	var catchRecordTypeHandlerViewSpec;
//	var catchRecordListHandlerSpec;
//	var catchRecordHandlerSpec;
//	var item = {
//		"workView" : workView,
//		"menuView" : menuView
//	};
//	var createManagedGuiItem = function() {
//		return item;
//	}
//	this.dependencies.searchRecordHandlerViewFactory = CORATEST.searchRecordHandlerViewFactorySpy();
//	this.dependencies.recordListHandlerFactory = {
//		"factor" : function(spec) {
//			catchRecordListHandlerSpec = spec;
//		}
//	};
//	this.dependencies.recordHandlerFactory = {
//		"factor" : function(spec) {
//			catchRecordHandlerSpec = spec;
//		}
//	};
//
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//	var spec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
//	spec.fetchListMethod();
//	catchRecordListHandlerSpec.createRecordHandlerMethod("view", this.record);
//
//	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
//	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "view");
//	assert.strictEqual(catchRecordHandlerSpec.record, this.record);
//	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
//	assert.strictEqual(catchRecordHandlerSpec.searchRecordHandler, searchRecordHandler);
//});
//
//QUnit.test("showNew", function(assert) {
//	var menuView = document.createElement("span");
//	var workView = document.createElement("span");
//	var catchRecordTypeHandlerViewSpec;
//	var catchRecordListHandlerSpec;
//	var catchRecordHandlerSpec;
//	var item = {
//		"workView" : workView,
//		"menuView" : menuView
//	};
//	var createManagedGuiItem = function() {
//		return item;
//	}
//
//	this.dependencies.searchRecordHandlerViewFactory = CORATEST.searchRecordHandlerViewFactorySpy();
//	this.dependencies.recordListHandlerFactory = {
//		"factor" : function(spec) {
//			catchRecordListHandlerSpec = spec;
//		}
//	};
//	this.dependencies.recordHandlerFactory = {
//		"factor" : function(spec) {
//			catchRecordHandlerSpec = spec;
//		}
//	};
//
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//	var spec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
//	spec.fetchListMethod();
//
//	catchRecordListHandlerSpec.createRecordHandlerMethod("new", undefined);
//
//	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
//	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "new");
//	assert.strictEqual(catchRecordHandlerSpec.record, undefined);
//	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
//	assert.strictEqual(catchRecordHandlerSpec.searchRecordHandler, searchRecordHandler);
//});
//
//QUnit.test("testFactory", function(assert) {
//	this.createRecordTypeHandlerViewFactory = function() {
//		var dependen = {
//			"jsClient" : CORATEST.jsClientSpy()
//		};
//		return {
//			"factor" : function(viewSpec) {
//				return CORA.searchRecordHandlerView(dependen, viewSpec);
//			}
//		};
//	}
//	this.createRecordListHandlerFactory = function() {
//		return {
//			"factor" : function(listHandlerSpec) {
//				return CORA.recordListHandler(listHandlerSpec);
//			}
//		};
//	}
//	this.createRecordHandlerFactory = function() {
//		return {
//			"factor" : function(recordHandlerSpec) {
//				return CORA.recordHandler(recordHandlerSpec);
//				;
//			}
//		};
//	}
//	
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//
//	var workItemViewFactory = {
//		"factor" : function(workItemViewSpec) {
//			return CORA.workItemView(workItemViewSpec);
//		}
//	};
//	var spec = {
//		"searchRecordHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
//		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
//		"recordHandlerFactory" : this.createRecordHandlerFactory(),
//		"recordTypeRecord" : this.record
//	};
//	var workItemViewFactory = CORA.workItemViewFactory(spec);
//	var recordHandlerViewSpec = {
//		"workItemViewFactory" : workItemViewFactory,
//		"extraClassName" : "text"
//	};
//
//	var recordHandlerView = searchRecordHandler.createRecordHandlerViewFactory().factor(
//			recordHandlerViewSpec);
//	assert.notStrictEqual(recordHandlerView, undefined);
//});
