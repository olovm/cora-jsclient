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

QUnit.module("searchHandlerViewFactoryTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory();
	assert.strictEqual(searchHandlerViewFactory.type, "searchHandlerViewFactory");
});

QUnit.test("testFactor", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory();
	var searchHandlerView = searchHandlerViewFactory.factor();
	assert.strictEqual(searchHandlerView.type, "searchHandlerView");
});

QUnit.test("factorTestDependencies", function(assert) {
	var searchHandlerViewFactory = CORA.searchHandlerViewFactory();
	var searchHandlerView = searchHandlerViewFactory.factor();
	assert.strictEqual(searchHandlerView.getDependencies().workItemViewFactory.type,
			"workItemViewFactory");
	assert.strictEqual(searchHandlerView.getDependencies().messageHolderFactory.type,
			"messageHolderFactory");
});