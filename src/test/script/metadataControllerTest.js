/*
 * Copyright 2015, 2016 Olov McKie
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.metadataControllerFactory = function(metadataProvider, pubSub) {
		var factor = function(metadataId, data) {

			var spec = {
				"metadataId" : metadataId,
				"data" : data,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var metadataController = CORA.metadataController(spec);
			return {
				metadataController : metadataController,
				metadataProvider : metadataProvider,
				pubSub : pubSub
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.MetadataController", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.metadataControllerFactory = CORATEST.metadataControllerFactory(this.metadataProvider,
				this.pubSub);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var metadataController = this.metadataControllerFactory
			.factor("groupIdOneTextChild", undefined);
	assert.ok(metadataController !== undefined);
	var messages = this.pubSub.getMessages();
	assert.ok(messages !== undefined);
});

QUnit.test("testInitGroupIdOneTextChild", function(assert) {
	var metadataController = this.metadataControllerFactory
			.factor("groupIdOneTextChild", undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	assert.equal(messages.length, 1);
});

QUnit.test("testInitGroupIdOneTextChildWithData", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChild", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');

	assert.equal(messages.length, 2);
});

function createLinkedPathWithNameInDataAsString(nameInData) {
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testInitGroupIdOneTextChildWithWrongData", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableIdNot",
			"value" : "A Value"
		} ]
	};

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChild", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	assert.equal(messages.length, 1);
});

function createLinkedPathWithNameInDataAsString(nameInData) {
	return JSON.stringify(createLinkedPathWithNameInData(nameInData));
}

QUnit.test("testInitGroupIdTwoTextChild", function(assert) {
	var metadataController = this.metadataControllerFactory
			.factor("groupIdTwoTextChild", undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitGroupIdTwoTextChildWithData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor("groupIdTwoTextChild", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');

	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[3]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":'
					+ createLinkedPathWithNameInDataAsString("textVariableId2") + '}}');

	assert.equal(messages.length, 4);
});

QUnit.test("testInitGroupIdTwoTextChildWithWrongData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor("groupIdTwoTextChild", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId2","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[2]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":'
					+ createLinkedPathWithNameInDataAsString("textVariableId2") + '}}');

	assert.equal(messages.length, 3);
});

QUnit.test("testInitOneChildRepeat0to1", function(assert) {
	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat0to1",
			undefined);
	var messages = this.pubSub.getMessages();
	assert.equal(messages.length, 0);
});

QUnit.test("testInitOneChildRepeat0to1WithData", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat0to1",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAsString("textVariableId") + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitOneChildRepeat3to3", function(assert) {
	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3",
			undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"1"}}');
	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"2"}}');

	assert.equal(messages.length, 3);
});

QUnit.test("testInitOneChildRepeat3to3WithData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	assert.deepEqual(JSON.stringify(messages[3]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":'
					+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two")
					+ '}}');

	assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"three"}}');
	assert.deepEqual(JSON.stringify(messages[5]),
			'{"type":"setValue","message":{"data":"A Value3",' + '"path":'
					+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "three")
					+ '}}');

	assert.equal(messages.length, 6);
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

QUnit.test("testInitOneChildRepeat3to3WithDataForOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		} ]
	};

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');

	assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"1"}}');

	assert.equal(messages.length, 4);
});

QUnit.test("testInitOneChildRepeat3to3WithDataOCalculateRepeatId", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat3to3",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"5"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "5")
			+ '}}');

	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"2"}}');
	assert.deepEqual(JSON.stringify(messages[3]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":'
					+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "2")
					+ '}}');

	assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"6"}}');

	assert.equal(messages.length, 5);
});

QUnit.test("testInitOneChildRepeat1toX", function(assert) {
	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX",
			undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"0"}}');

	assert.equal(messages.length, 1);
});

QUnit.test("testInitOneChildRepeat1toXWithDataForOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		} ]
	};

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitOneChildRepeat1toXWithDataForTwo", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor("groupIdOneTextChildRepeat1toX",
			data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"one"}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":'
			+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "one") + '}}');

	assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{},"repeatId":"two"}}');
	assert.deepEqual(JSON.stringify(messages[3]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":'
					+ createLinkedPathWithNameInDataAndRepeatIdAsString("textVariableId", "two")
					+ '}}');

	assert.equal(messages.length, 4);
});

QUnit.test("testInitOneChildOneAttribute", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(
			"groupIdOneTextChildOneAttribute", undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	assert.equal(messages.length, 1);
});

QUnit.test("testInitOneChildOneAttributeWithDataForOne", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor(
			"groupIdOneTextChildOneAttribute", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":{}}}');

	var path = createLinkedPathWithNameInData("textVariableId");

	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"setValue","message":{"data":"A Value",'
			+ '"path":' + JSON.stringify(path) + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroup", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(
			"groupInGroupOneTextChildOneAttribute", undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path.children.push(attributes);
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor(
			"groupInGroupOneTextChildOneAttribute", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path.children.push(attributes);
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path2.children.push(attributes);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	assert.deepEqual(JSON.stringify(messages[2]),
			'{"type":"setValue","message":{"data":"A Value2",' + '"path":' + JSON.stringify(path2)
					+ '}}');

	assert.equal(messages.length, 3);
});

QUnit.test("testInitTextVarRepeat1to1InGroupOneAttributeInGroupWithWrongData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor(
			"groupInGroupOneTextChildOneAttribute", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildOneAttribute","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue"));
	path.children.push(attributes);
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitTextVarRepeat1to1InGroupTwoAttributeInGroup", function(assert) {
	var metadataController = this.metadataControllerFactory.factor(
			"groupInGroupOneTextChildTwoAttributes", undefined);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildTwoAttributes","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	assert.equal(messages.length, 2);
});

QUnit.test("testInitTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
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

	var metadataController = this.metadataControllerFactory.factor(
			"groupInGroupOneTextChildTwoAttributes", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"groupIdOneTextChildTwoAttributes","path":{}}}');

	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path.children.push(attributes);
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
			+ '"metadataId":"textVariableId","path":' + JSON.stringify(path) + '}}');

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	path2.children.push(attributes);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	assert.deepEqual(JSON.stringify(messages[2]),
			'{"type":"setValue","message":{"data":"A Value3",' + '"path":' + JSON.stringify(path2)
					+ '}}');

	assert.equal(messages.length, 3);
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
		function(assert) {
			var metadataController = this.metadataControllerFactory.factor(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					undefined);
			var messages = this.pubSub.getMessages();
			assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
					+ ',"path":{},"repeatId":"0"}}');

			assert.equal(messages.length, 1);
		});

QUnit
		.test(
				"testInitTextVarRepeat1to3InGroupOneAttribute"
						+ "Repeat0to2InGroupRepeat1to3InGroupWithData",
				function(assert) {
					var data = {
						"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
							"repeatId" : "one0",
							"children" : [ {
								"name" : "textVarRepeat1to3InGroupOneAttribute",
								"repeatId" : "one1",
								"children" : [ {
									"name" : "textVar",
									"value" : "A Value3",
									"repeatId" : "one2"
								} ],
								"attributes" : {
									"anAttribute" : "aFinalValue"
								}
							} ]
						} ]
					};

					var metadataController = this.metadataControllerFactory
							.factor(
									"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
									data);
					var messages = this.pubSub.getMessages();
					assert
							.deepEqual(
									JSON.stringify(messages[0]),
									'{"type":"add","message":{'
											+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
											+ ',"path":{},"repeatId":"one0"}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
							+ JSON.stringify(path) + ',"repeatId":"one1"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path2.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path22.children.push(attributes);
					assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
							+ ',"repeatId":"one2"}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path3.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path3.children.push(path32);
					path32.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path32.children.push(attributes);

					var path33 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path33);
					path33.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});

					assert.deepEqual(JSON.stringify(messages[3]),
							'{"type":"setValue","message":{"data":"A Value3",' + '"path":'
									+ JSON.stringify(path3) + '}}');

					assert.equal(messages.length, 4);
				});

QUnit
		.test(
				"testInitTextVarRepeat1to3InGroupOneAttribute"
						+ "Repeat0to2InGroupRepeat1to3InGroupWithData",
				function(assert) {
					var data = {
						"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
							"repeatId" : "one0",
							"children" : [ {
								"name" : "textVarRepeat1to3InGroupOneAttribute",
								"repeatId" : "one1",
								"children" : [ {
									"name" : "textVar",
									"value" : "A Value3",
									"repeatId" : "one2"
								} ],
								"attributes" : {
									"anAttribute" : "aFinalValue"
								}
							} ]
						} ]
					};

					var metadataController = this.metadataControllerFactory
							.factor(
									"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
									data);
					var messages = this.pubSub.getMessages();
					assert
							.deepEqual(
									JSON.stringify(messages[0]),
									'{"type":"add","message":{'
											+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
											+ ',"path":{},"repeatId":"one0"}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
							+ JSON.stringify(path) + ',"repeatId":"one1"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path2.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path22.children.push(attributes);
					assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
							+ ',"repeatId":"one2"}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path3.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path3.children.push(path32);
					path32.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path32.children.push(attributes);

					var path33 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path33);
					path33.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});

					assert.deepEqual(JSON.stringify(messages[3]),
							'{"type":"setValue","message":{"data":"A Value3",' + '"path":'
									+ JSON.stringify(path3) + '}}');
					assert.equal(messages.length, 4);
				});

QUnit
		.test(
				"testInitTextVarRepeat1to3InGroupOneAttribute"
						+ "Repeat0to2InGroupRepeat1to3InGroupWithData2",
				function(assert) {
					var data = {
						"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
							"repeatId" : "one0",
							"children" : [ {
								"name" : "textVarRepeat1to3InGroupOneAttribute",
								"repeatId" : "one1",
								"children" : [ {
									"name" : "textVar",
									"value" : "A Value3",
									"repeatId" : "one2"
								} ],
								"attributes" : {
									"anAttribute" : "aFinalValue"
								}
							} ]
						}, {
							"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
							"repeatId" : "one0_2",
							"children" : [ {
								"name" : "textVarRepeat1to3InGroupOneAttribute",
								"repeatId" : "one1",
								"children" : [ {
									"name" : "textVar",
									"value" : "A Value3",
									"repeatId" : "one2"
								} ],
								"attributes" : {
									"anAttribute" : "aFinalValue"
								}
							} ]
						} ]
					};

					var metadataController = this.metadataControllerFactory
							.factor(
									"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
									data);
					var messages = this.pubSub.getMessages();
					assert
							.deepEqual(
									JSON.stringify(messages[0]),
									'{"type":"add","message":{'
											+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
											+ ',"path":{},"repeatId":"one0"}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
							+ JSON.stringify(path) + ',"repeatId":"one1"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path2.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path22.children.push(attributes);
					assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
							+ ',"repeatId":"one2"}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path3.children.push({
						"name" : "repeatId",
						"value" : "one0"
					});
					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path3.children.push(path32);
					path32.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path32.children.push(attributes);

					var path33 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path33);
					path33.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});

					assert.deepEqual(JSON.stringify(messages[3]),
							'{"type":"setValue","message":{"data":"A Value3",' + '"path":'
									+ JSON.stringify(path3) + '}}');

					assert
							.deepEqual(
									JSON.stringify(messages[4]),
									'{"type":"add","message":{'
											+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
											+ ',"path":{},"repeatId":"one0_2"}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path.children.push({
						"name" : "repeatId",
						"value" : "one0_2"
					});
					assert.deepEqual(JSON.stringify(messages[5]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute","path":'
							+ JSON.stringify(path) + ',"repeatId":"one1"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path2.children.push({
						"name" : "repeatId",
						"value" : "one0_2"
					});
					var path22 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path22.children.push(attributes);
					assert.deepEqual(JSON.stringify(messages[6]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path2)
							+ ',"repeatId":"one2"}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup");
					path3.children.push({
						"name" : "repeatId",
						"value" : "one0_2"
					});
					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path3.children.push(path32);
					path32.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path32.children.push(attributes);

					var path33 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path33);
					path33.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});

					assert.deepEqual(JSON.stringify(messages[7]),
							'{"type":"setValue","message":{"data":"A Value3",' + '"path":'
									+ JSON.stringify(path3) + '}}');

					assert.equal(messages.length, 8);
				});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData3", function(assert) {
	var data = {
		"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
		"children" : []
	};

	var metadataController = this.metadataControllerFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data);
	var messages = this.pubSub.getMessages();
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
			+ '"metadataId":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"'
			+ ',"path":{},"repeatId":"0"}}');

	assert.equal(messages.length, 1);
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		function(assert) {
			var metadataController = this.metadataControllerFactory.factor(
					"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
					undefined);
			var messages = this.pubSub.getMessages();
			assert.equal(messages.length, 0);
		});

QUnit
		.test(
				"testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroupWithData",
				function(assert) {
					var data = {
						"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttribute",
							"repeatId" : "one1",
							"children" : [ {
								"name" : "textVar",
								"value" : "A Value3",
								"repeatId" : "one2"
							} ],
							"attributes" : {
								"anAttribute" : "aFinalValue"
							}
						}, {
							"name" : "textVarRepeat1to3InGroupOneAttribute",
							"repeatId" : "one1",
							"children" : [ {
								"name" : "textVar",
								"value" : "A Value33",
								"repeatId" : "one22"
							} ],
							"attributes" : {
								"anOtherAttribute" : "aOtherFinalValue"
							}
						} ]
					};
					var metadataController = this.metadataControllerFactory
							.factor(
									"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
									data);
					var messages = this.pubSub.getMessages();

					assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute"'
							+ ',"path":{},"repeatId":"one1"}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path.children.push(attributes);

					assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path)
							+ ',"repeatId":"one2"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path2.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes2 = createAttributes();
					attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path2.children.push(attributes2);

					var path22 = createLinkedPathWithNameInData("textVar");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});
					assert.deepEqual(JSON.stringify(messages[2]),
							'{"type":"setValue","message":{"data":"A Value3"' + ',"path":'
									+ JSON.stringify(path2) + '}}');

					assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"'
							+ ',"path":{},"repeatId":"one1"}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path3.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes3 = createAttributes();
					attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anOtherAttribute", "aOtherFinalValue", "1"));
					path3.children.push(attributes3);

					assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path3)
							+ ',"repeatId":"one22"}}');

					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					path32.children.push({
						"name" : "repeatId",
						"value" : "one1"
					});
					var attributes32 = createAttributes();
					attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anOtherAttribute", "aOtherFinalValue", "1"));
					path32.children.push(attributes32);

					var path322 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path322);
					path322.children.push({
						"name" : "repeatId",
						"value" : "one22"
					});
					assert.deepEqual(JSON.stringify(messages[5]),
							'{"type":"setValue","message":{"data":"A Value33"' + ',"path":'
									+ JSON.stringify(path32) + '}}');

					assert.equal(messages.length, 6);
				});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
		function(assert) {
			var metadataController = this.metadataControllerFactory.factor(
					"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
					undefined);
			var messages = this.pubSub.getMessages();

			assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute"' + ',"path":{}}}');

			var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			path.children.push(attributes);

			assert
					.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path)
							+ ',"repeatId":"0"}}');

			assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
					+ '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"' + ',"path":{}}}');

			var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
			var attributes3 = createAttributes();
			attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
					"anOtherAttribute", "aOtherFinalValue", "1"));
			path3.children.push(attributes3);
			assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
					+ '"metadataId":"textVar","path":' + JSON.stringify(path3)
					+ ',"repeatId":"0"}}');

			assert.equal(messages.length, 4);
		});

QUnit
		.test(
				"testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroupWithData",
				function(assert) {

					var data = {
						"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
						"children" : [ {
							"name" : "textVarRepeat1to3InGroupOneAttribute",
							"children" : [ {
								"name" : "textVar",
								"value" : "A Value3",
								"repeatId" : "one2"
							} ],
							"attributes" : {
								"anAttribute" : "aFinalValue"
							}
						}, {
							"name" : "textVarRepeat1to3InGroupOneAttribute",
							"children" : [ {
								"name" : "textVar",
								"value" : "A Value33",
								"repeatId" : "one22"
							} ],
							"attributes" : {
								"anOtherAttribute" : "aOtherFinalValue"
							}
						} ]
					};
					var metadataController = this.metadataControllerFactory
							.factor(
									"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
									data);
					var messages = this.pubSub.getMessages();

					assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOneAttribute"'
							+ ',"path":{}}}');

					var path = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					var attributes = createAttributes();
					attributes.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path.children.push(attributes);

					assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path)
							+ ',"repeatId":"one2"}}');

					var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					var attributes2 = createAttributes();
					attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anAttribute", "aFinalValue", "1"));
					path2.children.push(attributes2);

					var path22 = createLinkedPathWithNameInData("textVar");
					path2.children.push(path22);
					path22.children.push({
						"name" : "repeatId",
						"value" : "one2"
					});
					assert.deepEqual(JSON.stringify(messages[2]),
							'{"type":"setValue","message":{"data":"A Value3"' + ',"path":'
									+ JSON.stringify(path2) + '}}');

					assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
							+ '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"'
							+ ',"path":{}}}');

					var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					var attributes3 = createAttributes();
					attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anOtherAttribute", "aOtherFinalValue", "1"));
					path3.children.push(attributes3);

					assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
							+ '"metadataId":"textVar","path":' + JSON.stringify(path3)
							+ ',"repeatId":"one22"}}');

					var path32 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
					var attributes32 = createAttributes();
					attributes32.children.push(createAttributeWithNameAndValueAndRepeatId(
							"anOtherAttribute", "aOtherFinalValue", "1"));
					path32.children.push(attributes32);

					var path322 = createLinkedPathWithNameInData("textVar");
					path32.children.push(path322);
					path322.children.push({
						"name" : "repeatId",
						"value" : "one22"
					});
					assert.deepEqual(JSON.stringify(messages[5]),
							'{"type":"setValue","message":{"data":"A Value33"' + ',"path":'
									+ JSON.stringify(path32) + '}}');

					assert.equal(messages.length, 6);
				});