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

QUnit.module("searchHandlerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"workItemViewFactory" : CORATEST.standardFactorySpy("workItemViewSpy"),
			"messageHolderFactory" : CORATEST.standardFactorySpy("messageHolderSpy")
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	assert.strictEqual(searchHandlerView.type, "searchHandlerView");
});

QUnit.test("testInitFactoredWorkItemViewSpec", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	var factoredSpec= this.dependencies.workItemViewFactory.getSpec(0);
	assert.strictEqual(factoredSpec.extraClassName, "search");
});

QUnit.test("testInitViewIsFactoredWorkItemView", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0).getView();
	var view = searchHandlerView.getView();
	
	assert.strictEqual(view, factoredWorkItemView);
});

QUnit.test("testInitSearchFormHolderCreated", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(searchFormHolder.nodeName, "SPAN");
	assert.strictEqual(searchFormHolder.className, "searchFormHolder");
});

QUnit.test("testGetDependencies", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	assert.strictEqual(searchHandlerView.getDependencies(), this.dependencies);
});

QUnit.test("testInitSearchFormHolderCreated", function(assert) {
	var searchHandlerView = CORA.searchHandlerView(this.dependencies);
	var factoredWorkItemView = this.dependencies.workItemViewFactory.getFactored(0);
	var searchFormHolder = factoredWorkItemView.getViewsAddedToView(0);
	assert.strictEqual(searchFormHolder.childNodes.length, 0);

	var aPresentation = CORA.gui.createSpanWithClassName("some");
	searchHandlerView.addPresentationToSearchFormHolder(aPresentation);
	assert.strictEqual(searchFormHolder.childNodes.length, 1);
	assert.strictEqual(searchFormHolder.firstChild, aPresentation);
});
