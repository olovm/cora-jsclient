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
var CORA = (function(cora) {
	"use strict";
	cora.message = function(spec) {
		var timeout = getTimeoutFromSpecOrDefault();
		var view = createView();
		var messageText = createMessageText();
		view.appendChild(messageText);
		var hideTimeout = possiblySetHideTimeout();

		function getTimeoutFromSpecOrDefault() {
			return spec.timeout !== undefined ? spec.timeout : spec.type.defaultTimeout;
		}

		function createView() {
			var viewNew = document.createElement("div");
			viewNew.className = "message " + spec.type.className;
			return viewNew;
		}
		function createMessageText() {
			var textNew = document.createElement("div");
			textNew.className = "messageText";
			textNew.innerHTML = spec.message;
			return textNew;
		}

		function possiblySetHideTimeout() {
			var viewForCallFromOutside = view;
			var hideFunction = function() {
				viewForCallFromOutside.parentNode.removeChild(viewForCallFromOutside);
			}
			if (timeout > 0) {
				var timeoutToBeCalled = window.setTimeout(hideFunction, timeout);
			}
			return timeoutToBeCalled;
		}

		function getTimeout() {
			return timeout;
		}
		function getView() {
			return view;
		}
		function hide() {
			window.clearTimeout(hideTimeout);
			view.parentNode.removeChild(view);
		}
		function clearHideTimeout() {
			window.clearTimeout(hideTimeout);
		}
		function hideWithEffect() {
			console.log("hide")
			removeChild(view);
			view.className = view.className + " toBeRemoved";
			view.addEventListener("transitionend", function(event) {
				removeChild(view);
			}, true);

		}
		function removeChild(view) {
			// child.className = child.className + " toBeRemoved";
			// child.addEventListener("transitionend", function(event) {
			// console.log("propertyName:"+event.propertyName)
			// console.log("elapsedTime:"+event.elapsedTime)
			// if(event.propertyName === "opacity" && event.elapsedTime > 0.6){
			//					
			// removeChild2(child);
			// }
			// }, true);
			// childrenView.removeChild(child);
			view.style.display = "none";
		}
		function removeChild2(child) {
			childrenView.removeChild(child);
		}
		var out = Object.freeze({
			getTimeout : getTimeout,
			getView : getView,
			hide : hide,
			clearHideTimeout : clearHideTimeout
		});
		view.modelObject = out;
		return out;
	};

	cora.message.ERROR = {
		"className" : "error",
		"defaultTimeout" : 0
	};
	cora.message.WARNING = {
		"className" : "warning",
		"defaultTimeout" : 10000
	};
	cora.message.INFO = {
		"className" : "info",
		"defaultTimeout" : 5000
	};
	cora.message.POSITIVE = {
		"className" : "positive",
		"defaultTimeout" : 5000
	};
	return cora;
}(CORA));