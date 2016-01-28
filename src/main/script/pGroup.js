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
	cora.pGroup = function(spec) {
		var path = spec.path;
		var presentationId = spec.presentationId;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;

		var presentationMetadata = getMetadataById(presentationId);
		var cMetadataElement = getMetadataById(presentationMetadata
				.getFirstAtomicValueByNameInData("presentationOf"));

		var view = createBaseView();

		function createBaseView() {
			var viewNew = createBaseViewHolder();
			var presentationChildren = presentationMetadata
					.getFirstChildByNameInData("childReferences").children;
			presentationChildren.forEach(function(presentationChildRef) {
				viewNew.appendChild(createViewForChild(presentationChildRef));
			});
			return viewNew;
		}

		function createBaseViewHolder() {
			var newView = document.createElement("div");
			newView.className = "pGroup " + presentationId;
			return newView;
		}

		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = CORA.coraData(presentationChildRef);
			var presRef = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
			var cPresentationChild = getMetadataById(presRef);

			if (cPresentationChild.getData().name === "text") {
				return document.createTextNode(textProvider.getTranslation(presRef));
			} else {
				var childRefHandlerSpec = {
					"parentPath" : path,
					"cParentMetadata" : cMetadataElement,
					"cPresentation" : cPresentationChild,
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"jsBookkeeper" : jsBookkeeper
				};
				var pChildRefHandler = CORA.pChildRefHandler(childRefHandlerSpec);
				return pChildRefHandler.getView();
			}
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		return Object.freeze({
			getView : getView
		});

	};
	return cora;
}(CORA || {}));