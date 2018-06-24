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

		var pChildRefHandler = spec.pChildRefHandler;
		var pChildRefHandlerView = spec.pChildRefHandlerView;
		var repeatMin = spec.repeatMin;
		var repeatMax = spec.repeatMax;
		var path = spec.path;

		var isRepeating = spec.isRepeating;
		var isStaticNoOfChildren = calculateIsStaticNoOfChildren();

		var userCanRemove = spec.mode === "input"
				&& ((isRepeating && !isStaticNoOfChildren) || isZeroToOne());
		var userCanMove = spec.mode === "input" && isRepeating;
		var userCanAddAbove = spec.mode === "input" && (!isStaticNoOfChildren) && !isZeroToOne();

		var view = createBaseView();
		var removeButton;
		var dragButton;
		var alternativePresentation;
		var defaultPresentation;
		var alternativeButton;
		var defaultButton;

		var buttonView = createButtonView();

		function calculateIsStaticNoOfChildren() {
			return repeatMax === repeatMin;
		}

		function isZeroToOne() {
			return repeatMin === "0" && repeatMax === "1";
		}

		function createBaseView() {
			var repeatingElement = CORA.gui.createSpanWithClassName("repeatingElement");
			if (userCanMove) {
				repeatingElement.ondragenter = ondragenterHandler;
			}
			return repeatingElement;
		}

		function ondragenterHandler() {
			pChildRefHandlerView.setRepeatingElementDragOver(view.modelObject);
		}

		function createButtonView() {
			var newButtonView = CORA.gui.createSpanWithClassName("buttonView");
			view.appendChild(newButtonView);
			if (userCanRemove) {
				removeButton = createRemoveButton();
				newButtonView.appendChild(removeButton);
			}
			if (userCanMove) {
				dragButton = createDragButton();
				newButtonView.appendChild(dragButton);
			}
			if (userCanAddAbove) {
				newButtonView.appendChild(createAddAboveButton());
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
			var removeButton = CORA.gui.createRemoveButton(removeFunction);
			removeButton.addEventListener("mouseenter", function() {
				view.className = "repeatingElement hoverRemove";
			});
			removeButton.addEventListener("mouseleave", function() {
				view.className = "repeatingElement";
			});
			return removeButton;
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

		function createAddAboveButton() {
			var addAboveFunction = function() {
				var data = {
					"path" : path
				};
				pChildRefHandler.sendAddAbove(data);
			};
			var buttonSpec = {
				"className" : "iconButton addAboveButton",
				action : {
					method : addAboveFunction
				}
			};
			return CORA.gui.button(buttonSpec);
		}

		function getView() {
			return view;
		}

		function addPresentation(defaultPresentationIn) {
			defaultPresentation = defaultPresentationIn.getView();
			defaultPresentation.className = defaultPresentation.className + " default";
			view.insertBefore(defaultPresentation, buttonView);
			view.className = "repeatingElement";
		}

		function addAlternativePresentation(presentation) {
			alternativePresentation = presentation.getView();
			alternativePresentation.className = alternativePresentation.className + " alternative";
			view.insertBefore(alternativePresentation, buttonView);
			createDefaultAndAlternativeButtons();
			toggleDefaultShown("true");
		}

		function toggleDefaultShown(defaultShown) {
			if (defaultShown !== undefined && defaultShown === "true") {
				hide(alternativePresentation);
				show(defaultPresentation);
				show(alternativeButton);
				hide(defaultButton);
			} else {
				show(alternativePresentation);
				hide(defaultPresentation);
				hide(alternativeButton);
				show(defaultButton);
			}
		}

		function createDefaultAndAlternativeButtons() {
			alternativeButton = CORA.gui.createSpanWithClassName("iconButton alternativeButton");
			alternativeButton.onclick = function() {
				toggleDefaultShown("false");
			};
			if (userCanMove) {
				buttonView.insertBefore(alternativeButton, dragButton);
			} else {
				buttonView.appendChild(alternativeButton);
			}

			defaultButton = CORA.gui.createSpanWithClassName("iconButton defaultButton");
			defaultButton.onclick = function() {
				toggleDefaultShown("true");
			};
			if (userCanMove) {
				buttonView.insertBefore(defaultButton, dragButton);
			} else {
				buttonView.appendChild(defaultButton);
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
			addAlternativePresentation : addAlternativePresentation,
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