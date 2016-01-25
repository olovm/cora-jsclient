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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPVarFactory = function(metadataProvider, pubSub, textProvider, fixture) {
		var factor = function(path, parentMetadataId, pVarPresentationId) {
			var cParentMetadata = new CORA.CoraData(metadataProvider
					.getMetadataById(parentMetadataId));
			var cPVarPresentation = new CORA.CoraData(metadataProvider
					.getMetadataById(pVarPresentationId));

			var spec = {
				"parentPath" : path,
				"cParentMetadata" : cParentMetadata,
				"cPresentation" : cPVarPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider":textProvider
			};
			var pVar = CORA.pVar(spec);
			var view = pVar.getView();
			fixture.appendChild(view);
			return {
				pVar : pVar,
				fixture : fixture,
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

QUnit.test("testInit", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pgGroupIdOneTextChild", "pVarTextVariableId");
	assert.deepEqual(attachedPVar.view.className, "pVar pVarTextVariableId");
	var view = attachedPVar.view;
	assert.ok(view.modelObject === attachedPVar.pVar,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 0, "pVar, should have no children");
});

QUnit.test("testAddOneChild", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "pgGroupIdOneTextChild", "pVarTextVariableId");
	attachedPVar.pVar.add();
	var view = attachedPVar.view;
	assert.ok(view.childNodes.length === 1, "pVar, should have one child");
	var variableView = view.firstChild;
	assert.strictEqual(variableView.className, "");
});