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

QUnit.module("ajaxCallTest.js", {
	beforeEach : function() {
		var loadMethodWasCalled = false;
		var answer;
		function loadMethod(answerIn) {
			loadMethodWasCalled = true;
			answer = answerIn;
		}

		var errorMethodWasCalled = false;
		function errorMethod(xhr) {
			errorMethodWasCalled = true;
		}

		var timeoutMethodWasCalled = false;
		function timeoutMethod(xhr) {
			timeoutMethodWasCalled = true;
		}

		var downloadProgressCalls = 0;
		function downloadProgressMethod(progressEvent) {
			downloadProgressCalls++;
		}

		var uploadProgressCalls = 0;
		function uploadProgressMethod(progressEvent) {
			uploadProgressCalls++;
		}

		var xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(200);

		this.spec = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactoryMultipleSpy,
			"method" : "GET",
			"url" : "http://localhost:8080/therest/rest/record/recordType",
			"requestHeaders" : {
				"contentType" : "application/uub+record+json",
				"accept" : "application/uub+record+json"
			},
			"loadMethod" : loadMethod,
			"errorMethod" : errorMethod,
			"timeoutMethod" : timeoutMethod,
			"downloadProgressMethod" : downloadProgressMethod,
			"uploadProgressMethod" : uploadProgressMethod
		};

		this.xmlHttpRequestFactoryMultipleSpy = xmlHttpRequestFactoryMultipleSpy;

		this.getLoadMethodWasCalled = function() {
			return loadMethodWasCalled;
		}
		this.getAnswer = function() {
			return answer;
		}
		this.getErrorMethodWasCalled = function() {
			return errorMethodWasCalled;
		}
		this.getTimeoutMethodWasCalled = function() {
			return timeoutMethodWasCalled;
		}
		this.getDownloadProgressMethodCalls = function() {
			return downloadProgressCalls;
		}
		this.getUploadProgressMethodCalls = function() {
			return uploadProgressCalls;
		}

	},
	afterEach : function() {
	}
});

QUnit.test("testXMLHttpRequestSetUpCorrect", function(assert) {
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.strictEqual(ajaxCall.spec, this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://localhost:8080/therest/rest/record/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");
	assert.ok(this.getLoadMethodWasCalled(), "loadMethod was called ok")
});

QUnit.test("testSpecReturnedInCallToLoadMethod", function(assert) {
	var specReturned;
	function loadMethod(answer) {
		specReturned = answer.spec;
	}
	this.spec.loadMethod = loadMethod;
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.stringifyEqual(specReturned, this.spec);
});

QUnit.test("testCallErrorNot200answer406", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setResponseStatus(406);
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.ok(this.getErrorMethodWasCalled(), "errorMethod was called ok");
});

QUnit.test("testCallOKReturns500", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
	var ajaxCall = CORA.ajaxCall(this.spec);
	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	xmlHttpRequestSpy.status = 500;
	xmlHttpRequestSpy.runLoadFunction();
	assert.ok(this.getErrorMethodWasCalled(), "errorMethod was called ok");
});

QUnit.test("testCallErrorNot200answer0", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setResponseStatus(0);
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.ok(this.getErrorMethodWasCalled(), "errorMethod was called ok");
});

QUnit.test("testTimeoutIsCalled", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	var done = assert.async();
	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 1;
	this.spec.loadMethod = assertFalse;
	this.spec.errorMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);
	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(getTimeoutMethodWasCalled(), "timeoutMethod was called ok");
		done();
	}, 10);

});

QUnit.test("testTimeoutIsNotCalledAsLoadIsCalled", function(assert) {
	var done = assert.async();
	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 5;
	this.spec.errorMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);
	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
		done();
	}, 10);
});

QUnit.test("testTimeoutIsNotCalledAsErrorIsCalled", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setResponseStatus(400);
	var done = assert.async();
	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 5;
	this.spec.loadMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);
	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
		done();
	}, 10);
});

