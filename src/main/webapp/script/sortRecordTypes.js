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
	cora.sortRecordTypes = function(allRecordTypes) {

		function start() {
			var recordTypeLists = sortRecordTypesIntoLists(allRecordTypes);
			var list = [];
			recordTypeLists.abstractList.forEach(function(parent) {
				list.push(parent);
				addChildrenOfCurrentParentToList(parent, recordTypeLists, list);
			});

			list = list.concat(recordTypeLists.noParentList);
			return list;
		}

		function sortRecordTypesIntoLists(unsortedRecordTypes) {
			var recordTypeLists = {};
			recordTypeLists.childList = [];
			recordTypeLists.abstractList = [];
			recordTypeLists.noParentList = [];

			unsortedRecordTypes.forEach(function(recordType) {
				separateAbstractAndNonAbstractRecordTypes(recordTypeLists, recordType);
			});
			return recordTypeLists;
		}

		function separateAbstractAndNonAbstractRecordTypes(recordTypeLists, record) {
			var cRecord = CORA.coraData(record.data);

			if (isAbstract(cRecord)) {
				recordTypeLists.abstractList.push(record);
			} else {
				separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record);
			}
		}

		function separateChildrenAndStandaloneRecordTypes(recordTypeLists, cRecord, record) {
			if (elementHasParent(cRecord)) {
				recordTypeLists.childList.push(record);
			} else {
				recordTypeLists.noParentList.push(record);
			}
		}

		function isAbstract(cRecord) {
			return cRecord.getFirstAtomicValueByNameInData("abstract") === "true";
		}

		function addChildrenOfCurrentParentToList(parent, recordTypeLists, list) {
			var cParent = CORA.coraData(parent.data);
			var cRecordInfo = CORA.coraData(cParent.getFirstChildByNameInData("recordInfo"));

			recordTypeLists.childList.forEach(function(child) {
				var cChild = CORA.coraData(child.data);
				if (isChildOfCurrentElement(cChild, cRecordInfo)) {
					list.push(child);
				}
			});
		}

		function elementHasParent(cRecord) {
			return cRecord.containsChildWithNameInData("parentId");
		}

		function isChildOfCurrentElement(cChild, cRecordInfo) {
			var cParentIdGroup = CORA.coraData(cChild.getFirstChildByNameInData("parentId"));
			return cParentIdGroup.getFirstAtomicValueByNameInData("linkedRecordId") === cRecordInfo
					.getFirstAtomicValueByNameInData("id");
		}

		return start();
	};
	return cora;
}(CORA));