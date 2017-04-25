/*
 * Copyright 2017 Uppsala University Library
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
	cora.recordGui = function(dependencies, spec) {
		var pubSub = dependencies.pubSub;
		var dataHolder = dependencies.dataHolder;
		var jsBookkeeper = dependencies.jsBookkeeper;
		var metadataController;

		function getPresentationHolder(presentationId, metadataIdUsedInData) {
			var spec1 = {
				"presentationId" : presentationId,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"metadataProvider" : dependencies.metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : dependencies.textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"presentationFactory" : dependencies.presentationFactory
			};
			return dependencies.presentationHolderFactory.factor(spec1);
		}

		function initMetadataControllerStartingGui() {
			var specMetadataController = {
				"metadataId" : spec.metadataId,
				"data" : spec.data,
				"metadataProvider" : dependencies.metadataProvider,
				"pubSub" : dependencies.pubSub
			};
			metadataController = dependencies.metadataControllerFactory
					.factor(specMetadataController);
			return metadataController;
		}

		function validateData() {
			var spec2 = {
				"metadataId" : spec.metadataId,
				"data" : dependencies.dataHolder.getData(),
				"metadataProvider" : dependencies.metadataProvider,
				"pubSub" : dependencies.pubSub
			};
			return dependencies.metadataValidatorFactory.factor(spec2).validate();
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			type : "recordGui",
			getDependencies : getDependencies,
			getSpec : getSpec,
			pubSub : pubSub,
			dataHolder : dataHolder,
			jsBookkeeper : jsBookkeeper,
			// presentationFactory : presentationFactory,
			// getMetadataController : getMetadataController,
			getPresentationHolder : getPresentationHolder,
			initMetadataControllerStartingGui : initMetadataControllerStartingGui,
			validateData : validateData
		});
	};
	return cora;
}(CORA));