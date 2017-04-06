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

QUnit.module("searchHandlerFactoryTest.js", {
	beforeEach : function() {
		this.spec = {
			"addToSearchRecordHandlerMethod" : function() {
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

QUnit.test("init", function(assert) {
	var searchHandlerFactory = CORA.searchHandlerFactory();
	assert.strictEqual(searchHandlerFactory.type, "searchHandlerFactory");
});

QUnit.test("testFactor", function(assert) {
	var searchHandlerFactory = CORA.searchHandlerFactory();
	var searchHandler = searchHandlerFactory.factor(this.spec);
	assert.strictEqual(searchHandler.type, "searchHandler");
});

QUnit.test("testFactorAddedDependencies", function(assert) {
	var searchHandlerFactory = CORA.searchHandlerFactory();
	var searchHandler = searchHandlerFactory.factor(this.spec);
	var addedDep = searchHandler.getDependencies();
	assert.strictEqual(addedDep.searchHandlerViewFactory.type, "searchHandlerViewFactory");
	assert.strictEqual(addedDep.managedGuiItemFactory.type, "managedGuiItemFactory");
});


