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
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
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
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
				}
			}
		};
		this.recordAbstract = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "text"
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
					"value" : "textGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "textViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "textFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "textNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "textFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "textMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "textListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "textSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "textFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_TEXT"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "textViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "true"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text"
				}
			}
		};
		this.recordWithoutUpdateOrDeleteLink = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "svEnText"
					}, {
						"name" : "type",
						"value" : "textSystemOne"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "En text på både svenska och engelska"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					}
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "A text both in english and swedish"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					}
				} ],
				"name" : "text"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/uub+record+json"
				}
			}
		};
		this.recordWithoutDeleteLink = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "svEnText"
					}, {
						"name" : "type",
						"value" : "textSystemOne"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "En text på både svenska och engelska"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					}
				}, {
					"children" : [ {
						"name" : "text",
						"value" : "A text both in english and swedish"
					} ],
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					}
				} ],
				"name" : "text"
			},
			"actionLinks" : {
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/uub+record+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
					"accept" : "application/uub+record+json"
				}
			}
		};

		this.menuView = document.createElement("span");
		this.menuViewParent = document.createElement("span");
		this.menuViewParent.appendChild(this.menuView);
		
		this.workView = document.createElement("span");
		this.workViewParent = document.createElement("span");
		this.workViewParent.appendChild(this.workView);

		this.createRecordHandlerViewFactory = function() {
			return {
				"factor" : function(recordHandlerViewSpec) {
					return CORA.recordHandlerView(recordHandlerViewSpec);
				}
			};
		};
		this.jsClientSpy = {
			"getMetadataIdForRecordTypeId" : function(recordTypeId) {
				return "recordTypeGroup2";
			}
		};
		this.presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
		};

		var presentation = this.presentation;
		this.presentationIdUsed = [];
		var presentationIdUsed = this.presentationIdUsed;
		this.recordGui = {
			"getPresentation" : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
			},
			"dataHolder" : {
				"getData" : function() {
					return {};
				}
			},
			"validateData" : function() {
				return true;
			}
		};

		var recordGui = this.recordGui;
		this.metadataIdUsed = [];
		var metadataIdUsed = this.metadataIdUsed;
		this.recordGuiFactorySpy = {
			"factor" : function(metadataId, data) {
				metadataIdUsed.push(metadataId);
				return recordGui;
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"jsClient" : this.jsClientSpy
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
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");

	assert.strictEqual(this.workView.childNodes.length, 3);

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

	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);
	
	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");
	assert.strictEqual(this.presentationIdUsed[2], "recordTypeMenuPGroup");

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");

	var messageHolder = this.workView.childNodes[0];
	assert.strictEqual(messageHolder.className, "messageHolder");

	var workItem = this.workView.childNodes[1];
	assert.strictEqual(workItem.className, "workItem recordType");

	var editView = workItem.childNodes[0];
	assert.strictEqual(editView.className, "editView");
	assert.strictEqual(editView.childNodes.length, 1);

	var showView = workItem.childNodes[1];
	assert.strictEqual(showView.className, "showView");
	assert.strictEqual(showView.childNodes.length, 1);

	var buttonView = workItem.childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var updateButton = buttonView.childNodes[1];
	assert.strictEqual(updateButton.value, "UPDATE");
	assert.strictEqual(updateButton.className, "update");

	var menuView = this.menuView;
	assert.strictEqual(menuView.textContent, "");
	assert.strictEqual(menuView.childNodes[0].nodeName, "SPAN");
	var removeButton = menuView.childNodes[1];
	assert.strictEqual(removeButton.className, "removeButton");

	var busy = this.workView.childNodes[2];
	assert.strictEqual(busy.className, "busy toBeRemoved");

});
QUnit.test("initCheckRemoveButtonInMenuView", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	
	var recordHandlerSpec = {
			"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
			"recordTypeRecord" : this.record,
			"presentationMode" : "view",
			"views" : {
				"menuView" : this.menuView,
				"workView" : this.workView
			},
			"record" : this.record,
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"jsClient" : this.jsClientSpy
			
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);
	
	var menuView = this.menuView;
	var workView = this.workView;
	
	var removeButton = menuView.childNodes[1];
	assert.strictEqual(removeButton.className, "removeButton");
	var event = document.createEvent('Event');

	removeButton.onclick(event);
	assert.strictEqual(menuView.parentNode, null);
	assert.strictEqual(workView.parentNode, null);
	
});

