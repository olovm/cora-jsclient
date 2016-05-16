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
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
	}
	var recordViewerSpec = {
		"actionLinkRead" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://epc.ub.uu.se/cora/rest/record/system/cora",
			"accept" : "application/uub+record+json"
		},
		"recordTypeRecord" : this.record,
		"presentationMode" : "view",
		"views" : {
			"menuView" : this.menuView,
			"workView" : this.workView
		},
		"record" : this.record,
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"jsClient" : this.jsClientSpy
	};
	var recordHandler = CORA.recordHandler(recordHandlerSpec);

	assert.notStrictEqual(recordHandler, undefined);
});
