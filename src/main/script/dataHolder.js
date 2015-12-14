/*
 * Copyright 2015 Olov McKie
 * Copyright 2015 Uppsala University Library
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

function DataHolder(metadataIdIn, metadataProviderIn, pubSubIn) {
	var metadataId = metadataIdIn;
	var metadataProvider = metadataProviderIn;
	var pubSub = pubSubIn;
	var dataContainer = createMainDataContainerWithChildrenAndAttributes();

	function createMainDataContainerWithChildrenAndAttributes() {
		// private
		return recursivelyCreateDataContainerForElementWithId(metadataId);
	}

	function recursivelyCreateDataContainerForElementWithId(id) {
		var metadataElement = getMetadataById(id);
		var nameInData = getFirstChildByNameInData(metadataElement, 'nameInData');
		var dataContainer = {};
		dataContainer.name = nameInData.value;

		addContainerContenceFromElement(dataContainer, metadataElement);
		return dataContainer;
	}

	function getMetadataById(id) {
		return metadataProvider.getMetadataById(id);
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

	function addContainerContenceFromElement(dataContainer, metadataElement) {
		if (isGroup(metadataElement)) {
			return addGroupParts(dataContainer, metadataElement);
		}

		// it is a variable
		return dataContainer.value = "";
	}

	function isGroup(metadataElement) {
		var type = metadataElement.attributes.type;
		if (type === "group" || type === "childGroup") {
			return true;
		}
		return false;
	}

	function addGroupParts(dataContainer, metadataElement) {
		dataContainer["children"] = createChildList(metadataElement);

		if (hasAttributes(metadataElement)) {
			dataContainer["attributes"] = createAttributesContainer(metadataElement);
		}
		return dataContainer;
	}

	function createChildList(metadataElement) {
		var childList = [];
		// loop children to current group
		var childReferences = getFirstChildByNameInData(metadataElement, 'childReferences');
		for (var i = 0, len = childReferences.children.length; i < len; i++) {
			// current child in loop
			var childReference = childReferences.children[i];
			createChild(childList, childReference);
		}
		return childList;
	}
	function createChild(childList, childReference) {
		var ref = getFirstAtomicValueByNameInData(childReference, 'ref');
		var repeatMin = getFirstAtomicValueByNameInData(childReference, 'repeatMin');
		var canRepeat = canChildReferenceRepeat(childReference);
		for (var i3 = 0, len3 = repeatMin; i3 < len3; i3++) {
			var childContainer = recursivelyCreateDataContainerForElementWithId(ref);
			if (canRepeat) {
				childContainer['repeatId'] = "" + i3;
			}
			childList.push(childContainer);
		}
	}
	function canChildReferenceRepeat(childReference) {
		return getFirstAtomicValueByNameInData(childReference, 'repeatMax') > 1;
	}
	function getFirstAtomicValueByNameInData(dataStructure, name) {
		return getFirstChildByNameInData(dataStructure, name).value;
	}

	function hasAttributes(metadataElement) {
		if (dataStructureContainsChild(metadataElement, 'attributeReferences')) {
			return true;
		}
		return false;
	}

	function createAttributesContainer(metadataElement) {
		// create attribute attributeContainer
		var attributeContainer = {};
		var attributeReferences = getFirstChildByNameInData(metadataElement, 'attributeReferences');
		for (var i = 0, len = attributeReferences.children.length; i < len; i++) {
			// current child in loop
			var ref = attributeReferences.children[i].value;
			var attribute = getMetadataById(ref);
			var attributeNameInData = getFirstAtomicValueByNameInData(attribute, 'nameInData');
			var finalValue = getFirstAtomicValueByNameInData(attribute, 'finalValue');

			attributeContainer[attributeNameInData] = finalValue;
		}
		return attributeContainer;
	}

	function dataStructureContainsChild(dataStructure, name) {
		var children = dataStructure.children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.name === name) {
				return true;
			}
		}
		return false;
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
		tryToSetValueInContainerListUsingPath(dataContainer.children, path, value);
	};

	function tryToSetValueInContainerListUsingPath(dataContainer, path, value) {
		try {
			setValueInContainerListUsingPath(dataContainer, path, value);
		} catch (e) {
			throw new Error("path(" + JSON.stringify(path) + ") not found in dataContainers");
		}
	}

	function setValueInContainerListUsingPath(dataContainers, path, value) {
		// TODO: split findContainerAndAtomicPath into two functions
		var foundContainerAndAtomicPath = findContainerAndAtomicPath(dataContainers, path);
		var containerSpecifiedByPath = foundContainerAndAtomicPath.dataContainer;
		containerSpecifiedByPath["value"] = value;
	}

	function findContainerAndAtomicPath(dataContainers, path) {
		var container = findContainerByPathInCurrentLevel(dataContainers, path);

		if (pathSpecifiesMoreLevels(path)) {
			var containerChildren = container.children;
			var childPath = getFirstChildByNameInData(path, "linkedPath");
			return findContainerAndAtomicPath(containerChildren, childPath);
		}

		var returnObj = {};
		returnObj.dataContainer = container;
		returnObj.path = path;
		return returnObj;
	}

	function findContainerByPathInCurrentLevel(dataContainers, path) {
		var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(dataContainers, path);
		if (isPathSpecifyingARepeatingContainer(path)) {
			return foundContainers[getFirstChildByNameInData(path, "repeatId").value];
		}
		if (listContainsOneElement(foundContainers)) {
			return foundContainers[0];
		}
		throw new Error("path(" + path.id + ") not found dataContainers");
	}

	function findContainersSpecifiedByNameInDataAndAttributes(containers, path) {
		var foundContainers = [];
		for (var i = 0; i < containers.length; i++) {
			var container = containers[i];
			if (containerIsSpecifiedByNameInDataAndAttributes(container, path)) {
				if (isPathSpecifyingARepeatingContainer(path)) {
					foundContainers[container.repeatId] = container;
				} else {
					foundContainers.push(container);
				}
			}
		}
		return foundContainers;
	}

	function containerIsSpecifiedByNameInDataAndAttributes(container, path) {
		return containerIsSpecifiedByNameInData(container, path)
				&& containerIsSpecifiedByAttributes(container, path);
	}

	function containerIsSpecifiedByNameInData(container, path) {
		return container.name === getFirstChildByNameInData(path, "nameInData").value;
	}

	function containerIsSpecifiedByAttributes(container, path) {
		if (containerAndPathHasAttributes(container, path)) {
			return containerHasSameAttributesAsPath(container, path);
		}
		if (containerAndPathDoesNotHaveAttributes(container, path)) {
			return true;
		}
		return false;
	}

	function containerAndPathHasAttributes(container, path) {
		return pathHasAttributes(path) && containerHasAttributes(container);
	}

	function containerAndPathDoesNotHaveAttributes(container, path) {
		return pathDoesNotHaveAttributes(path) && containerDoesNotHaveAttributes(container);
	}

	function containerHasSameAttributesAsPath(container, path) {
		var containerAttributes = container.attributes;
		var pathAttributes = getFirstChildByNameInData(path, "attributes").children;
		return containerHasAllPathAttributes(containerAttributes, pathAttributes)
				&& pathHasAllContainerAttributes(containerAttributes, pathAttributes);
	}

	function containerHasAllPathAttributes(containerAttributes, pathAttributes) {
		for (var i2 = 0; i2 < pathAttributes.length; i2++) {
			var pathAttribute = pathAttributes[i2];
			var pathAttributeKey = pathAttribute.name;
			var pathAttributeValue = pathAttribute.value;
			if (containerAttributes[pathAttributeKey] !== pathAttributeValue) {
				return false;
			}
		}
		return true;
	}

	function pathHasAllContainerAttributes(containerAttributes, pathAttributes) {
		var containerAttributeKeys = Object.keys(containerAttributes);
		for (var i2 = 0; i2 < containerAttributeKeys.length; i2++) {
			var containerAttributeKey = containerAttributeKeys[i2];
			var containerAttributeValue = containerAttributes[containerAttributeKey];
			if (pathAttributesDoesNotHaveNameAndValue(pathAttributes, containerAttributeKey,
					containerAttributeValue)) {
				return false;
			}
		}
		return true;
	}

	function pathAttributesDoesNotHaveNameAndValue(pathAttributes, name, value) {
		return !pathAttributesHasNameAndValue(pathAttributes, name, value);
	}
	function pathAttributesHasNameAndValue(pathAttributes, name, value) {
		for (var i2 = 0; i2 < pathAttributes.length; i2++) {
			var pathAttribute = pathAttributes[i2];
			var pathAttributeKey = getFirstAtomicValueByNameInData(pathAttribute, "attributeName");
			var pathAttributeValue = getFirstAtomicValueByNameInData(pathAttribute,
					"attributeValue");
			if (pathAttributeKey === name && pathAttributeValue === value) {
				return true;
			}
		}
		return false;

	}

	function pathHasAttributes(path) {
		return dataStructureContainsChild(path, "attributes");
	}

	function pathDoesNotHaveAttributes(path) {
		return !pathHasAttributes(path);
	}

	function containerHasAttributes(container) {
		return container.attributes !== undefined;
	}

	function containerDoesNotHaveAttributes(container) {
		return !containerHasAttributes(container);
	}

	function isPathSpecifyingARepeatingContainer(path) {
		return dataStructureContainsChild(path, "repeatId");
	}

	function listContainsOneElement(list) {
		return list.length === 1;
	}

	function pathSpecifiesMoreLevels(path) {
		return dataStructureContainsChild(path, "linkedPath");
	}

	this.addRepeat = function(jsonPath, metadataIdIn) {
		var containerList = dataContainer["data"];
		tryToAddRepeatInContainerListUsingPath(containerList, jsonPath, metadataIdIn);
	};

	function tryToAddRepeatInContainerListUsingPath(dataContainers, path, metadataIdIn) {
		try {
			addRepeatInContainerListUsingPath(dataContainers, path, metadataIdIn);
		} catch (e) {
			throw new Error("path(" + JSON.stringify(path) + ") not found in dataContainers");
		}
	}

	function addRepeatInContainerListUsingPath(dataContainers, path, metadataIdIn) {
		var foundContainerAndAtomicPath = findContainerAndAtomicPath(dataContainers, path);
		var containerSpecifiedByPath = foundContainerAndAtomicPath.dataContainer;
		var atomicPath = foundContainerAndAtomicPath.path;
		var newRepeat = recursivelyCreateDataContainerForElementWithId(metadataIdIn);
		containerSpecifiedByPath[atomicPath.id].children.push(newRepeat);
	}
}