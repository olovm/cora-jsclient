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
		var recordId = getIdFromRecord(spec.recordTypeRecord);

		var viewSpec = {
			"headerText" : recordId
		};

		if(recordTypeHasListLink()) {
			viewSpec.fetchListMethod = createRecordTypeList;
		}

		if (recordTypeHasCreateLink()) {
			viewSpec.createNewMethod = createRecordHandler;
		}

		var view = dependencies.recordTypeHandlerViewFactory.factor(viewSpec);

		function getView() {
			return view.getView();
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		function recordTypeHasListLink() {
			var listLink = spec.recordTypeRecord.actionLinks.list;
			return listLink !== undefined;
		}

		function recordTypeHasCreateLink() {
			var createLink = spec.recordTypeRecord.actionLinks.create;
			return createLink !== undefined;
		}

		function createRecordTypeList() {
			var listHandlerSpec = {
				"openRecordMethod" : createRecordHandler,
				"baseUrl" : spec.baseUrl,
				"jsClient" : dependencies.jsClient,
				"recordTypeRecordId" : recordId,
				"listLink" : spec.recordTypeRecord.actionLinks.list,
				"listPresentationViewId" : getListPresentationFromRecordTypeRecord()
			};
			dependencies.recordListHandlerFactory.factor(listHandlerSpec);
		}

		function getListPresentationFromRecordTypeRecord() {
			var cData = CORA.coraData(spec.recordTypeRecord.data);
			var cRecordLink = CORA.coraData(cData
					.getFirstChildByNameInData("listPresentationViewId"));
			return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function createRecordHandler(createNewRecord, record, loadInBackground) {
			var recordHandlerSpec = {
				"createNewRecord" : createNewRecord,
				"record" : record,
				"jsClient" : dependencies.jsClient,
				"recordTypeRecordIdForNew" : recordId
			};
			var recordHandler = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			addRecordHandlerToJsClient(recordHandler, loadInBackground);
		}

		function addRecordHandlerToJsClient(recordHandler, loadInBackground) {
			var managedGuiItem = recordHandler.getManagedGuiItem();
			dependencies.jsClient.addGuiItem(managedGuiItem);
			if (loadInBackground !== "true") {
				dependencies.jsClient.showView(managedGuiItem);
			}
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function hasAnyAction(){
			return recordTypeHasListLink() || recordTypeHasCreateLink();
		}

		var out = Object.freeze({
			"type" : "recordTypeHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			createRecordTypeList : createRecordTypeList,
			createRecordHandler : createRecordHandler,
			hasAnyAction : hasAnyAction
		});
		return out;
	};
	return cora;
}(CORA));