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

		var recordId = getIdFromRecord(spec.recordTypeRecord);
		header.textContent = recordId;

		var childrenView = document.createElement("span");
		childrenView.className = "childrenView";
		view.appendChild(childrenView);

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
//			spec.jsClient.showView(listItem.workView);

			var listHandlerSpec = {
				"recordTypeHandler" : out,
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"recordGuiFactory" : spec.recordGuiFactory,
				"recordTypeRecord" : spec.recordTypeRecord,
				"workView" : listItem.workView
			};
			CORA.recordListHandler(listHandlerSpec);
		}
		function createListItem(text) {
			var item = document.createElement("span");
			item.textContent = text;
			item.workView = document.createElement("span");
			item.workView.className = "workView";
			item.onclick = function() {
				spec.jsClient.showView(item.workView);
			};
			childrenView.appendChild(item);
			spec.jsClient.showView(item.workView);
			return item;
		}

		var out = Object.freeze({
			getView : getView,
			fetchList : fetchList,
			createListItem : createListItem
		});
		return out;
	};
	return cora;
}(CORA));