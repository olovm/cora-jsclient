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
	cora.metadataHelper = function(spec) {

		function getMetadataById(id) {
			return CORA.coraData(spec.metadataProvider.getMetadataById(id));
		}

		function collectAttributesAsObjectForMetadataId(metadataId) {
			var cMetadataElement = getMetadataById(metadataId);
			if (hasNoAttributes(cMetadataElement)) {
				return {};
			}
			return collectAttributesFromMetadata(cMetadataElement);

		}

		function hasNoAttributes(cMetadataElement) {
			return !cMetadataElement.containsChildWithNameInData("attributeReferences");
		}

		function collectAttributesFromMetadata(cMetadataElement) {
			var collectedAttributes = {};
			var attributeReferences = cMetadataElement
					.getFirstChildByNameInData("attributeReferences");
			attributeReferences.children.forEach(function(attributeReference) {
				collectAttributesForAttributeReference(attributeReference, collectedAttributes);
			});
			return collectedAttributes;
		}

		function collectAttributesForAttributeReference(attributeReference, collectedAttributes) {
			var cCollectionVariable = getMetadataById(attributeReference.value);
			var attributeNameInData = cCollectionVariable
					.getFirstAtomicValueByNameInData("nameInData");
			var attributeValues = collectAttributeValuesFromVariable(cCollectionVariable);
			collectedAttributes[attributeNameInData] = attributeValues;
		}

		function collectAttributeValuesFromVariable(cCollectionVariable) {
			if (variableHasFinalValue(cCollectionVariable)) {
				return getFinalValueFromVariable(cCollectionVariable);
			}
			return getAllValuesFromVariable(cCollectionVariable);
		}

		function variableHasFinalValue(cCollectionVariable) {
			return cCollectionVariable.containsChildWithNameInData("finalValue");
		}

		function getFinalValueFromVariable(cCollectionVariable) {
			return [ cCollectionVariable.getFirstAtomicValueByNameInData("finalValue") ];
		}

		function getAllValuesFromVariable(cCollectionVariable) {
			var attributeValues = [];
			var collectionItemReferences = getCollectionItemReferencesFor(cCollectionVariable);
			collectionItemReferences.children.forEach(function(collectionItemRef) {
				attributeValues.push(getCollectionItemValue(collectionItemRef));
			});
			return attributeValues;
		}

		function getCollectionItemValue(collectionItemRef) {
			var cCollectionItem = getMetadataById(collectionItemRef.value);
			var value = cCollectionItem.getFirstAtomicValueByNameInData("nameInData");
			return value;
		}

		function getCollectionItemReferencesFor(cCollectionVariable) {
			var attributeRefCollectionId = cCollectionVariable
					.getFirstAtomicValueByNameInData("refCollectionId");
			var cAttributeItemCollection = getMetadataById(attributeRefCollectionId);
			return cAttributeItemCollection.getFirstChildByNameInData("collectionItemReferences");
		}

		var out = Object.freeze({
			collectAttributesAsObjectForMetadataId : collectAttributesAsObjectForMetadataId
		});
		return out;
	};
	return cora;
}(CORA));