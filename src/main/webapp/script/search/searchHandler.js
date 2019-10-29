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
		var recordGui;
		var delaySearchTimer;

		function start() {
			view = createView();
			tryToCreateSearchForm();
		}

		function createView() {
			var viewSpec = {
				"searchMethod" : search
			};
			return dependencies.searchHandlerViewFactory.factor(viewSpec);
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

			subscribeToChangesInForm();
		}

		function subscribeToChangesInForm() {
			var path = {};
			var context = undefined;
			var functionToCall = handleMsg;
			recordGui.pubSub.subscribe("*", path, context, functionToCall);
		}

		function handleMsg(dataFromMsg, msg) {
			if (msgUpdatesData(msg)) {
				clearOldTimeoutAndStartNewOneForSearch();
			}
		}

		function msgUpdatesData(msg) {
			return msg.endsWith("setValue") || msg.endsWith("remove");
		}

		function clearOldTimeoutAndStartNewOneForSearch() {
			window.clearTimeout(delaySearchTimer);
			delaySearchTimer = window.setTimeout(function() {
				search();
			}, 400);
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
			window.clearTimeout(delaySearchTimer);
			recordGui.pubSub.publish("addUpToMinNumberOfRepeating", {
				"data" : "",
				"path" : {}
			});
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
				"dataList" : JSON.parse(answerIn.responseText).dataList,
				"jsClient" : dependencies.jsClient,
				"triggerWhenResultIsChoosen" : spec.triggerWhenResultIsChoosen
			};
			var resultHandler = dependencies.resultHandlerFactory.factor(resultHandlerSpec);
			view.clearResultHolder();
			view.addSearchResultToSearchResultHolder(resultHandler.getView());
		}

		function getView() {
			return view.getView();
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "searchHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			search : search,
			handleSearchResult : handleSearchResult,
			getView : getView,
			handleMsg : handleMsg
		});
	};
	return cora;
}(CORA));