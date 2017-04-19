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
		// "managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
		// "recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
		// "ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy")
		}
		this.spec = {
		// "addToSearchRecordHandlerMethod" : function(managedGuiItem) {
		// addedManagedGuiItem.push(managedGuiItem);
		// },
		// "showViewMethod" : function(managedGuiItem) {
		// addedToShowView.push(managedGuiItem);
		// },
		// "removeViewMethod" : function() {
		// },
		// "metadataId" : "someMetadataId",
		// "presentationId" : "somePresentationId",
		// "searchLink" : {
		// "requestMethod" : "GET",
		// "rel" : "search",
		// "url" : "http://epc.ub.uu.se/cora/rest/record/searchResult/coraTextSearch",
		// "accept" : "application/vnd.uub.recordList+json"
		// }
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	assert.strictEqual(resultHandler.type, "resultHandler");
});

// QUnit.test("testGetDependencies", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// assert.strictEqual(resultHandler.getDependencies(), this.dependencies);
// });
//
QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "resultHandlerViewSpy");
});

QUnit.test("testGetViewIsPassedOnToView", function(assert) {
	var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);

	assert.strictEqual(resultHandler.getView(), factoredView.getView());
});

// QUnit.test("testInitViewSpec", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredSpec = this.dependencies.resultHandlerViewFactory.getSpec(0);
// assert.strictEqual(factoredSpec.searchMethod, resultHandler.search);
// });
//
// QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
// assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
// var factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
// assert.strictEqual(factoredItemSpec.activateMethod, this.spec.showViewMethod);
// assert.strictEqual(factoredItemSpec.removeMethod, this.spec.removeViewMethod);
// });
//
// QUnit.test("testInitViewAddedToManagedGuiItemsMenuView", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var addedManagedGuiItem = this.getAddedManagedGuiItem(0);
// var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
// assert.strictEqual(factoredItem, addedManagedGuiItem);
// });
//
// QUnit.test("testInitViewAddedToManagedGuiItemsWorkView", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0).getView();
// var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
// assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
// });
//
// QUnit.test("testInitShowViewMethodCalled", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var addedToShowView = this.getAddedToShowView(0);
// var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
// assert.strictEqual(factoredItem, addedToShowView);
// });
//
// QUnit.test("testInitRecordGuiFactoryCalled", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
// assert.strictEqual(factoredSpec.metadataId, "someMetadataId");
// });
//
// QUnit.test("testInitRecordGuiGetPresentationCalled", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.strictEqual(factoredGui.getPresentationIdUsed(0), "somePresentationId");
// assert.strictEqual(factoredGui.getMetadataIdsUsedInData(0), "someMetadataId");
// });
//
// QUnit.test("testInitRecordGuiGetPresentationAddedToFormView", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
//
// assert.strictEqual(this.dependencies.resultHandlerViewFactory.getFactored(0)
// .getPresentationsAddedToSearchForm(0), factoredGui.getReturnedPresentations(0)
// .getView());
// });
//
// QUnit.test("testInitRecordGuiStartedGui", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.strictEqual(factoredGui.getInitCalled(), 1);
// });
//
// QUnit.test("testInitRecordGuiErrorsShownInForm", function(assert) {
// var recordGuiFactoryBroken = {
// "factor" : function(metadataId, data) {
// throw new Error("missing metadata");
// }
// };
// this.dependencies.recordGuiFactory = recordGuiFactoryBroken;
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredView = this.dependencies.resultHandlerViewFactory.getFactored(0);
//
// assert.strictEqual(factoredView.getPresentationsAddedToSearchForm(0).textContent,
// "\"something went wrong, probably missing metadata, " + "Error: missing metadata\"");
// assert.ok(factoredView.getPresentationsAddedToSearchForm(1).textContent.length > 10);
// });
//
// QUnit.test("testSearch", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.strictEqual(factoredGui.getDataValidated(), 0);
// resultHandler.search();
// assert.strictEqual(factoredGui.getDataValidated(), 1);
//
// var ajaxCallSpec = this.dependencies.ajaxCallFactory.getSpec(0);
// assert.strictEqual(ajaxCallSpec.url, this.spec.searchLink.url);
// assert.strictEqual(ajaxCallSpec.requestMethod, this.spec.searchLink.requestMethod);
// assert.strictEqual(ajaxCallSpec.accept, this.spec.searchLink.accept);
// assert.strictEqual(ajaxCallSpec.contentType, undefined);
//
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
// assert.strictEqual(ajaxCallSpec.data, undefined);
// assert.stringifyEqual(ajaxCallSpec.parameters, {
// "searchData" : JSON.stringify(factoredGui.dataHolder.getData())
// });
// });
//
// QUnit.test("testSearchNotValidDataNoAjaxCall", function(assert) {
// var resultHandler = CORA.resultHandler(this.dependencies, this.spec);
// var factoredGui = this.dependencies.recordGuiFactory.getFactored(0);
// factoredGui.setValidateAnswer(false);
// assert.strictEqual(factoredGui.getDataValidated(), 0);
// resultHandler.search();
// assert.strictEqual(factoredGui.getDataValidated(), 1);
//
// var ajaxCallSpec = this.dependencies.ajaxCallFactory.getSpec(0);
// assert.strictEqual(ajaxCallSpec, undefined);
// });
