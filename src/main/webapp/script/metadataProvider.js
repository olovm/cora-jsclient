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
		var metadataIdsForRecordType = {};
		fetchMetadataListAndThen(processFetchedMetadata);
		fetchPresentationListAndThen(processFetchedMetadata);
		fetchTextListAndThen(processFetchedMetadata);

		function fetchMetadataListAndThen(callAfterAnswer) {
			var ajaxCallSpec = spec.metadataListLink;
			//fix for different name
			ajaxCallSpec["method"] =ajaxCallSpec.requestMethod;
			ajaxCallSpec["xmlHttpRequestFactory"] =spec.dependencies.xmlHttpRequestFactory;
			ajaxCallSpec["loadMethod"] =callAfterAnswer;
			CORA.ajaxCall(ajaxCallSpec);
		}

		function processFetchedMetadata(answer) {
//			metadata = createMetadataObjectFromAnswer(answer);
			createMetadataObjectFromAnswer(answer);
//			metadataIdsForRecordType = createMetadataIdsForRecordType(recordTypeList);
//			addRecordTypesToSideBar(recordTypeList);
//			busy.hideWithEffect();
		}
		function createMetadataObjectFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
//			var metadata = {};
			data.forEach(function(recordContainer) {
				var recordData = recordContainer.record.data;
//				metadata.push(recordData);
				var recordId = getIdFromRecordData(recordData);
				metadata[recordId] = recordData;
			});
//			return metadata;
		}

		function getIdFromRecordData(recordData) {
//			var metadataIds = {};
//			recordTypes.forEach(function(record) {
				var cRecord = CORA.coraData(recordData);
//				var metadataId = cRecord.getFirstAtomicValueByNameInData("metadataId");
				var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
				var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
//				metadataIds[id] = metadataId;
				console.log(id)
				return id;
//			});
//			return metadataIds;
		}

		function fetchPresentationListAndThen(callAfterAnswer) {
			var ajaxCallSpec = spec.presentationListLink;
			//fix for different name
			ajaxCallSpec["method"] =ajaxCallSpec.requestMethod;
			ajaxCallSpec["xmlHttpRequestFactory"] =spec.dependencies.xmlHttpRequestFactory;
			ajaxCallSpec["loadMethod"] =callAfterAnswer;
			CORA.ajaxCall(ajaxCallSpec);
		}
		function fetchTextListAndThen(callAfterAnswer) {
			var ajaxCallSpec = spec.textListLink;
			//fix for different name
			ajaxCallSpec["method"] =ajaxCallSpec.requestMethod;
			ajaxCallSpec["xmlHttpRequestFactory"] =spec.dependencies.xmlHttpRequestFactory;
			ajaxCallSpec["loadMethod"] =callAfterAnswer;
			CORA.ajaxCall(ajaxCallSpec);
		}

		function getMetadataById(metadataId) {
			if (metadata[metadataId] !== undefined) {
				return metadata[metadataId];
			} else {

				// default:
				console.log("Id(" + metadataId + ") not found in metadataProvider");
				throw new Error("Id(" + metadataId + ") not found in metadataProvider");
			}
		}

		var out = Object.freeze({
//			getView : getView,
//			getRecordTypeList : getRecordTypeList,
//			showView : showView,
//			createRecordTypeHandlerViewFactory : createRecordTypeHandlerViewFactory,
//			createRecordListHandlerFactory : createRecordListHandlerFactory,
//			createRecordHandlerFactory : createRecordHandlerFactory,
//			getMetadataIdForRecordTypeId : getMetadataIdForRecordTypeId
			getMetadataById:getMetadataById
		});
//		mainView.modelObject = out;
		return out;
	};
	return cora;
}(CORA));