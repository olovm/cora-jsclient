/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2017 Uppsala University Library
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
QUnit.module("pRepeatingElementTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();

		this.dependencies = {
			"jsBookkeeper" : this.jsBookkeeper
		};
		this.spec = {
			"repeatMin" : "1",
			"repeatMax" : "2",
			"path" : {},
			"pChildRefHandlerView" : CORATEST.pChildRefHandlerViewSpy(),
			"pChildRefHandler":CORATEST.pChildRefHandlerSpy(),
			"isRepeating" : Number("2") > 1 || " 2" === "X",
			"mode" : "input"
		};
	}, 
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	var repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");

	// remove button
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");

	// drag button
	var removeButton = buttonView.childNodes[1];
	assert.strictEqual(removeButton.className, "iconButton dragButton");

	// addAboveButton
	var addAboveButton = buttonView.childNodes[2];
	assert.strictEqual(addAboveButton.className, "iconButton addAboveButton");

	assert.strictEqual(buttonView.childNodes.length, 3);

});
QUnit.test("testInitNoRemoveOrDragOrAddAboveButtonWhenModeOutput", function(assert) {
	this.spec.mode = "output";
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(view.className, "repeatingElement");
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), this.spec.path);

	var repeatingElement = view;
	assert.strictEqual(repeatingElement.className, "repeatingElement");
	var buttonView = repeatingElement.childNodes[0];
	assert.strictEqual(buttonView.className, "buttonView");

	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testGetDependencies", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pRepeatingElement.getSpec(), this.spec);
});
QUnit.test("testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThis", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	pRepeatingElement.getView().ondragenter();
	assert
			.strictEqual(this.spec.pChildRefHandlerView.getRepeatingElementDragOver(),
					pRepeatingElement);
});
QUnit.test(
		"testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThisNoFunctionWhenModeOutput",
		function(assert) {
			this.spec.mode = "output";
			var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
			var view = pRepeatingElement.getView();
			this.fixture.appendChild(view);

			assert.strictEqual(pRepeatingElement.getView().ondragenter, null);
		});

QUnit.test("testButtonViewAndRemoveButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
});

QUnit.test("test0to1ShouldHaveRemoveButtonNoAddBeforeButton", function(assert) {
	this.spec.repeatMin = "0";
	this.spec.repeatMax = "1";
	this.spec.isRepeating = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "iconButton removeButton");
	assert.strictEqual(buttonView.childNodes.length, 1);
});

QUnit.test("test1to1ShodHaveNoRemoveOrDragOrAddAboveButton", function(assert) {
	this.spec.repeatMax = "1";
	this.spec.isRepeating = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("testRemoveButtonOnclick", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	CORATESTHELPER.simulateOnclick(removeButton);

	// subscription
	var removes = this.dependencies.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	var firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	var path = {};
	assert.deepEqual(firstRemove.path, path);
});

QUnit.test("testRemoveButtonHover", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);
	assert.deepEqual(view.className, "repeatingElement");

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	var event = new Event('mouseenter');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

	var event = new Event('mouseleave');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement");

	var event = new Event('mouseenter');
	removeButton.dispatchEvent(event);
	assert.deepEqual(view.className, "repeatingElement hoverRemove");

});

QUnit.test("testDragButtonOnmousedownOnmouseup", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var dragButton = buttonView.childNodes[1];

	assert.notOk(view.draggable);
	dragButton.onmousedown();
	assert.ok(view.draggable);
	dragButton.onmouseup();
	assert.notOk(view.draggable);
});

QUnit.test("testHideRemoveButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;

	assert.visible(removeButton, "buttonView should be visible");

	pRepeatingElement.hideRemoveButton();
	assert.notVisible(removeButton, "buttonView should be hidden");

	pRepeatingElement.showRemoveButton();
	assert.visible(removeButton, "buttonView should be visible");
});

QUnit.test("testHideDragButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var dragButton = buttonView.childNodes[1];

	assert.visible(dragButton, "buttonView should be visible");

	pRepeatingElement.hideDragButton();
	assert.notVisible(dragButton, "buttonView should be hidden");

	pRepeatingElement.showDragButton();
	assert.visible(dragButton, "buttonView should be visible");
});

QUnit.test("testAddAboveButtonOnclick", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
//	console.log(buttonView.childNodes)
	var addAboveButton = buttonView.childNodes[2];

	CORATESTHELPER.simulateOnclick(addAboveButton);

	 var addAboves = this.spec.pChildRefHandler.getSendAddAboveDataArray();
	 assert.deepEqual(addAboves.length, 1);
	
	 var firstAddAbove= addAboves[0];
//	 assert.strictEqual(firstAddAbove.type, "addAbove");
	 var path = {};
	 assert.deepEqual(firstAddAbove.path, path);
});

QUnit.test("testAddPresentation", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testAddPresentationNoStyle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testaddAlternativePresentation", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub default");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation);
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentationView = view.childNodes[1];
	assert.strictEqual(alternativePresentationView.className, "presentationStub alternative");
	assert.notVisible(alternativePresentationView, "alternativePresentationView should be hidden");

	// test minimized/maximized button
	var alternativeButton = buttonView.childNodes[1];
	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	assert.visible(alternativeButton, "alternativeButton should be shown");
	var defaultButton = buttonView.childNodes[2];
	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	assert.notVisible(defaultButton, "defaultButton should be hidden");
});

QUnit.test("testMinimizealternativeButtonShouldWorkWithoutDraghandle", function(assert) {
	this.spec.repeatMin = "1";
	this.spec.repeatMax = "1";
	this.spec.isRepeating = false;
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var alternativePresentation = CORATEST.presentationStub("minimized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation);

	var alternativeButton = buttonView.childNodes[0];
	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
	assert.visible(alternativeButton, "alternativeButton should be shown");
	var defaultButton = buttonView.childNodes[1];
	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
	assert.notVisible(defaultButton, "defaultButton should be hidden");

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testaddAlternativePresentationToggleNoStyle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentation = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addAlternativePresentation(alternativePresentation, "true");
	assert.deepEqual(view.className, "repeatingElement");

	var alternativePresentationView = view.childNodes[1];
	var alternativeButton = buttonView.childNodes[1];
	var defaultButton = buttonView.childNodes[2];

	alternativeButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");

	defaultButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");
});
