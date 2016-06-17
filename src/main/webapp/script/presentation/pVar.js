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
	cora.pVar = function(spec) {
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);
		var subType = cMetadataElement.getData().attributes.type;
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var outputFormat = getOutputFormat();

		var view = createBaseView();
		var originalClassName = view.className;
		var valueView = createValueView();
		view.appendChild(valueView);


		var state = "ok";
		var previousValue = "";
		pubSub.subscribe("setValue", path, undefined, handleMsg);
		pubSub.subscribe("validationError", path, undefined, handleValidationError);

		var textId = cMetadataElement.getFirstAtomicValueByNameInData("textId");
		var text = textProvider.getTranslation(textId);

		var defTextId = cMetadataElement.getFirstAtomicValueByNameInData("defTextId");
		var defText = textProvider.getTranslation(defTextId);

		if (subType === "textVariable") {
			var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
		}
		
		var info = createInfo();
		var infoButton = info.getButton();
		view.appendChild(infoButton);

		function getOutputFormat() {
			if (cPresentation.containsChildWithNameInData("outputFormat")) {
				return cPresentation.getFirstAtomicValueByNameInData("outputFormat");
			}
			return "text";
		}

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pVar " + presentationId;
			return viewNew;
		}
		function createValueView() {
			if (mode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			if (subType === "textVariable") {
				return createTextInput();
			}
			return createCollectionInput();
		}

		function createTextInput() {
			var inputNew;
			if (isTextArea()) {
				inputNew = document.createElement("textarea");
			} else {
				inputNew = createTextTypeInput(inputNew);
				possiblyAddPlaceholderText(inputNew);
			}
			return inputNew;
		}

		function isTextArea(){
			var inputType;
			if(cPresentation.containsChildWithNameInData("inputType")){
				inputType = cPresentation.getFirstAtomicValueByNameInData("inputType");
			}
			return inputType === "textarea";
		}

		function createTextTypeInput(inputNew){
			inputNew = document.createElement("input");
			inputNew.type = "text";
			return inputNew;
		}

		function possiblyAddPlaceholderText(inputNew){
			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				var emptyTextId = cPresentation.getFirstAtomicValueByNameInData("emptyTextId");
				var emptyText = textProvider.getTranslation(emptyTextId);
				inputNew.placeholder = emptyText;
			}
		}

		function createCollectionInput() {
			var inputNew = document.createElement("select");

			if (cPresentation.containsChildWithNameInData("emptyTextId")) {
				var emptyTextId = cPresentation.getFirstAtomicValueByNameInData("emptyTextId");
				var optionText = textProvider.getTranslation(emptyTextId);
				var emptyTextOption = new Option(optionText, "");
				inputNew.appendChild(emptyTextOption);
				inputNew.value = "";
			}

			var collectionItemReferencesChildren = getCollectionItemReferencesChildren();

			collectionItemReferencesChildren.forEach(function(ref) {
				var option = createOptionForRef(ref);
				inputNew.appendChild(option);
			});
			return inputNew;
		}

		function getCollectionItemReferencesChildren() {
			var refCollectionId = cMetadataElement
					.getFirstAtomicValueByNameInData("refCollectionId");
			var cMetadataCollection = getMetadataById(refCollectionId);
			var collectionItemReferences = cMetadataCollection
					.getFirstChildByNameInData("collectionItemReferences");
			return collectionItemReferences.children;
		}

		function createOptionForRef(ref) {
			var item = getMetadataById(ref.value);
			var value = item.getFirstAtomicValueByNameInData("nameInData");
			var optionText = textProvider.getTranslation(item
					.getFirstAtomicValueByNameInData("textId"));
			return new Option(optionText, value);
		}

		function createOutput() {
			if ("image" === outputFormat) {
				return createOutputForImage();
			}
			var outputNew = document.createElement("span");
			return outputNew;
		}

		function createOutputForImage() {
			var outputNew = document.createElement("img");
			return outputNew;
		}
		function createInfo() {
			var infoSpec = {
				"appendTo" : view,
				"afterLevelChange": updateView,
				"level1" : [ {
					"className" : "textView",
					"text" : text
				}, {
					"className" : "defTextView",
					"text" : defText
				} ],
				"level2" : [ {
					"className" : "textIdView",
					"text" : "textId: " + textId
				}, {
					"className" : "defTextIdView",
					"text" : "defTextId: " + defTextId
				}, {
					"className" : "metadataIdView",
					"text" : "metadataId: " + metadataId
				} ]
			};
			if (subType === "textVariable") {
				infoSpec.level2.push({
					"className" : "regExView",
					"text" : "regEx: " + regEx
				});
			}
			var newInfo = CORA.info(infoSpec);
			return newInfo;
		}

		function getView() {
			return view;
		}

		function setValue(value) {
			state = "ok";
			previousValue = value;
			if (mode === "input") {
				valueView.value = value;
			} else {
				setValueForOutput(value);
			}
		}

		function setValueForOutput(value) {
			if (subType === "textVariable") {
				setValueForTextOutput(value);
			}
			if (subType === "collectionVariable") {
				setValueForCollectionOutput(value);
			}
		}

		function setValueForTextOutput(value) {
			if ("image" === outputFormat) {
				setValueForTextOutputImage(value);
			} else {
				setValueForTextOutputText(value);
			}
		}

		function setValueForTextOutputImage(value) {
			valueView.src = value;
		}

		function setValueForTextOutputText(value) {
			valueView.textContent = value;
		}

		function setValueForCollectionOutput(value) {
			if (value === "") {
				valueView.textContent = "";
			} else {
				setOutputValueFromItemReference(value);
			}
		}

		function findItemReferenceForValue(value) {
			var collectionItemReferencesChildren = getCollectionItemReferencesChildren();
			var itemReference = collectionItemReferencesChildren.find(function(ref) {
				var item = getMetadataById(ref.value);
				var refValue = item.getFirstAtomicValueByNameInData("nameInData");
				return refValue === value;
			});
			return itemReference;
		}

		function setOutputValueFromItemReference(value) {
			var itemReference = findItemReferenceForValue(value);
			var item = getMetadataById(itemReference.value);
			var outputText = textProvider.getTranslation(item
					.getFirstAtomicValueByNameInData("textId"));
			valueView.textContent = outputText;
		}

		function handleMsg(dataFromMsg) {
			setValue(dataFromMsg.data);
			updateView();
		}

		function handleValidationError() {
			state = "error";
			updateView();
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
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

		function onBlur() {
			checkRegEx();
			updateView();
			if (state === "ok" && valueHasChanged()) {
				var data = {
					"data" : valueView.value,
					"path" : path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueView.value;
			}
		}

		function checkRegEx() {
			var value = valueView.value;
			if (value.length === 0 || new RegExp(regEx).test(value)) {
				state = "ok";
			} else {
				state = "error";
			}
		}

		function updateView() {
			var className = originalClassName;
			if (state === "error") {
				className += " error";
			}
			if (info.getInfoLevel() !== 0) {
				className += " infoActive";
			}
			view.className = className;
		}

		function valueHasChanged() {
			if (valueView.value !== previousValue) {
				return true;
			}
			return false;
		}

		function getState() {
			return state;
		}

		var out = Object.freeze({
			"type" : "pVar",
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getRegEx : getRegEx,
			getState : getState,
			onBlur : onBlur,
			handleValidationError : handleValidationError,
		});
		
		view.modelObject = out;
		if (mode === "input") {
			valueView.onblur = onBlur;
		}
		return out;
	};
	return cora;
}(CORA));