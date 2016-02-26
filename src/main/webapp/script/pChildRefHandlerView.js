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
		view.appendChild(childrenView);
		if(spec.addMethod!==undefined){
			createButtonView();
		}
		
		var buttonView;

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pChildRefHandler " + spec.presentationId;
			return viewNew;
		}

		function getView() {
			return view;
		}

		function createButtonView() {
			var buttonViewNew = document.createElement("span");
			buttonViewNew.className = "buttonView";
			buttonViewNew.appendChild(createAddButton());
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
		
		function hideButtonView() {
			buttonView.styleOriginal = buttonView.style.display;
			buttonView.style.display = "none";
		}

		function showButtonView() {
			buttonView.style.display = buttonView.styleOriginal;
		}

		function setRepeatingElementDragOver(repeatingElement) {
			repeatingElementDragOver = repeatingElement;
		}
		function createChildrenView() {
			var childrenViewNew = document.createElement("span");
			childrenViewNew.className = "childrenView";

			// dragging
			childrenViewNew.ondragstart = dragstartHandler;
			childrenViewNew.ondragover = dragoverHandler;
			childrenViewNew.ondragenter = dragenterHandler;
			childrenViewNew.ondrop = dropHandler;
			childrenViewNew.ondragend = dragendHandler;

			return childrenViewNew;
		}

		var beeingDragged;
		var lastChangedWith;
		var addDragged;

		var beeingDraggedY;
		var dragging = false;

		var repeatingElementDragOver;

		function dragstartHandler(event) {
			event.stopPropagation();
			dragging = true;
			beeingDragged = event.target;
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
			if (dragging) {
				var lastDraggedOver = repeatingElementDragOver !== undefined ? repeatingElementDragOver
						.getView()
						: "";
				var isSibblings = isSibblingNodes(beeingDragged, lastDraggedOver);
				if (isSibblings) {
					event.stopPropagation();
					event.preventDefault();
					var difY = event.screenY - beeingDraggedY;
					beeingDraggedY = event.screenY;
					lastChangedWith = repeatingElementDragOver;
					if (difY > 0) {
						addDragged = "after";
						beeingDragged.parentElement.insertBefore(beeingDragged,
								repeatingElementDragOver.getView().nextSibling);
					} else {
						addDragged = "before";
						beeingDragged.parentElement.insertBefore(beeingDragged,
								repeatingElementDragOver.getView());
					}
				}
			}
		}
		function isSibblingNodes(node1, node2) {
			if (node1 === node2) {
				return false;
			}
			var sibblings = node1.parentNode.childNodes;
			var keys = Object.keys(sibblings);

			return keys.some(function(key) {
				return sibblings[key] === node2;
			});
		}

		function dropHandler(event) {
			event.preventDefault();
			if (dragging) {
				event.stopPropagation();
				event.dataTransfer.dropEffect = "move";
			}
		}

		function dragendHandler(event) {
			event.preventDefault();
			if (dragging) {
				event.stopPropagation();
				var indexClassName = beeingDragged.className.indexOf(" beeingDragged");
				beeingDragged.className = beeingDragged.className.substring(0, indexClassName);
				beeingDragged.draggable = undefined;
				dragging = false;
				if (lastChangedWith !== undefined) {
					var data = {
						"moveChild" : beeingDragged.modelObject.getPath(),
						"basePositionOnChild" : lastChangedWith.getPath(),
						"newPosition" : addDragged
					};
					view.modelObject.childMoved(data);

					beeingDragged = undefined;
					lastChangedWith = undefined;
					addDragged = undefined;
					beeingDraggedY = undefined;
					dragging = false;
					repeatingElementDragOver = undefined;
				}
			}
		}
		function addChild(child) {
			childrenView.appendChild(child);
		}
		function removeChild(child) {
			childrenView.removeChild(child);
		}
		function moveChild(dataFromMsg) {
			var repeatingElements = childrenView.childNodes;
			var moveChild;
			var basePositionOnChild;
			var childKeys = Object.keys(repeatingElements);
			childKeys.forEach(function(repeatingElementKey) {
				var repeatingElement = repeatingElements[repeatingElementKey];
				if (JSON.stringify(dataFromMsg.moveChild) === JSON
						.stringify(repeatingElement.modelObject.getPath())) {
					moveChild = repeatingElement;
				}
				if (JSON.stringify(dataFromMsg.basePositionOnChild) === JSON
						.stringify(repeatingElement.modelObject.getPath())) {
					basePositionOnChild = repeatingElement;
				}
			});

			if (dataFromMsg.newPosition === "after") {
				childrenView.insertBefore(moveChild, basePositionOnChild.nextSibling);
			} else {
				childrenView.insertBefore(moveChild, basePositionOnChild);
			}
		}
		function hideChildrensRemoveButton() {
			var repeatingElements = childrenView.childNodes;
			var length = repeatingElements.length;
			for (var i = 0; i < length; i++) {
				repeatingElements[i].modelObject.hideRemoveButton();
			}
		}

		function showChildrensRemoveButton() {
			var repeatingElements = childrenView.childNodes;
			var length = repeatingElements.length;
			for (var i = 0; i < length; i++) {
				repeatingElements[i].modelObject.showRemoveButton();
			}
		}
		var out = Object.freeze({
			getView : getView,
			setRepeatingElementDragOver : setRepeatingElementDragOver,
			addChild : addChild,
			removeChild : removeChild,
			moveChild : moveChild,
			hideChildrensRemoveButton : hideChildrensRemoveButton,
			showChildrensRemoveButton : showChildrensRemoveButton,
			dragstartHandler : dragstartHandler,
			dragoverHandler : dragoverHandler,
			dragenterHandler : dragenterHandler,
			dropHandler : dropHandler,
			dragendHandler : dragendHandler,
//			createButtonView : createButtonView,
			hideButtonView : hideButtonView,
			showButtonView : showButtonView
		});
		view.viewObject = out;
		return out;
	};
	return cora;
}(CORA));