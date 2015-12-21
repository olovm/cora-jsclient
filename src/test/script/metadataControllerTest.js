/*
 * Copyright 2015 Olov McKie
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

QUnit.module("CORA.MetadataController", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
	},
	teardown : function() {
	}
});

QUnit.test("testInit", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChild", undefined,
			this.metadataProvider, this.pubSub);
	ok(metadataController !== undefined);
	var messages = this.pubSub.getMessages();
	ok(messages !== undefined);
});

QUnit.test("testInitGroupIdOneTextChild", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChild", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
}); 

QUnit.test("testInitGroupIdOneTextChildWithData", function() {
	var data = {"name":"groupIdOneTextChild",
		"children":[{"name":"textVariableId","value":"A Value"}]};

	var metadataController = new CORA.MetadataController("groupIdOneTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
	'"path":'+createLinkedPathWithNameInDataAsString("textVariableId")+'}}');
});

function createLinkedPathWithNameInDataAsString(nameInData){
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testInitGroupIdTwoTextChild", function() {
	var metadataController = new CORA.MetadataController("groupIdTwoTextChild", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId2","path":{}}}');
}); 

QUnit.test("testInitGroupIdTwoTextChildWithData", function() {
	var data = {"name":"groupIdOneTextChild",
		"children":[{"name":"textVariableId","value":"A Value"},
		            {"name":"textVariableId2","value":"A Value2"}]};

	var metadataController = new CORA.MetadataController("groupIdTwoTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAsString("textVariableId")+'}}');
	
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId2","path":{}}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'+
			'"path":'+createLinkedPathWithNameInDataAsString("textVariableId2")+'}}');
}); 

QUnit.test("testInitOneChildRepeat0to1", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat0to1", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
}); 

QUnit.test("testInitOneChildRepeat0to1WithData", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
		"children":[{"name":"textVariableId","value":"A Value"}]};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat0to1", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAsString("textVariableId")+'}}');
}); 

QUnit.test("testInitOneChildRepeat3to3", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"1"}}');
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"2"}}');
}); 

QUnit.test("testInitOneChildRepeat3to3WithData", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
		"children":[{"name":"textVariableId","value":"A Value", "repeatId":"one"},
		            {"name":"textVariableId","value":"A Value2", "repeatId":"two"},
		            {"name":"textVariableId","value":"A Value3", "repeatId":"three"}]};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one")+'}}');
	
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two")+'}}');
	
	deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"three"}}');
	deepEqual(JSON.stringify(messages[5]), '{"type":"setValue","message":{"data":"A Value3",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "three")+'}}');
}); 

function createLinkedPathWithNameInDataAndRepeatIdAsString(nameInData, repeatId){
	return JSON.stringify(createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId));
}
function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId){
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		}, {
			"name" : "repeatId",
			"value" : repeatId
		} ]
	};
}

QUnit.test("testInitOneChildRepeat3to3WithDataForOne", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
		"children":[{"name":"textVariableId","value":"A Value", "repeatId":"one"}]};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one")+'}}');
	
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
	
	deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"1"}}');
}); 

QUnit.test("testInitOneChildRepeat3to3WithDataOCalculateRepeatId", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
			"children":[{"name":"textVariableId","value":"A Value", "repeatId":"5"},
			            {"name":"textVariableId","value":"A Value2", "repeatId":"2"}]};
	
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"5"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "5")+'}}');
	
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"2"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "2")+'}}');
	
	deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"6"}}');
}); 

QUnit.test("testInitOneChildRepeat1toX", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
}); 

QUnit.test("testInitOneChildRepeat1toXWithDataForOne", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
		"children":[{"name":"textVariableId","value":"A Value", "repeatId":"one"}]};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one")+'}}');
}); 

QUnit.test("testInitOneChildRepeat1toXWithDataForTwo", function() {
	var data = {"name":"groupIdOneTextChildRepeat0to1",
			"children":[{"name":"textVariableId","value":"A Value", "repeatId":"one"},
			            {"name":"textVariableId","value":"A Value2", "repeatId":"two"}]};
	
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one")+'}}');
	
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'+
	'"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'+
			'"path":'+createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two")+'}}');
}); 
//QUnit.test("testCreateOneChildRepeat1toX", function() {
//	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
//			this.metadataProvider, this.pubSub);
//	deepEqual(JSON.stringify(dataHolder.getData()), 
//			'{"name":"groupIdOneTextChildRepeat1toX",'
//			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"}'
//			+']}');
//});
