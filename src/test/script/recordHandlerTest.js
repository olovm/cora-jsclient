/*
 * Copyright 2016 Uppsala University Library
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

QUnit.module("recordHandlerTest.js", {
	beforeEach : function() {
		this.record = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordType"
					}, {
						"name" : "type",
						"value" : "recordType"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"value" : "recordTypeGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "recordTypeViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "recordTypeFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "recordTypeNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "recordTypeFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "recordTypeMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "recordTypeListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "recordTypeSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "recordTypeFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_RECORDTYPE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "recordTypeViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				}
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		// xmlHttpRequestSpy.status = 0;
		// xmlHttpRequestSpy.addedEventListeners["timeout"][0]();
	}
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var recordHandlerSpec = {
		"recordTypeRecord" : this.record,
		"presentationMode":"view",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.notStrictEqual(recordHandler, undefined);
});

QUnit.test("initCallToServer", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var recordGui = {
		"getPresentation" : function() {
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			return recordGui;
		}
	};
	var recordHandlerSpec = {
		"recordTypeRecord" : this.record,
		"presentationMode":"view",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");

	assert.strictEqual(workView.childNodes.length, 1);

});

QUnit.test("initCheckRightGuiCreatedView", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var presentationIdUsed = [];
	var recordGui = {
		"getPresentation" : function(presentationId) {
			presentationIdUsed.push(presentationId);
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var metadataIdUsed;
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			metadataIdUsed = metadataId;
			return recordGui;
		}
	};
	var recordHandlerSpec = {
		"recordTypeRecord" : this.record,
		"presentationMode":"view",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(metadataIdUsed, "recordTypeGroup");
	assert.strictEqual(presentationIdUsed[0], "recordTypeViewPGroup");
	assert.strictEqual(workView.childNodes[0].className, "workItem recordType");

	assert.strictEqual(presentationIdUsed[1], "recordTypeMenuPGroup");
	assert.strictEqual(menuView.textContent, "");
	assert.strictEqual(menuView.childNodes[0].nodeName, "SPAN");

});

QUnit.test("initCheckRightGuiCreatedNew", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	// var record = this.record;
	function sendFunction() {
		// xmlHttpRequestSpy.status = 200;
		// xmlHttpRequestSpy.responseText = JSON.stringify({
		// "record" : record
		// });
		// xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var presentation = {
		"getView" : function() {
			return document.createElement("span");
		}
	};
	var presentationIdUsed = [];
	var recordGui = {
		"getPresentation" : function(presentationId) {
			presentationIdUsed.push(presentationId);
			return presentation;
		},
		"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
		}
	};
	var metadataIdUsed;
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			metadataIdUsed = metadataId;
			return recordGui;
		}
	};
	var recordHandlerSpec = {
		"recordTypeRecord" : this.record,
		"presentationMode":"new",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : undefined,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), false);

	 assert.strictEqual(metadataIdUsed, "recordTypeNewGroup");
	 assert.strictEqual(presentationIdUsed[0], "recordTypeFormNewPGroup");
	 assert.strictEqual(workView.childNodes[0].className, "workItem recordType");
	
	 assert.strictEqual(presentationIdUsed[1], "recordTypeMenuPGroup");
	 assert.strictEqual(menuView.textContent, "");
	 assert.strictEqual(menuView.childNodes[0].nodeName, "SPAN");

});

QUnit.test("fetchListCheckError", function(assert) {

	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 404;
		xmlHttpRequestSpy.responseText = JSON.stringify("Error, something went wrong");
		xmlHttpRequestSpy.addedEventListeners["error"][0]();
	}
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var recordHandlerSpec = {
		"recordTypeRecord" : this.record,
		"presentationMode":"view",
		"views" : {
			"menuView" : menuView,
			"workView" : workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(workView.childNodes[0].textContent, "404");
});

QUnit.test("initCheckRightGuiCreatedWhenPresentationMetadataIsMissing",
		function(assert) {
			var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
			var record = this.record;
			function sendFunction() {
				xmlHttpRequestSpy.status = 200;
				xmlHttpRequestSpy.responseText = JSON.stringify({
					"record" : record
				});
				xmlHttpRequestSpy.addedEventListeners["load"][0]();
			}

			var menuView = document.createElement("span");
			var workView = document.createElement("span");
			var presentation = {
				"getView" : function() {
					return document.createElement("span");
				}
			};
			var presentationIdUsed = [];
			var recordGui = {
				"getPresentation" : function(presentationId) {
					presentationIdUsed.push(presentationId);
					return presentation;
				},
				"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
				}
			};
			var metadataIdUsed;
			var recordGuiFactorySpy = {
				"factor" : function(metadataId, data) {
					throw new Error("missing metadata");
				}
			};
			var recordHandlerSpec = {
				"recordTypeRecord" : this.record,
				"presentationMode":"view",
				"views" : {
					"menuView" : menuView,
					"workView" : workView
				},
				"record" : this.record,
				"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
				"recordGuiFactory" : recordGuiFactorySpy

			};
			var recordHandler = CORA.recordHandler(recordHandlerSpec);

			assert.strictEqual(workView.firstChild.textContent.substring(0, 20),
					"{\"children\":[{\"child");

		});

QUnit.test("initCheckRightGuiCreatedWhenPresentationMetadataIsMissingForNew",
		function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
//		xmlHttpRequestSpy.status = 200;
//		xmlHttpRequestSpy.responseText = JSON.stringify({
//			"record" : undefined
//		});
//		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	
	var menuView = document.createElement("span");
	var workView = document.createElement("span");
	var presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
	};
	var presentationIdUsed = [];
	var recordGui = {
			"getPresentation" : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
			}
	};
	var metadataIdUsed;
	var recordGuiFactorySpy = {
			"factor" : function(metadataId, data) {
				throw new Error("missing metadata");
			}
	};
	var recordHandlerSpec = {
			"recordTypeRecord" : this.record,
			"presentationMode":"new",
			"views" : {
				"menuView" : menuView,
				"workView" : workView
			},
			"record" : undefined,
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"recordGuiFactory" : recordGuiFactorySpy
			
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);
	
	assert.strictEqual(workView.firstChild.textContent,
			"\"something went wrong, probably missing metadata\"");
	
});
