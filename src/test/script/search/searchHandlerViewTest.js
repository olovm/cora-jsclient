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
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandlerView = CORA.searchHandlerView();
	assert.strictEqual(searchHandlerView.type, "searchHandlerView");
});

QUnit.test("testInitSearchFormHolderCreated", function(assert) {
	var searchHandlerView = CORA.searchHandlerView();
	var view = searchHandlerView.getView();
	var searchFormHolder = view.firstChild;
	assert.strictEqual(searchFormHolder.nodeName, "SPAN");
	assert.strictEqual(searchFormHolder.className, "searchFormHolder");
});

QUnit.test("getView", function(assert) {
	var searchHandlerView = CORA.searchHandlerView();
	var view = searchHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "workItem search");
});

QUnit.test("testInitSearchFormHolderCreated", function(assert) {
	var searchHandlerView = CORA.searchHandlerView();
	var searchFormHolder = searchHandlerView.getView().firstChild;
	assert.strictEqual(searchFormHolder.childNodes.length, 0);
	
	var aPresentation = CORA.gui.createSpanWithClassName("some"); 
	searchHandlerView.addPresentationToSearchFormHolder(aPresentation);
	assert.strictEqual(searchFormHolder.childNodes.length, 1);
	assert.strictEqual(searchFormHolder.firstChild, aPresentation);
});
