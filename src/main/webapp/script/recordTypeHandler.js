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
		var self;
		var recordId = getIdFromRecord(spec.recordTypeRecord);

		var viewSpec = {
			"dependencies" : spec.dependencies,
			"headerText" : recordId,
			"fetchListMethod" : createRecordTypeList
		};
		if (recordTypeHasCreateLink()) {
			viewSpec.createNewMethod = createRecordHandler;
		}

		var recordTypeHandlerView = spec.recordTypeHandlerViewFactory.factor(viewSpec);

		function getView() {
			return recordTypeHandlerView.getView();
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function recordTypeHasCreateLink() {
			var createLink = spec.recordTypeRecord.actionLinks.create;
			if (createLink !== undefined) {
				return true;
			}
			return false;
		}

		function createRecordTypeList() {
			var views = createItemViews("menuView");
			var listHandlerSpec = {
				"dependencies" : spec.dependencies,
				"createRecordHandlerMethod" : createRecordHandler,
				"recordGuiFactory" : spec.recordGuiFactory,
				"recordTypeRecord" : spec.recordTypeRecord,
				"views" : views,
				"baseUrl" : spec.baseUrl,
				"jsClient" : spec.jsClient
			};
			spec.recordListHandlerFactory.factor(listHandlerSpec);
		}

		function createItemViews(text) {
			var item = recordTypeHandlerView.createListItem(text, onclickMethod);
			spec.jsClient.showView(item);
			return item;
		}

		function onclickMethod(item) {
			spec.jsClient.showView(item);
		}

		function createRecordHandler(presentationMode, record) {
			var text = "New";
			if ("new" !== presentationMode) {
				text = getIdFromRecord(record);
			}
			var views = createItemViews(text);
			var recordHandlerSpec = {
				"dependencies" : spec.dependencies,
				"recordHandlerViewFactory" : createRecordHandlerViewFactory(),
				"recordTypeRecord" : spec.recordTypeRecord,
				"presentationMode" : presentationMode,
				"record" : record,
				"recordGuiFactory" : spec.recordGuiFactory,
				"views" : views,
				"jsClient" : spec.jsClient,
				"recordTypeHandler" : self
			};
			spec.recordHandlerFactory.factor(recordHandlerSpec);
		}
		function createRecordHandlerViewFactory() {
			return {
				"factor" : function(recordHandlerViewSpec) {
					return CORA.recordHandlerView(recordHandlerViewSpec);
				}
			};
		}

		var out = Object.freeze({
			getView : getView,
			createRecordTypeList : createRecordTypeList,
			createRecordHandlerViewFactory : createRecordHandlerViewFactory,
			createRecordHandler : createRecordHandler
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));