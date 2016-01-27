/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2015, 2016 Uppsala University Library
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

QUnit.assert.stringifyEqual = function(actual, expected, message) {
	QUnit.assert.deepEqual(JSON.stringify(actual), JSON.stringify(expected), message);
}

QUnit.module("CORA.DataHolder", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.newDataHolder = function(metadataId) {
			var spec = {
					"metadataId":metadataId,
					"metadataProvider":this.metadataProvider,
					"pubSub":this.pubSub
			};
			return  CORA.dataHolder(spec);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var dataHolder = this.newDataHolder("recordTypeOnlyMetadataIdChild");
	assert.deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
	assert.ok(dataHolder.getPubSub());
	
	//subscription
	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubscription = subscriptions[0];
	assert.strictEqual(firstSubscription.type, "*");
	assert.deepEqual(firstSubscription.path, {});
//	assert.ok(firstSubsription.functionToCall === dataHolder.handleMsg);
});

// QUnit.test("testCreateBroken", function() {
// throws(function() {
// new CORA.DataHolder("brokenMetadataNoNameInData", this.metadataProvider,
// this.pubSub);
// }, "TypeError");
// });

QUnit.test("testCreateOneChild", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : []
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testCreateGroupIdOneTextChildOneAttribute", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChildOneAttribute");
	var expected = {
		"name" : "groupIdOneTextChildOneAttribute",
		"children" : [],
		"attributes" : {
			"anAttribute" : "aFinalValue"
		}
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testCreateGroupIdOneTextChildTwoAttributes", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChildTwoAttributes");
	var expected = {
		"name" : "groupIdOneTextChildTwoAttributes",
		"children" : [],
		"attributes" : {
			"anAttribute" : "aFinalValue",
			"anOtherAttribute" : "aOtherFinalValue"
		}
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToGroupIdOneTextChild", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "textVariableId");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToGroupIdOneTextChildWrongNameInData", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	throws(function() {
		dataHolder.addChild(path, "textVariableIdNOT");
	}, "Error");
});

QUnit.test("testSetValueGroupIdOneTextChild", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild({}, "textVariableId");
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "A Value"
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueGroupIdOneTextChildWrongNameInData", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	dataHolder.addChild({}, "textVariableId");
	throws(function() {
		dataHolder.setValue(createLinkedPathWithNameInData("textVariableIdNOT"), 'A Value');
	}, "Error");
});

QUnit.test("testAddTwoChildrenWithSameNameInDataDifferentRepeatId", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "textVariableId", "two");

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "two"
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueTwoChildrenWithSameNameInDataDifferentRepeatId", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "textVariableId", "one");
	dataHolder.addChild(path, "textVariableId", "two");

	var path2 = createLinkedPathWithNameInDataAndRepeatId("textVariableId", "two");
	dataHolder.setValue(path2, 'Value 2');

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "one"
		}, {
			"name" : "textVariableId",
			"value" : "Value 2",
			"repeatId" : "two"
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenToTopLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "textVariableId");
	dataHolder.addChild(path, "textVariableId2");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		}, {
			"name" : "textVariableId2",
			"value" : ""
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddTwoDifferentChildrenSetValueOnSecondToTopLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "textVariableId");
	dataHolder.addChild(path, "textVariableId2");
	var path = createLinkedPathWithNameInData("textVariableId2");
	dataHolder.setValue(path, 'Value 2');
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "textVariableId",
			"value" : ""
		}, {
			"name" : "textVariableId2",
			"value" : "Value 2"
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildGroup", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChild",
			"children" : []
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildToSecondLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ]
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueToSecondLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	var path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path3, 'Value 2');
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChild",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "Value 2"
			} ]
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddFourDifferentChildrenSomeWithAttributeToTopLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute");
	dataHolder.addChild(path, "textVariableId");

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChildTwoAttributes",
			"children" : [],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anOtherAttribute" : "aOtherFinalValue"
			}
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			}
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		}, {
			"name" : "textVariableId",
			"value" : ""
		} ]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testAddChildMissingAttributes", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	throws(function() {
		dataHolder.addChild(path2, "textVariableId");
	}, "Error");
});

function addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder) {
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute");
	dataHolder.addChild(path, "textVariableId");

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path2 = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	var attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	var attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	var path4 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");
}

