/*
 * Copyright 2016, 2018 Olov McKie
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

			var initializerDep = {
				"recordTypeProvider" : dependencies.recordTypeProvider,
				"metadataProvider" : spec.metadataProvider,
				"pubSub" : spec.pubSub
			};
			var initializerSpec = {
				"metadataId" : ref,
				"path" : path,
				"data" : undefined,
				"repeatId" : undefined
			};

			if (repeatMax !== "1") {
				var startRepeatId = calculateStartRepeatId(currentData.children);
				initializerSpec.repeatId = String(startRepeatId);
			}
			var newPath = calculateNewPath(data.metadataId, data.path, initializerSpec.repeatId);
			
			CORA.metadataRepeatInitializer(initializerDep, initializerSpec);
			
			return initializerSpec.repeatId;

		}

		function calculateStartRepeatId(dataChildrenForMetadata) {
			return calculateStartRepeatIdFromData(dataChildrenForMetadata);
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

		function addAbove(data) {
			// console.log("before addAbove in jsBookkeeper with data:", data)
			var addedRepeatId = add(data);
			// console.log("addAbove after add addedRepeatId:", addedRepeatId)

			var newPath = calculateNewPath(data.metadataId, data.path, addedRepeatId);
			// var newPath = calculatePathForNewRepeatingElement(data.addAbovePath, addedRepeatId);

			// console.log("addAbove after add newPath:", newPath)

			// var newPath2 = JSON.parse(JSON.stringify(data.path));
			// var parentPath = calculateParentPathFromPath(newPath2);
			var parentPath = data.path;

			var moveData = {
				"path" : parentPath,
				"metadataId" : data.metadataId,
				"moveChild" : newPath,
				"basePositionOnChild" : data.addAbovePath,
				"newPosition" : "above"
			};
			// console.log("addAbove call move with moveData:", JSON.stringify(moveData))
			move(moveData);

		}

		// function calculatePathForNewRepeatingElement(addAbovePath, addedRepeatId) {
		// var newPath = JSON.parse(JSON.stringify(addAbovePath));
		// var lowestPath = findLowestPath(newPath);
		// var cLowestPath = CORA.coraData(lowestPath);
		// var lowestRepeatId = cLowestPath.getFirstChildByNameInData("repeatId");
		// lowestRepeatId.value = addedRepeatId;
		// return newPath;
		// }

		// function findLowestPath(pathToSearch) {
		// var coraPath = CORA.coraData(pathToSearch);
		// if (coraPath.containsChildWithNameInData("linkedPath")) {
		// return findLowestPath(coraPath.getFirstChildByNameInData("linkedPath"));
		// }
		// return pathToSearch;
		// }

		// function calculateParentPathFromPath(pathToSearch) {
		// var coraPath = CORA.coraData(pathToSearch);
		// if (coraPath.containsChildWithNameInData("linkedPath")) {
		// var nextLevelDown = coraPath.getFirstChildByNameInData("linkedPath");
		// if (nextLevelDown.containsChildWithNameInData("linkedPath")) {
		// return findLowestPath(nextLevelDown);
		// } else {
		// pathToSearch.removeChild(nextLevelDown);
		// return pathToSearch;
		// }
		// }
		// return pathToSearch;
		// }
		function calculateNewPath(metadataIdToAdd, parentPath, repeatId) {
			return calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd,
					repeatId, parentPath);
		}

		function calculateNewPathForMetadataIdUsingRepeatIdAndParentPath(metadataIdToAdd, repeatId,
				parentPath) {
			var pathSpec = {
				"metadataProvider" : spec.metadataProvider,
				"metadataIdToAdd" : metadataIdToAdd,
				"repeatId" : repeatId,
				"parentPath" : parentPath
			};
			return CORA.calculatePathForNewElement(pathSpec);
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
			move : move,
			addAbove : addAbove
		});
	};
	return cora;
}(CORA));