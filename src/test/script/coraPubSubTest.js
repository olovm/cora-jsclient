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

QUnit.module("CORA.PubSub", {
	beforeEach : function() {
		this.pubSub = CORA.pubSub();
		this.messages = [];
		this.toCall = function(data, msg) {
			this.messages.push({
				"data" : data,
				"message" : msg
			});
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.ok(this.pubSub !== undefined);
});

QUnit.test("testSubscribe", function(assert) {
	var type = "add";
	var path = {};
	var functionToCall = function() {
	};
	var context = this;
	this.pubSub.subscribe(type, path, context, functionToCall);
	assert.ok(this.pubSub !== undefined);
});
QUnit.test("testPublish", function(assert) {
	var type = "add";
	var path = {};
	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	assert.ok(this.pubSub !== undefined);
});
QUnit.test("testProblemWhenCallingFunctionToCall", function(assert) {
	var type = "add";
	var path = {};
	var functionToCall = function() {
		//generate error
		x + y === z;
	};
	var context = this;
	this.pubSub.subscribe(type, path, context, functionToCall);
	assert.ok(this.pubSub !== undefined);

	var data = {
			"metadataId" : "someId",
			"path" : path,
			"repeatId" : "someRepeatId"
	};
	throws(function() {
		this.pubSub.publish(type, data);
	}, "Error");
});

QUnit.test("testMore", function(assert) {
	var type = "add";
	var path = {};
	var context = this;
	var functionToCall = this.toCall;
	this.pubSub.subscribe(type, path, context, functionToCall);

	var data = {
		"metadataId" : "someId",
		"path" : path,
		"repeatId" : "someRepeatId"
	};
	this.pubSub.publish(type, data);
	assert.ok(this.messages.length === 1);
	assert.deepEqual(this.messages[0].data, data);
	assert.deepEqual(this.messages[0].message, "root/add");
});
QUnit.test("testConvertPathNameInData", function(assert) {
	var path = createLinkedPathWithNameInData("someNameInData");
	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/someNameInData/");
});
QUnit.test("testConvertPathNameInDataAndAttributes", function(assert) {
	var path = createLinkedPathWithNameInData("someNameInData");

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);

	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath,
			"root/someNameInData#anAttribute:aFinalValue#anOtherAttribute:aOtherFinalValue/");
});
QUnit.test("testConvertPathNameInDataAndRepeatId", function(assert) {
	var path = createLinkedPathWithNameInDataAndRepeatId("someNameInData", "one");
	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/someNameInData.one/");
});

QUnit.test("testConvertPathNameInDataAndAttributesAndRepeatId", function(assert) {
	var path = createLinkedPathWithNameInDataAndRepeatId("someNameInData", "1");

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);

	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/"
			+ "someNameInData#anAttribute:aFinalValue#anOtherAttribute:aOtherFinalValue.1/");
});

QUnit.test("testConvertPathNameInDataAndAttributesAndRepeatIdTwoLevels", function(assert) {
	var path = createLinkedPathWithNameInDataAndRepeatId("someNameInData", "1");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);

	var path2 = createLinkedPathWithNameInDataAndRepeatId("someNameInData2", "2");
	var attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute2",
			"aFinalValue2", "1"));
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute2",
			"aOtherFinalValue2", "2"));
	path2.children.push(attributes2);

	path.children.push(path2);

	var convertedPath = this.pubSub.convertPathToMsg(path);
	assert.deepEqual(convertedPath, "root/"
			+ "someNameInData#anAttribute:aFinalValue#anOtherAttribute:aOtherFinalValue.1/"
			+ "someNameInData2#anAttribute2:aFinalValue2#anOtherAttribute2:aOtherFinalValue2.2/");
});