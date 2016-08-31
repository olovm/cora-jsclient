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
	cora.pChildRefHandlerView = function(spec) {
		var view = createBaseView();
		var childrenView = createChildrenView();
		var buttonView;

		var nodeBeeingDragged;
		var lastChangedWith;
		var addDragged;
		var beeingDraggedY;
		var childIsCurrentlyBeeingDragged = false;
		var lastRepeatingElementDraggedOver;

		view.appendChild(childrenView);
		if (spec.addMethod !== undefined || spec.upload === "true") {
			createButtonView();
		}

		function createBaseView() {
			return createSpanWithClassName("pChildRefHandler " + spec.presentationId);
		}

		function createSpanWithClassName(className) {
			var spanNew = document.createElement("span");
			spanNew.className = className;
			return spanNew;
		}

		function getView() {
			return view;
		}

		function createButtonView() {
			var buttonViewNew = createSpanWithClassName("buttonView");
			if (spec.upload !== "true") {
				buttonViewNew.appendChild(createAddButton());
			} else {
				buttonViewNew.appendChild(createBrowseButton());

			}
			buttonView = buttonViewNew;
			view.appendChild(buttonView);
		}

		function createAddButton() {
			var button = document.createElement("input");
			button.type = "button";
			button.value = "ADD";
			button.onclick = spec.addMethod;
			return button;
		}

		function createBrowseButton() {
			var button = document.createElement("input");
			button.type = "file";
			button.multiple = "true";
			button.onchange = function(){
				spec.handleFilesMethod(this.files);
			};
			return button;
		}

		function hideButtonView() {
			buttonView.styleOriginal = buttonView.style.display;
			buttonView.style.display = "none";
		}

		function showButtonView() {
			if (buttonView.styleOriginal !== undefined) {
				buttonView.style.display = buttonView.styleOriginal;
			}
		}

		function setRepeatingElementDragOver(repeatingElement) {
			lastRepeatingElementDraggedOver = repeatingElement;
		}

		function createChildrenView() {
			var childrenViewNew = createSpanWithClassName("childrenView");
			if (spec.isRepeating) {
				addDragEventHandlers(childrenViewNew);
			}
			return childrenViewNew;
		}

		function addDragEventHandlers(childrenViewNew) {
			childrenViewNew.ondragstart = dragstartHandler;
			childrenViewNew.ondragover = dragoverHandler;
			childrenViewNew.ondragenter = dragenterHandler;
			childrenViewNew.ondrop = dropHandler;
			childrenViewNew.ondragend = dragendHandler;
		}

		function dragstartHandler(event) {
			event.stopPropagation();
			childIsCurrentlyBeeingDragged = true;
			nodeBeeingDragged = event.target;
			beeingDraggedY = event.screenY;
			var source = event.target;
			source.originalClassname = source.className;
			source.className = source.className + " beeingDragged";
			event.dataTransfer.setData("text/notInUse", "notUsed");
			event.dataTransfer.effectAllowed = "move";
		}

		function dragoverHandler(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
		}

		function dragenterHandler(event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = "move";
			if (childIsCurrentlyBeeingDragged && aRepeatingElementHasBeenDraggedOver()) {
				moveNodeBeeingDraggedIfDraggedOverSibblingNode(event);
			}
		}

		function aRepeatingElementHasBeenDraggedOver() {
			return lastRepeatingElementDraggedOver !== undefined;
		}

		function moveNodeBeeingDraggedIfDraggedOverSibblingNode(event) {
			if (isSibblingNodes(nodeBeeingDragged, lastRepeatingElementDraggedOver.getView())) {
				moveNodeBeeingDragged(event);
			}
		}

		function isSibblingNodes(node1, node2) {
			if (node1 === node2) {
				return false;
			}
			var sibblings = node1.parentNode.childNodes;
			var isSibblingFunction = function(key) {
				return sibblings[key] === node2;
			};
			var keys = Object.keys(sibblings);
			return keys.some(isSibblingFunction);
		}

		function moveNodeBeeingDragged(event) {
			event.stopPropagation();
			event.preventDefault();
			lastChangedWith = lastRepeatingElementDraggedOver;
			if (dragDirectionIsDown(event)) {
				addDragged = "after";
				nodeBeeingDragged.parentElement.insertBefore(nodeBeeingDragged,
						lastRepeatingElementDraggedOver.getView().nextSibling);
			} else {
				addDragged = "before";
				nodeBeeingDragged.parentElement.insertBefore(nodeBeeingDragged,
						lastRepeatingElementDraggedOver.getView());
			}
		}

		function dragDirectionIsDown(event) {
			var difY = event.screenY - beeingDraggedY;
			return difY > 0;
		}

		function dropHandler(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				event.stopPropagation();
				event.dataTransfer.dropEffect = "move";
			}
		}

		function dragendHandler(event) {
			event.preventDefault();
			if (childIsCurrentlyBeeingDragged) {
				handleDraggedElements(event);
			}
		}

		function handleDraggedElements(event) {
			event.stopPropagation();
			resetNodeBeeingDragged();
			possiblySendMoveMessage();
			resetDragSystem();
		}

		function resetNodeBeeingDragged() {
			var indexClassName = nodeBeeingDragged.className.indexOf(" beeingDragged");
			nodeBeeingDragged.className = nodeBeeingDragged.className.substring(0, indexClassName);
			nodeBeeingDragged.draggable = undefined;
		}

		function possiblySendMoveMessage() {
			if (nodesHasChangedPlace()) {
				sendMoveMessage();
			}
		}

		function nodesHasChangedPlace() {
			return lastChangedWith !== undefined;
		}

		function sendMoveMessage() {
			var data = {
				"moveChild" : nodeBeeingDragged.modelObject.getPath(),
				"basePositionOnChild" : lastChangedWith.getPath(),
				"newPosition" : addDragged
			};
			view.modelObject.childMoved(data);
		}

		function resetDragSystem() {
			nodeBeeingDragged = undefined;
			lastChangedWith = undefined;
			addDragged = undefined;
			beeingDraggedY = undefined;
			childIsCurrentlyBeeingDragged = false;
			lastRepeatingElementDraggedOver = undefined;
		}

		function addChild(child) {
			childrenView.appendChild(child);
		}

		function removeChild(child) {
			childrenView.removeChild(child);
		}

		function moveChild(dataFromMsg) {
			var childToMove = findRepeatingElementByPath(dataFromMsg.moveChild);
			var basePositionOnChild = findRepeatingElementByPath(dataFromMsg.basePositionOnChild);

			if (dataFromMsg.newPosition === "after") {
				childrenView.insertBefore(childToMove, basePositionOnChild.nextSibling);
			} else {
				childrenView.insertBefore(childToMove, basePositionOnChild);
			}
		}

		function findRepeatingElementByPath(pathToFind) {
			var repeatingElements = childrenView.childNodes;
			var jsonPathToFind = JSON.stringify(pathToFind);
			var childKeys = Object.keys(childrenView.childNodes);
			var foundKey = childKeys.find(function(repeatingElementKey) {
				var repeatingElement = repeatingElements[repeatingElementKey];
				var jsonPath = JSON.stringify(repeatingElement.modelObject.getPath());
				return jsonPathToFind === jsonPath;
			});
			return repeatingElements[foundKey];
		}

		function hideChildrensRemoveButton() {
			var repeatingElements = childrenView.childNodes;
			var repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject.hideRemoveButton();
			});
		}

		function showChildrensRemoveButton() {
			var repeatingElements = childrenView.childNodes;
			var repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject.showRemoveButton();
			});
		}

		function hideChildrensDragButton() {
			var repeatingElements = childrenView.childNodes;
			var repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject.hideDragButton();
			});
		}

		function showChildrensDragButton() {
			var repeatingElements = childrenView.childNodes;
			var repeatingElementsKeys = Object.keys(repeatingElements);
			repeatingElementsKeys.forEach(function(key) {
				repeatingElements[key].modelObject.showDragButton();
			});
		}

		var out = Object.freeze({
			getView : getView,
			setRepeatingElementDragOver : setRepeatingElementDragOver,
			addChild : addChild,
			removeChild : removeChild,
			moveChild : moveChild,
			hideChildrensRemoveButton : hideChildrensRemoveButton,
			showChildrensRemoveButton : showChildrensRemoveButton,
			hideChildrensDragButton : hideChildrensDragButton,
			showChildrensDragButton : showChildrensDragButton,
			dragstartHandler : dragstartHandler,
			dragoverHandler : dragoverHandler,
			dragenterHandler : dragenterHandler,
			dropHandler : dropHandler,
			dragendHandler : dragendHandler,
			hideButtonView : hideButtonView,
			showButtonView : showButtonView
		});
		view.viewObject = out;
		return out;
	};
	return cora;
}(CORA));