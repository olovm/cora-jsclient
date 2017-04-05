/*
 * Copyright 2016, 2017 Uppsala University Library
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.assertCorrectFactoredSpec = function(assert, factoredSpec) {
		assert.strictEqual(factoredSpec.recordTypeRecordId, "metadataCollectionItem");
		var expectedCreateLink = {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/uub+record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/uub+record+json"
		};
		assert.stringifyEqual(factoredSpec.createLink, expectedCreateLink);
		assert.strictEqual(factoredSpec.newMetadataId, "metadataCollectionItemNewGroup");
		assert.strictEqual(factoredSpec.newPresentationFormId, "metadataCollectionItemFormNewPGroup");
		assert.strictEqual(factoredSpec.presentationViewId, "metadataCollectionItemViewPGroup");
		assert.strictEqual(factoredSpec.presentationFormId, "metadataCollectionItemFormPGroup");
		assert.strictEqual(factoredSpec.menuPresentationViewId, "metadataCollectionItemMenuPGroup");
		assert.strictEqual(factoredSpec.abstract, "false");
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("recordTypeHandlerTest.js", {
	beforeEach : function() {
		this.record = CORATEST.recordTypeList.dataList.data[6].record;
		this.recordWithoutCreateLink = JSON.parse(JSON.stringify(this.record));
		this.recordWithoutCreateLink.actionLinks.create = undefined;

		this.dependencies = {
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
			"recordTypeHandlerViewFactory" : CORATEST.recordTypeHandlerViewFactorySpy(),
			"recordListHandlerFactory" : CORATEST.recordListHandlerFactorySpy(),
			"recordHandlerFactory" : CORATEST.recordHandlerFactorySpy(),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy"),
			"jsClient" : CORATEST.jsClientSpy()
		};

		this.spec = {
			"recordTypeRecord" : this.record,
			"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);

	var view = recordTypeHandler.getView();
	assert.strictEqual(view.className, "recordTypeFromRecordTypeHandlerSpy");

	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.fetchListMethod, recordTypeHandler.createRecordTypeList);
});

QUnit.test("initWithCreateButton", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod, recordTypeHandler.createRecordHandler);
});

QUnit.test("initWithoutCreateButton", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutCreateLink;
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod, undefined);
});

QUnit.test("fetchListCheckSpec", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);

	recordTypeHandler.createRecordTypeList();
	var factoredSpec = this.dependencies.recordListHandlerFactory.getSpec(0);
//	assert.strictEqual(factoredSpec.createRecordHandlerMethod,
//			recordTypeHandler.createRecordHandler);

	assert.strictEqual(factoredSpec.addToRecordTypeHandlerMethod,
			recordTypeHandler.addManagedGuiItem);
	assert.strictEqual(factoredSpec.baseUrl, this.spec.baseUrl);

	assert.strictEqual(factoredSpec.recordTypeRecordId, "metadataCollectionItem");
	var expectedListLink = {
		"requestMethod" : "GET",
		"rel" : "list",
		"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
		"accept" : "application/uub+recordList+json"
	};
	assert.stringifyEqual(factoredSpec.listLink, expectedListLink);
	assert.strictEqual(factoredSpec.listPresentationViewId, "metadataCollectionItemListPGroup");

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec);
	
});



QUnit.test("showRecord", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var spec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	spec.fetchListMethod();
	var catchRecordListHandlerSpec = this.dependencies.recordListHandlerFactory.getSpec(0);
	catchRecordListHandlerSpec.createRecordHandlerMethod("view", this.record);

	var factoredSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationMode, "view");
	assert.strictEqual(factoredSpec.record, this.record);
	assert.strictEqual(factoredSpec.recordTypeHandler, recordTypeHandler);

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec);
});

QUnit.test("showNew", function(assert) {
	var recordTypeHandler = CORA.recordTypeHandler(this.dependencies, this.spec);
	var spec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	spec.fetchListMethod();

	var catchRecordListHandlerSpec = this.dependencies.recordListHandlerFactory.getSpec(0);
	catchRecordListHandlerSpec.createRecordHandlerMethod("new", undefined);

	var factoredSpec = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(factoredSpec.presentationMode, "new");
	assert.strictEqual(factoredSpec.record, undefined);
	assert.strictEqual(factoredSpec.recordTypeHandler, recordTypeHandler);

	CORATEST.assertCorrectFactoredSpec(assert, factoredSpec);
});

// QUnit.test("testFactory", function(assert) {
// this.createRecordTypeHandlerViewFactory = function() {
// var dependen = {
// "jsClient" : CORATEST.jsClientSpy()
// };
// return {
// "factor" : function(viewSpec) {
// return CORA.recordTypeHandlerView(dependen, viewSpec);
// }
// };
// }
// this.createRecordListHandlerFactory = function() {
// return {
// "factor" : function(listHandlerSpec) {
// return CORA.recordListHandler(listHandlerSpec);
// }
// };
// }
// this.createRecordHandlerFactory = function() {
// return {
// "factor" : function(recordHandlerSpec) {
// return CORA.recordHandler(recordHandlerSpec);
// ;
// }
// };
// }
//
// var recordTypeHandler = CORA
// .recordTypeHandler(this.dependencies, this.spec);
//
// var workItemViewFactory = {
// "factor" : function(workItemViewSpec) {
// return CORA.workItemView(workItemViewSpec);
// }
// };
// var spec = {
// "recordTypeHandlerViewFactory" : this
// .createRecordTypeHandlerViewFactory(),
// "recordListHandlerFactory" : this.createRecordListHandlerFactory(),
// "recordHandlerFactory" : this.createRecordHandlerFactory(),
// "recordTypeRecord" : this.record
// };
// var workItemViewFactory = CORA.workItemViewFactory(spec);
// var recordHandlerViewSpec = {
// "workItemViewFactory" : workItemViewFactory,
// "extraClassName" : "text"
// };
//
// var recordHandlerView = recordTypeHandler.createRecordHandlerViewFactory()
// .factor(recordHandlerViewSpec);
// assert.notStrictEqual(recordHandlerView, undefined);
// });
