/*
 * Copyright 2017 Uppsala University Library
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

QUnit.module("resultHandlerFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
		// "recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
		// "textProvider" : CORATEST.textProviderSpy(),
		// "ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
		// "managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
		};
		this.spec = {
		// "addToSearchRecordHandlerMethod" : function() {
		// },
		// "showViewMethod" : function() {
		// },
		// "removeViewMethod" : function() {
		// },
		// "metadataId" : "someMetadataId",
		// "presentationId" : "somePresentationId"
		}
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
	assert.strictEqual(resultHandlerFactory.type, "resultHandlerFactory");
});

// QUnit.test("getDependencies", function(assert) {
// var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
// assert.strictEqual(resultHandlerFactory.getDependencies(), this.dependencies);
// });
//
// QUnit.test("testFactor", function(assert) {
// var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
// var resultHandler = resultHandlerFactory.factor(this.spec);
// assert.strictEqual(resultHandler.type, "resultHandler");
// });
//
// QUnit.test("testFactorAddedDependencies", function(assert) {
// var resultHandlerFactory = CORA.resultHandlerFactory(this.dependencies);
// var resultHandler = resultHandlerFactory.factor(this.spec);
// var addedDep = resultHandler.getDependencies();
// assert.strictEqual(addedDep.resultHandlerViewFactory.type, "resultHandlerViewFactory");
// assert.strictEqual(addedDep.resultHandlerViewFactory.getDependencies().textProvider,
// this.dependencies.textProvider);
// assert.strictEqual(addedDep.managedGuiItemFactory.type, "managedGuiItemFactory");
// assert.strictEqual(addedDep.recordGuiFactory, this.dependencies.recordGuiFactory);
// assert.strictEqual(addedDep.ajaxCallFactory, this.dependencies.ajaxCallFactory);
// });
