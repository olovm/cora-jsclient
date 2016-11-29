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

QUnit.module("pVarViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.spec = {
			"mode" : "input",
			"outputFormat" : "text",
			"presentationId" : "somePresentationId",
			"info" : {
				"text" : "someText",
				"defText" : "someDefText",
				"technicalInfo" : [ "textId: " + "textId", "defTextId: " + "defTextId",
						"metadataId: " + "metadataId" ]
			}
		};

		this.pVarView;
		this.getPVarView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView;
		};
		this.getView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView.getView();
		};
		this.getValueView = function() {
			if (this.pVarView === undefined) {
				this.pVarView = CORA.pVarView(this.dependencies, this.spec);
			}
			return this.pVarView.getView().childNodes[1];
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var pVarView = this.getPVarView();
	assert.strictEqual(pVarView.type, "pVarView");
	assert.ok(this.pVarView);
});

QUnit.test("getSpec", function(assert) {
	var pVarView = this.getPVarView();
	assert.strictEqual(pVarView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	var pVarView = this.getPVarView();
	assert.strictEqual(pVarView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testInfoSpec", function(assert) {
	var expectedSpec = {
		"appendTo" : {},
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
		} ]
	};
	var pVarView = this.getPVarView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	var expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	var pVarView = this.getPVarView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testInfoPlaced", function(assert) {
	var view = this.getView();
	var infoSpan = view.childNodes[0];
	assert.equal(infoSpan.className, "infoSpySpan");
});

QUnit.test("testInput", function(assert) {
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "INPUT");
	assert.strictEqual(valueView.type, "text");
});

QUnit.test("testInputOnblur", function(assert) {
	var valueFromView = "";
	this.spec.onblurFunction = function(value) {
		valueFromView = value;
	};

	var pVarView = this.getPVarView();
	pVarView.setValue("a Value");
	var valueView = this.getValueView();
	valueView.onblur();
	assert.strictEqual(valueFromView, "a Value");
});

QUnit.test("testOutputText", function(assert) {
	this.spec.mode = "output";
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "SPAN");
});

QUnit.test("testOutputImage", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "image";
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "IMG");
});

QUnit.test("testSetValueInput", function(assert) {
	var pVarView = this.getPVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.value, "");
	pVarView.setValue("a Value");
	assert.strictEqual(valueView.value, "a Value");
});

QUnit.test("testSetValueOutputText", function(assert) {
	this.spec.mode = "output";
	var pVarView = this.getPVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.innerHTML, "");
	pVarView.setValue("a Value");
	assert.strictEqual(valueView.innerHTML, "a Value");
});

QUnit.test("testSetValueOutputImage", function(assert) {
	this.spec.mode = "output";
	this.spec.outputFormat = "image";
	var pVarView = this.getPVarView();
	var valueView = this.getValueView();

	assert.strictEqual(valueView.src, "");
	pVarView.setValue("http://www.some.domain.nu/image01.jpg");
	assert.strictEqual(valueView.src, "http://www.some.domain.nu/image01.jpg");
});