QUnit.test("testAddFourDifferentChildrenSomeWithAttributeAndChildrenToThem", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder);

	var expected = {
		"name" : "groupIdOneTextChild",
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
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			}
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		}, {
			"name" : "textVariableId",
			"value" : ""
		} ]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

QUnit.test("testSetValueFourDifferentChildrenSomeWithAttributeAndChildrenToThem", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	addFourDifferentChildrenSomeWithAttributeAndChildrenToThem(dataHolder);

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path, "value 1");

	var attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "1"));
	var path2 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path2.children.push(attributes2);
	path2.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path2, "value 2");

	var attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	var path3 = createLinkedPathWithNameInData("textVarRepeat1to3InGroupOneAttribute");
	path3.children.push(attributes3);
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path3, "value 3");

	var path4 = createLinkedPathWithNameInData("textVariableId");
	dataHolder.setValue(path4, "value 4");

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChildTwoAttributes",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "value 1"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anOtherAttribute" : "aOtherFinalValue"
			}
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "value 2"
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			}
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : "value 3"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
		}, {
			"name" : "textVariableId",
			"value" : "value 4"
		} ]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});

function addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder) {
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "1");
	dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes", "one");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "2");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute", "two");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "three");
	dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute", "3");
	dataHolder.addChild(path, "textVariableId", "four");
	dataHolder.addChild(path, "textVariableId", "4");

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path2 = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildTwoAttributes", "1");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path2 = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildTwoAttributes", "one");
	path2.children.push(attributes);
	dataHolder.addChild(path2, "textVariableId");

	var attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path3 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
			"2");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	var attributes2 = createAttributes();
	attributes2.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
			"aOtherFinalValue", "2"));
	var path3 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
			"two");
	path3.children.push(attributes2);
	dataHolder.addChild(path3, "textVariableId");

	var attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	var path4 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
			"three");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");

	var attributes3 = createAttributes();
	attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
			"aFinalValue", "1"));
	var path4 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
			"3");
	path4.children.push(attributes3);
	dataHolder.addChild(path4, "textVariableId");
}

