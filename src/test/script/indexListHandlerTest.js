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

QUnit.module("indexListHandlerTest.js",{
					beforeEach : function() {
						this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
						this.uploadManager =  CORATEST.uploadManagerSpy();
						this.dependencies = {
							"ajaxCallFactory" : this.ajaxCallFactorySpy,
							"uploadManager": this.uploadManager,
							"indexHandlerFactory" : CORATEST.standardFactorySpy("indexHandlerSpy")
						};
						this.spec = {
								//"loadMethod" : function() {
								//},
								//"timeoutMethod" : function(){
								//},
							"dataList" : CORATEST.searchRecordList.dataList
						};

					},
					afterEach : function() {
					}
				});

QUnit.test("testType", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.type, "indexListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	assert.strictEqual(indexListHandler.getSpec(), this.spec);
});

QUnit.test("testIndexQue", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	var recordList = CORATEST.searchRecordList.dataList;

	indexListHandler.indexDataList(recordList);

	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);
	var firstIndexedRecord = factoredIndexHandler.getIndexRecord(0);
	assert.stringifyEqual(firstIndexedRecord, CORATEST.searchRecordList.dataList.data[0].record);

	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 0);

	indexListHandler.uploadFinished();
	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 1);

	indexListHandler.uploadFinished();
	assert.strictEqual(indexListHandler.getNumberOfIndexedRecords(), 2);
});

QUnit.test("testIndexDataWasCalledForAllInList", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	indexListHandler.indexDataList();
	var factoredIndexHandler = this.dependencies.indexHandlerFactory.getFactored(0);

	assert.stringifyEqual(factoredIndexHandler.getNumberOfIndexedRecords(), 38);

});


//
//
//QUnit.test("testIndexWithDefaultLoadMethod", function(assert) {
//	var tempSpec = {
//			"timeoutMethod" : function(){
//			}
//	};
//
//	var indexHandler = CORA.indexHandler(this.dependencies, tempSpec);
//	var record = CORATEST.listWithDataToIndex.dataList.data[0].record;
//
//	indexHandler.indexData(record);
//
//	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
//	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, indexHandler.uploadFinished);
//
//});
//
//QUnit.test("testMessageSetInView", function(assert) {
//	var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//	var workView = this.uploadManager.view.getWorkView();
//	var record = CORATEST.listWithDataToIndex.dataList.data[0].record;
//
//	indexHandler.indexData(record);
//	indexHandler.uploadFinished();
//	var view = indexHandler.getView();
//	assert.strictEqual(view.childNodes[1].className, "indexItem");
//});
//
//QUnit.test("testAddIndexOrderViewToUploadView", function(assert) {
//	var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//	indexHandler.addIndexOrderView();
//	var workView = this.uploadManager.view.getWorkView();
//	var indexOrders = workView.firstChild;
//	assert.strictEqual(indexOrders.className, "indexOrders");
//	var record = CORATEST.listWithDataToIndex.dataList.data[0].record;
//
//	indexHandler.indexData(record);
//	indexHandler.uploadFinished();
//	var indexOrder = indexOrders.firstChild;
//	assert.strictEqual(indexOrder.firstChild.textContent, "Indexerat");
//	assert.strictEqual(indexOrder.childNodes[1].className, "indexItem");
//
//});
//
//QUnit.test("testHandleCallErrorDoesNothing", function(assert) {
//	var indexHandler = CORA.indexHandler(this.dependencies, this.spec);
//	try {
//		indexHandler.handleCallError();
//	} catch (error) {
//		assert.strictEqual(error.message, "error indexing");
//	}
//});
//
//QUnit.test("testIndexTimeoutDefaultTimeoutMethod", function(assert) {
//	var tempSpec = {
//			"loadMethod" : function(){
//			}
//	};
//		var indexHandler = CORA.indexHandler(this.dependencies, tempSpec);
//		indexHandler.addIndexOrderView();
//		var record = CORATEST.listWithDataToIndex.dataList.data[0].record;
//
//		indexHandler.indexData(record);
//		var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
//		ajaxCallSpy0.getSpec().timeoutMethod();
//
//		var workView = this.uploadManager.view.getWorkView();
//		var indexOrder = workView.firstChild.firstChild;
//		assert.strictEqual(indexOrder.lastChild.textContent, "TIMEOUT");
//	});
//
