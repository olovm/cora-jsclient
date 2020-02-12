/*
 * Copyright 2016, 2018, 2020 Olov McKie
 * Copyright 2017 Uppsala University Library
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
	cora.holder = function(spec) {
		let status;
		let button;
		let view;

		const start = function() {
			button = createButton();
			view = createBaseView();
			close();
			addBaseViewAccordingToSpec();
		}
		
		const createButton = function() {
			let className = "iconButton";
			className += getClassNameFromSpec();
			let holderButtonSpec = {
				"className" : className,
				action : {
					method : toggleHolder
				},
				"text" : spec.buttonText
			};
			return CORA.gui.button(holderButtonSpec);
		}

		const getClassNameFromSpec = function() {
			if (spec.className !== undefined) {
				return " " + spec.className;
			}
			return "";
		}

		const toggleHolder = function(event) {
			if (status === cora.holder.OPEN) {
				close(event);
			} else {
				open(event);
			}
		}

		const open = function(event) {
			status = cora.holder.OPEN;
			view.style.display = view.previousDisplay;
			possiblyCallAfterOpenClose(event);
		}
		const possiblyCallAfterOpenClose = function(event) {
			if (spec.afterOpenClose !== undefined) {
				spec.afterOpenClose(event);
			}
		}
		const close = function(event) {
			status = cora.holder.CLOSED;
			if (view.style.display !== "none") {
				view.previousDisplay = view.style.display;
			}
			view.style.display = "none";
			possiblyCallAfterOpenClose(event);
		}

		const createBaseView = function() {
			return CORA.gui.createSpanWithClassName("holder" + getClassNameFromSpec());
		}

		const addBaseViewAccordingToSpec = function() {
			if (spec.appendTo !== undefined) {
				spec.appendTo.appendChild(view);
			}
			if (spec.insertAfter !== undefined) {
				spec.insertAfter.parentNode.insertBefore(view, spec.insertAfter.nextSibling);
			}
		}
		const getButton = function() {
			return button;
		}

		const getView = function() {
			return view;
		}

		const getStatus = function() {
			return status;
		}

		const getSpec = function() {
			return spec;
		}

		let out = Object.freeze({
			"type" : "holder",
			getSpec : getSpec,
			getButton : getButton,
			toggleHolder : toggleHolder,
			openHolder : open,
			closeHolder : close,
			getView : getView,
			getStatus : getStatus
		});
		start();
		return out;
	};
	cora.holder.CLOSED = 0;
	cora.holder.OPEN = 1;
	return cora;
}(CORA));