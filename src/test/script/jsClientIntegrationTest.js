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
"use strict"
QUnit.module("CORA.JsClientIntegration", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new CORA.PubSub();
		this.textProvider = CORATEST.textProviderStub();
	},
	afterEach : function() {
	}
});


QUnit.test("testIntegrateCoraPubSub", function(assert) {
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
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider": this.textProvider
	};
	var variable = CORA.variable(spec);
	var view = variable.getView();
	this.fixture.appendChild(view);
	var valueView = view.firstChild;

	variable.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");

	var type = "setValue";
	var data = {
		"data" : "A new value",
		"path" : path
	};
	this.pubSub.publish(type, data);

	assert.equal(valueView.innerHTML, "A new value");
});