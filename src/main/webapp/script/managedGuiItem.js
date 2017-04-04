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
	cora.managedGuiItem = function(dependencies, spec) {
		var out;
		var viewSpec = {
			"activateMethod" : activate,
			"removeMethod" : remove
		};
		var view = dependencies.managedGuiItemViewFactory.factor(viewSpec);
		if (spec.menuPresentation !== undefined) {
			view.addMenuPresentation(spec.menuPresentation);
		}
		if (spec.workPresentation !== undefined) {
			view.addWorkPresentation(spec.workPresentation);
		}

		var active = false;
		var changed = false;

		function activate() {
			spec.activateMethod(out);
		}

		function remove() {
			view.removeViews();
			spec.removeMethod(out);
		}

		function getMenuView() {
			return view.getMenuView();
		}

		function getWorkView() {
			return view.getWorkView();
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function handleBy(someThing) {
			spec.handleBy(someThing);
		}

		function addMenuPresentation(presentationToAdd) {
			view.addMenuPresentation(presentationToAdd);
		}

		function addWorkPresentation(presentationToAdd) {
			view.addWorkPresentation(presentationToAdd);
		}

		function setChanged(changedIn) {
			changed = changedIn;
			updateViewState();
		}

		function updateViewState() {
			var state = {
				"active" : active,
				"changed" : changed
			};
			view.updateMenuView(state);
		}
		function setActive(activeIn) {
			active = activeIn;
			updateViewState();
		}

		function clearMenuView() {
			view.clearMenuView();
		}

		function clearWorkView() {
			view.clearWorkView();
		}

		function hideWorkView() {
			view.hideWorkView();
		}

		function showWorkView() {
			view.showWorkView();
		}

		out = Object.freeze({
			"type" : "managedGuiItem",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			handleBy : handleBy,
			remove : remove,
			addMenuPresentation : addMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			setChanged : setChanged,
			setActive : setActive,
			clearMenuView : clearMenuView,
			clearWorkView : clearWorkView,
			hideWorkView : hideWorkView,
			showWorkView : showWorkView
		});

		return out;
	};

	return cora;
}(CORA));