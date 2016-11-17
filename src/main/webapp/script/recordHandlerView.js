/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	cora.recordHandlerView = function(spec) {

		var workItemViewSpec = {
			"extraClassName" : spec.extraClassName
		};

		var workItemView = spec.workItemViewFactory.factor(workItemViewSpec);
		var view = workItemView.getView();

		var editView = createSpanWithClassName("editView");
		workItemView.addViewToView(editView);
		var showView = createSpanWithClassName("showView");
		workItemView.addViewToView(showView);
		var buttonView = createSpanWithClassName("buttonView");
		workItemView.addViewToView(buttonView);

		function createSpanWithClassName(className) {
			var spanNew = document.createElement("span");
			spanNew.className = className;
			return spanNew;
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

		function setShowDataFunction(functionToCall) {
			var button = createButton("Show data as JSON", functionToCall, "showData");
			workItemView.addToolViewToToolHolder(button);
		}

		function setCopyAsNewFunction(functionToCall) {
			var button = createButton("Copy as new", functionToCall, "copyAsNew");
			workItemView.addToolViewToToolHolder(button);
		}

		return Object.freeze({
			getView : getView,
			addToShowView : addToShowView,
			addToEditView : addToEditView,
			addButton : addButton,
			clearViews : clearViews,
			setShowDataFunction : setShowDataFunction,
			setCopyAsNewFunction : setCopyAsNewFunction
		});
	};
	return cora;
}(CORA));