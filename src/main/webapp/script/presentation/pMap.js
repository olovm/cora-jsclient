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
		var pubSub = dependencies.pubSub;

		var path = spec.path;

		var mapStarted = false;
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

			subscribeToMessagesForMap();

			pMapView = createView();
			view = pMapView.getView();
		}

		function subscribeToMessagesForMap() {
			subscribeToInitCompleteMessageForStartup();
			subscribeToSetValueForCoordinatesValues();
		}

		function subscribeToInitCompleteMessageForStartup() {
			initCompleteSubscriptionId = pubSub.subscribe("initComplete", {}, undefined,
					initComplete);
		}

		function subscribeToSetValueForCoordinatesValues() {
			var cChildReferences = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("childReferences"));
			var childReferences = cChildReferences.getChildrenByNameInData("childReference");
			childReferences.forEach(subscribeToSetValueIfLatitudeOrLongitude);
		}

		function getIdFromChildReference(childReference) {
			var cChildReference = CORA.coraData(childReference);
			var cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			return cRef.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function getNameInDataForChildId(idOfChildToOurGroup) {
			var cMetadataForChild = getMetadataById(idOfChildToOurGroup);
			return cMetadataForChild.getFirstAtomicValueByNameInData("nameInData");
		}

		function subscribeToSetValueIfLatitudeOrLongitude(childReference) {
			var idOfChildToOurGroup = getIdFromChildReference(childReference);
			var nameInDataForChild = getNameInDataForChildId(idOfChildToOurGroup);

			if ("longitude" === nameInDataForChild) {
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
						handleSetValueLongitude);
			}

			if ("latitude" === nameInDataForChild) {
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
						handleSetValueLatitude);
			}
		}

		function subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
				methodToCall) {
			var childPath = calculateNewPathForMetadataIdUsingParentPath(idOfChildToOurGroup, path);
			pubSub.subscribe("setValue", childPath, undefined, methodToCall);
		}

		function calculateNewPathForMetadataIdUsingParentPath(metadataIdToAdd, parentPath) {
			var pathSpec = {
				"metadataProvider" : dependencies.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"parentPath" : parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function initComplete() {
			if (!mapStarted) {
				mapStarted = true;
				unsubscribeFromInitComplete();
				pMapView.startMap();
				possiblySetMarkerInView();
			}
		}

		var longitudeValue = "";
		var latitudeValue = "";
		function handleSetValueLongitude(dataFromMsg) {
			console.log("longitudeData:", dataFromMsg.data);
			longitudeValue = dataFromMsg.data;
			possiblySetMarkerInView();
		}
		function handleSetValueLatitude(dataFromMsg) {
			console.log("latitudeData:", dataFromMsg.data);
			latitudeValue = dataFromMsg.data;
			possiblySetMarkerInView();
		}
		var markerActive = false;
		function possiblySetMarkerInView() {
			if (mapStarted) {
				if (longitudeValue !== "" && latitudeValue !== "") {
					pMapView.setMarker(latitudeValue, longitudeValue);
					markerActive = true;
				} else if (markerActive) {
					pMapView.removeMarker();
				}
			}
		}
		// function setValue(value) {
		// state = "ok";
		// previousValue = value;
		// pVarView.setValue(value);
		// }
		//
		// function handleMsg(dataFromMsg) {
		// setValue(dataFromMsg.data);
		// updateView();
		// }

		function unsubscribeFromInitComplete() {
			pubSub.unsubscribe(initCompleteSubscriptionId);
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
			initComplete : initComplete,
			handleSetValueLongitude : handleSetValueLongitude,
			handleSetValueLatitude : handleSetValueLatitude
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));