/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017 Olov McKie
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
				"recordListHandlerTest.js",
				{
					beforeEach : function() {
						this.record = CORATEST.recordTypeList.dataList.data[4].record;

						var createRecordHandlerMethodCalledWithPresentationMode;
						var createRecordHandlerMethodCalledWithRecord;
						this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
						var dependencies = {
							"ajaxCallFactory" : this.ajaxCallFactorySpy,
							"managedGuiItemFactory" : CORATEST
									.standardFactorySpy("managedGuiItemSpy"),
							"recordGuiFactory" : CORATEST.recordGuiFactorySpy()

						};
						this.dependencies = dependencies;
						
						var addedManagedGuiItem;
						
						
						this.listHandlerSpec = {
							"recordTypeRecord" : this.record,
							"createRecordHandlerMethod" : function(
									presentationMode, record) {
								createRecordHandlerMethodCalledWithPresentationMode = presentationMode;
								createRecordHandlerMethodCalledWithRecord = record;
							},
							"jsClient" : CORATEST.jsClientSpy(),
							"views" : CORATEST.managedGuiItemSpy(),
							"baseUrl" : "http://epc.ub.uu.se/cora/rest/",
							"addToRecordTypeHandlerMethod" : function(managedGuiItem){
								addedManagedGuiItem = managedGuiItem;
							}
						};
						
						this.getAddedManagedGuiItem = function(){
							return addedManagedGuiItem;
						}
						
						
						this.answerListCall = function(no) {
							var ajaxCallSpy0 = this.ajaxCallFactorySpy
									.getFactored(no);
							var jsonRecordList = JSON
									.stringify(CORATEST.recordTypeList);
							var answer = {
								"spec" : ajaxCallSpy0.getSpec(),
								"responseText" : jsonRecordList
							};
							ajaxCallSpy0.getSpec().loadMethod(answer);
						}
						this.answerListCallBrokenList = function(no) {
							var ajaxCallSpy0 = this.ajaxCallFactorySpy
									.getFactored(no);
							var jsonRecordList = JSON
									.stringify(CORATEST.recordTypeBrokenList);
							var answer = {
								"spec" : ajaxCallSpy0.getSpec(),
								"responseText" : jsonRecordList
							};
							ajaxCallSpy0.getSpec().loadMethod(answer);
						}
						this.getCreateRecordHandlerMethodCalledWithPresentationMode = function() {
							return createRecordHandlerMethodCalledWithPresentationMode;
						}
						this.getCreateRecordHandlerMethodCalledWithRecord = function() {
							return createRecordHandlerMethodCalledWithRecord;
						}
						this.firstRecord = CORATEST.recordTypeList.dataList.data[0].record;

					},
					afterEach : function() {
					}
				});

QUnit.test("testType", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	assert.strictEqual(recordListHandler.type, "recordListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	assert.strictEqual(recordListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	assert.strictEqual(recordListHandler.getSpec(), this.listHandlerSpec);
});

QUnit.test("init", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
			"http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/uub+recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod,
			recordListHandler.processFetchedRecords);
});

QUnit.test("initTestManagedGuiItemFactoryCalled", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);

	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory
			.getFactored(0);
	var managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
	 assert.strictEqual(managedGuiItemSpec.activateMethod, this.listHandlerSpec.jsClient.showView);
	assert.ok(managedGuiItemSpy !== undefined);
});

QUnit.test("initTestManagedGuiItemAddedToRecordTypeHandler", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	var addedManagedGuiItem = this.getAddedManagedGuiItem();
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory
	.getFactored(0);
//	var managedGuiItemSpySpec = managedGuiItemSpy.getSpec(0);
	// assert.strictEqual(managedGuiItemSpySpec.x, "");
//	assert.ok(managedGuiItemSpy !== undefined);
	 assert.strictEqual(addedManagedGuiItem, managedGuiItemSpy);
});



