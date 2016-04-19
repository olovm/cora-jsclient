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
		var metadataHelper = CORA.metadataHelper({
			"metadataProvider" : spec.metadataProvider
		});
		var presentationId = findPresentationId(spec.cPresentation);
		var metadataId = getMetadataIdFromPresentation();
		var cMetadataElement = getMetadataById(metadataId);

		var cParentMetadataChildRefPart = getChildRefPartOfMetadata(spec.cParentMetadata,
				metadataId);
		var repeatMin = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRefPart.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var noOfRepeating = 0;
		var metadataHasAttributes = hasAttributes();
		var collectedAttributes = collectAttributesForMetadataId(metadataId);

		var pChildRefHandlerView = createPChildRefHandlerView();
		spec.pubSub.subscribe("add", spec.parentPath, undefined, handleMsg);
		spec.pubSub.subscribe("move", spec.parentPath, undefined, handleMsg);

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function getMetadataIdFromPresentation() {
			return spec.cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		}

		function getMetadataById(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		}

		function collectAttributesForMetadataId(metadataIdIn) {

			return metadataHelper.collectAttributesAsObjectForMetadataId(metadataIdIn);
		}

		function createPChildRefHandlerView() {
			var pChildRefHandlerViewSpec = {
				"presentationId" : presentationId,
				"isRepeating" : isRepeating
			};
			if (showAddButton()) {
				pChildRefHandlerViewSpec.addMethod = sendAdd;
			}
			return CORA.pChildRefHandlerView(pChildRefHandlerViewSpec);
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function getChildRefPartOfMetadata(cMetadata, metadataIdToFind) {
			var cMetadataToFind = getMetadataById(metadataIdToFind);
			var nameInDataToFind = cMetadataToFind.getFirstAtomicValueByNameInData("nameInData");
			var attributesToFind = metadataHelper
					.collectAttributesAsObjectForMetadataId(metadataIdToFind);

			var findFunction = function(metadataChildRef) {
				var childMetadataId = getMetadataIdFromRef(metadataChildRef);
				var childAttributesToFind = metadataHelper
						.collectAttributesAsObjectForMetadataId(childMetadataId);
				var childNameInData = getNameInDataFromMetadataChildRef(metadataChildRef);
				return childNameInData === nameInDataToFind
						&& sameAttributes(attributesToFind, childAttributesToFind);
			};
			var children = cMetadata.getFirstChildByNameInData("childReferences").children;
			var parentMetadataChildRef = children.find(findFunction);
			return CORA.coraData(parentMetadataChildRef);
		}
		function getMetadataIdFromRef(metadataChildRef) {
			var cMetadataChildRef = CORA.coraData(metadataChildRef);
			var childMetadataId = cMetadataChildRef.getFirstAtomicValueByNameInData("ref");
			return childMetadataId;
		}

		function getNameInDataFromMetadataChildRef(metadataChildRef) {
			var childMetadataId = getMetadataIdFromRef(metadataChildRef);
			var cChildMetadata = getMetadataById(childMetadataId);
			var childNameInData = cChildMetadata.getFirstAtomicValueByNameInData("nameInData");
			return childNameInData;
		}

		function sameAttributes(attributes1, attributes2) {
			var attributeKeys1 = Object.keys(attributes1);
			var attributeKeys2 = Object.keys(attributes2);
			if (notSameNumberOfKeys(attributeKeys1, attributeKeys2)) {
				return false;
			}
			if (noAttributesToCompare(attributeKeys1)) {
				return true;
			}
			return compareExistingAttributes(attributes1, attributes2);
		}

		function notSameNumberOfKeys(attributeKeys1, attributeKeys2) {
			if (attributeKeys1.length !== attributeKeys2.length) {
				return true;
			}
			return false;
		}

		function noAttributesToCompare(attributeKeys1) {
			if (attributeKeys1.length === 0) {
				return true;
			}
			return false;
		}

		function compareExistingAttributes(attributes1, attributes2) {
			var attributeKeys1 = Object.keys(attributes1);
			var attributeExistsInAttributes2 = function(attributeKey) {
				var attributeValues1 = attributes1[attributeKey];
				var attributeValues2 = attributes2[attributeKey];
				if (attributeValues2 === undefined) {
					return false;
				}
				return attributeValues2.indexOf(attributeValues1[0]) > -1;
			};

			var attributeMatches = attributeKeys1.every(attributeExistsInAttributes2);
			return attributeMatches;
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

		function getView() {
			return pChildRefHandlerView.getView();
		}

		function handleMsg(dataFromMsg, msg) {
			if (messageIsHandledByThisPChildRefHandler(dataFromMsg)) {
				processMsg(dataFromMsg, msg);
			}
		}

		function messageIsHandledByThisPChildRefHandler(dataFromMsg) {
			if (metadataIdSameAsInMessage(dataFromMsg)) {
				return true;
			}
			return shouldPresentData(dataFromMsg.nameInData, dataFromMsg.attributes);
		}

		function metadataIdSameAsInMessage(dataFromMsg) {
			return metadataId === dataFromMsg.metadataId;
		}

		function shouldPresentData(nameInDataFromMsg, attributesFromMsg) {
			if (nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg)) {
				return false;
			}
			if (noAttributesInMessageNorThisPChildRefHandler(attributesFromMsg)) {
				return true;
			}
			if (attributesInMessageAndThisPChildRefHandler(attributesFromMsg)) {
				return sameAttributesInMessageAsThisPChildRefHandler(attributesFromMsg);
			}
			return false;
		}

		function nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
					.getFirstAtomicValueByNameInData("nameInData");
		}

		function noAttributesInMessageNorThisPChildRefHandler(attributesFromMsg) {
			return !metadataHasAttributes && attributesFromMsg === undefined;
		}

		function attributesInMessageAndThisPChildRefHandler(attributesFromMsg) {
			return metadataHasAttributes && attributesFromMsg !== undefined;
		}

		function sameAttributesInMessageAsThisPChildRefHandler(attributesFromMsg) {
			var attributeFromMsgKeys = Object.keys(attributesFromMsg);
			if (attributeFromMsgKeys.length === 0) {
				return false;
			}

			var attributeExistsInCollectedAttributes = function(attributeFromMsgKey) {
				var attributeValueFromMsg = attributesFromMsg[attributeFromMsgKey];
				var collectedAttributeValues = collectedAttributes[attributeFromMsgKey];
				if (collectedAttributeValues === undefined) {
					return false;
				}
				return collectedAttributeValues.indexOf(attributeValueFromMsg[0]) > -1;
			};

			var attributeMatches = attributeFromMsgKeys.every(attributeExistsInCollectedAttributes);
			return attributeMatches;
		}

		function processMsg(dataFromMsg, msg) {
			if (msg.endsWith("move")) {
				move(dataFromMsg);
			} else {
				add(dataFromMsg.metadataId, dataFromMsg.repeatId);
			}
		}

		function add(metadataIdToAdd, repeatId) {
			noOfRepeating++;
			var newPath = calculateNewPath(metadataIdToAdd, repeatId);
			var repeatingElement = createRepeatingElement(newPath);
			pChildRefHandlerView.addChild(repeatingElement.getView());
			addPresentationsToRepeatingElementsView(repeatingElement);
			subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(repeatingElement);
			updateView();
		}

		function calculateNewPath(metadataIdToAdd, repeatId) {
			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : spec.parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createRepeatingElement(path) {
			var repeatingElementSpec = {
				"repeatMin" : repeatMin,
				"repeatMax" : repeatMax,
				"path" : path,
				"jsBookkeeper" : spec.jsBookkeeper,
				"parentModelObject" : pChildRefHandlerView,
				"isRepeating" : isRepeating
			};
			return CORA.pRepeatingElement(repeatingElementSpec);
		}

		function addPresentationsToRepeatingElementsView(repeatingElement) {
			var path = repeatingElement.getPath();

			var presentation = getPresentation(path, spec.cPresentation);
			repeatingElement.addPresentation(presentation);

			if (hasMinimizedPresentation()) {
				var presentationMinimized = getPresentation(path, spec.cPresentationMinimized);
				repeatingElement.addPresentationMinimized(presentationMinimized,
						spec.minimizedDefault);
			}
		}

		function getPresentation(path, cPresentation) {
			return spec.presentationFactory.factor(path, cPresentation, spec.cParentPresentation);
		}

		function hasMinimizedPresentation() {
			return spec.cPresentationMinimized !== undefined;
		}

		function subscribeToRemoveMessageToRemoveRepeatingElementFromChildrenView(repeatingElement) {
			if (showAddButton()) {
				var removeFunction = function() {
					pChildRefHandlerView.removeChild(repeatingElement.getView());
					childRemoved();
				};
				spec.pubSub.subscribe("remove", repeatingElement.getPath(), undefined,
						removeFunction);
			}
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
				"path" : spec.parentPath,
				"childReference" : cParentMetadataChildRefPart.getData(),
				"nameInData" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (metadataHasAttributes) {
				data.attributes = collectedAttributes;
			}
			spec.jsBookkeeper.add(data);
		}

		function childMoved(moveInfo) {
			var data = {
				"path" : spec.parentPath,
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

		pChildRefHandlerView.getView().modelObject = out;
		return out;
	};
	return cora;
}(CORA));