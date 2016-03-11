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
	coraTest.metadataValidatorFactory = function(metadataProvider, pubSub) {
		var factor = function(metadataId, data) {

			var spec = {
				"metadataId" : metadataId,
				"data" : data,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var validationResult = CORA.metadataValidator(spec);
			return {
				validationResult : validationResult,
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

QUnit.module("metadataValidatorTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.metadataValidatorFactory = CORATEST.metadataValidatorFactory(this.metadataProvider,
				this.pubSub);
	},
	afterEach : function() {
	}
});

QUnit.test("testValidateGroupIdOneTextChild1to1WithData", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChild", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateGroupIdOneTextChild1to1WithDataEmptyValue", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChild", data);
	assert.notOk(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
			+ '"metadataId":"textVariableId",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId\"}]}}}');
});

// function createLinkedPathWithNameInDataAsString(nameInData) {
// return JSON.stringify(createLinkedPathWithNameInData(nameInData));
// }
//

// function createLinkedPathWithNameInDataAsString(nameInData) {
// return JSON.stringify(createLinkedPathWithNameInData(nameInData));
// }

QUnit.test("testValidateGroupIdTwoTextChildWithData", function(assert) {
	var data = {
		"name" : "groupIdTwoTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		}, {
			"name" : "textVariableId2",
			"value" : "AValue2"
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdTwoTextChild", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateGroupIdTwoTextChildWithEmptyValue", function(assert) {
	var data = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		}, {
			"name" : "textVariableId2",
			"value" : ""
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdTwoTextChild", data);
	assert.notOk(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
			+ '"metadataId":"textVariableId",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId\"}]}}}');
	assert.deepEqual(JSON.stringify(messages[1]), '{"type":"validationError","message":{'
			+ '"metadataId":"textVariableId2",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId2\"}]}}}');
});

QUnit.test("testValidateOneChildRepeat0to1WithData", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat0to1", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateOneChildRepeat0to1WithEmptyValue", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat0to1", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"remove","message":{'
			+ '"type":"remove",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId\"}]}}}');
});

