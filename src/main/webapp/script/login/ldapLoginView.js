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
	cora.ldapLoginView = function(dependencies, spec) {
		var view;
		var loginFormHolder;

		function start() {
			var workItemView = createWorkItemView();
			view = workItemView.getView();
			createLoginFormHolderAndAddTo(workItemView);
		}

		function createWorkItemView() {
			var workItemViewSpec = {
				"extraClassName" : "ldapLogin"
			};
			return dependencies.workItemViewFactory.factor(workItemViewSpec);
		}

		function createLoginFormHolderAndAddTo(addTo) {
			loginFormHolder = CORA.gui.createSpanWithClassName("loginFormHolder");
			addTo.addViewToView(loginFormHolder);
		}

		function getView() {
			return view;
		}

		function addPresentationToLoginFormHolder(presentationToAdd) {
			loginFormHolder.insertBefore(presentationToAdd, loginFormHolder.lastChild);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "ldapLoginView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addPresentationToLoginFormHolder : addPresentationToLoginFormHolder
		});
	};
	return cora;
}(CORA));