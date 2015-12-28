/*
 * Copyright 2015 Olov McKie
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
	cora.MetadataController = function(metadataIdIn, dataIn, metadataProviderIn, pubSubIn) {
		var topLevelMetadataId = metadataIdIn;
		var topLevelData = dataIn;
		var metadataProvider = metadataProviderIn;
		var pubSub = pubSubIn;

		initializeFirstLevel();

		function initializeFirstLevel() {
			var topLevelMetadataElement = getMetadataById(topLevelMetadataId);
			var topLevelChildReferences = topLevelMetadataElement.getFirstChildByNameInData(
					'childReferences');
			var topLevelPath = {};
			initializeNextLevelChildren(topLevelChildReferences, topLevelPath, topLevelData);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function initializeNextLevelChildren(childReferences, path, data) {
			var coraData = new CORA.CoraData(data);
			childReferences.children.forEach(function(childReference) {
				initializeNextLevelChild(new CORA.CoraData(childReference), path, coraData);
			});
		}

		function initializeNextLevelChild(childReference, path, data) {
			var hasData = data.getData() !== undefined;

			var ref = childReference.getFirstAtomicValueByNameInData('ref');
			var metadataElement = getMetadataById(ref);
			var nameInData = metadataElement.getFirstAtomicValueByNameInData("nameInData");

			var generatedRepeatId = 0;
			if (hasData) {
				generatedRepeatId = calculateMaxRepeatIdFromData(data, nameInData);
			}
			if (shouldRepeat(childReference)) {
				var repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
				if (hasData) {
					var noOfData = data.getNoOfChildrenWithNameInData(nameInData);
					if (noOfData > repeatMin) {
						repeatMin = noOfData;
					}
				}
				for (var i = 0; i < repeatMin; i++) {
					var dataChild = undefined;
					var repeatId;
					if (hasData && data.containsChildWithNameInDataAndIndex(nameInData, i)) {
						dataChild = data.getChildByNameInDataAndIndex(nameInData, i);
						repeatId = dataChild.repeatId;
					} else {
						repeatId = String(generatedRepeatId);
						generatedRepeatId++;
					}
					recursivelyInitializeForMetadataWithId(ref, path, dataChild, repeatId);
				}
			} else {

				if (hasData && data.containsChildWithNameInData(nameInData)) {
					var dataChild = data.getFirstChildByNameInData(nameInData);
					recursivelyInitializeForMetadataWithId(ref, path, dataChild);
				} else {
					recursivelyInitializeForMetadataWithId(ref, path, undefined);
				}
			}
		}

		function shouldRepeat(childReference) {
			var repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || repeatMax > 1;
		}

		function calculateMaxRepeatIdFromData(dataStructure, nameInData) {
			var data = dataStructure.getData();
			var currentMaxRepeatId = 0;
			var children = data.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					var x = Number(child.repeatId);
					if (!isNaN(x) && x > currentMaxRepeatId) {
						currentMaxRepeatId = x;
						currentMaxRepeatId++;
					}
				}
			}
			return currentMaxRepeatId;
		}

		function recursivelyInitializeForMetadataWithId(metadataId, path, data, repeatId) {
			var metadataElement = getMetadataById(metadataId);
			if (isGroup(metadataElement.getData())) {
				recursivelyInitializeGroup(metadataId, path, data, repeatId);
			} else {
				initializeVariable(metadataId, path, data, repeatId);
			}
		}


		function isGroup(metadataElement) {
			var type = metadataElement.attributes.type;
			if (type === "group" || type === "childGroup") {
				return true;
			}
			return false;
		}

		function recursivelyInitializeGroup(metadataId, path, data, repeatId) {
			var addMessage;

			if (repeatId !== undefined) {
				addMessage = {
					"metadataId" : metadataId,
					"path" : path,
					"repeatId" : repeatId
				};
			} else {
				addMessage = {
					"metadataId" : metadataId,
					"path" : path
				};
			}
			pubSub.publish("add", addMessage);

			// calculate nextLevelPath, call children
			var metadataElement = getMetadataById(metadataId);
			var nextLevelPath = calculateNextLevelPath(metadataElement, path, repeatId);

			var nextLevelChildReferences = metadataElement.getFirstChildByNameInData('childReferences');
			initializeNextLevelChildren(nextLevelChildReferences, nextLevelPath, data);
		}

		function calculateNextLevelPath(metadataElement, path, repeatId) {
			var nameInData = metadataElement.getFirstAtomicValueByNameInData("nameInData");

			var nextLevelPath = JSON.parse(JSON.stringify(path));

			var childPathPart = createLinkedPathWithNameInData(nameInData);
			if (repeatId !== undefined) {
				childPathPart = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId);
			}
			var attributes;
			if (hasAttributes(metadataElement)) {
				attributes = createAttributes(metadataElement);
				childPathPart.children.push(attributes);
			}
			if (nextLevelPath.name !== undefined) {
				var lowestPath = findLowestPath(nextLevelPath);
				lowestPath.children.push(childPathPart);
			} else {
				nextLevelPath = childPathPart;
			}
			return nextLevelPath;
		}
		
		function hasAttributes(metadataElement) {
			if (metadataElement.containsChildWithNameInData('attributeReferences')) {
				return true;
			}
			return false;
		}
		
		function createAttributes(metadataElement) {
			var attributes = {
				"name" : "attributes",
				"children" : []
			};
			var attributeReferences = metadataElement.getFirstChildByNameInData(
					'attributeReferences');
			var attributeNo = 1;
			attributeReferences.children.forEach(function(attributeReference) {
				var ref = attributeReference.value;
				var attribute = getMetadataById(ref);
				var attributeNameInData = attribute.getFirstAtomicValueByNameInData('nameInData');
				var finalValue = attribute.getFirstAtomicValueByNameInData('finalValue');

				attributes.children.push(createAttributeWithNameAndValueAndRepeatId(attributeNameInData,
						finalValue, String(attributeNo)));
				attributeNo++;
			});
			return attributes;
		}

		function createAttributeWithNameAndValueAndRepeatId(attributeName, attributeValue, repeatId) {
			return {
				"name" : "attribute",
				"repeatId" : repeatId,
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}

		function initializeVariable(metadataId, path, data, repeatId) {
			var addMessage;
			if (repeatId !== undefined) {
				addMessage = {
					"metadataId" : metadataId,
					"path" : path,
					"repeatId" : repeatId
				};
			} else {
				addMessage = {
					"metadataId" : metadataId,
					"path" : path
				};
			}
			pubSub.publish("add", addMessage);

			if (data !== undefined) {
				var metadataElement = getMetadataById(metadataId);

				var nextLevelPath = calculateNextLevelPath(metadataElement, path, repeatId);

				var message = {
					"data" : data.value,
					"path" : nextLevelPath
				};
				pubSub.publish("setValue", message);
			}
		}
		function findLowestPath(path) {
			var coraPath = new CORA.CoraData(path);
			if (coraPath.containsChildWithNameInData("linkedPath")) {
				return findLowestPath(coraPath.getFirstChildByNameInData("linkedPath"));
			}
			return path;
		}
		function createLinkedPathWithNameInData(nameInData) {
			return {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInData
				} ]
			};
		}

		function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId) {
			var path = createLinkedPathWithNameInData(nameInData);
			path.children.push({
				"name" : "repeatId",
				"value" : repeatId
			});
			return path;
		}

	};
	return cora;
}(CORA || {}));