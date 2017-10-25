/*
 * Copyright 2017 Olov McKie
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

QUnit.module("pRecordLinkViewTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy(),
			"presentationFactory" : CORATEST.presentationFactorySpy()

		};
		this.spec = {
			"presentationId" : "somePresentationId",
			"mode" : "input",
			"info" : {
				"text" : "someText",
				"defText" : "someDefText",
				"technicalInfo" : [ "textId: " + "textId", "defTextId: " + "defTextId",
						"metadataId: " + "metadataId" ]
			},
			"pRecordLink" : CORATEST.pRecordLinkSpy()
		};
		this.getChildrenViewFromView = function(view) {
			return view.childNodes[1];
		}
		this.defaultLastChildPosition = 1;

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.type, "pRecordLinkView");
});

QUnit.test("testGetDependencies", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	assert.strictEqual(pRecordLinkView.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	assert.strictEqual(view.className, "pRecordLink");
});

QUnit.test("testChildrenViewIsCreatedOnInit", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.className, "childrenView");
});

QUnit.test("testAddChild", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var child = document.createElement("SPAN");
	pRecordLinkView.addChild(child);
	var childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.childNodes[0], child);
});

QUnit.test("testHideChildrenView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	this.fixture.appendChild(view);
	var child = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	child.appendChild(content);
	pRecordLinkView.addChild(child);
	var childrenView = this.getChildrenViewFromView(view);
	assert.visible(childrenView);
	pRecordLinkView.hideChildren();
	assert.notVisible(childrenView);
});

QUnit.test("testAddLinkedPresentation", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], linkedPresentation);
});

QUnit.test("testAddSecondLinkedPresentationRemovesFirst", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();

	var linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);

	var linkedPresentation2 = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation2);
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], linkedPresentation2);
});

QUnit.test("testRemoveLinkedPresentationRemovesFirst", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	
	var linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);
	
	pRecordLinkView.removeLinkedPresentation();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], undefined);
});

QUnit.test("testRemoveNonExistingLinkedPresentationRemovesFirst", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	
	pRecordLinkView.removeLinkedPresentation();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1], undefined);
});



QUnit.test("testInfoSpec", function(assert) {
	var expectedSpec = {
		// "appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],
		"level2" : [ {
			"className" : "technicalView",
			"text" : "textId: textId"
		}, {
			"className" : "technicalView",
			"text" : "defTextId: defTextId"
		}, {
			"className" : "technicalView",
			"text" : "metadataId: metadataId"
		} ],
		"insertAfter" : {}
	};
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.insertAfter, infoSpy.getButton());
	assert.strictEqual(usedSpec.afterLevelChange, pRecordLinkView.updateClassName);

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition - 1].className,
			"infoButtonSpy");
});

QUnit.test("testOpenLinkedRecordAddedToView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
	pRecordLinkView.showOpenLinkedRecord();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 2);
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1].className,
			"iconButton openLinkedRecordButton");
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	pRecordLinkView.showOpenLinkedRecord();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 2);
	var view = pRecordLinkView.getView();
	assert.strictEqual(view.childNodes[this.defaultLastChildPosition + 1].className,
			"iconButton openLinkedRecordButton");
});

QUnit.test("testOpenLinkedRecordRemovedFromView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
	pRecordLinkView.showOpenLinkedRecord();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 2);
	var openButton = view.childNodes[this.defaultLastChildPosition + 1];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");
	pRecordLinkView.hideOpenLinkedRecord();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
});

QUnit.test("testOpenLinkedRecordRemovedFromViewWhenNotPresent", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
//	pRecordLinkView.showOpenLinkedRecord();
//	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 2);
//	var openButton = view.childNodes[this.defaultLastChildPosition + 1];
//	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");
	pRecordLinkView.hideOpenLinkedRecord();
	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 1);
});

QUnit.test("testAddChildPresentationClickableLoadInBackground", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	pRecordLinkView.showOpenLinkedRecord();
	var view = pRecordLinkView.getView();
	var openButton = view.childNodes[this.defaultLastChildPosition + 1];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	openButton.onclick(event);

	assert.strictEqual(this.spec.pRecordLink.getOpenLinkedRecord(0).loadInBackground, "true");
});
QUnit.test("testAddChildPresentationClickableLoadInForground", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	pRecordLinkView.showOpenLinkedRecord();
	var view = pRecordLinkView.getView();
	var openButton = view.childNodes[this.defaultLastChildPosition + 1];
	assert.strictEqual(openButton.className, "iconButton openLinkedRecordButton");

	var event = document.createEvent('Event');
	// event.ctrlKey = true;
	openButton.onclick(event);

	assert.strictEqual(this.spec.pRecordLink.getOpenLinkedRecord(0).loadInBackground, "false");
});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	var expectedSpec = {
		// "appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],
		"insertAfter" : {}
	};
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pRecordLink");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink");
	infoSpy.setInfoLevel(1);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink infoActive");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink");
});

QUnit.test("testAddSearchHandlerView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);

	assert.strictEqual(childrenView.childNodes[0], fakeSearchHandlerView);
});

QUnit.test("testHideSearchHandlerView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);
	pRecordLinkView.hideSearchHandlerView();

	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.childNodes[0], undefined);
});

QUnit.test("testHideNonExistingSearchHandlerView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);

	pRecordLinkView.hideSearchHandlerView();

	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);
	assert.strictEqual(childrenView.childNodes[0], undefined);
});

QUnit.test("testShowSearchHandlerView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);
	pRecordLinkView.hideSearchHandlerView();

	assert.strictEqual(childrenView.childNodes[0], undefined);

	pRecordLinkView.showSearchHandlerView();
	assert.strictEqual(childrenView.childNodes[0], fakeSearchHandlerView);
});

QUnit.test("testShowNonExistingSearchHandlerView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);

	pRecordLinkView.showSearchHandlerView();
	assert.strictEqual(childrenView.childNodes[0], undefined);
});

QUnit.test("testShowSearchButtonAddedToView", function(assert) {
	var fakeSearchHandlerView = document.createElement("SPAN");
	var content = document.createTextNode(JSON
			.stringify("content needed for span to be visible in chrome"));
	fakeSearchHandlerView.appendChild(content);
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = this.getChildrenViewFromView(view);

	pRecordLinkView.addSearchHandlerView(fakeSearchHandlerView);

	assert.strictEqual(view.childNodes.length, this.defaultLastChildPosition + 2);
	var showSearchButton = view.childNodes[this.defaultLastChildPosition];
	assert.strictEqual(showSearchButton.className, "iconButton showSearchButton");
	assert.strictEqual(childrenView.childNodes[0], fakeSearchHandlerView);

	var event = document.createEvent('Event');
	showSearchButton.onclick(event);
	assert.strictEqual(childrenView.childNodes[0], undefined);

	showSearchButton.onclick(event);
	assert.strictEqual(childrenView.childNodes[0], fakeSearchHandlerView);
});
