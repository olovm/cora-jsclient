/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
QUnit.module("pChildRefHandlerViewTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.fixture.innerHTML = "";
		this.dependencies = {};
	},
	afterEach : function() {
	}
});

QUnit.test("testInitNoAddButton", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId",
		"isRepeating" : true,
		"mode" : "input"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.viewObject === pChildRefHandlerView,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	var childrenView = view.childNodes[0];
	assert.strictEqual(childrenView.className, "childrenView");

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView, undefined);
});

QUnit.test("testInitWithStyle", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId",
		"isRepeating" : true,
		"textStyle" : "someTextStyle",
		"childStyle" : "someChildStyle"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	assert.deepEqual(view.className,
			"pChildRefHandler someTextStyle someChildStyle pVarTextVariableId");
});

QUnit.test("testInitWithAddButton", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId",
		"isRepeating" : true,
		"addMethod" : function() {
		},
		"addText" : "some add text",
		"mode" : "input"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	assert.strictEqual(view.childNodes.length, 2);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	assert.strictEqual(buttonView.firstChild.type, "button");
	assert.strictEqual(buttonView.firstChild.value, "some add text");
});

QUnit.test("testInitWithAddButtonNotCreatedForModeOutput", function(assert) {
	var pChildRefHandlerViewSpec = {
			"presentationId" : "pVarTextVariableId",
			"isRepeating" : true,
			"addMethod" : function() {
			},
			"addText" : "some add text",
			"mode" : "output"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	assert.strictEqual(view.childNodes.length, 1);
	
	var buttonView = view.childNodes[0];
	assert.strictEqual(buttonView.className, "childrenView");
});

QUnit.test("testInitFile", function(assert) {
	var handleFilesHasBeenCalled = false;
	function handleFiles(files) {
		handleFilesHasBeenCalled = true;
	}
	var pChildRefHandlerViewSpec = {
		"presentationId" : "myChildOfBinaryPLink",
		"isRepeating" : true,
		"upload" : "true",
		"handleFilesMethod" : handleFiles,
		"mode" : "input"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.strictEqual(button.type, "file");

	button.onchange();
	assert.ok(handleFilesHasBeenCalled);
});

QUnit.test("testHideShowButtonView", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId",
		"isRepeating" : true,
		"addMethod" : function() {
		},
		"mode" : "input"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView);
	pChildRefHandlerView.hideButtonView();
	assert.notVisible(buttonView);
	pChildRefHandlerView.showButtonView();
	assert.visible(buttonView);

});

QUnit.test("testAddChildAndRemoveChild", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";

	assert.strictEqual(childrenView.firstChild, null);
	pChildRefHandlerView.addChild(childElement);
	assert.strictEqual(childrenView.firstChild, childElement);

	pChildRefHandlerView.removeChild(childElement);
	assert.strictEqual(childrenView.firstChild, null);
});

