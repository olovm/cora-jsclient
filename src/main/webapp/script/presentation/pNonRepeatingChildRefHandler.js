/*
 * Copyright 2018 Uppsala University Library
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
				childStyle : spec.childStyle
			};
			view = dependencies.pNonRepeatingChildRefHandlerViewFactory.factor(viewSpec);
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
//			console.log("msg", msg);
//			console.log("dataFromMsg", dataFromMsg);
//			console.log("dataFromMsg", JSON.stringify(dataFromMsg));
			var msgAsArray = msg.split("/");
			var msgType = msgAsArray.pop();
			// if (msg.includes("setValue")) {
			if (msgType === "setValue") {
				if (dataFromMsg.data !== "") {
					view.setHasDataStyle(true);
					if (spec.mode === "output") {
						view.showContent();
					}
					// store value, then update status
					storeValuePosition(msgAsArray);
				} else {
					// remove value, then update status
					removeValuePosition(msgAsArray);
					if (Object.keys(storedValuePositions).length === 0) {
//						console.log("NO DATA!!!!")
						view.setHasDataStyle(false);
						if (spec.mode === "output") {
							view.hideContent();
						}
					}
				}
			}
			if (msgType === "remove") {
				// remove block, then update status
				removeValuePosition(msgAsArray);
				if (Object.keys(storedValuePositions).length === 0) {
//					console.log("NO DATA!!!!")
					view.setHasDataStyle(false);
					if (spec.mode === "output") {
						view.hideContent();
					}
				}
				
			}
			
		}
		var storedValuePositions = {
		// names : []
		};
		// var storedValuePositions=[];
		function storeValuePosition(pathAsArray) {
			var tempHolder = findAddPathToStored(pathAsArray);

			tempHolder["trams"] = "value";
			// tempHolder.push("value");
//			console.log("storedValuePositions")
			// console.log(storedValuePositions)

			// console.log("length:", storedValuePositions.length)
//			console.log(JSON.stringify(storedValuePositions))
		}

		function findAddPathToStored(pathAsArray) {
			var tempHolder = storedValuePositions;
			for (var i = 0; i < pathAsArray.length; i++) {
				// tempHolder.names.push(pathAsArray[i]);
				tempHolder = storePathPart(tempHolder, pathAsArray[i]);
			}
			return tempHolder;
		}
		function storePathPart(tempHolder, partPath) {
			if (tempHolder[partPath] === undefined) {
				var newLevel = {
					name : partPath,
					// names : [],
					// "parent" : tempHolder
					getParent : function() {
						return tempHolder;
					}
				};
				tempHolder[partPath] = newLevel;
			}
			return tempHolder[partPath];
		}

		function removeValuePosition(pathAsArray) {
			var tempHolder = findAddPathToStored(pathAsArray);
			removeFromBottom(tempHolder);

			// tempHolder["trams"] = undefined;
//			console.log("storedValuePositions")
//			console.log(JSON.stringify(storedValuePositions))
		}
		function removeFromBottom(tempHolder) {
			var parent = tempHolder.getParent();
			delete parent[tempHolder.name];
//			for ( const prop in parent) {
//				console.log("obj property: ", prop)
//			}
			var len = Object.keys(parent).length;
			if (len == 2) {
				removeFromBottom(parent);
			}
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
			handleMsgToDeterminDataState : handleMsgToDeterminDataState
		});

		start();
		return out;
	};

	return cora;
}(CORA));