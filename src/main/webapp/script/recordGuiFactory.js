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
var CORA = (function(cora) {
	"use strict";
	cora.recordGuiFactory = function(dependencies) {
		var metadataProvider = dependencies.metadataProvider;
		var textProvider = dependencies.textProvider;
		var factor = function(metadataId, data) {
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

			var specPresentationFactory = {
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			var presentationFactory = CORA.presentationFactory(specPresentationFactory);

			function getPresentation(presentationId) {
				var spec = {
					"presentationId" : presentationId,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"jsBookkeeper" : jsBookkeeper,
					"presentationFactory" : presentationFactory
				};
				return CORA.presentation(spec);
			}

			var metadataController;
			function initMetadataControllerStartingGui() {
				var specMetadataController = {
					"metadataId" : metadataId,
					"data" : data,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub
				};
				metadataController = CORA.metadataController(specMetadataController);
			}

			function getMetadataController() {
				return metadataController;
			}

			return Object.freeze({
				pubSub : pubSub,
				jsBookkeeper : jsBookkeeper,
				presentationFactory : presentationFactory,
				dataHolder : dataHolder,
				getMetadataController : getMetadataController,
				getPresentation : getPresentation,
				initMetadataControllerStartingGui : initMetadataControllerStartingGui
			});
		};
		return Object.freeze({
			factor : factor
		});
	};
	return cora;
}(CORA));