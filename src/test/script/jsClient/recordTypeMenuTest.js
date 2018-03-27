/*
 * Copyright 2018 Uppsala University Library
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

QUnit.module("recordTypeMenuTest.js", {
	beforeEach : function() {
		var providers = {
			"metadataProvider" : CORATEST.metadataProviderRealStub(),
			"textProvider" : CORATEST.textProviderSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub()
		};
		this.providers = providers;

		this.dependencies = {
			recordTypeHandlerFactory : CORATEST.standardFactorySpy("recordTypeHandlerSpy")
		};
		this.spec = {};
		this.dummyJsClient = {};

		this.menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
		this.recordTypeGroups = this.menu.getRecordTypeGroups(this.dummyJsClient);

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.menu.type, "recordTypeMenu");
});

QUnit.test("testGetProviders", function(assert) {
	assert.strictEqual(this.menu.getProviders(), this.providers);
});

QUnit.test("testGetDependencies", function(assert) {
	assert.strictEqual(this.menu.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var menu = CORA.recordTypeMenu(this.providers, this.dependencies, this.spec);
	assert.strictEqual(menu.getSpec(), this.spec);
});

QUnit.test("testGetRecordTypeGroupsLength", function(assert) {
	assert.strictEqual(this.recordTypeGroups.length, 2);
});

QUnit.test("testGetRecordTypeGroupsContainsExpectedHtml", function(assert) {
	var recordTypeGroups = this.recordTypeGroups;
	var headline0 = recordTypeGroups[0].childNodes[0];

	var headlineText = this.providers.textProvider.getTranslation("typeOfResourceItemText");

	assert.strictEqual(headline0.nodeName, "SPAN");
	assert.strictEqual(headline0.className, "recordTypeGroupHeadline");
	assert.strictEqual(headline0.innerHTML, headlineText);
	assert.strictEqual(recordTypeGroups[0].childNodes.length, 3);
});

QUnit.test("testGetRecordTypeGroupsChildrenAreViewFromRecordTypeHandler",
		function(assert) {
			var recordTypeGroups = this.recordTypeGroups;

			var dependencies = this.dependencies;
			var spec = this.spec;
			var recordTypeHandlerFactory = dependencies.recordTypeHandlerFactory;
			var factoredRecordTypeHandler0 = recordTypeHandlerFactory.getFactored(0);
			var factoredRecordTypeHandlerView0 = factoredRecordTypeHandler0.getView();

			assert.strictEqual(recordTypeGroups[0].childNodes[1], recordTypeHandlerFactory
					.getFactored(0).getView());
			assert.strictEqual(recordTypeGroups[0].childNodes[2], recordTypeHandlerFactory
					.getFactored(1).getView());
			assert.strictEqual(recordTypeGroups[0].childNodes[3], undefined);

			assert.strictEqual(recordTypeGroups[1].childNodes[0].innerHTML,
					"translated_authorityItemText");
			assert.strictEqual(recordTypeGroups[1].childNodes[1], recordTypeHandlerFactory
					.getFactored(2).getView());
			assert.strictEqual(recordTypeGroups[1].childNodes[2], recordTypeHandlerFactory
					.getFactored(3).getView());
			assert.strictEqual(recordTypeGroups[1].childNodes[3], undefined);

			assert.strictEqual(recordTypeGroups[2], undefined);
		});

// QUnit.test("initFactoresRecordTypeHandlersAsGroupsAndAddsToViewIfRecordTypeHasActions", function(
// assert) {
//
// var jsClient = CORA.jsClient(this.dependencies, this.spec);
// var jsClientView = this.dependencies.jsClientViewFactory.getFactored(0);
// var firstGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(0);
// assert.notEqual(firstGroupOfRecordTypes, undefined);
// assert.strictEqual(firstGroupOfRecordTypes.className, "recordTypeGroup");
// assert.strictEqual(firstGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
// assert.strictEqual(firstGroupOfRecordTypes.firstChild.innerHTML,
// "translated_typeOfResourceItemText");
// var childrenOfGroup1 = firstGroupOfRecordTypes.children;
// assert.strictEqual(childrenOfGroup1.length, 3);
//
// var secondGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(1);
// assert.notEqual(secondGroupOfRecordTypes, undefined);
// assert.strictEqual(secondGroupOfRecordTypes.className, "recordTypeGroup");
// assert.strictEqual(secondGroupOfRecordTypes.firstChild.className, "recordTypeGroupHeadline");
// assert.strictEqual(secondGroupOfRecordTypes.firstChild.innerHTML,
// "translated_authorityItemText");
// var childrenOfGroup2 = secondGroupOfRecordTypes.children;
// assert.strictEqual(childrenOfGroup2.length, 3);
//
// var thirdGroupOfRecordTypes = jsClientView.getGroupOfRecordTypes(2);
// assert.strictEqual(thirdGroupOfRecordTypes, undefined);
// });
