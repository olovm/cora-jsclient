/*
 * Copyright 2016 Uppsala University Library
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
var CORA = (function(cora) {
	"use strict";
	cora.pMultipleChildren = function(spec, my) {
		var path = spec.path;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;
		var presentationFactory = spec.presentationFactory;
		var recordTypeProvider = spec.recordTypeProvider;
		var xmlHttpRequestFactory = spec.xmlHttpRequestFactory;

		var view;

		function init() {
			var viewNew = my.createBaseViewHolder();
			var presentationChildren = my.cPresentation
					.getFirstChildByNameInData("childReferences").children;
			presentationChildren.forEach(function(presentationChildRef) {
				viewNew.appendChild(createViewForChild(presentationChildRef));
			});
			view = viewNew;
		}

		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = CORA.coraData(presentationChildRef);
			var ref = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
			var cPresentationChild = getMetadataById(ref);

			if (childIsText(cPresentationChild)) {
				return createText(ref);
			}
			if (childIsSurroundingContainer(cPresentationChild)) {
				return createSurroundingContainer(cPresentationChild);
			}
			return createPChildRefHandler(cPresentationChild, cPresentationChildRef);
		}

		function childIsText(cChild) {
			return cChild.getData().name === "text";
		}

		function createText(presRef) {
			var text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		}

		function childIsSurroundingContainer(cChild) {
			return "children" === cChild.getData().attributes.repeat;
		}

		function createSurroundingContainer(cChild) {
			var surroundingContainer = presentationFactory.factor(path, cChild,
					my.cParentPresentation);
			return surroundingContainer.getView();
		}

		function createPChildRefHandler(cPresentationChild, cPresentationChildRef) {
			var childRefHandlerSpec = {
				"parentPath" : path,
				"cParentMetadata" : getMetadataById(my.metadataId),
				"cPresentation" : cPresentationChild,
				"cParentPresentation" : my.cParentPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"presentationFactory" : presentationFactory,
				"recordTypeProvider" : recordTypeProvider,
				"xmlHttpRequestFactory" : xmlHttpRequestFactory
			};

			if (childHasMinimizedPresenation(cPresentationChildRef)) {
				var presRefMinimized = cPresentationChildRef
						.getFirstAtomicValueByNameInData("refMinimized");
				var cPresentationMinimized = getMetadataById(presRefMinimized);
				childRefHandlerSpec.cPresentationMinimized = cPresentationMinimized;
				var minimizedDefault = cPresentationChildRef
						.getFirstAtomicValueByNameInData("default");
				if (minimizedDefault === "refMinimized") {
					childRefHandlerSpec.minimizedDefault = "true";
				}
			}

			var pChildRefHandler = CORA.pChildRefHandler(childRefHandlerSpec);
			return pChildRefHandler.getView();
		}

		function childHasMinimizedPresenation(cChildRef) {
			return cChildRef.containsChildWithNameInData("refMinimized");
		}

		function getMetadataById(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		}

		function getPresentationId() {
			var recordInfo = spec.cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}
		function getView() {
			return view;
		}
		return Object.freeze({
			"type" : "pMultipleChildren",
			getPresentationId : getPresentationId,
			init : init,
			getView : getView
		});

	};
	return cora;
}(CORA));