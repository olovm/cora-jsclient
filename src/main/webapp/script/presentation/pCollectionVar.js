/*
 * Copyright 2016 Uppsala University Library
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
	cora.pCollectionVar = function(spec) {
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		var presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		var cPresentationGroup = CORA.coraData(presentationGroup);
		var metadataId  = cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");

		var cMetadataElement = getMetadataById(metadataId);
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");

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

		var info = createInfo();
		var infoButton = info.getButton();
		view.appendChild(infoButton);

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pCollVar " + presentationId;
			return viewNew;
		}
		function createValueView() {
			if (mode === "input") {
				return createInput();
			}
			return createOutput();
		}

		function createInput() {
			return createCollectionInput();
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
			var outputNew = document.createElement("span");
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
			setValueForCollectionOutput(value);
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

		function onBlur() {
			updateView();
			if (valueHasChanged()) {
				var data = {
					"data" : valueView.value,
					"path" : path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueView.value;
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
			"type": "pCollVar",
			getView: getView,
			setValue: setValue,
			handleMsg: handleMsg,
			getText: getText,
			getDefText: getDefText,
			getState: getState,
			onBlur: onBlur,
			handleValidationError: handleValidationError
		});

		view.modelObject = out;
		if (mode === "input") {
			valueView.onblur = onBlur;
		}
		return out;
	};
	return cora;
}(CORA));