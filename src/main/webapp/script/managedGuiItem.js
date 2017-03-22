/*
 * Copyright 2016, 2017 Uppsala University Library
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
		var viewSpec = {
			"activateMethod" : spec.activateMethod,
			"removeMenuMethod" : spec.removeMenuMethod,
			"removeWorkMethod" : spec.removeWorkMethod
		};
		var managedGuiItemView = dependencies.managedGuiItemViewFactory.factor(viewSpec);
		managedGuiItemView.addMenuPresentation(spec.menuPresentation);
		managedGuiItemView.addWorkPresentation(spec.workPresentation);

		function getMenuView() {
			return managedGuiItemView.getMenuView();
		}
		function getWorkView() {
			return managedGuiItemView.getWorkView();
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

		var out = Object.freeze({
			"type" : "managedGuiItem",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			handleBy : handleBy
		});

		return out;
	};

	return cora;
}(CORA));