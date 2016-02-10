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

QUnit.module("CORA.pVar", {
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
		assert.deepEqual(subscriptions.length, 1);

		var firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, {});
		var pVar = attachedPVar.pVar;
		assert.ok(firstSubsription.functionToCall === pVar.handleMsg);
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
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "INPUT");
	assert.equal(valueView.type, "text");
	assert.equal(valueView.value, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitCollection", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownPVar");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownPVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SELECT");
	assert.equal(valueView.type, "select-one");
	// assert.equal(valueView.value, "");

	var options = valueView.childNodes;
	assert.equal(options[0].nodeName, "OPTION");
	assert.equal(options[0].text, "");
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

QUnit.test("testSetValueInput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.pVar.setValue("A Value");
	assert.equal(attachedPVar.valueView.value, "A Value");
});

QUnit.test("testValueViewHasOnBlurHandler", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	assert.ok(attachedPVar.valueView.onblur === attachedPVar.pVar.onBlur);
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej####/(&/%&/¤/";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutput");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.innerHTML, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testInitCollectionOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
	assert.deepEqual(attachedPVar.view.className, "pVar yesNoUnknownOutputPVar");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
	"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");
	
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

QUnit.test("testSetValueCollectionOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "yesNoUnknownOutputPVar");
	var valueView = attachedPVar.valueView;
	
	attachedPVar.pVar.setValue("yes");
	assert.equal(valueView.innerHTML, "Ja");
	attachedPVar.pVar.setValue("no");
	assert.equal(valueView.innerHTML, "Nej");
});
