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

QUnit.module("recordHandlerViewTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "workItem text");

	var editView = view.childNodes[0];
	assert.strictEqual(editView.nodeName, "SPAN");
	assert.strictEqual(editView.className, "editView");

	var showView = view.childNodes[1];
	assert.strictEqual(showView.nodeName, "SPAN");
	assert.strictEqual(showView.className, "showView");

	var buttonView = view.childNodes[2];
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("addEdit", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	var someView = document.createElement("span");
	recordHandlerView.addEditView(someView);

	var editView = view.childNodes[0];
	assert.strictEqual(editView.firstChild, someView);
});

QUnit.test("addShow", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	var someView = document.createElement("span");
	recordHandlerView.addShowView(someView);

	var showView = view.childNodes[1];
	assert.strictEqual(showView.firstChild, someView);
});

QUnit.test("addButton", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	var clicked = false;
	var onclickMethod = function() {
		clicked = true;
	};
	recordHandlerView.addButton("text", onclickMethod);

	var buttonView = view.childNodes[2];
	var button = buttonView.firstChild;
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, '');
});

QUnit.test("addButtonWithClassName", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	var clicked = false;
	var onclickMethod = function() {
		clicked = true;
	};
	recordHandlerView.addButton("text", onclickMethod, "someClass");

	var buttonView = view.childNodes[2];
	var button = buttonView.firstChild;
	assert.strictEqual(button.nodeName, "INPUT");
	assert.strictEqual(button.type, "button");
	assert.strictEqual(button.onclick, onclickMethod);
	assert.strictEqual(button.className, "someClass");
});

QUnit.test("testClearViews", function(assert) {
	var recordHandlerViewSpec = {
		"extraClassName" : "text",
	};
	var recordHandlerView = CORA.recordHandlerView(recordHandlerViewSpec);
	var view = recordHandlerView.getView();

	recordHandlerView.addButton("text", undefined);
	var someView = document.createElement("span");
	recordHandlerView.addEditView(someView);
	var someView2 = document.createElement("span");
	recordHandlerView.addShowView(someView2);

	assert.strictEqual(view.childNodes[0].childNodes.length, 1);
	assert.strictEqual(view.childNodes[1].childNodes.length, 1);
	assert.strictEqual(view.childNodes[2].childNodes.length, 1);

	recordHandlerView.clearViews();
	assert.strictEqual(view.childNodes[0].childNodes.length, 0);
	assert.strictEqual(view.childNodes[1].childNodes.length, 0);
	assert.strictEqual(view.childNodes[2].childNodes.length, 0);

});
