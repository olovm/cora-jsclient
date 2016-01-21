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
	cora.Presentation = function(presentationId, metadataProvider, pubSub) {
		var presentationMetadata = getMetadataById(presentationId);
		var cMetadataElement = getMetadataById(presentationMetadata
				.getFirstAtomicValueByNameInData("presentationOf"));

		var view = createBaseView();

		function createBaseView() {
			var view = createBaseViewHolder();
			var presentationChildren = presentationMetadata
					.getFirstChildByNameInData("childReferences").children;
			presentationChildren.forEach(function(presentationChildRef) {
				view.appendChild(createViewForChild(presentationChildRef));
			});
			return view;
		}
		
		function createBaseViewHolder(){
			var view = document.createElement("div");
			view.className = "presentation " + presentationId;
			return view;
		}

		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = new CORA.CoraData(presentationChildRef);
			var presRef = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
			var cPresentationChild = getMetadataById(presRef);
			// if text or not

			var childView = document.createElement("span");
			childView.className = "childRefHolder " + presRef;

			if (cPresentationChild.getData().name === "text") {
				// text
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
					// console.log("pVar");
					// console.log("grr:
					// "+JSON.stringify(presentationChildRef));
					var pVar = new CORA.PVar(path, cMetadataElement, cPresentationChild,
							metadataProvider, pubSub);
					childView.appendChild(pVar.getView());
				} else if (type === "pGroup") {
					// pGroup
					console.log("pGroup");
				} else {
					// container
					var containerType = cPresentationChild.getData().attributes.repeat;
					if (containerType === "children") {
						// surroundingContainer
						console.log("surroundingContainer");
					} else {
						// repeatingContainer
						console.log("repeatingContainer");
					}
				}
				return childView;
			}

			// console.log(JSON.stringify(child));

		}
		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		this.getPresentationId = function() {
			return presentationId;
		};

		this.getPubSub = function() {
			return pubSub;
		};

		this.getView = function() {
			return view;
		};

	};
	return cora;
}(CORA || {}));