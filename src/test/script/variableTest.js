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
	coraTest.variableFactory = function(metadataProvider, pubSub) {
		var factor = function(path, metadataId, mode) {
			var spec = {
				"newPath" : path,
				"metadataId" : metadataId,
				"mode" : mode,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			return CORA.variable(spec);
		};
		return Object.freeze({
			factor : factor
		});
	};

	coraTest.attachedVariableFactory = function(metadataProvider, pubSub, fixture) {
		var factor = function(path, metadataId, mode) {
			var spec = {
				"newPath" : path,
				"metadataId" : metadataId,
				"mode" : mode,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var variable = CORA.variable(spec);
			var view = variable.getView();
			fixture.appendChild(view);
			var htmlTag = view.firstChild;
			return {
				variable : variable,
				fixture : fixture,
				htmlTag : htmlTag,
				metadataProvider : metadataProvider,
				pubSub : pubSub
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
		this.variableFactory = CORATEST.variableFactory(this.metadataProvider, this.pubSub);
		this.attachedVariableFactory = CORATEST.attachedVariableFactory(this.metadataProvider,
				this.pubSub, this.fixture);

	},
	afterEach : function() {
	}
});

QUnit.test("testInitInput", function(assert) {
	var variable = this.variableFactory.factor({}, "textVariableId", "input");
	var view = variable.getView();
	assert.ok(view !== undefined);
	this.fixture.appendChild(view);
	var htmlInputTag = view.firstChild;

	assert.equal(htmlInputTag.value, "");

	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.deepEqual(firstSubsription.type, "setValue");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === variable.handleMsg);
});
QUnit.test("testInitInput2", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "input");
	var variable = attachedVariable.variable;
	var view = variable.getView();
	assert.ok(view !== undefined);
	// this.fixture.appendChild(view);
	// var htmlInputTag = view.firstChild;
	var htmlInputTag = attachedVariable.htmlTag;

	assert.equal(htmlInputTag.value, "");

	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.deepEqual(firstSubsription.type, "setValue");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === variable.handleMsg);
});

QUnit.test("testSetValueInput", function(assert) {
	var variable = this.variableFactory.factor({}, "textVariableId", "input");
	var view = variable.getView();
	this.fixture.appendChild(view);
	var htmlInputTag = view.firstChild;

	variable.setValue("A Value");
	assert.equal(htmlInputTag.value, "A Value");
});
QUnit.test("testSetValueInput2", function(assert) {
	var attachedVariable = this.attachedVariableFactory.factor({}, "textVariableId", "input");
	// var variable = this.variableFactory.factor({}, "textVariableId", "input");
	// var view = variable.getView();
	// this.fixture.appendChild(view);
	// var htmlInputTag = view.firstChild;

	attachedVariable.variable.setValue("A Value");
	assert.equal(attachedVariable.htmlTag.value, "A Value");
});

QUnit.test("testInitOutput", function(assert) {
	var variable = this.variableFactory.factor({}, "textVariableId", "output");
	var view = variable.getView();
	this.fixture.appendChild(view);
	var htmlOutputSpan = view.firstChild;

	assert.equal(htmlOutputSpan.nodeName, "SPAN");
	assert.equal(htmlOutputSpan.innerHTML, "");
});

QUnit.test("testSetValueOutput", function(assert) {
	var variable = this.variableFactory.factor({}, "textVariableId", "output");
	var view = variable.getView();
	this.fixture.appendChild(view);
	var htmlOutputSpan = view.firstChild;

	variable.setValue("A Value");
	assert.equal(htmlOutputSpan.innerHTML, "A Value");
});

QUnit.test("testIntegrateCoraPubSub", function(assert) {
	var pubSub = new CORA.PubSub();
	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "testVar"
		} ]
	};
	var spec = {
		"newPath" : path,
		"metadataId" : "textVariableId",
		"mode" : "output",
		"metadataProvider" : new MetadataProviderStub(),
		"pubSub" : pubSub
	};
	var variable = CORA.variable(spec);
	var view = variable.getView();
	this.fixture.appendChild(view);
	var htmlOutputSpan = view.firstChild;

	variable.setValue("A Value");
	assert.equal(htmlOutputSpan.innerHTML, "A Value");

	var type = "setValue";

	var data = {
		"data" : "A new value",
		"path" : path
	};
	pubSub.publish(type, data);

	assert.equal(htmlOutputSpan.innerHTML, "A new value");
	// ****
	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData2",
			"value" : "testVar"
		} ]
	};
	var spec2 = {
		"newPath" : path2,
		"metadataId" : "textVariableId",
		"mode" : "output",
		"metadataProvider" : new MetadataProviderStub(),
		"pubSub" : pubSub
	};
	var variable2 = CORA.variable(spec2);

	var view2 = variable2.getView();
	this.fixture.appendChild(view2);
	var htmlOutputSpan2 = view2.firstChild;

	variable2.setValue("A Value2");
	assert.equal(htmlOutputSpan2.innerHTML, "A Value2");

	var type2 = "setValue";

	var data2 = {
		"data" : "A new value2",
		"path" : path2
	};
	pubSub.publish(type2, data2);

	assert.equal(htmlOutputSpan2.innerHTML, "A new value2");

	// *****************
	var data3 = {
		"data" : "A new value3",
		"path" : path
	};
	pubSub.publish(type, data3);

	var data4 = {
		"data" : "A new value4",
		"path" : path2
	};
	pubSub.publish(type2, data4);

	assert.equal(htmlOutputSpan.innerHTML, "A new value3");
	assert.equal(htmlOutputSpan2.innerHTML, "A new value4");

});