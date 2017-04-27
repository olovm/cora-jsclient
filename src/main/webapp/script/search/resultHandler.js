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
	cora.resultHandler = function(dependencies, spec) {

		var view;
		// var managedGuiItem;
		// var recordGui;

		function start() {
			view = createView();
			createAndAddPresentationsForEachResultItem();
			// managedGuiItem = createManagedGuiItem();
			// managedGuiItem.addWorkPresentation(view.getView());
			// addSearchToSearchRecordHandler(managedGuiItem);
			// showSearchInJsClient(managedGuiItem);
			// tryToCreateSearchForm();
		}

		function createView() {
			var viewSpec = {
				"ofText" : dependencies.textProvider.getTranslation("theClient_resultListOfText"),
				"fromNo" : spec.dataList.fromNo,
				"toNo" : spec.dataList.toNo,
				"totalNo" : spec.dataList.totalNo
			};
			return dependencies.resultHandlerViewFactory.factor(viewSpec);
		}

		function createAndAddPresentationsForEachResultItem() {
			var data = spec.dataList.data;
			data.forEach(tryToAddResultItemToView);
		}
		function tryToAddResultItemToView(recordContainer) {
			// try {
			addResultItemToWorkView(recordContainer.record.data);
			// } catch (e) {
			// managedGuiItem.addWorkPresentation(document.createTextNode(e));
			// managedGuiItem.addWorkPresentation(document.createTextNode(e.stack));
			// }
		}
		function addResultItemToWorkView(result) {
			// var result = spec.dataList.data[0].record.data;
			var recordTypeId = getRecordTypeIdFromRecord(result);
			var recordTypeMetadata = dependencies.jsClient.getMetadataForRecordTypeId(recordTypeId)
			var metadataId = recordTypeMetadata.metadataId;
			var dataDivider = getDataDividerFromData(result);

			var recordGuiSpec = {
				"metadataId" : metadataId,
				"data" : result,
				"dataDivider" : dataDivider
			};
			var recordGui = dependencies.recordGuiFactory.factor(recordGuiSpec);

			var listPresentationId = recordTypeMetadata.listPresentationViewId;
			var listPresentation = recordGui.getPresentationHolder(listPresentationId, metadataId);
			recordGui.initMetadataControllerStartingGui();
			view.addChildPresentation(listPresentation.getView());
		}

		function getRecordTypeIdFromRecord(record) {
			var cData = CORA.coraData(record);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("type");
		}

		function getDataDividerFromData(data) {
			var cData = CORA.coraData(data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		//
		// function createManagedGuiItem() {
		// var managedGuiItemSpec = {
		// "activateMethod" : spec.showViewMethod,
		// "removeMethod" : spec.removeViewMethod
		// };
		// return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		// }
		//
		// function addSearchToSearchRecordHandler(managedGuiItemToAdd) {
		// spec.addToSearchRecordHandlerMethod(managedGuiItemToAdd);
		// }
		//
		// function showSearchInJsClient(managedGuiItemToShow) {
		// spec.showViewMethod(managedGuiItemToShow);
		// }
		//
		// function tryToCreateSearchForm() {
		// try {
		// createSearchForm();
		// } catch (error) {
		// createRawDataWorkView("something went wrong, probably missing metadata, " + error);
		// view.addPresentationToSearchFormHolder(document.createTextNode(error.stack));
		// }
		// }
		//
		// function createSearchForm() {
		// var metadataId = spec.metadataId;
		// recordGui = createRecordGui(metadataId);
		// addSearchFormFromRecordGuiToView(recordGui, metadataId);
		// recordGui.initMetadataControllerStartingGui();
		// }
		//
		// function createRecordGui(metadataId) {
		// var recordGuiSpec = {
		// "metadataId" : metadataId
		// };
		// return dependencies.recordGuiFactory.factor(recordGuiSpec);
		// }
		//
		// function addSearchFormFromRecordGuiToView(recordGuiToAdd, metadataIdUsedInData) {
		// var presentationView = recordGuiToAdd.getPresentation(spec.presentationId,
		// metadataIdUsedInData).getView();
		// view.addPresentationToSearchFormHolder(presentationView);
		// }
		//
		// function createRawDataWorkView(data) {
		// view.addPresentationToSearchFormHolder(document.createTextNode(JSON.stringify(data)));
		// }
		//
		// function search() {
		// if (recordGui.validateData()) {
		// sendSearchQueryToServer();
		// }
		// }
		//
		// function sendSearchQueryToServer() {
		// var link = spec.searchLink;
		// var callSpec = {
		// "url" : link.url,
		// "requestMethod" : link.requestMethod,
		// "accept" : link.accept,
		// "parameters" : {
		// "searchData" : JSON.stringify(recordGui.dataHolder.getData())
		// },
		// // "loadMethod" : function(answer) {
		// // alert(JSON.stringify(answer));
		// // }
		// };
		// dependencies.ajaxCallFactory.factor(callSpec);
		// }

		function getDependencies() {
			return dependencies;
		}
		function getView() {
			return view.getView();
		}

		function getSpec() {
			return spec;
		}

		start();

		return Object.freeze({
			"type" : "resultHandler",
			getView : getView,
			getDependencies : getDependencies,
			getSpec : getSpec
		// search : search
		});
	};
	return cora;
}(CORA));