QUnit.test("initCheckRightGuiCreatedViewAbstractRecordType", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.recordAbstract,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");

	assert.strictEqual(this.presentationIdUsed[0], "textViewPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "textMenuPGroup");

	var messageHolder = this.workView.childNodes[0];
	assert.strictEqual(messageHolder.className, "messageHolder");

	var workItem = this.workView.childNodes[1];
	assert.strictEqual(workItem.className, "workItem text");

	var editView = workItem.childNodes[0];
	assert.strictEqual(editView.className, "editView");
	assert.strictEqual(editView.childNodes.length, 0);

	var showView = workItem.childNodes[1];
	assert.strictEqual(showView.className, "showView");
	assert.strictEqual(showView.childNodes.length, 1);

	assert.strictEqual(this.presentationIdUsed[1], "textMenuPGroup");
	assert.strictEqual(this.menuView.textContent, "");
	assert.strictEqual(this.menuView.childNodes[0].nodeName, "SPAN");
});

QUnit.test("testUpdateCall", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "edit",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var validateWasCalled = false;
	this.recordGui.validateData = function() {
		validateWasCalled = true;
		return true;
	};
	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var updateButton = buttonView.childNodes[1];
	assert.strictEqual(updateButton.value, "UPDATE");
	assert.strictEqual(updateButton.className, "update");

	updateButton.onclick();

	assert.strictEqual(validateWasCalled, true);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, "http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.getSentData(), "{}");

});
QUnit.test("testUpdateCallValidationError", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "edit",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var validateWasCalled = false;
	this.recordGui.validateData = function() {
		validateWasCalled = true;
		return false;
	};
	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	assert.strictEqual(xmlHttpRequestSpy.getSendWasCalled(), true);
	xmlHttpRequestSpy.setSendWasCalled(false);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var updateButton = buttonView.childNodes[1];
	assert.strictEqual(updateButton.value, "UPDATE");
	assert.strictEqual(updateButton.className, "update");

	updateButton.onclick();

	assert.strictEqual(validateWasCalled, true);

	assert.strictEqual(xmlHttpRequestSpy.getSendWasCalled(), false);
});

QUnit.test("testNoUpdateButtonAndEditFormWhenNoUpdateLink", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.recordWithoutUpdateOrDeleteLink;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "edit",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.recordWithoutUpdateOrDeleteLink,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeViewPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeMenuPGroup");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testDeleteCall", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "edit",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var deleteButton = buttonView.childNodes[0];
	assert.strictEqual(deleteButton.value, "DELETE");
	assert.strictEqual(deleteButton.className, "delete");

	var xmlHttpRequestSpy2 = CORATEST.xmlHttpRequestSpy(sendFunction2);
	function sendFunction2() {
		xmlHttpRequestSpy2.status = 200;
		xmlHttpRequestSpy2.addedEventListeners["load"][0]();
	}
	recordHandlerSpec.xmlHttpRequestFactory.setXmlHttpRequestSpy(xmlHttpRequestSpy2);

	deleteButton.onclick();
	var question = this.workView.lastChild;
	assert.strictEqual(question.className, "question");
	assert.strictEqual(xmlHttpRequestSpy2.getOpenUrl(), undefined,
			"no delete call should have been made yet");
	var buttonNo = question.firstChild.childNodes[1];
	assert.strictEqual(buttonNo.value, "Nej");
	buttonNo.onclick();
	var question = this.workView.lastChild;
	assert.notVisible(question);
	assert.strictEqual(xmlHttpRequestSpy2.getOpenUrl(), undefined,
			"no delete call should have been made yet");

	deleteButton.onclick();
	var question = this.workView.lastChild;
	assert.strictEqual(question.className, "question");
	assert.strictEqual(xmlHttpRequestSpy2.getOpenUrl(), undefined,
			"no delete call should have been made yet");
	var buttonYes = question.firstChild.childNodes[2];
	assert.strictEqual(buttonYes.value, "Ja");
	buttonYes.onclick();

	var openUrl = xmlHttpRequestSpy2.getOpenUrl();
	assert.strictEqual(openUrl, "http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(xmlHttpRequestSpy2.getOpenMethod(), "DELETE");
	assert.strictEqual(xmlHttpRequestSpy2.addedRequestHeaders["accept"], undefined);
	assert.strictEqual(xmlHttpRequestSpy2.addedRequestHeaders["content-type"], undefined);
	assert.strictEqual(xmlHttpRequestSpy2.getSentData(), undefined);

	var editView = this.workView.childNodes[1].childNodes[0];
	var showView = this.workView.childNodes[1].childNodes[1];
	assert.strictEqual(editView.childNodes.length, 0);
	assert.strictEqual(showView.childNodes.length, 0);
	assert.strictEqual(buttonView.childNodes.length, 0);
	
	var menuView = this.menuView;
	assert.strictEqual(menuView.parentNode, null);
	var workView = this.workView;
	assert.strictEqual(workView.parentNode, null);
});

