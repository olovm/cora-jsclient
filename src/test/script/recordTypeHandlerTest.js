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

QUnit
		.module(
				"recordTypeHandlerTest.js",
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
						this.createRecordTypeHandlerViewFactory = function() {
							return {
								"factor" : function(viewSpec) {
									return CORA.recordTypeHandlerView(viewSpec);
								}
							};
						}
						this.createRecordListHandlerFactory = function() {
							return {
								"factor" : function(listHandlerSpec) {
									return CORA.recordListHandler(listHandlerSpec);
								}
							};
						}
						this.createRecordHandlerFactory = function() {
							return {
								"factor" : function(recordHandlerSpec) {
									return CORA.recordHandler(recordHandlerSpec);
									;
								}
							};
						}
					},
					afterEach : function() {
					}
				});

QUnit.test("init", function(assert) {
	var spec = {
		"recordTypeHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
	};
	var recordTypeHandler = CORA.recordTypeHandler(spec);

	var view = recordTypeHandler.getView();
	assert.strictEqual(view.className, "recordType");

	var header = view.firstChild;
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.textContent, "metadataCollectionItem");

	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.className, "buttonView");
	var childrenView = view.childNodes[2];
	assert.strictEqual(childrenView.className, "childrenView");
});

QUnit.test("initWithCreateButton", function(assert) {
	var catchRecordTypeHandlerViewSpec;
	var spec = {
		"recordTypeHandlerViewFactory" : {
			"factor" : function(spec) {
				catchRecordTypeHandlerViewSpec = spec;
			}
		},
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
	};
	var recordTypeHandler = CORA.recordTypeHandler(spec);
	assert.notStrictEqual(catchRecordTypeHandlerViewSpec.createNewMethod, undefined);
});

QUnit.test("initWithoutCreateButton", function(assert) {
	var catchRecordTypeHandlerViewSpec;
	var spec = {
		"recordTypeHandlerViewFactory" : {
			"factor" : function(spec) {
				catchRecordTypeHandlerViewSpec = spec;
			}
		},
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.recordWithoutCreateLink,
	};
	var recordTypeHandler = CORA.recordTypeHandler(spec);

	assert.strictEqual(catchRecordTypeHandlerViewSpec.createNewMethod, undefined);
});

QUnit.test("headerOnClick", function(assert) {
	var spec = {
		"recordTypeHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
	};
	var recordTypeHandler = CORA.recordTypeHandler(spec);

	var view = recordTypeHandler.getView();
	assert.strictEqual(view.className, "recordType");

	var header = view.firstChild;
	assert.strictEqual(header.onclick, recordTypeHandler.createRecordTypeList);
});

QUnit.test("fetchList", function(assert) {
	var viewShowingInWorkView;
	var jsClientSpy = {
		"showView" : function(item) {
			viewShowingInWorkView = item.workView;
		}
	};
	this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
	var dependencies = {
		"ajaxCallFactory" : this.ajaxCallFactorySpy
	};

	var spec = {
		"dependencies" : dependencies,
		"recordTypeHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
		"jsClient" : jsClientSpy
	};

	var recordTypeHandler = CORA.recordTypeHandler(spec);

	var view = recordTypeHandler.getView();
	var header = view.firstChild;
	header.onclick();

	var childrenView = view.childNodes[2];
	var menuView = childrenView.childNodes[0];

	assert.strictEqual(menuView.textContent, "List");
	assert.notStrictEqual(menuView.onclick, undefined);

	var workView = menuView.modelObject.workView;
	assert.notStrictEqual(workView, undefined);
	assert.strictEqual(workView, viewShowingInWorkView);
	assert.strictEqual(workView.className, "workView");

	viewShowingInWorkView = undefined;
	menuView.onclick();
	assert.strictEqual(workView, viewShowingInWorkView);
});

