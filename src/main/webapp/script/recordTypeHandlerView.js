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
	cora.recordTypeHandlerView = function(spec) {
		var out;
		var view = CORA.gui.createSpanWithClassName("recordType");

		var header = createHeader();
		view.appendChild(header);

		var buttonView = CORA.gui.createSpanWithClassName("buttonView");
		view.appendChild(buttonView);
		possiblyCreateCreateButton();

		var childrenView = CORA.gui.createSpanWithClassName("childrenView");
		view.appendChild(childrenView);

		function createHeader() {
			var headerNew = CORA.gui.createSpanWithClassName("header");
			headerNew.onclick = spec.fetchListMethod;
			headerNew.textContent = spec.headerText;
			return headerNew;
		}

		function possiblyCreateCreateButton() {
			if (spec.createNewMethod !== undefined) {
				buttonView.appendChild(createCreateButton());
			}
		}

		function createCreateButton() {
			var buttonSpec = {
					"className":"createButton",
					"onclick":function() {
						spec.createNewMethod("new");
					}
			};
			return CORA.gui.createButton(buttonSpec);
		}

		function getView() {
			return view;
		}

		function createListItem(text, onclickMethod) {
			var item = {};
			item.menuView = createMenuView(text, item, onclickMethod);
			childrenView.appendChild(item.menuView);

			item.workView = CORA.gui.createSpanWithClassName("workView");
			return item;
		}

		function createMenuView(text, item, onclickMethod) {
			var menuView = CORA.gui.createSpanWithClassName("menuView");
			menuView.onclick = function() {
				onclickMethod(item);
			};
			menuView.textContent = text;
			menuView.modelObject = item;
			return menuView;
		}

		out = Object.freeze({
			getView : getView,
			createListItem : createListItem
		});
		return out;
	};
	return cora;
}(CORA));