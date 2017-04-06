/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("searchHandlerTest.js", {
	beforeEach : function() {
		var addedManagedGuiItem = [];
		this.getAddedManagedGuiItem = function(number) {
			return addedManagedGuiItem[number];
		}
		this.dependencies = {
			"searchHandlerViewFactory" : CORATEST.standardFactorySpy("searchHandlerViewSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		}
		this.spec = {
			"addToSearchRecordHandlerMethod" : function(managedGuiItem) {
				addedManagedGuiItem.push(managedGuiItem);
			},
			"showViewMethod" : function() {
			},
			"removeViewMethod" : function() {
			}
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	assert.strictEqual(searchHandler.type, "searchHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	assert.strictEqual(searchHandler.getDependencies(), this.dependencies);
});

QUnit.test("testInitViewCreatedUsingFactory", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0);
	assert.strictEqual(factoredView.type, "searchHandlerViewSpy");
});

QUnit.test("testInitManagedGuiItemCreatedUsingFactory", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.type, "managedGuiItemSpy");
	var factoredItemSpec = this.dependencies.managedGuiItemFactory.getSpec(0);
	assert.strictEqual(factoredItemSpec.activateMethod, this.spec.showViewMethod);
	assert.strictEqual(factoredItemSpec.removeMethod, this.spec.removeViewMethod);
});

QUnit.test("testInitViewAddedToManagedGuiItemsMenuView", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	// var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0).getView();
	var addedManagedGuiItem = this.getAddedManagedGuiItem(0);
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem, addedManagedGuiItem);
});

QUnit.test("testInitViewAddedToManagedGuiItemsWorkView", function(assert) {
	var searchHandler = CORA.searchHandler(this.dependencies, this.spec);
	var factoredView = this.dependencies.searchHandlerViewFactory.getFactored(0).getView();
	var factoredItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(factoredItem.getAddedWorkPresentation(0), factoredView);
});
