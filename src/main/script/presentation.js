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
	cora.presentation = function(spec) {
		var presentationId = spec.presentationId;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		
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
			newView.className = "presentation " + presentationId;
			return newView;
		}

		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = new CORA.CoraData(presentationChildRef);
			var presRef = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
			var cPresentationChild = getMetadataById(presRef);
			// if text or not

			var childView = document.createElement("span");
			childView.className = "childRefHolder " + presRef;

			if (cPresentationChild.getData().name === "text") {
				// TODO: get right text from textData
				childView.appendChild(document.createTextElement("A text"));
			} else {
				// presentation
				var presentationOf = cPresentationChild
						.getFirstAtomicValueByNameInData("presentationOf");
				// TODO: createListner for path and
				// presentationOf(metadataId)

				var path = {};

				var type = cPresentationChild.getData().attributes.type;
				if (type === "pVar") {
					// pVar
					var spec = {
							"parentPath":path,
							"cParentMetadata": cMetadataElement,
							"cPresentation":cPresentationChild,
							"metadataProvider" : metadataProvider,
							"pubSub" : pubSub
						};
					var pVar = CORA.pVar(spec);
					childView.appendChild(pVar.getView());
				} else if (type === "pGroup") {
					// pGroup
				} else {
					// container
					var containerType = cPresentationChild.getData().attributes.repeat;
					if (containerType === "children") {
						// surroundingContainer
					} else {
						// repeatingContainer
					}
				}
				return childView;
			}
		}
		
		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function getPresentationId() {
			return presentationId;
		}

		function getPubSub() {
			return pubSub;
		}

		function getView() {
			return view;
		}
		
		return Object.freeze({
			getPresentationId:getPresentationId,
			getPubSub:getPubSub,
			getView:getView
		});

	};
	return cora;
}(CORA || {}));