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
								"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
								"accept" : "application/uub+record+json"
							}
						},
						"name" : "dataDivider"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeGroup"
						}
					]
				}, {
					"name" : "presentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeViewPGroup"
						}
					]
				}, {
					"name" : "presentationFormId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeFormPGroup"
						}
					]
				}, {
					"name" : "newMetadataId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeNewGroup"
						}
					]
				}, {
					"name" : "newPresentationFormId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeFormNewPGroup"
						}
					]
				}, {
					"name" : "menuPresentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeMenuPGroup"
						}
					]
				}, {
					"name" : "listPresentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "recordTypeListPGroup"
						}
					]
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
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
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
		this.metadataIdsUsedInData = [];
		var metadataIdsUsedInData = this.metadataIdsUsedInData;
		this.recordGui = {
			"getPresentation" : function(presentationId, metadataIdUsedInData) {
				presentationIdUsed.push(presentationId);
				metadataIdsUsedInData.push(metadataIdUsedInData);
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
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		this.listHandlerSpec = {
			"dependencies" : dependencies,
			"jsClient" : this.jsClientSpy,
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"recordTypeRecord" : this.record,
			"createListItemMethod" : createListItem,
			"createRecordHandlerMethod" : function(presentationMode, record) {
				createRecordHandlerMethodCalledWithPresentationMode = presentationMode;
				createRecordHandlerMethodCalledWithRecord = record;
			},
//			"views" : {
//				"workView" : this.workView,
//				"menuView" : this.menuView 
//			},
			"views": CORATEST.managedGuiItemSpy(),
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
		this.answerListCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecordList = JSON.stringify(CORATEST.recordTypeList);
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerListCallBrokenList = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecordList = JSON.stringify(CORATEST.recordTypeBrokenList);
			var answer = {
					"spec" : ajaxCallSpy0.getSpec(),
					"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.getCreateRecordHandlerMethodCalledWithPresentationMode=function(){
			return createRecordHandlerMethodCalledWithPresentationMode;
		}
		this.getCreateRecordHandlerMethodCalledWithRecord=function(){
			return createRecordHandlerMethodCalledWithRecord;
		}
		this.firstRecord = CORATEST.recordTypeList.dataList.data[0].record;
		
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/uub+recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordListHandler.processFetchedRecords);
});

QUnit.test("initCheckRemoveOnMenu", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);

//	var workView = this.workView;
//	var menuView = this.menuView;

//	assert.strictEqual(menuView.textContent, "List");
	assert.strictEqual(this.listHandlerSpec.views.getAddedMenuPresentation(0).textContent, "List");
	

//	var removeButton = menuView.childNodes[1];
//	assert.strictEqual(removeButton.className, "removeButton");
//	var event = document.createEvent('Event');
//
//	removeButton.onclick(event);
//	assert.strictEqual(menuView.parentNode, null);
//	assert.strictEqual(workView.parentNode, null);
});

//QUnit.test("initCheckRemoveOnMenuWhenViewsAreAddedToParents", function(assert) {
//	var menuView = this.menuView;
//	var menuViewParent = document.createElement("span");
//	menuViewParent.appendChild(menuView);
//
//	var workView = this.workView;
//	var workViewParent = document.createElement("span");
//	workViewParent.appendChild(workView);
//
//	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
//
//	var removeButton = menuView.childNodes[1];
//	assert.strictEqual(removeButton.className, "removeButton");
//	var event = document.createEvent('Event');
//
//	removeButton.onclick(event);
//	assert.strictEqual(menuView.parentNode, null);
//	assert.strictEqual(workView.parentNode, null);
//});

QUnit.test("fetchListCheckGeneratedList", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	this.answerListCall(0);
//	assert.strictEqual(this.workView.childNodes.length, 15);
	assert.ok(this.listHandlerSpec.views.getAddedWorkPresentation(14) !== undefined);
	assert.ok(this.listHandlerSpec.views.getAddedWorkPresentation(15) === undefined);
});

QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	this.answerListCall(0);

//	var firstListItem = this.workView.childNodes[0];
	var firstListItem = this.listHandlerSpec.views.getAddedWorkPresentation(0);
	assert.strictEqual(firstListItem.className, "listItem recordType");
	assert.notStrictEqual(firstListItem.onclick, undefined);
});

QUnit.test("fetchListCheckError", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	var addedItem = this.listHandlerSpec.views.getAddedWorkPresentation(0);
	
//	assert.strictEqual(this.workView.childNodes[0].textContent, "404");
	assert.strictEqual(addedItem.textContent, "404");
});

QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	this.answerListCall(0);

//	var firstListItem = this.workView.childNodes[0];
	var firstListItem = this.listHandlerSpec.views.getAddedWorkPresentation(0);
	firstListItem.onclick();

	assert.stringifyEqual(this.getCreateRecordHandlerMethodCalledWithPresentationMode(), "view");
	assert.stringifyEqual(this.getCreateRecordHandlerMethodCalledWithRecord(), this.firstRecord);
});

QUnit.test("fetchListCheckUsedPresentationId", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	this.answerListCall(0);

	assert.stringifyEqual(this.presentationIdUsed[0], "recordTypeListPGroup");
	assert.strictEqual(this.metadataIdsUsedInData[0], "recordTypeGroup2");
	assert.stringifyEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.dataDividerUsed[0], "cora");
}); 

QUnit.test("fetchListBroken", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.listHandlerSpec);
	this.answerListCallBrokenList(0);

//	var firstListItem = this.workView.childNodes[0];
	var firstListItem = this.listHandlerSpec.views.getAddedWorkPresentation(1);
	assert.strictEqual(firstListItem.textContent.substring(0, 10), "TypeError:");
});
