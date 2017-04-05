/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	cora.recordTypeHandler = function(dependencies, spec) {
		var self;
		var recordId = getIdFromRecord(spec.recordTypeRecord);

		var viewSpec = {
			"headerText" : recordId,
			"fetchListMethod" : createRecordTypeList
		};
		if (recordTypeHasCreateLink()) {
			viewSpec.createNewMethod = createRecordHandler;
		}

		var recordTypeHandlerView = dependencies.recordTypeHandlerViewFactory.factor(viewSpec);

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
			var listHandlerSpec = {
				// TODO: should be a factory instead, part of the recordListHandlerFactory
				"createRecordHandlerMethod" : createRecordHandler,
				"recordTypeRecord" : spec.recordTypeRecord,
				"baseUrl" : spec.baseUrl,
				"jsClient" : dependencies.jsClient,
				"addToRecordTypeHandlerMethod" : addManagedGuiItem
			};
			dependencies.recordListHandlerFactory.factor(listHandlerSpec);
		}

		function createRecordHandler(presentationMode, record) {
			var text = "New";
			if ("new" !== presentationMode) {
				text = getIdFromRecord(record);
			}
			var recordHandlerSpec = {
				"dependencies" : dependencies,
				// TODO: use factory...
				"recordHandlerViewFactory" : createRecordHandlerViewFactory(),
				"recordTypeRecord" : spec.recordTypeRecord,
				"presentationMode" : presentationMode,
				"record" : record,
				"recordGuiFactory" : dependencies.recordGuiFactory,
				// "views" : views,
				"jsClient" : dependencies.jsClient,
				"recordTypeHandler" : self,
				"addToRecordTypeHandlerMethod" : addManagedGuiItem
			};
			dependencies.recordHandlerFactory.factor(recordHandlerSpec);
		}
		function createRecordHandlerViewFactory() {
			var dep = {
				"workItemViewFactory" : CORA.workItemViewFactory(dependencies)
			};
			return CORA.recordHandlerViewFactory(dep);
		}

		function addManagedGuiItem(managedGuiItem) {
			recordTypeHandlerView.addManagedGuiItem(managedGuiItem);
		}

		var out = Object.freeze({
			getView : getView,
			createRecordTypeList : createRecordTypeList,
			createRecordHandlerViewFactory : createRecordHandlerViewFactory,
			createRecordHandler : createRecordHandler,
			addManagedGuiItem : addManagedGuiItem
		});
		self = out;
		return out;
	};
	return cora;
}(CORA));