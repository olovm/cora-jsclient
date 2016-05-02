/*
 * Copyright 2016 Olov McKie
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
	cora.metadataProvider = function(spec) {

		var metadata = {};
		fetchMetadataListAndThen(processFetchedMetadata);
		fetchPresentationListAndThen(processFetchedMetadata);
		fetchTextListAndThen(processFetchedMetadata);

		function fetchMetadataListAndThen(callAfterAnswer) {
			callThroughAjax(spec.metadataListLink, callAfterAnswer);
		}

		function callThroughAjax(linkSpec, callAfterAnswer) {
			var ajaxCallSpec = createIndependentCopy(linkSpec);
			// fix for requestMethod being called method
			ajaxCallSpec.method = ajaxCallSpec.requestMethod;
			ajaxCallSpec.xmlHttpRequestFactory = spec.dependencies.xmlHttpRequestFactory;
			ajaxCallSpec.loadMethod = callAfterAnswer;
			CORA.ajaxCall(ajaxCallSpec);
		}

		function createIndependentCopy(someObject) {
			return JSON.parse(JSON.stringify(someObject));
		}

		function processFetchedMetadata(answer) {
			createMetadataObjectFromAnswer(answer);
		}

		function createMetadataObjectFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				var recordData = recordContainer.record.data;
				var recordId = getIdFromRecordData(recordData);
				metadata[recordId] = recordData;
			});
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}

		function fetchPresentationListAndThen(callAfterAnswer) {
			callThroughAjax(spec.presentationListLink, callAfterAnswer);
		}

		function fetchTextListAndThen(callAfterAnswer) {
			callThroughAjax(spec.textListLink, callAfterAnswer);
		}

		function getMetadataById(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId];
			}
			throw new Error("Id(" + metadataId + ") not found in metadataProvider");
		}

		var out = Object.freeze({
			getMetadataById : getMetadataById
		});
		return out;
	};
	return cora;
}(CORA));