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

		var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
		var presentationId = new CORA.CoraData(recordInfo).getFirstAtomicValueByNameInData("id");

		var metadataId = cPresentation.getFirstAtomicValueByNameInData("presentationOf");
		var cMetadataElement = getMetadataById(metadataId);
		var nameInData = cMetadataElement.name;
		var mode = cPresentation.getFirstAtomicValueByNameInData("mode");

		var view = createBaseView();
		pubSub.subscribe("add", parentPath, undefined, handleMsg);

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
		function handleMsg(dataFromMsg, msg) {
			console.log("msg:" + msg + " dataFromMsg:" + JSON.stringify(dataFromMsg));
			// setValue(dataFromMsg.data);
			// TODO: see how we can add metadataId to subscribe so we only get
			// add messages for this childRef
			// TODO: add

			add(dataFromMsg.repeatId);
		}
		function add(repeatId) {
			var newPath = calculatePathForNewElement(repeatId);
			var varSpec = {
				"newPath" : newPath,
				"metadataId" : metadataId,
				"mode" : mode,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			// TODO: handle different type of elements
			var variable = CORA.variable(varSpec);
			view.appendChild(variable.getView());
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
			handleMsg : handleMsg
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA || {}));
