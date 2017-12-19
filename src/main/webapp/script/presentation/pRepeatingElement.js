/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.pRepeatingElement = function(dependencies, spec) {
		var jsBookkeeper = dependencies.jsBookkeeper;
		var repeatMin = spec.repeatMin;
		var repeatMax = spec.repeatMax;
		var path = spec.path;
		var parentModelObject = spec.parentModelObject;

		var isRepeating = calculateIsRepeating();
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var view = createBaseView();
		var removeButton;
		var dragButton;
		var presentationMaximized;
		var presentationMinimized;
		var maximizeButton;
		var minimizeButton;

		var buttonView = createButtonView();

		function calculateIsRepeating() {
			return repeatMax > 1 || repeatMax === "X";
		}

		function calculateIsStaticNoOfChildren() {
			return repeatMax === repeatMin;
		}

		function createBaseView() {
			var repeatingElement = CORA.gui.createSpanWithClassName("repeatingElement");
			if (spec.mode === "input" && spec.isRepeating) {
				repeatingElement.ondragenter = ondragenterHandler;
			}
			return repeatingElement;
		}

		function ondragenterHandler() {
			parentModelObject.setRepeatingElementDragOver(view.modelObject);
		}

		function addRemoveButton() {
			return (isRepeating && !isStaticNoOfChildren) || isZeroToOne();
		}

		function isZeroToOne() {
			return repeatMin === "0" && repeatMax === "1";
		}

		function createButtonView() {
			var newButtonView = CORA.gui.createSpanWithClassName("buttonView");
			view.appendChild(newButtonView);
			if (spec.mode === "input" && addRemoveButton()) {
				removeButton = createRemoveButton();
				newButtonView.appendChild(removeButton);
				removeButton.addEventListener("mouseenter", function() {
					view.className = "repeatingElement hoverRemove";
				});
				removeButton.addEventListener("mouseleave", function() {
					view.className = "repeatingElement";
				});
			}
			if (spec.mode === "input" && isRepeating) {
				dragButton = createDragButton();
				newButtonView.appendChild(dragButton);
			}
			return newButtonView;
		}

		function createRemoveButton() {
			var removeFunction = function() {
				var data = {
					"type" : "remove",
					"path" : path
				};
				jsBookkeeper.remove(data);
			};
			return CORA.gui.createRemoveButton(removeFunction);
		}

		function createDragButton() {
			var createdDragButton = CORA.gui.createSpanWithClassName("iconButton dragButton");
			createdDragButton.onmousedown = function() {
				view.draggable = "true";
			};
			createdDragButton.onmouseup = function() {
				view.draggable = undefined;
			};
			return createdDragButton;
		}

		function getView() {
			return view;
		}

		function addPresentation(presentation) {
			presentationMaximized = presentation.getView();
			presentationMaximized.className = presentationMaximized.className + " maximized";
			view.insertBefore(presentationMaximized, buttonView);
			view.className = "repeatingElement";
		}

		function addPresentationMinimized(presentationMinimizedIn) {
			presentationMinimized = presentationMinimizedIn.getView();
			presentationMinimized.className = presentationMinimized.className + " minimized";
			view.insertBefore(presentationMinimized, buttonView);
			createMinimizeMaximizeButtons();
			toggleMinimizedShown("false");
		}

		function toggleMinimizedShown(minimizedShown) {
			if (minimizedShown !== undefined && minimizedShown === "true") {
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
			maximizeButton = CORA.gui.createSpanWithClassName("iconButton maximizeButton");
			maximizeButton.onclick = function() {
				toggleMinimizedShown("false");
			};
			if (dragButton !== undefined) {
				buttonView.insertBefore(maximizeButton, dragButton);
			} else {
				buttonView.appendChild(maximizeButton);
			}

			minimizeButton = CORA.gui.createSpanWithClassName("iconButton minimizeButton");
			minimizeButton.onclick = function() {
				toggleMinimizedShown("true");
			};
			if (dragButton !== undefined) {
				buttonView.insertBefore(minimizeButton, dragButton);
			} else {
				buttonView.appendChild(minimizeButton);
			}
		}

		function hideRemoveButton() {
			hide(removeButton);
		}

		function showRemoveButton() {
			show(removeButton);
		}

		function hideDragButton() {
			hide(dragButton);
		}

		function showDragButton() {
			show(dragButton);
		}

		function hide(element) {
			element.styleOriginal = element.style.display;
			element.style.display = "none";
		}
		function show(element) {
			if (element.styleOriginal !== undefined) {
				element.style.display = element.styleOriginal;
			}
		}

		function getPath() {
			return path;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			"type" : "pRepeatingElement",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addPresentation : addPresentation,
			addPresentationMinimized : addPresentationMinimized,
			hideRemoveButton : hideRemoveButton,
			showRemoveButton : showRemoveButton,
			hideDragButton : hideDragButton,
			showDragButton : showDragButton,
			getPath : getPath
		});

		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));