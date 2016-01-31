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
	cora.pChildRefHandler = function(spec) {
		var parentPath = spec.parentPath;
		var cParentMetadata = spec.cParentMetadata;
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var presentationFactory = spec.presentationFactory;

		var presentationId = findPresentationId(cPresentation);
		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);

		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

		var cParentMetadataChildRef = findParentMetadataChildRef(cParentMetadata);
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();

		var view = createBaseView();
		var childrenView = createChildrenView();
		view.appendChild(childrenView);
		var buttonView = createButtonView();
		view.appendChild(buttonView);
		var addButton = createAddButton();
		buttonView.appendChild(addButton);

		pubSub.subscribe("add", parentPath, undefined, handleMsg);

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function findParentMetadataChildRef(cMetadata) {
			var parentMetadataChildRef = cMetadata.getFirstChildByNameInData("childReferences").children
					.find(function(metadataChildRef) {
						var cMetadataChildRef = CORA.coraData(metadataChildRef);
						return cMetadataChildRef.getFirstAtomicValueByNameInData("ref") === metadataId;
					});
			return CORA.coraData(parentMetadataChildRef);
		}

		function calculateIsRepeating() {
			if (repeatMax > 1 || repeatMax === "X") {
				return true;
			}
			return false;
		}

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pChildRefHandler " + presentationId;

			return viewNew;
		}

		function createChildrenView() {
			var childrenViewNew = document.createElement("span");
			childrenViewNew.className = "childrenView";
			return childrenViewNew;
		}

		function createButtonView() {
			var buttonViewNew = document.createElement("span");
			buttonViewNew.className = "buttonView";

			return buttonViewNew;
		}

		function createAddButton() {
			var button = document.createElement("input");
		    button.type = "button";
		    button.value = "ADD";
			return button;
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		function handleMsg(dataFromMsg) {
			if (metadataId === dataFromMsg.metadataId) {
				add(dataFromMsg.repeatId);
			}
		}

		function add(repeatId) {
			var newPath = calculatePathForNewElement(repeatId);
			var presentation = presentationFactory.factor(newPath, cPresentation);
			childrenView.appendChild(presentation.getView());
		}

		function calculatePathForNewElement(repeatId) {
			var pathCopy = JSON.parse(JSON.stringify(parentPath));
			var childPath = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId);
			if (pathCopy.children === undefined) {
				return childPath;
			}
			var lowestPath = getLowestPath(pathCopy);
			lowestPath.children.push(childPath);
			return pathCopy;
		}

		function createLinkedPathWithNameInDataAndRepeatId(nameInDataForPath, repeatIdForPath) {
			var path = {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInDataForPath
				} ]
			};
			if (repeatIdForPath !== undefined) {
				path.children.push({
					"name" : "repeatId",
					"value" : repeatIdForPath
				});
			}
			return path;
		}

		function getLowestPath(path) {
			var cPath = CORA.coraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPath(cPath.getFirstChildByNameInData("linkedPath"));
			}
			return path;
		}

		function sendAdd() {
			var data = {
				"metadataId" : metadataId,
				"path" : parentPath
			};
			spec.jsBookkeeper.add(data);
		}

		var out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			sendAdd : sendAdd
		});
		view.modelObject = out;
		addButton.onclick = sendAdd;
		return out;
	};
	return cora;
}(CORA));