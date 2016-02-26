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
		var recordTypeId = getIdFromRecord(spec.recordTypeRecord);

		var views = spec.views;

		var workView = views.workView;
		var menuView = views.menuView;

		var recordHandlerView = createRecordHandlerView();
		workView.appendChild(recordHandlerView.getView());

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

		var recordGui;
		function createGuiForNew() {
			try {
				recordGui = createRecordGui(getNewMetadataId());
				addNewRecordToWorkView(recordGui);
				addRecordToMenuView(recordGui);
				recordGui.initMetadataControllerStartingGui();
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

		function addNewRecordToWorkView(recordGui) {
			var presentationViewId = getPresentationNewViewId();
			var presentationView = recordGui.getPresentation(presentationViewId).getView();
			recordHandlerView.addEditView(presentationView);
			recordHandlerView.addButton("CREATE", sendDataToServer);
		}

		function getPresentationNewViewId() {
			return getRecordTypeRecordValue("newPresentationFormId");
		}

		function addRecordToMenuView(recordGui) {
			var menuPresentationViewId = getMenuPresentationViewId();
			var menuPresentationView = recordGui.getPresentation(menuPresentationViewId).getView();
			menuView.textContent = "";
			menuView.appendChild(menuPresentationView);
		}

		function createRecordHandlerView() {
			var recordHandlerViewSpec = {
				"extraClassName" : recordTypeId,
			};
			return spec.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		}

		function sendDataToServer(callAfterAnswer) {
			var createLink = spec.recordTypeRecord.actionLinks.create;
			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : createLink.requestMethod,
				"url" : createLink.url,
				"contentType" : createLink.contentType,
				"accept" : createLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError,
				"data" : JSON.stringify(recordGui.dataHolder.getData())
			};
			console.log(JSON.stringify(recordGui.dataHolder.getData()))
			console.log(JSON.stringify(callSpec))
			CORA.ajaxCall(callSpec);
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
			var data = getDataPartOfRecordFromAnswer(answer);
			try {
				var metadataId = getMetadataId();
				var recordGui = createRecordGui(metadataId, data);
				addRecordToWorkView(recordGui, data);
				addRecordToMenuView(recordGui);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				// print raw data if we crash when creating data, (missing
				// metadata)
				createRawDataWorkView(data);
			}
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function getMetadataId() {
			return getRecordTypeRecordValue("metadataId");
		}

		function addRecordToWorkView(recordGui, data) {
			var presentationViewId = getPresentationViewId();
			var presentationView = recordGui.getPresentation(presentationViewId).getView();
			recordHandlerView.addShowView(presentationView);
		}
		function createRawDataWorkView(data) {
			recordHandlerView.addEditView(document.createTextNode(JSON.stringify(data)));
		}

		function getPresentationViewId() {
			return getRecordTypeRecordValue("presentationViewId");
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