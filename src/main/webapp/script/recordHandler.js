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

		var recordId = getIdFromRecord(spec.record);

		var listItem = spec.createListItemMethod(recordId);

		var workView = listItem.workView;
		var menuView = listItem.menuView;

		fetchDataFromServer(processFetchedRecord);

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
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
				var recordGui = createRecordGui(data);
				addRecordToWorkView(recordGui, data);
				addRecordToMenuView(recordGui);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				//print raw data if we crash when creating data, (missing metadata)
				createRawDataWorkView(data);
			}
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}

		function createRecordGui(data) {
			var metadataId = getMetadataId();
			return spec.recordGuiFactory.factor(metadataId, data);
		}

		function getMetadataId() {
			return CORA.coraData(spec.recordTypeRecord.data).getFirstAtomicValueByNameInData(
					"metadataId");
		}

		function addRecordToWorkView(recordGui, data) {
			var view = createView();
			view.appendChild(document.createTextNode(JSON.stringify(data)));
			workView.appendChild(view);
			var presentationViewId = getPresentationViewId();
			var presentationView = recordGui.getPresentation(presentationViewId).getView();
			view.appendChild(presentationView);
		}
		function createRawDataWorkView(data) {
			var view = createView();
			view.appendChild(document.createTextNode(JSON.stringify(data)));
			workView.appendChild(view);
		}

		function getPresentationViewId() {
			return CORA.coraData(spec.recordTypeRecord.data).getFirstAtomicValueByNameInData(
					"presentationViewId");
		}

		function addRecordToMenuView(recordGui) {
			var menuPresentationViewId = getMenuPresentationViewId();
			var menuPresentationView = recordGui.getPresentation(menuPresentationViewId).getView();
			menuView.textContent = "";
			menuView.appendChild(menuPresentationView);
		}

		function getMenuPresentationViewId() {
			return CORA.coraData(spec.recordTypeRecord.data).getFirstAtomicValueByNameInData(
					"menuPresentationViewId");
		}

		function createView() {
			var newView = document.createElement("span");
			newView.className = "workItem " + recordId;
			return newView;
		}

		function callError(answer) {
			var errorView = document.createElement("span");
			errorView.textContent = JSON.stringify(answer.status);
			workView.appendChild(errorView);
		}

		return Object.freeze({});
	};
	return cora;
}(CORA));