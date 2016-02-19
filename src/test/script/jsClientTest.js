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

QUnit.module("jsClientTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordTypeListData = CORATEST.recordTypeList;
	var xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
	function sendFunction() {
		xmlHttpRequestSpy.status = 200;
		xmlHttpRequestSpy.responseText = JSON.stringify(recordTypeListData);
		xmlHttpRequestSpy.addedEventListeners["load"][0]();
	}

	var spec = {
		"xmlHttpRequestFactory" : CORATEST.xmlHttpRequestFactorySpy(xmlHttpRequestSpy),
		"name" : "The Client",
		"baseUrl" : "http://epc.ub.uu.se/cora/rest/"
	};
	var jsClient = CORA.jsClient(spec);
	var mainView = jsClient.getView();

	assert.strictEqual(mainView.className, "jsClient mainView");

	var header = mainView.childNodes[0];
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.innerHTML, "The Client");

	var sideBar = mainView.childNodes[1];
	assert.strictEqual(sideBar.className, "sideBar");

	var recordTypeList = jsClient.getRecordTypeList();
//	console.log(recordTypeList)
	assert.strictEqual(recordTypeList.length, 15);
	
	var firstRecordType = sideBar.childNodes[0];
	assert.strictEqual(firstRecordType.className, "recordType");
	assert.strictEqual(firstRecordType.innerHTML, "presentationVar");

});
