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
		var cMetadataElement = getMetadataById(metadataId);
		initalizeRepeat();

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function initalizeRepeat() {
			createAndPublishAddMessage();
			initializeForMetadata();
		}

		function createAndPublishAddMessage() {
			var addMessage = {
				"metadataId" : metadataId,
				"path" : path,
				"repeatId" : repeatId,
				"nameInData" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData")
			};
			if (hasAttributes()) {
				addMessage.attributes = collectAttributes();
			}
			pubSub.publish("add", addMessage);
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function collectAttributes() {
			var collectedAttributes = {};
			var attributeReferences = cMetadataElement
					.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				var cCollectionVariable = getMetadataById(attributeReference.value);
				var attributeNameInData = cCollectionVariable
						.getFirstAtomicValueByNameInData("nameInData");
				var attributeValues = [];
				collectedAttributes[attributeNameInData] = attributeValues;
				attributeValues.push(cCollectionVariable
						.getFirstAtomicValueByNameInData("finalValue"));
			});
			return collectedAttributes;
		}

		function initializeForMetadata() {
			var nextLevelPath = createNextLevelPath();
			var message = {
				"data" : data,
				"path" : nextLevelPath
			};
			if (isGroup()) {
				initializeMetadataGroup(nextLevelPath);
			} else if (isRecordLink()) {
				initializeMetadataRecordLink(nextLevelPath);
				pubSub.publish("linkedData", message);
			} else if (isResourceLink()) {
				initializeMetadataResourceLink(nextLevelPath);
				pubSub.publish("linkedResource", message);
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
			var nameInData = cMetadataElement.getFirstAtomicValueByNameInData("nameInData");
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
			var attributeReferences = cMetadataElement
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
			var type = cMetadataElement.getData().attributes.type;
			return type === "group";
		}

		function initializeMetadataGroup(nextLevelPath) {
			var nextLevelChildReferences = cMetadataElement
					.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				CORA.metadataChildInitializer(childReference, nextLevelPath, data,
						metadataProvider, pubSub);
			});
		}

		function isRecordLink() {
			var type = cMetadataElement.getData().attributes.type;
			return type === "recordLink";
		}

		function initializeMetadataRecordLink(nextLevelPath) {
			initializeLinkedRecordType(nextLevelPath);
			initializeLinkedRecordId(nextLevelPath);
			possiblyInitializeLinkedRepeatId(nextLevelPath);
		}

		function initializeLinkedRecordType(nextLevelPath) {
			var recordTypeStaticChildReference = createRefWithRef("linkedRecordTypeTextVar");
			var linkedRecordTypeValue = cMetadataElement
					.getFirstAtomicValueByNameInData("linkedRecordType");
			var recordTypeData = {
				"name" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : linkedRecordTypeValue
				} ]
			};
			CORA.metadataChildInitializer(recordTypeStaticChildReference, nextLevelPath,
					recordTypeData, metadataProvider, pubSub);
		}

		function createRefWithRef(ref) {
			console.log(ref)
			return {
				"name" : "childReference",
				"repeatId" : 1,
				"children" : [ {
					"name" : "ref",
					"children": [ {
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
						},
						{
						"name": "linkedRecordId",
						"value": ref
						}
					],"attributes": {
						"type": "textVariable"
					}
				}, {
					"name" : "repeatMin",
					"value" : "1"
				}, {
					"name" : "repeatMax",
					"value" : "1"
				} ]
			};
		}

		function initializeLinkedRecordId(nextLevelPath) {
			var recordIdData = data;
			if (cMetadataElement.containsChildWithNameInData("finalValue")) {
				var finalValue = cMetadataElement.getFirstAtomicValueByNameInData("finalValue");

				recordIdData = {
					"name" : cMetadataElement.getFirstAtomicValueByNameInData("nameInData"),
					"children" : [ {
						"name" : "linkedRecordId",
						"value" : finalValue
					} ]
				};
			}

			var recordIdStaticChildReference = createRefWithRef("linkedRecordIdTextVar");
			CORA.metadataChildInitializer(recordIdStaticChildReference, nextLevelPath,
					recordIdData, metadataProvider, pubSub);
		}

		function possiblyInitializeLinkedRepeatId(nextLevelPath) {
			if (isLinkToRepeatingPartOfRecord()) {
				var recordTypeStaticChildReference = createRefWithRef("linkedRepeatIdTextVar");
				CORA.metadataChildInitializer(recordTypeStaticChildReference, nextLevelPath, data,
						metadataProvider, pubSub);
			}
		}

		function isLinkToRepeatingPartOfRecord() {
			return cMetadataElement.containsChildWithNameInData("linkedPath");
		}

		function isResourceLink() {
			var type = cMetadataElement.getData().attributes.type;
			return type === "resourceLink";
		}

		function initializeMetadataResourceLink(nextLevelPath) {
			var cMetadataGroupForResourceLinkGroup = getMetadataById("metadataGroupForResourceLinkGroup");
			var nextLevelChildReferences = cMetadataGroupForResourceLinkGroup
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