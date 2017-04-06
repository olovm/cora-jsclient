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
	cora.searchRecordHandler = function(dependencies, spec) {
		var searchId = getIdFromRecord(spec.searchRecord);

		var viewSpec = {
			"headerText" : searchId,
			"openSearchMethod" : openSearch
		};

		var view = dependencies.searchRecordHandlerViewFactory.factor(viewSpec);

		function getView() {
			return view.getView();
		}

		function openSearch() {
			createManagedGuiItem("Search");
		}

		function getIdFromRecord(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("id");
		}

		// function createManagedGuiItem(text) {
		// var managedGuiItem = dependencies.jsClient.createManagedGuiItem();
		// managedGuiItem.menuView.textContent = text;
		// managedGuiItem.menuView.appendChild(createRemoveButton(managedGuiItem));
		// view.addManagedGuiItem(managedGuiItem);
		// dependencies.jsClient.showView(managedGuiItem);
		// return managedGuiItem;
		// }
		function createManagedGuiItem(text) {
			var menuPresentation = CORA.gui.createSpanWithClassName("search");
			menuPresentation.textContent = text;
			var managedGuiItem;
			var managedGuiItemSpec = {
				"menuPresentation" : menuPresentation,
				"workPresentation" : CORA.gui.createSpanWithClassName("workPresentation"),
				"activateMethod" : function() {
					dependencies.jsClient.showView(managedGuiItem);
				},
				"removeMenuMethod" : function() {
					removeViewsFromParentNodes(managedGuiItem);
				},
				"removeWorkMethod" : function() {
				}
			};
			managedGuiItem = dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
			view.addManagedGuiItem(managedGuiItem);
			dependencies.jsClient.showView(managedGuiItem);
		}

		function createRemoveButton(managedGuiItem) {
			return CORA.gui.createRemoveButton(function() {
				removeViewsFromParentNodes(managedGuiItem);
			});
		}

		function removeViewsFromParentNodes(managedGuiItem) {
			// if (menuView.parentNode !== null) {
			// menuView.parentNode.removeChild(menuView);
			// }
			view.removeManagedGuiItem(managedGuiItem);

			// if (workView.parentNode !== null) {
			// workView.parentNode.removeChild(workView);
			// }
			dependencies.jsClient.hideAndRemoveView(managedGuiItem);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "searchRecordHandler",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : getView,
			openSearch : openSearch
		});
		return out;
	};
	return cora;
}(CORA));