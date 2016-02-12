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
			repeatingElement.draggable = "true";
//			repeatingElement.ondragstart = dragstartHandler;
//			repeatingElement.ondragover = dragoverHandler;
//			repeatingElement.ondrop = dropHandler;

			return repeatingElement;
		}
		function dragstartHandler(event) {
//			console.log("dragStart:" + JSON.stringify(path));
//			// console.log("event:"+JSON.stringify(event));
//			// console.log("event:"+event);
//			var source = event.target;
//			CORA.beeingDragged = event.target;
//			// source.parentElement.removeChild(source);
//			event.dataTransfer.setData("text/plain", JSON.stringify(source.modelObject.getPath()));
//			event.dataTransfer.setData("modelObject", {"test":"prova"});
//			event.dataTransfer.effectAllowed = "move";
//			source.style.opacity = ".5";
		}
		function dragoverHandler(event) {
////			console.log("dragOver:" + JSON.stringify(path));
//			console.log("target:" + JSON.stringify(event.target.modelObject.getPath()));
////			console.log("currentTarget:"
////					+ JSON.stringify(event.currentTarget.modelObject.getPath()));
//			// console.log("relatedTarget:"+JSON.stringify(event.relatedTarget.modelObject.getPath()));
////			console.log("dataTransfer:" + JSON.stringify(event.dataTransfer.getData("text/plain")));
////			var modelObject = event.dataTransfer.getData("modelObject");
////			 console.log("modelObject:"+JSON.stringify(modelObject.test));
//			// console.log()
//			// var source = event.source;
//			// var target = event.target;
//			// source.parentElement.insertAfter(source, target);
//
//			event.preventDefault();
//			event.dataTransfer.dropEffect = "move";
//			if (CORA.beeingDragged !== event.target) {
//				if (event.target !== event.target.parentElement.firstChild) {
//					CORA.beeingDragged.parentElement.insertBefore(CORA.beeingDragged, event.target.nextSibling);
//				}else{
//					CORA.beeingDragged.parentElement.insertBefore(CORA.beeingDragged, event.target);
//				}
//			}
		}

		function dropHandler(event) {
			console.log("buttonWiew drop:" + JSON.stringify(path));
//			event.preventDefault();
////			event.stopPropagation();
//			event.dataTransfer.dropEffect = "move";
//			CORA.beeingDragged.style.opacity = "1";
//			CORA.beeingDragged.parentElement.insertBefore(CORA.beeingDragged, event.target.nextSibling);
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
//			newButtonView.droppable = "true";
			view.appendChild(newButtonView);
//			newButtonView.ondrop = function(){
//				console.log("GGGGGGRRRRR222222222222   DROP");
//			};
//			newButtonView.ondragover = function(){
//				console.log("GGGGGGRRRRR22222222222 OVER");
//			};

			if (addRemoveButton()) {
				removeButton = createRemoveButton();
				newButtonView.appendChild(removeButton);
			}
			return newButtonView;
		}

		function createRemoveButton() {
			var createdRemoveButton = document.createElement("span");
//			createdRemoveButton.droppable = "true";

//			createdRemoveButton.ondrop = function(){
//				console.log("GGGGGGRRRRR DROP");
//			};
//			createdRemoveButton.ondragover = function(){
//				console.log("GGGGGGRRRRR OVER");
//			};
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
			presentationMaximized.className = presentationMaximized.className + " maximized";
			view.insertBefore(presentationMaximized, buttonView);
		}

		function addPresentationMinimized(presentationMinimizedIn, minimizedDefault) {
			presentationMinimized = presentationMinimizedIn.getView();
			presentationMinimized.className = presentationMinimized.className + " minimized";
			view.insertBefore(presentationMinimized, buttonView);
			createMinimizeMaximizeButtons();
			toggleMinimizedShown(minimizedDefault);
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

		function getPath() {
			return path;
		}

		var out = Object.freeze({
			"type" : "pRepeatingElement",
			getView : getView,
			addPresentation : addPresentation,
			addPresentationMinimized : addPresentationMinimized,
			hideRemoveButton : hideRemoveButton,
			showRemoveButton : showRemoveButton,
			getPath : getPath
		});

		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));