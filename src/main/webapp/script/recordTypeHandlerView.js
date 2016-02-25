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
	cora.recordTypeHandlerView = function(spec) {
		var out;
		var view = createView();

		var header = createHeader();
		view.appendChild(header);

		var childrenView = createChildrenView();
		view.appendChild(childrenView);

		var buttonView = createButtonView();
		view.appendChild(buttonView);

		function createView() {
			var viewNew = document.createElement("span");
			viewNew.className = "recordType";
			return viewNew;
		}

		function createHeader() {
			var headerNew = document.createElement("span");
			headerNew.className = "header";
			headerNew.onclick = spec.fetchListMethod;
			headerNew.textContent = spec.headerText;
			return headerNew;
		}

		function createChildrenView() {
			var childrenViewNew = document.createElement("span");
			childrenViewNew.className = "childrenView";
			return childrenViewNew;
		}

		function createButtonView() {
			var buttonViewNew = document.createElement("span");
			buttonViewNew.className = "buttonView";
			return buttonViewNew;
		}

		function getView() {
			return view;
		}

//		function getIdFromRecord(record) {
//			var cData = CORA.coraData(record.data);
//			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
//			return cRecordInfo.getFirstAtomicValueByNameInData("id");
//		}

		// function fetchList() {
		// var listItem = createListItem("List");
		//
		// var listHandlerSpec = {
		// "recordTypeHandler" : out,
		// "xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
		// "recordGuiFactory" : spec.recordGuiFactory,
		// "recordTypeRecord" : spec.recordTypeRecord,
		// "workView" : listItem.workView,
		// "baseUrl" : spec.baseUrl
		// };
		// CORA.recordListHandler(listHandlerSpec);
		// }

		function createListItem(text, onclickMethod) {
			var item = {};
			item.menuView = createMenuView(text, item, onclickMethod);
			// item.menuView.modelObject = item;
			childrenView.appendChild(item.menuView);

			item.workView = document.createElement("span");
			item.workView.className = "workView";
			// spec.jsClient.showView(item);
			return item;
		}

		function createMenuView(text, item, onclickMethod) {
			var menuView = document.createElement("span");
			menuView.modelObject = item;
			menuView.className = "menuView";
			menuView.textContent = text;
			menuView.onclick = function() {
//				spec.jsClient.showView(item);
				onclickMethod(item);
			};
			// menuView.onclick = onclickMethod;
			return menuView;
		}

		out = Object.freeze({
			getView : getView,
			createListItem : createListItem
		});
		return out;
	};
	return cora;
}(CORA));