QUnit.test("testAddEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem", function(
		assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);

	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChildTwoAttributes",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "1"
		}, {
			"name" : "groupIdOneTextChildTwoAttributes",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue",
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "one"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "2"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "two"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "three"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVariableId",
				"value" : ""
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "3"
		}, {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "four"
		}, {
			"name" : "textVariableId",
			"value" : "",
			"repeatId" : "4"
		} ]
	};

	assert.stringifyEqual(dataHolder.getData(), expected);
});
QUnit.test("setValueEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem",
		function(assert) {
			var dataHolder = this.newDataHolder("groupIdOneTextChild");
			addEightDifferentChildrenWithRepeatIdSomeWithAttributeAndChildrenToThem(dataHolder);

			var attributes = createAttributes();
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
					"aOtherFinalValue", "2"));
			var path = createLinkedPathWithNameInDataAndRepeatId(
					"groupIdOneTextChildTwoAttributes", "1");
			path.children.push(attributes);
			path.children.push(createLinkedPathWithNameInData("textVariableId"));
			dataHolder.setValue(path, "value 1");

			var attributes2 = createAttributes();
			attributes2.children.push(createAttributeWithNameAndValueAndRepeatId(
					"anOtherAttribute", "aOtherFinalValue", "1"));
			var path2 = createLinkedPathWithNameInDataAndRepeatId(
					"textVarRepeat1to3InGroupOneAttribute", "2");
			path2.children.push(attributes2);
			path2.children.push(createLinkedPathWithNameInData("textVariableId"));
			dataHolder.setValue(path2, "value 2");

			var attributes3 = createAttributes();
			attributes3.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
					"aFinalValue", "1"));
			var path3 = createLinkedPathWithNameInDataAndRepeatId(
					"textVarRepeat1to3InGroupOneAttribute", "three");
			path3.children.push(attributes3);
			path3.children.push(createLinkedPathWithNameInData("textVariableId"));
			dataHolder.setValue(path3, "value three");

			var path4 = createLinkedPathWithNameInDataAndRepeatId("textVariableId", "four");
			dataHolder.setValue(path4, "value four");

			var expected = {
				"name" : "groupIdOneTextChild",
				"children" : [ {
					"name" : "groupIdOneTextChildTwoAttributes",
					"children" : [ {
						"name" : "textVariableId",
						"value" : "value 1"
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue",
						"anOtherAttribute" : "aOtherFinalValue"
					},
					"repeatId" : "1"
				}, {
					"name" : "groupIdOneTextChildTwoAttributes",
					"children" : [ {
						"name" : "textVariableId",
						"value" : ""
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue",
						"anOtherAttribute" : "aOtherFinalValue"
					},
					"repeatId" : "one"
				}, {
					"name" : "textVarRepeat1to3InGroupOneAttribute",
					"children" : [ {
						"name" : "textVariableId",
						"value" : "value 2"
					} ],
					"attributes" : {
						"anOtherAttribute" : "aOtherFinalValue"
					},
					"repeatId" : "2"
				}, {
					"name" : "textVarRepeat1to3InGroupOneAttribute",
					"children" : [ {
						"name" : "textVariableId",
						"value" : ""
					} ],
					"attributes" : {
						"anOtherAttribute" : "aOtherFinalValue"
					},
					"repeatId" : "two"
				}, {
					"name" : "textVarRepeat1to3InGroupOneAttribute",
					"children" : [ {
						"name" : "textVariableId",
						"value" : "value three"
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue"
					},
					"repeatId" : "three"
				}, {
					"name" : "textVarRepeat1to3InGroupOneAttribute",
					"children" : [ {
						"name" : "textVariableId",
						"value" : ""
					} ],
					"attributes" : {
						"anAttribute" : "aFinalValue"
					},
					"repeatId" : "3"
				}, {
					"name" : "textVariableId",
					"value" : "value four",
					"repeatId" : "four"
				}, {
					"name" : "textVariableId",
					"value" : "",
					"repeatId" : "4"
				} ]
			};

			assert.stringifyEqual(dataHolder.getData(), expected);
		});

// QUnit.test("testSetValueFourDifferentChildrenSomeWithAttributeToTopLevel",
// function(assert) {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChild",
// this.metadataProvider,
// this.pubSub);
// var path = {};
// dataHolder.addChild(path, "groupIdOneTextChildTwoAttributes");
// dataHolder.addChild(path, "textVarRepeat1to3InGroupOtherAttribute");
// dataHolder.addChild(path, "textVarRepeat1to3InGroupOneAttribute");
// dataHolder.addChild(path, "textVariableId");
//	
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
// "aOtherFinalValue"));
// var path2 =
// createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// path2.children.push(attributes);
// path2.children.push(createLinkedPathWithNameInData("textVariableId"));
// dataHolder.setValue(path2, 'Value 2');
//	
//	
// var expected = {
// "name" : "groupIdOneTextChild",
// "children" : [ {
// "name" : "groupIdOneTextChildTwoAttributes",
// "children" : [],
// "attributes" : {
// "anAttribute" : "aFinalValue",
// "anOtherAttribute" : "aOtherFinalValue"
// }
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [],
// "attributes" : {
// "anOtherAttribute" : "aOtherFinalValue"
// }
// }, {
// "name" : "textVarRepeat1to3InGroupOneAttribute",
// "children" : [],
// "attributes" : {
// "anAttribute" : "aFinalValue"
// }
// }, {
// "name" : "textVariableId",
// "value" : ""
// } ]
// };
//	
// assert.deepEqual(JSON.stringify(dataHolder.getData()),
// JSON.stringify(expected));
// });

// textVarRepeat1to3InGroupOtherAttribute
// textVarRepeat1to3InGroupOneAttribute
//
// QUnit.test("testCreateTwoChild", function() {
// var dataHolder = new CORA.DataHolder("groupIdTwoTextChild",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdTwoTextChild",'
// + '"children":[{"name":"textVariableId","value":""},'+
// '{"name":"textVariableId2","value":""}]}');
// });
//
// QUnit.test("testCreateOneChildRepeat0to1", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat0to1",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat0to1",'
// + '"children":['+']}');
// });
//
// QUnit.test("testCreateOneChildRepeat3to3", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat3to3",'
// + '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
// '{"name":"textVariableId","value":"","repeatId":"1"},'+
// '{"name":"textVariableId","value":"","repeatId":"2"}'+']}');
// });
// QUnit.test("testCreateOneChildRepeat1toX", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat1toX",'
// + '"children":[{"name":"textVariableId","value":"","repeatId":"0"}'
// +']}');
// });
//
// QUnit.test("testCreateOneChildGroupRepeat3to3", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneChildGroupRepeat3to3",'
// + '"children":['+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"1"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"}'+
// ']}');
// });
// QUnit.test("testCreateOneChildOneAttribute", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}');
// });
//
// QUnit.test("testCreateOneChildTwoAttributes", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildTwoAttributes",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildTwoAttributes",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"'
// + ',"anOtherAttribute":"aOtherFinalValue"'
// +'}' + '}');
// });
//
// QUnit.test("testCreateGroupInGroupOneChild", function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChild",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChild",'
// + '"children":[{"name":"groupIdOneTextChild",'
// + '"children":[{"name":"textVariableId","value":""}]}]}');
// });
//
// QUnit.test("testCreateGroupInGroupOneTextChildOneAttribute", function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });
//
// QUnit.test("testCreateGroupInGroupOneTextChildTwoAttributes", function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildTwoAttributes",'
// + '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"'
// + ',"anOtherAttribute":"aOtherFinalValue"'
// +'}' + '}]}');
// });
//
// QUnit.test("testCreateGroupInGroupOneTextChildRepeat1to3OneAttribute",
// function() {
// var dataHolder = new
// CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"' + '}]}');
// });
//
// QUnit.test("testCreateTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// function() {
// var dataHolder = new
// CORA.DataHolder("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
// +
// '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
// + '"children":[]'
// + ',"repeatId":"0"' + '}]}');
// });
//
// QUnit.test("testCreateOneChildOOOLLLLDDDD", function() {
// var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdChild",
// this.metadataProvider,
// this.pubSub);
// deepEqual(JSON
// .stringify(dataHolder.getData()),
// '{"name":"recordTypeOnlyMetadataIdChild","children":['+
// '{"name":"metadataId","value":""}]}');
// });
// QUnit.test("testCreateTwoChildren", function() {
// var dataHolder = new
// CORA.DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
// this.metadataProvider, this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"recordTypeOnlyMetadataIdPresentationViewIdChild","children":['
// + '{"name":"metadataId","value":""},'
// + '{"name":"presentationViewId","value":""}]}');
// });
// QUnit.test("testCreateMoreChildren", function() {
// var dataHolder = new CORA.DataHolder("recordType", this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"recordType","children":['
// + '{"name":"metadataId","value":""},'
// + '{"name":"recordInfo","children":[{"name":"id","value":""}]},'
// + '{"name":"presentationViewId","value":""},'
// + '{"name":"presentationFormId","value":""},'
// + '{"name":"newMetadataId","value":""},'
// + '{"name":"newPresentationFormId","value":""},'
// + '{"name":"listPresentationViewId","value":""},'
// + '{"name":"searchMetadataId","value":""},'
// + '{"name":"searchPresentationFormId","value":""},'
// + '{"name":"userSuppliedId","value":""},'
// + '{"name":"permissionKey","value":""},'
// + '{"name":"selfPresentationViewId","value":""}]}');
// });
// QUnit.test("testCreateWithAttribute", function() {
// var dataHolder = new CORA.DataHolder("metadata", this.metadataProvider,
// this.pubSub);
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"metadata","children":['
// + '{"name":"recordInfo","children":[{"name":"id","value":""}]},'
// + '{"name":"nameInData","value":""},'
// + '{"name":"textId","value":""},'
// + '{"name":"defTextId","value":""},'
// +
// '{"name":"attributeReferences","children":[{"name":"ref","value":"","repeatId":"0"}]},'
// + '{"name":"childReferences","children":[{"name":"childReference",'
// +'"children":[{"name":"ref","value":""},'
// +'{"name":"repeatMin","value":""},'
// +'{"name":"repeatMinKey","value":""},'
// +'{"name":"repeatMax","value":""},'
// +'{"name":"secret","value":""},'
// +'{"name":"secretKey","value":""},'
// +'{"name":"readOnly","value":""},'
// +'{"name":"readOnlyKey","value":""}'
// +'],"repeatId":"0"}]}],'
// +'"attributes":{"recordTypeTypeCollectionVar":"aFinalValue"}}');
// });
//

function createLinkedPathWithNameInData(nameInData) {
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		} ]
	};
}
//
// QUnit.test("testSetValueTwoChildren", function() {
// var dataHolder = new CORA.DataHolder("groupIdTwoTextChild",
// this.metadataProvider, this.pubSub);
// dataHolder.setValue(createLinkedPathWithNameInData("textVariableId2"), 'A
// Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdTwoTextChild",'
// + '"children":[{"name":"textVariableId","value":""},'
// + '{"name":"textVariableId2","value":"A Value"}]}');
// });
//
// QUnit.test("testSetValueOneChildRepeat3to3", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId("textVariableId","2");
// dataHolder.setValue(path, 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat3to3",'
// + '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
// '{"name":"textVariableId","value":"","repeatId":"1"},'+
// '{"name":"textVariableId","value":"A Value","repeatId":"2"}'+']}');
// });
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
// QUnit.test("testSetValueOneChildRepeat1toX", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId("textVariableId","0");
// dataHolder.setValue(path
// , 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat1toX",'
// + '"children":[{"name":"textVariableId","value":"A Value","repeatId":"0"}'
// +']}');
// });
// QUnit.test("testSetValueOneGroupChildRepeat3to3", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChild",
// "1");
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// dataHolder.setValue(path
// , 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneChildGroupRepeat3to3",'
// + '"children":['+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":"A
// Value"}],"repeatId":"1"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"}'+
// ']}');
// });
//
// QUnit.test("testSetValueOneChildOneAttribute", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A
// Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":"A Value"}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}');
// });
//
// QUnit.test("testSetValueOneChildTwoAttributes", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildTwoAttributes",
// this.metadataProvider,
// this.pubSub);
// dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A
// Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildTwoAttributes",'
// + '"children":[{"name":"textVariableId","value":"A Value"}]'
// + ',"attributes":{"anAttribute":"aFinalValue"'
// + ',"anOtherAttribute":"aOtherFinalValue"'
// +'}' + '}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildOneAttribute", function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// dataHolder.setValue(path, 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":"A Value"}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });

