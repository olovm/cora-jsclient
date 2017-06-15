/*
 * Copyright 2016, 2017 Olov McKie
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

QUnit.module("recordTypeProviderTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.standardFactorySpy("ajaxCallSpy");
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		this.dependencies = dependencies;

		var recordTypeListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
			"accept" : "application/vnd.uub.recordList+json"
		};
		this.recordTypeListLink = recordTypeListLink;

		var spec = {
			"recordTypeListLink" : recordTypeListLink
		};

		this.spec = spec;
		this.recordTypeListLink = recordTypeListLink;
		this.recordTypeListLinkJson = JSON.stringify(this.recordTypeListLink);

		this.answerListCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecordList = JSON.stringify(CORATEST.recordTypeList);
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecordList
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("initCorrectRequestMade", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.recordList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, provider.processFetchedData);
});

QUnit.test("initCallWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	this.spec.callWhenReady = providerReady;
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);

	assert.notOk(providerStarted);

	this.answerListCall(0);

	assert.ok(providerStarted);
});

QUnit.test("initCallWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);

	assert.notOk(providerStarted);

	this.answerListCall(0);

	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredLinkIsNotChanged", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	var recordTypeListLinkJson = this.recordTypeListLinkJson;
	var recordTypeListLinkJsonAfter = JSON.stringify(this.recordTypeListLink);
	assert.deepEqual(recordTypeListLinkJsonAfter, recordTypeListLinkJson);
});

QUnit.test("getRecordTypeById", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var expected = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "textSystemOne"
				}, {
	                "children": [
	                    {
	                        "name": "linkedRecordType",
	                        "value": "recordType"
	                    },
	                    {
	                        "name": "linkedRecordId",
	                        "value": "recordType"
	                    }
	                ],
	                "name": "type"
	            }, {
      				"name" : "createdBy",
      				"children": [
      					{
      						"name": "linkedRecordType",
      						"value": "user"
      					},
      					{
      						"name": "linkedRecordId",
      						"value": "userid"
      					}
      				]
      			}, {
					"name" : "updatedBy",
					"value" : "userId"
				}, {
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "system"
					}, {
						"name" : "linkedRecordId",
						"value" : "cora"
					} ],
					"actionLinks" : {
						"read" : {
							"requestMethod" : "GET",
							"rel" : "read",
							"url" : "http://localhost:8080/therest/rest/record/system/cora",
							"accept" : "application/vnd.uub.record+json"
						}
					},
					"name" : "dataDivider"
				} ],
				"name" : "recordInfo"
			}, {
				"name" : "metadataId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneGroup"
				} ]
			}, {
				"name" : "presentationViewId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "presentationGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneViewPGroup"
				} ]
			}, {
				"name" : "presentationFormId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "presentationGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneFormPGroup"
				} ]
			}, {
				"name" : "newMetadataId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneNewGroup"
				} ]
			}, {
				"name" : "newPresentationFormId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "presentationGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneFormNewPGroup"
				} ]
			}, {
				"name" : "menuPresentationViewId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "presentationGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneMenuPGroup"
				} ]
			}, {
				"name" : "listPresentationViewId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "presentationGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "textSystemOneListPGroup"
				} ]
			}, {
				"name" : "search",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "search"
				}, {
					"name" : "linkedRecordId",
					"value" : "presentationVarSearch"
				} ]
			}, {
				"name" : "userSuppliedId",
				"value" : "true"
			}, {
				"name" : "selfPresentationViewId",
				"value" : "textSystemOneViewSelfPGroup"
			}, {
				"name" : "abstract",
				"value" : "false"
			}, {
				"name" : "parentId",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "recordType"
				}, {
					"name" : "linkedRecordId",
					"value" : "text"
				} ]
			} ],
			"name" : "recordType"
		},
		"actionLinks" : {
			"search" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept" : "application/vnd.uub.record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept" : "application/vnd.uub.record+json"
			},
			"create" : {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.record+json"
			},
			"list" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
			}
		}
	};
	var x = provider.getRecordTypeById("textSystemOne");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getRecordTypeByIdNotFound", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var error = false;
	try {
		var x = provider.getRecordTypeById("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});

QUnit.test("getAllRecordTypes", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var recordTypeList = provider.getAllRecordTypes();
	assert.stringifyEqual(recordTypeList.length, 15);

});

QUnit.test("testReload", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);
	var providerReloaded = false;
	function callWhenProviderHasReloaded() {
		providerReloaded = true;
	}

	assert.notOk(providerReloaded);
	assert.strictEqual(provider.getAllRecordTypes().length, 15);

	provider.reload(callWhenProviderHasReloaded);

	this.answerListCall(1);
	assert.strictEqual(provider.getAllRecordTypes().length, 15);
	assert.ok(providerReloaded);
	assert.strictEqual(this.ajaxCallFactorySpy.getSpec(1).loadMethod, this.ajaxCallFactorySpy
			.getSpec(0).loadMethod);
	assert.strictEqual(this.ajaxCallFactorySpy.getSpec(1).loadMethod, provider.processFetchedData);
});

QUnit.test("getMetadataByRecordTypeId", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var expected = {
		"metadataId" : "textSystemOneGroup",
		"presentationViewId" : "textSystemOneViewPGroup",
		"presentationFormId" : "textSystemOneFormPGroup",
		"newMetadataId" : "textSystemOneNewGroup",
		"newPresentationFormId" : "textSystemOneFormNewPGroup",
		"menuPresentationViewId" : "textSystemOneMenuPGroup",
		"listPresentationViewId" : "textSystemOneListPGroup",
		"search" : "presentationVarSearch",
		"userSuppliedId" : "true",
		"abstract" : "false",
		"parentId" : "text",
		"actionLinks" : {
			"search" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept" : "application/vnd.uub.record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
				"accept" : "application/vnd.uub.record+json"
			},
			"create" : {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.record+json"
			},
			"list" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
			}
		}
	};
	var x = provider.getMetadataByRecordTypeId("textSystemOne");
	assert.stringifyEqual(x, expected);
});
QUnit.test("getMetadataByRecordTypeIdNoParentId", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var expected = {
		"metadataId" : "metadataGroup",
		"presentationViewId" : "metadataViewPGroup",
		"presentationFormId" : "metadataFormPGroup",
		"newMetadataId" : "metadataNewGroup",
		"newPresentationFormId" : "metadataFormNewPGroup",
		"menuPresentationViewId" : "metadataMenuPGroup",
		"listPresentationViewId" : "metadataListPGroup",
		"search" : "presentationVarSearch",
		"userSuppliedId" : "true",
		"abstract" : "true",
		"actionLinks" : {
			"search" : {
				"requestMethod" : "GET",
				"rel" : "search",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
				"accept" : "application/vnd.uub.record+json"
			},
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
				"accept" : "application/vnd.uub.record+json"
			},
			"create" : {
				"requestMethod" : "POST",
				"rel" : "create",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.record+json"
			},
			"list" : {
				"requestMethod" : "GET",
				"rel" : "list",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
				"accept" : "application/vnd.uub.recordList+json"
			},
			"delete" : {
				"requestMethod" : "DELETE",
				"rel" : "delete",
				"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata"
			}
		}
	};
	var x = provider.getMetadataByRecordTypeId("metadata");
	assert.stringifyEqual(x, expected);
});

QUnit.test("getMetadataByRecordTypeIdNotFound", function(assert) {
	var provider = CORA.recordTypeProvider(this.dependencies, this.spec);
	this.answerListCall(0);

	var error = false;
	try {
		var x = provider.getMetadataByRecordTypeId("someNonExistingRecordTypeId");
	} catch (e) {
		error = true;
	}
	assert.ok(error);
});
