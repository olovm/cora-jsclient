/*
 * Copyright 2017 Uppsala University Library
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
	cora.searchHandler = function(dependencies, spec) {

		var view;
		var managedGuiItem;
		var recordGui;

		function start() {
			view = createView();
			managedGuiItem = createManagedGuiItem();
			managedGuiItem.addWorkPresentation(view.getView());
			addSearchToSearchRecordHandler(managedGuiItem);
			showSearchInJsClient(managedGuiItem);
			tryToCreateSearchForm();
		}

		function createView() {
			var viewSpec = {
				"searchMethod" : search
			};
			return dependencies.searchHandlerViewFactory.factor(viewSpec);
		}

		function createManagedGuiItem() {
			var managedGuiItemSpec = {
				"activateMethod" : spec.showViewMethod,
				"removeMethod" : spec.removeViewMethod
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		}

		function addSearchToSearchRecordHandler(managedGuiItemToAdd) {
			spec.addToSearchRecordHandlerMethod(managedGuiItemToAdd);
		}

		function showSearchInJsClient(managedGuiItemToShow) {
			spec.showViewMethod(managedGuiItemToShow);
		}

		function tryToCreateSearchForm() {
			try {
				createSearchForm();
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata, " + error);
				view.addPresentationToSearchFormHolder(document.createTextNode(error.stack));
			}
		}

		function createSearchForm() {
			var metadataId = spec.metadataId;
			recordGui = createRecordGui(metadataId);
			addSearchFormFromRecordGuiToView(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();
		}

		function createRecordGui(metadataId) {
			var recordGuiSpec = {
				"metadataId" : metadataId
			};
			return dependencies.recordGuiFactory.factor(recordGuiSpec);
		}

		function addSearchFormFromRecordGuiToView(recordGuiToAdd, metadataIdUsedInData) {
			var presentationView = recordGuiToAdd.getPresentationHolder(spec.presentationId,
					metadataIdUsedInData).getView();
			view.addPresentationToSearchFormHolder(presentationView);
		}

		function createRawDataWorkView(data) {
			view.addPresentationToSearchFormHolder(document.createTextNode(JSON.stringify(data)));
		}

		function search() {
			if (recordGui.validateData()) {
				sendSearchQueryToServer();
			}
		}

		function sendSearchQueryToServer() {
			var link = spec.searchLink;
			var callSpec = {
				"url" : link.url,
				"requestMethod" : link.requestMethod,
				"accept" : link.accept,
				"parameters" : {
					"searchData" : JSON.stringify(recordGui.dataHolder.getData())
				},
				"loadMethod" : handleSearchResult
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function handleSearchResult(answerIn) {
			var resultHandlerSpec = {
				"dataList" : JSON.parse(answerIn.responseText).dataList
			};
			var resultHandler = dependencies.resultHandlerFactory.factor(resultHandlerSpec);
			view.addSearchResultToSearchResultHolder(resultHandler.getView());
		}

		function getDependencies() {
			return dependencies;
		}

		start();

		return Object.freeze({
			"type" : "searchHandler",
			getDependencies : getDependencies,
			search : search,
			handleSearchResult : handleSearchResult
		});
	};
	return cora;
}(CORA));