QUnit.test("showRecord", function(assert) {
	var viewShowingInWorkView;
	var jsClientSpy = {
		"showView" : function(item) {
			viewShowingInWorkView = item.workView;
		}
	};
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var catchRecordTypeHandlerViewSpec;
	var catchRecordListHandlerSpec;
	var catchRecordHandlerSpec;
	var item = {
		"workView" : workView,
		"menuView" : menuView
	};
	var createListItem = function() {
		return item;
	}
	var spec = {
		"recordTypeHandlerViewFactory" : {
			"factor" : function(spec) {
				catchRecordTypeHandlerViewSpec = spec;
				return {
					"createListItem" : createListItem
				}
			}
		},
		"recordListHandlerFactory" : {
			"factor" : function(spec) {
				catchRecordListHandlerSpec = spec;
			}
		},
		"recordHandlerFactory" : {
			"factor" : function(spec) {
				catchRecordHandlerSpec = spec;
			}
		},
		"recordTypeRecord" : this.record,
		"jsClient" : jsClientSpy
	};

	var recordTypeHandler = CORA.recordTypeHandler(spec);
	catchRecordTypeHandlerViewSpec.fetchListMethod();
	catchRecordListHandlerSpec.createRecordHandlerMethod("view", this.record);

	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "view");
	assert.strictEqual(catchRecordHandlerSpec.record, this.record);
	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
	assert.strictEqual(catchRecordHandlerSpec.views, item);
	assert.strictEqual(catchRecordHandlerSpec.recordTypeHandler, recordTypeHandler);
});

QUnit.test("showNew", function(assert) {
	var viewShowingInWorkView;
	var jsClientSpy = {
		"showView" : function(item) {
			viewShowingInWorkView = item.workView;
		}
	};
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var catchRecordTypeHandlerViewSpec;
	var catchRecordListHandlerSpec;
	var catchRecordHandlerSpec;
	var item = {
		"workView" : workView,
		"menuView" : menuView
	};
	var createListItem = function() {
		return item;
	}
	var spec = {
		"recordTypeHandlerViewFactory" : {
			"factor" : function(spec) {
				catchRecordTypeHandlerViewSpec = spec;
				return {
					"createListItem" : createListItem
				}
			}
		},
		"recordListHandlerFactory" : {
			"factor" : function(spec) {
				catchRecordListHandlerSpec = spec;
			}
		},
		"recordHandlerFactory" : {
			"factor" : function(spec) {
				catchRecordHandlerSpec = spec;
			}
		},
		"recordTypeRecord" : this.record,
		"jsClient" : jsClientSpy
	};

	var recordTypeHandler = CORA.recordTypeHandler(spec);
	catchRecordTypeHandlerViewSpec.fetchListMethod();
	catchRecordListHandlerSpec.createRecordHandlerMethod("new", undefined);

	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "new");
	assert.strictEqual(catchRecordHandlerSpec.record, undefined);
	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
	assert.strictEqual(catchRecordHandlerSpec.views, item);
	assert.strictEqual(catchRecordHandlerSpec.recordTypeHandler, recordTypeHandler);
});

QUnit.test("fetchListCheckAjaxParameters", function(assert) {
	var viewShowingInWorkView;
	var jsClientSpy = {
		"showView" : function(view) {
			viewShowingInWorkView = view;
		}
	};
	this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
	var dependencies = {
		"ajaxCallFactory" : this.ajaxCallFactorySpy
	};
	
	var spec = {
		"dependencies" : dependencies,
		"recordTypeHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
		"jsClient" : jsClientSpy,
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};

	var recordTypeHandler = CORA.recordTypeHandler(spec);

	var view = recordTypeHandler.getView();
	var header = view.firstChild;
	header.onclick();

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/metadataCollectionItem/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/uub+recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
});

QUnit.test("testFactory", function(assert) {
	var spec = {
		"recordTypeHandlerViewFactory" : this.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record,
	};
	var recordTypeHandler = CORA.recordTypeHandler(spec);

	var workItemViewFactory = {
		"factor" : function(workItemViewSpec) {
			return CORA.workItemView(workItemViewSpec);
		}
	};
	var workItemViewFactory = CORA.workItemViewFactory(spec);
	var recordHandlerViewSpec = {
		"workItemViewFactory" : workItemViewFactory,
		"extraClassName" : "text"
	};

	var recordHandlerView = recordTypeHandler.createRecordHandlerViewFactory().factor(
			recordHandlerViewSpec);

	assert.notStrictEqual(recordHandlerView, undefined);

});
