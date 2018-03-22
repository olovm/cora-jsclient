/*
 * Copyright 2016, 2017 Olov McKie
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
		var allRecordTypes = [];
		var allRecordTypesById = {};
		var metadataByRecordTypeId = {};
		var recordTypesByGroupId = {};

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
			resetHolders();
			var listOfAllRecordTypesAsRecords = JSON.parse(answer.responseText).dataList.data;
			listOfAllRecordTypesAsRecords.forEach(function(recordContainer) {
				var record = recordContainer.record;
				addRecordToAllRecordTypes(record);
				addRecordToTypesById(record);
				addRecordToTypesByGroup(record);
			});
		}

		function resetHolders() {
			allRecordTypes = [];
			allRecordTypesById = {};
			metadataByRecordTypeId = {};
		}

		function addRecordToAllRecordTypes(record) {
			allRecordTypes.push(record);
		}

		function addRecordToTypesById(record) {
			var recordId = getIdFromRecordData(record.data);
			allRecordTypesById[recordId] = record;
			addToMetadataByRecordTypeId(recordId, record);
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}

		function addToMetadataByRecordTypeId(recordId, record) {
			var cRecord = CORA.coraData(record.data);
			var metadata = {
				"metadataId" : getLinkValueFromRecord("metadataId", cRecord),
				"presentationViewId" : getLinkValueFromRecord("presentationViewId", cRecord),
				"presentationFormId" : getLinkValueFromRecord("presentationFormId", cRecord),
				"newMetadataId" : getLinkValueFromRecord("newMetadataId", cRecord),
				"newPresentationFormId" : getLinkValueFromRecord("newPresentationFormId", cRecord),
				"menuPresentationViewId" : getLinkValueFromRecord("menuPresentationViewId", cRecord),
				"listPresentationViewId" : getLinkValueFromRecord("listPresentationViewId", cRecord),
				"search" : getLinkValueFromRecord("search", cRecord),
				"userSuppliedId" : cRecord.getFirstAtomicValueByNameInData("userSuppliedId"),
				"abstract" : cRecord.getFirstAtomicValueByNameInData("abstract"),
				"parentId" : getLinkValueFromRecord("parentId", cRecord),
				"actionLinks" : record.actionLinks
			};
			metadataByRecordTypeId[recordId] = metadata;
		}

		function getLinkValueFromRecord(id, cRecord) {
			if (cRecord.containsChildWithNameInData(id)) {

				var cRecordLink = CORA.coraData(cRecord.getFirstChildByNameInData(id));
				return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
			}
		}

		function getRecordTypeById(recordTypeId) {
			if (allRecordTypesById[recordTypeId] !== undefined) {
				return allRecordTypesById[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
		}

		function addRecordToTypesByGroup(record) {
			var groupIds = getGroupIdsFromRecordData(record.data);
			groupIds.forEach(function(groupId) {
				addRecordToTypesByGroupFromAtomicData(groupId, record);
			});
		}

		function getGroupIdsFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			if (cRecord.containsChildWithNameInData("groupOfRecordType")) {
				return cRecord.getChildrenByNameInData("groupOfRecordType");
			}
			return [];
		}

		function addRecordToTypesByGroupFromAtomicData(groupId, record) {
			var groupIdValue = groupId.value;
			if (recordTypesByGroupId[groupIdValue] === undefined) {
				recordTypesByGroupId[groupIdValue] = [];
			}
			recordTypesByGroupId[groupIdValue].push(record);
		}

		function getAllRecordTypes() {
			return allRecordTypes;
		}

		function getMetadataByRecordTypeId(recordTypeId) {
			if (metadataByRecordTypeId[recordTypeId] !== undefined) {
				return metadataByRecordTypeId[recordTypeId];
			}
			throw new Error("Id(" + recordTypeId + ") not found in recordTypeProvider");
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getRecordTypesByGroupId(groupId) {
			if (recordTypesByGroupId[groupId] === undefined) {
				return [];
			}
			return recordTypesByGroupId[groupId];
		}

		var out = Object.freeze({
			"type" : "recordTypeProvider",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getRecordTypeById : getRecordTypeById,
			getAllRecordTypes : getAllRecordTypes,
			processFetchedData : processFetchedData,
			getMetadataByRecordTypeId : getMetadataByRecordTypeId,
			getRecordTypesByGroupId : getRecordTypesByGroupId
		});
		start();
		return out;
	};
	return cora;
}(CORA));