/*
 * Copyright 2018 Uppsala University Library
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
	cora.pNonRepeatingChildRefHandlerView = function(dependencies, spec) {
		var view;
		var buttonView;
		var alternativePresentation;
		var defaultPresentation;
		var alternativeButton;
		var defaultButton;

		function start() {
			view = createBaseView();

		}
		function createBaseView() {
			var newClassName = "pNonRepeatingChildRefHandler";
			if (spec.textStyle !== undefined) {
				newClassName += " " + spec.textStyle;
			}
			if (spec.childStyle !== undefined) {
				newClassName += " " + spec.childStyle;
			}
			newClassName += " " + spec.presentationId;
			return CORA.gui.createSpanWithClassName(newClassName);
		}

		function getView() {
			return view;
		}

		function addChild(child) {
			child.className += " default";
			defaultPresentation = child;
			view.insertBefore(child, buttonView);
		}

		function addAlternativeChild(child) {
			child.className += " alternative";
			alternativePresentation = child;
			createButtonView();
			view.insertBefore(child, buttonView);
			toggleDefaultShown("true");
		}

		function createButtonView() {
			var buttonViewNew = CORA.gui.createSpanWithClassName("buttonView");
			buttonView = buttonViewNew;
			view.appendChild(buttonViewNew);
			createDefaultAndAlternativeButtons();
		}

		function createDefaultAndAlternativeButtons() {
			var alternativeButtonSpec = {
				"className" : "iconButton alternativeButton",
				"onclick" : function() {
					toggleDefaultShown("false");
				}
			};
			alternativeButton = CORA.gui.createButton(alternativeButtonSpec);
			buttonView.appendChild(alternativeButton);

			var defaultButtonSpec = {
				"className" : "iconButton defaultButton",
				"onclick" : function() {
					toggleDefaultShown("true");
				}
			};
			defaultButton = CORA.gui.createButton(defaultButtonSpec);
			buttonView.appendChild(defaultButton);
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

		function hide(element) {
			element.styleOriginal = element.style.display;
			element.style.display = "none";
		}
		function show(element) {
			if (element.styleOriginal !== undefined) {
				element.style.display = element.styleOriginal;
			}
		}
		var out = Object.freeze({
			"type" : "pNonRepeatingChildRefHandlerView",
			getView : getView,
			addChild : addChild,
			addAlternativeChild : addAlternativeChild
		});
		start();
		return out;
	};
	return cora;
}(CORA));