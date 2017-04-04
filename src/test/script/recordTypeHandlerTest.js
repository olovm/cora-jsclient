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

QUnit
		.module(
				"recordTypeHandlerTest.js",
				{
					beforeEach : function() {
						this.record = CORATEST.recordTypeList.dataList.data[6].record;
						this.recordWithoutCreateLink = JSON.parse(JSON
								.stringify(this.record));
						this.recordWithoutCreateLink.actionLinks.create = undefined;

						this.dependencies = {
							"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
							"recordTypeHandlerViewFactory" : CORATEST
									.recordTypeHandlerViewFactorySpy(),
							"recordListHandlerFactory" : CORATEST
									.recordListHandlerFactorySpy(),
							"recordHandlerFactory" : CORATEST
									.recordHandlerFactorySpy(),
							"managedGuiItemFactory" : CORATEST
									.standardFactorySpy("managedGuiItemSpy"),
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
	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);

	var view = recordTypeHandler.getView();
	assert.strictEqual(view.className, "recordTypeFromRecordTypeHandlerSpy");

	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory
			.getSpec(0);
	assert.strictEqual(factoredViewSpec.fetchListMethod,
			recordTypeHandler.createRecordTypeList);
});

QUnit.test("initWithCreateButton", function(assert) {
	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory
			.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod,
			recordTypeHandler.createRecordHandler);
});

QUnit.test("initWithoutCreateButton", function(assert) {
	this.spec.recordTypeRecord = this.recordWithoutCreateLink;
	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);
	var factoredViewSpec = this.dependencies.recordTypeHandlerViewFactory
			.getSpec(0);
	assert.strictEqual(factoredViewSpec.createNewMethod, undefined);
});

QUnit.test("fetchList", function(assert) {
	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);

	recordTypeHandler.createRecordTypeList();
	var factoredListHandlerSpec = this.dependencies.recordListHandlerFactory
			.getSpec(0);
	assert.strictEqual(factoredListHandlerSpec.createRecordHandlerMethod,
			recordTypeHandler.createRecordHandler);

	assert.strictEqual(factoredListHandlerSpec.recordTypeRecord, this.record);
	assert.strictEqual(factoredListHandlerSpec.views,
			this.dependencies.managedGuiItemFactory.getFactored(0));
	assert.strictEqual(factoredListHandlerSpec.baseUrl, this.spec.baseUrl);
});

QUnit.test("showRecord", function(assert) {
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var catchRecordTypeHandlerViewSpec;
	var catchRecordListHandlerSpec;
	var catchRecordHandlerSpec;
	var item = {
		"workView" : workView,
		"menuView" : menuView
	};
	this.dependencies.recordTypeHandlerViewFactory = CORATEST
			.recordTypeHandlerViewFactorySpy();
	this.dependencies.recordListHandlerFactory = {
		"factor" : function(spec) {
			catchRecordListHandlerSpec = spec;
		}
	};
	this.dependencies.recordHandlerFactory = {
		"factor" : function(spec) {
			catchRecordHandlerSpec = spec;
		}
	};

	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);
	var spec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	spec.fetchListMethod();
	catchRecordListHandlerSpec.createRecordHandlerMethod("view", this.record);

	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "view");
	assert.strictEqual(catchRecordHandlerSpec.record, this.record);
	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
	assert.strictEqual(catchRecordHandlerSpec.recordTypeHandler,
			recordTypeHandler);
	assert.strictEqual(catchRecordHandlerSpec.views,
			this.dependencies.managedGuiItemFactory.getFactored(1));
});

QUnit.test("showNew", function(assert) {
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var catchRecordTypeHandlerViewSpec;
	var catchRecordListHandlerSpec;
	var catchRecordHandlerSpec;
	var item = {
		"workView" : workView,
		"menuView" : menuView
	};
	this.dependencies.recordTypeHandlerViewFactory = CORATEST
			.recordTypeHandlerViewFactorySpy();
	this.dependencies.recordListHandlerFactory = {
		"factor" : function(spec) {
			catchRecordListHandlerSpec = spec;
		}
	};
	this.dependencies.recordHandlerFactory = {
		"factor" : function(spec) {
			catchRecordHandlerSpec = spec;
		}
	};

	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);
	var spec = this.dependencies.recordTypeHandlerViewFactory.getSpec(0);
	spec.fetchListMethod();

	catchRecordListHandlerSpec.createRecordHandlerMethod("new", undefined);

	assert.strictEqual(catchRecordHandlerSpec.recordTypeRecord, this.record);
	assert.strictEqual(catchRecordHandlerSpec.presentationMode, "new");
	assert.strictEqual(catchRecordHandlerSpec.record, undefined);
	assert.strictEqual(catchRecordHandlerSpec.recordGuiFactory, undefined);
	assert.strictEqual(catchRecordHandlerSpec.recordTypeHandler,
			recordTypeHandler);
	assert.strictEqual(catchRecordHandlerSpec.views,
			this.dependencies.managedGuiItemFactory.getFactored(1));
});

QUnit.test("testFactory", function(assert) {
	this.createRecordTypeHandlerViewFactory = function() {
		var dependen = {
			"jsClient" : CORATEST.jsClientSpy()
		};
		return {
			"factor" : function(viewSpec) {
				return CORA.recordTypeHandlerView(dependen, viewSpec);
			}
		};
	}
	this.createRecordListHandlerFactory = function() {
		return {
			"factor" : function(listHandlerSpec) {
				return CORA.recordListHandler(listHandlerSpec);
			}
		};
	}
	this.createRecordHandlerFactory = function() {
		return {
			"factor" : function(recordHandlerSpec) {
				return CORA.recordHandler(recordHandlerSpec);
				;
			}
		};
	}

	var recordTypeHandler = CORA
			.recordTypeHandler(this.dependencies, this.spec);

	var workItemViewFactory = {
		"factor" : function(workItemViewSpec) {
			return CORA.workItemView(workItemViewSpec);
		}
	};
	var spec = {
		"recordTypeHandlerViewFactory" : this
				.createRecordTypeHandlerViewFactory(),
		"recordListHandlerFactory" : this.createRecordListHandlerFactory(),
		"recordHandlerFactory" : this.createRecordHandlerFactory(),
		"recordTypeRecord" : this.record
	};
	var workItemViewFactory = CORA.workItemViewFactory(spec);
	var recordHandlerViewSpec = {
		"workItemViewFactory" : workItemViewFactory,
		"extraClassName" : "text"
	};

	var recordHandlerView = recordTypeHandler.createRecordHandlerViewFactory()
			.factor(recordHandlerViewSpec);
	assert.notStrictEqual(recordHandlerView, undefined);
});