QUnit.test("testShowAndHideChildrensRemoveButton", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var pRepeatingElementSpec = {
		"path" : "xyz"
	};
	var childElement = CORATEST.pRepeatingElementSpy({}, pRepeatingElementSpec);
	pChildRefHandlerView.addChild(childElement.getView());
	var childElement2 = CORATEST.pRepeatingElementSpy({}, pRepeatingElementSpec);
	pChildRefHandlerView.addChild(childElement2.getView());

	assert.strictEqual(childElement.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(childElement.getShowRemoveButtonCalled(), 0);
	assert.strictEqual(childElement2.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(childElement2.getShowRemoveButtonCalled(), 0);

	pChildRefHandlerView.hideChildrensRemoveButton();
	pChildRefHandlerView.showChildrensRemoveButton();

	assert.strictEqual(childElement.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(childElement.getShowRemoveButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(childElement2.getShowRemoveButtonCalled(), 1);
});

QUnit.test("testShowAndHideChildrensDragButton", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();
	this.fixture.appendChild(view);
	var childrenView = pChildRefHandlerView.getView().firstChild;

	var pRepeatingElementSpec = {
		"path" : "xyz"
	};
	var childElement = CORATEST.pRepeatingElementSpy({}, pRepeatingElementSpec);
	pChildRefHandlerView.addChild(childElement.getView());
	var childElement2 = CORATEST.pRepeatingElementSpy({}, pRepeatingElementSpec);
	pChildRefHandlerView.addChild(childElement2.getView());

	assert.strictEqual(childElement.getHideDragButtonCalled(), 0);
	assert.strictEqual(childElement.getShowDragButtonCalled(), 0);
	assert.strictEqual(childElement2.getHideDragButtonCalled(), 0);
	assert.strictEqual(childElement2.getShowDragButtonCalled(), 0);

	pChildRefHandlerView.hideChildrensDragButton();
	pChildRefHandlerView.showChildrensDragButton();

	assert.strictEqual(childElement.getHideDragButtonCalled(), 1);
	assert.strictEqual(childElement.getShowDragButtonCalled(), 1);
	assert.strictEqual(childElement2.getHideDragButtonCalled(), 1);
	assert.strictEqual(childElement2.getShowDragButtonCalled(), 1);
});

QUnit.test("testDraggingDragStart", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";
	pChildRefHandlerView.addChild(childElement);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = childElement;
	eventSpy.screenY = 0;

	// dragStart
	pChildRefHandlerView.dragstartHandler(eventSpy);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.effectAllowed, "move");
	assert.strictEqual(eventSpy.target.className, "repeatingElement beeingDragged");
	assert.strictEqual(eventSpy.dataTransfer.getFormat(), "text/notInUse");
	assert.strictEqual(eventSpy.dataTransfer.getData(), "notUsed");
});

QUnit.test("testDraggingDragover", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";
	pChildRefHandlerView.addChild(childElement);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = childElement;
	eventSpy.screenY = 0;

	// dragover
	pChildRefHandlerView.dragoverHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDraggingDragenter", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pChildRefHandlerView.getView();

	var childElement = document.createElement("span");
	childElement.className = "repeatingElement";
	pChildRefHandlerView.addChild(childElement);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = childElement;
	eventSpy.screenY = 0;

	// dragenter
	pChildRefHandlerView.dragenterHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDraggingDragenterIsDragging", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var spanHolder = document.createElement("span");
	var beeingDragged = document.createElement("span");
	beeingDragged.id = "beeingDragged";
	beeingDragged.className = "eventSpy";

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pChildRefHandlerView.setRepeatingElementDragOver(pRepeatingElementSpy);
	pRepeatingElementSpy.id = "draggedOver";
	spanHolder.appendChild(pRepeatingElementSpy.getView());

	spanHolder.appendChild(beeingDragged);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = beeingDragged;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDraggingDragenterIsDraggingNoDragEnterRepeatingElement", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var spanHolder = document.createElement("span");
	var beeingDragged = document.createElement("span");
	beeingDragged.id = "beeingDragged";
	beeingDragged.className = "eventSpy";

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.id = "draggedOver";
	spanHolder.appendChild(pRepeatingElementSpy.getView());

	spanHolder.appendChild(beeingDragged);

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = beeingDragged;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDraggingDragenterIsDraggingTwoChildren", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragEnter on firstChild
	var pRepeatingElement = firstChild.modelObject;
	pRepeatingElement.getView().ondragenter();

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");

	// order
	var childrenView = pChildRefHandlerView.getView().firstChild;
	assert.strictEqual(childrenView.childNodes[0], firstChild);
});

QUnit.test("testDraggingDragenterIsDraggingChangeOrder", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();
	var secondChild = pRepeatingElementSpy2.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragEnter on secondChild
	var pRepeatingElement = secondChild.modelObject;
	pRepeatingElement.getView().ondragenter();

	var eventSpy2 = CORATEST.eventSpy();
	eventSpy2.target = secondChild;
	eventSpy2.screenY = "50";

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy2);
	assert.strictEqual(eventSpy2.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy2.dataTransfer.dropEffect, "move");

	// order
	var childrenView = pChildRefHandlerView.getView().firstChild;
	assert.strictEqual(childrenView.childNodes[0], secondChild);
});

QUnit.test("testDropHandlerDragging", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dropHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, "move");
});

QUnit.test("testDropHandlerNotDragging", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	// pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dropHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), false);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, undefined);
});

