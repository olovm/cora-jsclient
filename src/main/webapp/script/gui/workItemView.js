/*
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
	cora.workItemView = function(spec) {

		var view = createSpanWithClassName("workItem " + spec.extraClassName);
		var topBar = createTopBarInView();
		var toolHolder = createToolHolder();

		function createSpanWithClassName(className) {
			var spanNew = document.createElement("span");
			spanNew.className = className;
			return spanNew;
		}

		function createTopBarInView() {
			var topBar = createSpanWithClassName("topBar")
			view.appendChild(topBar);

			return topBar;
		}

		function createToolHolder() {
			var toolHolder = spec.holderFactory.factor({
				"className" : "tool",
				"appendTo" : view
			});
			topBar.appendChild(toolHolder.getButton());
			return toolHolder;
		}

		function addToolViewToToolHolder(toolView) {
			toolHolder.getView().appendChild(toolView);
		}

		function getView() {
			return view;
		}
		function addViewToView(viewToAdd){
			view.appendChild(viewToAdd);
		}

		return Object.freeze({
			getView : getView,
			addToolViewToToolHolder : addToolViewToToolHolder,
			addViewToView:addViewToView
		});
	};
	return cora;
}(CORA));