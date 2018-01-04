/*
 * Copyright 2018 Uppsala University Library
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
	cora.pNonRepeatingChildRefHandler = function(dependencies, spec) {
		var view;
		function start() {
			createView();
			var factoredPresentation = factorPresentation();
			view.addChild(factoredPresentation.getView());
		}

		function createView() {
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor();
		}

		function factorPresentation() {
			var presentationSpec = {
				path : spec.parentPath,
				metadataIdUsedInData : spec.parentMetadataId,
				cPresentation : spec.cPresentation,
				cParentPresentation : spec.cParentPresentation
			};
			return dependencies.presentationFactory.factor(presentationSpec);
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
		var out = Object.freeze({
			type : "pNonRepeatingChildRefHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView
		});

		// pChildRefHandlerView.getView().modelObject = out;
		start();
		return out;
	};

	return cora;
}(CORA));