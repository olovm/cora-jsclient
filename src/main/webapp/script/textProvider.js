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
	cora.textProvider = function(spec) {
		var texts = {};
		var currentLang = "sv";
		fetchTextListAndThen(processFetchedTextdata);

		function fetchTextListAndThen(callAfterAnswer) {
			callThroughAjax(spec.textListLink, callAfterAnswer);
		}

		function callThroughAjax(linkSpec, callAfterAnswer) {
			var ajaxCallSpec = createIndependentCopy(linkSpec);
			// fix for requestMethod being called method
			ajaxCallSpec.method = ajaxCallSpec.requestMethod;
			ajaxCallSpec.xmlHttpRequestFactory = spec.dependencies.xmlHttpRequestFactory;
			ajaxCallSpec.loadMethod = callAfterAnswer;
			CORA.ajaxCall(ajaxCallSpec);
		}
		
		function createIndependentCopy(someObject){
			return JSON.parse(JSON.stringify(someObject));
		}

		function processFetchedTextdata(answer) {
			createTextObjectFromAnswer(answer);
		}

		function createTextObjectFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				var recordData = recordContainer.record.data;
				var recordId = getIdFromRecordData(recordData);

				var cRecordData = CORA.coraData(recordData);
				var textParts = cRecordData.getChildrenByNameInData("textPart");
				textParts.forEach(function(textPart) {
					var lang = textPart.attributes.lang;
					var text = textPart.children[0].value;
					if(texts[lang] === undefined){
						texts[lang] = [];
					}
					texts[lang][recordId] = text;
				});
			});
		}

		function getIdFromRecordData(recordData) {
			var cRecord = CORA.coraData(recordData);
			var cRecordInfo = CORA.coraData(cRecord.getFirstChildByNameInData("recordInfo"));
			var id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			return id;
		}
		function getTranslation(textId) {
			if (texts[currentLang][textId] !== undefined) {
				return texts[currentLang][textId];
			}
			console.log("Id(" + textId + ") not found in textProvider");
//			throw new Error("Id(" + textId + ") not found in textProvider");
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return cora;
}(CORA));