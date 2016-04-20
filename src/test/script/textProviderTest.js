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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.textProviderFactory = function(metadataProvider) {
		var factor = function(lang) {
			var spec = {
				"metadataProvider" : metadataProvider,
				"lang" : lang
			};
			return CORA.textProvider(spec);
		};
		return Object.freeze({
			factor : factor
		});
	};
	return coraTest;
}(CORATEST || {}));

QUnit.module("textProviderTest.js", {
	beforeEach : function() {
		var textListData = CORATEST.textList;
		var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
		function sendFunction() {
			xmlHttpRequestSpy.status = 200;
			xmlHttpRequestSpy.responseText = JSON.stringify(textListData);
			xmlHttpRequestSpy.addedEventListeners["load"][0]();
		}

		var dependencies = {
			"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
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

		this.xmlHttpRequestSpy = xmlHttpRequestSpy;
		this.textListLink = textListLink;
		this.textListLinkJson = JSON.stringify(this.textListLink);

		var textProvider = CORA.textProvider(spec);
		this.textProvider = textProvider;
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var xmlHttpRequestSpy = this.xmlHttpRequestSpy;
	var openUrls = xmlHttpRequestSpy.getOpenUrls();
	var openUrl0 = openUrls[0];
	assert.strictEqual(openUrl0.substring(0, openUrl0.indexOf("?")),
			"http://epc.ub.uu.se/cora/rest/record/text/");
	assert.strictEqual(xmlHttpRequestSpy.getOpenMethod(), "GET");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["accept"][0],
			"application/uub+recordList+json");
	assert.strictEqual(xmlHttpRequestSpy.addedRequestHeaders["content-type"], undefined);
});
QUnit.test("testInitEnteredTextListLinkIsNotChanged", function(assert) {
	var textListLinkJson = this.textListLinkJson;
	
	var textListLinkJsonAfter = JSON.stringify(this.textListLink);
	assert.deepEqual(textListLinkJsonAfter, textListLinkJson);
});

QUnit.test("testGetTranslation", function(assert) {
	var textProvider = this.textProvider;
	var translation = textProvider.getTranslation("textPartSvPGroupText");
	assert.deepEqual(translation, "Svenska");
});

QUnit.test("testGetTranslationNotFound", function(assert) {
	var textProvider = this.textProvider;
	assert.throws(function() {
		textProvider.getTranslation("textPartSvPGroupTextNOT");
	}, "Error");
});

