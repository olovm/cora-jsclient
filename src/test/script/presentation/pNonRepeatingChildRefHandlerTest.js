/*
 * Copyright 2018 Uppsala University Library
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
QUnit.module("pNonRepeatingChildRefHandlerTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
			"presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
			"pNonRepeatingChildRefHandlerViewFactory" : CORATEST
					.standardFactorySpy("pNonRepeatingChildRefHandlerViewSpy"),
		};
		this.spec = {
			"parentPath" : {},
			"parentMetadataId" : "someParentMetadataId",
			"cPresentation" : CORA.coraData({
				"name" : "presentation",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "somePresentationId"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationSurroundingContainer"
						} ]
					} ]
				}
				]
			}),
			"cParentPresentation" : {
				type : "fakeCParentPresentationObject"
			}
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.type, "pNonRepeatingChildRefHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	assert.strictEqual(pNonRepeatingChildRefHandler.getSpec(), this.spec);
});

QUnit.test("testInitCreatesPresentation",
		function(assert) {
			var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
					this.spec);
			var factoredPresentationSpec = this.dependencies.presentationFactory.getSpec(0);

			assert.strictEqual(factoredPresentationSpec.path, this.spec.parentPath);
			assert.strictEqual(factoredPresentationSpec.metadataIdUsedInData,
					this.spec.parentMetadataId);
			assert.strictEqual(factoredPresentationSpec.cPresentation, this.spec.cPresentation);
			assert.strictEqual(factoredPresentationSpec.cParentPresentation,
					this.spec.cParentPresentation);
		});

QUnit.test("testInitPresentationAddedToView", function(assert) {
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	var factoredPresentation = this.dependencies.presentationFactory.getFactored(0);

	var addedView = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(0)
			.getAddedChild(0);
	assert.strictEqual(factoredPresentation.getView(), addedView);
});

QUnit.test("testGetView", function(assert) {
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);
	var view = pNonRepeatingChildRefHandler.getView();
	assert.strictEqual(view, this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getFactored(
			0).getView());
});

QUnit.test("testViewSpec", function(assert) {
	this.spec.textStyle = "someTextStyle";
	this.spec.childStyle = "someChildStyle";
	var pNonRepeatingChildRefHandler = CORA.pNonRepeatingChildRefHandler(this.dependencies,
			this.spec);

	var viewSpec = this.dependencies.pNonRepeatingChildRefHandlerViewFactory.getSpec(0);
	var expectedSpec = {
		presentationId : "somePresentationId",
		textStyle : "someTextStyle",
		childStyle : "someChildStyle"
	}
	assert.stringifyEqual(viewSpec, expectedSpec);
});
