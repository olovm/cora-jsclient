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
	cora.recordListHandler = function(dependencies, spec) {
		var managedGuiItem;
		var recordId = spec.recordTypeRecordId;

		function start() {
			managedGuiItem = createManagedGuiItem();
			addToViewToJsClient(managedGuiItem);
			showViewInClient(managedGuiItem);

			addTextToMenuView();
			fetchDataFromServer(createRecordTypeListFromAnswer);
		}

		function createManagedGuiItem() {
			var managedGuiItemSpec = {
				"activateMethod" : spec.jsClient.showView,
				"removeMethod" : spec.jsClient.viewRemoved
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		}

		function addToViewToJsClient(managedGuiItemToAdd) {
			spec.jsClient.addGuiItem(managedGuiItemToAdd);
		}

		function showViewInClient(managedGuiItemToShow) {
			spec.jsClient.showView(managedGuiItemToShow);
		}

		function addTextToMenuView() {
			var menuPresentation = CORA.gui.createSpanWithClassName("");
			menuPresentation.textContent = "List (" + recordId + ")";
			managedGuiItem.addMenuPresentation(menuPresentation);
		}

		function fetchDataFromServer(callAfterAnswer) {
			var listLink = spec.listLink;
			var callSpec = {
				"requestMethod" : listLink.requestMethod,
				"url" : listLink.url,
				"contentType" : listLink.contentType,
				"accept" : listLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function createRecordTypeListFromAnswer(answer) {
			var resultHandlerSpec = {
				"dataList" : JSON.parse(answer.responseText).dataList,
				"jsClient" : spec.jsClient
			};
			var resultHandler = dependencies.resultHandlerFactory.factor(resultHandlerSpec);
			managedGuiItem.addWorkPresentation(resultHandler.getView());
		}

		function callError(answer) {
			var messageHolder = CORA.messageHolder();
			managedGuiItem.addWorkPresentation(messageHolder.getView());
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}
		var out = Object.freeze({
			"type" : "recordListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			open : open,
			createRecordTypeListFromAnswer : createRecordTypeListFromAnswer
		});

		start();

		return out;
	};
	return cora;
}(CORA));