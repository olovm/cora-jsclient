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
		var out;
		var recordTypeList = sortRecordTypesFromRecordTypeProvider();
		var metadataIdsForRecordType = {};
		var mainView = createMainView();
		var header;
		var sideBar;
		var workArea;
		var busy = CORA.busy();

		var recordGuiFactory;

		function start() {
			mainView.appendChild(busy.getView());
			var uploadManagerSpec = spec.dependencies;

			uploadManagerSpec.dependencies = spec.dependencies;
			uploadManagerSpec.jsClient = out;

			var recordGuiFactorySpec = spec.dependencies;
			recordGuiFactorySpec.uploadManager = CORA.uploadManager(uploadManagerSpec);
			recordGuiFactory = CORA.recordGuiFactory(recordGuiFactorySpec);
			processRecordTypes();
			addRecordTypesToSideBar(recordTypeList);
		}

		function createMainView() {
			var view = CORA.gui.createSpanWithClassName("jsClient mainView");

			header = CORA.gui.createSpanWithClassName("header");
			header.textContent = spec.name;
			view.appendChild(header);

			sideBar = CORA.gui.createSpanWithClassName("sideBar");
			view.appendChild(sideBar);

			workArea = CORA.gui.createSpanWithClassName("workArea");
			view.appendChild(workArea);

			return view;
		}

		function processRecordTypes() {
			metadataIdsForRecordType = createMetadataIdsForRecordType(recordTypeList);
			busy.hideWithEffect();
		}

		function sortRecordTypesFromRecordTypeProvider() {
			var allRecordTypes = spec.dependencies.recordTypeProvider.getAllRecordTypes();
			var recordTypeLists = sortRecordTypesIntoLists(allRecordTypes);
			var list = [];
			recordTypeLists.abstractList.forEach(function(parent) {
				list.push(parent);
				addChildrenOfCurrentParentToList(parent, recordTypeLists, list);
			});

			list = list.concat(recordTypeLists.noParentList);
			return list;
		}

		function sortRecordTypesIntoLists(unsortedRecordTypes) {
			var recordTypeLists = {};
			recordTypeLists.childList = [];
			recordTypeLists.abstractList = [];
			recordTypeLists.noParentList = [];

			unsortedRecordTypes.forEach(function(recordType) {
				separateAbstractAndNonAbstractRecordTypes(recordTypeLists, recordType);
			});
			return recordTypeLists;
		}

		function separateAbstractAndNonAbstractRecordTypes(recordTypeLists, record) {
			var cRecord = CORA.coraData(record.data);

			if (isAbstract(cRecord)) {
				recordTypeLists.abstractList.push(record);
			} else {
				separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record);
			}
		}

		function separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record) {
			if (elementHasParent(cRecord)) {
				recordTypeLists.childList.push(record);
			} else {
				recordTypeLists.noParentList.push(record);
			}
		}

		function isAbstract(cRecord) {
			return cRecord.getFirstAtomicValueByNameInData("abstract") === "true";
		}

		function addChildrenOfCurrentParentToList(parent, recordTypeLists, list) {
			var cParent = CORA.coraData(parent.data);
			var cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));

			recordTypeLists.childList.forEach(function(child) {
				var cChild = CORA.coraData(child.data);
				if (isChildOfCurrentElement(cChild, cRecordInfo)) {
					list.push(child);
				}
			});
		}

		function elementHasParent(cRecord) {
			return cRecord.containsChildWithNameInData("parentId");
		}

		function isChildOfCurrentElement(cChild, cRecordInfo) {
			var cParentIdGroup = CORA.coraData(cChild.getFirstChildByNameInData("parentId"));
			return cParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId") === cRecordInfo
					.getFirstAtomicValueByNameInData("id");
		}

		function createMetadataIdsForRecordType(recordTypes) {
			var metadataIds = {};
			recordTypes.forEach(function(record) {
				var cRecord = CORA.coraData(record.data);
				var cMetadataIdGroup = CORA.coraData(cRecord.getFirstChildByNameInData("metadataId"));
				var metadataId = cMetadataIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
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
				"dependencies" : spec.dependencies,
				"recordTypeHandlerViewFactory" : createRecordTypeHandlerViewFactory(),
				"recordListHandlerFactory" : createRecordListHandlerFactory(),
				"recordHandlerFactory" : createRecordHandlerFactory(),
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
				itemShowing.menuView.className = itemShowing.menuView.className.replace(" active",
						"");
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
		function addGlobalView(viewToAdd) {
			header.appendChild(viewToAdd);
		}

		out = Object.freeze({
			getView : getView,
			getRecordTypeList : getRecordTypeList,
			showView : showView,
			createRecordTypeHandlerViewFactory : createRecordTypeHandlerViewFactory,
			createRecordListHandlerFactory : createRecordListHandlerFactory,
			createRecordHandlerFactory : createRecordHandlerFactory,
			getMetadataIdForRecordTypeId : getMetadataIdForRecordTypeId,
			addGlobalView : addGlobalView
		});
		mainView.modelObject = out;
		start();

		return out;
	};
	return cora;
}(CORA));