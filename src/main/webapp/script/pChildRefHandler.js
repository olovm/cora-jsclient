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
		var cPresentationMinimized = spec.cPresentationMinimized;
		var minimizedDefault = spec.minimizedDefault;
		var cParentPresentation = spec.cParentPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var presentationFactory = spec.presentationFactory;

		var presentationId = findPresentationId(cPresentation);
		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);

		var cParentMetadataChildRef = findParentMetadataChildRef(cParentMetadata);
		var repeatMin = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var pChildRefHandlerViewSpec = {
			"presentationId" : presentationId,
			"isRepeating" : isRepeating
		};
		if (showAddButton()) {
			pChildRefHandlerViewSpec.addMethod = sendAdd;
		}
		var pChildRefHandlerView = CORA.pChildRefHandlerView(pChildRefHandlerViewSpec);

		var view = pChildRefHandlerView.getView();

		var noOfRepeating = 0;

		pubSub.subscribe("add", parentPath, undefined, handleMsg);
		pubSub.subscribe("move", parentPath, undefined, handleMsg);

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function findParentMetadataChildRef(cMetadata) {
			var children = cMetadata.getFirstChildByNameInData("childReferences").children;
			var parentMetadataChildRef = children.find(function(metadataChildRef) {
				var cMetadataChildRef = CORA.coraData(metadataChildRef);
				return cMetadataChildRef.getFirstAtomicValueByNameInData("ref") === metadataId;
			});
			return CORA.coraData(parentMetadataChildRef);
		}

		function calculateIsRepeating() {
			return (repeatMax > 1 || repeatMax === "X");
		}

		function calculateIsStaticNoOfChildren() {
			return (repeatMax === repeatMin);
		}

		function showAddButton() {
			return (isRepeating && !isStaticNoOfChildren) || isZeroToOne();
		}

		function isZeroToOne() {
			return (repeatMin === "0" && repeatMax === "1");
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		function handleMsg(dataFromMsg, msg) {
			// TODO: metadataId should be nameInData and attributes instead
			// to enable a "top" presentation to show data for all childtypes...
			// attributeReferences might be a list that this presentation accepts any in the list
			if (dataFromMsg !== undefined && metadataId === dataFromMsg.metadataId) {
				if (msg.endsWith("move")) {
					move(dataFromMsg, msg);
				} else {
					add(dataFromMsg.repeatId);
				}
			}
		}

		function add(repeatId) {
			noOfRepeating++;
			var newPath = calculatePathForNewElement(repeatId);
			var repeatingElement = createRepeatingElement(newPath);
			var repeatingElementView = repeatingElement.getView();
			pChildRefHandlerView.addChild(repeatingElementView);

			var presentation = presentationFactory.factor(newPath, cPresentation,
					cParentPresentation);
			repeatingElement.addPresentation(presentation);

			if (cPresentationMinimized !== undefined) {
				var presentationMinimized = presentationFactory.factor(newPath,
						cPresentationMinimized, cParentPresentation);
				repeatingElement.addPresentationMinimized(presentationMinimized, minimizedDefault);
			}

			subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(newPath,
					repeatingElementView);
			
			updateView();
		}

		function createRepeatingElement(path) {
			var repeatingElementSpec = {
				"repeatMin" : repeatMin,
				"repeatMax" : repeatMax,
				"path" : path,
				"jsBookkeeper" : spec.jsBookkeeper,
				"parentModelObject" : view.viewObject,
				"isRepeating" : isRepeating
			};
			return CORA.pRepeatingElement(repeatingElementSpec);
		}

		function subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(newPath,
				repeatingElementView) {
			if (showAddButton()) {
				var removeFunction = function() {
					pChildRefHandlerView.removeChild(repeatingElementView);
					childRemoved();
				};
				pubSub.subscribe("remove", newPath, undefined, removeFunction);
			}
		}

		function calculatePathForNewElement(repeatId) {
			var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			var attributes = getAttributesForMetadataId(cMetadataElement);
			var pathCopy = JSON.parse(JSON.stringify(parentPath));
			var childPath = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId,
					attributes);
			if (pathCopy.children === undefined) {
				return childPath;
			}
			var lowestPath = getLowestPath(pathCopy);
			lowestPath.children.push(childPath);
			return pathCopy;
		}

		function createLinkedPathWithNameInDataAndRepeatId(nameInDataForPath, repeatIdForPath,
				attributes) {
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

			if (attributes !== undefined) {
				path.children.push(attributes);
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

		function getAttributesForMetadataId(metadataElement) {
			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				return getAttributesForMetadataElement(metadataElement);
			}
			return undefined;
		}

		function getAttributesForMetadataElement(metadataElement) {
			var attributesOut = createAttributes();
			var attributeReferences = metadataElement
					.getFirstChildByNameInData("attributeReferences");
			var attributeReference;
			for (var i = 0; i < attributeReferences.children.length; i++) {
				attributeReference = attributeReferences.children[i];
				var attribute = getAttributeForAttributeReference(attributeReference, i);
				attributesOut.children.push(attribute);
			}
			return attributesOut;
		}

		function createAttributes() {
			return {
				"name" : "attributes",
				"children" : []
			};
		}

		function getAttributeForAttributeReference(attributeReference, index) {
			var attributeMetadata = getMetadataById(attributeReference.value);
			var attributeNameInData = attributeMetadata
					.getFirstAtomicValueByNameInData("nameInData");
			var finalValue = attributeMetadata.getFirstAtomicValueByNameInData("finalValue");

			return createAttributeWithNameAndValueAndRepeatId(attributeNameInData, finalValue,
					index);
		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
			return {
				"name" : "attribute",
				"repeatId" : repeatId || "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}

		function move(dataFromMsg, msg) {
			pChildRefHandlerView.moveChild(dataFromMsg);
		}

		function childRemoved() {
			noOfRepeating--;
			updateView();
		}

		function updateView() {
			if (showAddButton()) {
				updateButtonViewVisibility();
				updateChildrenRemoveButtonVisibility();
			}
			if (isRepeating) {
				updateChildrenDragButtonVisibility();
			}
		}

		function updateChildrenRemoveButtonVisibility() {
			if (minLimitOfChildrenReached()) {
				pChildRefHandlerView.hideChildrensRemoveButton();
			} else {
				pChildRefHandlerView.showChildrensRemoveButton();
			}
		}

		function minLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMin);
		}

		function updateChildrenDragButtonVisibility() {
			if (moreThenOneChild()) {
				pChildRefHandlerView.showChildrensDragButton();
			} else {
				pChildRefHandlerView.hideChildrensDragButton();
			}
		}
		function moreThenOneChild(){
			return noOfRepeating > 1;
		}

		function updateButtonViewVisibility() {
			if (maxLimitOfChildrenReached()) {
				pChildRefHandlerView.hideButtonView();
			} else {
				pChildRefHandlerView.showButtonView();
			}
		}

		function maxLimitOfChildrenReached() {
			return noOfRepeating === Number(repeatMax);
		}

		function sendAdd() {
			var data = {
				// TODO: metadataId should be nameInData and attributes instead
				// to enable a "top" presentation to show data for all childtypes...
				"metadataId" : metadataId,
				"path" : parentPath,
				"childReference" : cParentMetadataChildRef.getData()
			};
			spec.jsBookkeeper.add(data);
		}

		function childMoved(moveInfo) {
			var data = {
				"path" : parentPath,
				"metadataId" : metadataId,
				"moveChild" : moveInfo.moveChild,
				"basePositionOnChild" : moveInfo.basePositionOnChild,
				"newPosition" : moveInfo.newPosition
			};
			spec.jsBookkeeper.move(data);
		}
		var out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			isStaticNoOfChildren : isStaticNoOfChildren,
			sendAdd : sendAdd,
			childRemoved : childRemoved,
			childMoved : childMoved
		});

		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));