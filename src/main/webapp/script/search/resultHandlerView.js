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
					"createNewRecord" : "false",
					"record" : record,
					"loadInBackground" : loadInBackground
				};
				spec.resultHandler.openRecord(openInfo);
			};
			return newView;
		}
		function getView() {
			return view;
		}

		start();
		return Object.freeze({
			"type" : "resultHandlerView",
			getView : getView,
			addChildPresentation : addChildPresentation
		});
	};
	return cora;
}(CORA));