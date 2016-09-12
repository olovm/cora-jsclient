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
		var cParentMetadataChildRefPart = metadataHelper.getChildRefPartOfMetadata(
				spec.cParentMetadata, metadataId);
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

		var numberOfFiles = 0;
		var numberOfFilesStored = 0;

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function getMetadataIdFromPresentation() {
			if(spec.cPresentation.getData().attributes.type === "pGroup"){
				var presentationGroup = spec.cPresentation.getFirstChildByNameInData("presentationOf");
				var cPresentationGroup = CORA.coraData(presentationGroup)
				return cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

			}
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
			if (showFileUpload()) {
				pChildRefHandlerViewSpec.upload = "true";
				pChildRefHandlerViewSpec.handleFilesMethod = handleFiles;
			} else if (showAddButton()) {
				pChildRefHandlerViewSpec.addMethod = sendAdd;
			}
			return CORA.pChildRefHandlerView(pChildRefHandlerViewSpec);
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
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

		function showFileUpload() {
			if (currentChildRefIsRecordLink() && currentChildRefHasLinkedRecordType()) {
				return checkIfBinaryOrChildOfBinary();
			}
			return false;
		}

		function currentChildRefIsRecordLink() {
			return currentChildRefHasAttributes() && isOfTypeRecordLink();
		}

		function currentChildRefHasAttributes() {
			return cMetadataElement.getData().attributes !== undefined;
		}

		function isOfTypeRecordLink() {
			var attributes = cMetadataElement.getData().attributes;
			return attributes.type !== undefined && attributes.type === "recordLink";
		}

		function currentChildRefHasLinkedRecordType() {
			return cMetadataElement.containsChildWithNameInData("linkedRecordType");
		}

		function checkIfBinaryOrChildOfBinary() {
			var cRecordType = getLinkedRecordType();
			var cRecordInfo = CORA.coraData(cRecordType.getFirstChildByNameInData("recordInfo"));
			return isBinaryOrChildOfBinary(cRecordInfo, cRecordType);
		}

		function getLinkedRecordType() {
			var recordTypeId = cMetadataElement.getFirstAtomicValueByNameInData("linkedRecordType");
			var cRecordType = getRecordTypeById(recordTypeId);
			return cRecordType;
		}

		function getRecordTypeById(id) {
			return CORA.coraData(spec.recordTypeProvider.getRecordTypeById(id).data);
		}

		function isBinaryOrChildOfBinary(cRecordInfo, cRecordType) {
			return isBinary(cRecordInfo) || isChildOfBinary(cRecordType);
		}

		function isBinary(cRecordInfo) {
			return cRecordInfo.getFirstAtomicValueByNameInData("id") === "binary";
		}

		function isChildOfBinary(cRecordType) {
			return cRecordType.containsChildWithNameInData("parentId")
					&& cRecordType.getFirstAtomicValueByNameInData("parentId") === "binary";
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
			return metadataHelper.attributesMatch(collectedAttributes, attributesFromMsg);
		}

		function nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
					.getFirstAtomicValueByNameInData("nameInData");
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
			return calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd,
					repeatId, spec.parentPath);
		}

		function calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd, repeatId,
				parentPath) {
			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : parentPath
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
			return spec.jsBookkeeper.add(data);
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

		function handleFiles(files) {
			numberOfFiles = files.length;
			for (var i = 0; i < files.length; i++) {
				handleFile(files[i]);
			}
		}

		function handleFile(file) {
			var data = createNewBinaryData(file);
			var createLink = getLinkedRecordTypeCreateLink();

			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : createLink.requestMethod,
				"url" : createLink.url,
				"contentType" : createLink.contentType,
				"accept" : createLink.accept,
				"loadMethod" : processNewBinary,
				"errorMethod" : callError,
				"data" : JSON.stringify(data)
			};
			CORA.ajaxCall(callSpec);
		}

		function createNewBinaryData(file) {
			var dataDividerLinkedRecordId = getDataDividerFromSpec();
			var type = getTypeFromRecordType();
			return {
				"name" : "binary",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : dataDividerLinkedRecordId
						} ]
					} ]
				}, {
					"name" : "fileName",
					"value" : file.name
				}, {
					"name" : "fileSize",
					"value" : "" + file.size
				} ],
				"attributes" : {
					"type" : type
				}
			};
		}

		function getDataDividerFromSpec() {
			return spec.presentationFactory.getDataDivider();
		}

		function getNewMetadataGroupFromRecordType() {
			var recordType = getImplementingLinkedRecordType();
			var cData = CORA.coraData(recordType.data);
			var newMetadataId = cData.getFirstAtomicValueByNameInData("newMetadataId");
			return getMetadataById(newMetadataId);
		}

		function getImplementingLinkedRecordType() {
			var recordTypeId = cMetadataElement.getFirstAtomicValueByNameInData("linkedRecordType");
			recordTypeId = changeRecordTypeIdIfBinary(recordTypeId);
			return spec.recordTypeProvider.getRecordTypeById(recordTypeId);
		}

		function getLinkedRecordTypeCreateLink() {
			var recordType = getImplementingLinkedRecordType();
			return recordType.actionLinks.create;
		}

		function changeRecordTypeIdIfBinary(recordTypeId) {
			if (recordTypeId === "binary") {
				recordTypeId = "genericBinary";
			}
			return recordTypeId;
		}

		function getTypeFromRecordType() {
			var cMetadataGroup = getNewMetadataGroupFromRecordType();
			var attributeReferences = cMetadataGroup
					.getFirstChildByNameInData("attributeReferences");
			var cAttributeReferences = CORA.coraData(attributeReferences);
			var ref = cAttributeReferences.getFirstAtomicValueByNameInData("ref");
			var cItem = getMetadataById(ref);
			return cItem.getFirstAtomicValueByNameInData("finalValue");
		}

		function processNewBinary(answer) {
			var calculatedRepeatId = sendAdd();
			var data = getDataPartOfRecordFromAnswer(answer);
			var createdRecordId = getIdFromRecordData(data);
			var newPath1 = calculateNewPath(metadataId, calculatedRepeatId);
			var newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
					"linkedRecordIdTextVar", undefined, newPath1);
			var setValueData = {
				"data" : createdRecordId,
				"path" : newPath
			};
			spec.jsBookkeeper.setValue(setValueData);

			saveMainRecordIfAllFilesAreCreated();
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}

		function saveMainRecordIfAllFilesAreCreated() {
			numberOfFilesStored++;
			if (numberOfFiles === numberOfFilesStored) {
				spec.pubSub.publish("updateRecord", {
					"data" : "",
					"path" : {}
				});
				numberOfFilesStored = 0;
			}
		}

		function callError(answer) {
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			var errorChild = document.createElement("span");
			errorChild.innerHTML = messageSpec.message;
			pChildRefHandlerView.addChild(errorChild);
		}

		var out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating,
			isStaticNoOfChildren : isStaticNoOfChildren,
			sendAdd : sendAdd,
			childRemoved : childRemoved,
			childMoved : childMoved,
			handleFiles : handleFiles,
			processNewBinary : processNewBinary
		});

		pChildRefHandlerView.getView().modelObject = out;
		return out;
	};

	return cora;
}(CORA));