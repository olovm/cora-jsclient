/*
 * Copyright 2018 Uppsala University Library
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
QUnit.module("pNonRepeatingChildRefHandlerViewTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {};

		this.someNode = document.createElement("SPAN");
		this.someNode.className = "someNode";

		this.someOtherNode = document.createElement("SPAN");
		this.someOtherNode.className = "someOtherNode";

		this.createHandlerAddChildrenAndReturnHandler = function() {
			var pChildRefHandlerViewSpec = {};
			var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(
					this.dependencies, pChildRefHandlerViewSpec);
			pNonRepeatingChildRefHandlerView.addChild(this.someNode);

			pNonRepeatingChildRefHandlerView.addAlternativeChild(this.someOtherNode);
			this.fixture.appendChild(pNonRepeatingChildRefHandlerView.getView());
			return pNonRepeatingChildRefHandlerView;
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pChildRefHandlerViewSpec = {};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	assert.strictEqual(pNonRepeatingChildRefHandlerView.type, "pNonRepeatingChildRefHandlerView");
});

QUnit.test("testInitCreatesBaseView", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "someSContainer"
	};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pNonRepeatingChildRefHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className, "pNonRepeatingChildRefHandler someSContainer");
});

QUnit.test("testInitCreatesBaseViewWithStyleInfo", function(assert) {
	var pChildRefHandlerViewSpec = {
		"presentationId" : "someSContainer",
		textStyle : "someTextStyle",
		childStyle : "someChildStyle"
	};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	var view = pNonRepeatingChildRefHandlerView.getView();
	assert.strictEqual(view.nodeName, "SPAN");
	assert.strictEqual(view.className,
			"pNonRepeatingChildRefHandler someTextStyle someChildStyle someSContainer");
});

QUnit.test("testAddChild", function(assert) {
	var pChildRefHandlerViewSpec = {};
	var pNonRepeatingChildRefHandlerView = CORA.pNonRepeatingChildRefHandlerView(this.dependencies,
			pChildRefHandlerViewSpec);
	pNonRepeatingChildRefHandlerView.addChild(this.someNode);

	var view = pNonRepeatingChildRefHandlerView.getView();

	assert.strictEqual(view.firstChild, this.someNode);
	assert.strictEqual(view.firstChild.className, "someNode default");
});

QUnit.test("testAddAlternativeChild", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	assert.strictEqual(view.childNodes[1], this.someOtherNode);
	assert.strictEqual(view.childNodes[1].className, "someOtherNode alternative");

	var buttonView = view.childNodes[2];
	assert.strictEqual(buttonView.nodeName, "SPAN");
	assert.strictEqual(buttonView.className, "buttonView");
});

QUnit.test("testAddAlternativeChildHasButtons", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	var buttonView = view.childNodes[2];

	assert.strictEqual(buttonView.childNodes.length, 2);
});

QUnit.test("testalternativeButtonHasCorrectClassName", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	var buttonView = view.childNodes[2];
	var alternativeButton = buttonView.childNodes[0];

	assert.strictEqual(alternativeButton.className, "iconButton alternativeButton");
});

QUnit.test("testdefaultButtonHasCorrectClassName", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	var buttonView = view.childNodes[2];
	var defaultButton = buttonView.childNodes[1];

	assert.strictEqual(defaultButton.className, "iconButton defaultButton");
});

QUnit.test("testButtonFunctions", function(assert) {
	var view = this.createHandlerAddChildrenAndReturnHandler().getView();
	var buttonView = view.childNodes[2];
	var alternativeButton = buttonView.childNodes[0];
	var defaultButton = buttonView.childNodes[1];

	assert.visible(this.someNode);
	assert.notVisible(this.someOtherNode);
	assert.notVisible(defaultButton);
	assert.visible(alternativeButton);

	var event = document.createEvent('Event');
	alternativeButton.onclick(event);
	assert.notVisible(this.someNode);
	assert.visible(this.someOtherNode);
	assert.visible(defaultButton);
	assert.notVisible(alternativeButton);

	
	var event2 = document.createEvent('Event');
	defaultButton.onclick(event2);
	assert.visible(this.someNode);
	assert.notVisible(this.someOtherNode);
	assert.notVisible(defaultButton);
	assert.visible(alternativeButton);
});