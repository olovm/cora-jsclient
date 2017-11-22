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
	cora.loginManagerView = function(dependencies, spec) {
		var out;
		var view;
		var menu;
		var baseClassName = "loginManagerView";
		var holder;

		function start() {
			var holderSpec = {
				"className" : baseClassName,
				"buttonText" : dependencies.textProvider.getTranslation("theClient_loginMenuText"),
				"appendTo" : document.body
			};
			holder = CORA.holder(holderSpec);
			view = holder.getButton();
			menu = holder.getView();

			setLoginOptions();
		}

		function getHtml() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getMenu() {
			return menu;
		}

		function setLoginOptions() {
			menu.innerHTML = "";
			spec.loginOptions.forEach(addMenuElement);
		}

		function addMenuElement(loginOption) {
			var buttonSpec = {
				"className" : "menuOption",
				"text" : loginOption.text,
				"onclick" : function() {
					spec.loginMethod(loginOption);
				}
			};
			var optionButton = CORA.gui.createButton(buttonSpec);
			menu.appendChild(optionButton);
		}

		function setUserId(userIdIn) {
			view.textContent = userIdIn;
		}

		function setState(stateIn) {
			holder.closeHolder();
			if (CORA.loginManager.LOGGEDIN === stateIn) {
				menu.innerHTML = "";
				var logoutOptions = [ {
					"text" : dependencies.textProvider.getTranslation("theClient_logoutMenuText"),
					"call" : spec.logoutMethod
				} ];
				logoutOptions.forEach(addLogoutMenuElement);
			} else {
				setLoginOptions();
				view.textContent = dependencies.textProvider
						.getTranslation("theClient_loginMenuText");
			}
		}

		function addLogoutMenuElement(logoutOption) {
			var buttonSpec = {
				"className" : "menuOption",
				"text" : logoutOption.text,
				"onclick" : logoutOption.call
			};
			var optionButton = CORA.gui.createButton(buttonSpec);
			menu.appendChild(optionButton);
		}

		out = Object.freeze({
			"type" : "loginManagerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getHtml : getHtml,
			getMenu : getMenu,
			setState : setState,
			setUserId : setUserId
		});
		start();
		return out;
	};
	return cora;
}(CORA));