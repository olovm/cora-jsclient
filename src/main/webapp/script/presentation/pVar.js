/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.pVar = function(dependencies, spec) {
		var metadataProvider = dependencies.metadataProvider;
		var pubSub = dependencies.pubSub;
		var textProvider = dependencies.textProvider;
		var jsBookkeeper = dependencies.jsBookkeeper;
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = spec.metadataIdUsedInData;

		var cMetadataElement = getMetadataById(metadataId);

		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
		var outputFormat = getOutputFormat();

		var textId = getTextId(cMetadataElement, "textId");
		var text = textProvider.getTranslation(textId);

		var defTextId = getTextId(cMetadataElement, "defTextId");
		var defText = textProvider.getTranslation(defTextId);

		var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

		var pVarViewSpec = {
			"mode" : mode,
			"inputType" : getInputType(),
			"outputFormat" : outputFormat,
			"presentationId" : presentationId,
			"info" : {
				"text" : text,
				"defText" : defText,
				"technicalInfo" : [ "textId: " + textId, "defTextId: " + defTextId,
						"metadataId: " + metadataId, "nameInData: " + nameInData,
						"regEx: " + regEx, "presentationId: " + presentationId ]
			},
			"onblurFunction" : onBlur
		};

		if (cPresentation.containsChildWithNameInData("emptyTextId")) {
			var cEmptyTextId = CORA.coraData(cPresentation.getFirstChildByNameInData("emptyTextId"));
			var emptyTextId = cEmptyTextId.getFirstAtomicValueByNameInData("linkedRecordId");
			var emptyText = textProvider.getTranslation(emptyTextId);
			pVarViewSpec.placeholderText = emptyText;
		}
		var pVarView = dependencies.pVarViewFactory.factor(pVarViewSpec);

		var state = "ok";
		var previousValue = "";
		pubSub.subscribe("setValue", path, undefined, handleMsg);
		pubSub.subscribe("validationError", path, undefined, handleValidationError);

		function getOutputFormat() {
			if (cPresentation.containsChildWithNameInData("outputFormat")) {
				return cPresentation.getFirstAtomicValueByNameInData("outputFormat");
			}
			return "text";
		}

		function getInputType() {
			if (cPresentation.containsChildWithNameInData("inputType")) {
				return cPresentation.getFirstAtomicValueByNameInData("inputType");
			}
			return "input";
		}

		function getTextId(cMetadataElementIn, textNameInData){
			var cTextGroup = CORA.coraData(cMetadataElementIn.getFirstChildByNameInData(textNameInData));
			return cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getView() {
			return pVarView.getView();
		}

		function setValue(value) {
			state = "ok";
			previousValue = value;
			pVarView.setValue(value);
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

		function onBlur(valueFromView) {
			checkRegEx(valueFromView);
			updateView();
			if (state === "ok" && valueHasChanged(valueFromView)) {
				var data = {
					"data" : valueFromView,
					"path" : path
				};
				jsBookkeeper.setValue(data);
				previousValue = valueFromView;
			}
		}

		function checkRegEx(valueFromView) {
			var value = valueFromView;
			if (value.length === 0 || new RegExp(regEx).test(value)) {
				state = "ok";
			} else {
				state = "error";
			}
		}

		function updateView() {
			pVarView.setState(state);
		}

		function valueHasChanged(valueFromView) {
			return valueFromView !== previousValue;
		}

		function getState() {
			return state;
		}

		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			"type" : "pVar",
			getSpec : getSpec,
			getView : getView,
			setValue : setValue,
			handleMsg : handleMsg,
			getText : getText,
			getDefText : getDefText,
			getRegEx : getRegEx,
			getState : getState,
			onBlur : onBlur,
			handleValidationError : handleValidationError
		});

		return out;
	};
	return cora;
}(CORA));