QUnit.test("testTimeoutIsNotCalledAsDownloadProgressIsCalled", function(assert) {
	var done = assert.async();
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 5;
	this.spec.loadMethod = assertFalse;
	this.spec.errorMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var intervalId = window.setInterval(function() {
		xmlHttpRequestSpy.addedEventListeners["progress"][1]();
	}, 1);

	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
		window.clearInterval(intervalId);
		done();
	}, 10);
});

QUnit.test("testTimeoutIsNotCalledAsUploadProgressIsCalled", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
	var done = assert.async();
	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 5;
	this.spec.loadMethod = assertFalse;
	this.spec.errorMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var intervalId = window.setInterval(function() {
		xmlHttpRequestSpy.upload.addedEventListeners["progress"][1]();
	}, 1);

	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(!getTimeoutMethodWasCalled(), "timeoutMethod should not have been called");
		window.clearInterval(intervalId);
		done();
	}, 10);
});

QUnit.test("testTimeoutIsCalledAsUploadProgressIsCalledOnlyOnceUsingTimeout", function(assert) {
	this.xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);
	var done = assert.async();
	function assertFalse() {
		assert.ok(false);
	}
	this.spec.timeoutInMS = 5;
	this.spec.loadMethod = assertFalse;
	this.spec.errorMethod = assertFalse;

	var ajaxCall = CORA.ajaxCall(this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var intervalId = window.setTimeout(function() {
		xmlHttpRequestSpy.upload.addedEventListeners["progress"][1]();
	}, 1);

	var getTimeoutMethodWasCalled = this.getTimeoutMethodWasCalled;
	window.setTimeout(function() {
		assert.ok(getTimeoutMethodWasCalled(), "timeoutMethod should have been called");
		done();
	}, 30);

});

QUnit.test("testSendCreate", function(assert) {
	var textData = {
		"name" : "text",
		"children" : [ {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : "myText"
			} ]
		}, {
			"name" : "textPart",
			"attributes" : {
				"type" : "default",
				"lang" : "sv"
			},
			"children" : [ {
				"name" : "text",
				"value" : "Min svenska text"
			} ]
		} ]
	};
	this.xmlHttpRequestFactoryMultipleSpy.setResponseStatus(201);
	this.xmlHttpRequestFactoryMultipleSpy.setResponseText("a dummy response");
	this.spec.method = "POST";
	this.spec.data = JSON.stringify(textData);
	var ajaxCall = CORA.ajaxCall(this.spec);

	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, "http://localhost:8080/therest/rest/record/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "POST");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");

	assert.strictEqual(xmlHttpRequestSpy.getSentData(), JSON.stringify(textData));
	assert.strictEqual(this.getAnswer().status, 201);
	assert.strictEqual(this.getAnswer().responseText, "a dummy response");
	assert.ok(this.getLoadMethodWasCalled(), "loadMethod was called ok")
});

QUnit.test("testSendDelete", function(assert) {
	this.spec.method = "DELETE";
	this.spec.requestHeaders = null;

	var ajaxCall = CORA.ajaxCall(this.spec);
	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, "http://localhost:8080/therest/rest/record/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "DELETE");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"], undefined);
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);

	assert.ok(this.getLoadMethodWasCalled(), "loadMethod was called ok")
});

QUnit.test("testDownloadProgress", function(assert) {
	function progressMethod(progressEvent) {
	}
	this.spec.downloadProgressMethod = progressMethod;
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.strictEqual(ajaxCall.xhr.addedEventListeners["progress"][0], progressMethod);

});

QUnit.test("testUploadProgress", function(assert) {
	function progressMethod(progressEvent) {
	}
	this.spec.uploadProgressMethod = progressMethod;
	var ajaxCall = CORA.ajaxCall(this.spec);
	assert.strictEqual(ajaxCall.xhr.upload.addedEventListeners["progress"][0], progressMethod);
});
