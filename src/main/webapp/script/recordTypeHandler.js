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
		var recordId = getIdFromRecord(spec.recordTypeRecord);

		var viewSpec = {
			"fetchListMethod" : fetchList,
			"headerText" : recordId
		};

		var recordTypeHandlerView = CORA.recordTypeHandlerView(viewSpec);

		function getView() {
			return recordTypeHandlerView.getView();
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function fetchList() {
			var listItem = createListItem("List");
			var listHandlerSpec = {
				"createListItemMethod" : createListItem,
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"recordGuiFactory" : spec.recordGuiFactory,
				"recordTypeRecord" : spec.recordTypeRecord,
				"workView" : listItem.workView,
				"baseUrl" : spec.baseUrl
			};
			CORA.recordListHandler(listHandlerSpec);
		}

		function onclickMethod(item) {
			spec.jsClient.showView(item);
		}
		
		function createListItem(text) {
			var item = recordTypeHandlerView.createListItem(text, onclickMethod);
			spec.jsClient.showView(item);
			return item;
		}

		var out = Object.freeze({
			getView : getView,
			fetchList : fetchList
		});
		return out;
	};
	return cora;
}(CORA));