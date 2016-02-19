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

		var recordId=getIdFromRecord(spec.record);
		
		fetchDataFromServer(processFetchedRecords);	
		
//		var recordList;
		
		
		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

//		function fetchList() {
//			var listItem = createListItem("List");
//			childrenView.appendChild(listItem);
//			spec.jsClient.showView(listItem.workView);
//			fetchDataFromServer(processFetchedRecords);
//		}
//		function createListItem(text) {
//			var item = document.createElement("span");
//			item.textContent = text;
//			item.workView = document.createElement("span");
//			item.workView.className = "workView";
//			item.onclick = function(){
//				spec.jsClient.showView(item.workView);
//			};
//			return item;
//		}
		
		function fetchDataFromServer(callAfterAnswer){
			//setting values that should exist in a link in record
			
			var callSpec = {
					"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
					"method" : "GET",
					"url" : "http://epc.ub.uu.se/cora/rest/record/"+recordId,
					"contentType" : "application/uub+record+json",
					"accept" : "application/uub+recordList+json",
					"loadMethod" : callAfterAnswer,
					"errorMethod":callError
				};
			var ajaxCall = CORA.ajaxCall(callSpec);
		}
		
		function processFetchedRecords(answer) {
//			recordList = createRecordTypeListFromAnswer(answer);
			createRecordTypeListFromAnswer(answer);
//			addRecordsToWorkView();
		}
		
		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
//			var list = [];
			data.forEach(function(recordContainer) {
//				list.push(recordContainer.record);
				addRecordToWorkView(recordContainer.record);
			});
//			return list;
		}
//		function addRecordsToWorkView() {
//			recordList.forEach(function(record) {
//				addRecordToWorkView(record);
//			});
//		}
		function addRecordToWorkView(record){
			
//			var metadataId = "textSystemOneNewGroup";
			var metadataId = "recordTypeGroup";
//			var presentationId = "textSystemOneNewPGroup";
			var presentationId = "recordTypePGroup";
			var data = undefined;
//			var dependencies = spec.recordGuiFactory.factor(metadataId, presentationId, data);
//			var recordGui = spec.recordGuiFactory.factor(metadataId, data);
			var recordGui = spec.recordGuiFactory.factor(metadataId, record.data);

			var view = recordGui.getPresentation(presentationId).getView();
//			var view = dependencies.presentation.getView();
			recordGui.start();
//			place.appendChild(view);

			
			
			
			
//			var recordView = document.createElement("span");
//			recordView.textContent = JSON.stringify(record.data);
			spec.workView.appendChild(view);
//			spec.workView.appendChild(recordView);
		}
		
		function callError(answer){
			var errorView = document.createElement("span");
			errorView.textContent = JSON.stringify(answer.status);
			spec.workView.appendChild(errorView);
			
		}
		
		var out = Object.freeze({
		});
		return out;
	};
	return cora;
}(CORA));