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

QUnit.module("CORA.Arbiter", {
	beforeEach : function() {
		this.arbiter = Arbiter.create()
		this.fixture = document.getElementById("qunit-fixture");
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var publishCounter = 0;
	this.arbiter.subscribe('someName#attribName:attribValue.one/*', function(data, msg) {
//		console.log("path/setValue: " + msg + ' : ' + JSON.stringify(data));
		publishCounter++;
	})
	this.arbiter.publish('someName#attribName:attribValue.one/setValue',
			createLinkedPathWithNameInData("someName"));
	this.arbiter.publish('someName#attribName:attribValue.one/add',
			createLinkedPathWithNameInData("someName"));
	assert.ok(true);
	assert.strictEqual(publishCounter, 2);
});

QUnit.test("testUnsubscribe", function(assert) {
	var publishCounter = 0;
	var functionToCall  = function(data, msg) {
//		console.log("path/setValue: " + msg + ' : ' + JSON.stringify(data));
		publishCounter++;
	};
	var subscribeId = this.arbiter.subscribe('someName#attribName:attribValue.one/*', functionToCall);
	this.arbiter.publish('someName#attribName:attribValue.one/setValue',
			createLinkedPathWithNameInData("someName"));
	this.arbiter.unsubscribe(subscribeId);
	this.arbiter.publish('someName#attribName:attribValue.one/add',
			createLinkedPathWithNameInData("someName"));
	assert.ok(true);
	assert.strictEqual(publishCounter, 1);
});
