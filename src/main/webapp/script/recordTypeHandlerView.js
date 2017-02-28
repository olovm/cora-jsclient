/*
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.recordTypeHandlerView = function(dependencies, spec) {
		var out;
		var view;
		var header;
		var buttonView;
		var childrenView;

		function start() {
			view = CORA.gui.createSpanWithClassName("recordType");

			header = createHeader();
			view.appendChild(header);

			buttonView = CORA.gui.createSpanWithClassName("buttonView");
			view.appendChild(buttonView);
			possiblyCreateCreateButton();

			childrenView = CORA.gui.createSpanWithClassName("childrenView");
			view.appendChild(childrenView);
		}

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
				"className" : "createButton",
				"onclick" : function() {
					spec.createNewMethod("new");
				}
			};
			return CORA.gui.createButton(buttonSpec);
		}

		function getView() {
			return view;
		}

//		function createManagedGuiItem(text, onclickMethod) {
//			var item = dependencies.jsClient.createManagedGuiItem(onclickMethod);
//			item.menuView.modelObject = item;
//			item.menuView.textContent = text;
//			childrenView.appendChild(item.menuView);
//			return item;
//		}
		function addManagedGuiItem(managedGuiItem) {
			managedGuiItem.menuView.modelObject = managedGuiItem;
			childrenView.appendChild(managedGuiItem.menuView);
		}

		out = Object.freeze({
			getView : getView,
//			createManagedGuiItem : createManagedGuiItem,
			addManagedGuiItem : addManagedGuiItem
		});
		start();
		return out;
	};
	return cora;
}(CORA));