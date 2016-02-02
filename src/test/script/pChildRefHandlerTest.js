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
				jsBookkeeper:jsBookkeeper,
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

		// var spec = {
		// "metadataId" : metadataId,
		// "metadataProvider" : metadataProvider,
		// "pubSub" : pubSub,
		// "textProvider" : textProvider
		// };
		// this.jsBookkeeper = CORA.jsBookkeeper(spec);
		//
		// var specPresentationFactory = {
		// "metadataProvider" : metadataProvider,
		// "pubSub" : pubSub,
		// "textProvider" : textProvider,
		// "jsBookkeeper" : jsBookkeeper
		// };
		// this.presentationFactory =
		// CORA.presentationFactory(specPresentationFactory);
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

QUnit.test("testAddButton", function(assert) {
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
		"metadataId" : "textVariableId",
		"path" : {}
	};
	assert.deepEqual(this.jsBookkeeper.getAddDataArray()[0], addData);

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
//	var pVar = attachedPVar.pVar;
//	assert.ok(firstSubsription.functionToCall === repeatingElement.remove);

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
QUnit.test("testRepeatingElementStaticNoOfChildrenNoRemoveButton", function(assert) {
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

QUnit.test("testHideRemoveButtonWhenMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.ok(buttonView.offsetHeight > 0, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("one");
	attachedPChildRefHandler.pChildRefHandler.add("two");
	attachedPChildRefHandler.pChildRefHandler.add("three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.ok(buttonView.offsetHeight === 0, "buttonView should be hidden");
});

QUnit.test("testShowRemoveButtonWhenBelowMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);
	
	var buttonView = view.childNodes[1];
	assert.ok(buttonView.offsetHeight > 0, "buttonView should be visible");
	
	attachedPChildRefHandler.pChildRefHandler.add("one");
	attachedPChildRefHandler.pChildRefHandler.add("two");
	attachedPChildRefHandler.pChildRefHandler.add("three");
	
	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.ok(buttonView.offsetHeight === 0, "buttonView should be hidden");
	
	//call remove function
	attachedPChildRefHandler.pubSub.getSubscriptions()[1].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.ok(buttonView.offsetHeight > 0, "buttonView should be visible");
});

// groupInGroupOneTextChild
// groupIdOneTextChildTwoAttributes
// use this to make sure path contains attributes...

// QUnit.test("testAddChildWithAttributesInPath", function (assert) {
// var path = {};
// var attachedPChildRefHandler =
// this.attachedPChildRefHandlerFactory.factor(path,
// "groupInGroupOneTextChildTwoAttributes",
// "pgGroupIdOneTextOneTextChildTwoAttributes");
// var view = attachedPChildRefHandler.view;
// assert.ok(view.childNodes.length === 0, "pChildRefHandler, should have zero
// children");
//	
// attachedPChildRefHandler.pChildRefHandler.add();
//	
// assert.ok(view.childNodes.length === 1, "pChildRefHandler, should have one
// child");
// var variableView = view.firstChild;
// assert.strictEqual(variableView.className, "pVar pVarTextVariableId");
//	
// // subscription
// var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
// assert.deepEqual(subscriptions.length, 2);
//	
// var firstSubsription = subscriptions[1];
// assert.strictEqual(firstSubsription.type, "setValue");
// var childPath = {
// "children" : [ {
// "name" : "nameInData1",
// "value" : "textVariableId"
// }, {
// "children" : [ {
// "name" : "nameInData2",
// "value" : "textVariableId"
// }, {
// "name" : "linkedPath",
// "children" : [ {
// "name" : "nameInData",
// "value" : "textVariableId"
// } ]
// } ],
// "name" : "linkedPath"
// } ],
// "name" : "linkedPath"
// };
// assert.deepEqual(firstSubsription.path, childPath);
//	
// });

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