QUnit.test("initCheckRemoveOnMenu", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);

	// var workView = this.workView;
	// var menuView = this.menuView;

	// assert.strictEqual(menuView.textContent, "List");
	// assert.strictEqual(
	// this.listHandlerSpec.views.getAddedMenuPresentation(0).textContent,
	// "List");
	assert.strictEqual(this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedMenuPresentation(0).textContent, "List");

	// var removeButton = menuView.childNodes[1];
	// assert.strictEqual(removeButton.className, "removeButton");
	// var event = document.createEvent('Event');
	//
	// removeButton.onclick(event);
	// assert.strictEqual(menuView.parentNode, null);
	// assert.strictEqual(workView.parentNode, null);
});

// QUnit.test("initCheckRemoveOnMenuWhenViewsAreAddedToParents",
// function(assert) {
// var menuView = this.menuView;
// var menuViewParent = document.createElement("span");
// menuViewParent.appendChild(menuView);
//
// var workView = this.workView;
// var workViewParent = document.createElement("span");
// workViewParent.appendChild(workView);
//
// var recordListHandler = CORA.recordListHandler(this.dependencies,
// this.listHandlerSpec);
//
// var removeButton = menuView.childNodes[1];
// assert.strictEqual(removeButton.className, "removeButton");
// var event = document.createEvent('Event');
//
// removeButton.onclick(event);
// assert.strictEqual(menuView.parentNode, null);
// assert.strictEqual(workView.parentNode, null);
// });

QUnit.test("fetchListCheckGeneratedList", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	this.answerListCall(0);
	// assert.strictEqual(this.workView.childNodes.length, 15);
	// assert.ok(this.listHandlerSpec.views
	// .getAddedWorkPresentation(14) !== undefined);
	// assert.ok(this.listHandlerSpec.views
	// .getAddedWorkPresentation(15) === undefined);
	var factoredManagedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.ok(factoredManagedGuiItem.getAddedWorkPresentation(14) !== undefined);
	assert.ok(factoredManagedGuiItem.getAddedWorkPresentation(15) === undefined);
});

QUnit.test("fetchListCheckGeneratedListClickable", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	this.answerListCall(0);

	// var firstListItem = this.workView.childNodes[0];
	// var firstListItem =
	// this.listHandlerSpec.views.getAddedWorkPresentation(0);
	var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(0);
	assert.strictEqual(firstListItem.className, "listItem recordType");
	assert.notStrictEqual(firstListItem.onclick, undefined);
});

QUnit.test("fetchListCheckError", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});
	// var addedItem = this.listHandlerSpec.views.getAddedWorkPresentation(0);
	var addedItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(0);

	// assert.strictEqual(this.workView.childNodes[0].textContent, "404");
	assert.strictEqual(addedItem.textContent, "404");
});

QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(
		assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	this.answerListCall(0);

	// var firstListItem = this.workView.childNodes[0];
	// var firstListItem =
	// this.listHandlerSpec.views.getAddedWorkPresentation(0);
	var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(0);
	firstListItem.onclick();

	assert.stringifyEqual(this
			.getCreateRecordHandlerMethodCalledWithPresentationMode(), "view");
	assert.stringifyEqual(this.getCreateRecordHandlerMethodCalledWithRecord(),
			this.firstRecord);
});

QUnit.test("fetchListCheckUsedPresentationId", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	this.answerListCall(0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");
	assert.strictEqual(factoredSpec.dataDivider, "cora");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.stringifyEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");
});

QUnit.test("fetchListBroken", function(assert) {
	var recordListHandler = CORA.recordListHandler(this.dependencies,
			this.listHandlerSpec);
	this.answerListCallBrokenList(0);

	// var firstListItem =
	// this.listHandlerSpec.views.getAddedWorkPresentation(1);
	var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
			.getAddedWorkPresentation(1);
	assert
			.strictEqual(firstListItem.textContent.substring(0, 10),
					"TypeError:");
});
