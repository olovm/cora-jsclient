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
		var longitudeValue = "";
		var latitudeValue = "";
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
		var longitudePath;
		var latitudePath;
		var markerActive = false;

		function start() {
			presentationId = getPresentationId();

			cMetadataElement = getMetadataById(metadataId);
			nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

			getTextInfoFromMetadata();
			subscribeToMessagesForMap();

			createView();

		}

		function getTextInfoFromMetadata() {
			var cTextGroup = CORA.coraData(cMetadataElement.getFirstChildByNameInData("textId"));
			textId = cTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			text = textProvider.getTranslation(textId);

			var cDefTextGroup = CORA.coraData(cMetadataElement
					.getFirstChildByNameInData("defTextId"));
			defTextId = cDefTextGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			defText = textProvider.getTranslation(defTextId);

		}

		function subscribeToMessagesForMap() {
			subscribeToInitCompleteMessageForStartup();
			subscribeToSetValueForCoordinatesValues();
			subscribeToViewJustMadeVisibleForStartup();
			subscribeTopresentationShownForStartup();
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

		function subscribeToViewJustMadeVisibleForStartup() {
			pubSub.subscribe("viewJustMadeVisible", {}, undefined, viewJustMadeVisible);
		}
		function subscribeTopresentationShownForStartup() {
			pubSub.subscribe("presentationShown", {}, undefined, viewJustMadeVisible);
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
				longitudePath = calculateNewPathForMetadataIdUsingParentPath(idOfChildToOurGroup,
						path);
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
						handleSetValueLongitude, longitudePath);
			}

			if ("latitude" === nameInDataForChild) {
				latitudePath = calculateNewPathForMetadataIdUsingParentPath(idOfChildToOurGroup,
						path);
				subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
						handleSetValueLatitude, latitudePath);
			}
		}

		function subscribeToSetValueForIdOfChildWithFunctionToCall(idOfChildToOurGroup,
				methodToCall, childPath) {
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

		var initCompleteHasBeenCalled = false;

		function initComplete() {
			initCompleteHasBeenCalled = true;
			if (mapNotStarted() && viewIsCurrentlyVisible()) {
				unsubscribeFromInitComplete();
				startMap();
			}
		}

		function viewIsCurrentlyVisible() {
			return view.offsetHeight > 0;
		}

		function viewJustMadeVisible() {
			if (mapNotStarted() && initCompleteHasBeenCalled && viewIsCurrentlyVisible()) {
				startMap();
			}
		}

		function mapNotStarted() {
			return !mapStarted;
		}

		function startMap() {
			mapStarted = true;
			pMapView.startMap();
			possiblyHandleMarkerInView();
		}

		function handleSetValueLongitude(dataFromMsg) {
			longitudeValue = dataFromMsg.data;
			possiblyHandleMarkerInView();
		}

		function handleSetValueLatitude(dataFromMsg) {
			latitudeValue = dataFromMsg.data;
			possiblyHandleMarkerInView();
		}

		function possiblyHandleMarkerInView() {
			if (mapStarted) {
				handleMarkerInView();
			}
		}

		function handleMarkerInView() {
			if (enoughDataToPlaceMarker()) {
				setMarkerInView();
			} else {
				possiblyRemoveMarker();
			}
		}

		function enoughDataToPlaceMarker() {
			return longitudeValue !== "" && latitudeValue !== "";
		}

		function setMarkerInView() {
			pMapView.setMarker(latitudeValue, longitudeValue);
			markerActive = true;
		}

		function possiblyRemoveMarker() {
			if (markerActive) {
				pMapView.removeMarker();
				markerActive = false;
			}
		}

		function unsubscribeFromInitComplete() {
			pubSub.unsubscribe(initCompleteSubscriptionId);
		}

		function createView() {
			var mode = cPresentation.getFirstAtomicValueByNameInData("mode");
			var pMapViewSpec = {
				"mode" : mode,
				"info" : {
					"text" : text,
					"defText" : defText,
					"technicalInfo" : [ {
						"text" : "textId: " + textId
					}, {
						"text" : "defTextId: " + defTextId
					}, {
						"text" : "metadataId: " + metadataId
					}, {
						"text" : "nameInData: " + nameInData
					}, {
						"text" : "presentationId: " + presentationId
					} ]
				},
				setLatLngMethod : publishLatLngValues
			};
			pMapView = dependencies.pMapViewFactory.factor(pMapViewSpec);
			view = pMapView.getView();
		}

		function publishLatLngValues(lat, lng) {
			var latitudeData = {
				"data" : lat,
				"path" : latitudePath
			};
			pubSub.publish("setValue", latitudeData);

			var longitudeData = {
				"data" : lng,
				"path" : longitudePath
			};
			pubSub.publish("setValue", longitudeData);
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
			handleSetValueLatitude : handleSetValueLatitude,
			publishLatLngValues : publishLatLngValues,
			viewJustMadeVisible : viewJustMadeVisible
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));