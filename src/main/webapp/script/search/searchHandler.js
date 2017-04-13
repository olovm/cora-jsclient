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
			var viewSpec = {
				"searchMethod" : search
			};
			view = dependencies.searchHandlerViewFactory.factor(viewSpec);
			var managedGuiItemSpec = {
				"activateMethod" : spec.showViewMethod,
				"removeMethod" : spec.removeViewMethod
			};
			managedGuiItem = dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);

			managedGuiItem.addWorkPresentation(view.getView());
			spec.addToSearchRecordHandlerMethod(managedGuiItem);
			spec.showViewMethod(managedGuiItem);

			createGui();
		}

		function createGui() {
			try {
				var metadataId = spec.metadataId;
				recordGui = createRecordGui(metadataId);
				addNewRecordToWorkView(recordGui, metadataId);
				recordGui.initMetadataControllerStartingGui();
			} catch (error) {
				createRawDataWorkView("something went wrong, probably missing metadata, " + error);
				view.addPresentationToSearchFormHolder(document.createTextNode(error.stack));
			}
		}

		function createRecordGui(metadataId, data, dataDivider) {
			var recordGuiSpec = {
				"metadataId" : metadataId,
				"data" : data,
				"dataDivider" : dataDivider
			};
			return dependencies.recordGuiFactory.factor(recordGuiSpec);
		}

		function addNewRecordToWorkView(recordGuiToAdd, metadataIdUsedInData) {
			var presentationView = recordGuiToAdd.getPresentation(spec.presentationId,
					metadataIdUsedInData).getView();
			view.addPresentationToSearchFormHolder(presentationView);
		}

		function createRawDataWorkView(data) {
			view.addPresentationToSearchFormHolder(document.createTextNode(JSON.stringify(data)));
		}

		function search() {
			recordGui.validateData();
		}

		function getDependencies() {
			return dependencies;
		}
		start();
		return Object.freeze({
			"type" : "searchHandler",
			getDependencies : getDependencies,
			search : search
		});
	};
	return cora;
}(CORA));