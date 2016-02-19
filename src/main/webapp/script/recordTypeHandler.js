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
	cora.recordTypeHandler = function(spec) {

		var view = document.createElement("span");
		view.className = "recordType";

		var header = document.createElement("span");
		header.className = "header";
		header.onclick = fetchList;
		view.appendChild(header);

		var recordId = getIdFromRecord(spec.record);
		header.textContent = recordId;

		var childrenView = document.createElement("span");
		childrenView.className = "childrenView";
		view.appendChild(childrenView);

		var recordList;

		function getView() {
			return view;
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function fetchList() {
			var listItem = createListItem("List");
			childrenView.appendChild(listItem);
			spec.jsClient.showView(listItem.workView);

			var listHandlerSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"recordGuiFactory" : spec.recordGuiFactory,
				"record" : spec.record,
				"workView" : listItem.workView
			};
			var recordListHandler = CORA.recordListHandler(listHandlerSpec);

			// fetchDataFromServer(processFetchedRecords);
		}
		function createListItem(text) {
			var item = document.createElement("span");
			item.textContent = text;
			item.workView = document.createElement("span");
			item.workView.className = "workView";
			item.onclick = function() {
				spec.jsClient.showView(item.workView);
			};
			return item;
		}

		// function fetchDataFromServer(callAfterAnswer) {
		// // setting values that should exist in a link in record
		//
		// var callSpec = {
		// "xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
		// "method" : "GET",
		// "url" : "http://epc.ub.uu.se/cora/rest/record/" + recordId,
		// "contentType" : "application/uub+record+json",
		// "accept" : "application/uub+recordList+json",
		// "loadMethod" : callAfterAnswer
		// };
		// var ajaxCall = CORA.ajaxCall(callSpec);
		// }
		//
		// function processFetchedRecords(answer) {
		// recordList = createRecordTypeListFromAnswer(answer);
		// addRecordsToWorkView();
		// }
		//
		// function createRecordTypeListFromAnswer(answer) {
		// var data = JSON.parse(answer.responseText).dataList.data;
		// var list = [];
		// data.forEach(function(recordContainer) {
		// list.push(recordContainer.record);
		// });
		// return list;
		// }
		// function addRecordsToWorkView() {
		// recordList.forEach(function(record) {
		// addRecordToWorkView(record);
		// });
		// }
		// function addRecordToWorkView(record) {
		// view
		// }
		var out = Object.freeze({
			getView : getView,
			fetchList : fetchList
		});
		return out;
	};
	return cora;
}(CORA));