/*
 * Copyright 2016 Uppsala University Library
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
	coraTest.attachedPVarFactory = function(metadataProvider, pubSub, textProvider, jsBookkeeper,
			fixture) {
		var factor = function(path, pVarPresentationId) {
			var cPVarPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pVarPresentationId));

			var spec = {
				"path" : path,
				"cPresentation" : cPVarPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			var pVar = CORA.pVar(spec);
			var view = pVar.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				pVar : pVar,
				fixture : fixture,
				valueView : valueView,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
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
		this.pVarFactory = CORATEST.attachedPVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.jsBookkeeper, this.fixture);
	},
	afterEach : function() {
	}
});

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

QUnit.test("testInitText", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "INPUT");
	assert.equal(valueView.type, "text");
	assert.equal(valueView.value, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextArea", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableIdTextAreaPVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar textVariableIdTextAreaPVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar);
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "TEXTAREA");
	assert.equal(valueView.value, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextShowTextAreaFalse", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableIdShowTextAreaFalsePVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar textVariableIdShowTextAreaFalsePVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
		"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "INPUT");
	assert.equal(valueView.type, "text");
	assert.equal(valueView.value, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitInfoButtonTextVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	
	var infoButton = view.childNodes[1];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "infoButton");

	var event = document.createEvent('Event');
	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 3);

	var infoView = view.childNodes[2];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"Exempel textvariabel", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"Detta är en exempeldefinition för en textvariabel.", assert);

	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 6);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: textVariableIdText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: textVariableIdDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: textVariableId", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "regExView",
			"regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", assert);

	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 2);

	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 3);
});

QUnit.test("testInitInfoButtonCollectionVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownPCollVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownPCollVar");
	var view = attachedPVar.view;
	var infoButton = view.childNodes[1];

	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "infoButton");

	var event = document.createEvent('Event');
	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPVar.view.className));
	assert.equal(view.childNodes.length, 3);

	var infoView = view.childNodes[2];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"Exempel collectionVariable", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"Exempel collectionVariable, är en variabel "
					+ "där man kan välja mellan ja, nej och okänt", assert);

	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPVar.view.className));
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 5);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: yesNoUnknownVarText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: yesNoUnknownVarDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: yesNoUnknownVar", assert);
	
	infoButton.onclick(event);
	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPVar.view.className));
	assert.equal(view.childNodes.length, 2);

	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPVar.view.className));
	assert.equal(view.childNodes.length, 3);
});

QUnit.test("testInitCollection", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownPCollVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownPCollVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	// assert.equal(valueView.value, "");

	var options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "-- Gör ett val ur listan --");
	assert.equal(options[0].value, "");
	assert.equal(options[0].selected, true);

	assert.equal(options[1].nodeName, "OPTION");
	assert.equal(options[1].text, "Ja");
	assert.equal(options[1].value, "yes");

	CORATEST.testVariableSubscription(attachedPVar, assert);

	var pVar = attachedPVar.pVar;
	assert.strictEqual(pVar.getText(), "Exempel collectionVariable");
	assert.strictEqual(pVar.getDefText(), "Exempel collectionVariable, är en variabel "
			+ "där man kan välja mellan ja, nej och okänt");

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitCollectionNoEmptyTextId", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownNoEmptyTextIdPVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownNoEmptyTextIdPVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	// assert.equal(valueView.value, "");

	var options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "Ja");
	assert.equal(options[0].value, "yes");

	CORATEST.testVariableSubscription(attachedPVar, assert);

	var pVar = attachedPVar.pVar;
	assert.strictEqual(pVar.getText(), "Exempel collectionVariable");
	assert.strictEqual(pVar.getDefText(), "Exempel collectionVariable, är en variabel "
			+ "där man kan välja mellan ja, nej och okänt");

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testSetValueInput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.pVar.setValue("A Value");
	assert.equal(attachedPVar.valueView.value, "A Value");
});

QUnit.test("testHandleMessage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	assert.equal(attachedPVar.valueView.value, "A new value");
});

QUnit.test("testValueViewHasOnBlurHandler", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	assert.ok(attachedPVar.valueView.onblur === attachedPVar.pVar.onBlur);
});

QUnit.test("testChangedValueMissing", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	attachedPVar.valueView.value = null;
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	attachedPVar.valueView.value = "";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "pVar pVarTextVariableId");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "pVar pVarTextVariableId");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	attachedPVar.valueView.onblur();
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);

});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej####/(&/%&/¤/";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);

	var event = document.createEvent('Event');
	var view = attachedPVar.view;
	var infoButton = view.childNodes[1];
	infoButton.onclick(event);
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(attachedPVar.view.className));

});

QUnit.test("testHandleValidationError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
});

QUnit.test("testInitTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutput");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.innerHTML, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);
});
QUnit.test("testInitTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutputImage");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "IMG");
	assert.equal(valueView.src, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testInitCollectionOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownOutputPVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length, 2);

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.innerHTML, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutput");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");
});
QUnit.test("testSetValueTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutputImage");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("http://www.some.domain.nu/image01.jpg");
	assert.equal(valueView.src, "http://www.some.domain.nu/image01.jpg");
});

QUnit.test("testSetValueCollectionOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("yes");
	assert.equal(valueView.innerHTML, "Ja");
	attachedPVar.pVar.setValue("no");
	assert.equal(valueView.innerHTML, "Nej");
});

QUnit.test("testSetValueCollectionOutputEmptyTextId", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("no");
	assert.equal(valueView.innerHTML, "Nej");
	attachedPVar.pVar.setValue("");
	assert.equal(valueView.innerHTML, "");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));

	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);

	assert.strictEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
});
