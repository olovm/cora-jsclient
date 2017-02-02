/*
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

QUnit.module("loginManagerViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"textProvider" : CORATEST.textProviderSpy()
		};
		this.spec = {
		};

		this.loginManagerView;
		this.getLoginManagerView = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView;
		};
		this.getHtml = function() {
			if (this.loginManagerView === undefined) {
				this.loginManagerView = CORA.loginManagerView(this.dependencies, this.spec);
			}
			return this.loginManagerView.getHtml();
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var loginManagerView = this.getLoginManagerView();
	assert.strictEqual(loginManagerView.type, "loginManagerView");
	assert.ok(this.loginManagerView);
});

//QUnit.test("getSpec", function(assert) {
//	var pVarView = this.getPVarView();
//	assert.strictEqual(pVarView.getSpec(), this.spec);
//});
//
//QUnit.test("getDependencies", function(assert) {
//	var pVarView = this.getPVarView();
//	assert.strictEqual(pVarView.getDependencies(), this.dependencies);
//});

QUnit.test("getHtml", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.className, "loginManagerView");
});

QUnit.test("testText", function(assert) {
	var view = this.getHtml();
	assert.strictEqual(view.textContent, "theClient_loginMenuText");
	assert.strictEqual(this.dependencies.textProvider.getFetchedTextIdNo(0), "theClient_loginMenuText");
}); 

//QUnit.test("testInfoSpec", function(assert) {
//	var expectedSpec = {
//		"appendTo" : {},
//		"level1" : [ {
//			"className" : "textView",
//			"text" : "someText"
//		}, {
//			"className" : "defTextView",
//			"text" : "someDefText"
//		} ],
//		"level2" : [ {
//			"className" : "technicalView",
//			"text" : "textId: textId"
//		}, {
//			"className" : "technicalView",
//			"text" : "defTextId: defTextId"
//		}, {
//			"className" : "technicalView",
//			"text" : "metadataId: metadataId"
//		} ]
//	};
//	var pVarView = this.getPVarView();
//	var infoSpy = this.dependencies.infoFactory.getFactored(0);
//	var usedSpec = infoSpy.getSpec();
//	assert.stringifyEqual(usedSpec, expectedSpec);
//	assert.strictEqual(usedSpec.appendTo, this.getHtml());
//	assert.strictEqual(usedSpec.afterLevelChange, pVarView.updateClassName);
//
//});
//QUnit.test("testInfoButtonAddedToView", function(assert) {
//	var view = this.getHtml();
//	assert.strictEqual(view.childNodes[2].className, "infoButtonSpy");
//
//});
//
//QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
//	this.spec.info.technicalInfo = null;
//	var expectedSpec = {
//		"appendTo" : {},
//		"level1" : [ {
//			"className" : "textView",
//			"text" : "someText"
//		}, {
//			"className" : "defTextView",
//			"text" : "someDefText"
//		} ]
//	};
//	var pVarView = this.getPVarView();
//	var infoSpy = this.dependencies.infoFactory.getFactored(0);
//	var usedSpec = infoSpy.getSpec();
//	assert.stringifyEqual(usedSpec, expectedSpec);
//});
//
//QUnit.test("testInfoPlaced", function(assert) {
//	var view = this.getHtml();
//	var infoSpan = view.childNodes[0];
//	assert.equal(infoSpan.className, "infoSpySpan");
//});
//
//QUnit.test("testActiveInfoShownInClassName", function(assert) {
//	var pVarView = this.getPVarView();
//	var view = this.getHtml();
//	var infoSpy = this.dependencies.infoFactory.getFactored(0);
//	assert.strictEqual(view.className, "pVar somePresentationId");
//	infoSpy.setInfoLevel(0);
//	pVarView.updateClassName();
//	assert.strictEqual(view.className, "pVar somePresentationId");
//	infoSpy.setInfoLevel(1);
//	pVarView.updateClassName();
//	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
//	infoSpy.setInfoLevel(0);
//	pVarView.updateClassName();
//	assert.strictEqual(view.className, "pVar somePresentationId");
//});
//
//QUnit.test("testStateShownInClassName", function(assert) {
//	var pVarView = this.getPVarView();
//	var view = this.getHtml();
//	var infoSpy = this.dependencies.infoFactory.getFactored(0);
//	assert.strictEqual(view.className, "pVar somePresentationId");
//	pVarView.setState("error");
//	assert.strictEqual(view.className, "pVar somePresentationId error");
//	infoSpy.setInfoLevel(1);
//	pVarView.updateClassName();
//	assert.strictEqual(view.className,
//			"pVar somePresentationId error infoActive");
//	pVarView.setState("ok");
//	assert.strictEqual(view.className, "pVar somePresentationId infoActive");
//});
//
//QUnit.test("testInput", function(assert) {
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.nodeName, "INPUT");
//	assert.strictEqual(valueView.type, "text");
//});
//
//QUnit.test("testInputUnknownTypeIsText", function(assert) {
//	this.spec.inputType = undefined;
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.nodeName, "INPUT");
//	assert.strictEqual(valueView.type, "text");
//});
//
//QUnit.test("testInputTypeTextArea", function(assert) {
//	this.spec.inputType = "textarea";
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.nodeName, "TEXTAREA");
//	assert.strictEqual(valueView.type, "textarea");
//});
//
//QUnit.test("testInputPlaceholder", function(assert) {
//	this.spec.placeholderText = "placeholderText";
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.placeholder, "placeholderText");
//});
//
//QUnit.test("testInputOnblur", function(assert) {
//	var valueFromView = "";
//	this.spec.onblurFunction = function(value) {
//		valueFromView = value;
//	};
//
//	var pVarView = this.getPVarView();
//	pVarView.setValue("a Value");
//	var valueView = this.getValueView();
//	valueView.onblur();
//	assert.strictEqual(valueFromView, "a Value");
//});
//
//QUnit.test("testOutputText", function(assert) {
//	this.spec.mode = "output";
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.nodeName, "SPAN");
//});
//
//QUnit.test("testOutputImage", function(assert) {
//	this.spec.mode = "output";
//	this.spec.outputFormat = "image";
//	var valueView = this.getValueView();
//	assert.strictEqual(valueView.nodeName, "IMG");
//});
//
//QUnit.test("testSetValueInput", function(assert) {
//	var pVarView = this.getPVarView();
//	var valueView = this.getValueView();
//
//	assert.strictEqual(valueView.value, "");
//	pVarView.setValue("a Value");
//	assert.strictEqual(valueView.value, "a Value");
//});
//
//QUnit.test("testSetValueOutputText", function(assert) {
//	this.spec.mode = "output";
//	var pVarView = this.getPVarView();
//	var valueView = this.getValueView();
//
//	assert.strictEqual(valueView.innerHTML, "");
//	pVarView.setValue("a Value");
//	assert.strictEqual(valueView.innerHTML, "a Value");
//});
//
//QUnit.test("testSetValueOutputImage", function(assert) {
//	this.spec.mode = "output";
//	this.spec.outputFormat = "image";
//	var pVarView = this.getPVarView();
//	var valueView = this.getValueView();
//
//	assert.strictEqual(valueView.src, "");
//	pVarView.setValue("http://www.some.domain.nu/image01.jpg");
//	assert.strictEqual(valueView.src, "http://www.some.domain.nu/image01.jpg");
//});
