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
	cora.dataHolder = function(spec) {
		var metadataId = spec.metadataId;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var dataContainer = createMainDataContainerWithChildrenAndAttributes();

		subscribeToAddAndSetValueAndRemoveMessagesForAllPaths();

		function createMainDataContainerWithChildrenAndAttributes() {
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
			return CORA.coraData(metadataProvider.getMetadataById(id));
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

		function subscribeToAddAndSetValueAndRemoveMessagesForAllPaths() {
			pubSub.subscribe("*", {}, undefined, handleMsg);
		}

		function handleMsg(dataFromMsg, msg) {
			if (msg.endsWith("add")) {
				addChild(dataFromMsg.path, dataFromMsg.metadataId, dataFromMsg.repeatId);
			} else if (msg.endsWith("setValue")) {
				setValue(dataFromMsg.path, dataFromMsg.data);
			} else {
				remove(dataFromMsg.path);
			}
		}

		function getData() {
			return dataContainer;
		}

		function setValue(path, value) {
			try {
				setValueInContainerListUsingPath(path, value);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder:" + e);
			}
		}

		function setValueInContainerListUsingPath(path, value) {
			var foundContainer = findContainer(dataContainer, path);
			foundContainer.value = value;
		}

		function findContainer(dataContainers, path) {
			return findContainerAndParent(dataContainers, path).container;
		}

		function findContainerAndParent(dataContainers, path) {
			var cpath = CORA.coraData(path);
			var container = findContainerByPathInCurrentLevel(dataContainers, cpath);

			if (pathSpecifiesMoreLevels(cpath)) {
				var childPath = cpath.getFirstChildByNameInData("linkedPath");
				return findContainerAndParent(container, childPath);
			}
			return {
				"parent" : dataContainers,
				"container" : container
			};
		}

		function findContainerByPathInCurrentLevel(dataContainers, path) {
			var nameInData = path.getFirstAtomicValueByNameInData("nameInData");
			if (path.containsChildWithNameInData("attributes")) {
				var attributes = path.getFirstChildByNameInData("attributes");
			}
			if (path.containsChildWithNameInData("repeatId")) {
				var repeatId = path.getFirstAtomicValueByNameInData("repeatId");
			}
			var cdataContainers = CORA.coraData(dataContainers);

			return cdataContainers.getFirstChildByNameInDataAndAttributesAndRepeatId(nameInData,
					attributes, repeatId);
		}

		function pathSpecifiesMoreLevels(path) {
			return path.containsChildWithNameInData("linkedPath");
		}

		function addChild(parentPath, metadataIdToAdd, repeatId) {
			tryToAddChildInContainerListUsingPath(parentPath, metadataIdToAdd, repeatId);
		}

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
			if (repeatId !== undefined) {
				newRepeat.repeatId = repeatId;
			}
			containerSpecifiedByPath.children.push(newRepeat);
		}

		function remove(path) {
			try {
				removeContainerWithPath(path);
			} catch (e) {
				throw new Error("path(" + JSON.stringify(path) + ") not found in dataHolder"
						+ " when trying to remove:" + e);
			}
		}

		function removeContainerWithPath(path) {
			var containerAndParent = findContainerAndParent(dataContainer, path);
			var parentContainer = containerAndParent.parent.children;
			var containerIndexInParent = parentContainer.indexOf(containerAndParent.container);
			parentContainer.splice(containerIndexInParent, 1);
		}

		return Object.freeze({
			handleMsg : handleMsg,
			getData : getData,
			setValue : setValue,
			addChild : addChild,
			remove : remove,
			findContainer : findContainer
		});
	};
	return cora;
}(CORA));