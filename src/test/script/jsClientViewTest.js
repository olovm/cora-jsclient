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

QUnit.module("jsClientViewTest.js", {
	beforeEach : function() {

		this.dependencies = {
			"messageHolderFactory" : CORATEST.messageHolderFactorySpy()
		};
		this.spec = {
			"name" : "The Client"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);
	assert.strictEqual(jsClientView.type, "jsClientView");
	var mainView = jsClientView.getView();

	assert.strictEqual(mainView.modelObject, jsClientView);
});

QUnit.test("initCreatesMessageHolder", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);
	var messageHolder = this.dependencies.messageHolderFactory.getFactored(0);
	
	assert.strictEqual(jsClientView.getHeader().childNodes[1], messageHolder.getView());
});

QUnit.test("testMainLayout", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);
	var mainView = jsClientView.getView();
	assert.strictEqual(mainView.className, "jsClient mainView");

	var header = jsClientView.getHeader();
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header, mainView.childNodes[0]);

	var sideBar = jsClientView.getSideBar();
	assert.strictEqual(sideBar.className, "sideBar");
	assert.strictEqual(sideBar, mainView.childNodes[1]); 

	var searchesView = jsClientView.getSearchesView();
	assert.strictEqual(searchesView.className, "searchesView");
	assert.strictEqual(searchesView, sideBar.childNodes[0]);

	var recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.className, "recordTypesView");
	assert.strictEqual(recordTypesView, sideBar.childNodes[1]);
 
	var workArea = jsClientView.getWorkView();
	assert.strictEqual(workArea.className, "workArea");
	assert.strictEqual(workArea, mainView.childNodes[2]);
});

QUnit.test("testGetSpec", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);
	assert.strictEqual(jsClientView.getSpec(), this.spec);
});

QUnit.test("testAddToSearchesView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);
	var aView = document.createElement("SPAN");
	jsClientView.addToSearchesView(aView);
	var searchesViewFirstChild = jsClientView.getSearchesView().childNodes[0];
	assert.strictEqual(searchesViewFirstChild, aView);
});

QUnit.test("testAddToRecordTypesView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	var recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.childNodes.length, 0);

	var someView = CORA.gui.createSpanWithClassName("recordType");
	jsClientView.addToRecordTypesView(someView);

	var firstRecordType = recordTypesView.childNodes[0];
	assert.strictEqual(firstRecordType, someView);
	assert.strictEqual(firstRecordType.className, "recordType");
});

QUnit.test("testClearRecordTypesView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	var someView = CORA.gui.createSpanWithClassName("recordType");
	jsClientView.addToRecordTypesView(someView);

	var recordTypesView = jsClientView.getRecordTypesView();
	assert.strictEqual(recordTypesView.childNodes.length, 1);

	jsClientView.clearRecordTypesView();

	assert.strictEqual(recordTypesView.childNodes.length, 0);
});

QUnit.test("testAddWorkView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	var workView = jsClientView.getWorkView();
	assert.strictEqual(workView.childNodes.length, 0);

	var someView = CORA.gui.createSpanWithClassName("recordType");
	jsClientView.addToWorkView(someView);

	var firstWorkView = workView.childNodes[0];
	assert.strictEqual(firstWorkView, someView);
	assert.strictEqual(firstWorkView.className, "recordType");
});

QUnit.test("testAddLoginManagerView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	var someView = CORA.gui.createSpanWithClassName("loginManagerView");
	jsClientView.addLoginManagerView(someView);

	assert.strictEqual(jsClientView.getHeader().childNodes[2], someView);
});

QUnit.test("testAddGlobalView", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	var someView = CORA.gui.createSpanWithClassName("globalView");
	jsClientView.addGlobalView(someView);

	assert.strictEqual(jsClientView.getHeader().childNodes[2], someView);
});

QUnit.test("testSetErrorMessage", function(assert) {
	var jsClientView = CORA.jsClientView(this.dependencies, this.spec);

	jsClientView.addErrorMessage("some error text");
	var messageHolder = this.dependencies.messageHolderFactory.getFactored(0);
	var expectedMessageSpec = {
		"message" : "some error text",
		"type" : CORA.message.ERROR
	};
	assert.stringifyEqual(messageHolder.getCreatedMessageSpec(0), expectedMessageSpec);
});
