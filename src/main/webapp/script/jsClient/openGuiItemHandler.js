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
	cora.openGuiItemHandler = function(dependencies, spec) {
		var managedGuiItemShowing = undefined;
		var managedGuiItemList = [];

		var viewSpec = {
			"headerText" : dependencies.textProvider.getTranslation("theClient_openedText")
		};

		var view = dependencies.openGuiItemHandlerViewFactory.factor(viewSpec);

		function getView() {
			return view.getView();
		}

		function addManagedGuiItem(managedGuiItem) {
			view.addManagedGuiItem(managedGuiItem);
			managedGuiItemList.push(managedGuiItem);
		}

		function showView(managedGuiItem) {
			resetLastShowingMenuItem();
			updateShowingManagedGuiItem(managedGuiItem);
			managedGuiItem.showWorkView();
			managedGuiItemShowing = managedGuiItem;
		}

		function resetLastShowingMenuItem() {
			if (managedGuiItemShowing !== undefined) {
				managedGuiItemShowing.setActive(false);
				managedGuiItemShowing.hideWorkView();
			}
		}

		function updateShowingManagedGuiItem(managedGuiItem) {
			managedGuiItem.setActive(true);
		}

		function removeView(managedGuiItem) {
			removeManagedGuiItemFromList(managedGuiItem);
			var previous = managedGuiItemList.pop();
			if (previous) {
				showView(previous);
			} else {
				resetLastShowingMenuItem();
			}
		}

		function removeManagedGuiItemFromList(managedGuiItem) {
			if (managedGuiItemList.indexOf(managedGuiItem) >= 0) {
				managedGuiItemList.splice(managedGuiItemList.indexOf(managedGuiItem), 1);
			}
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "openGuiItemHandler",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : getView,
			addManagedGuiItem : addManagedGuiItem,
			showView : showView,
			removeView : removeView
		});
		return out;
	};
	return cora;
}(CORA));