function createAttributes() {
	return {
		"name" : "attributes",
		"children" : []
	};
}

function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
	return {
		"name" : "attribute",
		"repeatId" : repeatId || "1",
		"children" : [ {
			"name" : "attributeName",
			"value" : attributeName
		}, {
			"name" : "attributeValue",
			"value" : attributeValue
		} ]
	};
}

// QUnit.test("testSetValueGroupInGroupOneChildTwoAttributes", function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes",
// this.metadataProvider,
// this.pubSub);
// var path =
// createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// attributes.children
// .push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
// "aOtherFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
//
// dataHolder.setValue(path, 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildTwoAttributes",'
// + '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
// + '"children":[{"name":"textVariableId","value":"A Value"}]'
// + ',"attributes":{"anAttribute":"aFinalValue"'
// + ',"anOtherAttribute":"aOtherFinalValue"' + '}' + '}]}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildRepeat1to3OneAttribute",
// function() {
// var dataHolder = new
// CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path =
// createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildOneAttribute","0");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// dataHolder.setValue(path, 'A Value');
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":"A Value"}]'
// + ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"' + '}]}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildAttributeInPathNoAttributeInDataShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChild",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChild");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
// dataHolder.setValue(path
// , 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChild",'
// + '"children":[{"name":"groupIdOneTextChild",'
// + '"children":[{"name":"textVariableId","value":""}]}]}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildOneAttributeNoAttributeInPathShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChild");
// var attributes = createAttributes();
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
//		
// dataHolder.setValue(path
// , 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildOneAttributeWrongAttributeNameInPathShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttributeWRONGName",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
//		
// dataHolder.setValue(path
// , 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });
// QUnit.test("testSetValueGroupInGroupOneChildOneAttributeWrongAttributeValueInPathShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalWRONGValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
// dataHolder.setValue(path
// , 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });
//
// QUnit.test("testSetValueGroupInGroupOneChildOneAttributeOneAttributeToManyInPathShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute",
// this.metadataProvider,
// this.pubSub);
// var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anOtherAttribute",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
//		
// dataHolder.setValue(path
// , 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildOneAttribute",'
// + '"children":[{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
// });
//
//
// QUnit.test("testSetValueGroupInGroupOneChildTwoAttributesPathHasOnlyOneAttributeShouldNotSetValue",
// function() {
// var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes",
// this.metadataProvider,
// this.pubSub);
// var path =
// createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// path.children.push(attributes);
// path.children.push(createLinkedPathWithNameInData("textVariableId"));
// throws(function() {
//		
// dataHolder.setValue(path, 'A Value');
// }, "Error");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildTwoAttributes",'
// + '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"'
// + ',"anOtherAttribute":"aOtherFinalValue"'
// +'}' + '}]}');
// });
//

