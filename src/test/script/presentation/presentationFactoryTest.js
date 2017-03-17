/*
 * Copyright 2016, 2017 Olov McKie
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
QUnit.module("presentationFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.dataDivider = "systemX";

		this.dependencies = {
			"metadataProvider" : this.metadataProvider,
			"pubSub" : this.pubSub,
			"textProvider" : this.textProvider,
			"jsBookkeeper" : this.jsBookkeeper,
			"recordTypeProvider" : this.recordTypeProvider,
			"dataDivider" : this.dataDivider,
			"pChildRefHandlerFactory" : CORATEST.pChildRefHandlerFactorySpy(),
			"pChildRefHandlerViewFactory" : CORATEST.pChildRefHandlerViewFactorySpy()
		};
		this.newPresentationFactory = CORA.presentationFactory(this.dependencies);

	},
	afterEach : function() {
	}
});

QUnit.test("testFactorPVar", function(assert) {
	assert.strictEqual(this.newPresentationFactory.getDataDivider(), "systemX");
});

QUnit.test("testFactorPVar", function(assert) {
	var presentationIdToFactor = "pVarTextVariableId";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pVar = this.newPresentationFactory.factor({}, "textVariableId", cPresentation, null);
	assert.strictEqual(pVar.type, "pVar");
});

QUnit.test("testFactorMetadataIdUsedInData", function(assert) {
	var presentationIdToFactor = "pVarTextVariableId";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pVar = this.newPresentationFactory.factor({}, "textVariableId", cPresentation, null);
	assert.strictEqual(pVar.getSpec().metadataIdUsedInData, "textVariableId");
});

QUnit.test("testFactorPCollVar", function(assert) {
	var presentationIdToFactor = "userSuppliedIdCollectionVarPCollVar";
	var data = this.metadataProvider.getMetadataById(presentationIdToFactor);
	var cPresentation = CORA.coraData(data);
	var pCollVar = this.newPresentationFactory.factor({}, "textVariableId", cPresentation);
	assert.strictEqual(pCollVar.type, "pCollVar");
});

QUnit.test("testFactorPGroup", function(assert) {
	var presentationIdToFactor = "pgGroupIdOneTextChild";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));

	var pGroup = this.newPresentationFactory.factor({}, "groupIdOneTextChild", cPresentation);
	assert.strictEqual(pGroup.type, "pGroup");
});

QUnit.test("testFactorPGroupDependencies", function(assert) {
	var presentationIdToFactor = "pgGroupIdOneTextChild";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));

	var pGroup = this.newPresentationFactory.factor({}, "groupIdOneTextChild", cPresentation);
	var dependencies = pGroup.getDependencies();
	assert.strictEqual(dependencies.pChildRefHandlerFactory.type, "pChildRefHandlerFactory");
});

QUnit.test("testFactorPRepeatingContainer", function(assert) {
	var presentationIdToFactor = "pTextVariableIdRContainer";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pGroup = this.newPresentationFactory.factor({}, "textVariableId", cPresentation);
	assert.strictEqual(pGroup.type, "pRepeatingContainer");
});

QUnit.test("testFactorPSurroundingContainer", function(assert) {
	var presentationIdToFactor = "pTextVariablePlus2SContainer";
	var presentationIdToFactorParent = "pgGroupIdTwoTextChildSurrounding2TextPGroup";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var cParentPresentation = CORA.coraData(this.metadataProvider
			.getMetadataById(presentationIdToFactorParent));
	var pGroup = this.newPresentationFactory.factor({}, "groupIdTwoTextChildRepeat1to5",
			cPresentation, cParentPresentation);
	assert.strictEqual(pGroup.type, "pSurroundingContainer");
});

QUnit.test("testFactorPRecordLink", function(assert) {
	var presentationIdToFactor = "myLinkNoPresentationOfLinkedRecordPLink";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pRecordLink = this.newPresentationFactory.factor({}, "groupIdTwoTextChildRepeat1to5",
			cPresentation);
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.strictEqual(pRecordLink.getDependencies().pRecordLinkViewFactory.type,
			"pRecordLinkViewFactory");
});

QUnit.test("testFactorPResourceLink", function(assert) {
	var presentationIdToFactor = "masterPResLink";
	var cPresentation = CORA
			.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pResourceLink = this.newPresentationFactory.factor({}, "groupIdTwoTextChildRepeat1to5",
			cPresentation);
	assert.strictEqual(pResourceLink.type, "pResourceLink");
	var factoredDependecy = pResourceLink.getDependencies();
	assert.strictEqual(factoredDependecy.metadataProvider, this.dependencies.metadataProvider);
});
