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
//		var factor = function(metadataId, presentationId, data) {
		var factor = function(metadataId, data) {
			var pubSub = CORA.pubSub();

			var specDataHolder = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var dataHolder = CORA.dataHolder(specDataHolder);
//			var dataHolder = {};

			var specJSBookkeeper = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"dataHolder" : dataHolder
			};
			var jsBookkeeper = CORA.jsBookkeeper(specJSBookkeeper);
//			var jsBookkeeper = {};

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
			// var spec = {
			// "presentationId" : presentationId,
			// "metadataProvider" : metadataProvider,
			// "pubSub" : pubSub,
			// "textProvider" : textProvider,
			// "jsBookkeeper" : jsBookkeeper,
			// "presentationFactory" : presentationFactory
			// };
			// var presentation = CORA.presentation(spec);
			// var presentation2 = CORA.presentation(spec);

			// // log all messages
			// pubSub.subscribe("*", {}, undefined, function(dataFromMsg, msg) {
			// console.log("msg: " + msg);
			// console.log("dataFromMsg: " + JSON.stringify(dataFromMsg));
			// });
			var metadataController;
			function start() {
				var specMetadataController = {
					"metadataId" : metadataId,
					"data" : data,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub
				};
				metadataController = CORA.metadataController(specMetadataController);
			}

			return Object.freeze({
				pubSub : pubSub,
				jsBookkeeper : jsBookkeeper,
				presentationFactory : presentationFactory,
				// presentation : presentation,
				// presentation2 : presentation2,
				dataHolder : dataHolder,
				metadataController : metadataController,
				getPresentation : getPresentation,
				start : start
			});
		};
		return Object.freeze({
			factor : factor
		});
	};
	return cora;
}(CORA));