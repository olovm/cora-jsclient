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
	var that = this;
	var metadataId = metadataIdIn;
	var metadataProvider = metadataProviderIn;
	var pubSub = pubSubIn;
	var dataContainer = createMainDataContainerWithChildrenAndAttributes();

	function createMainDataContainerWithChildrenAndAttributes() {
		// private
		var dataContainer = {};
		var data = [];
		dataContainer["data"] = data;
		var childContainer = recursivelyCreateDataContainerForElementWithId(metadataId);
		data.push(childContainer);
		return dataContainer;
	}

	function recursivelyCreateDataContainerForElementWithId(id) {
		var metadataElement = getMetadataById(id);
		// TODO: handle getRoot, move up chain to parent use its data id?
		var nameInData = getFirstValueById(metadataElement, 'nameInData');
		var dataContainer = {};
		dataContainer[nameInData] = createContainerContence(metadataElement);
		return dataContainer;
	}

	function getMetadataById(id) {
		return metadataProvider.getMetadataById(id).metadata;
	}

	function getFirstValueById(dataStructure, id) {
		var children = dataStructure.children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.hasOwnProperty(id)) {
				return child[id];
			}
		}
		throw new Error("Id(" + id + ") not found in children to dataStructure");
	}

	function createContainerContence(metadataElement) {
		if (isGroup(metadataElement)) {
			return createGroup(metadataElement);
		}
		// it is a variable
		return "";
	}

	function isGroup(metadataElement) {
		var type = metadataElement.attributes.type;
		if (type === "group" || type === "childGroup") {
			return true;
		}
		return false;
	}

	function createGroup(metadataElement) {
		var dataObj = {};

		// create children list
		dataObj["children"] = createChildList(metadataElement);

		// loop attributes to current group if there are any
		if (hasAttributes(metadataElement)) {
			dataObj["attributes"] = createAttributesContainer(metadataElement);
		}
		return dataObj;
	}

	function createChildList(metadataElement) {
		var childList = [];
		// loop children to current group
		var childReferences = getFirstValueById(metadataElement, 'childReferences');
		for (var i = 0, len = childReferences.children.length; i < len; i++) {
			// current child in loop
			var childReference = childReferences.children[i].childReference;
			var ref = getFirstValueById(childReference, 'ref');
			// can this child repeat
			// var minRepeat = child.repeatMin;
			// for (var i3 = 0, len3 = minRepeat; i3 < len3; i3++){
			// loop out min repeat
			// this.createDataHolderChildren(dataObj["children"],
			// child.ref);
			// TODO: handle getRoot, move up chain to parent use its data id?
			var repeatMin = getFirstValueById(childReference, 'repeatMin');
			for (var i3 = 0, len3 = repeatMin; i3 < len3; i3++) {
				var childContainer = recursivelyCreateDataContainerForElementWithId(ref);
				childList.push(childContainer);
			}
		}
		return childList;
	}

	function hasAttributes(metadataElement) {
		if (hasValueWithId(metadataElement, 'attributeReferences')) {
			return true;
		}
		return false;
	}

	function createAttributesContainer(metadataElement) {
		// create attribute attributeContainer
		var attributeContainer = {};
		var attributeReferences = getFirstValueById(metadataElement, 'attributeReferences');
		for (var i = 0, len = attributeReferences.children.length; i < len; i++) {
			// current child in loop
			var ref = attributeReferences.children[i].ref;
			var attribute = getMetadataById(ref);
			var attributeNameInData = getFirstValueById(attribute, 'nameInData');
			var finalValue = getFirstValueById(attribute, 'finalValue');

			attributeContainer[attributeNameInData] = finalValue;
		}
		return attributeContainer;
	}

	function hasValueWithId(dataStructure, id) {
		var children = dataStructure.children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.hasOwnProperty(id)) {
				return true;
			}
		}
		return false;
	}

	this.getPubSub = function() {
		// priviledged
		return pubSub;
	}

	this.getMetadataId = function() {
		// priviledged
		this.getPubSub();
		return metadataId;
	}
	this.getData = function() {
		return dataContainer;
	}

	this.setValue = function(path, value) {
		var containerList = dataContainer["data"];
		tryToSetValueInContainerListUsingPath(containerList, path, value);
	}

	function tryToSetValueInContainerListUsingPath(dataContainers, path, value) {
		try {
			setValueInContainerListUsingPath(dataContainers, path, value);
		} catch (e) {
			throw new Error("path(" + JSON.stringify(path) + ") not found in dataContainers");
		}

	}
	function setValueInContainerListUsingPath(dataContainers, path, value) {
		// TODO: split findContainerAndAtomicPath into two functions
		var foundContainerAndAtomicPath = findContainerAndAtomicPath(dataContainers, path);
		var containerSpecifiedByPath = foundContainerAndAtomicPath.dataContainer;
		var atomicPath = foundContainerAndAtomicPath.path;
		containerSpecifiedByPath[atomicPath.id] = value;
	}

	function findContainerAndAtomicPath(dataContainers, path) {
		var container = findContainerByPathInCurrentLevel(dataContainers, path);

		if (pathSpecifiesMoreLevels(path)) {
			var containerChildren = container[path.id].children;
			var childPath = path.forChild;
			return findContainerAndAtomicPath(containerChildren, childPath);
		}

		var returnObj = {};
		returnObj.dataContainer = container;
		returnObj.path = path;
		return returnObj;
	}

	function findContainerByPathInCurrentLevel(dataContainers, path) {
		var container = {};
		var foundContainers = findContainersSpecifiedByIdAndAttributes(dataContainers, path);
		if (isPathSpecifyingARepeatingContainer(path)) {
			return foundContainers[path.repeatNo];
		}
		if (listContainsOneElement(foundContainers)) {
			return foundContainers[0];
		}
		throw new Error("path(" + path.id + ") not found dataContainers");
	}

	function findContainersSpecifiedByIdAndAttributes(containers, path) {
		var foundContainers = [];
		for (var i = 0; i < containers.length; i++) {
			var container = containers[i];
			if (containerIsSpecifiedByIdAndAttributes(container, path)) {
				foundContainers.push(container);
			}
		}
		return foundContainers;
	}

	function containerIsSpecifiedByIdAndAttributes(container, path) {
		return containerIsSpecifiedById(container, path)
				&& containerIsSpecifiedByAttributes(container, path);
	}

	function containerIsSpecifiedById(container, path) {
		return container[path.id] !== undefined;
	}
	// TODO: change data format so that id is specified (possibly together with
	// attribute) instead of having a level that only deffines the id
	// {"id":"someId", "attributes":{"anAttribute":"aFinalValue"},"children":[]}
	// and for the atomic values as above but with "value" /"values" instead of
	// children (needs some more thought)
	function containerIsSpecifiedByAttributes(container, path) {
		var attributesOk = true;
		if (containerAndPathHasAttributes(container, path)) {
			return containerHasSameAttributesAsPath(container, path);
		}
		if (containerAndPathDoesNotHaveAttributes(container, path)) {
			return true;
		}
		return false;
	}

	function containerAndPathHasAttributes(container, path) {
		return pathHasAttributes(path) && containerHasAttributes(container[path.id]);
	}

	function containerAndPathDoesNotHaveAttributes(container, path) {
		return pathDoesNotHaveAttributes(path)
				&& containerDoesNotHaveAttributes(container[path.id]);
	}

	function containerHasSameAttributesAsPath(container, path) {
		var containerAttributes = container[path.id].attributes;
		var pathAttributes = path.attributes;
		return containerHasAllPathAttributes(containerAttributes, pathAttributes)
				&& pathHasAllContainerAttributes(containerAttributes, pathAttributes);
	}

	function containerHasAllPathAttributes(containerAttributes, pathAttributes) {
		var pathAttributeKeys = Object.keys(pathAttributes);
		for (var i2 = 0; i2 < pathAttributeKeys.length; i2++) {
			var pathAttributeKey = pathAttributeKeys[i2];
			var pathAttributeValue = pathAttributes[pathAttributeKey];
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
			var attributeFound = false;
			if (pathAttributes[containerAttributeKey] !== containerAttributeValue) {
				return false;
			}
		}
		return true;
	}

	function pathHasAttributes(path) {
		return path.attributes !== undefined;
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
		return path.repeatNo !== undefined;
	}

	function listContainsOneElement(list) {
		return list.length == 1;
	}

	function pathSpecifiesMoreLevels(path) {
		return (path.forChild !== undefined);
	}

	this.addRepeat = function(jsonPath, metadataIdIn) {
		var containerList = dataContainer["data"];
		tryToAddRepeatInContainerListUsingPath(containerList, jsonPath, metadataIdIn);
	}

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