/*
 * Copyright 2016 Olov McKie
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

QUnit.module("textProviderTest.js", {
	beforeEach : function() {
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"ajaxCallFactory" : this.ajaxCallFactorySpy
		};
		var textListLink = {
			"requestMethod" : "GET",
			"rel" : "list",
			"url" : "http://epc.ub.uu.se/cora/rest/record/text/",
			"accept" : "application/uub+recordList+json"
		};
		var spec = {
			"dependencies" : dependencies,
			"textListLink" : textListLink,
			"lang" : "sv"
		};
		this.spec = spec;

		this.textListLink = textListLink;
		this.textListLinkJson = JSON.stringify(this.textListLink);

		this.textAnswer = {
			"responseText" : JSON.stringify(CORATEST.textList)
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	function assertAjaxCallSpecIsCorrect(ajaxCallSpy, recordType) {
		var ajaxCallSpec = ajaxCallSpy.getSpec();
		assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/" + recordType
				+ "/");
		assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
		assert.strictEqual(ajaxCallSpec.accept, "application/uub+recordList+json");
		assert.strictEqual(ajaxCallSpec.loadMethod, textProvider.processFetchedTextdata);
	}
	var textProvider = CORA.textProvider(this.spec);

	var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(0);
	assertAjaxCallSpecIsCorrect(ajaxCallSpy0, "text");
});

QUnit.test("callWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	this.spec.callWhenReady = providerReady;
	var textProvider = CORA.textProvider(this.spec);

	assert.notOk(providerStarted);

	textProvider.processFetchedTextdata(this.textAnswer);

	assert.ok(providerStarted);
});

QUnit.test("callWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	var textProvider = CORA.textProvider(this.spec);

	textProvider.processFetchedTextdata(this.textAnswer);
	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredTextListLinkIsNotChanged", function(assert) {
	var textListLinkJson = this.textListLinkJson;

	var textListLinkJsonAfter = JSON.stringify(this.textListLink);
	assert.deepEqual(textListLinkJsonAfter, textListLinkJson);
});

QUnit.test("testGetTranslation", function(assert) {
	var textProvider = CORA.textProvider(this.spec);
	textProvider.processFetchedTextdata(this.textAnswer);
	var translation = textProvider.getTranslation("textPartSvPGroupText");
	assert.deepEqual(translation, "Svenska");
});

QUnit.test("testGetTranslationNotFound", function(assert) {
	var textProvider = CORA.textProvider(this.spec);
	textProvider.processFetchedTextdata(this.textAnswer);
	var translation = textProvider.getTranslation("textPartSvPGroupTextNOT");
	assert.deepEqual(translation, "MISSING TRANSLATION FOR TEXTID:textPartSvPGroupTextNOT");
});