QUnit.test("testValidateOneChildRepeat3to3WithData", function(assert) {
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

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat3to3", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

// function createLinkedPathWithNameInDataAndRepeatIdAsString(nameInData,
// repeatId) {
// return JSON.stringify(createLinkedPathWithNameInDataAndRepeatId(nameInData,
// repeatId));
// }
// function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
// return {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : nameInData
// }, {
// "name" : "repeatId",
// "value" : repeatId
// } ]
// };
// }
//
QUnit.test("testValidateOneChildRepeat3to3WithEmptyValueForOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "two"
		}, {
			"name" : "textVariableId",
			"value" : "A Value3",
			"repeatId" : "three"
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat3to3", data);
	assert.notOk(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"validationError","message":{'
			+ '"metadataId":"textVariableId",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId\"}'
			+ ',{\"name\":\"repeatId\",\"value\":\"two\"}]}}}');

});

QUnit.test("testValidateOneChildRepeat1toXWithDataForOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "one"
		} ]
	};

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat1toX", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateOneChildRepeat1toXWithDataForTwo", function(assert) {
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
	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat1toX", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateOneChildRepeat1toXWithTwoWithDataForOne", function(assert) {
	var data = {
		"name" : "groupIdOneTextChildRepeat0to1",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "two"
		} ]
	};
	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildRepeat1toX", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 1);
	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"remove","message":{'
			+ '"type":"remove",' + '"path":{\"name\":\"linkedPath\"'
			+ ',\"children\":[{\"name\":\"nameInData\",\"value\":\"textVariableId\"}'
			+ ',{\"name\":\"repeatId\",\"value\":\"one\"}]}}}');
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

	var factored = this.metadataValidatorFactory.factor("groupIdOneTextChildOneAttribute", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
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
	var factored = this.metadataValidatorFactory.factor("groupInGroupOneTextChildOneAttribute",
			data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupOneAttributeInGroupWithEmptyValue",
		function(assert) {
			var data = {
				"name" : "groupInGroupOneTextChildOneAttribute",
				"children" : [ {
					"name" : "groupIdOneTextChildOneAttribute",
					"children" : [ {
						"name" : "textVariableId",
						"value" : ""
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue"
					}
				} ]
			};
			var factored = this.metadataValidatorFactory.factor(
					"groupInGroupOneTextChildOneAttribute", data);
			assert.notOk(factored.validationResult);
			var messages = this.pubSub.getMessages();
			assert.strictEqual(messages.length, 1);
			var validationError = {
				"type" : "validationError",
				"message" : {
					"metadataId" : "textVariableId",
					"path" : {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "groupIdOneTextChildOneAttribute"
						}, {
							"name" : "attributes",
							"children" : [ {
								"name" : "attribute",
								"repeatId" : "1",
								"children" : [ {
									"name" : "attributeName",
									"value" : "anAttribute"
								}, {
									"name" : "attributeValue",
									"value" : "aFinalValue"
								} ]
							} ]
						}, {
							"name" : "linkedPath",
							"children" : [ {
								"name" : "nameInData",
								"value" : "textVariableId"
							} ]
						} ]
					}
				}
			};
			assert.stringifyEqual(messages[0], validationError);

		});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithData", function(assert) {
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
	var factored = this.metadataValidatorFactory.factor("groupInGroupOneTextChildTwoAttributes",
			data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateTextVarRepeat1to1InGroupTwoAttributeInGroupWithEmptyValue",
		function(assert) {
			var data = {
				"name" : "groupInGroupOneTextChildTwoAttributes",
				"children" : [ {
					"name" : "groupIdOneTextChildTwoAttributes",
					"children" : [ {
						"name" : "textVariableId",
						"value" : ""
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue",
						"anOtherAttribute" : "aOtherFinalValue"
					}
				} ]
			};
			var factored = this.metadataValidatorFactory.factor(
					"groupInGroupOneTextChildTwoAttributes", data);
			assert.notOk(factored.validationResult);
			var messages = this.pubSub.getMessages();
			assert.strictEqual(messages.length, 1);
			var validationError = {
				"type" : "validationError",
				"message" : {
					"metadataId" : "textVariableId",
					"path" : {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "groupIdOneTextChildTwoAttributes"
						}, {
							"name" : "attributes",
							"children" : [ {
								"name" : "attribute",
								"repeatId" : "1",
								"children" : [ {
									"name" : "attributeName",
									"value" : "anAttribute"
								}, {
									"name" : "attributeValue",
									"value" : "aFinalValue"
								} ]
							}, {
								"name" : "attribute",
								"repeatId" : "2",
								"children" : [ {
									"name" : "attributeName",
									"value" : "anOtherAttribute"
								}, {
									"name" : "attributeValue",
									"value" : "aOtherFinalValue"
								} ]
							} ]
						}, {
							"name" : "linkedPath",
							"children" : [ {
								"name" : "nameInData",
								"value" : "textVariableId"
							} ]
						} ]
					}
				}
			};
			assert.stringifyEqual(messages[0], validationError);
		});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData", function(assert) {
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
					"value" : "AValue3",
					"repeatId" : "one2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			} ]
		} ]
	};
	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testValidateTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
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
					"value" : "",
					"repeatId" : "one2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			} ]
		} ]
	};
	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 2);
	var validationError = {
		"type" : "validationError",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
				}, {
					"name" : "repeatId",
					"value" : "one0"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name" : "repeatId",
						"value" : "one1"
					}, {
						"name" : "attributes",
						"children" : [ {
							"name" : "attribute",
							"repeatId" : "1",
							"children" : [ {
								"name" : "attributeName",
								"value" : "anAttribute"
							}, {
								"name" : "attributeValue",
								"value" : "aFinalValue"
							} ]
						} ]
					}, {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "textVar"
						}, {
							"name" : "repeatId",
							"value" : "one2"
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
	var validationError2 = {
		"type" : "remove",
		"message" : {
			"type" : "remove",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
				}, {
					"name" : "repeatId",
					"value" : "one0"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name" : "repeatId",
						"value" : "one1"
					}, {
						"name" : "attributes",
						"children" : [ {
							"name" : "attribute",
							"repeatId" : "1",
							"children" : [ {
								"name" : "attributeName",
								"value" : "anAttribute"
							}, {
								"name" : "attributeValue",
								"value" : "aFinalValue"
							} ]
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[1], validationError2);
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithData2", function(assert) {
	var data = {
		"name" : "textVarRepeat1to3InGroupOne" + "AttributeRepeat0to2InGroupRepeat1to3InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
			"repeatId" : "one0",
			"children" : [ {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"repeatId" : "one1",
				"children" : [ {
					"name" : "textVar",
					"value" : "AValue3",
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
					"value" : "AValue3",
					"repeatId" : "one2"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			} ]
		} ]
	};

	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testInitTextVarRepeat1to3InGroupOneAttribute"
		+ "Repeat0to2InGroupRepeat1to3InGroupWithEmptyValue", function(assert) {
	var data = {
		"name" : "textVarRepeat1to3InGroupOne" + "AttributeRepeat0to2InGroupRepeat1to3InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
			"repeatId" : "one0",
			"children" : [ {
				"name" : "textVarRepeat1to3InGroupOneAttribute",
				"repeatId" : "one1",
				"children" : [ {
					"name" : "textVar",
					"value" : "",
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
					"value" : "",
					"repeatId" : "one2"
				}, {
					"name" : "textVar",
					"value" : "AValue3",
					"repeatId" : "one3"
				} ],
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			} ]
		} ]
	};

	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 3);
	var validationError = {
		"type" : "validationError",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
				}, {
					"name" : "repeatId",
					"value" : "one0"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name" : "repeatId",
						"value" : "one1"
					}, {
						"name" : "attributes",
						"children" : [ {
							"name" : "attribute",
							"repeatId" : "1",
							"children" : [ {
								"name" : "attributeName",
								"value" : "anAttribute"
							}, {
								"name" : "attributeValue",
								"value" : "aFinalValue"
							} ]
						} ]
					}, {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "textVar"
						}, {
							"name" : "repeatId",
							"value" : "one2"
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
	var validationError2 = {
		"type" : "remove",
		"message" : {
			"type" : "remove",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
				}, {
					"name" : "repeatId",
					"value" : "one0"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name" : "repeatId",
						"value" : "one1"
					}, {
						"name" : "attributes",
						"children" : [ {
							"name" : "attribute",
							"repeatId" : "1",
							"children" : [ {
								"name" : "attributeName",
								"value" : "anAttribute"
							}, {
								"name" : "attributeValue",
								"value" : "aFinalValue"
							} ]
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[1], validationError2);

	var validationError3 = {
		"type" : "remove",
		"message" : {
			"type" : "remove",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"
				}, {
					"name" : "repeatId",
					"value" : "one0_2"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVarRepeat1to3InGroupOneAttribute"
					}, {
						"name" : "repeatId",
						"value" : "one1"
					}, {
						"name" : "attributes",
						"children" : [ {
							"name" : "attribute",
							"repeatId" : "1",
							"children" : [ {
								"name" : "attributeName",
								"value" : "anAttribute"
							}, {
								"name" : "attributeValue",
								"value" : "aFinalValue"
							} ]
						} ]
					}, {
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "textVar"
						}, {
							"name" : "repeatId",
							"value" : "one2"
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[2], validationError3);
});

QUnit.test("testInitTextVarRepeat1to3InGroup"
		+ "OneAttributeAndOtherAttributeRepeat0to2InGroupWithData", function(assert) {
	var data = {
		"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"repeatId" : "one1",
			"children" : [ {
				"name" : "textVar",
				"value" : "AValue3",
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
				"value" : "AValue33",
				"repeatId" : "one22"
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			}
		} ]
	};
	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 0);
});

QUnit.test("testInitTextVarRepeat1to3InGroup"
		+ "OneAttributeAndOtherAttributeRepeat0to2InGroupEmptyValue", function(assert) {
	var data = {
		"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"repeatId" : "one1",
			"children" : [ {
				"name" : "textVar",
				"value" : "",
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
				"value" : "",
				"repeatId" : "one22"
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			}
		} ]
	};
	var factored = this.metadataValidatorFactory.factor(
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup", data);
	assert.ok(factored.validationResult);
	var messages = this.pubSub.getMessages();
	assert.strictEqual(messages.length, 4);
	var validationError = {
		"type" : "validationError",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "one1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVar"
					}, {
						"name" : "repeatId",
						"value" : "one2"
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[0], validationError);
	var validationError2 = {
		"type" : "remove",
		"message" : {
			"type" : "remove",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "one1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[1], validationError2);

	var validationError3 = {
		"type" : "validationError",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "one1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anOtherAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aOtherFinalValue"
						} ]
					} ]
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVar"
					}, {
						"name" : "repeatId",
						"value" : "one22"
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[2], validationError3);

	var validationError4 = {
		"type" : "remove",
		"message" : {
			"type" : "remove",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "one1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anOtherAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aOtherFinalValue"
						} ]
					} ]
				} ]
			}
		}
	};
	assert.stringifyEqual(messages[3], validationError4);
});

