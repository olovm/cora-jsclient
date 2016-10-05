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
		var xmlHttpRequestFactoryMultipleSpy = CORATEST.xmlHttpRequestFactoryMultipleSpy();
		xmlHttpRequestFactoryMultipleSpy.setResponseStatus(200);
		var responseText = JSON.stringify(CORATEST.textList);
		xmlHttpRequestFactoryMultipleSpy.setResponseText(responseText);

		var dependencies = {
			"xmlHttpRequestFactory" : xmlHttpRequestFactoryMultipleSpy,
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

		this.xmlHttpRequestFactoryMultipleSpy = xmlHttpRequestFactoryMultipleSpy;
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var provider = CORA.textProvider(this.spec);
	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

	var openUrl0 = xmlHttpRequestSpy.getOpenUrl();
	assert.strictEqual(openUrl0.substring(0, openUrl0.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/text/");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+recordList+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);
});

QUnit.test("initCallWhenReadyCalledWhenReady", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	var xmlHttpRequestFactoryMultipleSpy = this.xmlHttpRequestFactoryMultipleSpy;
	xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	var spec = this.spec;
	spec.callWhenReady = providerReady;
	var provider = CORA.textProvider(spec);

	var xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

	assert.notOk(providerStarted);

	xmlHttpRequestSpy.runLoadFunction();

	assert.ok(providerStarted);
});

QUnit.test("initCallWhenReadyNotCalledWhenReadyIfUnspecified", function(assert) {
	var providerStarted = false;
	function providerReady() {
		providerStarted = true;
	}

	var xmlHttpRequestFactoryMultipleSpy = this.xmlHttpRequestFactoryMultipleSpy;
	xmlHttpRequestFactoryMultipleSpy.setSendResponse(false);

	var spec = this.spec;
	var provider = CORA.textProvider(spec);

	var xmlHttpRequestSpy = xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);

	assert.notOk(providerStarted);

	xmlHttpRequestSpy.runLoadFunction();

	assert.notOk(providerStarted);
});

QUnit.test("testInitEnteredTextListLinkIsNotChanged", function(assert) {
	var textListLinkJson = this.textListLinkJson;

	var textListLinkJsonAfter = JSON.stringify(this.textListLink);
	assert.deepEqual(textListLinkJsonAfter, textListLinkJson);
});

QUnit.test("testGetTranslation", function(assert) {
	var provider = CORA.textProvider(this.spec);
	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var translation = provider.getTranslation("textPartSvPGroupText");
	assert.deepEqual(translation, "Svenska");
});

QUnit.test("testGetTranslationNotFound", function(assert) {
	var provider = CORA.textProvider(this.spec);
	var xmlHttpRequestSpy = this.xmlHttpRequestFactoryMultipleSpy.getFactoredXmlHttpRequest(0);
	var translation = provider.getTranslation("textPartSvPGroupTextNOT");
	assert.deepEqual(translation, "MISSING TRANSLATION FOR TEXTID:textPartSvPGroupTextNOT");
});
