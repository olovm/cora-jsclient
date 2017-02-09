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
	cora.loginManagerView = function(dependencies) {
		var out;
		var view;
		var menu;
		var valueView;
		var baseClassName = "loginManagerView";
		var holder;
		function start() {
			var spec = {
				"className" : baseClassName,
				"buttonText" : dependencies.textProvider.getTranslation("theClient_loginMenuText"),
				"appendTo" : document.body
			};
			holder = CORA.holder(spec);
			view = holder.getButton();
			menu = holder.getView();
		}

		function getHtml() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getMenu() {
			return menu;
		}

		function setLoginOptions(loginOptions) {
			loginOptions.forEach(addMenuElement);
		}

		function addMenuElement(loginOption) {
			var buttonSpec = {
				"className" : "menuOption",
				"text" : loginOption.text,
				"onclick" : loginOption.call
			};
			var optionButton = CORA.gui.createButton(buttonSpec);
			menu.appendChild(optionButton);
		}

		function setUserId(userIdIn){
			view.textContent = userIdIn;
			holder.toggleHolder();
		}
		
		out = Object.freeze({
			"type" : "loginManagerView",
			getDependencies : getDependencies,
			getHtml : getHtml,
			getMenu : getMenu,
			setLoginOptions : setLoginOptions,
			setUserId : setUserId
		});
		start();
		return out;
	};
	return cora;
}(CORA));