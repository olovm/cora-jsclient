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
	cora.recordListHandler = function(spec) {
		var workView = spec.views.workView;
		var menuView = spec.views.menuView;

		var recordId = getIdFromRecord(spec.recordTypeRecord);

		addTextAndButtonToMenuView();

		fetchDataFromServer(processFetchedRecords);

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function addTextAndButtonToMenuView() {
			addTextToMenuView();
			addRemoveButtonToMenuView();
		}

		function addTextToMenuView() {
//			menuView.textContent = "";
//			menuView.textContent = "List";
		}

		function addRemoveButtonToMenuView() {
			var removeButton = CORA.gui.createRemoveButton(removeViewsFromParentNodes);
			menuView.appendChild(removeButton);
		}

		function removeViewsFromParentNodes() {
			if (menuView.parentNode !== null) {
				menuView.parentNode.removeChild(menuView);
			}
			if (workView.parentNode !== null) {
				workView.parentNode.removeChild(workView);
			}
		}

		function fetchDataFromServer(callAfterAnswer) {
			var readLink = spec.recordTypeRecord.actionLinks.list;
			var callSpec = {
				"requestMethod" : readLink.requestMethod,
				"url" : readLink.url,
				"contentType" : readLink.contentType,
				"accept" : readLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			spec.dependencies.ajaxCallFactory.factor(callSpec);
		}

		function processFetchedRecords(answer) {
			createRecordTypeListFromAnswer(answer);
		}

		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				tryToAddRecordToWorkView(recordContainer);
			});
		}

		function tryToAddRecordToWorkView(recordContainer) {
			try {
				addRecordToWorkView(recordContainer.record);
			} catch (e) {
				workView.appendChild(document.createTextNode(e));
				workView.appendChild(document.createTextNode(e.stack));
			}
		}

		function addRecordToWorkView(record) {
			var view = createView(record);
			workView.appendChild(view);
			var recordTypeId = getRecordTypeId(record);
			var metadataId = spec.jsClient.getMetadataIdForRecordTypeId(recordTypeId);
			var presentationId = getListPresentationFromRecordTypeRecord();
			var dataDivider = getDataDividerFromData(record.data);
			var recordGui = spec.recordGuiFactory.factor(metadataId, record.data, dataDivider);

			var presentationView = recordGui.getPresentation(presentationId, metadataId).getView();
			recordGui.initMetadataControllerStartingGui();
			view.appendChild(presentationView);
		}
		function getRecordTypeId(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("type");
		}

		function createView(record) {
			var newView = CORA.gui.createSpanWithClassName("listItem " + recordId);
			newView.onclick = function() {
				spec.createRecordHandlerMethod("view", record);
			};
			return newView;
		}

		function getListPresentationFromRecordTypeRecord() {
			var cData = CORA.coraData(spec.recordTypeRecord.data);
			var cRecordLink = CORA.coraData(cData.getFirstChildByNameInData("listPresentationViewId"));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getDataDividerFromData(data) {
			var cData = CORA.coraData(data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function callError(answer) {
			var messageHolder = CORA.messageHolder();
			workView.appendChild(messageHolder.getView());
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		var out = Object.freeze({
			open : open,
			processFetchedRecords:processFetchedRecords
		});
		return out;
	};
	return cora;
}(CORA));