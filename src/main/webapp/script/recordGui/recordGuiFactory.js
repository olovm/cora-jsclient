/*
 * Copyright 2016, 2017 Uppsala University Library
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
var CORA = (function(cora) {
	"use strict";
	cora.recordGuiFactory = function(dependencies) {
		var metadataProvider = dependencies.metadataProvider;
		var textProvider = dependencies.textProvider;
		var recordTypeProvider = dependencies.recordTypeProvider;
		var uploadManager = dependencies.uploadManager;

		var self;

		var factor = function(spec) {
			var metadataId = spec.metadataId;
			var data = spec.data;
			var dataDivider = spec.dataDivider;

			var pubSub = CORA.pubSub();

			var specDataHolder = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var dataHolder = CORA.dataHolder(specDataHolder);

			var specJSBookkeeper = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"dataHolder" : dataHolder
			};
			var jsBookkeeper = CORA.jsBookkeeper(specJSBookkeeper);

			var dependenciesPresentationFactory = {
				"authTokenHolder" : dependencies.authTokenHolder,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"recordGuiFactory" : self,
				"recordTypeProvider" : recordTypeProvider,
				"dataDivider" : dataDivider,
				"uploadManager" : uploadManager,
				"ajaxCallFactory" : dependencies.ajaxCallFactory
			};
			var presentationFactory = CORA.presentationFactory(dependenciesPresentationFactory);

			// function getPresentationHolder(presentationId, metadataIdUsedInData) {
			// var spec1 = {
			// "presentationId" : presentationId,
			// "metadataIdUsedInData" : metadataIdUsedInData,
			// "metadataProvider" : metadataProvider,
			// "pubSub" : pubSub,
			// "textProvider" : textProvider,
			// "jsBookkeeper" : jsBookkeeper,
			// "presentationFactory" : presentationFactory
			// };
			// return CORA.presentation(spec1);
			// }
			//
			// var metadataController;
			// function initMetadataControllerStartingGui() {
			// var specMetadataController = {
			// "metadataId" : metadataId,
			// "data" : data,
			// "metadataProvider" : metadataProvider,
			// "pubSub" : pubSub
			// };
			// metadataController = CORA.metadataController(specMetadataController);
			// }
			//
			// function getMetadataController() {
			// return metadataController;
			// }
			//
			// function validateData() {
			// var spec2 = {
			// "metadataId" : metadataId,
			// "data" : dataHolder.getData(),
			// "metadataProvider" : metadataProvider,
			// "pubSub" : pubSub
			// };
			// return CORA.metadataValidator(spec2);
			// }

			// return Object.freeze({
			// pubSub : pubSub,
			// jsBookkeeper : jsBookkeeper,
			// presentationFactory : presentationFactory,
			// dataHolder : dataHolder,
			// getMetadataController : getMetadataController,
			// getPresentationHolder : getPresentationHolder,
			// initMetadataControllerStartingGui : initMetadataControllerStartingGui,
			// validateData : validateData
			// });
			var dependenciesCF = {
				"metadataProvider" : dependencies.metadataProvider,
				"pubSub" : pubSub
			};
			var metadataControllerFactory = CORA.metadataControllerFactory(dependenciesCF);

			var dependenciesMV = {
				"metadataProvider" : dependencies.metadataProvider,
				"pubSub" : pubSub
			};
			var metadataValidatorFactory = CORA.metadataValidatorFactory(dependenciesMV);

			var dependenciesRG = {
				"metadataProvider" : dependencies.metadataProvider,
				"textProvider" : dependencies.textProvider,
				// "recordTypeProvider" : CORATEST.recordTypeProviderSpy(),
				// "uploadManager" : CORATEST.uploadManagerSpy(),
				//
				"pubSub" : pubSub,
				"dataHolder" : dataHolder,
				"jsBookkeeper" : jsBookkeeper,
				"presentationFactory" : presentationFactory,
				"metadataControllerFactory" : metadataControllerFactory,
				// "metadataValidatorFactory" : CORATEST.standardFactorySpy("metadataValidatorSpy"),
				"metadataValidatorFactory" : metadataValidatorFactory,
				"presentationHolderFactory" : CORA.presentationHolderFactory()
			};
			// var specRG = {
			// "metadataId" : "someMetadataId",
			// "data" : {},
			// "dataDivider" : "someDataDivider",
			// };
			return CORA.recordGui(dependenciesRG, spec);

		};
		var out = Object.freeze({
			"type" : "recordGuiFactory",
			factor : factor
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));