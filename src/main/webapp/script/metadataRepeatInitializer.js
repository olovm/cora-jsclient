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
	cora.metadataRepeatInitializer = function(metadataId, path, data, repeatId, metadataProvider,
			pubSub) {
		var metadataElement = getMetadataById(metadataId);
		initalizeRepeat();

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function initalizeRepeat() {
			createAndPublishAddMessage();
			initializeForMetadata();
		}

		function createAndPublishAddMessage() {
			// TODO: metadataId should be nameInData and attributes instead
			// to enable a "top" presentation to show data for all childtypes...
			// attributeReferences might be a list that this presentation accepts any in the list

			var addMessage = {
				"metadataId" : metadataId,
				"path" : path,
				"repeatId" : repeatId,
				"nameInData" : metadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (hasAttributes()) {
				// console.log("hasAttributes in metadataRepeatInitializer")
				addMessage.attributes = collectAttributes();
			}
			pubSub.publish("add", addMessage);
		}
		function hasAttributes() {
			return metadataElement.containsChildWithNameInData("attributeReferences");
		}
		function collectAttributes() {
			var collectedAttributes = {};
			var attributeReferences = metadataElement
					.getFirstChildByNameInData("attributeReferences");
			// console.log(attributeReferences.children)
			attributeReferences.children.forEach(function(attributeReference) {
				// var collectedAttribute = {};
				// collectedAttributes.push(collectedAttribute);
				var cCollectionVariable = getMetadataById(attributeReference.value);
				var attributeNameInData = cCollectionVariable
						.getFirstAtomicValueByNameInData("nameInData");
				// collectedAttribute.name = attributeNameInData;
				var attributeValues = [];
				// collectedAttribute.values = attributeValues;
				collectedAttributes[attributeNameInData] = attributeValues;
				if (cCollectionVariable.containsChildWithNameInData("finalValue")) {
					attributeValues.push(cCollectionVariable
							.getFirstAtomicValueByNameInData("finalValue"));
				} else {
					// get collection and all items from it
					var attributeRefCollectionId = cCollectionVariable
							.getFirstAtomicValueByNameInData("refCollectionId");
					var cAttributeItemCollection = getMetadataById(attributeRefCollectionId);
					var collectionItemReferences = cAttributeItemCollection
							.getFirstChildByNameInData("children");
					collectionItemReferences.forEach(function(itemCollectionRef) {
						var cAttributeCollectionItem = getMetadataById(itemCollectionRef.value);
						attributeValues.push(cAttributeCollectionItem
								.getFirstAtomicValueByNameInData("nameInData"));
					});
				}

			});
			// get metadata for each attribute reference
			// if final value return that else get refCollectionId metadata
			// get collectionItemReferences metadata (might be more than one)
			// get (ref) items metadata, get nameInData
			return collectedAttributes;
		}
		function initializeForMetadata() {
			var nextLevelPath = createNextLevelPath();
			if (isGroup()) {
				initializeMetadataGroup(nextLevelPath);
			} else {
				publishVariableValue(nextLevelPath);
			}
		}

		function createNextLevelPath() {
			var nextLevelPathPart = createNextLevelPathPart();

			if (incomingPathIsEmpty()) {
				return nextLevelPathPart;
			}

			var pathCopy = JSON.parse(JSON.stringify(path));
			var lowestPath = findLowestPath(pathCopy);
			lowestPath.children.push(nextLevelPathPart);
			return pathCopy;
		}

		function createNextLevelPathPart() {
			var childPathPart = createLinkedPathWithNameInData();

			if (hasRepeatId()) {
				childPathPart.children.push(createRepeatId());
			}

			if (hasAttributes()) {
				childPathPart.children.push(createAttributes());
			}
			return childPathPart;
		}

		function createLinkedPathWithNameInData() {
			var nameInData = metadataElement.getFirstAtomicValueByNameInData("nameInData");
			return {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : nameInData
				} ]
			};
		}

		function hasRepeatId() {
			return repeatId !== undefined;
		}

		function createRepeatId() {
			return {
				"name" : "repeatId",
				"value" : repeatId
			};
		}

		function createAttributes() {
			var attributes = {
				"name" : "attributes",
				"children" : []
			};
			var attributeReferences = metadataElement
					.getFirstChildByNameInData('attributeReferences');
			var attributeNo = 1;
			attributeReferences.children.forEach(function(attributeReference) {
				attributes.children.push(createAttributeWithAttributeAndRepeatId(
						attributeReference, String(attributeNo)));
				attributeNo++;
			});
			return attributes;
		}

		function createAttributeWithAttributeAndRepeatId(attributeReference, attributeRepeatId) {
			var ref = attributeReference.value;
			var attribute = getMetadataById(ref);
			var attributeName = attribute.getFirstAtomicValueByNameInData('nameInData');
			var attributeValue = attribute.getFirstAtomicValueByNameInData('finalValue');
			return {
				"name" : "attribute",
				"repeatId" : attributeRepeatId,
				"children" : [ {
					"name" : "attributeName",
					"value" : attributeName
				}, {
					"name" : "attributeValue",
					"value" : attributeValue
				} ]
			};
		}

		function incomingPathIsEmpty() {
			return path.name === undefined;
		}

		function findLowestPath(pathToSearch) {
			var coraPath = CORA.coraData(pathToSearch);
			if (coraPath.containsChildWithNameInData("linkedPath")) {
				return findLowestPath(coraPath.getFirstChildByNameInData("linkedPath"));
			}
			return pathToSearch;
		}

		function isGroup() {
			var type = metadataElement.getData().attributes.type;
			return type === "group" || type === "childGroup";
		}

		function initializeMetadataGroup(nextLevelPath) {
			var nextLevelChildReferences = metadataElement
					.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				CORA.metadataChildInitializer(childReference, nextLevelPath, data,
						metadataProvider, pubSub);
			});
		}

		function publishVariableValue(nextLevelPath) {
			if (data !== undefined) {
				var message = {
					"data" : data.value,
					"path" : nextLevelPath
				};
				pubSub.publish("setValue", message);
			}
		}

	};
	return cora;
}(CORA));