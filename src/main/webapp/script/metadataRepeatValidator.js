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
	cora.metadataRepeatValidator = function(metadataId, path, data, repeatId, metadataProvider,
			pubSub) {
		var result = {
			"everythingOkBelow" : true,
			"containsValuableData" : false
		};
		var cMetadataElement = getMetadataById(metadataId);
		validateRepeat();

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		function validateRepeat() {
			validateForMetadata();
		}

		function hasAttributes() {
			return cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function validateForMetadata() {
			var nextLevelPath = createNextLevelPath();
			if (isGroup()) {
				validateMetadataGroup(nextLevelPath);
			} else {
				validateVariableValue(nextLevelPath);
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
			return type === "group" || type === "childGroup";
		}

		function validateMetadataGroup(nextLevelPath) {
			var nextLevelChildReferences = cMetadataElement
					.getFirstChildByNameInData('childReferences');
			nextLevelChildReferences.children.forEach(function(childReference) {
				var childResult = CORA.metadataChildValidator(childReference, nextLevelPath, data,
						metadataProvider, pubSub);
				if (!childResult.everythingOkBelow) {
					result.everythingOkBelow = false;
				}
				if (childResult.containsValuableData) {
					result.containsValuableData = true;
				}
				result.validationMessage = {
					"metadataId" : metadataId,
					"path" : nextLevelPath
				}
				result.sendValidationMessages= false;
			});
		}

		function validateVariableValue(nextLevelPath) {
			if (dataIsInvalid()) {
				var message = {
					"metadataId" : metadataId,
					"path" : nextLevelPath
				};
				result = {
					"everythingOkBelow" : false,
					"containsValuableData" : false,
					"validationMessage" : message,
					"sendValidationMessages":true
				};
			}else{
				result.containsValuableData = true;
			}
		}

		function dataIsInvalid() {
			var regEx = cMetadataElement.getFirstAtomicValueByNameInData("regEx");
			return !new RegExp(regEx).test(data.value);
		}

		return result;
	};
	return cora;
}(CORA));