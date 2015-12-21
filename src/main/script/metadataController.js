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
	cora.MetadataController = function (metadataIdIn, metadataProviderIn, pubSubIn, dataIn) {
		var metadataId = metadataIdIn;
		var metadataProvider = metadataProviderIn;
		var pubSub = pubSubIn;
		var data = dataIn;
		var hasInitialData = dataIn !== undefined;
//		console.log("DataInDataInDataInDataInDataInDataIn:"+dataIn);
//		console.log("datadatadatadatadatadatadatadatadatadatadata:"+data);
	
		
		
		recursivelyInitializeForMetadataWithId(metadataId);
		

		function recursivelyInitializeForMetadataWithId(metadataId) {
			var metadataElement = getMetadataById(metadataId);
			
			if(isGroup(metadataElement)){
				recursivelyInitializeGroup(metadataElement);
			}
			
//			var nameInData = getFirstChildByNameInData(metadataElement, 'nameInData');
//			var dataContainerPart = {};
//			dataContainerPart.name = nameInData.value;

			var path = {};
			var message = {"data":data, "metadataId":metadataId, "path":path};
			pubSub.publish("add", message);
			addContainerContenceFromElement(metadataElement);
//			return dataContainerPart;
		}

		function getMetadataById(id) {
			return metadataProvider.getMetadataById(id);
		}
		
		function isGroup(metadataElement) {
			var type = metadataElement.attributes.type;
			if (type === "group" || type === "childGroup") {
				return true;
			}
			return false;
		}

//		function getFirstChildByNameInData(dataStructure, name) {
//			var children = dataStructure.children;
//			for (var i = 0; i < children.length; i++) {
//				var child = children[i];
//				if (child.name === name) {
//					return child;
//				}
//			}
//
//			throw new Error("name(" + name + ") not found in children to dataStructure");
//		}

		function addContainerContenceFromElement(metadataElement) {
//			var message = {"type": "add","metadataElement":metadataElement};
//			var message = {"metadataElement":metadataElement, "data":data};
			console.log("data2data2data2data2data2data2data2data2data2:"+data);
//			if (isGroup(metadataElement)) {
//				addGroupParts(dataContainerPart, metadataElement);
//				return dataContainerPart;
				
//			}

//			// it is a variable
//			dataContainerPart.value = "";
//			return dataContainerPart;
			
		}
	};
	return cora;
}(CORA || {}));