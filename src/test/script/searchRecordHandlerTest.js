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
						this.search = {
								"data" : {
									"children" : [
											{
												"children" : [ {
													"name" : "linkedRecordType",
													"value" : "metadataGroup"
												}, {
													"name" : "linkedRecordId",
													"value" : "autocompleteSearchGroup"
												} ],
												"actionLinks" : {
													"read" : {
														"requestMethod" : "GET",
														"rel" : "read",
														"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
														"accept" : "application/uub+record+json"
													}
												},
												"name" : "metadataId"
											},
											{
												"children" : [
														{
															"name" : "id",
															"value" : "coraTextSearch"
														},
														{
															"name" : "type",
															"value" : "search"
														},
														{
															"name" : "createdBy",
															"value" : "141414"
														},
														{
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
																	"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																	"accept" : "application/uub+record+json"
																}
															},
															"name" : "dataDivider"
														} ],
												"name" : "recordInfo"
											},
											{
												"children" : [ {
													"name" : "linkedRecordType",
													"value" : "presentationGroup"
												}, {
													"name" : "linkedRecordId",
													"value" : "autocompleteSearchPGroup"
												} ],
												"actionLinks" : {
													"read" : {
														"requestMethod" : "GET",
														"rel" : "read",
														"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
														"accept" : "application/uub+record+json"
													}
												},
												"name" : "presentationId"
											},
											{
												"repeatId" : "0",
												"children" : [ {
													"name" : "linkedRecordType",
													"value" : "recordType"
												}, {
													"name" : "linkedRecordId",
													"value" : "coraText"
												} ],
												"actionLinks" : {
													"read" : {
														"requestMethod" : "GET",
														"rel" : "read",
														"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/coraText",
														"accept" : "application/uub+record+json"
													}
												},
												"name" : "recordTypeToSearchIn"
											} ],
									"name" : "search"
								},
								"actionLinks" : {
									"search" : {
										"requestMethod" : "GET",
										"rel" : "search",
										"url" : "http://epc.ub.uu.se/therest/rest/record/coraTextSearch/",
										"accept" : "application/uub+recordList+json"
									},
									"read" : {
										"requestMethod" : "GET",
										"rel" : "read",
										"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
										"accept" : "application/uub+record+json"
									},
									"read_incoming_links" : {
										"requestMethod" : "GET",
										"rel" : "read_incoming_links",
										"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
										"accept" : "application/uub+recordList+json"
									},
									"update" : {
										"requestMethod" : "POST",
										"rel" : "update",
										"contentType" : "application/uub+record+json",
										"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
										"accept" : "application/uub+record+json"
									}
								}
							};
						

						this.dependencies = {
//							"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
							"searchRecordHandlerViewFactory" : CORATEST
									.searchRecordHandlerViewFactorySpy(),
//							"recordListHandlerFactory" : CORATEST.recordListHandlerFactorySpy(),
//							"recordHandlerFactory" : CORATEST.recordHandlerFactorySpy(),
//							"jsClient" : CORATEST.jsClientSpy()
						};

						this.spec = {
							"searchRecord" : this.search,
							"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
						};
					},
					afterEach : function() {
					}
				});

QUnit.test("init", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.type, "searchRecordHandler");
}); 

QUnit.test("testGetDependencies", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.getDependencies(), this.dependencies);
}); 

QUnit.test("testGetSpec", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	assert.strictEqual(searchRecordHandler.getSpec(), this.spec);
}); 

QUnit.test("testViewIsCreatedUsingFactory", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchRecordHandlerViewFactory.getFactored(0);
	assert.strictEqual(searchRecordHandler.getView(), factoredView.getView());
}); 

QUnit.test("testViewSpec", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, "coraTextSearch");
}); 

//QUnit.test("init", function(assert) {
//	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
//
//	var view = searchRecordHandler.getView();
//	assert.strictEqual(view.className, "recordTypeFromRecordTypeHandlerSpy");
//
//	var factoredViewSpec = this.dependencies.searchRecordHandlerViewFactory.getSpec(0);
//	assert.strictEqual(factoredViewSpec.fetchListMethod, searchRecordHandler.createRecordTypeList);
//}); 

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
