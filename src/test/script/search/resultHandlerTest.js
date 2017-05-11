/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("resultHandlerTest.js", {
	beforeEach : function() {
		var addedManagedGuiItem = [];
		this.getAddedManagedGuiItem = function(number) {
			return addedManagedGuiItem[number];
		}
		var addedToShowView = [];
		this.getAddedToShowView = function(number) {
			return addedToShowView[number];
		}
		this.dependencies = {
			"resultHandlerViewFactory" : CORATEST.standardFactorySpy("resultHandlerViewSpy"),
			"textProvider" : CORATEST.textProviderSpy(),
			"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
			"jsClient" : CORATEST.jsClientSpy(),
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy")
		}
		this.spec = {
			"dataList" : CORATEST.searchRecordList.dataList
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	assert.strictEqual(resultHandler.type, "resultHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	assert.strictEqual(resultHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	assert.strictEqual(resultHandler.getSpec(), this.spec);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "resultHandlerViewSpy");
});

QUnit.test("testInitViewSpec", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.resultHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.ofText, this.dependencies.textProvider
			.getTranslation("theClient_resultListOfText"));
	assert.strictEqual(factoredViewSpec.fromNo, "1");
	assert.strictEqual(factoredViewSpec.toNo, "38");
	assert.strictEqual(factoredViewSpec.totalNo, "38");
	assert.strictEqual(factoredViewSpec.resultHandler, resultHandler);
});

QUnit.test("testInitViewCreatesRecordHandlerForEachResultItem", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);

	var recordHandlerSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(recordHandlerSpec.presentationMode, "view");
	assert.strictEqual(recordHandlerSpec.record, this.spec.dataList.data[0].record);
	assert.strictEqual(recordHandlerSpec.jsClient, this.dependencies.jsClient);

	var recordHandlerLastSpec = this.dependencies.recordHandlerFactory.getSpec(37);
	assert.strictEqual(recordHandlerLastSpec.presentationMode, "view");
	assert.strictEqual(recordHandlerLastSpec.record, this.spec.dataList.data[37].record);
	assert.strictEqual(recordHandlerLastSpec.jsClient, this.dependencies.jsClient);

	assert.strictEqual(this.dependencies.recordHandlerFactory.getSpec(38), undefined);
});

QUnit.test("testInitViewAddsRecordHandlersListViewForEachResultItem", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedPresentation(0).presentation, recordHandler
			.getManagedGuiItem().getListView());
	assert.strictEqual(factoredView.getAddedPresentation(0).record,
			this.spec.dataList.data[0].record);

	var recordHandlerLast = this.dependencies.recordHandlerFactory.getFactored(37);
	assert.strictEqual(factoredView.getAddedPresentation(37).presentation, recordHandlerLast
			.getManagedGuiItem().getListView());
	assert.strictEqual(factoredView.getAddedPresentation(37).record,
			this.spec.dataList.data[37].record);

	assert.strictEqual(this.dependencies.recordHandlerFactory.getSpec(38), undefined);
});

QUnit.test("testOpenRecord", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var record = {};
	var openInfo = {
		"presentationMode" : "view",
		"record" : record,
		"loadInBackground" : "false"
	};
	resultHandler.openRecord(openInfo);

	var recordHandlerSpec = this.dependencies.recordHandlerFactory.getSpec(38);
	assert.strictEqual(recordHandlerSpec.presentationMode, "view");
	assert.strictEqual(recordHandlerSpec.record, record);
	assert.strictEqual(recordHandlerSpec.jsClient, this.dependencies.jsClient);

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(38);
	assert.strictEqual(this.dependencies.jsClient.getAddedGuiItem(0), recordHandler
			.getManagedGuiItem());
	assert.strictEqual(this.dependencies.jsClient.getViewShowingInWorkView(0), recordHandler
			.getManagedGuiItem());

	assert.strictEqual(this.dependencies.recordHandlerFactory.getSpec(39), undefined);
});
QUnit.test("testOpenRecordInBackground", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var record = {};
	var openInfo = {
		"presentationMode" : "view",
		"record" : record,
		"loadInBackground" : "true"
	};
	resultHandler.openRecord(openInfo);

	var recordHandlerSpec = this.dependencies.recordHandlerFactory.getSpec(38);
	assert.strictEqual(recordHandlerSpec.presentationMode, "view");
	assert.strictEqual(recordHandlerSpec.record, record);
	assert.strictEqual(recordHandlerSpec.jsClient, this.dependencies.jsClient);

	var recordHandler = this.dependencies.recordHandlerFactory.getFactored(38);
	assert.strictEqual(this.dependencies.jsClient.getAddedGuiItem(0), recordHandler
			.getManagedGuiItem());
	assert.strictEqual(this.dependencies.jsClient.getViewShowingInWorkView(0), undefined);

	assert.strictEqual(this.dependencies.recordHandlerFactory.getSpec(39), undefined);
});

QUnit.test("testGetViewIsPassedOnToView", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);

	assert.strictEqual(resultHandler.getView(), factoredView.getView());
});

// QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);
//
// var firstListItem = factoredView.getAddedPresentation(0);
// var event = document.createEvent('Event');
// firstListItem.onclick(event);
//
// assert.stringifyEqual(this.getopenRecordMethodCalledWithPresentationMode(), "view");
// assert.stringifyEqual(this.getopenRecordMethodCalledWithRecord(), this.firstRecord);
// assert.stringifyEqual(this.getopenRecordMethodCalledWithLoadInBackground(), "false");
// });

// QUnit.test("fetchListCheckGeneratedListClickablePresentationMode", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(0);
// var event = document.createEvent('Event');
// firstListItem.onclick(event);
//
// assert.stringifyEqual(this.getopenRecordMethodCalledWithPresentationMode(), "view");
// assert.stringifyEqual(this.getopenRecordMethodCalledWithRecord(), this.firstRecord);
// assert.stringifyEqual(this.getopenRecordMethodCalledWithLoadInBackground(), "false");
// });
//
// QUnit.test("fetchListCheckGeneratedListClickableLoadInBackground", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(0);
// var event = document.createEvent('Event');
// event.ctrlKey = true;
// firstListItem.onclick(event);
//
// assert.stringifyEqual(this.getopenRecordMethodCalledWithLoadInBackground(), "true");
// });
//
// QUnit.test("fetchListCheckUsedPresentationId", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCall(0);
//
// var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
// assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");
// assert.strictEqual(factoredSpec.dataDivider, "cora");
//
// var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.stringifyEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeListPGroup");
// assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");
// });

// QUnit.test("fetchListBroken", function(assert) {
// var recordListHandler = CORA.recordListHandler(this.dependencies, this.spec);
// this.answerListCallBrokenList(0);
//
// var firstListItem = this.dependencies.managedGuiItemFactory.getFactored(0)
// .getAddedWorkPresentation(1);
// assert.strictEqual(firstListItem.textContent.substring(0, 10), "TypeError:");
// });
