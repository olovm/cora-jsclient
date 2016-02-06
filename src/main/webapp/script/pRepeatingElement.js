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
		var removeButton;
		var presentationMaximized;
		var presentationMinimized;
		var maximizeButton;
		var minimizeButton;

		var buttonView = createButtonView();


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

		function addRemoveButton() {
			return (isRepeating && !isStaticNoOfChildren) || isZeroToOne();
		}

		function isZeroToOne() {
			if (repeatMin === "0" && repeatMax === "1") {
				return true;
			}
			return false;
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
			var createdRemoveButton = document.createElement("span");
			createdRemoveButton.className = "removeButton";
			addCallToJsBookkeeperToRemove(createdRemoveButton);
			return createdRemoveButton;
		}

		function addCallToJsBookkeeperToRemove(removeButtonIn) {
			removeButtonIn.onclick = function() {
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
			presentationMaximized = presentation.getView();
			presentationMaximized.className =  presentationMaximized.className + " maximized";
			view.insertBefore(presentationMaximized, buttonView);
		}

		function addPresentationMinimized(presentationMinimizedIn, minimizedDefault) {
			presentationMinimized = presentationMinimizedIn.getView();
			presentationMinimized.className =  presentationMinimized.className + " minimized";
			view.insertBefore(presentationMinimized, buttonView);
			createMinimizeMaximizeButtons();
			toggleMinimizedShown(minimizedDefault);
		}

		function toggleMinimizedShown(minimizedShown) {
			if (minimizedShown!==undefined && minimizedShown === "true") {
				hide(presentationMaximized);
				show(presentationMinimized);
				show(maximizeButton);
				hide(minimizeButton);
			} else {
				show(presentationMaximized);
				hide(presentationMinimized);
				hide(maximizeButton);
				show(minimizeButton);
			}
		}

		function createMinimizeMaximizeButtons() {
			maximizeButton = document.createElement("span");
			maximizeButton.className = "maximizeButton";
			maximizeButton.onclick = function() {
				toggleMinimizedShown("false");
			};
			buttonView.appendChild(maximizeButton);

			minimizeButton = document.createElement("span");
			minimizeButton.className = "minimizeButton";
			minimizeButton.onclick = function() {
				toggleMinimizedShown("true");
			};
			buttonView.appendChild(minimizeButton);
		}

		function hideRemoveButton() {
			hide(removeButton);
		}

		function showRemoveButton() {
			show(removeButton);
		}
		function hide(element) {
			element.styleOriginal = element.style.display;
			element.style.display = "none";
		}
		function show(element) {
			element.style.display = element.styleOriginal;
		}
		var out = Object.freeze({
			"type" : "pRepeatingElement",
			getView : getView,
			addPresentation : addPresentation,
			addPresentationMinimized : addPresentationMinimized,
			hideRemoveButton : hideRemoveButton,
			showRemoveButton : showRemoveButton
		});

		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));