//
// QUnit.test("testAddRepeatOneChildRepeat3to3", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
// this.metadataProvider, this.pubSub);
// var path = {};
// dataHolder.addRepeat(path, "textVariableId", "repeatId");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat3to3",'
// + '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
// '{"name":"textVariableId","value":"","repeatId":"1"},'+
// '{"name":"textVariableId","value":"","repeatId":"2"},'+
// '{"name":"textVariableId","value":"","repeatId":"repeatId"}'+']}');
// });
//
// QUnit.test("testAddRepeatOneChildRepeat1toX", function() {
// var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
// this.metadataProvider, this.pubSub);
// var path = {};
// dataHolder.addRepeat(path, "textVariableId", "repeatId");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneTextChildRepeat1toX",'
// + '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
// '{"name":"textVariableId","value":"","repeatId":"repeatId"}'+']}');
// });
//
// QUnit.test("testAddRepeatGroupIdOneChildGroupRepeat3to3",
// function() {
// var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
// this.metadataProvider, this.pubSub);
// var path = {};
// dataHolder.addRepeat(path, "groupIdOneTextChild", "repeatId");
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupIdOneChildGroupRepeat3to3",'
// + '"children":['+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"1"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"},'+
// '{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"repeatId"}'+
// ']}');
// });
// QUnit.test("testAddRepeatGroupInGroupOneChildRepeat1to3OneAttribute",
// function() {
// var dataHolder = new
// CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute",
// this.metadataProvider, this.pubSub);
// var path = {};
// dataHolder.addRepeat(path, "groupIdOneTextChildOneAttribute", "repeatId");
//
// deepEqual(JSON.stringify(dataHolder.getData()),
// '{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
// + '"children":['+
// '{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"},'
// +'{"name":"groupIdOneTextChildOneAttribute",'
// + '"children":[{"name":"textVariableId","value":""}]'
// + ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"repeatId"}'
// + ']}');
// });
//
// //textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup
// //textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup
// //textVarRepeat1to3InGroupOneAttribute
// //textVar
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
// QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup2",
// function() {
// var dataHolder = new CORA.DataHolder(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0");
// dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute",
// "repeatId");
//	
// var path2 =
// createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
// "repeatId");
// var attributes = createAttributes();
// attributes.children.push(createAttributeWithNameAndValueAndRepeatId("anAttribute",
// "aFinalValue"));
// path2.children.push(attributes);
// path.children.push(path2);
// dataHolder.addRepeat(path, "textVar", "one");
//	 
//	
// deepEqual(
// JSON.stringify(dataHolder.getData()),
// '{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
// +
// '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
// + '"children":[{"name":"textVarRepeat1to3InGroupOneAttribute",'
// + '"children":[{"name":"textVar","value":"","repeatId":"0"},'
// +'{"name":"textVar","value":"","repeatId":"one"}],'
// + '"attributes":{"anAttribute":"aFinalValue"}'
// + ',"repeatId":"repeatId"' + '}]' + ',"repeatId":"0"' + '}]}');
// });
//
// QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroupWrongNameInDataInPathNothingShouldBeAdded",
// function() {
//	
// var dataHolder = new CORA.DataHolder(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
// this.metadataProvider, this.pubSub);
// var path = createLinkedPathWithNameInDataAndRepeatId(
// "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupWRONG", "0");
// throws(function() {
// dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute",
// "repeatId");
// }, "Error");
//	
// deepEqual(
// JSON.stringify(dataHolder.getData()),
// '{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
// +
// '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
// + '"children":[]' + ',"repeatId":"0"' + '}]}');
// });

