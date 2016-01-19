/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2015, 2016 Uppsala University Library
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
	cora.DataHolder = function(metadataIdIn, metadataProviderIn, pubSubIn) {
		var metadataId = metadataIdIn;
		var metadataProvider = metadataProviderIn;
		var pubSub = pubSubIn;
		var dataContainer = createMainDataContainerWithChildrenAndAttributes();

		function createMainDataContainerWithChildrenAndAttributes() {
			// private
			return createDataContainerForElementWithId(metadataId);
		}

		function createDataContainerForElementWithId(id) {
			var metadataElement = getMetadataById(id);
			var nameInData = metadataElement.getFirstAtomicValueByNameInData('nameInData');
			var dataContainerPart = {};
			dataContainerPart.name = nameInData;

			addContainerContentFromElement(dataContainerPart, metadataElement);
			return dataContainerPart;
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function addContainerContentFromElement(dataContainerPart, metadataElement) {
			if (isGroup(metadataElement)) {
				addGroupParts(dataContainerPart, metadataElement);
				return dataContainerPart;
			}

			// it is a variable
			dataContainerPart.value = "";
			return dataContainerPart;
		}

		function isGroup(metadataElement) {
			var type = metadataElement.getData().attributes.type;
			if (type === "group" || type === "childGroup") {
				return true;
			}
			return false;
		}

		function addGroupParts(dataContainerPart, metadataElement) {
			dataContainerPart.children = [];

			if (metadataElement.containsChildWithNameInData("attributeReferences")) {
				dataContainerPart.attributes = createAttributesContainer(metadataElement);
			}
		}

		function createAttributesContainer(metadataElement) {
			var attributeContainer = {};
			var attributeReferences = metadataElement
					.getFirstChildByNameInData('attributeReferences');
			attributeReferences.children.forEach(function(attributeReference) {
				var ref = attributeReference.value;
				var attribute = getMetadataById(ref);
				var attributeNameInData = attribute.getFirstAtomicValueByNameInData('nameInData');
				var finalValue = attribute.getFirstAtomicValueByNameInData('finalValue');

				attributeContainer[attributeNameInData] = finalValue;
			});

			return attributeContainer;
		}

		this.getPubSub = function() {
			// priviledged
			return pubSub;
		};

		this.getMetadataId = function() {
			// priviledged
			this.getPubSub();
			return metadataId;
		};

		this.getData = function() {
			return dataContainer;
		};

		this.setValue = function(path, value) {
			try {
				setValueInContainerListUsingPath(path, value);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder:" + e);
			}
		};

		function setValueInContainerListUsingPath(path, value) {
			var foundContainer = findContainer(dataContainer, path);
			foundContainer.value = value;
		}

		function findContainer(dataContainers, path) {
			var cpath = new CORA.CoraData(path);
			var container = findContainerByPathInCurrentLevel(dataContainers, cpath);

			if (pathSpecifiesMoreLevels(cpath)) {
				var childPath = cpath.getFirstChildByNameInData("linkedPath");
				return findContainer(container, childPath);
			}
			return container;
		}

		function findContainerByPathInCurrentLevel(dataContainers, path) {
			var nameInData = path.getFirstAtomicValueByNameInData("nameInData");
			if (path.containsChildWithNameInData("attributes")) {
				var attributes = path.getFirstChildByNameInData("attributes");
			}
			if (path.containsChildWithNameInData("repeatId")) {
				var repeatId = path.getFirstAtomicValueByNameInData("repeatId");
			}
			var cdataContainers = new CORA.CoraData(dataContainers);

			return cdataContainers.getFirstChildByNameInDataAndAttributesAndRepeatId(nameInData,
					attributes, repeatId);
		}

		function listContainsOneElement(list) {
			return list.length === 1;
		}

		function pathSpecifiesMoreLevels(path) {
			return path.containsChildWithNameInData("linkedPath");
		}

		this.addChild = function(parentPath, metadataIdToAdd, repeatId) {
			tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
		};

		function tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId) {
			try {
				addChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(parentPath)
						+ ") not found in dataContainers:" + e);
			}
		}

		function addChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId) {
			var containerSpecifiedByPath = dataContainer;
			if (parentPath.children !== undefined) {
				var foundContainer = findContainer(dataContainer, parentPath);
				containerSpecifiedByPath = foundContainer;
			}
			var newRepeat = createDataContainerForElementWithId(metadataIdToAdd);
			newRepeat.repeatId = repeatId;
			containerSpecifiedByPath.children.push(newRepeat);
		}
	};
	return cora;
}(CORA || {}));