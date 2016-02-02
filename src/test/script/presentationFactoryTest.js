/*
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
	coraTest.presentationFactoryFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function() {
			var jsBookkeeper = CORATEST.jsBookkeeperSpy();
			var specPresentationFactory = {
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			return CORA.presentationFactory(specPresentationFactory);

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.presentationFactory", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.newPresentationFactoryFactory = CORATEST.presentationFactoryFactory(this.metadataProvider,
				this.pubSub, this.textProvider);
		this.newPresentationFactory = this.newPresentationFactoryFactory.factor();
	},
	afterEach : function() {
	}
});

QUnit.test("testFactorPVar", function(assert) {
	var presentationIdToFactor = "pVarTextVariableId";
	var cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pVar = this.newPresentationFactory.factor({},cPresentation);
	assert.strictEqual(pVar.type, "pVar"); 
});

QUnit.test("testFactorPGroup", function(assert) {
	var presentationIdToFactor = "pgGroupIdOneTextChild";
	var cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pGroup = this.newPresentationFactory.factor({},cPresentation);
	assert.strictEqual(pGroup.type, "pGroup"); 
});

QUnit.test("testFactorPRepeatingContainer", function(assert) {
	var presentationIdToFactor = "pTextVariableIdRContainer";
	var cPresentation = CORA.coraData(this.metadataProvider.getMetadataById(presentationIdToFactor));
	var pGroup = this.newPresentationFactory.factor({},cPresentation);
	assert.strictEqual(pGroup.type, "pRepeatingContainer"); 
});
