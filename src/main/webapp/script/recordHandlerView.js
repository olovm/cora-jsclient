/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.recordHandlerView = function(dependencies, spec) {
		var showIncomingLinksButton;

		var workItemViewSpec = {
			"extraClassName" : spec.extraClassName
		};

		var workItemView = dependencies.workItemViewFactory.factor(workItemViewSpec);
		var view = workItemView.getView();

		var editView = CORA.gui.createSpanWithClassName("editView");
		workItemView.addViewToView(editView);
		var showView = CORA.gui.createSpanWithClassName("showView");
		workItemView.addViewToView(showView);
		var buttonView = CORA.gui.createSpanWithClassName("buttonView");
		workItemView.addViewToView(buttonView);
		var incomingLinksView = CORA.gui.createSpanWithClassName("incomingLinksView");
		workItemView.addViewToView(incomingLinksView);

		setShowDataFunction(spec.showDataMethod);
		setCopyAsNewFunction(spec.copyDataMethod);

		function start() {
			showIncomingLinksButton = createButton("SHOWINCOMINGLINKS",
					spec.showIncomingLinksMethod, "showIncomingLinks");
		}

		function addToShowView(node) {
			showView.appendChild(node);
		}

		function addToEditView(node) {
			editView.appendChild(node);
		}

		function addButton(text, onclickMethod, className) {
			var button = createButton(text, onclickMethod, className);
			buttonView.appendChild(button);
			return button;
		}

		function createButton(text, onclickMethod, className) {
			var button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			if (undefined !== className) {
				button.className = className;
			}
			return button;
		}

		function getView() {
			return view;
		}

		function clearViews() {
			editView.innerHTML = "";
			showView.innerHTML = "";
			buttonView.innerHTML = "";
		}

		function clearDataViews() {
			editView.innerHTML = "";
			showView.innerHTML = "";
		}

		function setShowDataFunction(functionToCall) {
			var button = createButton("Show data as JSON", functionToCall, "showData");
			workItemView.addToolViewToToolHolder(button);
		}

		function setCopyAsNewFunction(functionToCall) {
			var button = createButton("Copy as new", functionToCall, "copyAsNew");
			workItemView.addToolViewToToolHolder(button);
		}

		function addObjectToEditView(objectToAdd) {
			editView.appendChild(document.createTextNode(JSON.stringify(objectToAdd)));
		}

		function addToIncomingLinksView(node) {
			incomingLinksView.appendChild(node);
		}

		function showShowIncomingLinksButton() {
			buttonView.appendChild(showIncomingLinksButton);
		}

		function hideShowIncomingLinksButton() {
			buttonView.removeChild(showIncomingLinksButton);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();

		return Object.freeze({
			"type" : "recordHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addToShowView : addToShowView,
			addToEditView : addToEditView,
			addButton : addButton,
			clearViews : clearViews,
			clearDataViews : clearDataViews,
			addObjectToEditView : addObjectToEditView,
			addToIncomingLinksView : addToIncomingLinksView,
			showShowIncomingLinksButton : showShowIncomingLinksButton,
			hideShowIncomingLinksButton : hideShowIncomingLinksButton
		});
	};
	return cora;
}(CORA));