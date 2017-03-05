/*
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
			"parentModelObject" : CORATEST.parentModelObjectSpy(),
			"isRepeating" : Number("2") > 1 || " 2" === "X"
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
	assert.strictEqual(removeButton.className, "removeButton");

	// drag button
	var removeButton = buttonView.childNodes[1];
	assert.strictEqual(removeButton.className, "dragButton");
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
			.strictEqual(this.spec.parentModelObject.getRepeatingElementDragOver(),
					pRepeatingElement);
});

QUnit.test("testButtonViewAndRemoveButton", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "removeButton");
});

QUnit.test("test0to1ShouldHaveRemoveButton", function(assert) {
	this.spec.repeatMin = "0";
	this.spec.repeatMax = "1";
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "removeButton");
});

QUnit.test("test1to1ShodHaveNoRemoveOrDragButton", function(assert) {
	this.spec.repeatMax = "1";
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

	var event = document.createEvent('Event');
	removeButton.onclick(event);
	// subscription
	var removes = this.dependencies.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	var firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	var path = {};
	assert.deepEqual(firstRemove.path, path);
});

QUnit.test("testDragButtonOnmousedownOnmouseup", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];
	var dragButton = buttonView.lastChild;

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
	var dragButton = buttonView.lastChild;

	assert.visible(dragButton, "buttonView should be visible");

	pRepeatingElement.hideDragButton();
	assert.notVisible(dragButton, "buttonView should be hidden");

	pRepeatingElement.showDragButton();
	assert.visible(dragButton, "buttonView should be visible");
});

QUnit.test("testAddPresentation", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
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
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testAddPresentationMinimized", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var presentationMinimized = CORATEST.presentationStub("minimized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized);
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimizedView = view.childNodes[1];
	assert.strictEqual(presentationMinimizedView.className, "presentationStub minimized");
	assert.notVisible(presentationMinimizedView, "presentationMinimizedView should be hidden");

	// test minimized/maximized button
	var maximizeButton = buttonView.childNodes[1];
	assert.strictEqual(maximizeButton.className, "maximizeButton");
	assert.notVisible(maximizeButton, "maximizeButton should be hidden");
	var minimizeButton = buttonView.childNodes[2];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.visible(minimizeButton, "minimizeButton should be shown");
});

QUnit.test("testMinimizeMaximizeButtonShouldWorkWithoutDraghandle", function(assert) {
	this.spec.repeatMin = "1";
	this.spec.repeatMax = "1";
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationMinimized = CORATEST.presentationStub("minimized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized);

	var maximizeButton = buttonView.childNodes[0];
	assert.strictEqual(maximizeButton.className, "maximizeButton");
	assert.notVisible(maximizeButton, "maximizeButton should be hidden");
	var minimizeButton = buttonView.childNodes[1];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.visible(minimizeButton, "minimizeButton should be shown");

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testAddPresentationMinimizedDefault", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var presentationMinimized = CORATEST.presentationStub("minimized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized, "true");
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimizedView = view.childNodes[1];
	assert.strictEqual(presentationMinimizedView.className, "presentationStub minimized");
	assert.visible(presentationMinimizedView, "presentationMinimizedView should be shown");
	assert.notVisible(presentationView, "presentationView should be hidden");

	// test minimized/maximized button
	var maximizeButton = buttonView.childNodes[1];
	assert.strictEqual(maximizeButton.className, "maximizeButton");
	assert.visible(maximizeButton, "maximizeButton should be shown");
	var minimizeButton = buttonView.childNodes[2];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.notVisible(minimizeButton, "minimizeButton should be hidden");
});

QUnit.test("testAddPresentationMinimizedToggle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimized = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized, "true");
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimizedView = view.childNodes[1];
	assert.strictEqual(presentationMinimizedView.className, "presentationStub minimized");
	assert.visible(presentationMinimizedView, "presentationMinimizedView should be shown");
	assert.notVisible(presentationView, "presentationView should be hidden");

	// test minimized/maximized button
	var maximizeButton = buttonView.childNodes[1];
	assert.strictEqual(maximizeButton.className, "maximizeButton");
	assert.visible(maximizeButton, "maximizeButton should be shown");
	var minimizeButton = buttonView.childNodes[2];
	assert.strictEqual(minimizeButton.className, "minimizeButton");
	assert.notVisible(minimizeButton, "minimizeButton should be hidden");

	maximizeButton.onclick();
	assert.visible(presentationView, "presentationView should be visible");
	assert.notVisible(presentationMinimizedView, "presentationView should be hidden");
	assert.notVisible(maximizeButton, "maximizeButton should be hidden");
	assert.visible(minimizeButton, "minimizeButton should be shown");
	assert.deepEqual(view.className, "repeatingElement");

	minimizeButton.onclick();
	assert.notVisible(presentationView, "presentationView should be hidden");
	assert.visible(presentationMinimizedView, "presentationMinimizedView should be shown");
	assert.visible(maximizeButton, "maximizeButton should be shown");
	assert.notVisible(minimizeButton, "minimizeButton should be hidden");
	assert.deepEqual(view.className, "repeatingElement");
});

QUnit.test("testAddPresentationMinimizedToggleNoStyle", function(assert) {
	var pRepeatingElement = CORA.pRepeatingElement(this.dependencies, this.spec);
	var view = pRepeatingElement.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimized = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized, "true");
	assert.deepEqual(view.className, "repeatingElement");

	var presentationMinimizedView = view.childNodes[1];
	var maximizeButton = buttonView.childNodes[1];
	var minimizeButton = buttonView.childNodes[2];

	maximizeButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");

	minimizeButton.onclick();
	assert.deepEqual(view.className, "repeatingElement");
});
