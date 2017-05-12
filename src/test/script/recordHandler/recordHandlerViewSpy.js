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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recordHandlerViewSpy = function(spec) {
		var addedEditViews = [];
		var addedShowViews = [];
		var addedButtons = [];
		var clearViewsWasCalled = false;
		var showDataFunction = null;
		var copyAsNewFunction = null;
		var objectsAddedToEditView = [];

		var spyView = document.createElement("span");
		function getView() {
			return spyView;
		}
		function addToEditView(viewToAdd) {
			addedEditViews.push(viewToAdd);
		}
		function addToShowView(viewToAdd) {
			addedShowViews.push(viewToAdd);
		}
		function addButton(text, onclickMethod, className) {
			var buttonSpec = {
				"text" : text,
				"onclickMethod" : onclickMethod,
				"className" : className
			}
			addedButtons.push(buttonSpec);
		}
		function clearViews() {
			clearViewsWasCalled = true;
		}
		function setShowDataFunction(func) {
			showDataFunction = func;
		}
		function setCopyAsNewFunction(func) {
			copyAsNewFunction = func;
		}

		function getSpec() {
			return spec;
		}
		function getSpyView() {
			return spyView;
		}
		function getShowDataFunction() {
			return showDataFunction;
		}
		function getCopyAsNewFunction() {
			return copyAsNewFunction;
		}

		function getAddedEditView(number) {
			return addedEditViews[number];
		}
		function getAddedShowView(number) {
			return addedShowViews[number];
		}
		function getAddedButton(number) {
			return addedButtons[number];
		}
		function getClearViewsWasCalled() {
			return clearViewsWasCalled;
		}

		function addObjectToEditView(objectToAdd) {
			objectsAddedToEditView.push(objectToAdd);
		}
		function getObjectAddedToEditView(number) {
			return objectsAddedToEditView[number];
		}

		var out = Object.freeze({
			getView : getView,
			addToShowView : addToShowView,
			addToEditView : addToEditView,
			addButton : addButton,
			clearViews : clearViews,
			setShowDataFunction : setShowDataFunction,
			setCopyAsNewFunction : setCopyAsNewFunction,

			getSpec : getSpec,
			getSpyView : getSpyView,
			getShowDataFunction : getShowDataFunction,
			getCopyAsNewFunction : getCopyAsNewFunction,
			getAddedEditView : getAddedEditView,
			getAddedShowView : getAddedShowView,
			getAddedButton : getAddedButton,
			getClearViewsWasCalled : getClearViewsWasCalled,
			addObjectToEditView : addObjectToEditView,
			getObjectAddedToEditView : getObjectAddedToEditView
		});
		return out;
	};
	return coraTest;
}(CORATEST));
