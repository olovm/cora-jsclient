/*
 * Copyright 2018 Uppsala University Library
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
	cora.indexListHandler = function(dependencies, spec) {
		var uploadQue = [];
		var numberOfIndexRecords = 0;
		var indexOrderView;
		var indexHandler;
		var currentRecord;

		function indexDataList() {
			var indexHandlerSpec = {
				"loadMethod" : indexingFinished,
				"timeoutMethod" : timeoutMethod
			};
			indexHandler = dependencies.indexHandlerFactory
					.factor(indexHandlerSpec);
			addIndexOrderView();
			indexData();
		}

		function indexData() {
			spec.dataList.data.forEach(pushToQue);
			startNextUploadIfThereIsMoreInQueue();
		}

		function pushToQue(dataRecord) {
			uploadQue.push(dataRecord.record);
		}

		function indexingFinished() {
			numberOfIndexRecords++;
			var cRecord = CORA.coraData(currentRecord.data);
			var cRecordInfo = CORA.coraData(cRecord
					.getFirstChildByNameInData("recordInfo"));
			var cType = CORA.coraData(cRecordInfo
					.getFirstChildByNameInData("type"));
			var type = cType.getFirstAtomicValueByNameInData("linkedRecordId");
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");

			var child = CORA.gui.createSpanWithClassName("indexItem");
			child.textContent = numberOfIndexRecords + ". RecordType: " + type
					+ ", RecordId: " + id;

			indexOrderView.appendChild(child);
			startNextUploadIfThereIsMoreInQueue();
		}

		function startNextUploadIfThereIsMoreInQueue() {
			var dataRecord = uploadQue.shift();
			if (dataRecord !== undefined) {
				startNextUpload(dataRecord);
			}
		}

		function startNextUpload(dataRecord) {
			currentRecord = dataRecord;
			indexHandler.indexData(dataRecord);
		}

		function timeoutMethod() {
			var child = CORA.gui.createSpanWithClassName("indexItem");
			child.textContent = "TIMEOUT";
			indexOrderView.appendChild(child);

		}

		function getNumberOfIndexedRecords() {
			return numberOfIndexRecords;
		}

		function addIndexOrderView() {
			createIndexOrderView();
			var indexOrders = dependencies.uploadManager.view.getWorkView().firstChild;
			indexOrders.appendChild(indexOrderView);
		}

		function createIndexOrderView() {
			indexOrderView = CORA.gui.createSpanWithClassName("indexOrder");
			indexOrderView.textContent = dependencies.textProvider
					.getTranslation("theClient_indexed");
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			"type" : "indexListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			indexDataList : indexDataList,
			indexingFinished : indexingFinished,
			timeoutMethod : timeoutMethod,
			getNumberOfIndexedRecords : getNumberOfIndexedRecords
		});

		return out;
	};
	return cora;
}(CORA));