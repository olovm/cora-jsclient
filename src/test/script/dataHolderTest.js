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
				"metadataId" : metadataId,
				"metadataProvider" : this.metadataProvider,
				"pubSub" : this.pubSub
			};
			return CORA.dataHolder(spec);
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var dataHolder = this.newDataHolder("recordTypeOnlyMetadataIdChild");

	// subscription
	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubscription = subscriptions[0];
	assert.strictEqual(firstSubscription.type, "*");
	assert.deepEqual(firstSubscription.path, {});
	 assert.ok(firstSubscription.functionToCall === dataHolder.handleMsg);
});

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


QUnit.test("testRemoveSecondLevel", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	var path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.remove(path3);
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChild",
			"children" : [  ]
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});
QUnit.test("testRemoveChildToGroupIdOneTextChildWrongNameInData", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");
	
	var path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");
	
	var path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableIdNOT"));
	throws(function() {
		dataHolder.remove(path3);
	}, "Error");
});
QUnit.test("testHandleMessageRemove", function(assert) {
	var dataHolder = this.newDataHolder("groupIdOneTextChild");
	var path = {};
	dataHolder.addChild(path, "groupIdOneTextChild");

	var path2 = createLinkedPathWithNameInData("groupIdOneTextChild");
	dataHolder.addChild(path2, "textVariableId");

	var path3 = createLinkedPathWithNameInData("groupIdOneTextChild");
	path3.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.handleMsg({"path":path3, "type": "remove"},"x/y/z/remove");
	var expected = {
		"name" : "groupIdOneTextChild",
		"children" : [ {
			"name" : "groupIdOneTextChild",
			"children" : [  ]
		} ]
	};
	assert.stringifyEqual(dataHolder.getData(), expected);
});


function createLinkedPathWithNameInData(nameInData) {
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		} ]
	};
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
