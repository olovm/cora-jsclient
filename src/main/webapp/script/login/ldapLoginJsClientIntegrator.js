/*
 * Copyright 2019 Uppsala University Library
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
	cora.ldapLoginJsClientIntegrator = function(dependencies, spec) {
		var managedGuiItem;
		var ldapLogin;

		function start() {
			managedGuiItem = createManagedGuiItem();
			addLdapLoginToJsClient(managedGuiItem);
			showLdapLoginInJsClient(managedGuiItem);

			ldapLogin = createLdapLogin();
			managedGuiItem.addWorkPresentation(ldapLogin.getView());
		}

		function createLdapLogin() {
			return dependencies.ldapLoginFactory.factor(spec);
		}

		function createManagedGuiItem() {
			var managedGuiItemSpec = {
				"activateMethod" : dependencies.jsClient.showView,
				"removeMethod" : dependencies.jsClient.viewRemoved
			};
			return dependencies.managedGuiItemFactory
					.factor(managedGuiItemSpec);
		}

		function addLdapLoginToJsClient(managedGuiItemToAdd) {
			dependencies.jsClient.addGuiItem(managedGuiItemToAdd);
		}

		function showLdapLoginInJsClient(managedGuiItemToShow) {
			dependencies.jsClient.showView(managedGuiItemToShow);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "ldapLoginJsClientIntegrator",
			getDependencies : getDependencies,
			getSpec : getSpec
		});
	};
	return cora;
}(CORA));