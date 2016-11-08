/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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

QUnit.module("recordHandlerViewTest.js", {
	beforeEach : function() {
		this.workItemViewFactory = CORATEST.workItemViewFactorySpy();
		this.recordHandlerViewSpec = {
			"workItemViewFactory" : this.workItemViewFactory,
			"extraClassName" : "extraClassName2"
		};
		this.recordHandlerView = CORA.recordHandlerView(this.recordHandlerViewSpec);

		var workItemViewSpy = this.workItemViewFactory.getFactored(0);
		var viewsAddedToView = workItemViewSpy.getViewsAddedToView();
		this.viewsToolAddedToView = workItemViewSpy.getToolViewsAddedToView();

		this.editView = viewsAddedToView[0];
		this.showView = viewsAddedToView[1];
		this.buttonView = viewsAddedToView[2];

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var workItemViewSpy = this.workItemViewFactory.getFactored(0);
	var factoredWorkItemViewSpec = workItemViewSpy.getSpec();
	assert.strictEqual(factoredWorkItemViewSpec.extraClassName, "extraClassName2");
	assert.ok(factoredWorkItemViewSpec.holderFactory.factor);

	var viewsAddedToView = workItemViewSpy.getViewsAddedToView();
	assert.strictEqual(viewsAddedToView.length, 3);

	var editView = viewsAddedToView[0];
	assert.strictEqual(editView.nodeName, "SPAN");
	assert.strictEqual(editView.className, "editView");

	var showView = viewsAddedToView[1];
	assert.strictEqual(showView.nodeName, "SPAN");
	assert.strictEqual(showView.className, "showView");

	var buttonView = viewsAddedToView[2];
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("testGetView", function(assert) {
	var workItemViewSpy = this.workItemViewFactory.getFactored(0);
	assert.strictEqual(this.recordHandlerView.getView(), workItemViewSpy.getSpyView());
});

QUnit.test("addToEdit", function(assert) {
	var someView = document.createElement("span");
	this.recordHandlerView.addToEditView(someView);

	assert.strictEqual(this.editView.firstChild, someView);
});

QUnit.test("addToShow", function(assert) {
	var someView = document.createElement("span");
	this.recordHandlerView.addToShowView(someView);

	assert.strictEqual(this.showView.firstChild, someView);
});

QUnit.test("addButton", function(assert) {
	var clicked = false;
	var onclickMethod = function() {
		clicked = true;
	};
	this.recordHandlerView.addButton("text", onclickMethod);

	var button = this.buttonView.firstChild;
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, '');
});

QUnit.test("addButtonWithClassName", function(assert) {
	var clicked = false;
	var onclickMethod = function() {
		clicked = true;
	};
	this.recordHandlerView.addButton("text", onclickMethod, "someClass");

	var button = this.buttonView.firstChild;
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, "someClass");
});

QUnit.test("testClearViews", function(assert) {
	var recordHandlerView = this.recordHandlerView;

	this.recordHandlerView.addButton("text", undefined);

	var someView = document.createElement("span");
	recordHandlerView.addToEditView(someView);

	var someView2 = document.createElement("span");
	recordHandlerView.addToShowView(someView2);

	assert.strictEqual(this.editView.childNodes.length, 1);
	assert.strictEqual(this.showView.childNodes.length, 1);
	assert.strictEqual(this.buttonView.childNodes.length, 1);

	recordHandlerView.clearViews();
	assert.strictEqual(this.editView.childNodes.length, 0);
	assert.strictEqual(this.showView.childNodes.length, 0);
	assert.strictEqual(this.buttonView.childNodes.length, 0);
});

QUnit.test("testSetShowDataFunction", function(assert) {
	var showDataWasCalled = false;
	var dataFunction = function() {
		showDataWasCalled = true;
	}
	var recordHandlerView = this.recordHandlerView;
	recordHandlerView.setShowDataFunction(dataFunction);

	var workItemViewSpy = this.workItemViewFactory.getFactored(0);
	

	var button = this.viewsToolAddedToView[0];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, dataFunction);
	assert.strictEqual(button.className, "showData");
	assert.strictEqual(button.value, "Show data as JSON");

	assert.notOk(showDataWasCalled);
	button.onclick();
	assert.ok(showDataWasCalled);
});

QUnit.test("testSetCopyAsNewFunction", function(assert) {
	var showDataWasCalled = false;
	var dataFunction = function() {
		showDataWasCalled = true;
	}
	var recordHandlerView = this.recordHandlerView;
	recordHandlerView.setCopyAsNewFunction(dataFunction);

	var workItemViewSpy = this.workItemViewFactory.getFactored(0);
	
	var button = this.viewsToolAddedToView[0];
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, dataFunction);
	assert.strictEqual(button.className, "copyAsNew");
	assert.strictEqual(button.value, "Copy as new");

	assert.notOk(showDataWasCalled);
	button.onclick();
	assert.ok(showDataWasCalled);
});
