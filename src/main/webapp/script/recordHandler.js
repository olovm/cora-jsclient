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

		var listItem = spec.recordTypeHandler.createListItem(recordId);

		var workView = listItem.workView;

		fetchDataFromServer(processFetchedRecord);

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function fetchDataFromServer(callAfterAnswer) {
			// setting values that should exist as a link in record
			var readLink = spec.record.actionLinks.read;
			// console.log(JSON.stringify(readLink));
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
//			 console.log(answer)
			// createRecordTypeListFromAnswer(answer);
			var data = JSON.parse(answer.responseText).record.data;
			addRecordToWorkView(data);
		}

		// function createRecordTypeListFromAnswer(answer) {
		// var data = JSON.parse(answer.responseText).dataList.data;
		// data.forEach(function(recordContainer) {
		// addRecordToWorkView(recordContainer.record);
		// });
		// }

		function addRecordToWorkView(record) {
			var view = createView(record);
			view.appendChild(document.createTextNode(JSON.stringify(record)));
			workView.appendChild(view);
			var metadataId = CORA.coraData(spec.recordTypeRecord.data)
					.getFirstAtomicValueByNameInData("metadataId");
			var presentationId = CORA.coraData(spec.recordTypeRecord.data)
					.getFirstAtomicValueByNameInData("presentationViewId");
//			 var metadataId = "recordTypeGroup";
//			 var presentationId = "recordTypePGroup";
			var recordGui = spec.recordGuiFactory.factor(metadataId, record);

			var presentationView = recordGui.getPresentation(presentationId).getView();
			recordGui.initMetadataControllerStartingGui();
			view.appendChild(presentationView);
		}
		function createView(record) {
			var newView = document.createElement("span");
			newView.className = "listItem " + recordId;
//			newView.onclick = function() {
//				open(record);
//			}
			return newView;
		}
//		function open(record) {
//			console.log(JSON.stringify(record));
//		}

		function callError(answer) {
			var errorView = document.createElement("span");
			errorView.textContent = JSON.stringify(answer.status);
			workView.appendChild(errorView);
			
		}

		var out = Object.freeze({
			open : open,
			
		});
		return out;
	};
	return cora;
}(CORA));