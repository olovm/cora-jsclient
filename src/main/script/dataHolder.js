/*
 * Copyright 2015 Olov McKie
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
	cora.DataHolder = function (metadataIdIn, metadataProviderIn, pubSubIn) {
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
			var nameInData = getFirstChildByNameInData(metadataElement, 'nameInData');
			var dataContainerPart = {};
			dataContainerPart.name = nameInData.value;

			addContainerContentFromElement(dataContainerPart, metadataElement);
			return dataContainerPart;
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
			var type = metadataElement.attributes.type;
			if (type === "group" || type === "childGroup") {
				return true;
			}
			return false;
		}

		function addGroupParts(dataContainerPart, metadataElement) {
//			dataContainerPart.children = createChildList(metadataElement);
			dataContainerPart.children = []
			
			if (hasAttributes(metadataElement)) {
				dataContainerPart.attributes = createAttributesContainer(metadataElement);
			}
		}

		function createChildList(metadataElement) {
			var childList = [];
			// loop children to current group
			var childReferences = getFirstChildByNameInData(metadataElement, 'childReferences');
			childReferences.children.forEach(function(childReference) {
				childList = childList.concat(createChild(childReference));
			});
			return childList;
		}

		function createChild(childReference) {
			var outList = [];
			var ref = getFirstAtomicValueByNameInData(childReference, 'ref');
			var repeatMin = getFirstAtomicValueByNameInData(childReference, 'repeatMin');
			var canRepeat = canChildReferenceRepeat(childReference);
			for (var i3 = 0; i3 < repeatMin; i3++) {
				var childContainer = createDataContainerForElementWithId(ref);
				if (canRepeat) {
					childContainer.repeatId = String(i3);
				}
				outList.push(childContainer);
			}
			return outList;
		}
		function canChildReferenceRepeat(childReference) {
			var repeatMax = getFirstAtomicValueByNameInData(childReference, 'repeatMax');
			if("X"===repeatMax){
				return true;
			}
			return repeatMax > 1;
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
			var attributeReferences = getFirstChildByNameInData(metadataElement,
					'attributeReferences');
			attributeReferences.children.forEach(function(attributeReference) {
				var ref = attributeReference.value;
				var attribute = getMetadataById(ref);
				var attributeNameInData = getFirstAtomicValueByNameInData(attribute, 'nameInData');
				var finalValue = getFirstAtomicValueByNameInData(attribute, 'finalValue');

				attributeContainer[attributeNameInData] = finalValue;

			});

			return attributeContainer;
		}

		function dataStructureContainsChild(dataStructure, name) {
			var children = dataStructure.children;
			return children.some(function(child) {
				return child.name === name;
			});
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

		function tryToSetValueInContainerListUsingPath(dataContainerPart, path, value) {
			try {
				setValueInContainerListUsingPath(dataContainerPart, path, value);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataContainers:"+e);
			}
		}

		function setValueInContainerListUsingPath(dataContainers, path, value) {
			// TODO: split findContainerAndAtomicPath into two functions
			var foundContainerAndAtomicPath = findContainerAndAtomicPath(dataContainers, path);
			var containerSpecifiedByPath = foundContainerAndAtomicPath.dataContainer;
			containerSpecifiedByPath.value = value;
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
			var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(dataContainers,
					path);
			if (isPathSpecifyingARepeatingContainer(path)) {
				return foundContainers[getFirstChildByNameInData(path, "repeatId").value];
			}
			if (listContainsOneElement(foundContainers)) {
				return foundContainers[0];
			}
			throw new Error("path(" + JSON.stringify(path) + ") not found dataContainers");
		}

		function findContainersSpecifiedByNameInDataAndAttributes(containers, path) {
			var foundContainers = [];
			containers.forEach(function(container) {
				if (containerIsSpecifiedByNameInDataAndAttributes(container, path)) {
					if (isPathSpecifyingARepeatingContainer(path)) {
						foundContainers[container.repeatId] = container;
					} else {
						foundContainers.push(container);
					}
				}
			});

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
			return pathAttributes.every(function(pathAttribute) {
				var pathAttributeKey = getFirstAtomicValueByNameInData(pathAttribute,
						"attributeName");
				var pathAttributeValue = getFirstAtomicValueByNameInData(pathAttribute,
						"attributeValue");
				return containerAttributes[pathAttributeKey] === pathAttributeValue;
			});
		}

		function pathHasAllContainerAttributes(containerAttributes, pathAttributes) {
			var containerAttributeKeys = Object.keys(containerAttributes);
			return containerAttributeKeys.every(function(containerAttributeKey) {
				var containerAttributeValue = containerAttributes[containerAttributeKey];
				return pathAttributesHasNameAndValue(pathAttributes, containerAttributeKey,
						containerAttributeValue);
			});
		}

		function pathAttributesHasNameAndValue(pathAttributes, name, value) {
			return pathAttributes.some(function(pathAttribute) {
				var pathAttributeKey = getFirstAtomicValueByNameInData(pathAttribute,
						"attributeName");
				var pathAttributeValue = getFirstAtomicValueByNameInData(pathAttribute,
						"attributeValue");
				return pathAttributeKey === name && pathAttributeValue === value;
			});
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

		this.addChild = function(parentPath, metadataIdToAdd, repeatId) {
			tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
		};

		function tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId) {
			try {
				addChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(parentPath) + ") not found in dataContainers:"+e);
			}
		}

		function addChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId) {
			var containerSpecifiedByPath = dataContainer;
			if(parentPath.children !== undefined){
				var foundContainerAndAtomicPath = findContainerAndAtomicPath(dataContainer.children,
						parentPath);
				containerSpecifiedByPath = foundContainerAndAtomicPath.dataContainer;
			}
			var newRepeat = createDataContainerForElementWithId(metadataIdToAdd);
			newRepeat.repeatId = repeatId;
			containerSpecifiedByPath.children.push(newRepeat);
		}
	};
	return cora;
}(CORA || {}));