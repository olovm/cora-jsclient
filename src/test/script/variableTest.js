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
	coraTest.attachedVariableFactory = function(metadataProvider, pubSub, textProvider, fixture) {
		var factor = function(path, metadataId, mode) {
			var spec = {
				"newPath" : path,
				"metadataId" : metadataId,
				"mode" : mode,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider":textProvider
			};
			var variable = CORA.variable(spec);
			var view = variable.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				variable : variable,
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

QUnit.module("CORA.Variable", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.attachedVariableFactory = CORATEST.attachedVariableFactory(this.metadataProvider,
				this.pubSub, this.textProvider, this.fixture);

	},
	afterEach : function() {
	}
});

QUnit.test("testInitInput", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "input");
	var variable = attachedVariable.variable;
	assert.ok(attachedVariable.view !== undefined);
	var valueView = attachedVariable.valueView;

	assert.equal(valueView.value, "");

	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.deepEqual(firstSubsription.type, "setValue");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === variable.handleMsg);
});

QUnit.test("testSetValueInput", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "input");
	attachedVariable.variable.setValue("A Value");
	assert.equal(attachedVariable.valueView.value, "A Value");
});

QUnit.test("testInitOutput", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "output");
	var valueView = attachedVariable.valueView;
	assert.equal(valueView.nodeName, "SPAN");
	assert.equal(valueView.innerHTML, "");
});

QUnit.test("testSetValueOutput", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "output");
	var valueView = attachedVariable.valueView;

	attachedVariable.variable.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");
});