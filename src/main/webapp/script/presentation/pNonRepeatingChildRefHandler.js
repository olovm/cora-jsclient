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
	cora.pNonRepeatingChildRefHandler = function(dependencies, spec) {
		var view;
		var topLevelMetadataIds = {};
		var storedValuePositions = {};

		function start() {
			createView();
			calculateHandledTopLevelMetadataIds(spec.cPresentation);
			subscribeToAddMessagesForParentPath();
			var factoredPresentation = factorPresentation(spec.cPresentation);
			view.addChild(factoredPresentation.getView());
			possiblyAddAlternativePresentation();
			view.setHasDataStyle(false);
			if (spec.mode === "input") {
				view.showContent();
			} else {
				view.hideContent();
			}
		}

		function createView() {
			var viewSpec = {
				presentationId : findPresentationId(spec.cPresentation),
				textStyle : spec.textStyle,
				childStyle : spec.childStyle,
				"callOnFirstShowOfAlternativePresentation" : publishPresentationShown
			};
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor(viewSpec);
		}

		function publishPresentationShown() {
			dependencies.pubSub.publish("presentationShown", {
				"data" : "",
				"path" : {}
			});
		}

		function findPresentationId(cPresentation) {
			var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function calculateHandledTopLevelMetadataIds(cPresentation) {
			var cPresentationsOf = CORA.coraData(cPresentation
					.getFirstChildByNameInData("presentationsOf"));
			var listPresentationOf = cPresentationsOf.getChildrenByNameInData("presentationOf");
			listPresentationOf.forEach(function(child) {
				var presentationOfId = CORA.coraData(child).getFirstAtomicValueByNameInData(
						"linkedRecordId");
				topLevelMetadataIds[presentationOfId] = "exists";
			});
		}

		function factorPresentation(cPresentation) {
			var presentationSpec = {
				path : spec.parentPath,
				metadataIdUsedInData : spec.parentMetadataId,
				cPresentation : cPresentation,
				cParentPresentation : spec.cParentPresentation
			};
			return dependencies.presentationFactory.factor(presentationSpec);
		}

		function subscribeToAddMessagesForParentPath() {
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, subscribeMsg);
		}

		function subscribeMsg(dataFromMsg) {
			if (messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg)) {
				var newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
						dataFromMsg.metadataId, dataFromMsg.repeatId, spec.parentPath);
				dependencies.pubSub
						.subscribe("*", newPath, undefined, handleMsgToDeterminDataState);
			}
		}

		function messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg) {
			return topLevelMetadataIds[dataFromMsg.metadataId] !== undefined;
		}

		function calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd, repeatId,
				parentPath) {
			var pathSpec = {
				"metadataProvider" : dependencies.providers.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
		}

		function handleMsgToDeterminDataState(dataFromMsg, msg) {
			var msgAsArray = msg.split("/");
			var msgType = msgAsArray.pop();
			if (msgType === "setValue") {
				handleNewValue(dataFromMsg, msgAsArray);
			}
			if (msgType === "remove") {
				removeAndSetState(msgAsArray);
			}
		}

		function handleNewValue(dataFromMsg, msgAsArray) {
			if (dataFromMsg.data !== "") {
				updateViewForData();
				findOrAddPathToStored(msgAsArray);
			} else {
				removeAndSetState(msgAsArray);
			}
		}

		function updateViewForData() {
			view.setHasDataStyle(true);
			if (isInOutputMode()) {
				view.showContent();
				publishPresentationShown();
			}
		}

		function isInOutputMode() {
			return spec.mode === "output";
		}

		function removeAndSetState(msgAsArray) {
			removeValuePosition(msgAsArray);
			if (noValuesExistForPresentedData()) {
				updateViewForNoData();
			}
		}

		function removeValuePosition(pathAsArray) {
			var currentPartOfStoredValuePositions = findOrAddPathToStored(pathAsArray);
			removeFromBottom(currentPartOfStoredValuePositions);
		}

		function removeFromBottom(currentPartOfStoredValuePositions) {
			var parent = currentPartOfStoredValuePositions.getParent();
			delete parent[currentPartOfStoredValuePositions.name];
			if (parentContainsNoValues(parent)) {
				removeFromBottom(parent);
			}
		}

		function parentContainsNoValues(parent) {
			return Object.keys(parent).length == 2;
		}

		function noValuesExistForPresentedData() {
			return Object.keys(storedValuePositions).length === 0;
		}

		function updateViewForNoData() {
			view.setHasDataStyle(false);
			if (isInOutputMode()) {
				view.hideContent();
			}
		}

		function findOrAddPathToStored(pathAsArray) {
			var currentPartOfStoredValuePositions = storedValuePositions;
			for (var i = 0; i < pathAsArray.length; i++) {
				currentPartOfStoredValuePositions = returnOrCreatePathPart(
						currentPartOfStoredValuePositions, pathAsArray[i]);
			}
			return currentPartOfStoredValuePositions;
		}

		function returnOrCreatePathPart(currentPartOfStoredValuePositions, partPath) {
			if (currentPartOfStoredValuePositions[partPath] !== undefined) {
				return currentPartOfStoredValuePositions[partPath];
			}
			return createAndSetPartPath(currentPartOfStoredValuePositions, partPath);
		}

		function createAndSetPartPath(currentPartOfStoredValuePositions, partPath) {
			var newLevel = createPartPath(currentPartOfStoredValuePositions, partPath);
			currentPartOfStoredValuePositions[partPath] = newLevel;
			return newLevel;
		}

		function createPartPath(currentPartOfStoredValuePositions, partPath) {
			return {
				name : partPath,
				getParent : function() {
					return currentPartOfStoredValuePositions;
				}
			};
		}

		function possiblyAddAlternativePresentation() {
			if (spec.cAlternativePresentation !== undefined) {
				var factoredAlternativePresentation = factorPresentation(spec.cAlternativePresentation);
				view.addAlternativeChild(factoredAlternativePresentation.getView());
			}
		}

		function getView() {
			return view.getView();
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			type : "pNonRepeatingChildRefHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			subscribeMsg : subscribeMsg,
			handleMsgToDeterminDataState : handleMsgToDeterminDataState,
			publishPresentationShown : publishPresentationShown
		});

		start();
		return out;
	};

	return cora;
}(CORA));