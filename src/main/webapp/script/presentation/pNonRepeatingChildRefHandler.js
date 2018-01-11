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
		function start() {
			createView();
			var factoredPresentation = factorPresentation(spec.cPresentation);
			view.addChild(factoredPresentation.getView());
			possiblyAddAlternativePresentation();
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

		function factorPresentation(cPresentation) {
			var presentationSpec = {
				path : spec.parentPath,
				metadataIdUsedInData : spec.parentMetadataId,
				cPresentation : cPresentation,
				cParentPresentation : spec.cParentPresentation
			};
			//
			console.log("factor Presentation:", spec.parentMetadataId)
			subscribeToStuff(cPresentation);
			//
			return dependencies.presentationFactory.factor(presentationSpec);
		}
		//
		var initCompleteSubscriptionId;
		var topLevelMetadataIds = {};
		function subscribeToStuff(cPresentation) {
			var cPresentationsOf = CORA.coraData(cPresentation
					.getFirstChildByNameInData("presentationsOf"));
			var listPresentationOf = cPresentationsOf.getChildrenByNameInData("presentationOf");
			listPresentationOf.forEach(function(child) {
				// currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
				// currentMaxRepeatId);
				// console.log("metadataId", child.value);
				// console.log("repeatId", child.repeatId);
				topLevelMetadataIds[child.value] = "exists";
//				var newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(child.value,
//						child.repeatId, spec.parentPath);
//				console.log("newPath", newPath);
//				dependencies.pubSub.subscribe("*", newPath, undefined, handleMsg);
			})
			dependencies.pubSub.subscribe("add", spec.parentPath, undefined, subscribeMsg);
			// dependencies.pubSub.subscribe("add", spec.parentPath, undefined, handleMsg);
			// dependencies.pubSub.subscribe("move", spec.parentPath, undefined, handleMsg);
			initCompleteSubscriptionId = "";
			if (spec.minNumberOfRepeatingToShow !== undefined) {
				initCompleteSubscriptionId = dependencies.pubSub.subscribe("initComplete", {},
						undefined, initComplete);
			}
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
		function initComplete() {
			unsubscribeFromInitComplete();
			possiblyAddUpToMinNumberOfRepeatingToShow();
		}

		function unsubscribeFromInitComplete() {
			dependencies.pubSub.unsubscribe(initCompleteSubscriptionId);
		}
		function handleMsg(dataFromMsg, msg) {
			// if (messageIsHandledByThisPChildRefHandler(dataFromMsg)) {
			// processMsg(dataFromMsg, msg);
			// }
			console.log("msg", msg);
			console.log("dataFromMsg", dataFromMsg);
		}
		function handleMsg2(dataFromMsg, msg) {
			// if (messageIsHandledByThisPChildRefHandler(dataFromMsg)) {
			// processMsg(dataFromMsg, msg);
			// }
			console.log("msg2", msg);
			console.log("dataFromMsg2", dataFromMsg);
		}
		function subscribeMsg(dataFromMsg, msg) {
			if (messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg)) {
				// processMsg(dataFromMsg, msg);
				// }
				console.log("msg", msg);
				// console.log("dataFromMsg", dataFromMsg);
				// TODO: we are here
				var newPath = calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(
						dataFromMsg.metadataId, dataFromMsg.repeatId, spec.parentPath);
				console.log("newPathAdding:", newPath);
				dependencies.pubSub.subscribe("*", newPath, undefined, handleMsg2);
			}
		}
		function messageIsHandledByThisPNonRepeatingChildRefHandler(dataFromMsg) {
			// if (metadataIdSameAsInMessage(dataFromMsg)) {
			// return true;
			// }
			// return shouldPresentData(dataFromMsg.nameInData, dataFromMsg.attributes);
			if (topLevelMetadataIds[dataFromMsg.metadataId] !== undefined) {
				return true;
			}
			return false;
		}

		function metadataIdSameAsInMessage(dataFromMsg) {
			return metadataId === dataFromMsg.metadataId;
		}

		function shouldPresentData(nameInDataFromMsg, attributesFromMsg) {
			if (nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg)) {
				return false;
			}
			return metadataHelper.firstAttributesExistsInSecond(attributesFromMsg,
					collectedAttributes);
		}

		function nameInDataFromMsgNotHandledByThisPChildRefHandler(nameInDataFromMsg) {
			return nameInDataFromMsg !== cMetadataElement
					.getFirstAtomicValueByNameInData("nameInData");
		}
		//

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
			getView : getView
		});

		start();
		return out;
	};

	return cora;
}(CORA));