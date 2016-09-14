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
	cora.uploadManagerView = function(spec) {
		var out;

		var workView = CORA.gui.createSpanWithClassName("workView");
		var item = {
			// "menuView" : menuView,
			"workView" : workView
		};
		var menuView = createMenuView("Uploads...", item, spec.showWorkViewMethod);

		function createMenuView(text, itemIn, onclickMethod) {
			var menuViewNew = CORA.gui.createSpanWithClassName("menuView");
			menuViewNew.onclick = function() {
				onclickMethod(itemIn);
			};
			menuViewNew.textContent = text;
			menuViewNew.modelObject = itemIn;
			item.menuView = menuViewNew;
			return menuViewNew;
		}

		function getItem() {
			return item;
		}

		function addFile(name) {
			var child = CORA.gui.createSpanWithClassName("listItem");
			child.textContent = name;
			workView.appendChild(child);
		}
		function activate(){
			menuView.className = "menuView uploading";
		}
		function deactivate(){
			menuView.className = "menuView";
		}
		out = Object.freeze({
			getItem : getItem,
			addFile:addFile,
			activate: activate,
			deactivate: deactivate
		});

		return out;
	};

	return cora;
}(CORA));