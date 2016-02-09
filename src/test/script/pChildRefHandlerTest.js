/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	coraTest.attachedPChildRefHandlerFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, fixture) {
		var factor = function(path, parentMetadataId, presentationId) {
			var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(parentMetadataId));
			var cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));

			var spec = {
				"parentPath" : path,
				"cParentMetadata" : cParentMetadata,
				"cPresentation" : cPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper
			};
			var pChildRefHandler = CORA.pChildRefHandler(spec);
			var view = pChildRefHandler.getView();
			fixture.appendChild(view);
			return {
				pChildRefHandler : pChildRefHandler,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				jsBookkeeper : jsBookkeeper,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.pChildRefHandler", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();

		this.presentationFactory = CORATEST.presentationFactorySpy();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();

		this.attachedPChildRefHandlerFactory = CORATEST.attachedPChildRefHandlerFactory(
				this.metadataProvider, this.pubSub, this.textProvider, this.presentationFactory,
				this.jsBookkeeper, this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === false);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});
QUnit.test("testInitRepeatingVariableNoOfChildren", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1toX", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === false);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 2);
	assert.strictEqual(view.childNodes[0].className, "childrenView");
	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === childRefHandler.sendAdd);

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});

QUnit.test("testInitRepeatingStaticNoOfChildren", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat3to3", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});

QUnit.test("testAddButtonFor1toX", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1toX", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === childRefHandler.sendAdd);

	button.onclick();
	var addData = {
		"childReference" : {
			"children" : [ {
				"name" : "ref",
				"value" : "textVariableId"
			}, {
				"name" : "repeatMin",
				"value" : "1"
			}, {
				"name" : "repeatMax",
				"value" : "X"
			} ],
			"name" : "childReference",
			"repeatId" : "1"
		},
		"metadataId" : "textVariableId",
		"path" : {}
	};
	assert.deepEqual(this.jsBookkeeper.getAddDataArray()[0], addData);
});

QUnit.test("testAddButtonShownFor0to1", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat0to1", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.visible(button, "button should be visible");

});

QUnit.test("testAddOneChild", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add();

	assert.strictEqual(childrenView.childNodes.length, 1);

	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), path);
});

QUnit.test("testAddOneChildWithRepeatId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), path);
});

QUnit.test("testAddOneChildWithOneLevelPath", function(assert) {
	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor(path,
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add();

	assert.strictEqual(childrenView.childNodes.length, 1);
	var childPath = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), childPath);

});

QUnit.test("testAddOneChildWithTwoLevelPath", function(assert) {
	var path = {
		"children" : [ {
			"name" : "nameInData1",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData2",
				"value" : "textVariableId"
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor(path,
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add();

	assert.strictEqual(childrenView.childNodes.length, 1);
	var childPath = {
		"children" : [ {
			"name" : "nameInData1",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData2",
				"value" : "textVariableId"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVariableId"
				} ]
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), childPath);
});
// groupInGroupOneTextChild
// groupIdOneTextChildTwoAttributes
// use this to make sure path contains attributes...

QUnit.test("testAddChildWithAttributesInPath", function(assert) {
	var fixture = document.getElementById("qunit-fixture");
	var metadataProvider = new MetadataProviderStub();
	var pubSub = new PubSubSpy();
	var textProvider = CORATEST.textProviderStub();

	var specPresentationFactory = {
		"metadataProvider" : metadataProvider,
		"pubSub" : pubSub,
		"textProvider" : textProvider,
		"jsBookkeeper" : jsBookkeeper
	};
	var presentationFactory = CORA.presentationFactory(specPresentationFactory);
	var jsBookkeeper = CORATEST.jsBookkeeperSpy();

	var attachedPChildRefHandlerFactory = CORATEST.attachedPChildRefHandlerFactory(
			metadataProvider, pubSub, textProvider, presentationFactory, jsBookkeeper, fixture);

	var path = {};
	var attachedPChildRefHandler = attachedPChildRefHandlerFactory.factor(path,
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"pgTextVarRepeat1to3InGroupOtherAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var variableView = childrenView.firstChild.firstChild;
	assert.strictEqual(variableView.className,
			"pGroup pgTextVarRepeat1to3InGroupOtherAttribute maximized");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	var firstSubsription = subscriptions[1];
	assert.strictEqual(firstSubsription.type, "add");
	var childPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVarRepeat1to3InGroupOneAttribute"
		}, {
			"name" : "repeatId",
			"value" : "one"
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
	};
	assert.deepEqual(firstSubsription.path, childPath);
	var secondSubsription = subscriptions[2];
	assert.strictEqual(secondSubsription.type, "remove");
	assert.deepEqual(secondSubsription.path, childPath);

});

// groupIdOneTextChildRepeat1to3
// pgGroupIdOneTextTwoTextChildrenRepeat1to3
QUnit.test("testRepeatingElement", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	// remove button
	var repeatingElement = childrenView.childNodes[0];
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var repeatingButtonView = repeatingElement.childNodes[1];
	assert.strictEqual(repeatingButtonView.className, "buttonView");
	var removeButton = repeatingButtonView.firstChild;
	assert.strictEqual(removeButton.className, "removeButton");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[1];
	assert.strictEqual(firstSubsription.type, "remove");
	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(firstSubsription.path, path);
	// var pVar = attachedPVar.pVar;
	// assert.ok(firstSubsription.functionToCall === repeatingElement.remove);

});
QUnit.test("testRepeatingElementRemoveButton", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	// remove button
	var repeatingElement = childrenView.childNodes[0];
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var repeatingButtonView = repeatingElement.childNodes[1];
	assert.strictEqual(repeatingButtonView.className, "buttonView");
	var removeButton = repeatingButtonView.firstChild;
	assert.strictEqual(removeButton.className, "removeButton");

	removeButton.onclick();
	// subscription
	var removes = attachedPChildRefHandler.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	var firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(firstRemove.path, path);

});
QUnit.test("testRepeatingElementStaticNoOfChildrenNoAddButton", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat3to3", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	// remove button
	var repeatingElement = childrenView.childNodes[0];
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var repeatingButtonView = repeatingElement.childNodes[1];
	assert.strictEqual(repeatingButtonView.className, "buttonView");
	assert.strictEqual(repeatingButtonView.childNodes.length, 0);

});

