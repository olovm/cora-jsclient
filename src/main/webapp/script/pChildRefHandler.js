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
		var presentationId = findPresentationId(spec.cPresentation);
		var metadataId = getMetadataIdFromPresentation();
		var cMetadataElement = getMetadataById(metadataId);

		var cParentMetadataChildRef = findParentMetadataChildRef(spec.cParentMetadata);

		var repeatMin = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var pChildRefHandlerView = createPChildRefHandlerView();

		var noOfRepeating = 0;

		spec.pubSub.subscribe("add", spec.parentPath, undefined, handleMsg);
		spec.pubSub.subscribe("move", spec.parentPath, undefined, handleMsg);

		var metadataHasAttributes = hasAttributes();

		var metadataHelper = CORA.metadataHelper({
			"metadataProvider" : spec.metadataProvider
		});

		var collectedAttributes = metadataHelper.collectAttributesAsObjectForMetadataId(metadataId);
		

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

		function getView() {
			return pChildRefHandlerView.getView();
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

		function noAttributesInMessageNorHandledByThisPChildRefHandler(attributesFromMsg) {
			return !metadataHasAttributes && attributesFromMsg === undefined;
		}

		function add(metadataIdToAdd, repeatId) {
			noOfRepeating++;

			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : spec.parentPath
			};
			var newPath = CORA.calculatePathForNewElement(pathSpec);

			var repeatingElement = createRepeatingElement(newPath);
			var repeatingElementView = repeatingElement.getView();
			pChildRefHandlerView.addChild(repeatingElementView);

			var presentation = spec.presentationFactory.factor(newPath, spec.cPresentation,
					spec.cParentPresentation);
			repeatingElement.addPresentation(presentation);

			var cPresentationMinimized = spec.cPresentationMinimized;
			if (cPresentationMinimized !== undefined) {
				var presentationMinimized = spec.presentationFactory.factor(newPath,
						cPresentationMinimized, spec.cParentPresentation);
				repeatingElement.addPresentationMinimized(presentationMinimized,
						spec.minimizedDefault);
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
				"parentModelObject" : pChildRefHandlerView,
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
				spec.pubSub.subscribe("remove", newPath, undefined, removeFunction);
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
				"childReference" : cParentMetadataChildRef.getData(),
				"nameInData" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (metadataHasAttributes) {
				console.log("hasAttributes in pChildRefHandler")
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