/*
 * Copyright 2016 Uppsala University Library
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

		var recordHandlerView = createRecordHandlerView();
		workView.appendChild(recordHandlerView.getView());

		var recordGuiNew;
		var recordGui;
		var fetchedRecord;

		if ("new" === spec.presentationMode) {
			createGuiForNew();
		} else {
			fetchDataFromServer(processFetchedRecord);
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function createGuiForNew() {
			try {
				recordGuiNew = createRecordGui(getNewMetadataId());
				addNewRecordToWorkView(recordGuiNew);
				addRecordToMenuView(recordGuiNew);
				addToShowView(recordGuiNew);
				recordGuiNew.initMetadataControllerStartingGui();
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata");
			}
		}

		function getNewMetadataId() {
			return getRecordTypeRecordValue("newMetadataId");
		}
		function getRecordTypeRecordValue(id) {
			return cRecordTypeRecordData.getFirstAtomicValueByNameInData(id);
		}

		function createRecordGui(metadataId, data) {
			return spec.recordGuiFactory.factor(metadataId, data);
		}

		function addNewRecordToWorkView(recordGuiToAdd) {
			var presentationViewId = getPresentationNewViewId();
			var presentationView = recordGuiToAdd.getPresentation(presentationViewId).getView();
			recordHandlerView.addEditView(presentationView);
			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
		}

		function getPresentationNewViewId() {
			return getRecordTypeRecordValue("newPresentationFormId");
		}

		function addRecordToMenuView(recordGuiToAdd) {
			var menuPresentationViewId = getMenuPresentationViewId();
			var menuPresentationView = recordGuiToAdd.getPresentation(menuPresentationViewId)
					.getView();
			menuView.textContent = "";
			menuView.appendChild(menuPresentationView);
		}

		function createRecordHandlerView() {
			var recordHandlerViewSpec = {
				"extraClassName" : recordTypeRecordId
			};
			return spec.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		}

		function sendNewDataToServer() {
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

		function resetViewsAndProcessFetchedRecord(answer) {
			recordHandlerView.clearViews();
			processFetchedRecord(answer);
		}

		function fetchDataFromServer(callAfterAnswer) {
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
			try {
				var recordTypeId = getRecordTypeId(fetchedRecord);
				var metadataId = spec.jsClient.getMetadataIdForRecordTypeId(recordTypeId);
				recordGui = createRecordGui(metadataId, data);
				addRecordToWorkView(recordGui);
				addRecordToMenuView(recordGui);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				// print raw data if we crash when creating data, (missing
				// metadata)
				createRawDataWorkView(data);
			}
		}

		function getRecordPartFromAnswer(answer) {
			return JSON.parse(answer.responseText).record;
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function getRecordTypeId(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("type");
		}

		function addRecordToWorkView(recordGuiToAdd) {
			if (notAbstractRecordRecordType()) {

				if (recordHasDeleteLink()) {
					recordHandlerView.addButton("DELETE", sendDeleteDataToServer, "delete");
				}
				if (recordHasUpdateLink()) {
					addToEditView(recordGuiToAdd);
					recordHandlerView.addButton("UPDATE", sendUpdateDataToServer, "update");
				}
			}
			addToShowView(recordGuiToAdd);
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

		function addToEditView(recordGuiToAdd) {
			var editViewId = getPresentationFormId();
			var editView = recordGuiToAdd.getPresentation(editViewId).getView();
			recordHandlerView.addEditView(editView);
		}

		function addToShowView(recordGuiToAdd) {
			var showViewId = getPresentationViewId();
			var showView = recordGuiToAdd.getPresentation(showViewId).getView();
			recordHandlerView.addShowView(showView);
		}

		function sendDeleteDataToServer() {
			var callAfterAnswer = recordHandlerView.clearViews;
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
		function sendUpdateDataToServer(callAfterAnswer) {
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
		function createRawDataWorkView(data) {
			recordHandlerView.addEditView(document.createTextNode(JSON.stringify(data)));
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
			var errorView = document.createElement("span");
			errorView.textContent = JSON.stringify(answer.status);
			recordHandlerView.addEditView(errorView);
		}

		return Object.freeze({});
	};
	return cora;
}(CORA));