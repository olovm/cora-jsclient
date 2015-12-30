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
	cora.MetadataChildInitializer = function(childReferenceIn, path, dataIn, metadataProvider,
			pubSub) {

		var childReference = new CORA.CoraData(childReferenceIn);
		var data = new CORA.CoraData(dataIn);
		
		var hasData = data.getData() !== undefined;

		var ref = childReference.getFirstAtomicValueByNameInData('ref');
		var metadataElement = getMetadataById(ref);
		var nameInData = metadataElement.getFirstAtomicValueByNameInData("nameInData");

		var generatedRepeatId = 0;
		var dataChild = undefined;
		if (hasData) {
			generatedRepeatId = calculateMaxRepeatIdFromData();
		}
		if (shouldRepeat()) {
			var repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			if (hasData) {
				var noOfData = data.getNoOfChildrenWithNameInData(nameInData);
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
			}
			for (var i = 0; i < repeatMin; i++) {
				dataChild = undefined;
				var repeatId;
				if (hasData && data.containsChildWithNameInDataAndIndex(nameInData, i)) {
					dataChild = data.getChildByNameInDataAndIndex(nameInData, i);
					repeatId = dataChild.repeatId;
				} else {
					repeatId = String(generatedRepeatId);
					generatedRepeatId++;
				}
				recursivelyInitializeForMetadataWithId(ref,  dataChild, repeatId);
			}
		} else {

			if (hasData && data.containsChildWithNameInData(nameInData)) {
				dataChild = data.getFirstChildByNameInData(nameInData);
			}
			recursivelyInitializeForMetadataWithId(ref, dataChild);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function shouldRepeat() {
			var repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || repeatMax > 1;
		}

		function calculateMaxRepeatIdFromData() {
			var data2 = data.getData();
			var currentMaxRepeatId = 0;
			var children = data2.children;
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.name === nameInData) {
					var x = Number(child.repeatId);
					if (!isNaN(x) && x > currentMaxRepeatId) {
						currentMaxRepeatId = x;
						currentMaxRepeatId++;
					}
				}
			}
			return currentMaxRepeatId;
		}
		
		function recursivelyInitializeForMetadataWithId(metadataId,  dataChild, repeatId) {
			new CORA.metadataRepeatInitializer(metadataId, path, dataChild, repeatId, metadataProvider,
					pubSub);
		}
		
	};
	return cora;
}(CORA || {}));