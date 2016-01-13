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
	cora.CoraData = function(dataIn) {
		var data = dataIn;

		this.getData = function() {
			return data;
		};

		this.containsChildWithNameInData = function(nameInData) {
			var children = data.children;
			return children.some(function(child) {
				return child.name === nameInData;
			});
		};

		this.getFirstChildByNameInData = function(name) {
			var children = data.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === name) {
					return child;
				}
			}
			throw new Error("name(" + name + ") not found in children to dataStructure");
		};

		this.getFirstAtomicValueByNameInData = function(name) {
			return this.getFirstChildByNameInData(name).value;
		};

		this.getNoOfChildrenWithNameInData = function(nameInData) {
			var found = 0;
			var children = data.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					found++;
				}
			}
			return found;
		};

		this.containsChildWithNameInDataAndAttributes = function(nameInData, attributes) {
			var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(nameInData,
					attributes);
			// if (isPathSpecifyingARepeatingContainer(path)) {
			// return foundContainers[getFirstChildByNameInData(path,
			// "repeatId").value];
			// return foundContainers[getFirstChildByNameInData(path,
			// "repeatId").value];
			// }
			// if (listContainsOneElement(foundContainers)) {
			// return foundContainers[0];
			// }
			// throw new Error("path(" + JSON.stringify(path) + ") not found
			// dataContainers");
			if (foundContainers.length > 0) {
				return true;
			}
			return false;
		};
		this.getFirstChildByNameInDataAndAttributes = function(nameInData, attributes) {
			var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(nameInData,
					attributes);
			// if (isPathSpecifyingARepeatingContainer(path)) {
			// return foundContainers[getFirstChildByNameInData(path,
			// "repeatId").value];
			// return foundContainers[getFirstChildByNameInData(path,
			// "repeatId").value];
			// }
			// if (listContainsOneElement(foundContainers)) {
			// return foundContainers[0];
			// }
			if (foundContainers.length > 0) {
				return foundContainers[0];
			}
			throw new Error("nameInData(" + nameInData + ") and attributes ("
					+ JSON.stringify(attributes) + ") not found in coraData");
		};
		function findContainersSpecifiedByNameInDataAndAttributes(nameInData, attributes) {
			var foundContainers = [];
			var children = data.children;
			children.forEach(function(child) {
				if (containerIsSpecifiedByNameInDataAndAttributes(child, nameInData, attributes)) {
					// if (isPathSpecifyingARepeatingContainer(path)) {
					if (false) {
						foundContainers[child.repeatId] = child;
					} else {
						foundContainers.push(child);
					}
				}
			});

			return foundContainers;
		}

		function containerIsSpecifiedByNameInDataAndAttributes(container, nameInData, attributes) {
			return containerIsSpecifiedByNameInData(container, nameInData)
					&& containerIsSpecifiedByAttributes(container, attributes);
		}

		function containerIsSpecifiedByNameInData(container, nameInData) {
			return container.name === nameInData;
		}

		function containerIsSpecifiedByAttributes(container, attributes) {
			if (containerAndPathHasAttributes(container, attributes)) {
				return containerHasSameAttributesAsPath(container, attributes);
			}
			if (containerAndPathDoesNotHaveAttributes(container, attributes)) {
				return true;
			}
			return false;
		}

		function containerAndPathHasAttributes(container, attributes) {
			return attributesConatainsAttributes(attributes) && containerHasAttributes(container);
		}

		function containerAndPathDoesNotHaveAttributes(container, attributes) {
			return attributesConatainsNoAttributes(attributes)
					&& containerDoesNotHaveAttributes(container);
		}

		function containerHasSameAttributesAsPath(container, attributes) {
			var containerAttributes = container.attributes;
			var pathAttributes = attributes.children;
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

		function attributesConatainsNoAttributes(attributes) {
			return !attributesConatainsAttributes(attributes);
		}

		function attributesConatainsAttributes(attributes) {
			if (attributes === undefined) {
				return false;
			}
			if (attributes.children !== undefined && attributes.children.length === 0) {
				return false;
			}
			return true;
		}

		function containerHasAttributes(container) {
			return container.attributes !== undefined;
		}

		function containerDoesNotHaveAttributes(container) {
			return !containerHasAttributes(container);
		}

		this.containsChildWithNameInDataAndIndex = function(nameInData, index) {
			var found = 0;
			var children = data.children;
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
		};

		this.getChildByNameInDataAndIndex = function(nameInData, index) {
			var found = 0;
			var children = data.children;
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
		};

		this.getAtomicValueByNameInDataAndIndex = function(name, index) {
			return this.getChildByNameInDataAndIndex(name, index).value;
		};
	};
	return cora;
}(CORA || {}));