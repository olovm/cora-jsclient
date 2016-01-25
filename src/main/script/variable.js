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
	/**
	 * <pre>
	 * 	 function constructor(spec){
	 * 	 	let {member} = spec, 
	 * 	 		{other} = other_contstructor(spec),
	 * 	 		method = function (){
	 * 	 			//member, other, method, spec
	 * 	 		};
	 * 	 	return Object.freeze({
	 * 	 		method, 
	 * 	 		other,
	 * 	 	});
	 * 	 }
	 * 	
	 * </pre>
	 */
	

	cora.variable = function(spec) {
		// TODO: handle the following:
		/**
		 * <ol>
		 * <li>possibility to show description and definition for a variable</li>
		 * <li>first level of input control (regExp etc)</li>
		 * <li>telling metadataController (or similar) that a value has been changed by the user</li>
		 * <li>original value (to be able to indicate what values have changed, since last load and
		 * possibly revert them (add type (original, changed), to setValue information?))</li>
		 * <li></li>
		 * <li></li>
		 * </ol>
		 */
		var newPath = spec.newPath;
		var metadataId = spec.metadataId;
		var mode = spec.mode;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;

		var view = createBaseView();
		var htmlTag = createHtmlTag(mode);
		view.appendChild(htmlTag);
		// pubSub.subscribe("setValue", newPath, this, handleMsg);
		pubSub.subscribe("setValue", newPath, undefined, handleMsg);

		var cMetadataElement = getMetadataById(metadataId);
		// textId, defTextId, regEx (all in children)
		var textId = cMetadataElement.getFirstAtomicValueByNameInData("textId");
		var cTextElement = getMetadataById(textId);
		var attributes = {
			"name" : "attributes",
			"children" : [ {
				"name" : "attribute",
				"repeatId" : "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : "type"
				}, {
					"name" : "attributeValue",
					"value" : "default"
				} ]
			}, {
				"name" : "attribute",
				"repeatId" : "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : "lang"
				}, {
					"name" : "attributeValue",
					"value" : "sv"
				} ]
			} ]
		};
		var compactAttributes1 = [ {
			"name" : "type",
			"value" : "default"
		}, {
			"name" : "lang",
			"value" : "se"
		} ];
		var compactAttributes2 = [ {
			"type" : "default",
			"lang" : "se"
		} ];
		var textElement = cTextElement.getFirstChildByNameInDataAndAttributes("textPart",
				attributes);
		var cTextElement = new CORA.CoraData(textElement);
		var text = cTextElement.getFirstAtomicValueByNameInData("text");

		var defTextId = cMetadataElement.getFirstAtomicValueByNameInData("defTextId");
		var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");

		var htmlTag;

		function createBaseView() {
			var view = document.createElement("span");
			return view;
		}
		function createHtmlTag(viewMode) {
			if (viewMode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			var inputNew = document.createElement("input");
			inputNew.type = "text";
			htmlTag = inputNew;
			return inputNew;
		}
		function createOutput() {
			var outputNew = document.createElement("span");
			htmlTag = outputNew;
			return outputNew;
		}

		function getView() {
			return view;
		}

		function setValue(value) {
			if (mode === "input") {
				htmlTag.value = value;
			} else {
				htmlTag.textContent = value;
			}
		}

		function handleMsg(dataFromMsg, msg) {
			console.log("handleMsg: " + JSON.stringify(dataFromMsg));
			setValue(dataFromMsg.data);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		var out = Object.freeze({
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg
		});
		htmlTag.modelObject = out;
		return out;
	};
	return cora;
}(CORA || {}));