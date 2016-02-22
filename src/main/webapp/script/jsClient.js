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
	cora.jsClient = function(spec) {

		var recordTypeList = [];
		var mainView = createMainView();
		var sideBar;
		var workArea;
		var recordGuiFactory = CORA.recordGuiFactory(spec.dependencies);
		fetchRecordTypeListAndThen(processFetchedRecordTypes);

		function createMainView() {
			var view = document.createElement("div");
			view.className = "jsClient mainView";

			var header = document.createElement("span");
			header.textContent = spec.name;
			header.className = "header";
			view.appendChild(header);

			sideBar = document.createElement("span");
			sideBar.className = "sideBar";
			view.appendChild(sideBar);

			workArea = document.createElement("span");
			workArea.className = "workArea";
			view.appendChild(workArea);

			return view;
		}

		function fetchRecordTypeListAndThen(callAfterAnswer) {
			var recordListSpec = {
				"xmlHttpRequestFactory" : spec.dependencies.xmlHttpRequestFactory,
				"method" : "GET",
				"url" : spec.baseUrl + "record/recordType",
				"contentType" : "application/uub+record+json",
				"accept" : "application/uub+recordList+json",
				"loadMethod" : callAfterAnswer
			};
			CORA.ajaxCall(recordListSpec);
		}

		function processFetchedRecordTypes(answer) {
			recordTypeList = createRecordTypeListFromAnswer(answer);
			addRecordTypesToSideBar();
		}
		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			var list = [];
			data.forEach(function(recordContainer) {
				list.push(recordContainer.record);
			});
			return list;
		}

		function addRecordTypesToSideBar() {
			recordTypeList.forEach(function(record) {
				addRecordTypeToSideBar(record);
			});
		}

		function addRecordTypeToSideBar(record) {
			var specRecord = {
				"xmlHttpRequestFactory" : spec.dependencies.xmlHttpRequestFactory,
				"recordGuiFactory" : recordGuiFactory,
				"recordTypeRecord" : record,
				"jsClient" : mainView.modelObject
			};

			var recordTypeHandler = CORA.recordTypeHandler(specRecord);
			sideBar.appendChild(recordTypeHandler.getView());
		}

		function getView() {
			return mainView;
		}

		function getRecordTypeList() {
			return recordTypeList;
		}

		function showView(viewToShow) {
			if (workArea.childNodes.length > 0) {
				workArea.removeChild(workArea.firstChild);
			}
			workArea.appendChild(viewToShow);
		}

		var out = Object.freeze({
			getView : getView,
			getRecordTypeList : getRecordTypeList,
			showView : showView
		});
		mainView.modelObject = out;
		return out;
	};
	return cora;
}(CORA));