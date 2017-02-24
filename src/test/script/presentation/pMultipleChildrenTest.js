/*
 * Copyright 2017 Olov McKie
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

QUnit.module("pMultipleChildrenTest.js", {
	beforeEach : function() {
		this.getId = function(cData) {
			var recordInfo = cData.getFirstChildByNameInData("recordInfo");
			var id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}

		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.presentationFactorySpy(),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"pChildRefHandlerFactory" : CORATEST.pChildRefHandlerFactorySpy()
		};
		this.spec = {
			"metadataIdUsedInData" : "groupIdOneTextChildRepeat1to3",
			"path" : {},
		// "cPresentation" : CORA.coraData(this.dependencies.metadataProvider
		// .getMetadataById("pgGroupIdOneTextChildMinimized")),
		// "cParentPresentation" : undefined,
		// "dataDivider" : "systemX"
		};
		var createBaseViewHolder = function() {
			return CORA.gui.createDivWithClassName("pMultipleChildren pGroup");
		}
		this.my = {
			"metadataId" : this.spec.metadataIdUsedInData,
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// used in surroundingContainer
			"cParentPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimized")),
			// "cParentPresentation" : this.spec.cPresentation,
			"createBaseViewHolder" : createBaseViewHolder
		};

	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
	pMultipleChildren.init();
	var view = pMultipleChildren.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(pMultipleChildren.type, "pMultipleChildren");
	assert.visible(view, "pMultipleChildren view should be visible");
	var expectedClassName = 'pMultipleChildren pGroup';
	assert.deepEqual(view.className, expectedClassName);
});

QUnit.test("testFirstPChildRefHandlerSpec",
		function(assert) {
			var pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
			pMultipleChildren.init();
			var view = pMultipleChildren.getView();
			this.fixture.appendChild(view);

			var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
			assert.strictEqual(factoredSpec.parentPath, this.spec.path);
			assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
					"groupIdOneTextChildRepeat1to3");
			assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
			assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
					"pgGroupIdOneTextChildMinimized");
			assert.strictEqual(this.getId(factoredSpec.cPresentationMinimized),
					"pVarTextVariableIdOutput");
			assert.strictEqual(factoredSpec.minimizedDefault, undefined);

			assert.strictEqual(factoredSpec.textStyle, "h1TextStyle");
			assert.strictEqual(factoredSpec.childStyle, "oneChildStyle");
			assert.strictEqual(factoredSpec.textStyleMinimized, "h2TextStyle");
			assert.strictEqual(factoredSpec.childStyleMinimized, "fourChildStyle");
		});

QUnit.test("testFirstMinimizedDefaultPChildRefHandlerSpec",
		function(assert) {
			this.my.cPresentation = CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdOneTextChildMinimizedDefault"));
			var pMultipleChildren = CORA.pMultipleChildren(this.dependencies, this.spec, this.my);
			pMultipleChildren.init();
			var view = pMultipleChildren.getView();
			this.fixture.appendChild(view);

			var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
			assert.strictEqual(factoredSpec.parentPath, this.spec.path);
			assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
					"groupIdOneTextChildRepeat1to3");
			assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
			assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
					"pgGroupIdOneTextChildMinimized");
			assert.strictEqual(this.getId(factoredSpec.cPresentationMinimized),
					"pVarTextVariableIdOutput");
			assert.strictEqual(factoredSpec.minimizedDefault, "true");

			assert.strictEqual(factoredSpec.textStyle, "h5TextStyle");
			assert.strictEqual(factoredSpec.childStyle, "twoChildStyle");
			assert.strictEqual(factoredSpec.textStyleMinimized, "h6TextStyle");
			assert.strictEqual(factoredSpec.childStyleMinimized, "tenChildStyle");
		});
