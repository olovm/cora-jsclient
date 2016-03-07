/*
 * Copyright 2016 Olov McKie
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

QUnit.module("messageTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testConstants", function(assert) {
	assert.deepEqual(CORA.message.ERROR, {
		"className" : "error",
		"defaultTimeout" : 0
	});
	assert.deepEqual(CORA.message.WARNING, {
		"className" : "warning",
		"defaultTimeout" : 10000
	});
	assert.deepEqual(CORA.message.INFO, {
		"className" : "info",
		"defaultTimeout" : 5000
	});
	assert.deepEqual(CORA.message.POSITIVE, {
		"className" : "positive",
		"defaultTimeout" : 5000
	});
});

QUnit.test("testInit", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 254
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(message.getTimeout(), 254);

//	var view = message.getView();
	assert.strictEqual(view.modelObject, message);
	assert.strictEqual(view.className, "message error");

	var messageText = view.firstChild;
	assert.strictEqual(messageText.textContent, "some text");
});

QUnit.test("testInitWithoutTimeout", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.WARNING
	};
	var message = CORA.message(messageSpec);
	var view = message.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(message.getTimeout(), 10000);
});

QUnit.test("testHide", function(assert) {
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 21
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);

	message.hide();
	assert.notVisible(view);
});
QUnit.test("testHideAfterTimeout", function(assert) {
	var done = assert.async();
	var messageSpec = {
		"message" : "some text",
		"type" : CORA.message.ERROR,
		"timeout" : 201
	};
	var message = CORA.message(messageSpec);

	var view = message.getView();
	this.fixture.appendChild(view);
	assert.visible(view);

	var timeout = window.setTimeout(function() {
//		assert.ok(false, "ajaxCall timed out (500ms)");
		assert.notVisible(view, "message should be hidden after 20ms timeout");
		done();
	}, 500);
});

// QUnit.test("testCallNot200", function(assert) {
// var timeout = setTimeout(function() {
// assert.ok(false, "ajaxCall timed out (500ms)");
// done();
// }, 500);
//
// var done = assert.async();
// var status = "";
// function loadMethod(xhr) {
// window.clearTimeout(timeout);
// assert.ok(false, "not an ok call");
// done();
// }
// function errorMethod(xhr) {
// window.clearTimeout(timeout);
// status = xhr.status;
// assert.strictEqual(xhr.status, 406);
// done();
// }
// var spec = {
// "xmlHttpRequestFactory" : CORA.xmlHttpRequestFactory(),
// "method" : "GET",
// "url" : "http://130.238.171.39:8080/therest/rest/record/recordType",
// "contentType" : "application/uub+record+json",
// "accept" : "application/uub+record+json",
// "loadMethod" : loadMethod,
// "errorMethod" : errorMethod
//
// };
// var ajaxCall = CORA.ajaxCall(spec);
//
// });
