/*
 * Copyright 2016, 2017 Uppsala University Library
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

QUnit.module("openGuiItemHandlerTest.js", {
	beforeEach : function() {
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.dependencies = {
			"openGuiItemHandlerViewFactory" : CORATEST
					.standardFactorySpy("openGuiItemHandlerViewSpy"),
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.type, "openGuiItemHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	assert.strictEqual(openGuiItemHandler.getSpec(), this.spec);
});

QUnit.test("testViewIsCreatedUsingFactory", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	assert.strictEqual(openGuiItemHandler.getView(), factoredView.getView());
});

QUnit.test("testViewSpec", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredSpec = this.dependencies.openGuiItemHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.headerText, this.dependencies.textProvider
			.getTranslation("theClient_openedText"));
	assert.strictEqual(factoredSpec.openSearchMethod, openGuiItemHandler.openSearch);
});

QUnit.test("testAddManagedGuiItemPassedOnToView", function(assert) {
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.openGuiItemHandlerViewFactory.getFactored(0);
	var aItem = CORATEST.managedGuiItemSpy();
	openGuiItemHandler.addManagedGuiItem(aItem);
	assert.strictEqual(factoredView.getAddedManagedGuiItem(0), aItem);
});

QUnit.test("showView", function(assert) {
	// var jsClient = CORA.jsClient(this.dependencies, this.spec);
	// var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	// var openGuiItemHandler = this.dependencies.openGuiItemHandlerFactory.getFactored(0);
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);

	// assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);

	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	openGuiItemHandler.showView(aView);
	// assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	var aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);

	// jsClient.showView(aDifferentView);
	openGuiItemHandler.showView(aDifferentView);
	// assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aDifferentView.getActive(), true);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 0);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);

	// jsClient.showView(aView);
	openGuiItemHandler.showView(aView);
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 2);
	assert.strictEqual(aDifferentView.getActive(), false);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 1);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);
});

// QUnit.test("hideAndRemoveView", function(assert) {
// var jsClient = CORA.jsClient(this.dependencies, this.spec);
// var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
//
// var mainView = jsClient.getView();
//
// assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
//
// var aView = CORATEST.managedGuiItemSpy();
// jsClient.showView(aView);
//
// assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
//
// jsClient.hideAndRemoveView(aView);
// assert.strictEqual(jsClientView.getRemovedWorkView(0), aView.getWorkView());
// });
QUnit.test("testViewRemoved", function(assert) {
	// var jsClient = CORA.jsClient(this.dependencies, this.spec);
	// var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
	//
	// assert.strictEqual(jsClientView.getAddedWorkView(0), undefined);
	//
	var openGuiItemHandler = CORA.openGuiItemHandler(this.dependencies, this.spec);

	var aView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewShown(), 0);

	// jsClient.showView(aView);
	openGuiItemHandler.addManagedGuiItem(aView);
	openGuiItemHandler.showView(aView);
	// assert.strictEqual(jsClientView.getAddedWorkView(0), aView.getWorkView());
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aView.getWorkViewHidden(), 0);

	var aDifferentView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aDifferentView.getActive(), false);
	//
	// jsClient.showView(aDifferentView);
	openGuiItemHandler.addManagedGuiItem(aDifferentView);
	openGuiItemHandler.showView(aDifferentView);
	// assert.strictEqual(jsClientView.getAddedWorkView(1), aDifferentView.getWorkView());
	assert.strictEqual(aView.getActive(), false);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 1);
	assert.strictEqual(aDifferentView.getActive(), true);
	assert.strictEqual(aDifferentView.getWorkViewHidden(), 0);
	assert.strictEqual(aDifferentView.getWorkViewShown(), 1);

	var aThirdView = CORATEST.managedGuiItemSpy();
	assert.strictEqual(aThirdView.getActive(), false);
	openGuiItemHandler.addManagedGuiItem(aThirdView);
	openGuiItemHandler.showView(aThirdView);
	// jsClient.showView(aThirdView);
	// assert.strictEqual(jsClientView.getAddedWorkView(2), aThirdView.getWorkView());
	//
	// jsClient.showView(aDifferentView);
	openGuiItemHandler.showView(aDifferentView);
	// jsClient.viewRemoved(aThirdView);
	openGuiItemHandler.removeView(aThirdView);

	// jsClient.viewRemoved(aDifferentView);
	openGuiItemHandler.removeView(aDifferentView);
	assert.strictEqual(aView.getActive(), true);
	assert.strictEqual(aView.getWorkViewHidden(), 1);
	assert.strictEqual(aView.getWorkViewShown(), 2);
	//
	// jsClient.viewRemoved(aView);
	openGuiItemHandler.removeView(aDifferentView);
	assert.strictEqual(aView.getActive(), false);
});
