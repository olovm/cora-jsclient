/*
 * Copyright 2016 Uppsala University Library
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

		var view = createSpanWithClassName("workItem " + spec.extraClassName);
		var editView = createSpanWithClassName("editView");
		view.appendChild(editView);
		var showView = createSpanWithClassName("showView");
		view.appendChild(showView);
		var buttonView = createSpanWithClassName("buttonView");
		view.appendChild(buttonView);

		function createSpanWithClassName(className) {
			var spanNew = document.createElement("span");
			spanNew.className = className;
			return spanNew;
		}

		function addShowView(node) {
			showView.appendChild(node);
		}

		function addEditView(node) {
			editView.appendChild(node);
		}

		function addButton(text, onclickMethod, className) {
			var button = document.createElement("input");
			button.type = "button";
			button.value = text;
			button.onclick = onclickMethod;
			if (undefined !== className) {
				button.className = className;
			}
			buttonView.appendChild(button);
		}

		function getView() {
			return view;
		}

		function clearViews() {
			editView.innerHTML = "";
			showView.innerHTML = "";
			buttonView.innerHTML = "";
		}

		return Object.freeze({
			getView : getView,
			addShowView : addShowView,
			addEditView : addEditView,
			addButton : addButton,
			clearViews : clearViews
		});
	};
	return cora;
}(CORA));