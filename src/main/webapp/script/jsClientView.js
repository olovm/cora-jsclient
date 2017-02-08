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
	cora.jsClientView = function(dependencies, spec) {
		var out;
		var mainView;
		var header;
		var recordTypesView;
		var workArea;
		var messageHolder;

		function start() {
			mainView = createMainView();
			mainView.modelObject = out;
		}

		function createMainView() {
			var view = CORA.gui.createSpanWithClassName("jsClient mainView");

			header = CORA.gui.createSpanWithClassName("header");
			header.textContent = spec.name;
			view.appendChild(header);

			recordTypesView = CORA.gui.createSpanWithClassName("recordTypesView");
			view.appendChild(recordTypesView);

			workArea = CORA.gui.createSpanWithClassName("workArea");
			view.appendChild(workArea);
			
			messageHolder = dependencies.messageHolderFactory.factor();
			
			return view;
		}

		function addToRecordTypesView(recordTypeView) {
			recordTypesView.appendChild(recordTypeView);
		}

		function getView() {
			return mainView;
		}

		function getRecordTypesView() {
			return recordTypesView;
		}

		function clearRecordTypesView() {
			recordTypesView.innerHTML = "";
		}

		function getWorkView() {
			return workArea;
		}

		function addToWorkView(viewToAdd) {
			workArea.appendChild(viewToAdd);
		}

		function getSpec() {
			return spec;
		}

		function addLoginManagerView(viewToAdd) {
			header.appendChild(viewToAdd);
		}

		function addGlobalView(viewToAdd) {
			header.appendChild(viewToAdd);
		}

		function getHeader() {
			return header;
		}

		function addErrorMessage(errorText) {
			var messageSpec = {
				"message" : errorText,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		out = Object.freeze({
			"type" : "jsClientView",
			getView : getView,
			addToRecordTypesView : addToRecordTypesView,
			getRecordTypesView : getRecordTypesView,
			clearRecordTypesView : clearRecordTypesView,
			getWorkView : getWorkView,
			addToWorkView : addToWorkView,
			addLoginManagerView : addLoginManagerView,
			addGlobalView : addGlobalView,
			getHeader : getHeader,
			getSpec : getSpec,
			addErrorMessage : addErrorMessage
		});
		start();

		return out;
	};
	return cora;
}(CORA));