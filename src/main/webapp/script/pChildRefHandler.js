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
		// console.log("here1")
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
		// var cParentMetadataChildRef =
		// findParentMetadataChildRef(cMetadataElement);
		// console.log(metadataId)
		// console.log("here2")
		// console.log(JSON.stringify(cParentMetadata.getData()))
		var repeatMin = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();
		// console.log("here")
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

		var metadataHasAttributes = hasAttributes();
		var collectedAttributes = {};
		if (metadataHasAttributes) {
			collectedAttributes = collectAttributes();
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		}
		function collectAttributes() {
			var collectedAttributes = {};
			var attributeReferences = cMetadataElement
					.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				var cCollectionVariable = getMetadataById(attributeReference.value);
				var attributeNameInData = cCollectionVariable
						.getFirstAtomicValueByNameInData("nameInData");
				var attributeValues = [];
				collectedAttributes[attributeNameInData] = attributeValues;

				if (cCollectionVariable.containsChildWithNameInData("finalValue")) {
					attributeValues.push(cCollectionVariable
							.getFirstAtomicValueByNameInData("finalValue"));
				} else {
					// get collection and all items from it
					var attributeRefCollectionId = cCollectionVariable
							.getFirstAtomicValueByNameInData("refCollectionId");
					var cAttributeItemCollection = getMetadataById(attributeRefCollectionId);

					var collectionItemReferences = cAttributeItemCollection
							.getFirstChildByNameInData("collectionItemReferences");
					collectionItemReferences.children.forEach(function(itemCollectionRef) {
						var cAttributeCollectionItem = getMetadataById(itemCollectionRef.value);
						attributeValues.push(cAttributeCollectionItem
								.getFirstAtomicValueByNameInData("nameInData"));
					});
				}

			});
			// get metadata for each attribute reference
			// if final value return that else get refCollectionId metadata
			// get collectionItemReferences metadata (might be more than one)
			// get (ref) items metadata, get nameInData
			return collectedAttributes;
		}

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
			return repeatMax > 1 || repeatMax === "X";
		}

		function calculateIsStaticNoOfChildren() {
			return repeatMax === repeatMin;
		}

		function showAddButton() {
			return (isRepeating && !isStaticNoOfChildren) || isZeroToOne();
		}

		function isZeroToOne() {
			return repeatMin === "0" && repeatMax === "1";
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		function handleMsg(dataFromMsg, msg) {
			if (dataFromMsg !== undefined
					&& (metadataId === dataFromMsg.metadataId || shouldPresentData(
							dataFromMsg.nameInData, dataFromMsg.attributes))) {
				if (msg.endsWith("move")) {
					move(dataFromMsg);
				} else {
					add(dataFromMsg.metadataId, dataFromMsg.repeatId);
				}
			}
		}
		function shouldPresentData(nameInDataFromMsg, attributesFromMsg) {
			if (nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg)) {
				return false;
			}
			if (noAttributesInMessageNorHandledByThisPChildRefHandler(attributesFromMsg)) {
				return true;
			}
			if (metadataHasAttributes && attributesFromMsg !== undefined) {
				var attributeFromMsgKeys = Object.keys(attributesFromMsg);
				if (attributeFromMsgKeys.length === 0) {
					return false;
				}
				var sameAttributes = attributeFromMsgKeys.every(function(attributeFromMsgKey) {
					var attributeValueFromMsg = attributesFromMsg[attributeFromMsgKey];
					var collectedAttributeValues = collectedAttributes[attributeFromMsgKey];
					if (collectedAttributeValues === undefined) {
						return false;
					}
					return collectedAttributeValues.indexOf(attributeValueFromMsg[0]) > -1;
				});
				return sameAttributes;
			}
			return false;
		}
		
		function nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
					.getFirstAtomicValueByNameInData("nameInData");
		}
		
		function noAttributesInMessageNorHandledByThisPChildRefHandler(attributesFromMsg){
			return !metadataHasAttributes && attributesFromMsg === undefined;
		}
		
		function add(metadataIdToAdd, repeatId) {
			noOfRepeating++;
			var newPath = calculatePathForNewElement(metadataIdToAdd, repeatId);
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

		function calculatePathForNewElement(metadataIdToAdd, repeatId) {
			var cMetadataElementToAdd = getMetadataById(metadataIdToAdd);
			// var nameInData =
			// cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
			// var attributes = getAttributesForMetadataId(cMetadataElement);
			var nameInData = cMetadataElementToAdd.getFirstAtomicValueByNameInData("nameInData");
			var attributes = getAttributesForMetadataId(cMetadataElementToAdd);
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

		function move(dataFromMsg) {
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
		function moreThenOneChild() {
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
				"metadataId" : metadataId,
				"path" : parentPath,
				"childReference" : cParentMetadataChildRef.getData(),
				"nameInData" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (metadataHasAttributes) {
				console.log("hasAttributes in pChildRefHandler")
				data.attributes = collectAttributes();
			}
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