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
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};

		var jsClient = {
			showView : function() {
			},
			addGlobalView : function() {
			}
		}
		var textProvider = CORATEST.textProviderStub();

		var spec = {
			"dependencies" : dependencies,
			"jsClient" : jsClient,
			"textProvider" : textProvider

		};
		this.uploadManager = CORA.uploadManager(spec);
		var uploadLink = CORATEST.createUploadLink();
		this.file = CORATEST.createFileForUpload();
		this.uploadSpec = {
			"uploadLink" : uploadLink,
			"file" : this.file
		}
		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy) {
			var ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/therest/rest/record/"
					+ "image/image:333759270435575/upload");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "application/uub+record+json");
			assert.strictEqual(ajaxCallSpec.loadMethod, this.uploadManager.uploadFinished);
			assert.strictEqual(ajaxCallSpec.data.get("file"), this.file);
		}
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

	uploadManager.upload(this.uploadSpec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);
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
	var menuView = this.uploadManager.view.getItem().menuView;
	assert.strictEqual(menuView.className, "menuView");

	uploadManager.upload(this.uploadSpec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0);

	assert.strictEqual(menuView.className, "menuView uploading");

	uploadManager.upload(this.uploadSpec);
	assert.strictEqual(this.ajaxCallFactorySpy.getFactored(1), undefined);
	uploadManager.uploadFinished();

	var ajaxCallSpy1 = this.ajaxCallFactorySpy.getFactored(1);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy1);

	uploadManager.uploadFinished();
	assert.strictEqual(menuView.className, "menuView");
});

QUnit.test("testUploadError", function(assert) {
	var uploadManager = this.uploadManager;
	uploadManager.upload(this.uploadSpec);
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy0.getSpec().errorMethod(new Error("some error"));
	var fileView = this.uploadManager.view.getItem().workView.firstChild;
	assert.strictEqual(fileView.lastChild.textContent, "ERROR");
});

QUnit.test("testUploadTimeout", function(assert) {
	var uploadManager = this.uploadManager;
	uploadManager.upload(this.uploadSpec);
	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy0.getSpec().timeoutMethod();

	var fileView = this.uploadManager.view.getItem().workView.firstChild;
	assert.strictEqual(fileView.lastChild.textContent, "TIMEOUT");
});
