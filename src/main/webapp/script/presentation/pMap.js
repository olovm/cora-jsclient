/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2018 Olov McKie
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
	cora.pMap = function(dependencies, spec) {
		var metadataProvider = dependencies.metadataProvider;
		var textProvider = dependencies.textProvider;

		var pMapView;
		var view;
		var cPresentation = spec.cPresentation;
		var presentationId;
		var metadataId = spec.metadataIdUsedInData;
		var cMetadataElement;
		var nameInData;
		var textId;
		var text;
		var defTextId;
		var defText;

		function start() {
			presentationId = getPresentationId();
			// view = createBaseViewHolder();

			cMetadataElement = getMetadataById(metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			var cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			var cDefTextGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);

			pMapView = createView();
			view = pMapView.getView();
			// addInfoToView();
		}

		function createView() {
			var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			var pMapViewSpec = {
				"mode" : mode,
				// "inputType" : getInputType(),
				// "outputFormat" : outputFormat,
				// "presentationId" : presentationId,
				"info" : {
					"text" : text,
					"defText" : defText,
					"technicalInfo" : [ {
						"text" : "textId: " + textId,
					// onclickMethod : openTextIdRecord
					}, {
						"text" : "defTextId: " + defTextId,
					// onclickMethod : openDefTextIdRecord
					}, {
						"text" : "metadataId: " + metadataId,
					// onclickMethod : openMetadataIdRecord
					}, {
						"text" : "nameInData: " + nameInData
					// }, {
					// "text" : "regEx: " + regEx
					}, {
						"text" : "presentationId: " + presentationId
					} ]
				}
			// ,
			// "onblurFunction" : onBlur,
			// onkeyupFunction : onkeyup
			};
			return dependencies.pMapViewFactory.factor(pMapViewSpec);

		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}
		// var cPresentation = spec.cPresentation;
		// var cParentPresentation = spec.cParentPresentation;
		//
		// var my = {};
		// my.metadataId = spec.metadataIdUsedInData;
		//
		// my.cPresentation = cPresentation;
		// my.cParentPresentation = cParentPresentation;
		// my.createBaseViewHolder = createBaseViewHolder;
		//
		// var parent = CORA.pMultipleChildren(dependencies, spec, my);
		// parent.init();
		//
		function getPresentationId() {
			var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		// function createBaseViewHolder() {
		// return CORA.gui.createSpanWithClassName("pMap " + presentationId);
		// }
		//
		// function addInfoToView() {
		// var createdInfo = createInfo();
		// view.appendChild(createdInfo.getButton());
		// }
		// function createInfo() {
		// var infoSpec = {
		// // "insertAfter" is set to infoButton below
		// // "afterLevelChange" : updateClassName,
		// "level1" : [ {
		// "className" : "textView",
		// "text" : text
		// }, {
		// "className" : "defTextView",
		// "text" : defText
		// } ],
		// "level2" : [ {
		// "className" : "textIdView",
		// "text" : "textId: " + textId
		// }, {
		// "className" : "defTextIdView",
		// "text" : "defTextId: " + defTextId
		// }, {
		// "className" : "metadataIdView",
		// "text" : "metadataId: " + metadataId
		// }, {
		// "className" : "technicalView",
		// "text" : "nameInData: " + nameInData
		// }, {
		// "className" : "technicalView",
		// "text" : "presentationId: " + presentationId
		// } ]
		// };
		// possiblyAddLevel2Info(infoSpec);

		// var newInfo = dependencies.infoFactory.factor(infoSpec);
		// // infoSpec.insertBefore = childrenView;
		// infoSpec.insertAfter = newInfo.getButton();
		// return newInfo;
		// }

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "pMap",
			getView : getView,
			getDependencies : getDependencies
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));