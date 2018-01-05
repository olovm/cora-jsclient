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
		function start() {
			view = createBaseView();

		}
		// var childrenView = createChildrenView();
		// var buttonView;
		//
		// var nodeBeeingDragged;
		// var lastChangedWith;
		// var addDragged;
		// var beeingDraggedY;
		// var childIsCurrentlyBeeingDragged = false;
		// var lastRepeatingElementDraggedOver;
		//
		// view.appendChild(childrenView);
		// if (spec.mode==="input" && (spec.addMethod !== undefined || spec.upload === "true")) {
		// createButtonView();
		// }
		//
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
		//
		// function createButtonView() {
		// var buttonViewNew = CORA.gui.createSpanWithClassName("buttonView");
		// if (spec.upload !== "true") {
		// buttonViewNew.appendChild(createAddButton());
		// } else {
		// buttonViewNew.appendChild(createBrowseButton());
		//
		// }
		// buttonView = buttonViewNew;
		// view.appendChild(buttonView);
		// }
		//
		// function createAddButton() {
		// var button = document.createElement("input");
		// button.type = "button";
		// button.value = spec.addText;
		// button.onclick = spec.addMethod;
		// return button;
		// }
		//
		// function createBrowseButton() {
		// var button = document.createElement("input");
		// button.type = "file";
		// button.multiple = "true";
		// button.onchange = function() {
		// spec.handleFilesMethod(this.files);
		// };
		// return button;
		// }
		//
		// function hideButtonView() {
		// buttonView.styleOriginal = buttonView.style.display;
		// buttonView.style.display = "none";
		// }
		//
		// function showButtonView() {
		// if (buttonView.styleOriginal !== undefined) {
		// buttonView.style.display = buttonView.styleOriginal;
		// }
		// }

		function addChild(child) {
			view.appendChild(child);
		}

		// function removeChild(child) {
		// childrenView.removeChild(child);
		// }
		//
		// function moveChild(dataFromMsg) {
		// var childToMove = findRepeatingElementByPath(dataFromMsg.moveChild);
		// var basePositionOnChild = findRepeatingElementByPath(dataFromMsg.basePositionOnChild);
		//
		// if (dataFromMsg.newPosition === "after") {
		// childrenView.insertBefore(childToMove, basePositionOnChild.nextSibling);
		// } else {
		// childrenView.insertBefore(childToMove, basePositionOnChild);
		// }
		// }
		//
		// function findRepeatingElementByPath(pathToFind) {
		// var repeatingElements = childrenView.childNodes;
		// var jsonPathToFind = JSON.stringify(pathToFind);
		// var childKeys = Object.keys(childrenView.childNodes);
		// var foundKey = childKeys.find(function(repeatingElementKey) {
		// var repeatingElement = repeatingElements[repeatingElementKey];
		// var jsonPath = JSON.stringify(repeatingElement.modelObject.getPath());
		// return jsonPathToFind === jsonPath;
		// });
		// return repeatingElements[foundKey];
		// }
		//
		// function hideChildrensRemoveButton() {
		// callOnceOnEachRepeatingElement("hideRemoveButton");
		// }
		//
		// function callOnceOnEachRepeatingElement(functionToRun) {
		// var repeatingElements = childrenView.childNodes;
		// var repeatingElementsKeys = Object.keys(repeatingElements);
		// repeatingElementsKeys.forEach(function(key) {
		// repeatingElements[key].modelObject[functionToRun]();
		// });
		// }
		//
		// function showChildrensRemoveButton() {
		// callOnceOnEachRepeatingElement("showRemoveButton");
		// }
		//
		// function hideChildrensDragButton() {
		// callOnceOnEachRepeatingElement("hideDragButton");
		// }
		//
		// function showChildrensDragButton() {
		// callOnceOnEachRepeatingElement("showDragButton");
		// }
		//
		// function getSpec() {
		// return spec;
		// }
		//
		// function getDependencies() {
		// return dependencies;
		// }

		var out = Object.freeze({
			"type" : "pNonRepeatingChildRefHandlerView",
			// getSpec : getSpec,
			// getDependencies : getDependencies,
			getView : getView,
			// setRepeatingElementDragOver : setRepeatingElementDragOver,
			addChild : addChild,
		// hideButtonView : hideButtonView,
		// showButtonView : showButtonView
		});
		// view.viewObject = out;
		start();
		return out;
	};
	return cora;
}(CORA));