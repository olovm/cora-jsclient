/*
 * Copyright 2016 Uppsala University Library
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
QUnit.module("managedGuiItemTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"managedGuiItemViewFactory" : CORATEST.standardFactorySpy("managedGuiItemViewSpy"),
		};
		this.spec = {
			"handledBy" : function() {
			},
			"menuPresentation" : CORA.gui.createSpanWithClassName("menuPresentation"),
			"workPresentation" : CORA.gui.createSpanWithClassName("workPresentation"),
			"activateMethod" : function() {
			},
			"removeMenuMethod" : function() {
			},
			"removeWorkMethod" : function() {
			}
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.type, "managedGuiItem");
});

QUnit.test("testInitMenuViewIsFromFactoredView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var menuView = managedGuiItem.getMenuView();

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(menuView, factoredView.getMenuView());
});

QUnit.test("testInitMenuPresentationViewIsFromSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedMenuPresentation(0), this.spec.menuPresentation);
});

QUnit.test("testInitWorkViewIsFromFactoredView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	var workView = managedGuiItem.getWorkView();

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(workView, factoredView.getWorkView());
});

QUnit.test("testInitWorkPresentationViewIsFromSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getAddedWorkPresentation(0), this.spec.workPresentation);
});

QUnit.test("testGetDependencies", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	assert.strictEqual(managedGuiItem.getSpec(), this.spec);
});

QUnit.test("testHandleBy", function(assert) {
	var handleByIsCalled = false;
	var handleByCalledWith = "";
	this.spec.handleBy = function(stuff) {
		handleByIsCalled = true;
		handleByCalledWith = stuff;
	}
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
	managedGuiItem.handleBy("someThing");
	assert.ok(handleByIsCalled);
	assert.strictEqual(handleByCalledWith, "someThing");
});

QUnit.test("testActivateMethodPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getSpec().activateMethod, this.spec.activateMethod);
});

QUnit.test("testRemoveMenuMethodPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getSpec().removeMenuMethod, this.spec.removeMenuMethod);
});

QUnit.test("testRemoveWorkMethodPassedOnToView", function(assert) {
	var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);

	var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
	assert.strictEqual(factoredView.getSpec().removeWorkMethod, this.spec.removeWorkMethod);
});

// QUnit.test("testAddMenuPresentationPassedOnToView", function(assert) {
// var managedGuiItem = CORA.managedGuiItem(this.dependencies, this.spec);
//	
// var factoredView = this.dependencies.managedGuiItemViewFactory.getFactored(0);
//	
// managedGuiItem.addMenuPresentation();
// CORA.gui.createSpanWithClassName("menuPresentation")
// assert.strictEqual(factoredView..removeMenuMethod, this.spec.removeMenuMethod);
//	
// });

