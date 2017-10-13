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

		var out;
		var readLink;
		var openLinkShowing = false;
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

		var recordIdPath = "";

		var cRecordTypeGroup = CORA.coraData(cMetadataElement
				.getFirstChildByNameInData("linkedRecordType"));
		var linkedRecordType = cRecordTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var view;
		function start() {
			dependencies.pubSub.subscribe("linkedData", spec.path, undefined, handleMsg);
			view = createBaseView();
			createValueView();
			possiblyCreateSearchHandler();
		}

		function createBaseView() {
			var textId = extractTextId("textId");
			var text = textProvider.getTranslation(textId);

			var defTextId = extractTextId("defTextId");
			var defText = textProvider.getTranslation(defTextId);

			var viewSpec = {
				"mode" : "input",
				"info" : {
					"text" : text,
					"defText" : defText,
					"technicalInfo" : [ "textId: " + textId, "defTextId: " + defTextId,
							"metadataId: " + metadataId, "nameInData: " + nameInData,
							"linkedRecordType: " + linkedRecordType ]
				},
				"pRecordLink" : out
			};
			return dependencies.pRecordLinkViewFactory.factor(viewSpec);
		}

		function extractTextId(textNameInData) {
			var cTextIdGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData(textNameInData));
			return cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
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
			manageOpeningOfLinkedRecord(dataFromMsg);
		}

		function createLinkedRecordPresentationView(dataFromMessage) {
			if (linkedRecordShouldBePresentedCanBeRead(dataFromMessage)) {
				createRecordViewerForLinkedRecord(dataFromMessage.data);
			}
		}
		function manageOpeningOfLinkedRecord(dataFromMessage) {
			if (messageContainsDataWithActionLinks(dataFromMessage)) {
				readLink = dataFromMessage.data.actionLinks.read;
				view.showOpenLinkedRecord();
				openLinkShowing = true;
			} else {
				if (openLinkShowing) {
					view.hideOpenLinkedRecord();
					openLinkShowing = false;
				}
			}
		}

		function linkedRecordShouldBePresentedCanBeRead(dataFromMessage) {
			return cPresentation.containsChildWithNameInData("linkedRecordPresentations")
					&& messageContainsDataWithActionLinks(dataFromMessage);
		}

		function messageContainsDataWithActionLinks(dataFromMessage) {
			return dataFromMessage.data !== undefined
					&& undefined !== dataFromMessage.data.actionLinks;
		}

		function createRecordViewerForLinkedRecord(data) {
			var linkedRecordPresentation = findPresentationForRecordType(data);

			readLink = data.actionLinks.read;
			if (presentationExistsForLinkedRecordType(linkedRecordPresentation)) {
				removeIdPresentations();
				var linkedPresentationId = extractPresentationIdFromPresentation(linkedRecordPresentation);
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
				var filterLinkedRecordType = cChild
						.getFirstAtomicValueByNameInData("linkedRecordType");
				return filterLinkedRecordType === recordTypeId;
			};
		}

		function presentationExistsForLinkedRecordType(linkedRecordPresentation) {
			return linkedRecordPresentation !== undefined;
		}

		function removeIdPresentations() {
			view.hideChildren();
		}

		function createRecordViewerUsingChosenPresentationForLinkedRecord(readLinkIn,
				linkedPresentationId) {
			var recordViewerSpec = createRecordViewerSpec(readLinkIn, linkedPresentationId);
			var recordViewer = CORA.recordViewer(recordViewerSpec);
			var recordViewerView = recordViewer.getView();

			view.addLinkedPresentation(recordViewerView);
		}

		function createRecordViewerSpec(readLinkIn, linkedPresentationId) {
			var cLinkedRecordPresentation = getMetadataById(linkedPresentationId);

			var presentationOfLink = cLinkedRecordPresentation
					.getFirstChildByNameInData("presentationOf");
			var cPresentationOfLink = CORA.coraData(presentationOfLink);
			var linkedMetadataId = cPresentationOfLink
					.getFirstAtomicValueByNameInData("linkedRecordId");
			return {
				"read" : readLinkIn,
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
			recordIdPath = calculateNewPath("linkedRecordIdTextVar");

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

		function possiblyCreateSearchHandler() {
			if (pRecordLinkHasLinkedSearch()) {
				possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch();
			}
		}

		function pRecordLinkHasLinkedSearch() {
			return cPresentation.containsChildWithNameInData("search");
		}

		function possiblyCreateSearchHandlerForPRecordLinkWithLinkedSearch() {
			var searchRecord = getSearchFromSearchProvider();
			if (userCanPerfomSearch(searchRecord)) {
				createSearchHandler(searchRecord);
			}
		}

		function userCanPerfomSearch(searchRecord) {
			return searchRecord.actionLinks.search !== undefined;
		}

		function getSearchFromSearchProvider() {
			var searchLink = cPresentation.getFirstChildByNameInData("search");
			var searchId = getRecordIdFromLink(searchLink);
			return dependencies.providers.searchProvider.getSearchById(searchId);
		}

		function createSearchHandler(searchRecord) {
			var cSearch = CORA.coraData(searchRecord.data);
			var metadataLink = cSearch.getFirstChildByNameInData("metadataId");
			var searchMetadataId = getRecordIdFromLink(metadataLink);
			var presentationLink = cSearch.getFirstChildByNameInData("presentationId");
			var searchPresentationId = getRecordIdFromLink(presentationLink);

			var searchSearchLink = searchRecord.actionLinks.search;

			var searchHandlerSpec = {
				"metadataId" : searchMetadataId,
				"presentationId" : searchPresentationId,
				"searchLink" : searchSearchLink,
				"triggerWhenResultIsChoosen" : setResultFromSearch
			};
			var searchHandler = dependencies.globalFactories.searchHandlerFactory
					.factor(searchHandlerSpec);
			view.addSearchHandlerView(searchHandler.getView());
		}

		function getRecordIdFromLink(metadataLink) {
			var cMetadataLink = CORA.coraData(metadataLink);
			return cMetadataLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getView() {
			return view.getView();
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function openLinkedRecord(openInfoFromView) {
			var openInfo = {
				"readLink" : readLink,
				"loadInBackground" : openInfoFromView.loadInBackground
			};
			dependencies.clientInstanceProvider.getJsClient().openRecordUsingReadLink(openInfo);
		}

		function setResultFromSearch(openInfo) {
			var cGroup = CORA.coraData(openInfo.record.data);
			var cRecordInfo = CORA.coraData(cGroup.getFirstChildByNameInData("recordInfo"));
			var recordId = cRecordInfo.getFirstAtomicValueByNameInData("id");
			var data = {
				"data" : recordId,
				"path" : recordIdPath
			};
			dependencies.pubSub.publish("setValue", data);
			var linkedData = {
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : linkedRecordType
				}, {
					"name" : "linkedRecordId",
					"value" : recordId
				} ],
				"actionLinks" : {
					"read" : openInfo.record.actionLinks.read
				},
				"name" : nameInData
			};
			var message = {
				"data" : linkedData,
				"path" : spec.path
			};
			dependencies.pubSub.publish("linkedData", message);
		}

		function getDependencies() {
			return dependencies;
		}

		out = Object.freeze({
			"type" : "pRecordLink",
			getDependencies : getDependencies,
			getView : getView,
			handleMsg : handleMsg,
			openLinkedRecord : openLinkedRecord,
			setResultFromSearch : setResultFromSearch
		});
		start();
		return out;
	};
	return cora;
}(CORA));