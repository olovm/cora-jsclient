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
		var busy = CORA.busy();
		mainView.appendChild(busy.getView());
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
			busy.show();
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
			busy.hideWithEffect();
		}

		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			var list = [];
			var recordTypeLists = sortRecordTypesIntoLists(data);

			recordTypeLists.abstractList.forEach(function(parent){
				list.push(parent);
				addChildrenOfCurrentParentToList(parent, recordTypeLists, list);
			});

			list = list.concat(recordTypeLists.noParentList);
			return list;
		}

		function sortRecordTypesIntoLists(data){
			var recordTypeLists = {};
			recordTypeLists.childList = [];
			recordTypeLists.abstractList = [];
			recordTypeLists.noParentList = [];

			data.forEach(function(recordContainer) {
				separateAbstractAndNonAbstractRecordTypes(recordTypeLists, recordContainer);
			});
			return recordTypeLists;
		}


		function separateAbstractAndNonAbstractRecordTypes(recordTypeLists, recordContainer){
			var record = recordContainer.record;
			var cRecord = CORA.coraData(record.data);

			if(isAbstract(cRecord)){
				recordTypeLists.abstractList.push(record);
			}else {
				separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record);
			}
		}

		function separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record){
			if (elementHasParent(cRecord)) {
				recordTypeLists.childList.push(record);
			}else{
				recordTypeLists.noParentList.push(record);
			}
		}

		function isAbstract(cRecord){
        	return cRecord.getFirstAtomicValueByNameInData("abstract") === "true";
		}

		function addChildrenOfCurrentParentToList(parent, recordTypeLists, list){
			var cParent = CORA.coraData(parent.data);
			var cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));

			recordTypeLists.childList.forEach(function(child){
				var cChild = CORA.coraData(child.data);
				if (isChildOfCurrentElement(cChild, cRecordInfo)) {
					list.push(child);
				}
			});
		}

		function elementHasParent(cRecord){
			return cRecord.containsChildWithNameInData("parentId");
		}

		function isChildOfCurrentElement(cChild, cRecordInfo){
			return cChild.getFirstAtomicValueByNameInData("parentId") ===
				cRecordInfo.getFirstAtomicValueByNameInData("id");
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
			if (itemShowing !== undefined) {
				itemShowing.workView.style.display = "none";
			}
		}

		function resetLastShowingMenuItem() {
			if (itemShowing !== undefined) {
				itemShowing.menuView.className = itemShowing.originalClassName;
				itemShowing.isActive = false;
			}
		}

		function showNewWorkView(itemToShow) {
			if (itemToShow.workView.parentNode !== workArea) {
				workArea.appendChild(itemToShow.workView);
				itemToShow.workView.scrollTop = 0;
			}
			itemToShow.workView.style.display = "";
		}

		function updateShowingMenuItem(itemToShow) {
			itemToShow.isActive = true;
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