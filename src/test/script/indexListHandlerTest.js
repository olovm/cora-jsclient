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
						this.dependencies = {
							"ajaxCallFactory" : this.ajaxCallFactorySpy
						};
						this.spec = {
								"dataList" : CORATEST.listWithDataToIndex.dataList
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

QUnit.test("testUploadQue", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
//	var menuView = this.uploadManager.view.getMenuView();
//	assert.strictEqual(menuView.className, "menuView");
//	var cRecord = CORA.coraData(CORATEST.listWithDataToIndex.dataList.data);
	var record = CORATEST.listWithDataToIndex.dataList.data[0];
	
	indexListHandler.indexData(record);
//	uploadManager.upload(this.uploadSpec);

//	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
//	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
//
//	assert.strictEqual(menuView.className, "menuView uploading");
//
//	uploadManager.upload(this.uploadSpec);
//	assert.strictEqual(this.ajaxCallFactorySpy.getFactored(1), undefined);
//	uploadManager.uploadFinished();
//
//	var ajaxCallSpy1 = this.ajaxCallFactorySpy.getFactored(1);
//	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy1);
//
//	uploadManager.uploadFinished();
//	assert.strictEqual(menuView.className, "menuView");
});

QUnit.test("testIndexDataList", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	indexListHandler.indexDataList();
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(this.ajaxCallFactorySpy.getFactored(2), undefined)
	
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	
	assert.strictEqual(ajaxCallSpec.url, "https://epc.ub.uu.se/therest/rest/record/workOrder/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{\"children\":[{\"children\":[{\"name\":\"linkedRecordType\",\"value\":\"recordType\"},{\"name\":\"linkedRecordId\",\"value\":\"writtenText\"}],\"name\":\"recordType\"},{\"name\":\"recordId\",\"value\":\"writtenText:9011356289912\"},{\"name\":\"type\",\"value\":\"index\"}],\"name\":\"workOrder\"}");
	assert.stringifyEqual(ajaxCallSpec.loadMethod, {});
	assert.strictEqual(ajaxCallSpec.errorMethod, indexListHandler.handleCallError);

	var ajaxCallSpy2 = this.ajaxCallFactorySpy.getFactored(1);
	var ajaxCallSpec2 = ajaxCallSpy2.getSpec();
	assert.strictEqual(ajaxCallSpec2.data, "{\"children\":[{\"children\":[{\"name\":\"linkedRecordType\",\"value\":\"recordType\"},{\"name\":\"linkedRecordId\",\"value\":\"writtenText\"}],\"name\":\"recordType\"},{\"name\":\"recordId\",\"value\":\"writtenText:93918281873569\"},{\"name\":\"type\",\"value\":\"index\"}],\"name\":\"workOrder\"}");
	
});
//
QUnit.test("testHandleCallErrorDoesNothing", function(assert) {
	var indexListHandler = CORA.indexListHandler(this.dependencies, this.spec);
	try {
		indexListHandler.handleCallError();
	} catch (error) {
		assert.strictEqual(error.message, "error indexing");
	}

});
