/*
 * Copyright 2016 Olov McKie
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
	cora.jsBookkeeper = function(dependencies, spec) {
		var pubSub = spec.pubSub;

		function setValue(data) {
			pubSub.publish("setValue", data);
		}

		function add(data) {
			var childReference = data.childReference;
			var path = data.path;
			var currentData = spec.dataHolder.getData();
			if (path.children !== undefined) {
				currentData = spec.dataHolder.findContainer(currentData, path);
			}
			var cChildReference = CORA.coraData(childReference);
			var cRef = CORA.coraData(cChildReference.getFirstChildByNameInData("ref"));
			var ref = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
			var repeatMax = cChildReference.getFirstAtomicValueByNameInData('repeatMax');
			if (repeatMax === "1") {
				CORA.metadataRepeatInitializer(dependencies, ref, path, undefined, undefined,
						spec.metadataProvider, spec.pubSub);
			} else {
				var startRepeatId = calculateStartRepeatId(currentData.children);
				CORA.metadataRepeatInitializer(dependencies, ref, path, undefined, String(startRepeatId),
						spec.metadataProvider, spec.pubSub);
				return String(startRepeatId);
			}
		}

		function calculateStartRepeatId(dataChildrenForMetadata) {
			var generatedRepeatId = calculateStartRepeatIdFromData(dataChildrenForMetadata);
			return generatedRepeatId;
		}

		function calculateStartRepeatIdFromData(dataChildrenForMetadata) {
			var currentMaxRepeatId = 0;
			dataChildrenForMetadata.forEach(function(child) {
				currentMaxRepeatId = calculateMaxRepeatFromChildAndCurrentMaxRepeat(child,
						currentMaxRepeatId);
			});
			return currentMaxRepeatId;
		}

		function calculateMaxRepeatFromChildAndCurrentMaxRepeat(child, currentMaxRepeatId) {
			var x = Number(child.repeatId);
			if (!isNaN(x) && x >= currentMaxRepeatId) {
				x++;
				return x;
			}
			return currentMaxRepeatId;
		}

		function remove(data) {
			pubSub.publish("remove", data);
			pubSub.unsubscribePathBelow(data.path);
		}

		function move(data) {
			pubSub.publish("move", data);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		return Object.freeze({
			"type" : "jsBookkeeper",
			getDependencies : getDependencies,
			getSpec : getSpec,
			setValue : setValue,
			add : add,
			remove : remove,
			move : move
		});
	};
	return cora;
}(CORA));