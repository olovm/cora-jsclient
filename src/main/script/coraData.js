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
		
		this.getData = function(){
			return data;
		};
		
		this.containsChildWithNameInData = function(name) {
			var children = data.children;
			return children.some(function(child) {
				return child.name === name;
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

			throw new Error("name(" + nameInData + ") with index (" + index+
					") not found in children to dataStructure");
		};

		this.getAtomicValueByNameInDataAndIndex = function(name, index) {
			return this.getChildByNameInDataAndIndex(name, index).value;
		};
	};
	return cora;
}(CORA || {}));