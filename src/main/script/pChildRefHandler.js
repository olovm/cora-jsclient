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
	cora.pChildRefHandler = function(spec) {
		var parentPath = spec.parentPath;
		var cParentMetadata = spec.cParentMetadata;
		var cPresentation = spec.cPresentation;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var textProvider = spec.textProvider;

		var presentationId = findPresentationId(cPresentation);
		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);

		var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");

		var cParentMetadataChildRef = findParentMetadataChildRef(cParentMetadata);
		var repeatMin = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMin");
		var repeatMax = cParentMetadataChildRef.getFirstAtomicValueByNameInData("repeatMax");
		var isRepeating = repeatMax > 1;

		var view = createBaseView();
		pubSub.subscribe("add", parentPath, undefined, handleMsg);

		function findPresentationId(cPresentationToSearch) {
			var recordInfo = cPresentationToSearch.getFirstChildByNameInData("recordInfo");
			return new CORA.CoraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function findParentMetadataChildRef(cMetadata) {
			var parentMetadataChildRef = cMetadata
					.getFirstChildByNameInData("childReferences").children.find(function(
					metadataChildRef) {
				var cMetadataChildRef = new CORA.CoraData(metadataChildRef);
				return cMetadataChildRef.getFirstAtomicValueByNameInData("ref") === metadataId;
			});
			return new CORA.CoraData(parentMetadataChildRef);
		}

		function createBaseView() {
			var viewNew = document.createElement("span");
			viewNew.className = "pChildRefHandler " + presentationId;
			return viewNew;
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function getView() {
			return view;
		}
		function handleMsg(dataFromMsg) {
			if (metadataId === dataFromMsg.metadataId) {
				add(dataFromMsg.repeatId);
			}
		}
		function add(repeatId) {
			var newPath = calculatePathForNewElement(repeatId);
			var varSpec = {
				"path" : newPath,
				"cPresentation" : cPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			// TODO: handle different type of elements
			var pVar = CORA.pVar(varSpec);
			view.appendChild(pVar.getView());
		}

		function calculatePathForNewElement(repeatId) {
			var pathCopy = JSON.parse(JSON.stringify(parentPath));
			var childPath = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId);
			if (pathCopy.children === undefined) {
				return childPath;
			}
			var lowestPath = getLowestPath(pathCopy);
			lowestPath.children.push(childPath);
			return pathCopy;
		}

		function createLinkedPathWithNameInDataAndRepeatId(nameInDataForPath, repeatIdForPath) {
			var path = {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInDataForPath
				} ]
			};
			if (repeatIdForPath !== undefined) {
				path.children.push({
					"name" : "repeatId",
					"value" : repeatIdForPath
				});
			}
			return path;
		}

		function getLowestPath(path) {
			var cPath = new CORA.CoraData(path);
			if (cPath.containsChildWithNameInData("linkedPath")) {
				return getLowestPath(cPath.getFirstChildWithNameInData("linkedPath"));
			}
			return path;
		}

		var out = Object.freeze({
			getView : getView,
			add : add,
			handleMsg : handleMsg,
			isRepeating : isRepeating
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA || {}));
