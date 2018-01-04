/*
 * Copyright 2016, 2017 Olov McKie
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
QUnit.module("presentationFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.dataDivider = "systemX";

		this.dependencies = {
			"providers" : {
				"metadataProvider" : this.metadataProvider,
				"textProvider" : this.textProvider,
				"recordTypeProvider" : this.recordTypeProvider,
				"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
			},
			"globalFactories" : {
				"searchHandlerFactory" : CORATEST.standardFactorySpy("searchHandlerSpy")
			},
			"pubSub" : this.pubSub,
			"jsBookkeeper" : this.jsBookkeeper,
			"dataDivider" : this.dataDivider,
			"pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy")
		};
		this.newPresentationFactory = CORA.presentationFactory(this.dependencies);

		this.spec = {
			"path" : {},
			"metadataIdUsedInData" : "textVariableId",
			"cPresentation" : CORA.coraData(this.metadataProvider
					.getMetadataById("pVarTextVariableId")),
			"cParentPresentation" : null
		};
		this.getMetadataAsCoraData = function(id) {
			return CORA.coraData(this.metadataProvider.getMetadataById(id));
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var presentationFactory = CORA.presentationFactory(this.dependencies);
	assert.strictEqual(presentationFactory.type, "presentationFactory");
});

QUnit.test("testGetDependencies", function(assert) {
	var presentationFactory = CORA.presentationFactory(this.dependencies);
	assert.strictEqual(presentationFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactorPVar", function(assert) {
	assert.strictEqual(this.newPresentationFactory.getDataDivider, undefined);
});

QUnit.test("testFactorPVar", function(assert) {
	var pVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pVar.type, "pVar");
});

QUnit.test("testFactorMetadataIdUsedInData", function(assert) {
	var pVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pVar.getSpec().metadataIdUsedInData, "textVariableId");
});

QUnit.test("testFactorPCollVar", function(assert) {
	this.spec.cPresentation = this.getMetadataAsCoraData("userSuppliedIdCollectionVarPCollVar");
	var pCollVar = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pCollVar.type, "pCollVar");
});

QUnit.test("testFactorPGroup", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	var pGroup = this.newPresentationFactory.factor(this.spec);
	assert.strictEqual(pGroup.type, "pGroup");
});

QUnit.test("testFactorPGroupDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	var pGroup = this.newPresentationFactory.factor(this.spec);

	var dependencies = pGroup.getDependencies();
	assert.strictEqual(dependencies.pChildRefHandlerFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerFactory.getTypeToFactor(), "pChildRefHandler");
});

QUnit.test("testFactorPChildRefHandlerDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdOneTextChild";
	this.spec.cPresentation = this.getMetadataAsCoraData("pgGroupIdOneTextChild");
	var pGroup = this.newPresentationFactory.factor(this.spec);

	var dependencies = pGroup.getDependencies().pChildRefHandlerFactory.getDependencies();
	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.type, "genericFactory");
	assert.strictEqual(dependencies.pChildRefHandlerViewFactory.getTypeToFactor(),
			"pChildRefHandlerView");
	assert.strictEqual(dependencies.dataDivider, this.dependencies.dataDivider);
});

QUnit.test("testFactorPRepeatingContainer", function(assert) {
	this.spec.metadataIdUsedInData = "textVariableId";
	this.spec.cPresentation = this.getMetadataAsCoraData("pTextVariableIdRContainer");
	var pRContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pRContainer.type, "pRepeatingContainer");
});

QUnit.test("testFactorPSurroundingContainer", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("pTextVariablePlus2SContainer");
	this.spec.cParentPresentation = this.getMetadataAsCoraData("pgGroupIdTwoTextChildSurrounding2TextPGroup");
	var pSContainer = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pSContainer.type, "pSurroundingContainer");
});

QUnit.test("testFactorPRecordLink", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
	var pRecordLink = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.strictEqual(pRecordLink.getDependencies().pRecordLinkViewFactory.type,
			"pRecordLinkViewFactory");
});
QUnit.test("testFactorPRecordLinkDependencies", function(assert) {
	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("myLinkNoPresentationOfLinkedRecordPLink");
	var pRecordLink = this.newPresentationFactory.factor(this.spec);

	var factoredDependencies = pRecordLink.getDependencies();

	assert.strictEqual(factoredDependencies.providers, this.dependencies.providers);

	assert.strictEqual(factoredDependencies.globalFactories, this.dependencies.globalFactories);

	assert.strictEqual(factoredDependencies.recordTypeProvider,
			this.dependencies.providers.recordTypeProvider);
	assert.strictEqual(factoredDependencies.clientInstanceProvider,
			this.dependencies.providers.clientInstanceProvider);
});

QUnit.test("testFactorPResourceLink", function(assert) {
	this.dependencies.providers.textProvider = CORATEST.textProviderSpy();

	this.spec.metadataIdUsedInData = "groupIdTwoTextChildRepeat1to5";
	this.spec.cPresentation = this.getMetadataAsCoraData("masterPResLink");
	var pResourceLink = this.newPresentationFactory.factor(this.spec);

	assert.strictEqual(pResourceLink.type, "pResourceLink");
	var factoredDependencies = pResourceLink.getDependencies();
	assert.strictEqual(factoredDependencies.metadataProvider,
			this.dependencies.providers.metadataProvider);
});
