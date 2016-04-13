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
	cora.pRecordLink = function(spec) {
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
		var hasLinkedRepeatId = cMetadataElement.containsChildWithNameInData("linkedPath");

		var view = createBaseView();
		var originalClassName = view.className;
		var valueView = createValueView();
		view.appendChild(valueView);

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pRecordLink " + presentationId;
			return viewNew;
		}
		function createValueView() {
			var valueViewNew = document.createElement("span");
			valueViewNew.className = "valueView";

			if (mode === "input") {
				createAndAddInputs(valueViewNew);
			}
			// return createOutput();
			return valueViewNew;
		}

		function createAndAddInputs(valueView) {
			var recordIdViewNew = createRecordIdView();
			valueView.appendChild(recordIdViewNew);

			if (hasLinkedRepeatId) {
				var repeatIdViewNew = createRepeatIdView();
				valueView.appendChild(repeatIdViewNew);
			}
		}
		function createRecordIdView() {
			var recordIdViewNew = document.createElement("span");
			recordIdViewNew.className = "recordIdView";
			recordIdViewNew.appendChild(createText("linkedRecordIdText"));

			var childParentPath = calculateNewPath("linkedRecordIdTVar");
			var presentationIdToFactor = "linkedRecordIdPVar";
			var cPresentation = CORA.coraData(metadataProvider
					.getMetadataById(presentationIdToFactor));
			var pVar = spec.presentationFactory.factor(childParentPath, cPresentation);
			recordIdViewNew.appendChild(pVar.getView());
			return recordIdViewNew;
		}

		function createText(presRef) {
			var text = document.createElement("span");
			text.appendChild(document.createTextNode(textProvider.getTranslation(presRef)));
			text.className = "text";
			return text;
		}

		function calculateNewPath(metadataIdToAdd) {
			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"parentPath" : spec.path
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function createRepeatIdView() {
			var repeatIdViewNew = document.createElement("span");
			repeatIdViewNew.className = "repeatIdView";
			repeatIdViewNew.appendChild(createText("linkedRepeatIdText"));

			var childParentPath = calculateNewPath("linkedRepeatIdTVar");
			var presentationIdToFactor = "linkedRepeatIdPVar";
			var cPresentation = CORA.coraData(metadataProvider
					.getMetadataById(presentationIdToFactor));
			var pVar = spec.presentationFactory.factor(childParentPath, cPresentation);
			repeatIdViewNew.appendChild(pVar.getView());
			return repeatIdViewNew;
		}

		function getView() {
			return view;
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		var out = Object.freeze({
			"type" : "pRecordLink",
			getView : getView,
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));