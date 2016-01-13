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
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
});

QUnit.test("testInitGroupIdOneTextChildWithData", function() {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');
});

function createLinkedPathWithNameInDataAsString(nameInData) {
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testInitGroupIdOneTextChildWithWrongData", function() {
	var data = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableIdNot",
				"value" : "A Value"
			} ]
	};
	
	var metadataController = new CORA.MetadataController("groupIdOneTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
});

function createLinkedPathWithNameInDataAsString(nameInData) {
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testInitGroupIdTwoTextChild", function() {
	var metadataController = new CORA.MetadataController("groupIdTwoTextChild", undefined,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');
});

QUnit.test("testInitGroupIdTwoTextChildWithData", function() {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		}, {
			"name" : "textVariableId2",
			"value" : "A Value2"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdTwoTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');

	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId2") + '}}');
});

QUnit.test("testInitGroupIdTwoTextChildWithWrongData", function() {
	var data = {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableIdNOT",
				"value" : "A Value"
			}, {
				"name" : "textVariableId2",
				"value" : "A Value2"
			} ]
	};
	
	var metadataController = new CORA.MetadataController("groupIdTwoTextChild", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');
	deepEqual(JSON.stringify(messages[2]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId2") + '}}');
});

QUnit.test("testInitOneChildRepeat0to1", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat0to1",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
});

QUnit.test("testInitOneChildRepeat0to1WithData", function() {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat0to1", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');
});

QUnit.test("testInitOneChildRepeat3to3", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"1"}}');
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"2"}}');
});

QUnit.test("testInitOneChildRepeat3to3WithData", function() {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "two"
		}, {
			"name" : "textVariableId",
			"value" : "A Value3",
			"repeatId" : "three"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two") + '}}');

	deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"three"}}');
	deepEqual(JSON.stringify(messages[5]), '{"type":"setValue","message":{"data":"A Value3",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "three") + '}}');
});

function createLinkedPathWithNameInDataAndRepeatIdAsString(nameInData, repeatId) {
	return JSON.stringify(createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId));
}
function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
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
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');

	deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"1"}}');
});

QUnit.test("testInitOneChildRepeat3to3WithDataOCalculateRepeatId", function() {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "5"
		}, {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "2"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat3to3", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"5"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "5")
			+ '}}');

	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"2"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":' + createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "2")
			+ '}}');

	deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"6"}}');
});

QUnit.test("testInitOneChildRepeat1toX", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
});

QUnit.test("testInitOneChildRepeat1toXWithDataForOne", function() {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');
});

QUnit.test("testInitOneChildRepeat1toXWithDataForTwo", function() {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "two"
		} ]
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildRepeat1toX", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two") + '}}');
});

QUnit.test("testInitOneChildOneAttribute", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChildOneAttribute",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
});

