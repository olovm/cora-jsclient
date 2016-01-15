/*
 * Copyright 2015 Olov McKie
 * Copyright 2016 Uppsala University Library
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
		var children = data && data.children;

		this.getData = function() {
			return data;
		};

		this.containsChildWithNameInData = function(nameInData) {
			var filter = createNameInDataFilter(nameInData);
			return children.some(filter);
		};

		function createNameInDataFilter(nameInDataIn) {
			return function(child) {
				return child.name === nameInDataIn;
			};
		}

		this.getFirstChildByNameInData = function(nameInData) {
			return getFirstChildByNameInData(data, nameInData);
		};

		this.getFirstAtomicValueByNameInData = function(name) {
			return this.getFirstChildByNameInData(name).value;
		};

		this.getNoOfChildrenWithNameInData = function(nameInData) {
			var filter = createNameInDataFilter(nameInData);
			var childrenWithNameInData = children.filter(filter);
			return childrenWithNameInData.length;
		};

		this.containsChildWithNameInDataAndAttributes = function(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.some(filter);
		};

		function createNameInDataAndAttributesFilter(nameInDataIn, attributes) {
			var filter = createNameInDataFilter(nameInDataIn);
			var attributesFilter = createAttributesFilter(attributes);
			return function(child) {
				if (filter(child) && attributesFilter(child)) {
					return true;

				}
				return false;
			};
		}

		function createAttributesFilter(attributes) {
			return function(child) {
				return containerIsSpecifiedByAttributes(child, attributes);
			};
		}

		this.getChildrenByNameInDataAndAttributes = function(nameInData, attributes) {
			var foundContainers = findContainersSpecifiedByNameInDataAndAttributes(nameInData,
					attributes);
			if (foundContainers.length > 0) {
				return foundContainers;
			}
			throw new Error("nameInData(" + nameInData + ") and attributes ("
					+ JSON.stringify(attributes) + ") not found in coraData");
		};
		this.getFirstChildByNameInDataAndAttributes = function(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("nameInData(" + nameInData + ") and attributes ("
					+ JSON.stringify(attributes) + ") not found in coraData");
		};

		function findContainersSpecifiedByNameInDataAndAttributes(nameInData, attributes) {
			var filter = createNameInDataAndAttributesFilter(nameInData, attributes);
			return children.filter(filter);
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
		function getFirstChildByNameInData(dataStructure, nameInData) {
			var children = dataStructure.children;
			var filter = createNameInDataFilter(nameInData);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}

			throw new Error("name(" + nameInData + ") not found in children to coraData");
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
			var filter = new createNameInDataAndIndexFilter(nameInData, index);
			return children.some(filter);
		};

		function createNameInDataAndIndexFilter(nameInDataIn, index) {
			var found = 0;
			var filter = createNameInDataFilter(nameInDataIn);
			return function(child) {
				if (filter(child)) {
					if (found === index) {
						return true;
					}
					found++;
				}
				return false;
			};
		}

		this.getChildByNameInDataAndIndex = function(nameInData, index) {
			var filter = new createNameInDataAndIndexFilter(nameInData, index);
			var foundChild = children.find(filter);
			if (foundChild !== undefined) {
				return foundChild;
			}
			throw new Error("name(" + nameInData + ") with index (" + index
					+ ") not found in children to coraData");
		};

		this.getAtomicValueByNameInDataAndIndex = function(name, index) {
			return this.getChildByNameInDataAndIndex(name, index).value;
		};
	};
	return cora;
}(CORA || {}));