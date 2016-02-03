/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	cora.pSurroundingContainer = function(spec) {
		var path = spec.path;
		var cPresentation = spec.cPresentation;
		var cParentPresentation = spec.cParentPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;
		var jsBookkeeper = spec.jsBookkeeper;
		var presentationFactory = spec.presentationFactory;

		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
//		console.log("cParentPresentation", JSON.stringify(cParentPresentation.getData()));
		var presentationMetadata = cParentPresentation;
		
		var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
//		console.log("in pSurroundingContainer");
//		console.log("cParentPresentation", JSON.stringify(cParentPresentation.getData()));
		var cMetadataElement = getMetadataById(cParentPresentation
				.getFirstAtomicValueByNameInData("presentationOf"));
		var view = createBaseView();

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pSurroundingContainer " + presentationId;

			var presentationChildren = cPresentation.getFirstChildByNameInData("childReferences").children;

			presentationChildren.forEach(function(presentationChildRef) {
				viewNew.appendChild(createViewForChild(presentationChildRef));
			});

			return viewNew;
		}
		
		//TODO: this is the same code as in pGroup, fix duplication 
		function createViewForChild(presentationChildRef) {
			var cPresentationChildRef = CORA.coraData(presentationChildRef);
			var presRef = cPresentationChildRef.getFirstAtomicValueByNameInData("ref");
			var cPresentationChild = getMetadataById(presRef);

//			console.log("cPresentationChild:"+JSON.stringify(cPresentationChild.getData()));
			if (cPresentationChild.getData().name === "text") {
				return document.createTextNode(textProvider.getTranslation(presRef));
			}else if("children" ===cPresentationChild.getData().attributes.repeat){
//				console.log("children");
//				var repeat = cPresentationChild.getData().attributes.repeat;
//				if (repeat === "this") {
//				var presentation = presentationFactory.factor(newPath, cPresentation,
//						cParentPresentation);
				//should create a new surroundingContainer
				var presentation = presentationFactory.factor(path, cPresentationChild,
						cParentPresentation);
				return presentation.getView();
			}
			var childRefHandlerSpec = {
				"parentPath" : path,
				"cParentMetadata" : cMetadataElement,
				"cPresentation" : cPresentationChild,
				"cParentPresentation" : cParentPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"presentationFactory" : presentationFactory
			};
			var pChildRefHandler = CORA.pChildRefHandler(childRefHandlerSpec);
			return pChildRefHandler.getView();
		}
		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}

		var out = Object.freeze({
			"type" : "pSurroundingContainer",
			getView : getView
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));