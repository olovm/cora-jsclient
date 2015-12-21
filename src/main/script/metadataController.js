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
		var hasInitialData = dataIn !== undefined;

		var topLevelMetadataElement = getMetadataById(topLevelMetadataId);
		var topLevelChildReferences = getFirstChildByNameInData(topLevelMetadataElement,
				'childReferences');

		initializeFirstLevelChildren(topLevelChildReferences);

		function initializeFirstLevelChildren(childReferences) {
			childReferences.children.forEach(initializeFirstLevelChild);
		}

		function initializeFirstLevelChild(childReference) {
			var ref = getFirstAtomicValueByNameInData(childReference, 'ref');
			var metadataElement = getMetadataById(ref);
			var nameInData = getFirstAtomicValueByNameInData(metadataElement, "nameInData");

			var generatedRepeatId = 0;
			if (hasInitialData) {
				generatedRepeatId = calculateMaxRepeatIdFromData(topLevelData, nameInData);
			}
			if (shouldRepeat(childReference)) {
				var repeatMin = getFirstAtomicValueByNameInData(childReference, "repeatMin");
				if (hasInitialData) {
					var noOfData = dataStructureContainsNoOfChildrenWithNameInData(topLevelData, nameInData);
					if (noOfData > repeatMin) {
						repeatMin = noOfData;
					}
				}
				for (var i = 0; i < repeatMin; i++) {
					var dataChild = undefined;
					var repeatId = String(i);
					if (hasInitialData
							&& dataStructureContainsChildWithNameInDataAndIndex(topLevelData, nameInData, i)) {
						dataChild = getChildByNameInDataAndIndex(topLevelData, nameInData, i);
						repeatId = dataChild.repeatId;
					} else {
						repeatId = String(generatedRepeatId);
						generatedRepeatId++;
					}
					recursivelyInitializeForMetadataWithId(ref, {}, dataChild, repeatId);
				}
			} else {
				if (hasInitialData) {
					var dataChild = getFirstChildByNameInData(topLevelData, nameInData);
				}
				recursivelyInitializeForMetadataWithId(ref, {}, dataChild);
			}
		}

		function getFirstAtomicValueByNameInData(dataStructure, name) {
			return getFirstChildByNameInData(dataStructure, name).value;
		}

		function getFirstChildByNameInData(dataStructure, name) {
			var children = dataStructure.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === name) {
					return child;
				}
			}

			throw new Error("name(" + name + ") not found in children to dataStructure");
		}

		function shouldRepeat(childReference) {
			var repeatMax = getFirstAtomicValueByNameInData(childReference, "repeatMax");
			return repeatMax === "X" || repeatMax > 1;
		}

		function dataStructureContainsNoOfChildrenWithNameInData(dataStructure, nameInData) {
			var found = 0;
			var children = dataStructure.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					found++;
				}
			}
			return found;
		}
		function getAtomicValueByNameInDataAndIndex(dataStructure, name, index) {
			return getChildByNameInDataAndIndex(dataStructure, name, index).value;
		}
		function calculateMaxRepeatIdFromData(dataStructure, nameInData) {
			var currentMaxRepeatId = 0;
			var children = dataStructure.children;
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
		function getChildByNameInDataAndIndex(dataStructure, nameInData, index) {
			var found = 0;
			var children = dataStructure.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					if (index === found) {
						return child;
					}
					found++;
				}
			}

			throw new Error("name(" + nameInData + ") with index (" + index
					+ ") not found in children to dataStructure");
		}
		function dataStructureContainsChildWithNameInDataAndIndex(dataStructure, nameInData, index) {
			var found = 0;
			var children = dataStructure.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					if (index === found) {
						return true;
					}
					found++;
				}
			}
			return false;
		}
		function dataStructureContainsChild(dataStructure, name) {
			var children = dataStructure.children;
			return children.some(function(child) {
				return child.name === name;
			});
		}

		function recursivelyInitializeForMetadataWithId(metadataId, path, data, repeatId) {
			var metadataElement = getMetadataById(metadataId);

			if (isGroup(metadataElement)) {
				recursivelyInitializeGroup(metadataElement, path, data, repeatId);
			} else {
				initializeVariable(metadataId, path, data, repeatId);
			}
		}

		function getMetadataById(id) {
			return metadataProvider.getMetadataById(id);
		}

		function isGroup(metadataElement) {
			var type = metadataElement.attributes.type;
			if (type === "group" || type === "childGroup") {
				return true;
			}
			return false;
		}
		function recursivelyInitializeGroup(metadataElement, path, data, repeatId) {

		}

		function initializeVariable(metadataId, path, data, repeatId) {
			if (repeatId !== undefined) {
				var addMessage = {
					"metadataId" : metadataId,
					"path" : path,
					"repeatId" : repeatId
				};
			} else {
				var addMessage = {
					"metadataId" : metadataId,
					"path" : path
				};
			}
			pubSub.publish("add", addMessage);

			if (data !== undefined) {
				var metadataElement = getMetadataById(metadataId);
				var nameInData = getFirstAtomicValueByNameInData(metadataElement, "nameInData");

				var childPath = createLinkedPathWithNameInData(nameInData);
				if (repeatId !== undefined) {
					childPath = createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId);
				}

				var message = {
					"data" : data.value,
					"path" : childPath
				};
				pubSub.publish("setValue", message);
			}

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