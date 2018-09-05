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

		var initCompleteSubscriptionId = "";

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

			cMetadataElement = getMetadataById(metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			var cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			var cDefTextGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);

			initCompleteSubscriptionId = dependencies.pubSub.subscribe("initComplete", {},
					undefined, initComplete);

			pMapView = createView();
			view = pMapView.getView();
		}

		function initComplete() {
			unsubscribeFromInitComplete();
			pMapView.startMap();
		}

		function unsubscribeFromInitComplete() {
			dependencies.pubSub.unsubscribe(initCompleteSubscriptionId);
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

		function getPresentationId() {
			var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "pMap",
			getView : getView,
			getDependencies : getDependencies,
			initComplete : initComplete
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));