QUnit.test("testDragendNotDragging", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	// pChildRefHandlerView.dragstartHandler(eventSpy);

	pChildRefHandlerView.dragendHandler(eventSpy);
	assert.strictEqual(eventSpy.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy.stopPropagationWasCalled(), false);
	assert.strictEqual(eventSpy.dataTransfer.dropEffect, undefined);
});

QUnit.test("testDragendDragging", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();
	var secondChild = pRepeatingElementSpy2.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	var eventSpy2 = CORATEST.eventSpy();
	eventSpy2.target = secondChild;
	eventSpy2.screenY = 0;

	// dragend
	pChildRefHandlerView.dragendHandler(eventSpy2);
	assert.strictEqual(eventSpy2.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy2.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy2.dataTransfer.dropEffect, undefined);
});

QUnit.test("testDragendDraggingChangeOrder", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var path1 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.setPath(path1);
	pRepeatingElementSpy.id = "draggedOver";
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.setPath(path2);
	pRepeatingElementSpy2.id = "draggedOver2";
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());

	var firstChild = pRepeatingElementSpy.getView();
	var secondChild = pRepeatingElementSpy2.getView();

	var eventSpy = CORATEST.eventSpy();
	eventSpy.target = firstChild;
	eventSpy.screenY = 0;

	// dragstart
	pChildRefHandlerView.dragstartHandler(eventSpy);

	// dragEnter on secondChild
	var pRepeatingElement = secondChild.modelObject;
	pRepeatingElement.getView().ondragenter();

	var eventSpy2 = CORATEST.eventSpy();
	eventSpy2.target = secondChild;
	eventSpy2.screenY = "50";

	// dragover
	pChildRefHandlerView.dragenterHandler(eventSpy2);
	assert.strictEqual(eventSpy2.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy2.dataTransfer.dropEffect, "move");

	// order
	var childrenView = pChildRefHandlerView.getView().firstChild;
	assert.strictEqual(childrenView.childNodes[0], secondChild);

	var movedData;
	function childMoved(data) {
		movedData = data;
	}
	pChildRefHandlerView.getView().modelObject = {
		"childMoved" : childMoved
	};

	// new below
	var eventSpy3 = CORATEST.eventSpy();
	eventSpy3.target = firstChild;
	eventSpy3.screenY = 55;
	// dragend
	pChildRefHandlerView.dragendHandler(eventSpy3);
	assert.strictEqual(eventSpy3.preventDefaultWasCalled(), true);
	assert.strictEqual(eventSpy3.stopPropagationWasCalled(), true);
	assert.strictEqual(eventSpy3.dataTransfer.dropEffect, undefined);

	assert.strictEqual(eventSpy3.target.className, "");

	var moveData = {
		// "path" : {},
		// "metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	assert.deepEqual(movedData, moveData);
});
QUnit.test("testHandleMoveMessageAfter", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "one";
	pRepeatingElementSpy.setPath(path);
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "two";
	pRepeatingElementSpy2.setPath(path2);
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());
	var childrenView = pChildRefHandlerView.getView().childNodes[0];

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy2.getView());

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	pChildRefHandlerView.moveChild(moveData);

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy2.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy.getView());
});

QUnit.test("testHandleMoveMessageBefore", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "pVarTextVariableId"
	};
	var pChildRefHandlerView = CORA.pChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "two"
		} ]
	};
	var pRepeatingElementSpy2 = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy2.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy2.id = "two";
	pRepeatingElementSpy2.setPath(path2);
	pChildRefHandlerView.addChild(pRepeatingElementSpy2.getView());
	var childrenView = pChildRefHandlerView.getView().childNodes[0];

	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	};
	var pRepeatingElementSpy = CORATEST.pRepeatingElementSpy({}, {});
	pRepeatingElementSpy.setParentModelObject(pChildRefHandlerView);
	pRepeatingElementSpy.id = "one";
	pRepeatingElementSpy.setPath(path);
	pChildRefHandlerView.addChild(pRepeatingElementSpy.getView());

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy2.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy.getView());

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "before"
	};
	pChildRefHandlerView.moveChild(moveData);

	assert.strictEqual(childrenView.childNodes[0], pRepeatingElementSpy.getView());
	assert.strictEqual(childrenView.childNodes[1], pRepeatingElementSpy2.getView());

});
