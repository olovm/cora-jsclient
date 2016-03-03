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
		var metadataIdsForRecordType = {};
		var mainView = createMainView();
		var sideBar;
		var workArea;
		var recordGuiFactory = CORA.recordGuiFactory(spec.dependencies);
		fetchRecordTypeListAndThen(processFetchedRecordTypes);

		function createMainView() {
			var view = createSpanWithClassName("jsClient mainView");

			var header = createSpanWithClassName("header");
			header.textContent = spec.name;
			view.appendChild(header);

			sideBar = createSpanWithClassName("sideBar");
			view.appendChild(sideBar);

			workArea = createSpanWithClassName("workArea");
			view.appendChild(workArea);

			return view;
		}

		function createSpanWithClassName(className) {
			var spanNew = document.createElement("span");
			spanNew.className = className;
			return spanNew;
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
			metadataIdsForRecordType = createMetadataIdsForRecordType(recordTypeList);
			addRecordTypesToSideBar(recordTypeList);
		}
		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			var list = [];
			data.forEach(function(recordContainer) {
				list.push(recordContainer.record);
			});
			return list;
		}

		function createMetadataIdsForRecordType(recordTypes) {
			var metadataIds = {};
			recordTypes.forEach(function(record) {
				var cRecord = CORA.coraData(record.data);
				var metadataId = cRecord.getFirstAtomicValueByNameInData("metadataId");
				var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
				var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
				metadataIds[id] = metadataId;
			});
			return metadataIds;
		}

		function addRecordTypesToSideBar(recordTypes) {
			recordTypes.forEach(function(record) {
				addRecordTypeToSideBar(record);
			});
		}

		function addRecordTypeToSideBar(record) {
			var specRecord = {
				"recordTypeHandlerViewFactory" : createRecordTypeHandlerViewFactory(),
				"recordListHandlerFactory" : createRecordListHandlerFactory(),
				"recordHandlerFactory" : createRecordHandlerFactory(),
				"xmlHttpRequestFactory" : spec.dependencies.xmlHttpRequestFactory,
				"recordGuiFactory" : recordGuiFactory,
				"recordTypeRecord" : record,
				"jsClient" : mainView.modelObject,
				"baseUrl" : spec.baseUrl
			};

			var recordTypeHandler = CORA.recordTypeHandler(specRecord);
			sideBar.appendChild(recordTypeHandler.getView());
		}

		function createRecordTypeHandlerViewFactory() {
			return {
				"factor" : function(viewSpec) {
					return CORA.recordTypeHandlerView(viewSpec);
				}
			};
		}
		function createRecordListHandlerFactory() {
			return {
				"factor" : function(listHandlerSpec) {
					return CORA.recordListHandler(listHandlerSpec);
				}
			};
		}
		function createRecordHandlerFactory() {
			return {
				"factor" : function(recordHandlerSpec) {
					return CORA.recordHandler(recordHandlerSpec);
				}
			};
		}

		function getView() {
			return mainView;
		}

		function getRecordTypeList() {
			return recordTypeList;
		}

		var itemShowing = undefined;
		function showView(itemToShow) {
			clearWorkArea();
			resetLastShowingMenuItem();
			showNewWorkView(itemToShow);
			updateShowingMenuItem(itemToShow);
			itemShowing = itemToShow;
		}

		function clearWorkArea() {
			if (workArea.childNodes.length > 0) {
				workArea.removeChild(workArea.firstChild);
			}
		}

		function resetLastShowingMenuItem() {
			if (itemShowing !== undefined) {
				itemShowing.menuView.className = itemShowing.originalClassName;
				delete itemShowing.originalClassName;
			}
		}

		function showNewWorkView(itemToShow) {
			workArea.appendChild(itemToShow.workView);
		}

		function updateShowingMenuItem(itemToShow) {
			itemToShow.originalClassName = itemToShow.menuView.className;
			itemToShow.menuView.className = itemToShow.menuView.className + " active";
		}

		function getMetadataIdForRecordTypeId(recordTypeId) {
			return metadataIdsForRecordType[recordTypeId];
		}

		var out = Object.freeze({
			getView : getView,
			getRecordTypeList : getRecordTypeList,
			showView : showView,
			createRecordTypeHandlerViewFactory : createRecordTypeHandlerViewFactory,
			createRecordListHandlerFactory : createRecordListHandlerFactory,
			createRecordHandlerFactory : createRecordHandlerFactory,
			getMetadataIdForRecordTypeId : getMetadataIdForRecordTypeId
		});
		mainView.modelObject = out;
		return out;
	};
	return cora;
}(CORA));