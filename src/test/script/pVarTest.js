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
	coraTest.attachedPVarFactory = function(metadataProvider, pubSub, textProvider, fixture) {
		var factor = function(path, pVarPresentationId) {
			var cPVarPresentation = new CORA.CoraData(metadataProvider
					.getMetadataById(pVarPresentationId));

			var spec = {
				"path" : path,
				"cPresentation" : cPVarPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
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
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.pVarFactory = CORATEST.attachedPVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.fixture);
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
		assert.strictEqual(pVar.getRegEx(), "(^[0-9A-Za-z]{2,50}$)");
	};
	return coraTest;
}(CORATEST || {}));

QUnit.test("testInit", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");

	var valueView = attachedPVar.valueView;
	assert.equal(valueView.nodeName, "INPUT");
	assert.equal(valueView.value, "");

	CORATEST.testVariableSubscription(attachedPVar, assert);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");
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
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "");
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "ok");
	assert.equal(attachedPVar.view.className, "");
});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableId");
	attachedPVar.valueView.value = "hej####/(&/%&/¤/";
	attachedPVar.valueView.onblur();
	assert.equal(attachedPVar.pVar.getState(), "error");
	assert.ok(new RegExp("^(.*\\s)*error(\\s.*)*$").test(attachedPVar.view.className));
});

QUnit.test("testInitOutput", function(assert) {
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

QUnit.test("testSetValueOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pVarTextVariableIdOutput");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");
});
