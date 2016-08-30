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

QUnit.module("recordViewerTest.js", {
	beforeEach : function() {
		this.presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
		};

		var presentation = this.presentation;
		this.presentationIdUsed = [];
		var presentationIdUsed = this.presentationIdUsed;
		this.pubSub = CORATEST.pubSubSpy();
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
			},
			"pubSub" : this.pubSub
		};

		var recordGui = this.recordGui;
		this.metadataIdUsed = [];
		var metadataIdUsed = this.metadataIdUsed;
		this.dataDividerUsed = [];
		var dataDividerUsed = this.dataDividerUsed;
		this.recordGuiFactorySpy = {
			"factor" : function(metadataId, data, dataDivider) {
				metadataIdUsed.push(metadataId);
				dataDividerUsed.push(dataDivider);
				return recordGui;
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("initCheckBusyAndMessageHolder", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var recordViewerSpec = {
		"read" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
			"accept" : "application/uub+record+json"
		},
		"presentationId" : "somePresentationId",
		"metadataId" : "someMetadataId",
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
//		"jsClient" : this.jsClientSpy
	};
	var recordViewer = CORA.recordViewer(recordViewerSpec);
	assert.notStrictEqual(recordViewer, undefined);

	var view = recordViewer.getView();
	assert.strictEqual(view.className, "recordViewer");

	var messageHolder = view.childNodes[0];
	assert.strictEqual(messageHolder.className, "messageHolder");

	var busy = view.childNodes[1];
	assert.strictEqual(busy.className, "busy");
});

QUnit.test("initCallToServer", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = CORATEST.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify({
			"record" : record
		});
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var recordViewerSpec = {
		"read" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
			"accept" : "application/uub+record+json"
		},
		"presentationId" : "somePresentationId",
		"metadataId" : "someMetadataId",
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : this.recordGuiFactorySpy,
//		"jsClient" : this.jsClientSpy
	};
	var recordViewer = CORA.recordViewer(recordViewerSpec);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/system/cora");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");

	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes.length, 3);

	var busy = view.childNodes[1];
	assert.strictEqual(busy.className, "busy toBeRemoved");
	
	assert.strictEqual(this.metadataIdUsed[0], "someMetadataId");
	assert.strictEqual(this.dataDividerUsed[0], "cora");
	
});

QUnit.test("errorMissingPresenation", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = CORATEST.record;
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
	var recordViewerSpec = {
		"read" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
			"accept" : "application/uub+record+json"
		},
		"presentationId" : "somePresentationId",
		"metadataId" : "someMetadataId",
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"recordGuiFactory" : recordGuiFactorySpy,
//		"jsClient" : this.jsClientSpy
	};
	var recordViewer = CORA.recordViewer(recordViewerSpec);
	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes[2].textContent.substring(0, 20), "{\"children\":[{\"child");
});
QUnit.test("errorDataNotFound", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	var record = CORATEST.record;
	function sendFunction() {
		xmlHttpRequestSpy.status = 404;
		xmlHttpRequestSpy.responseText = JSON.stringify("Error, something went wrong");
		xmlHttpRequestSpy.addedEventListeners["error"][0]();
	}
	var recordViewerSpec = {
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
				"accept" : "application/uub+record+json"
			},
			"presentationId" : "somePresentationId",
			"metadataId" : "someMetadataId",
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
			"recordGuiFactory" : this.recordGuiFactorySpy,
//			"jsClient" : this.jsClientSpy
	};
	var recordViewer = CORA.recordViewer(recordViewerSpec);
	var view = recordViewer.getView();
	assert.strictEqual(view.childNodes[0].textContent, "404");
});
