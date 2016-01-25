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
	cora.variable = function(spec) {
		// TODO: handle the following:
		/**
		 * <ol>
		 * <li>first level of input control (regExp etc)</li>
		 * <li>telling metadataController (or similar) that a value has been
		 * changed by the user</li>
		 * <li>original value (to be able to indicate what values have changed,
		 * since last load and possibly revert them (add type (original,
		 * changed), to setValue information?))</li>
		 * <li></li>
		 * <li></li>
		 * </ol>
		 */
		var newPath = spec.newPath;
		var metadataId = spec.metadataId;
		var mode = spec.mode;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;

		var view = createBaseView();
		var valueView = createValueView(mode);
		view.appendChild(valueView);
		pubSub.subscribe("setValue", newPath, undefined, handleMsg);

		var cMetadataElement = getMetadataById(metadataId);
		// textId, defTextId, regEx (all in children)
		var textId = cMetadataElement.getFirstAtomicValueByNameInData("textId");
		var text = textProvider.getTranslation(textId);

		var defTextId = cMetadataElement.getFirstAtomicValueByNameInData("defTextId");
		var defText = textProvider.getTranslation(defTextId);

		var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");

		function createBaseView() {
			return document.createElement("span");
		}
		function createValueView(viewMode) {
			if (viewMode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			var inputNew = document.createElement("input");
			inputNew.type = "text";
			valueView = inputNew;
			return inputNew;
		}

		function createOutput() {
			var outputNew = document.createElement("span");
			valueView = outputNew;
			return outputNew;
		}

		function getView() {
			return view;
		}

		function setValue(value) {
			if (mode === "input") {
				valueView.value = value;
			} else {
				valueView.textContent = value;
			}
		}

		function handleMsg(dataFromMsg) {
			setValue(dataFromMsg.data);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function getText() {
			return text;
		}

		function getDefText() {
			return defText;
		}

		function getRegEx() {
			return regEx;
		}
		
		function onBlur(){
			//check against regEx
			//update view (remove/add error/warning)
			//tell metadataController, new value
			
		}
		
		var out = Object.freeze({
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getRegEx : getRegEx
		});
		view.modelObject = out;
		if (mode === "input") {
			valueView.onBlur = onBlur;
		}
		return out;
	};
	return cora;
}(CORA || {}));