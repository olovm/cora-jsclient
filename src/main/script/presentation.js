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

		this.test = function() {
			return presentationId;
		}

		function createBaseView() {
			var view = document.createElement("div");
			view.className = "presentation " + presentationId;
			var presentationChildren = presentationMetadata
					.getFirstChildByNameInData("childReferences").children;
			presentationChildren.forEach(function(presentationChildRef) {
				var cPresentationChildRef = new CORA.CoraData(presentationChildRef);
				var presRef = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
				var cPresentationChild = getMetadataById(presRef);
				// if text or not

				var childView = document.createElement("span");
				childView.className = "childRefHolder " + presRef;
				view.appendChild(childView);

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
				}

				// console.log(JSON.stringify(child));
			});
			return view;
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

var CORA = (function(cora) {
	"use strict";
	cora.PVar = function(parentPath, cParentMetadata, cPresentation, metadataProvider, pubSub) {
		// var presentationMetadata = getMetadataById(presentationId);
		// var metadataElement = getMetadataById(presentationMetadata
		// .getFirstAtomicValueByNameInData("presentationOf"));
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = new CORA.CoraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");

		var view = createBaseView();
		view.modelObject = this;

		function createBaseView() {
			var view = document.createElement("span");
			view.className = "pVar " + presentationId;
			return view;
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		this.getView = function() {
			return view;
		};

		this.add = function(repeatId) {
//			console.log("here");
			var newPath = calculatePath(repeatId);
			// new variable
			var variable = new CORA.Variable(newPath, metadataId, mode, metadataProvider, pubSub);
			view.appendChild(variable.getView());
		}
		function calculatePath(repeatId) {
			var pathCopy = JSON.parse(JSON.stringify(parentPath));
			var childPath = createLinkedPathWithNameInDataAndRepeatId();
			if(pathCopy.children===undefined){
				return childPath;
			}
			var lowestPath = getLowestPath(pathCopy);
//			console.log("here2");
			lowestPath.children.push(childPath);
			return pathCopy;
		}
		function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
			var path = {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInData
				} ]
			};
			if (repeatId !== undefined) {
				path.children.push({
					"name" : "repeatId",
					"value" : repeatId
				})
			}
			;
		}
		function getLowestPath(path) {
			var cPath = new CORA.CoraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPath(cPath.getFirstChildWithNameInData("linkedPath"));
			}
			return path;
		}
	};
	return cora;
}(CORA || {}));

var CORA = (function(cora) {
	"use strict";
	cora.Variable = function(newPath, metadataId, mode, metadataProvider, pubSub) {
		var view = document.createElement("span");
		var input = document.createElement("input");
		input.type="text";
		input.id = "id";
		input.modelObject = this;
		view.appendChild(input);
		
		this.getView = function() {
			return view;
		};
		this.setValue = function(value){
			input.value = value;
		}
	};
	return cora;
}(CORA || {}));