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
		var createNewRecord = spec.createNewRecord;
		var fetchLatestDataFromServer = spec.fetchLatestDataFromServer;
		var managedGuiItem;
		var messageHolder;
		var recordHandlerView;
		var busy;
		var recordGui;
		var fetchedRecord;
		var initComplete = false;
		var dataIsChanged = false;
		var metadataForRecordType;
		var recordTypeId;

		function start() {
			managedGuiItem = createManagedGuiItem();

			messageHolder = CORA.messageHolder();
			managedGuiItem.addWorkPresentation(messageHolder.getView());

			recordHandlerView = createRecordHandlerView();

			managedGuiItem.addWorkPresentation(recordHandlerView.getView());

			busy = CORA.busy();
			managedGuiItem.addWorkPresentation(busy.getView());

			createNewOrFetchDataFromServerForExistingRecord();
		}

		function createManagedGuiItem() {
			var managedGuiItemSpec = {
				"activateMethod" : spec.jsClient.showView,
				"removeMethod" : spec.jsClient.viewRemoved,
				"callOnMetadataReloadMethod" : reloadForMetadataChanges
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		}

		function createRecordHandlerView() {
			var recordHandlerViewSpec = {
				"extraClassName" : "recordHandler",
				"showDataMethod" : showData,
				"copyDataMethod" : copyData,
				"showIncomingLinksMethod" : showIncomingLinks
			};
			return dependencies.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		}

		function createNewOrFetchDataFromServerForExistingRecord() {
			if ("true" === createNewRecord) {
				createGuiForNew(spec.record);
			} else {
				if ("true" === fetchLatestDataFromServer) {
					fetchDataFromServer(processFetchedRecord);
				} else {
					fetchedRecord = spec.record;
					tryToProcessFetchedRecordData(spec.record.data);
				}
			}
		}

		function createGuiForNew(oldData) {
			try {
				tryToCreateGuiForNew(oldData);
			} catch (error) {
				showErrorInView(error, oldData);
			}
		}

		function tryToCreateGuiForNew(copiedData) {
			recordTypeId = spec.recordTypeRecordIdForNew;
			metadataForRecordType = spec.jsClient.getMetadataForRecordTypeId(recordTypeId);
			var metadataId = metadataForRecordType.newMetadataId;

			recordGui = createRecordGui(metadataId, copiedData);

			createAndAddViewsForNew(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();
			dataIsChanged = true;
			managedGuiItem.setChanged(dataIsChanged);

			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
		}

		function createAndAddViewsForNew(recordGuiIn, metadataId) {
			if ("true" !== spec.partOfList) {
				addNewEditPresentationToView(recordGuiIn, metadataId);
				addViewPresentationToView(recordGuiIn, metadataId);
				addMenuPresentationToView(recordGuiIn, metadataId);
			} else {
				addListPresentationToView(recordGuiIn, metadataId);
			}
		}

		function createRecordGui(metadataId, data, dataDivider) {
			var recordGuiSpec = {
				"metadataId" : metadataId,
				"data" : data,
				"dataDivider" : dataDivider
			};
			var createdRecordGui = dependencies.recordGuiFactory.factor(recordGuiSpec);

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

		function addNewEditPresentationToView(currentRecordGui, metadataIdUsedInData) {
			var newPresentationFormId = metadataForRecordType.newPresentationFormId;
			var presentationView = currentRecordGui.getPresentationHolder(newPresentationFormId,
					metadataIdUsedInData).getView();
			recordHandlerView.addToEditView(presentationView);
		}

		function addViewPresentationToView(currentRecordGui, metadataIdUsedInData) {
			var showViewId = metadataForRecordType.presentationViewId;
			var showView = currentRecordGui.getPresentationHolder(showViewId, metadataIdUsedInData)
					.getView();
			recordHandlerView.addToShowView(showView);
		}

		function addMenuPresentationToView(currentRecordGui, metadataIdUsedInData) {
			var menuPresentationViewId = metadataForRecordType.menuPresentationViewId;
			var menuPresentationView = currentRecordGui.getPresentationHolder(
					menuPresentationViewId, metadataIdUsedInData).getView();
			managedGuiItem.clearMenuView();
			managedGuiItem.addMenuPresentation(menuPresentationView);
		}

		function addListPresentationToView(currentRecordGui, metadataIdUsedInData) {
			var viewId = metadataForRecordType.listPresentationViewId;
			var presentation = currentRecordGui.getPresentationHolder(viewId, metadataIdUsedInData)
					.getView();
			managedGuiItem.addListPresentation(presentation);
		}

		function showErrorInView(error, data) {
			recordHandlerView
					.addObjectToEditView("something went wrong, probably missing metadata, "
							+ error);
			recordHandlerView.addObjectToEditView(data);
			recordHandlerView.addObjectToEditView(error.stack);
		}

		function sendNewDataToServer() {
			var createLink = metadataForRecordType.actionLinks.create;

			validateAndSendDataToServer(createLink);
		}

		function validateAndSendDataToServer(link) {
			if (recordGui.validateData()) {
				busy.show();

				var callAfterAnswer = resetViewsAndProcessFetchedRecord;
				var callSpec = {
					"requestMethod" : link.requestMethod,
					"url" : link.url,
					"contentType" : link.contentType,
					"accept" : link.accept,
					"loadMethod" : callAfterAnswer,
					"errorMethod" : callError,
					"data" : JSON.stringify(recordGui.dataHolder.getData())
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
			var data = fetchedRecord.data;
			processFetchedRecordData(data);
		}

		function processFetchedRecordData(data) {
			try {
				tryToProcessFetchedRecordData(data);
			} catch (error) {
				showErrorInView(error, data);
			}
		}

		function tryToProcessFetchedRecordData(data) {
			var cData = CORA.coraData(data);
			var dataDivider = getDataDividerFromData(cData);
			recordTypeId = getRecordTypeIdFromData(cData);
			metadataForRecordType = spec.jsClient.getMetadataForRecordTypeId(recordTypeId);

			var metadataId = metadataForRecordType.metadataId;

			recordGui = createRecordGui(metadataId, data, dataDivider);
			createAndAddViewsForExisting(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();

			addEditButtonsToView();
			possiblyShowShowIncomingLinksButton();
			busy.hideWithEffect();
		}

		function createAndAddViewsForExisting(recordGuiIn, metadataId) {
			if ("true" !== spec.partOfList) {
				if (recordHasUpdateLink()) {
					addEditPresentationToView(recordGuiIn, metadataId);
				}
				addViewPresentationToView(recordGuiIn, metadataId);
				addMenuPresentationToView(recordGuiIn, metadataId);
			} else {
				addListPresentationToView(recordGuiIn, metadataId);
			}
		}

		function getRecordPartFromAnswer(answer) {
			return JSON.parse(answer.responseText).record;
		}

		function getDataDividerFromData(cData) {
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getRecordTypeIdFromData(cData) {
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cTypeGroup = CORA.coraData(cRecordInfo.getFirstChildByNameInData("type"));
			return cTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function addEditPresentationToView(currentRecordGui, metadataIdUsedInData) {
			var editViewId = metadataForRecordType.presentationFormId;

			var editView = currentRecordGui.getPresentationHolder(editViewId, metadataIdUsedInData)
					.getView();
			recordHandlerView.addToEditView(editView);
		}

		function addEditButtonsToView() {
			if (recordHasDeleteLink()) {
				recordHandlerView.addButton("DELETE", shouldRecordBeDeleted, "delete");
			}
			if (recordHasUpdateLink()) {
				recordHandlerView.addButton("UPDATE", sendUpdateDataToServer, "update");
			}
			if(recordHasIndexLink()){
				recordHandlerView.addButton("INDEX", sendIndexDataToServer, "index");
			}
		}
		function possiblyShowShowIncomingLinksButton() {
			if (recordHasIncomingLinks()) {
				recordHandlerView.showShowIncomingLinksButton();
			}
		}

		function recordHasIncomingLinks() {
			var readIncomingLinks = fetchedRecord.actionLinks.read_incoming_links;
			return readIncomingLinks !== undefined;
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
			var recordHandlerSpec = {
				"fetchLatestDataFromServer" : "false",
				"partOfList" : "false",
				"createNewRecord" : "true",
				"record" : recordGui.dataHolder.getDataWithActionLinks(),
				"jsClient" : spec.jsClient,
				"recordTypeRecordIdForNew" : recordTypeId
			};
			var recordHandlerNew = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			var managedGuiItemNew = recordHandlerNew.getManagedGuiItem();
			spec.jsClient.addGuiItem(managedGuiItemNew);
			spec.jsClient.showView(managedGuiItemNew);
		}

		function recordHasDeleteLink() {
			var deleteLink = fetchedRecord.actionLinks["delete"];
			return deleteLink !== undefined;
		}

		function recordHasUpdateLink() {
			var updateLink = fetchedRecord.actionLinks.update;
			return updateLink !== undefined;
		}

		function recordHasIndexLink() {
			var indexLink = fetchedRecord.actionLinks["index"];
			return indexLink !== undefined;
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
			var updateLink = fetchedRecord.actionLinks.update;
			validateAndSendDataToServer(updateLink);
		}

		function sendIndexDataToServer() {
				busy.show();
				var indexHandlerSpec = {
						"loadMethod" : showIndexMessage
				};
				var indexHandler = dependencies.indexHandlerFactory.factor(indexHandlerSpec);
				indexHandler.indexData(fetchedRecord);

		}

		function showIndexMessage() {
			busy.hideWithEffect();
			var messageSpec = {
				"message" : "Posten är indexerad",
				"type" : CORA.message.POSITIVE
			};
			messageHolder.createMessage(messageSpec);
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

		function getManagedGuiItem() {
			return managedGuiItem;
		}

		function reloadForMetadataChanges() {
			recordHandlerView.clearDataViews();
			initComplete = false;
			var data = recordGui.dataHolder.getDataWithActionLinks();

			var metadataId = recordGui.getSpec().metadataId;
			var dataDivider = recordGui.getSpec().dataDivider;
			recordGui = createRecordGui(metadataId, data, dataDivider);
			if ("true" === createNewRecord) {
				createAndAddViewsForNew(recordGui, metadataId);
			} else {
				createAndAddViewsForExisting(recordGui, metadataId);
			}
			recordGui.initMetadataControllerStartingGui();
		}

		function showIncomingLinks() {
			var illhSpec = {
				"read_incoming_links" : fetchedRecord.actionLinks.read_incoming_links
			};
			var incomingLinksListHandler = dependencies.globalFactories.incomingLinksListHandlerFactory
					.factor(illhSpec);
			recordHandlerView.addToIncomingLinksView(incomingLinksListHandler.getView());
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		var out = Object.freeze({
			"type" : "recordHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			processFetchedRecord : processFetchedRecord,
			resetViewsAndProcessFetchedRecord : resetViewsAndProcessFetchedRecord,
			afterDelete : afterDelete,
			handleMsg : handleMsg,
			getDataIsChanged : getDataIsChanged,
			copyData : copyData,
			showData : showData,
			sendUpdateDataToServer : sendUpdateDataToServer,
			shouldRecordBeDeleted : shouldRecordBeDeleted,
			getManagedGuiItem : getManagedGuiItem,
			reloadForMetadataChanges : reloadForMetadataChanges,
			showIncomingLinks : showIncomingLinks,
			showIndexMessage : showIndexMessage
		});
		return out;
	};
	return cora;
}(CORA));