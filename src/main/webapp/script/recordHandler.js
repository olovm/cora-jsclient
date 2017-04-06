/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.recordHandler = function(dependencies, spec) {
		var recordTypeRecordId = spec.recordTypeRecordId;

		var managedGuiItemSpec = {
			"activateMethod" : spec.jsClient.showView,
			"removeMethod" : spec.jsClient.viewRemoved
		};
		var managedGuiItem = dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		spec.addToRecordTypeHandlerMethod(managedGuiItem);
		spec.jsClient.showView(managedGuiItem);

		var messageHolder = CORA.messageHolder();
		managedGuiItem.addWorkPresentation(messageHolder.getView());

		var recordHandlerView = createRecordHandlerView();
		managedGuiItem.addWorkPresentation(recordHandlerView.getView());

		var busy = CORA.busy();
		managedGuiItem.addWorkPresentation(busy.getView());

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

		function createGuiForNew(oldData) {
			try {
				var metadataId = spec.newMetadataId;
				recordGuiNew = createRecordGui(metadataId, oldData);
				recordGui = recordGuiNew;
				addNewRecordToWorkView(recordGuiNew, metadataId);
				addRecordToMenuView(recordGuiNew, metadataId);
				addToShowView(recordGuiNew, metadataId);
				recordGuiNew.initMetadataControllerStartingGui();
				dataIsChanged = true;
				managedGuiItem.setChanged(dataIsChanged);
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata, " + error);
				recordHandlerView.addToEditView(document.createTextNode(error.stack));
			}
		}

		function createRecordGui(metadataId, data, dataDivider) {
			var createdRecordGui = dependencies.recordGuiFactory.factor(metadataId, data,
					dataDivider);
			var pubSub = createdRecordGui.pubSub;
			subscribeToAllMessagesForAllPaths(pubSub);
			return createdRecordGui;
		}

		function subscribeToAllMessagesForAllPaths(pubSub) {
			pubSub.subscribe("*", {}, undefined, handleMsg);
		}

		function handleMsg(dataFromMsg, msg) {
			if (initComplete && msgChangesData(msg)) {
				dataIsChanged = true;
				managedGuiItem.setChanged(dataIsChanged);
			}
			if (messageSaysInitIsComplete(msg)) {
				initComplete = true;
			}
			if (messageSaysUpdateRecord(msg)) {
				sendUpdateDataToServer();
			}
		}

		function msgChangesData(msg) {
			return !msg.endsWith("add") && !msg.endsWith("initComplete");
		}

		function messageSaysInitIsComplete(msg) {
			return msg.endsWith("initComplete");
		}

		function messageSaysUpdateRecord(msg) {
			return msg.endsWith("updateRecord");
		}

		function addNewRecordToWorkView(recordGuiToAdd, metadataIdUsedInData) {
			var newPresentationFormId = spec.newPresentationFormId;
			var presentationView = recordGuiToAdd.getPresentation(newPresentationFormId,
					metadataIdUsedInData).getView();
			recordHandlerView.addToEditView(presentationView);
			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
		}

		function addRecordToMenuView(recordGuiToAdd, metadataIdUsedInData) {
			var menuPresentationViewId = spec.menuPresentationViewId;
			var menuPresentationView = recordGuiToAdd.getPresentation(menuPresentationViewId,
					metadataIdUsedInData).getView();
			managedGuiItem.clearMenuView();
			managedGuiItem.addMenuPresentation(menuPresentationView);
		}

		function createRecordHandlerView() {
			var recordHandlerViewSpec = {
				"extraClassName" : recordTypeRecordId
			};
			return dependencies.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		}

		function sendNewDataToServer() {
			if (recordGuiNew.validateData()) {
				busy.show();

				var callAfterAnswer = resetViewsAndProcessFetchedRecord;
				var createLink = spec.createLink;
				var callSpec = {
					"requestMethod" : createLink.requestMethod,
					"url" : createLink.url,
					"contentType" : createLink.contentType,
					"accept" : createLink.accept,
					"loadMethod" : callAfterAnswer,
					"errorMethod" : callError,
					"data" : JSON.stringify(recordGuiNew.dataHolder.getData())
				};
				dependencies.ajaxCallFactory.factor(callSpec);
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
			managedGuiItem.setChanged(dataIsChanged);
			processFetchedRecord(answer);
		}

		function fetchDataFromServer(callAfterAnswer) {
			busy.show();
			var readLink = spec.record.actionLinks.read;
			var callSpec = {
				"requestMethod" : readLink.requestMethod,
				"url" : readLink.url,
				"contentType" : readLink.contentType,
				"accept" : readLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function processFetchedRecord(answer) {
			fetchedRecord = getRecordPartFromAnswer(answer);
			// data should be dataFromBeforeLogin or from answer depending on...
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
				// print raw data if we crash when creating data, (missing metadata)
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
			spec.createRecordHandlerMethod("new", recordGui.dataHolder.getData());
		}

		function notAbstractRecordRecordType() {
			return "true" !== spec.abstract;
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
			var editViewId = spec.presentationFormId;
			var editView = recordGuiToAdd.getPresentation(editViewId, metadataIdUsedInData)
					.getView();
			recordHandlerView.addToEditView(editView);
		}

		function addToShowView(recordGuiToAdd, metadataIdUsedInData) {
			var showViewId = spec.presentationViewId;

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
			managedGuiItem.addWorkPresentation(questionView);
		}

		function afterDelete() {
			managedGuiItem.remove();
		}

		function sendDeleteDataToServer() {
			busy.show();
			var deleteLink = fetchedRecord.actionLinks["delete"];
			var callSpec = {
				"requestMethod" : deleteLink.requestMethod,
				"url" : deleteLink.url,
				"loadMethod" : afterDelete,
				"errorMethod" : callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function sendUpdateDataToServer() {
			var callAfterAnswer = resetViewsAndProcessFetchedRecord;
			if (recordGui.validateData()) {
				busy.show();

				var updateLink = fetchedRecord.actionLinks.update;
				var callSpec = {
					"requestMethod" : updateLink.requestMethod,
					"url" : updateLink.url,
					"contentType" : updateLink.contentType,
					"accept" : updateLink.accept,
					"loadMethod" : callAfterAnswer,
					"errorMethod" : callError,
					"data" : JSON.stringify(recordGui.dataHolder.getData())
				};
				dependencies.ajaxCallFactory.factor(callSpec);
			}
		}

		function createRawDataWorkView(data) {
			recordHandlerView.addToEditView(document.createTextNode(JSON.stringify(data)));
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

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			"type" : "recordHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			processFetchedRecord : processFetchedRecord,
			resetViewsAndProcessFetchedRecord : resetViewsAndProcessFetchedRecord,
			afterDelete : afterDelete,
			handleMsg : handleMsg,
			getDataIsChanged : getDataIsChanged,
			copyData : copyData,
			showData : showData
		});
	};
	return cora;
}(CORA));