QUnit.test("testHideAddButtonWhenMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("one");
	attachedPChildRefHandler.pChildRefHandler.add("two");
	attachedPChildRefHandler.pChildRefHandler.add("three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");
});

QUnit.test("testShowAddButtonWhenBelowMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("one");
	attachedPChildRefHandler.pChildRefHandler.add("two");
	attachedPChildRefHandler.pChildRefHandler.add("three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function in pChildRefHandler
	attachedPChildRefHandler.pubSub.getSubscriptions()[1].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideRemoveButtonWhenAtMinRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("one");
	attachedPChildRefHandler.pChildRefHandler.add("two");
	attachedPChildRefHandler.pChildRefHandler.add("three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function
	attachedPChildRefHandler.pubSub.getSubscriptions()[1].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideRemoveButtonWhenAtMinRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	// remove button
	var repeatingElement = childrenView.childNodes[0];
	var repeatingButtonView = repeatingElement.childNodes[1];
	var removeButton = repeatingButtonView.firstChild;

	assert.notVisible(removeButton, "removeButton should be hidden");

	attachedPChildRefHandler.pChildRefHandler.add("two");
	assert.visible(removeButton, "removeButton should be visible");
	// remove button
	var repeatingElement2 = childrenView.childNodes[1];
	var repeatingButtonView2 = repeatingElement2.childNodes[1];
	var removeButton2 = repeatingButtonView2.firstChild;
	assert.visible(removeButton2, "removeButton should be visible");

	// call remove function in pChildRefHandler
	var firstChildRemoveSubscription = attachedPChildRefHandler.pubSub.getSubscriptions()[1];
	firstChildRemoveSubscription.functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 1);
	assert.notVisible(removeButton2, "removeButton should be hidden");

});

QUnit.test("testHideRemoveButtonWhenAtMinRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat0to1", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("one");

	// remove button
	var repeatingElement = childrenView.childNodes[0];
	var repeatingButtonView = repeatingElement.childNodes[1];
	var removeButton = repeatingButtonView.firstChild;

	assert.visible(removeButton, "removeButton should be visible");
});

QUnit.test("testHandleMessageRightMetadataId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVariableId"
	});

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageNotRightMetadataId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVariableIdNOT"
	});

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testWithMinimized", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("groupIdOneTextChild"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("pVarTextVariableId"));
	var cPresentationMinimized = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"cPresentationMinimized" : cPresentationMinimized,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("one");
	assert.strictEqual(childrenView.childNodes.length, 1);

	// minimizedPresentation
	var repeatingElement = childrenView.childNodes[0];
	assert.strictEqual(repeatingElement.childNodes.length, 3);

	var repeatingButtonView = repeatingElement.childNodes[2];
	assert.visible(repeatingButtonView, "repeatingButtonView should be visible");

	var maximizeButton = repeatingButtonView.childNodes[0];
	assert.strictEqual(maximizeButton.className, "maximizeButton");
	assert.notVisible(maximizeButton, "maximizeButton should be hidden");

	var minimizeButton = repeatingButtonView.childNodes[1];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.visible(minimizeButton, "minimizeButton should be visible");
});

QUnit.test("testWithMinimizedDefault", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("groupIdOneTextChild"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("pVarTextVariableId"));
	var cPresentationMinimized = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"cPresentationMinimized" : cPresentationMinimized,
		"minimizedDefault" : "true",
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("one");
	assert.strictEqual(childrenView.childNodes.length, 1);

	// minimizedPresentation
	var repeatingElement = childrenView.childNodes[0];
	assert.strictEqual(repeatingElement.childNodes.length, 3);

	var repeatingButtonView = repeatingElement.childNodes[2];
	var minimizeButton = repeatingButtonView.childNodes[1];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.notVisible(minimizeButton, "minimizeButton should be hidden");
});