// QUnit.test("testInitTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// function(assert) {
// this.metadataValidatorFactory.factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// undefined);
// var messages = this.pubSub.getMessages();
//
// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute"' +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue", "1"));
// path.children.push(attributes);
//
// assert
// .deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path)
// + ',"repeatId":"0","nameInData":"textVar"}}');
//
// assert.deepEqual(JSON.stringify(messages[2]), '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"' +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes3 = createAttributes();
// attributes3.children.push(createAttributeWithNameAndValueAndRepeatId(
// "anOtherAttribute", "aOtherFinalValue", "1"));
// path3.children.push(attributes3);
// assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path3)
// + ',"repeatId":"0","nameInData":"textVar"}}');
//
// assert.equal(messages.length, 4);
// });
//
// QUnit.test("testInitTextVarRepeat1to3InGroup"
// + "OneAttributeAndOtherAttributeRepeat1to1InGroupWithData", function(assert)
// {
//
// var data = {
// "name" :
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
// "children" : [ {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value3",
// "repeatId" : "one2"
// } ],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [ {
// "name" : "textVar",
// "value" : "A Value33",
// "repeatId" : "one22"
// } ],
// "attributes" : {
// "anOtherAttribute" : "aOtherFinalValue"
// }
// } ]
// };
// this.metadataValidatorFactory.factor(
// "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup",
// data);
// var messages = this.pubSub.getMessages();
//
// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOneAttribute"' +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anAttribute":["aFinalValue"]}}}');
//
// var path =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue", "1"));
// path.children.push(attributes);
//
// assert.deepEqual(JSON.stringify(messages[1]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path) +
// ',"repeatId":"one2","nameInData":"textVar"}}');
//
// var path2 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes2 = createAttributes();
// attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue", "1"));
// path2.children.push(attributes2);
//
// var path22 = createLinkedPathWithNameInData("textVar");
// path2.children.push(path22);
// path22.children.push({
// "name" : "repeatId",
// "value" : "one2"
// });
// assert.deepEqual(JSON.stringify(messages[2]),
// '{"type":"setValue","message":{"data":"A Value3"'
// + ',"path":' + JSON.stringify(path2) + '}}');
//
// assert.deepEqual(JSON.stringify(messages[3]), '{"type":"add","message":{'
// + '"metadataId":"textVarRepeat1to3InGroupOtherAttribute"' +
// ',"path":{},"nameInData":"textVarRepeat1to3InGroupOneAttribute","attributes":{"anOtherAttribute":["aOtherFinalValue"]}}}');
//
// var path3 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes3 = createAttributes();
// attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
// "aOtherFinalValue", "1"));
// path3.children.push(attributes3);
//
// assert.deepEqual(JSON.stringify(messages[4]), '{"type":"add","message":{'
// + '"metadataId":"textVar","path":' + JSON.stringify(path3) +
// ',"repeatId":"one22","nameInData":"textVar"}}');
//
// var path32 =
// createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
// var attributes32 = createAttributes();
// attributes32.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
// "aOtherFinalValue", "1"));
// path32.children.push(attributes32);
//
// var path322 = createLinkedPathWithNameInData("textVar");
// path32.children.push(path322);
// path322.children.push({
// "name" : "repeatId",
// "value" : "one22"
// });
// assert.deepEqual(JSON.stringify(messages[5]),
// '{"type":"setValue","message":{"data":"A Value33"' + ',"path":'
// + JSON.stringify(path32) + '}}');
//
// assert.equal(messages.length, 6);
// });
