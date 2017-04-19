/*
 * Copyright 2016 Olov McKie
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.recordTypeProvider = function(dependencies, spec) {

		var callWhenReady = spec.callWhenReady;
		var allRecordTypesById = {};

		function start() {
			fetchRecordTypeListAndThen(processFetchedData);
		}

		function fetchRecordTypeListAndThen(callAfterAnswer) {
			callThroughAjax(spec.recordTypeListLink, callAfterAnswer);
		}

		function callThroughAjax(linkSpec, callAfterAnswer) {
			var ajaxCallSpec = createIndependentCopy(linkSpec);
			ajaxCallSpec.loadMethod = callAfterAnswer;
			dependencies.ajaxCallFactory.factor(ajaxCallSpec);
		}

		function createIndependentCopy(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		}

		function processFetchedData(answer) {
			populateAllRecordTypesByIdFromAnswer(answer);
			if (callWhenReady) {
				callWhenReady();
			}
		}

		function populateAllRecordTypesByIdFromAnswer(answer) {
			var listOfAllRecordTypesAsRecords = JSON.parse(answer.responseText).dataList.data;
			listOfAllRecordTypesAsRecords.forEach(function(recordContainer) {
				var record = recordContainer.record;
				var recordId = getIdFromRecordData(record.data);
				allRecordTypesById[recordId] = record;
			});
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}

		function getRecordTypeById(recordTypeId) {
			if (allRecordTypesById[recordTypeId] !== undefined) {
				return allRecordTypesById[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
		}

		function getAllRecordTypes() {
			var recordTypeList = [];
			Object.keys(allRecordTypesById).forEach(function(id) {
				recordTypeList.push(allRecordTypesById[id]);
			});
			return recordTypeList;
		}

		function reload(callWhenReloadedMethodIn) {
			callWhenReady = callWhenReloadedMethodIn;
			fetchRecordTypeListAndThen(processFetchedData);
		}

		var out = Object.freeze({
			getRecordTypeById : getRecordTypeById,
			getAllRecordTypes : getAllRecordTypes,
			processFetchedData : processFetchedData,
			reload : reload
		});
		start();
		return out;
	};
	return cora;
}(CORA));