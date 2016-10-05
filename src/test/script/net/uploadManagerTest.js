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

QUnit.module("uploadManagerTest.js", {
	beforeEach : function() {
		var loadMethodWasCalled = false;
		function loadMethod(xhr) {
			loadMethodWasCalled = true;
		}
		var xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(200);

		var jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}
		var textProvider = CORATEST.textProviderStub();

		var spec = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactoryMultipleSpy,
			"jsClient" : jsClient,
			"textProvider" : textProvider

		};
		this.uploadManager = CORA.uploadManager(spec);
		this.xmlHttpRequestFactoryMultipleSpy = xmlHttpRequestFactoryMultipleSpy;
		this.loadMethodWasCalled = loadMethodWasCalled;
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {

	assert.ok(this.uploadManager);
	assert.ok(this.uploadManager.view);
	assert.strictEqual(this.uploadManager.view.getItem().menuView.className, "menuView");

});

QUnit.test("testUpload", function(assert) {
	var uploadManager = this.uploadManager;
	var loadMethodWasCalled = this.loadMethodWasCalled;

	var uploadLink = CORATEST.createUploadLink();
	var file = CORATEST.createFileForUpload();
	var uploadSpec = {
		"uploadLink" : uploadLink,
		"file" : file
	}
	uploadManager.upload(uploadSpec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl,
			"http://localhost:8080/therest/rest/record/image/image:333759270435575/upload");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	var sentData = xmlHttpRequestSpy.getSentData();
	assert.strictEqual(sentData.get("file"), file);
	// assert.strictEqual(sentData.get("userId"), file);
});

var CORATEST = (function(coraTest) {
	coraTest.createUploadLink = function() {
		return {
			"requestMethod" : "POST",
			"rel" : "upload",
			"contentType" : "multipart/form-data",
			"url" : "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload",
			"accept" : "application/uub+record+json"
		};
	};
	coraTest.createFileForUpload = function() {
		// ie does not have new File
		// return new File([ "" ], "filename.txt", {
		// type : "text/plain",
		// lastModified : new Date()
		// });
		return "";
	};

	return coraTest;
}(CORATEST || {}));

QUnit.test("testUploadQue", function(assert) {
	var uploadManager = this.uploadManager;
	var loadMethodWasCalled = this.loadMethodWasCalled;
	var xmlHttpRequestFactoryMultipleSpy = this.xmlHttpRequestFactoryMultipleSpy;
	xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	var menuView = this.uploadManager.view.getItem().menuView;
	assert.strictEqual(menuView.className, "menuView");

	var uploadLink = CORATEST.createUploadLink();
	var file = CORATEST.createFileForUpload();
	var uploadSpec = {
		"uploadLink" : uploadLink,
		"file" : file
	}
	uploadManager.upload(uploadSpec);
	assert.strictEqual(menuView.className, "menuView uploading");

	var xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl,
			"http://localhost:8080/therest/rest/record/image/image:333759270435575/upload");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	var sentData = xmlHttpRequestSpy.getSentData();
	assert.strictEqual(sentData.get("file"), file);

	uploadManager.upload(uploadSpec);
	assert.strictEqual(xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(1), undefined);
	xmlHttpRequestSpy.runLoadFunction();

	var xmlHttpRequestSpy1 = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(1);
	assert.ok(xmlHttpRequestSpy1);
	xmlHttpRequestSpy1.runLoadFunction();

	assert.strictEqual(menuView.className, "menuView");
});

QUnit.test("testUploadError", function(assert) {
	var uploadManager = this.uploadManager;
	var loadMethodWasCalled = this.loadMethodWasCalled;

	this.xmlHttpRequestFactoryMultipleSpy.setResponseStatus(400);

	var uploadLink = CORATEST.createUploadLink();
	var file = CORATEST.createFileForUpload();
	var uploadSpec = {
		"uploadLink" : uploadLink,
		"file" : file
	}
	uploadManager.upload(uploadSpec);
	var fileView = this.uploadManager.view.getItem().workView.firstChild;
	assert.strictEqual(fileView.lastChild.textContent, "ERROR");
});

QUnit.test("testUploadTimeout", function(assert) {
	var uploadManager = this.uploadManager;
	var loadMethodWasCalled = this.loadMethodWasCalled;
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	var uploadLink = CORATEST.createUploadLink();
	var file = CORATEST.createFileForUpload();
	var uploadSpec = {
			"uploadLink" : uploadLink,
			"file" : file
	}
	uploadManager.upload(uploadSpec);
	
	uploadManager.getCurrentAjaxCall().spec.timeoutMethod();
	
	var fileView = this.uploadManager.view.getItem().workView.firstChild;
	assert.strictEqual(fileView.lastChild.textContent, "TIMEOUT");
});