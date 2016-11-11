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
	cora.recordHandler = function(spec) {
		var cRecordTypeRecordData = CORA.coraData(spec.recordTypeRecord.data);
		var recordTypeRecordId = getIdFromRecord(spec.recordTypeRecord);

		var views = spec.views;

		var workView = views.workView;
		var menuView = views.menuView;
		var menuViewOrgClassName = views.originalClassName;

		var messageHolder = CORA.messageHolder();
		workView.appendChild(messageHolder.getView());

		var recordHandlerView = createRecordHandlerView();
		workView.appendChild(recordHandlerView.getView());

		var busy = CORA.busy();
		workView.appendChild(busy.getView());

		var recordGuiNew;
		var recordGui;
		var fetchedRecord;
		var initComplete = false;
		var dataIsChanged = false;

		recordHandlerView.setShowDataFunction(showData);
		recordHandlerView.setCopyAsNewFunction(copyData);

		if ("new" === spec.presentationMode) {
			createGuiForNew(spec.record);
		} else {
			fetchDataFromServer(processFetchedRecord);
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function createGuiForNew(oldData) {
			try {
				var metadataId = getNewMetadataId();
				recordGuiNew = createRecordGui(metadataId, oldData);
				recordGui = recordGuiNew;
				addNewRecordToWorkView(recordGuiNew, metadataId);
				addRecordToMenuView(recordGuiNew, metadataId);
				addToShowView(recordGuiNew, metadataId);
				recordGuiNew.initMetadataControllerStartingGui();
				dataIsChanged = true;
				updateMenuClassName();
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata, " + error);
				recordHandlerView.addToEditView(document.createTextNode(error.stack));
			}
		}

		function getNewMetadataId() {
			return getRecordTypeRecordValue("newMetadataId");
		}
		function getRecordTypeRecordValue(id) {
			return cRecordTypeRecordData.getFirstAtomicValueByNameInData(id);
		}

		function createRecordGui(metadataId, data, dataDivider) {
			var createdRecordGui = spec.recordGuiFactory.factor(metadataId, data, dataDivider);
			var pubSub = createdRecordGui.pubSub;
			subscribeToAllMessagesForAllPaths(pubSub);
			return createdRecordGui;
		}

		function subscribeToAllMessagesForAllPaths(pubSub) {
			pubSub.subscribe("*", {}, undefined, handleMsg);
		}

		function handleMsg(dataFromMsg, msg) {
			if (initComplete) {
				dataIsChanged = true;
			}
			if (messageSaysInitIsComplete(msg)) {
				initComplete = true;
			}
			if (messageSaysUpdateRecord(msg)) {
				sendUpdateDataToServer();
			}
			updateMenuClassName();
		}

		function messageSaysInitIsComplete(msg) {
			return msg.endsWith("initComplete");
		}

		function messageSaysUpdateRecord(msg) {
			return msg.endsWith("updateRecord");
		}

		function updateMenuClassName() {
			var className = menuViewOrgClassName;
			if (dataIsChanged) {
				className += ' changed';
			}
			views.originalClassName = className;

			if (views.isActive) {
				className += ' active';
			}
			menuView.className = className;
		}

		function addNewRecordToWorkView(recordGuiToAdd, metadataIdUsedInData) {
			var presentationViewId = getPresentationNewViewId();
			var presentationView = recordGuiToAdd.getPresentation(presentationViewId,
					metadataIdUsedInData).getView();
			recordHandlerView.addToEditView(presentationView);
			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
		}

		function getPresentationNewViewId() {
			return getRecordTypeRecordValue("newPresentationFormId");
		}

		function addRecordToMenuView(recordGuiToAdd, metadataIdUsedInData) {
			var menuPresentationViewId = getMenuPresentationViewId();
			var menuPresentationView = recordGuiToAdd.getPresentation(menuPresentationViewId,
					metadataIdUsedInData).getView();
			menuView.textContent = "";
			menuView.appendChild(menuPresentationView);
			menuView.appendChild(createRemoveButton());
		}

		function createRemoveButton() {
			return CORA.gui.createRemoveButton(removeViewsFromParentNodes);
		}

		function createRecordHandlerView() {
			var workItemViewFactory = {
				"factor" : function(workItemViewSpec) {
					return CORA.workItemView(workItemViewSpec);
				}
			};
			var recordHandlerViewSpec = {
				"workItemViewFactory" : workItemViewFactory,
				"extraClassName" : recordTypeRecordId
			};
			return spec.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		}

		function sendNewDataToServer() {
			if (recordGuiNew.validateData()) {
				busy.show();

				var callAfterAnswer = resetViewsAndProcessFetchedRecord;
				var createLink = spec.recordTypeRecord.actionLinks.create;
				var callSpec = {
					"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
					"method" : createLink.requestMethod,
					"url" : createLink.url,
					"contentType" : createLink.contentType,
					"accept" : createLink.accept,
					"loadMethod" : callAfterAnswer,
					"errorMethod" : callError,
					"data" : JSON.stringify(recordGuiNew.dataHolder.getData())
				};
				CORA.ajaxCall(callSpec);
			}
		}

		function resetViewsAndProcessFetchedRecord(answer) {
			busy.hideWithEffect();
			recordHandlerView.clearViews();
			var messageSpec = {
				"message" : "Tjohoo, det där gick ju bra, data sparat på servern!",
				"type" : CORA.message.POSITIVE
			};
			messageHolder.createMessage(messageSpec);
			initComplete = false;
			dataIsChanged = false;
			updateMenuClassName();
			processFetchedRecord(answer);
		}

		function fetchDataFromServer(callAfterAnswer) {
			busy.show();
			var readLink = spec.record.actionLinks.read;
			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : readLink.requestMethod,
				"url" : readLink.url,
				"contentType" : readLink.contentType,
				"accept" : readLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			CORA.ajaxCall(callSpec);
		}

		function processFetchedRecord(answer) {
			fetchedRecord = getRecordPartFromAnswer(answer);
			var data = getDataPartOfRecordFromAnswer(answer);
			var dataDivider = getDataDividerFromData(data);
			try {
				var recordTypeId = getRecordTypeId(fetchedRecord);
				var metadataId = spec.jsClient.getMetadataIdForRecordTypeId(recordTypeId);
				recordGui = createRecordGui(metadataId, data, dataDivider);
				addRecordToWorkView(recordGui, metadataId);
				addRecordToMenuView(recordGui, metadataId);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				// print raw data if we crash when creating data, (missing
				// metadata)
				createRawDataWorkView(data);
				recordHandlerView.addToEditView(document.createTextNode(error.stack));
			}
			busy.hideWithEffect();
		}

		function getRecordPartFromAnswer(answer) {
			return JSON.parse(answer.responseText).record;
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function getDataDividerFromData(data) {
			var cData = CORA.coraData(data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getRecordTypeId(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("type");
		}

		function addRecordToWorkView(recordGuiToAdd, metadataIdUsedInData) {
			if (notAbstractRecordRecordType()) {

				if (recordHasDeleteLink()) {
					recordHandlerView.addButton("DELETE", shouldRecordBeDeleted, "delete");
				}
				if (recordHasUpdateLink()) {
					addToEditView(recordGuiToAdd, metadataIdUsedInData);
					recordHandlerView.addButton("UPDATE", sendUpdateDataToServer, "update");
				}
			}
			addToShowView(recordGuiToAdd, metadataIdUsedInData);
		}

		function showData() {
			var messageSpec = {
				"message" : JSON.stringify(recordGui.dataHolder.getData()),
				"type" : CORA.message.INFO,
				"timeout" : 0
			};
			messageHolder.createMessage(messageSpec);
		}

		function copyData() {
			spec.recordTypeHandler.createRecordHandler("new", recordGui.dataHolder.getData());
		}

		function notAbstractRecordRecordType() {
			var abstractValue = getRecordTypeRecordValue("abstract");
			return "true" !== abstractValue;
		}

		function recordHasDeleteLink() {
			var deleteLink = fetchedRecord.actionLinks["delete"];
			return deleteLink !== undefined;
		}

		function recordHasUpdateLink() {
			var updateLink = fetchedRecord.actionLinks.update;
			return updateLink !== undefined;
		}

		function addToEditView(recordGuiToAdd, metadataIdUsedInData) {
			var editViewId = getPresentationFormId();
			var editView = recordGuiToAdd.getPresentation(editViewId, metadataIdUsedInData)
					.getView();
			recordHandlerView.addToEditView(editView);
		}

		function addToShowView(recordGuiToAdd, metadataIdUsedInData) {
			var showViewId = getPresentationViewId();
			var showView = recordGuiToAdd.getPresentation(showViewId, metadataIdUsedInData)
					.getView();
			recordHandlerView.addToShowView(showView);
		}

		function shouldRecordBeDeleted() {
			var questionSpec = {
				"text" : "Är du säker på att du vill ta bort posten?",
				"buttons" : [ {
					"text" : "Nej"
				}, {
					"text" : "Ja",
					"onclickFunction" : sendDeleteDataToServer
				} ]
			};
			var question = CORA.question(questionSpec);
			var questionView = question.getView();
			workView.appendChild(questionView);

		}

		function sendDeleteDataToServer() {
			busy.show();
			var callAfterAnswer = function() {
				recordHandlerView.clearViews();
				removeViewsFromParentNodes();
			};
			var deleteLink = fetchedRecord.actionLinks["delete"];
			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : deleteLink.requestMethod,
				"url" : deleteLink.url,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			CORA.ajaxCall(callSpec);
		}

		function removeViewsFromParentNodes() {
			if (menuView.parentNode !== null) {
				menuView.parentNode.removeChild(menuView);
			}
			if (workView.parentNode !== null) {
				workView.parentNode.removeChild(workView);
			}
		}

		function sendUpdateDataToServer() {
			var callAfterAnswer = resetViewsAndProcessFetchedRecord;
			if (recordGui.validateData()) {
				busy.show();

				var updateLink = fetchedRecord.actionLinks.update;
				var callSpec = {
					"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
					"method" : updateLink.requestMethod,
					"url" : updateLink.url,
					"contentType" : updateLink.contentType,
					"accept" : updateLink.accept,
					"loadMethod" : callAfterAnswer,
					"errorMethod" : callError,
					"data" : JSON.stringify(recordGui.dataHolder.getData())
				};
				CORA.ajaxCall(callSpec);
			}
		}

		function createRawDataWorkView(data) {
			recordHandlerView.addToEditView(document.createTextNode(JSON.stringify(data)));
		}

		function getPresentationViewId() {
			return getRecordTypeRecordValue("presentationViewId");
		}

		function getPresentationFormId() {
			return getRecordTypeRecordValue("presentationFormId");
		}

		function getMenuPresentationViewId() {
			return getRecordTypeRecordValue("menuPresentationViewId");
		}

		function callError(answer) {
			busy.hideWithEffect();
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function getDataIsChanged() {
			return dataIsChanged;
		}

		return Object.freeze({
			handleMsg : handleMsg,
			getDataIsChanged : getDataIsChanged,
			copyData : copyData,
			showData : showData
		});
	};
	return cora;
}(CORA));