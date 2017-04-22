/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	cora.pRecordLink = function(dependencies, spec) {
		var cPresentation = spec.cPresentation;
		var metadataProvider = dependencies.metadataProvider;
		var textProvider = dependencies.textProvider;

		var presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		var cPresentationGroup = CORA.coraData(presentationGroup);
		var metadataId = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var cMetadataElement = getMetadataById(metadataId);
		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");

		var view = createBaseView();
		createValueView();

		dependencies.pubSub.subscribe("linkedData", spec.path, undefined, handleMsg);

		function createBaseView() {
			var textId =   extractTextId("textId");
			var text =textProvider.getTranslation(textId);

			var defTextId =  extractTextId("defTextId");
			var defText = textProvider.getTranslation(defTextId);
			
			var linkedRecordType = cMetadataElement
					.getFirstAtomicValueByNameInData("linkedRecordType");
			var viewSpec = {
				"presentationId" : "somePresentationId",
				"mode" : "input",
				"info" : {
					"text" : text,
					"defText" : defText,
					"technicalInfo" : [ "textId: " + textId, "defTextId: " + defTextId,
							"metadataId: " + metadataId, "nameInData: " + nameInData,
							"linkedRecordType: " + linkedRecordType]
				}
			};
			return dependencies.pRecordLinkViewFactory.factor(viewSpec);
		}
		
		function extractTextId(textNameInData){
			var cTextIdGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData(textNameInData));
			return  cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			 
		}

		function createValueView() {
			if (mode === "input") {
				createAndAddInputs();
			} else {
				createAndAddOutput();
			}
		}

		function handleMsg(dataFromMsg) {
			createLinkedRecordPresentationView(dataFromMsg);
		}

		function createLinkedRecordPresentationView(dataFromMessage) {
			if (linkedRecordCanBeRead(dataFromMessage)) {
				createRecordViewerForLinkedRecord(dataFromMessage.data);
			}
		}

		function linkedRecordCanBeRead(dataFromMessage) {
			return cPresentation.containsChildWithNameInData("linkedRecordPresentations")
					&& messageContainsDataWithActionLinks(dataFromMessage);
		}

		function messageContainsDataWithActionLinks(dataFromMessage) {
			return dataFromMessage.data !== undefined
					&& undefined !== dataFromMessage.data.actionLinks;
		}

		function createRecordViewerForLinkedRecord(data) {
			var linkedRecordPresentation = findPresentationForRecordType(data);

			if (presentationExistsForLinkedRecordType(linkedRecordPresentation)) {
				removeIdPresentations();
				var linkedPresentationId = extractPresentationIdFromPresentation(linkedRecordPresentation);
				var readLink = data.actionLinks.read;
				createRecordViewerUsingChosenPresentationForLinkedRecord(readLink,
						linkedPresentationId);
			}
		}

		function findPresentationForRecordType(data) {
			var filter = createLinkedRecordTypeFilter(data);

			var linkedRecordPresentations = cPresentation
					.getFirstChildByNameInData("linkedRecordPresentations");
			return linkedRecordPresentations.children.find(filter);
		}

		function createLinkedRecordTypeFilter(data) {
			var cData = CORA.coraData(data);
			var recordTypeId = cData.getFirstAtomicValueByNameInData("linkedRecordType");

			return function(child) {
				var cChild = CORA.coraData(child);
				var linkedRecordType = cChild.getFirstAtomicValueByNameInData("linkedRecordType");
				return linkedRecordType === recordTypeId;
			};
		}

		function presentationExistsForLinkedRecordType(linkedRecordPresentation) {
			return linkedRecordPresentation !== undefined;
		}

		function removeIdPresentations() {
			view.hideChildren();
		}

		function createRecordViewerUsingChosenPresentationForLinkedRecord(readLink,
				linkedPresentationId) {
			var recordViewerSpec = createRecordViewerSpec(readLink, linkedPresentationId);
			var recordViewer = CORA.recordViewer(recordViewerSpec);
			var recordViewerView = recordViewer.getView();

			view.addLinkedPresentation(recordViewerView);
		}

		function createRecordViewerSpec(readLink, linkedPresentationId) {
			var cLinkedRecordPresentation = getMetadataById(linkedPresentationId);

			var presentationOfLink = cLinkedRecordPresentation
					.getFirstChildByNameInData("presentationOf");
			var cPresentationOfLink = CORA.coraData(presentationOfLink);
			var linkedMetadataId = cPresentationOfLink
					.getFirstAtomicValueByNameInData("linkedRecordId");
			return {
				"read" : readLink,
				"presentationId" : linkedPresentationId,
				"metadataId" : linkedMetadataId,
				"recordGuiFactory" : dependencies.recordGuiFactory,
				"ajaxCallFactory" : dependencies.ajaxCallFactory
			};
		}

		function extractPresentationIdFromPresentation(presentation) {
			var cChildPresentation = CORA.coraData(presentation);
			return cChildPresentation.getFirstAtomicValueByNameInData("presentationId");
		}

		function createAndAddInputs() {
			var recordIdPVarId = "linkedRecordIdPVar";
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				recordIdPVarId = "linkedRecordIdOutputPVar";
			}
			createChildView("linkedRecordId", recordIdPVarId);

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdPVar", true);
			}
		}

		function createChildView(id, presentationIdToFactor, addText) {
			var metadataIdUsedInData = id + "TextVar";
			var childViewNew = document.createElement("span");
			childViewNew.className = id + "View";
			if (addText) {
				childViewNew.appendChild(createText(id + "Text"));
			}

			var childParentPath = calculateNewPath(id + "TextVar");
			var cPresentationChild = CORA.coraData(metadataProvider
					.getMetadataById(presentationIdToFactor));
			var pVar = dependencies.presentationFactory.factor(childParentPath,
					metadataIdUsedInData, cPresentationChild);
			childViewNew.appendChild(pVar.getView());
			view.addChild(childViewNew);
		}

		function createText(presRef) {
			var text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		}

		function calculateNewPath(metadataIdToAdd) {
			var pathSpec = {
				"metadataProvider" : dependencies.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"parentPath" : spec.path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createAndAddOutput() {
			createChildView("linkedRecordId", "linkedRecordIdOutputPVar");

			if (hasLinkedRepeatId) {
				createChildView("linkedRepeatId", "linkedRepeatIdOutputPVar", true);
			}
		}

		function getView() {
			return view.getView();
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "pRecordLink",
			getDependencies : getDependencies,
			getView : getView,
			handleMsg : handleMsg
		});
		return out;
	};
	return cora;
}(CORA));