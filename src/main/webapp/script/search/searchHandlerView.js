/*
 * Copyright 2017 Uppsala University Library
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
	cora.searchHandlerView = function(dependencies) {
		var view;
		var searchFormHolder;

		function start() {
			var workItemViewSpec = {
				"extraClassName" : "search"
			};

			var workItemView = dependencies.workItemViewFactory.factor(workItemViewSpec);
			view = workItemView.getView();

			searchFormHolder = CORA.gui.createSpanWithClassName("searchFormHolder");
			workItemView.addViewToView(searchFormHolder);
		}

		function getView() {
			return view;
		}

		function addPresentationToSearchFormHolder(presentationToAdd) {
			searchFormHolder.appendChild(presentationToAdd);
		}

		function getDependencies() {
			return dependencies;
		}

		start();
		return Object.freeze({
			"type" : "searchHandlerView",
			getDependencies : getDependencies,
			getView : getView,
			addPresentationToSearchFormHolder : addPresentationToSearchFormHolder
		});
	};
	return cora;
}(CORA));