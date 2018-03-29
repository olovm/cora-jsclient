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
			});
			 addRecordsToTypesByGroup();
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

		var totalSortedList = {};
		function addRecordsToTypesByGroup() {
			var sorter = CORA.recordTypeSorter();
			var sortedByGroup = sorter.sortListUsingChildWithNameInData(allRecordTypes, "groupOfRecordType");
			//för varje groupOfRecordTypes - loopa listan?

			//alla id:n
			var recordTypeGroupIdList = [];
			Object.keys(sortedByGroup).forEach(function(id) {
				recordTypeGroupIdList.push(id);
			});

			recordTypeGroupIdList.forEach(function(groupId){
				var groupSortedByAbstract = sorter.sortListUsingChildWithNameInData(sortedByGroup[groupId], "abstract");
				var groupSortedList = sortGroupOnParentChildren(groupSortedByAbstract, groupId);
			});

			//console.log(JSON.stringify(recordTypeGroupList));

			//var totalSortedList = {};

			var groupSortedByAbstract = sorter.sortListUsingChildWithNameInData(sortedByGroup["presentation"], "abstract");


			//gå igenom abstrakta listan - för varje, gå igenom och kolla om barn finns i den implementerande listan
			//recordTypesByGroupId = sorter.sortListUsingChildWithNameInData(allRecordTypes, "groupOfRecordType");
			recordTypesByGroupId = totalSortedList;
		}

		function sortGroupOnParentChildren(groupSortedByAbstract, groupId){
			totalSortedList[groupId] = [];
			var childrenList =  groupSortedByAbstract["false"];
			var parentList = groupSortedByAbstract["true"];
			if(parentList !== undefined) {
				parentList.forEach(function (parent) {
					totalSortedList[groupId].push(parent);
					sortChildren(childrenList, parent, groupId);
					//hantera de som inte har någon parent
				});
			}
			//return groupSortedList;
		}

		function sortChildren(childrenList, parent, groupId){
//			console.log(JSON.stringify(parent))
				var cParent  = CORA.coraData(parent.data);
				var cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));
				var parentId = cRecordInfo.getFirstAtomicValueByNameInData("id");
				childrenList.forEach(function(child){
					var cChild = CORA.coraData(child.data);
					if(cChild.containsChildWithNameInData("parentId")){
						var cChildsParentIdGroup = CORA.coraData(cChild.getFirstChildByNameInData("parentId"));
						var childsParentId = cChildsParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
						if(parentId === childsParentId){
							totalSortedList[groupId].push(child);
						}
						//annars, lägg dem i en lista som läggs till på slutet
					}
				});
				
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