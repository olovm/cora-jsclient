/*
 * Copyright 2016, 2017 Olov McKie
 * Copyright 2016, 2018 Uppsala University Library
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
	cora.presentationFactory = function(dependencies) {
		var self;

		function factor(spec) {
			var path = spec.path;
			var metadataIdUsedInData = spec.metadataIdUsedInData;
			var cPresentation = spec.cPresentation;
			var cParentPresentation = spec.cParentPresentation;

			var infoFactory = CORA.infoFactory();

			var pVarViewFactoryDependencies = {
				"infoFactory" : infoFactory
			};
			var pVarViewFactory = CORA.genericFactory("pVarView", pVarViewFactoryDependencies);

			var pRepeatingElementFactoryDependencies = {
				"infoFactory" : infoFactory,
				"jsBookkeeper" : dependencies.jsBookkeeper
			};
			var pRepeatingElementFactory = CORA.genericFactory("pRepeatingElement",
					pRepeatingElementFactoryDependencies);

			var pRecordLinkViewFactoryDependencies = {
				"infoFactory" : infoFactory
			};
			var pRecordLinkViewFactory = CORA.genericFactory("pRecordLinkView",
					pRecordLinkViewFactoryDependencies);

			var pChildRefHandlerFactoryDependencies = {
				"metadataProvider" : dependencies.providers.metadataProvider,
				"pubSub" : dependencies.pubSub,
				"textProvider" : dependencies.providers.textProvider,
				"presentationFactory" : self,
				"jsBookkeeper" : dependencies.jsBookkeeper,
				"recordTypeProvider" : dependencies.providers.recordTypeProvider,
				"uploadManager" : dependencies.uploadManager,
				"ajaxCallFactory" : dependencies.ajaxCallFactory,
				"pRepeatingElementFactory" : pRepeatingElementFactory,
				"pChildRefHandlerViewFactory" : CORA.genericFactory("pChildRefHandlerView"),
				"dataDivider" : dependencies.dataDivider
			};

			var pChildRefHandlerFactory = CORA.genericFactory("pChildRefHandler",
					pChildRefHandlerFactoryDependencies);

			var pNonRepeatingChildRefHandlerFactoryDependencies = {
				"presentationFactory" : self,
				"pNonRepeatingChildRefHandlerViewFactory" : CORA
						.genericFactory("pNonRepeatingChildRefHandlerView"),
				pubSub : dependencies.pubSub,
				providers : dependencies.providers
			};

			var pNonRepeatingChildRefHandlerFactory = CORA
					.genericFactory("pNonRepeatingChildRefHandler",
							pNonRepeatingChildRefHandlerFactoryDependencies);

			var pMapViewFactoryDependencies = {
				"infoFactory" : infoFactory
			};
			var pMapViewFactory = CORA.genericFactory("pMapView", pMapViewFactoryDependencies);

			var childDependencies = {
				"providers" : dependencies.providers,
				"globalFactories" : dependencies.globalFactories,
				"infoFactory" : infoFactory,
				"clientInstanceProvider" : dependencies.providers.clientInstanceProvider,
				"metadataProvider" : dependencies.providers.metadataProvider,
				"pubSub" : dependencies.pubSub,
				"textProvider" : dependencies.providers.textProvider,
				"jsBookkeeper" : dependencies.jsBookkeeper,
				"presentationFactory" : self,
				"xmlHttpRequestFactory" : dependencies.xmlHttpRequestFactory,
				"recordGuiFactory" : dependencies.recordGuiFactory,
				"recordTypeProvider" : dependencies.providers.recordTypeProvider,
				"uploadManager" : dependencies.uploadManager,
				"ajaxCallFactory" : dependencies.ajaxCallFactory,
				"pVarViewFactory" : pVarViewFactory,
				"pRecordLinkViewFactory" : pRecordLinkViewFactory,
				"pChildRefHandlerFactory" : pChildRefHandlerFactory,
				"pNonRepeatingChildRefHandlerFactory" : pNonRepeatingChildRefHandlerFactory,
				"authTokenHolder" : dependencies.authTokenHolder,
				"pMapViewFactory" : pMapViewFactory
			};
			var specNew = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentation,
				"cParentPresentation" : cParentPresentation
			};

			var type = cPresentation.getData().attributes.type;
			if (type === "pVar") {
				return CORA.pVar(childDependencies, specNew);
			}
			if (type === "pGroup") {
				if (shouldBePresentedAsMap(cPresentation)) {
					return CORA.pMap(childDependencies, specNew);
				}
				return CORA.pGroup(childDependencies, specNew);
			}
			if (type === "pRecordLink") {
				return CORA.pRecordLink(childDependencies, specNew);
			}
			if (type === "pCollVar") {
				return CORA.pCollectionVar(childDependencies, specNew);
			}
			if (type === "pResourceLink") {
				return CORA.pResourceLink(childDependencies, specNew);
			}
			var repeat = cPresentation.getData().attributes.repeat;
			if (repeat === "this") {
				return CORA.pRepeatingContainer(childDependencies, specNew);
			}
			return CORA.pSurroundingContainer(childDependencies, specNew);
		}

		function shouldBePresentedAsMap(cPresentation) {
			return cPresentation.containsChildWithNameInData("presentAs")
					&& "map" === cPresentation.getFirstAtomicValueByNameInData("presentAs");
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "presentationFactory",
			getDependencies : getDependencies,
			factor : factor
		});
		self = out;
		return out;

	};
	return cora;
}(CORA));