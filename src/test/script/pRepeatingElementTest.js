/*
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
	coraTest.attachedPRepeatingElementFactory = function(jsBookkeeper, fixture) {
		var factor = function(repeatMin, repeatMax, path, parentModelObject) {
			var spec = {
				"repeatMin" : repeatMin,
				"repeatMax" : repeatMax,
				"path" : path,
				"jsBookkeeper" : jsBookkeeper,
				"parentModelObject" : parentModelObject,
				"isRepeating":Number(repeatMax) > 1 || repeatMax === "X"
			};
			var pRepeatingElement = CORA.pRepeatingElement(spec);
			var view = pRepeatingElement.getView();
			fixture.appendChild(view);
			return {
				pRepeatingElement : pRepeatingElement,
				fixture : fixture,
				jsBookkeeper : jsBookkeeper,
				view : view,
				parentModelObject : parentModelObject
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("pRepeatingElementTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();

		this.pRepeatingElementFactory = CORATEST.attachedPRepeatingElementFactory(
				this.jsBookkeeper, this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	assert.strictEqual(pRepeatingElement.type, "pRepeatingElement");
	assert.deepEqual(attachedPRepeatingElement.view.className, "repeatingElement");
	var view = attachedPRepeatingElement.view;
	assert.ok(view.modelObject === pRepeatingElement,
			"modelObject should be a pointer to the javascript object instance");

	assert.strictEqual(pRepeatingElement.getPath(), path);

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

QUnit.test("testDragenterToTellPChildRefHandlerThatSomethingIsDragedOverThis", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var parentModelObjectSpy = CORATEST.parentModelObjectSpy();
	var attachedPRepeatingElement = this.pRepeatingElementFactory.factor(repeatMin, repeatMax,
			path, parentModelObjectSpy);

	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	pRepeatingElement.getView().ondragenter();
	assert.strictEqual(parentModelObjectSpy.getRepeatingElementDragOver(), pRepeatingElement);
});

QUnit.test("testButtonViewAndRemoveButton", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	var buttonView = repeatingElement.childNodes[0];
	var removeButton = buttonView.firstChild;
	assert.strictEqual(removeButton.className, "removeButton");
});

QUnit.test("test1to1ShodHaveNoRemoveOrDragButton", function(assert) {
	var repeatMin = "1";
	var repeatMax = "1";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	assert.strictEqual(repeatingElement.childNodes[0].childNodes.length, 0);
});

QUnit.test("testRemoveButtonOnclick", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	var buttonView = repeatingElement.childNodes[0];
	var removeButton = buttonView.firstChild;

	removeButton.onclick();
	// subscription
	var removes = attachedPRepeatingElement.jsBookkeeper.getRemoveDataArray();
	assert.deepEqual(removes.length, 1);

	var firstRemove = removes[0];
	assert.strictEqual(firstRemove.type, "remove");
	var path = {};
	assert.deepEqual(firstRemove.path, path);
});

QUnit.test("testDragButtonOnmousedownOnmouseup", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	var buttonView = repeatingElement.childNodes[0];
	var dragButton = buttonView.lastChild;

	assert.notOk(view.draggable);
	dragButton.onmousedown();
	assert.ok(view.draggable);
	dragButton.onmouseup();
	assert.notOk(view.draggable);
});

QUnit.test("testHideRemoveButton", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	var buttonView = repeatingElement.childNodes[0];
	var removeButton = buttonView.firstChild;

	assert.visible(removeButton, "buttonView should be visible");

	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	pRepeatingElement.hideRemoveButton();
	assert.notVisible(removeButton, "buttonView should be hidden");

	pRepeatingElement.showRemoveButton();
	assert.visible(removeButton, "buttonView should be visible");
});

QUnit.test("testHideDragButton", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var view = attachedPRepeatingElement.view;

	var repeatingElement = view;
	var buttonView = repeatingElement.childNodes[0];
	var dragButton = buttonView.lastChild;

	assert.visible(dragButton, "buttonView should be visible");

	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	pRepeatingElement.hideDragButton();
	assert.notVisible(dragButton, "buttonView should be hidden");

	pRepeatingElement.showDragButton();
	assert.visible(dragButton, "buttonView should be visible");
});

QUnit.test("testAddPresentation", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	var view = attachedPRepeatingElement.view;

	var presentation = CORATEST.presentationStub();

	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);
});

QUnit.test("testAddPresentationMinimized", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	var view = attachedPRepeatingElement.view;
	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var presentationMinimized = CORATEST.presentationStub("minimized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized);

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

QUnit.test("testAddPresentationMinimizedDefault", function(assert) {
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	var view = attachedPRepeatingElement.view;
	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var presentationMinimized = CORATEST.presentationStub("minimized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized, "true");

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
	var repeatMin = "1";
	var repeatMax = "2";
	var path = {};
	var attachedPRepeatingElement = this.pRepeatingElementFactory
			.factor(repeatMin, repeatMax, path);
	var pRepeatingElement = attachedPRepeatingElement.pRepeatingElement;
	var view = attachedPRepeatingElement.view;
	var buttonView = view.childNodes[0];

	var presentation = CORATEST.presentationStub("maximized");
	pRepeatingElement.addPresentation(presentation);

	var presentationView = view.childNodes[0];
	assert.strictEqual(presentationView.className, "presentationStub maximized");
	assert.visible(presentationView, "presentationView should be visible");
	assert.strictEqual(view.childNodes.length, 2);

	var presentationMinimized = CORATEST.presentationStub("minimized maximized");
	pRepeatingElement.addPresentationMinimized(presentationMinimized, "true");

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

	minimizeButton.onclick();
	assert.notVisible(presentationView, "presentationView should be hidden");
	assert.visible(presentationMinimizedView, "presentationMinimizedView should be shown");
	assert.visible(maximizeButton, "maximizeButton should be shown");
	assert.notVisible(minimizeButton, "minimizeButton should be hidden");

});
