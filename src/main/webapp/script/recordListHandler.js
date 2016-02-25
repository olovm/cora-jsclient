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

		var recordId = getIdFromRecord(spec.recordTypeRecord);

		fetchDataFromServer(processFetchedRecords);

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function fetchDataFromServer(callAfterAnswer) {
			// setting values that should exist as a link in recordType
			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : "GET",
				"url" : spec.baseUrl + "record/" + recordId,
				"contentType" : "application/uub+record+json",
				"accept" : "application/uub+recordList+json",
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			CORA.ajaxCall(callSpec);
		}

		function processFetchedRecords(answer) {
			createRecordTypeListFromAnswer(answer);
		}

		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				addRecordToWorkView(recordContainer.record);
			});
		}

		function addRecordToWorkView(record) {
			var view = createView(record);
			spec.workView.appendChild(view);
			var metadataId = "recordTypeGroup";
			var presentationId = "recordTypePGroup";
			var recordGui = spec.recordGuiFactory.factor(metadataId, record.data);

			var presentationView = recordGui.getPresentation(presentationId).getView();
			recordGui.initMetadataControllerStartingGui();
			view.appendChild(presentationView);
		}

		function createView(record) {
			var newView = document.createElement("span");
			newView.className = "listItem " + recordId;
			newView.onclick = function() {
				createRecordHandler(record);
			};
			return newView;
		}

		function createRecordHandler(record) {
			var recordHandlerSpec = {
				"recordTypeRecord" : spec.recordTypeRecord,
//				"recordTypeHandler" : spec.recordTypeHandler,
				"createListItemMethod" : spec.createListItemMethod,
				"record" : record,
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"recordGuiFactory" : spec.recordGuiFactory
			};
			CORA.recordHandler(recordHandlerSpec);
		}

		function callError(answer) {
			var errorView = document.createElement("span");
			errorView.textContent = JSON.stringify(answer.status);
			spec.workView.appendChild(errorView);
		}

		var out = Object.freeze({
			open : open
		});
		return out;
	};
	return cora;
}(CORA));