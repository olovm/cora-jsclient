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

QUnit.module("ajaxCall.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit
		.test(
				"testCall200",
				function(assert) {
					var timeout = setTimeout(function() {
						assert.ok(false, "ajaxCall timed  out (500ms)");
						done();
					}, 500);
					var done = assert.async();
					var expectedAnswer = {
						"record" : {
							"data" : {
								"children" : [ {
									"children" : [ {
										"name" : "id",
										"value" : "defaultItem"
									}, {
										"name" : "type",
										"value" : "metadataCollectionItem"
									}, {
										"name" : "createdBy",
										"value" : "userId"
									}, {
										"name" : "updatedBy",
										"value" : "userId"
									} ],
									"name" : "recordInfo"
								}, {
									"name" : "nameInData",
									"value" : "default"
								}, {
									"name" : "textId",
									"value" : "defaultItemTextId"
								}, {
									"name" : "defTextId",
									"value" : "defaultItemDefTextId"
								} ],
								"name" : "metadata",
								"attributes" : {
									"type" : "collectionItem"
								}
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
									"url" : "http://130.238.171.39:8080/therest/rest/record/metadataCollectionItem/defaultItem",
									"accept" : "application/uub+record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://130.238.171.39:8080/therest/rest/record/metadataCollectionItem/defaultItem",
									"accept" : "application/uub+record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://130.238.171.39:8080/therest/rest/record/metadataCollectionItem/defaultItem",
									"accept" : "application/uub+record+json"
								}
							}
						}
					};
					function loadMethod(xhr) {
						window.clearTimeout(timeout);
						assert.strictEqual(xhr.status, 200);
//						console.log(xhr.responseText);
						assert.strictEqual(xhr.responseText, JSON.stringify(expectedAnswer));
						done();
					}
					function errorMethod(xhr) {
						window.clearTimeout(timeout);
						console.log(xhr.status);
						assert.ok(false, "not an ok call");
						done();
					}
					var spec = {
						"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
						"method" : "GET",
						"url" : "http://130.238.171.39:8080/therest/rest/record/metadataCollectionItem/defaultItem",
						// "url" :
						// "http://130.238.171.39:8080/therest/rest/record/recordType",
						"contentType" : "application/uub+record+json",
						// "accept" : "application/uub+recordList+json",
						"accept" : "application/uub+record+json",
						"loadMethod" : loadMethod,
						"errorMethod" : errorMethod

					};
					var ajaxCall = CORA.ajaxCall(spec);
				});

QUnit.test("testCallNot200", function(assert) {
	var timeout = setTimeout(function() {
		assert.ok(false, "ajaxCall timed  out (500ms)");
		done();
	}, 500);

	var done = assert.async();
	var status = "";
	function loadMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(false, "not an ok call");
		done();
	}
	function errorMethod(xhr) {
		window.clearTimeout(timeout);
		status = xhr.status;
		assert.strictEqual(xhr.status, 406);
		done();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
		"method" : "GET",
		"url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"errorMethod" : errorMethod

	};
	var ajaxCall = CORA.ajaxCall(spec);

});

QUnit.test("testCallError", function(assert) {
	var timeout = setTimeout(function() {
		assert.ok(false, "ajaxCall timed  out (500ms)");
		done();
	}, 500);

	var done = assert.async();
	var status = "";
	function loadMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(false, "should error ");
		done();
	}
	function errorMethod(xhr) {
		window.clearTimeout(timeout);
		status = xhr.status;
		assert.strictEqual(xhr.status, 0);
		done();

	}
	var spec = {
		"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
		"method" : "GET",
		"url" : "http://notAnExistingAddress/therest/rest/record/recordType",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"errorMethod" : errorMethod

	};
	var ajaxCall = CORA.ajaxCall(spec);

});

QUnit.test("testTimeout", function(assert) {
	var timeout = setTimeout(function() {
		assert.ok(false, "ajaxCall timed  out (500ms)");
		done();
	}, 5000);
	var done = assert.async();
	function loadMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(false, "should timeout1");
		done();
	}
	function errorMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(false, "should timeout2");
		done();
	}
	function timeoutMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(true, "timedout as expected");
		done();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
		"timeoutInMS" : 1,
		"timeoutMethod" : timeoutMethod,
		"method" : "GET",
		"url" : "http://www.google.com",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+recordList+json",
		"loadMethod" : loadMethod,
		"errorMethod" : errorMethod

	};
	var ajaxCall = CORA.ajaxCall(spec);
});

QUnit.test("testSendCreate", function(assert) {
	var timeout = setTimeout(function() {
		assert.ok(false, "ajaxCall timed  out (500ms)");
		done();
	}, 500);
	var done = assert.async();
	function loadMethod(xhr) {
		window.clearTimeout(timeout);
		assert.strictEqual(xhr.status, 201);
		done();
	}
	function errorMethod(xhr) {
		window.clearTimeout(timeout);
		console.log(xhr.statusText)
		assert.ok(false, "not an ok call");
		done();
	}
	function timeoutMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(true, "timedout as expected");
		done();
	}
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
	var spec = {
		"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
		"timeoutMethod" : timeoutMethod,
		"method" : "POST",
		"url" : "http://130.238.171.39:8080/therest/rest/record/textSystemOne",
		"contentType" : "application/uub+record+json",
		"accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"errorMethod" : errorMethod,
		"data" : JSON.stringify(textData)
	};
	var ajaxCall = CORA.ajaxCall(spec);
});
QUnit.test("testSendDelete", function(assert) {
	var timeout = setTimeout(function() {
		assert.ok(false, "ajaxCall timed  out (500ms)");
		done();
	}, 500);
	var done = assert.async();
	function loadMethod(xhr) {
		window.clearTimeout(timeout);
		assert.strictEqual(xhr.status, 200);
		done();
	}
	function errorMethod(xhr) {
		window.clearTimeout(timeout);
		console.log(xhr.statusText)
		console.log(xhr.status)
		assert.ok(false, "not an ok call");
		done();
	}
	function timeoutMethod(xhr) {
		window.clearTimeout(timeout);
		assert.ok(true, "timedout as expected");
		done();
	}
	var spec = {
		"xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
		"timeoutMethod" : timeoutMethod,
		"method" : "DELETE",
		"url" : "http://130.238.171.39:8080/therest/rest/record/textSystemOne/myText",
		// "contentType" : "application/uub+record+json",
		// "accept" : "application/uub+record+json",
		"loadMethod" : loadMethod,
		"errorMethod" : errorMethod
	};
	var ajaxCall = CORA.ajaxCall(spec);
});
