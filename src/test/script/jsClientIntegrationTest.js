/*
 * Copyright 2016 Uppsala University Library
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
QUnit.module("CORA.JsClientIntegration", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORA.pubSub();
		this.textProvider = CORATEST.textProviderStub();
	},
	afterEach : function() {
	}
});

QUnit.test("testIntegrateCoraPubSubPVar", function(assert) {
	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "testVar"
		} ]
	};

	var cPVarPresentation = new CORA.CoraData(this.metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));
	var spec = {
		"path" : path,
		"cPresentation" : cPVarPresentation,
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider
	};
	var pVar = CORA.pVar(spec);
	var view = pVar.getView();
	this.fixture.appendChild(view);
	var valueView = view.firstChild;

	pVar.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");

	var type = "setValue";
	var data = {
		"data" : "A new value",
		"path" : path
	};
	this.pubSub.publish(type, data);

	assert.equal(valueView.innerHTML, "A new value");
});

QUnit.test("testIntegrateCoraPubSubPresentation", function(assert) {
	var spec = {
		"presentationId" : "pgGroupIdOneTextChild",
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider
	};
	var presentation = CORA.presentation(spec);

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var pGroupView = view.firstChild;
	var childRefHandler = pGroupView.firstChild;
	assert
			.ok(childRefHandler.childNodes.length === 0,
					"childRefHandler, should have zero children");
	assert.deepEqual(childRefHandler.className, "pChildRefHandler pVarTextVariableId");

	var path = {};
	var data = {
		"metadataId" : "textVariableId",
		"path" : path
	};
	this.pubSub.publish("add", data);

	assert.ok(childRefHandler.childNodes.length === 1, "childRefHandler, should have one child");
	var pVarView = childRefHandler.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId");
	var input = pVarView.firstChild;
	assert.deepEqual(input.value, "");

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ]
	};
	var data2 = {
		"path" : path2,
		"data" : "a Value"
	};
	this.pubSub.publish("setValue", data2);
	assert.deepEqual(input.value, "a Value");
});
QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataController", function(assert) {
	var specJSBookkeeper = {
			"metadataId" : metadataId,
			"metadataProvider" : this.metadataProvider,
			"pubSub" : this.pubSub,
			"textProvider" : this.textProvider
	};
	var jsBookkeeper = CORA.jsBookkeeper(specJSBookkeeper);

	var spec = {
		"presentationId" : "pgGroupIdOneTextChild",
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"jsBookkeeper": jsBookkeeper
	};
	var presentation = CORA.presentation(spec);
	// this.pubSub.subscribe("*", {}, undefined, function(dataFromMsg, msg) {
	// console.log("dataFromMsg: " + JSON.stringify(dataFromMsg));
	// console.log("msg: " + msg);
	// });

	var metadataId = "groupIdOneTextChild";
	var specDataHolder = {
		"metadataId" : metadataId,
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub
	};
	var dataHolder = CORA.dataHolder(specDataHolder);


	var specMetadataController = {
		"metadataId" : metadataId,
		"data" : undefined,
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub
	};
	var metadataController = CORA.metadataController(specMetadataController);

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var pGroupView = view.firstChild;
	var childRefHandler = pGroupView.firstChild;

	var pVarView = childRefHandler.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId");
	var input = pVarView.firstChild;
	assert.deepEqual(input.value, "");

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ]
	};
	var data2 = {
		"path" : path2,
		"data" : "a Value"
	};
	this.pubSub.publish("setValue", data2);
	assert.deepEqual(input.value, "a Value");

	assert.deepEqual(dataHolder.getData(), {
		"children" : [ {
			"name" : "textVariableId",
			"value" : "a Value"
		} ],
		"name" : "groupIdOneTextChild"
	});

});
