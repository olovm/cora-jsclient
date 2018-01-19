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
	cora.resultHandlerView = function(dependencies, spec) {
		var view;
		var resultsHolder;

		function start() {
			view = createView();
			createInfo();
			createResultsHolder();
		}

		function createView() {
			return CORA.gui.createSpanWithClassName("resultHolder");
		}

		function createResultsHolder() {
			resultsHolder = CORA.gui.createSpanWithClassName("resultsHolder");
			view.appendChild(resultsHolder);
		}

		function createInfo() {
			var infoHolder = CORA.gui.createSpanWithClassName("infoHolder");
			view.appendChild(infoHolder);
			infoHolder.textContent = spec.fromNo + " - " + spec.toNo + " " + spec.ofText + " "
					+ spec.totalNo;
		}

		function addChildPresentation(presentationToAdd, record) {
			var childView = createRecordView(record);
			childView.appendChild(presentationToAdd);
			resultsHolder.appendChild(childView);
		}
		function createRecordView(record) {
			var newView = CORA.gui.createSpanWithClassName("listItem");
			newView.onclick = function(event) {
				var loadInBackground = "false";
				if (event.ctrlKey) {
					loadInBackground = "true";
				}
				var openInfo = {
					"record" : record,
					"loadInBackground" : loadInBackground
				};
				spec.resultHandler.openRecord(openInfo);
			};
			return newView;
		}

		function addButton(text, onclickMethod, className) {
			var button = createButton(text, onclickMethod, className);
			view.childNodes[1].appendChild(button);
			return button;
		}

		function createButton(text, onclickMethod, className) {
			var button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			button.className = className;
			return button;
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "resultHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addChildPresentation : addChildPresentation,
			addButton : addButton
		});
	};
	return cora;
}(CORA));