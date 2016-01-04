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

		var ref = childReference.getFirstAtomicValueByNameInData('ref');
		var nameInData = getNameInDataForMetadataId(ref);

		initializeChild();

		function getNameInDataForMetadataId() {
			var metadataElement = getMetadataById(ref);
			return metadataElement.getFirstAtomicValueByNameInData("nameInData");
		}

		function initializeChild() {
			if (childCanRepeat()) {
				initializeRepeatingChild();
			} else {
				initializeNonRepeatingChild();
			}
		}

		function initializeRepeatingChild() {
			var generatedRepeatId = calculateStartRepeatId();
			var repeatMin = calculateMinRepeat();

			for (var i = 0; i < repeatMin; i++) {
				if (hasDataForRepeatingChild(i)) {
					initializeRepeatingChildInstanceWithData(i);
				} else {
					initializeRepeatingChildInstanceWithoutData(generatedRepeatId);
					generatedRepeatId++;
				}
			}
		}

		function hasDataForRepeatingChild(index) {
			return hasData() && data.containsChildWithNameInDataAndIndex(nameInData, index);
		}

		function calculateStartRepeatId() {
			var generatedRepeatId = 0;
			if (hasData()) {
				generatedRepeatId = calculateStartRepeatIdFromData();
			}
			return generatedRepeatId;
		}

		function calculateStartRepeatIdFromData() {
			var currentMaxRepeatId = 0;
			var data2 = data.getData();
			data2.children.forEach(function(child) {
				currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
						currentMaxRepeatId);
			});
			return currentMaxRepeatId;
		}

		function calculateMaxRepeatFromChildAndCurrentMaxRepeat(child, currentMaxRepeatId) {
			if (child.name == nameInData) {
				var x = Number(child.repeatId);
				if (!isNaN(x) && x > currentMaxRepeatId) {
					x++;
					return x;
				}
			}
			return currentMaxRepeatId;
		}

		function calculateMinRepeat() {
			var repeatMin = childReference.getFirstAtomicValueByNameInData("repeatMin");
			if (hasData()) {
				var noOfData = data.getNoOfChildrenWithNameInData(nameInData);
				if (noOfData > repeatMin) {
					repeatMin = noOfData;
				}
			}
			return repeatMin;
		}

		function initializeRepeatingChildInstanceWithData(index) {
			var dataChild = data.getChildByNameInDataAndIndex(nameInData, index);
			var repeatId = dataChild.repeatId;
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId);
		}

		function initializeRepeatingChildInstanceWithoutData(generatedRepeatId) {
			var repeatIdString = String(generatedRepeatId);
			initializeForMetadataWithIdAndDataAndRepeatId(undefined, repeatIdString);
		}

		function initializeNonRepeatingChild() {
			if (hasDataForNonRepeatingChild()) {
				initializeNonRepeatingChildInstanceWithData();
			} else {
				initializeForMetadataWithIdAndDataAndRepeatId();
			}
		}
		function hasDataForNonRepeatingChild() {
			return hasData() && data.containsChildWithNameInData(nameInData);
		}
		function initializeNonRepeatingChildInstanceWithData() {
			var dataChild = data.getFirstChildByNameInData(nameInData);
			initializeForMetadataWithIdAndDataAndRepeatId(dataChild);
		}

		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}

		function hasData() {
			return data.getData() !== undefined;
		}

		function childCanRepeat() {
			var repeatMax = childReference.getFirstAtomicValueByNameInData("repeatMax");
			return repeatMax === "X" || repeatMax > 1;
		}

		function initializeForMetadataWithIdAndDataAndRepeatId(dataChild, repeatId) {
			new CORA.metadataRepeatInitializer(ref, path, dataChild, repeatId, metadataProvider,
					pubSub);
		}

	};
	return cora;
}(CORA || {}));