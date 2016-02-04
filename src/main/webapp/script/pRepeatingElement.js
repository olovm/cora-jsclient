/*
 * Copyright 2016 Uppsala University Library
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
	cora.pRepeatingElement = function(spec) {
		var repeatMin = spec.repeatMin;
		var repeatMax = spec.repeatMax;
		var path = spec.path;
		var jsBookkeeper = spec.jsBookkeeper;

		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var view = createBaseView();
		var buttonView;
		var removeButton;
		if (movableOrRemovableElement()) {
			buttonView = createButtonView();
		}
		function calculateIsRepeating() {
			if (repeatMax > 1 || repeatMax === "X") {
				return true;
			}
			return false;
		}

		function calculateIsStaticNoOfChildren() {
			if (repeatMax === repeatMin) {
				return true;
			}
			return false;
		}

		function createBaseView() {
			var repeatingElement = document.createElement("span");
			repeatingElement.className = "repeatingElement";

			return repeatingElement;
		}

		function movableOrRemovableElement() {
			return !oneAndOnlyOne();
		}

		function oneAndOnlyOne() {
			var stringOne = "1";
			return repeatMin === stringOne && repeatMax === stringOne;
		}

		function addRemoveButton() {
			return isRepeating && !isStaticNoOfChildren;
		}

		function createButtonView() {
			// repeating buttonview
			var newButtonView = document.createElement("span");
			newButtonView.className = "buttonView";
			view.appendChild(newButtonView);

			if (addRemoveButton()) {
				removeButton = createRemoveButton();
				newButtonView.appendChild(removeButton);
			}
			return newButtonView;
		}

		function createRemoveButton() {
			var removeButton = document.createElement("span");
			removeButton.className = "removeButton";
			addCallToJsBookkeeperToRemove(removeButton);
			return removeButton;
		}

		function addCallToJsBookkeeperToRemove(removeButton) {
			removeButton.onclick = function() {
				var data = {
					"type" : "remove",
					"path" : path
				};
				jsBookkeeper.remove(data);
			};
		}

		function getView() {
			return view;
		}

		function addPresentation(presentation) {
			view.insertBefore(presentation.getView(), buttonView);
		}

		function hideRemoveButton() {
			removeButton.styleOriginal = removeButton.style.display;
			removeButton.style.display = "none";
		}

		function showRemoveButton() {
			removeButton.style.display = removeButton.styleOriginal;
		}

		var out = Object.freeze({
			"type" : "pRepeatingElement",
			getView : getView,
			addPresentation : addPresentation,
			hideRemoveButton : hideRemoveButton,
			showRemoveButton : showRemoveButton
		});

		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));