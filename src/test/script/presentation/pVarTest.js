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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPVarFactory = function(metadataProvider, pubSub, textProvider, jsBookkeeper,
			fixture, pVarViewFactory) {
		var factor = function(path, metadataIdUsedInData, pVarPresentationId) {
			var cPVarPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pVarPresentationId));
			var dependencies = {
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"jsBookkeeper" : jsBookkeeper,
					"pVarViewFactory" : pVarViewFactory
				};
			var spec = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPVarPresentation
			};
			var pVar = CORA.pVar(dependencies, spec);
			return {
				spec : spec,
				pVar : pVar,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testVariableSubscription = function(attachedPVar, assert) {
		var subscriptions = attachedPVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 2);

		var firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, {});
		var pVar = attachedPVar.pVar;
		assert.ok(firstSubsription.functionToCall === pVar.handleMsg);

		var secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, {});
		var pVar = attachedPVar.pVar;
		assert.ok(secondSubsription.functionToCall === pVar.handleValidationError);

	};

	coraTest.testVariableMetadata = function(attachedPVar, assert) {
		var pVar = attachedPVar.pVar;
		assert.strictEqual(pVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pVar.getDefText(), "Detta är en exempeldefinition "
				+ "för en textvariabel.");
		assert.strictEqual(pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
	};

	coraTest.testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};
	coraTest.testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
	};
	return coraTest;
}(CORATEST || {}));

QUnit.module("pVarTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pVarViewFactory = CORATEST.pVarViewFactorySpy();
		this.pVarFactory = CORATEST.attachedPVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.jsBookkeeper, this.fixture, this.pVarViewFactory);
	},
	afterEach : function() {
	}
});

QUnit.test("testGetSpec", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.getSpec(), attachedPVar.spec);
});

QUnit.test("testInitText", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"inputType" : "input",
		"mode" : "input",
		"outputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push("textId: textVariableIdText",
			"defTextId: textVariableIdDefText", "metadataId: textVariableId",
			"nameInData: textVariableId",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", "presentationId: pVarTextVariableId");
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testGetRegexpShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
	var pVarTextVariableId2 = this.metadataProvider.getMetadataById("pVarTextVariableId2");
	var presentationOf2 = pVarTextVariableId2.children[1].children[1].value;
	var textVariableId2 = this.metadataProvider.getMetadataById(presentationOf2);
	assert.strictEqual(textVariableId2.children[0].value, "(^[0-9A-Za-z]{2,50}$)");

	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId2");
	assert.strictEqual(attachedPVar.pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
});

QUnit.test("testInitTextArea", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "textVariableIdTextAreaPVar");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"inputType" : "textarea",
		"mode" : "input",
		"outputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "textVariableIdTextAreaPVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push("textId: textVariableIdText",
			"defTextId: textVariableIdDefText", "metadataId: textVariableId",
			"nameInData: textVariableId",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", "presentationId: textVariableIdTextAreaPVar");
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"textVariableIdShowTextAreaFalsePVar");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"inputType" : "input",
		"mode" : "input",
		"outputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "textVariableIdShowTextAreaFalsePVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push("textId: textVariableIdText",
			"defTextId: textVariableIdDefText", "metadataId: textVariableId",
			"nameInData: textVariableId",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", "presentationId: textVariableIdShowTextAreaFalsePVar");
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testSetValueInput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	attachedPVar.pVar.setValue("A Value");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testHandleMessage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A new value");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	pVarViewSpy.callOnblurWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);

});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "error");
	assert.equal(attachedPVar.pVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testHandleValidationError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");
});

QUnit.test("testInitTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableIdOutput");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"inputType" : "input",
		"mode" : "output",
		"outputFormat" : "text",
		"presentationId" : "pVarTextVariableIdOutput"
	};
	expectedPVarViewSpec.info.technicalInfo.push("textId: textVariableIdText",
			"defTextId: textVariableIdDefText", "metadataId: textVariableId",
			"nameInData: textVariableId",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", "presentationId: pVarTextVariableIdOutput");
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testInitTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"pVarTextVariableIdOutputImage");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"inputType" : "input",
		"mode" : "output",
		"outputFormat" : "image",
		"presentationId" : "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push("textId: textVariableIdText",
			"defTextId: textVariableIdDefText", "metadataId: textVariableId",
			"nameInData: textVariableId",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", "presentationId: pVarTextVariableId");
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableIdOutput");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("A Value");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testSetValueTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"pVarTextVariableIdOutputImage");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("http://www.some.domain.nu/image01.jpg");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "http://www.some.domain.nu/image01.jpg");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");

	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	assert.equal(pVarViewSpy.getState(), "ok");
});