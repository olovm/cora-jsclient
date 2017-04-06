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

QUnit.module("searchRecordHandlerTest.js", {
	beforeEach : function() {
		this.search = CORATEST.searchRecordList.dataList.data[0].record;

		this.dependencies = {
			"searchRecordHandlerViewFactory" : CORATEST
					.standardFactorySpy("searchRecordHandlerViewSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"jsClient" : CORATEST.jsClientSpy()
		};
		// this.dependencies = {
		// "ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
		// "recordTypeHandlerViewFactory" :
		// CORATEST.recordTypeHandlerViewFactorySpy(),
		// "recordListHandlerFactory" : CORATEST.recordListHandlerFactorySpy(),
		// "recordHandlerFactory" : CORATEST.recordHandlerFactorySpy(),
		// "managedGuiItemFactory" :
		// CORATEST.standardFactorySpy("managedGuiItemSpy"),
		// "jsClient" : CORATEST.jsClientSpy()
		// };
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
	assert.strictEqual(factoredSpec.openSearchMethod, searchRecordHandler.openSearch);
});

QUnit.test("testOpenSearchEnsureManagedGuiItemIsCreatedAndShownInJsClient", function(assert) {
	var searchRecordHandler = CORA.searchRecordHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchRecordHandlerViewFactory.getFactored(0);
	searchRecordHandler.openSearch();
	// var createdManagedGuiItem =
	// this.dependencies.jsClient.getCreatedManagedGuiItem(0);
	var createdManagedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(this.dependencies.jsClient.getViewShowingInWorkView(0),
			createdManagedGuiItem.workView);
});