QUnit.test("testDeleteCallNoParentsForViews", function(assert) {
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
	
	var recordHandlerSpec = {
			"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
			"recordTypeRecord" : this.record,
			"presentationMode" : "edit",
			"views" : {
				"menuView" : menuView,
				"workView" : workView
			},
			"record" : this.record,
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);
	var buttonView = workView.childNodes[1].childNodes[2];
	
	var deleteButton = buttonView.childNodes[0];
	
	var xmlHttpRequestSpy2 = CORATEST.xmlHttpRequestSpy(sendFunction2);
	function sendFunction2() {
		xmlHttpRequestSpy2.status = 200;
		xmlHttpRequestSpy2.addedEventListeners["load"][0]();
	}
	recordHandlerSpec.xmlHttpRequestFactory.setXmlHttpRequestSpy(xmlHttpRequestSpy2);
	
	deleteButton.onclick();
	var question = workView.lastChild;
	var buttonYes = question.firstChild.childNodes[2];
	buttonYes.onclick();
	
	var editView = workView.childNodes[1].childNodes[0];
	var showView = workView.childNodes[1].childNodes[1];
	assert.strictEqual(editView.childNodes.length, 0);
	assert.strictEqual(showView.childNodes.length, 0);
	assert.strictEqual(buttonView.childNodes.length, 0);
	
	assert.strictEqual(menuView.parentNode, null);
	assert.strictEqual(workView.parentNode, null);
});

QUnit.test("testNoDeleteButtonWhenNoDeleteLink", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.recordWithoutDeleteLink;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "edit",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.recordWithoutUpdateOrDeleteLink,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeGroup2");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormPGroup");
	assert.strictEqual(this.presentationIdUsed[1], "recordTypeViewPGroup");
	assert.strictEqual(this.presentationIdUsed[2], "recordTypeMenuPGroup");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.childNodes.length, 1);
	assert.strictEqual(buttonView.childNodes[0].value, "UPDATE");

});

QUnit.test("initCheckRightGuiCreatedNew", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}

	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "new",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : undefined,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), false);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeNewGroup");
	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormNewPGroup");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	assert.strictEqual(this.presentationIdUsed[1], "recordTypeMenuPGroup");
	assert.strictEqual(this.menuView.textContent, "");
	assert.strictEqual(this.menuView.childNodes[0].nodeName, "SPAN");

});

QUnit.test("testCreateNewCall", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "new",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : undefined,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var validateWasCalled = false;
	this.recordGui.validateData = function() {
		validateWasCalled = true;
		return true;
	};

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), false);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeNewGroup");
	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormNewPGroup");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var createButton = buttonView.firstChild;
	assert.strictEqual(createButton.value, "CREATE");
	assert.strictEqual(createButton.className, "create");

	createButton.onclick();

	assert.strictEqual(validateWasCalled, true);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.getSentData(), "{}");

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), true);

	var deleteButton = buttonView.childNodes[0];
	assert.strictEqual(deleteButton.value, "DELETE");
	var updateButton = buttonView.childNodes[1];
	assert.strictEqual(updateButton.value, "UPDATE");
	assert.strictEqual(buttonView.childNodes.length, 2);

});
QUnit.test("testCreateNewCallValidationError", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "new",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : undefined,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	var validateWasCalled = false;
	this.recordGui.validateData = function() {
		validateWasCalled = true;
		return false;
	};

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), false);

	assert.strictEqual(this.metadataIdUsed[0], "recordTypeNewGroup");
	assert.strictEqual(this.presentationIdUsed[0], "recordTypeFormNewPGroup");
	assert.strictEqual(this.workView.childNodes[1].className, "workItem recordType");

	var buttonView = this.workView.childNodes[1].childNodes[2];
	assert.strictEqual(buttonView.className, "buttonView");

	var createButton = buttonView.firstChild;
	assert.strictEqual(createButton.value, "CREATE");
	assert.strictEqual(createButton.className, "create");

	createButton.onclick();

	assert.strictEqual(validateWasCalled, true);

	assert.strictEqual(recordHandlerSpec.xmlHttpRequestFactory.wasFactorCalled(), false);
});

QUnit.test("fetchListCheckError", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 404;
		xmlHttpRequestSpy.responseText = JSON.stringify("Error, something went wrong");
		xmlHttpRequestSpy.addedEventListeners["error"][0]();
	}
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(this.workView.childNodes[0].textContent, "404");
});

QUnit.test("initCheckRightGuiCreatedWhenPresentationMetadataIsMissing", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = this.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(this.workView.childNodes[1].textContent.substring(0, 20),
			"{\"children\":[{\"child");

});

QUnit.test("initCheckRightGuiCreatedWhenPresentationMetadataIsMissingForNew", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}

	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	var recordHandlerSpec = {
		"recordHandlerViewFactory" : this.createRecordHandlerViewFactory(),
		"recordTypeRecord" : this.record,
		"presentationMode" : "new",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : undefined,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
		"jsClient" : this.jsClientSpy

	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.strictEqual(this.workView.childNodes[1].textContent,
			"\"something went wrong, probably missing metadata\"");

});
