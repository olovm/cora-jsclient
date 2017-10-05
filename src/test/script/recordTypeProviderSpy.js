/*
 * Copyright 2016 Uppsala University Library
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recordTypeProviderSpy = function() {

		var recordTypeArray = [];
		var callWhenReloadedMethod;
		var fetchedRecordTypeId = [];
		var fetchedMetadataByRecordTypeId = [];
		var allRecordTypesNo = 0;

		function getRecordTypeById(recordTypeId) {
			fetchedRecordTypeId.push(recordTypeId);
			return recordTypeId;
			// if (recordTypeArray[recordTypeId] !== undefined) {
			// return recordTypeArray[recordTypeId];
			// } else {
			//
			// // default:
			// console.log("Id(" + recordTypeId + ") not found in recordTypeProviderSpy");
			// throw new Error("Id(" + recordTypeId + ") not found in recordTypeProviderSpy");
			// }
		}

		function getAllRecordTypes() {
			allRecordTypesNo++;
			var recordTypeList = [];
			Object.keys(recordTypeArray).forEach(function(id) {
				recordTypeList.push(recordTypeArray[id]);
			});
			return recordTypeList;
		}

		function processFetchedData() {
		}

		function reload(callWhenReloadedMethodIn) {
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		}
		function getCallWhenReloadedMethod() {
			return callWhenReloadedMethod;
		}
		var metadata = {};
		function getMetadataByRecordTypeId(recordTypeId) {
			fetchedMetadataByRecordTypeId.push(recordTypeId);
			return metadata;
		}
		function getFetchedMetadataByRecordTypeId(number) {
			return fetchedMetadataByRecordTypeId[number];
		}
		function getFetchedRecordTypeId(number) {
			return fetchedRecordTypeId[number];
		}

		function getAllRecordTypesFetchedNo() {
			return allRecordTypesNo;
		}
		return Object.freeze({
			"type" : "recordTypeProviderSpy",
			getRecordTypeById : getRecordTypeById,
			getAllRecordTypes : getAllRecordTypes,
			processFetchedData : processFetchedData,
			reload : reload,
			getCallWhenReloadedMethod : getCallWhenReloadedMethod,
			getMetadataByRecordTypeId : getMetadataByRecordTypeId,
			getFetchedMetadataByRecordTypeId : getFetchedMetadataByRecordTypeId,
			getFetchedRecordTypeId : getFetchedRecordTypeId,
			getAllRecordTypesFetchedNo : getAllRecordTypesFetchedNo
		});
	};
	return coraTest;
}(CORATEST || {}));