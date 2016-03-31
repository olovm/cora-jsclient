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
	cora.busy = function() {
		var view = createView();
		var hideIfTransitionendNotCalled;
		var beforeShowFunction;

		function createView() {
			var viewNew = document.createElement("div");
			viewNew.className = "busy hidden";
			return viewNew;
		}

		function getView() {
			return view;
		}

		function show() {
			if (beforeShowFunction) {
				beforeShowFunction();
			}
			view.className = "busy";
		}

		function hide() {
			clearHideTimeout();
			view.className = view.className + " hidden";
		}

		function clearHideTimeout() {
			if (hideIfTransitionendNotCalled) {
				window.clearTimeout(hideIfTransitionendNotCalled);
			}
		}

		function hideWithEffect() {
			hideIfTransitionendNotCalled = window.setTimeout(function() {
				view.modelObject.hide();
			}, 1000);
			view.addEventListener("transitionend", function() {
				view.modelObject.hide();
			}, true);
			view.className = view.className + " toBeRemoved";
		}

		/**
		 * addBeforeShowFunction gives the possibility to add a function to set the place of busy
		 * this can be something like function(){this.obj.appendChild(this.busy);} if the function
		 * is set, it is called before each show useful to always be last (or before a specific
		 * element) or add if in a container that gets cleared (widget.content)
		 */
		function addBeforeShowFunction(func) {
			beforeShowFunction = func;
		}

		var out = Object.freeze({
			getView : getView,
			show : show,
			hide : hide,
			hideWithEffect : hideWithEffect,
			addBeforeShowFunction : addBeforeShowFunction
		});
		view.modelObject = out;
		return out;
	};

	return cora;
}(CORA));