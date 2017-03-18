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
			}
		};

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
	assert.strictEqual(view.className, "pRecordLink somePresentationId");
});

QUnit.test("testChildrenViewIsCreatedOnInit", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.className, "childrenView");
});

QUnit.test("testAddChild", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var child = document.createElement("SPAN");
	pRecordLinkView.addChild(child);
	var childrenView = view.childNodes[1];
	assert.strictEqual(childrenView.childNodes[0], child);
});

QUnit.test("testHideChildrenView", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	this.fixture.appendChild(view);
	var child = document.createElement("SPAN");
	pRecordLinkView.addChild(child);
	var childrenView = view.childNodes[1];
	assert.visible(childrenView);
	pRecordLinkView.hideChildren();
	assert.notVisible(childrenView);
}); 

QUnit.test("testAddLinkedPresentation", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var linkedPresentation = document.createElement("SPAN");
	pRecordLinkView.addLinkedPresentation(linkedPresentation);
	assert.strictEqual(view.childNodes[2], linkedPresentation);
});

QUnit.test("testInfoSpec", function(assert) {
	var expectedSpec = {
//		"appendTo" : {},
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
		} ],"insertAfter":{}
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
	assert.strictEqual(view.childNodes[0].className, "infoButtonSpy");
});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	var expectedSpec = {
//		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],"insertAfter":{}
	};
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

//QUnit.test("testInfoPlaced", function(assert) {
//	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
//	var view = pRecordLinkView.getView();
//	var infoSpan = view.childNodes[0];
//	assert.equal(infoSpan.className, "infoSpySpan");
//});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
	var view = pRecordLinkView.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pRecordLink somePresentationId");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink somePresentationId");
	infoSpy.setInfoLevel(1);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink somePresentationId infoActive");
	infoSpy.setInfoLevel(0);
	pRecordLinkView.updateClassName();
	assert.strictEqual(view.className, "pRecordLink somePresentationId");
}); 



//QUnit.test("testInputCreated", function(assert) {
//	var pRecordLinkView = CORA.pRecordLinkView(this.dependencies, this.spec);
//	var view = pRecordLinkView.getView();
//	this.dependencies.presentationFactory : CORATEST.presentationFactorySpy(),
//	
//	assert.strictEqual(view.className, "pRecordLink somePresentationId");
//	
//});
