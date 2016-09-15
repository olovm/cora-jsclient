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
	},
	afterEach : function() {
	}
});

QUnit.test("testCall200", function(assert) {
	var loadMethodWasCalled = false;
	function loadMethod(xhr) {
		loadMethodWasCalled = true;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod
	};
	var ajaxCall = CORA.ajaxCall(spec);

	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl.substring(0, openUrl.indexOf("?")),
			"http://130.238.171.39:8080/therest/rest/record/recordType");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+record+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"][0],
			"application/uub+record+json");

	assert.ok(loadMethodWasCalled, "loadMethod was called ok")
});

QUnit.test("testSpecReturnedInCallToLoadMethod", function(assert) {
	var loadMethodWasCalled = false;
	var specReturned;
	function loadMethod(answer) {
		loadMethodWasCalled = true;
		specReturned = answer.spec;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod
	};
	var ajaxCall = CORA.ajaxCall(spec);

	assert.stringifyEqual(specReturned, spec);
});

QUnit.test("testCallErrorNot200answer", function(assert) {
	var errorMethodWasCalled = false;
	function errorMethod(xhr) {
		errorMethodWasCalled = true;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 406;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"errorMethod" : errorMethod

	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.ok(errorMethodWasCalled, "errorMethod was called ok");
});

QUnit.test("testCallErrorBrokenAddress", function(assert) {
	var errorMethodWasCalled = false;
	function errorMethod(xhr) {
		errorMethodWasCalled = true;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 0;
		xmlHttpRequestSpy.addedEventListeners["error"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://notAnExistingAddress/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"errorMethod" : errorMethod

	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.ok(errorMethodWasCalled, "errorMethod was called ok");
});

QUnit.test("testTimeout", function(assert) {
	var timeoutMethodWasCalled = false;
	function timeoutMethod(xhr) {
		timeoutMethodWasCalled = true;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 0;
		xmlHttpRequestSpy.addedEventListeners["timeout"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"timeoutInMS" : 1000,
		"timeoutMethod" : timeoutMethod,
		"method" : "GET",
		"url" : "http://www.google.com",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+recordList+json",
		"loadMethod" : function() {
			assert.ok(false);
		},
		"errorMethod" : function() {
			assert.ok(false);
		}

	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.strictEqual(xmlHttpRequestSpy.timeout, 1000);
	assert.ok(timeoutMethodWasCalled, "timeoutMethod was called ok");
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
	var loadMethodWasCalled = false;
	var recievedAnswer;
	function loadMethod(answer) {
		loadMethodWasCalled = true;
		recievedAnswer = answer;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 201;
		xmlHttpRequestSpy.responseText = "a dummy response";
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "POST",
		"url" : "http://130.238.171.39:8080/therest/rest/record/textSystemOne",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"data" : JSON.stringify(textData)
	};
	var ajaxCall = CORA.ajaxCall(spec);
	var openUrl = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl, "http://130.238.171.39:8080/therest/rest/record/textSystemOne");
	assert.strictEqual(xmlHttpRequestSpy.getSentData(), JSON.stringify(textData));
	assert.strictEqual(recievedAnswer.status, 201);
	assert.strictEqual(recievedAnswer.responseText, "a dummy response");
	assert.ok(loadMethodWasCalled, "loadMethod was called ok");
});

QUnit.test("testSendDelete", function(assert) {
	var loadMethodWasCalled = false;
	var recievedAnswer;
	function loadMethod(answer) {
		loadMethodWasCalled = true;
		recievedAnswer = answer;
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "DELETE",
		"url" : "http://130.238.171.39:8080/therest/rest/record/textSystemOne/myText",
		"loadMethod" : loadMethod,
	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"], undefined);
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);

	assert.ok(loadMethodWasCalled, "loadMethod was called ok");
});

QUnit.test("testDownloadProgress", function(assert) {
	var specReturned;
	function loadMethod(answer) {
	}
	function progressMethod(progressEvent) {
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"downloadProgressMethod" : progressMethod
	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.strictEqual(ajaxCall.xhr.addedEventListeners["progress"][0], progressMethod);

});

QUnit.test("testUploadProgress", function(assert) {
	var specReturned;
	function loadMethod(answer) {
	}
	function progressMethod(progressEvent) {
	}
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"uploadProgressMethod" : progressMethod
	};
	var ajaxCall = CORA.ajaxCall(spec);
	assert.strictEqual(ajaxCall.xhr.upload.addedEventListeners["progress"][0], progressMethod);
});