QUnit.test("testInitOneChildOneAttributeWithDataForOne", function() {
	var data = {
		"name" : "groupIdOneTextChildOneAttribute",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ],
		"attributes" : {
			"anAttribute" : "aFinalValue"
		}
	};

	var metadataController = new CORA.MetadataController("groupIdOneTextChildOneAttribute", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	var path = createLinkedPathWithNameInData("textVariableId");

	deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + JSON.stringify(path) + '}}');
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroup", function() {
	var metadataController = new CORA.MetadataController("groupInGroupOneTextChildOneAttribute",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path.children.push(attributes);
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function() {
	var data = {
		"name" : "groupInGroupOneTextChildOneAttribute",
		"children" : [ {
			"name" : "groupIdOneTextChildOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value2"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		} ]
	};

	var metadataController = new CORA.MetadataController("groupInGroupOneTextChildOneAttribute",
			data, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path.children.push(attributes);
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path2.children.push(attributes);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	deepEqual(JSON.stringify(messages[2]), '{"type":"setValue","message":{"data":"A Value2",'
			+ '"path":' + JSON.stringify(path2) + '}}');
	equal(messages.length, 3);
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithWrongData", function() {
	var data = {
			"name" : "groupInGroupOneTextChildOneAttribute",
			"children" : [ {
				"name" : "groupIdOneTextChildOneAttribute",
				"children" : [ {
					"name" : "textVariableId",
					"value" : "A Value2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValueNOT"
				}
			} ]
	};
	
	var metadataController = new CORA.MetadataController("groupInGroupOneTextChildOneAttribute",
			data, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');
	
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
	"aFinalValue"));
	path.children.push(attributes);
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');
	
	equal(messages.length, 2);
});

QUnit.test("testInitTextVarRepeat1to1InGroupTwoAttributeInGroup", function() {
	var metadataController = new CORA.MetadataController("groupInGroupOneTextChildTwoAttributes",
			undefined, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildTwoAttributes","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');
});

QUnit.test("testInitTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function() {
	var data = {
		"name" : "groupInGroupOneTextChildTwoAttributes",
		"children" : [ {
			"name" : "groupIdOneTextChildTwoAttributes",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "A Value3"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anOtherAttribute" : "aOtherFinalValue"
			}
		} ]
	};

	var metadataController = new CORA.MetadataController("groupInGroupOneTextChildTwoAttributes",
			data, this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildTwoAttributes","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path2.children.push(attributes);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	deepEqual(JSON.stringify(messages[2]), '{"type":"setValue","message":{"data":"A Value3",'
			+ '"path":' + JSON.stringify(path2) + '}}');
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
		function() {
			var metadataController = new CORA.MetadataController(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					undefined, this.metadataProvider, this.pubSub);
			var messages = this.pubSub.getMessages();
			deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"0"}}');
		});

// textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup
// textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup
// textVarRepeat1to3InGroupOneAttribute
// textVar
QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function() {
	var data = {
		"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
			"repeatId":"one0",
			"children" : [ {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"repeatId":"one1",
				"children" : [ {
					"name" : "textVar",
					"value" : "A Value3",
						"repeatId":"one2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			} ]
		} ]
	};

	var metadataController = new CORA.MetadataController(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data,
			this.metadataProvider, this.pubSub);
	var messages = this.pubSub.getMessages();
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
			+ ',"path":{},"repeatId":"one0"}}');

	var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
	path.children.push({"name":"repeatId","value":"one0"});
	deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":' + JSON.stringify(path)
			+ ',"repeatId":"one1"}}');

	var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
	path2.children.push({"name":"repeatId","value":"one0"});
	var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path2.children.push(path22);
	path22.children.push({"name":"repeatId","value":"one1"});
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	path22.children.push(attributes);
	deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
			+ ',"repeatId":"one2"}}');
 
	var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
	path3.children.push({"name":"repeatId","value":"one0"});
	var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path3.children.push(path32);
	path32.children.push({"name":"repeatId","value":"one1"});
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	path32.children.push(attributes);
	
	var path33 = createLinkedPathWithNameInData("textVar");
	path32.children.push(path33);
	path33.children.push({"name":"repeatId","value":"one2"});
	
	deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value3",'
			+ '"path":' + JSON.stringify(path3) + '}}');
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function() {
			var data = {
					"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					"children" : [ {
						"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
						"repeatId":"one0",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttribute",
							"repeatId":"one1",
							"children" : [ {
								"name" : "textVar",
								"value" : "A Value3",
								"repeatId":"one2"
							} ],
							"attributes" : {
								"anAttribute" : "aFinalValue"
							}
						} ]
					} ]
			};
			
			var metadataController = new CORA.MetadataController(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data,
					this.metadataProvider, this.pubSub);
			var messages = this.pubSub.getMessages();
			deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"one0"}}');
			
			var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path.children.push({"name":"repeatId","value":"one0"});
			deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":' + JSON.stringify(path)
					+ ',"repeatId":"one1"}}');
			
			var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path2.children.push({"name":"repeatId","value":"one0"});
			var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path2.children.push(path22);
			path22.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path22.children.push(attributes);
			deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
					+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
					+ ',"repeatId":"one2"}}');
			
			var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path3.children.push({"name":"repeatId","value":"one0"});
			var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path3.children.push(path32);
			path32.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path32.children.push(attributes);
			
			var path33 = createLinkedPathWithNameInData("textVar");
			path32.children.push(path33);
			path33.children.push({"name":"repeatId","value":"one2"});
			
			deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value3",'
					+ '"path":' + JSON.stringify(path3) + '}}');
			equal(messages.length, 4);
		});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData2", function() {
			var data = {
					  "name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					  "children": [
					    {
					      "name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
					      "repeatId": "one0",
					      "children": [
					        {
					          "name": "textVarRepeat1to3InGroupOneAttribute",
					          "repeatId": "one1",
					          "children": [
					            {
					              "name": "textVar",
					              "value": "A Value3",
					              "repeatId": "one2"
					            }
					          ],
					          "attributes": {
					            "anAttribute": "aFinalValue"
					          }
					        }
					      ]
					    },
					    {
					      "name": "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
					      "repeatId": "one0_2",
					      "children": [
					        {
					          "name": "textVarRepeat1to3InGroupOneAttribute",
					          "repeatId": "one1",
					          "children": [
					            {
					              "name": "textVar",
					              "value": "A Value3",
					              "repeatId": "one2"
					            }
					          ],
					          "attributes": {
					            "anAttribute": "aFinalValue"
					          }
					        }
					      ]
					    }
					  ]
					};
			
			var metadataController = new CORA.MetadataController(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data,
					this.metadataProvider, this.pubSub);
			var messages = this.pubSub.getMessages();
			deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"one0"}}');
			
			var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path.children.push({"name":"repeatId","value":"one0"});
			deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":' + JSON.stringify(path)
					+ ',"repeatId":"one1"}}');
			
			var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path2.children.push({"name":"repeatId","value":"one0"});
			var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path2.children.push(path22);
			path22.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path22.children.push(attributes);
			deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
					+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
					+ ',"repeatId":"one2"}}');
			
			var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path3.children.push({"name":"repeatId","value":"one0"});
			var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path3.children.push(path32);
			path32.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path32.children.push(attributes);
			
			var path33 = createLinkedPathWithNameInData("textVar");
			path32.children.push(path33);
			path33.children.push({"name":"repeatId","value":"one2"});
			
			deepEqual(JSON.stringify(messages[3]), '{"type":"setValue","message":{"data":"A Value3",'
					+ '"path":' + JSON.stringify(path3) + '}}');
			
			
			
			deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"one0_2"}}');
			
			var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path.children.push({"name":"repeatId","value":"one0_2"});
			deepEqual(JSON.stringify(messages[5]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":' + JSON.stringify(path)
					+ ',"repeatId":"one1"}}');
			
			var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path2.children.push({"name":"repeatId","value":"one0_2"});
			var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path2.children.push(path22);
			path22.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path22.children.push(attributes);
			deepEqual(JSON.stringify(messages[6]), '{"type":"add","message":{'
					+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
					+ ',"repeatId":"one2"}}');
			
			var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
			path3.children.push({"name":"repeatId","value":"one0_2"});
			var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			path3.children.push(path32);
			path32.children.push({"name":"repeatId","value":"one1"});
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path32.children.push(attributes);
			
			var path33 = createLinkedPathWithNameInData("textVar");
			path32.children.push(path33);
			path33.children.push({"name":"repeatId","value":"one2"});
			
			deepEqual(JSON.stringify(messages[7]), '{"type":"setValue","message":{"data":"A Value3",'
					+ '"path":' + JSON.stringify(path3) + '}}');
			
			equal(messages.length, 8);
		});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData3", function() {
			var data = {
					"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					"children" : [  ]
			};
			
			var metadataController = new CORA.MetadataController(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data,
					this.metadataProvider, this.pubSub);
			var messages = this.pubSub.getMessages();
			deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"0"}}');
			
			equal(messages.length, 1);
		});

//TODO: add test with same name in data but different attributes.....
//group2InGroupOneTextChildRepeat1to3OneAttribute


QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		function() {
			var metadataController = new CORA.MetadataController(
					"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
					undefined, this.metadataProvider, this.pubSub);
			var messages = this.pubSub.getMessages();
//			deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
//					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
//					+ ',"path":{},"repeatId":"0"}}');
			equal(messages.length, 0);
		});




// QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// function() {
// var dataHolder = new CORA.DataHolder(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0");
// dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute",
// "repeatId");
//	
// deepEqual(
// JSON.stringify(dataHolder.getData()),
// '{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
// +
// '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
// + '"children":[{"name":"textVarRepeat1to3InGroupOneAttribute",'
// + '"children":[{"name":"textVar","value":"","repeatId":"0"}],'
// + '"attributes":{"anAttribute":"aFinalValue"}'
// + ',"repeatId":"repeatId"' + '}]' + ',"repeatId":"0"' + '}]}');
// });
