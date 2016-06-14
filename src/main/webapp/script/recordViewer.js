/*
 * Copyright 2016 Uppsala University Library
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
	cora.recordViewer = function(spec) {

		var view = document.createElement("span");
		view.className = "recordViewer";

		var messageHolder = CORA.messageHolder();
		view.appendChild(messageHolder.getView());

		var busy = CORA.busy();
		view.appendChild(busy.getView());

		fetchDataFromServer(processFetchedRecord);
		function fetchDataFromServer(callAfterAnswer) {
			busy.show();
			var readLink = spec.read;
			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : readLink.requestMethod,
				"url" : readLink.url,
				"contentType" : readLink.contentType,
				"accept" : readLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			CORA.ajaxCall(callSpec);
		}
		function callError(answer) {
			busy.hideWithEffect();
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function processFetchedRecord(answer) {
			var data = getDataPartOfRecordFromAnswer(answer);
			try {
				var recordGui = createRecordGui(spec.metadataId, data);
				addToShowView(recordGui);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				view.appendChild(document.createTextNode(JSON.stringify(data)));
			}
			busy.hideWithEffect();
		}

		function getDataPartOfRecordFromAnswer(answer) {
			return JSON.parse(answer.responseText).record.data;
		}
		function createRecordGui(metadataId, data) {
			var createdRecordGui = spec.recordGuiFactory.factor(metadataId, data);
			return createdRecordGui;
		}
		function addToShowView(recordGuiToAdd) {
			var showViewId = spec.presentationId;
//			console.log(showViewId)
			var showView = recordGuiToAdd.getPresentation(showViewId).getView();
			view.appendChild(showView);
		}

		function getView() {
			return view;
		}

		return Object.freeze({
			getView : getView
		});
	};
	return cora;
}(CORA));