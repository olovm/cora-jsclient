/*
 * Copyright 2015, 2016 Olov McKie
 * Copyright 2015 Uppsala University Library
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

function MetadataProviderStub() {
	// function createRecordInfoJson(id) {
	// return '{"recordInfo":{"children":[{"id":"' + id +
	// '"},{"type":"metadata"},'
	// + '{"createdBy":"userId"},{"updatedBy":"userId"}]}}';
	// }
	// function createNameInDataTextIdDefTextId(id) {
	// return '{"nameInData":"' + id + '"},{"textId":"' + id +
	// 'Text"},{"defTextId":"' + id
	// + 'DeffText"}';
	// }
	function createRecordInfoJson(id) {
		return {
			"name" : "recordInfo",
			"children" : [ {
				"name" : "id",
				"value" : id
			}, {
				"name" : "type",
				"value" : "metadataGroup"
			}, {
				"name" : "createdBy",
				"value" : "userId"
			}, {
				"name" : "updatedBy",
				"value" : "userId"
			} ]
		};
	}
	function createNameInDataTextIdDefTextId2(id) {
		return [ {
			"name" : "nameInData",
			"value" : id
		}, {
			"name" : "textId",
			"value" : id + "Text"
		}, {
			"name" : "defTextId",
			"value" : id + "DefText"
		} ];
	}
	function createChildReferenceWithRefAndRepeatId1to1(ref, repeatId) {
		return createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(ref, repeatId, "1",
				"1");
	}
	function createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(ref, repeatId,
			repeatMin, repeatMax) {
		return {
			"name" : "childReference",
			"repeatId" : repeatId,
			"children" : [ {
				"name" : "ref",
				"value" : ref
			}, {
				"name" : "repeatMin",
				"value" : repeatMin
			}, {
				"name" : "repeatMax",
				"value" : repeatMax
			} ]
		};
	}
	function createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet) {
		return [ createRecordInfoJson(idToGet) ].concat(createNameInDataTextIdDefTextId2(idToGet));
	}
	this.getMetadataById = function(idToGet) {
		if (idToGet === "textVariableId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}

			};
		}
		if (idToGet === "textVariableId2") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}

			};
		}
		if (idToGet === "yesNoUnknownVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownVar"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "textId",
					"value" : "yesNoUnknownVarText"
				}, {
					"name" : "defTextId",
					"value" : "yesNoUnknownVarDefText"
				}, {
					"name" : "refCollectionId",
					"value" : "yesNoUnknownCollection"
				} ],
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "yesNoUnknownCollection") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownCollection"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yesNoUnknownCollection"
				}, {
					"name" : "textId",
					"value" : "itemYesNoUnknownText"
				}, {
					"name" : "defTextId",
					"value" : "itemYesNoUnknownDefText"
				}, {
					"name" : "collectionItemReferences",
					"children" : [ {
						"name" : "ref",
						"repeatId" : "0",
						"value" : "itemYes"
					}, {
						"name" : "ref",
						"repeatId" : "1",
						"value" : "itemNo"
					}, {
						"name" : "ref",
						"repeatId" : "2",
						"value" : "itemUnknown"
					} ]
				} ],
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		}
		if (idToGet === "itemYes") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemYes"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "yes"
				}, {
					"name" : "textId",
					"value" : "itemYesText"
				}, {
					"name" : "defTextId",
					"value" : "itemYesDefText"
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "recordTypeTypeChoice1") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeChoice1"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "aFinalValue"
				}, {
					"name" : "textId",
					"value" : "itemYesText"
				}, {
					"name" : "defTextId",
					"value" : "itemYesDefText"
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "recordTypeTypeChoice2") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeChoice2"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "aOtherFinalValue"
				}, {
					"name" : "textId",
					"value" : "itemYesText"
				}, {
					"name" : "defTextId",
					"value" : "itemYesDefText"
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "itemNo") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemNo"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "no"
				}, {
					"name" : "textId",
					"value" : "itemNoText"
				}, {
					"name" : "defTextId",
					"value" : "itemNoDefText"
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "itemUnknown") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "itemUnknown"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "unknown"
				}, {
					"name" : "textId",
					"value" : "itemUnknownText"
				}, {
					"name" : "defTextId",
					"value" : "itemUnknownDefText"
				} ],
				"attributes" : {
					"type" : "collectionItem"
				}
			};
		}
		if (idToGet === "groupIdOneTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("textVariableId", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupId1toXCollectionChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"yesNoUnknownVar", "1", "1", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"groupIdOneTextChild", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupIdTwoTextChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1("textVariableId", "1"),
							createChildReferenceWithRefAndRepeatId1to1("textVariableId2", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdTwoTextChild1to1InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"groupIdTwoTextChild", "1", "1", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVariableIdRepeat1to3InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVariableId", "1", "1", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdTwoTextChildRepeat1to5") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVariableId", "1", "1", "5"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVariableId2", "1", "1", "5") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat1toX") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVariableId", "1", "1", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat0to1") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVariableId", "1", "0", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat3to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVariableId", "1", "3", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneTextChildRepeat1to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVariableId", "1", "1", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupIdOneChildGroupRepeat3to3") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"groupIdOneTextChild", "1", "3", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "anAttribute") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aFinalValue"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "groupIdOneTextChildOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "attributeReferences",
					"children" : [ {
						"name" : "ref",
						"value" : "anAttribute",
						"repeatId" : "1"
					} ]

				}, {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatId1to1("textVariableId", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupInGroupOneTextChildOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatId1to1("groupIdOneTextChildOneAttribute",
							"1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "anOtherAttribute") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aOtherFinalValue"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
		}
		if (idToGet === "groupIdOneTextChildTwoAttributes") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"name" : "attributeReferences",
							"children" : [ {
								"name" : "ref",
								"value" : "anAttribute",
								"repeatId" : "1"
							}, {
								"name" : "ref",
								"value" : "anOtherAttribute",
								"repeatId" : "2"
							} ]

						},
						{
							"name" : "childReferences",
							"children" : [ createChildReferenceWithRefAndRepeatId1to1(
									"textVariableId", "1") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChildTwoAttributes") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1(
							"groupIdOneTextChildTwoAttributes", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "groupInGroupOneTextChildRepeat1to3OneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"groupIdOneTextChildOneAttribute", "1", "1", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}

		if (idToGet === "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "1", "1", "3") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVarRepeat1to3InGroupOneAttribute", "1", "0", "2") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"name" : "attributeReferences",
							"children" : [ {
								"name" : "ref",
								"value" : "anAttribute",
								"repeatId" : "1"
							} ]

						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVar", "1", "1", "3") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupParentAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"name" : "attributeReferences",
							"children" : [ {
								"name" : "ref",
								"value" : "recordTypeParentCollectionVar",
								"repeatId" : "1"
							} ]

						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVar", "1", "1", "3") ]
						} ]
						// .concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("textVarRepeat1to3InGroupOneAttribute"))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVarRepeat1to3InGroupOneAttribute", "1", "0", "2"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVarRepeat1to3InGroupOtherAttribute", "1", "0", "2") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat1to1InGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVarRepeat1to3InGroupOneAttribute", "1", "1", "1"),
							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVarRepeat1to3InGroupOtherAttribute", "1", "1", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupParentAttribute1toXInGroup") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [

					createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"textVarRepeat1to3InGroupParentAttribute", "1", "1", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "textVarRepeat1to3InGroupOtherAttribute") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"name" : "attributeReferences",
							"children" : [ {
								"name" : "ref",
								"value" : "anOtherAttribute",
								"repeatId" : "1"
							} ]

						},
						{
							"name" : "childReferences",
							"children" : [

							createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
									"textVar", "1", "1", "3") ]
						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("textVarRepeat1to3InGroupOneAttribute"))
			};
		}
		if (idToGet === "textVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))

			};
		}

		if (idToGet === "brokenMetadataNoNameInData") {
			return {
				"name" : "metadata",
				"children" : [ {
					"nameInData_NOT_HERE" : "metadata"
				}, {
					"textId" : "metadataText"
				}, {
					"defTextId" : "metadataDeffText"
				}, {
					"attributeReferences" : {
						"children" : [ {
							"ref" : "recordTypeTypeCollectionVar"
						} ]
					}
				}, {
					"childReferences" : {
						"children" : [ {
							"childReference" : {
								"children" : [ {
									"ref" : "recordInfoNew"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "nameInData"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "textId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "defTextId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "attributeReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "childReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						} ]
					}
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "metadataNew") {
			return {
				"name" : "metadata",
				"children" : [ {
					"nameInData" : "metadata"
				}, {
					"textId" : "metadataText"
				}, {
					"defTextId" : "metadataDeffText"
				}, {
					"attributeReferences" : {
						"children" : [ {
							"ref" : "recordTypeTypeCollectionVar"
						} ]
					}
				}, {
					"childReferences" : {
						"children" : [ {
							"childReference" : {
								"children" : [ {
									"ref" : "recordInfoNew"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "nameInData"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "textId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "defTextId"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "attributeReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						}, {
							"childReference" : {
								"children" : [ {
									"ref" : "childReferences"
								}, {
									"repeatMin" : "1"
								}, {
									"repeatMax" : "1"
								} ]
							}
						} ]
					}
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordTypeOnlyMetadataIdChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("metadataId", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "metadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordTypeOnlyMetadataIdPresentationViewIdChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("metadataId", "1"),
							createChildReferenceWithRefAndRepeatId1to1("presentationViewId", "2") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "presentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordType") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [
							createChildReferenceWithRefAndRepeatId1to1("metadataId", "1"),
							createChildReferenceWithRefAndRepeatId1to1("recordInfo", "2")

							,
							createChildReferenceWithRefAndRepeatId1to1("presentationViewId", "3"),
							createChildReferenceWithRefAndRepeatId1to1("presentationFormId", "4"),
							createChildReferenceWithRefAndRepeatId1to1("newMetadataId", "5"),
							createChildReferenceWithRefAndRepeatId1to1("newPresentationFormId", "6"),
							createChildReferenceWithRefAndRepeatId1to1("listPresentationViewId",
									"7"),
							createChildReferenceWithRefAndRepeatId1to1("searchMetadataId", "8"),
							createChildReferenceWithRefAndRepeatId1to1("searchPresentationFormId",
									"9"),
							createChildReferenceWithRefAndRepeatId1to1("userSuppliedId", "10"),
							createChildReferenceWithRefAndRepeatId1to1("permissionKey", "11"),
							createChildReferenceWithRefAndRepeatId1to1("selfPresentationViewId",
									"12") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))

			};

		}

		if (idToGet === "recordInfo") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("id", "1") ]

				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfoAttribute") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "attributeReferences",
					"children" : [ {
						"name" : "ref",
						"value" : "anAttribute",
						"repeatId" : "1"
					} ]

				}, {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("id", "1") ]

				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("recordInfo")),
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "id") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "presentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "newMetadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "newPresentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "listPresentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "searchMetadataId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "searchPresentationFormId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "userSuppliedId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "permissionKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "selfPresentationViewId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		// if (idToGet === "recordTypeTypeCollection") {
		// return {
		// "name" : "metadata",
		// "children" : [ {
		// "ref" : "recordTypeTypeChoice1"
		// }
		// ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
		// "attributes" : {
		// "type" : "collection"
		// }
		// };
		// }
		if (idToGet === "recordTypeTypeCollection") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "recordTypeTypeCollection"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "textId",
					"value" : "itemYesNoUnknownText"
				}, {
					"name" : "defTextId",
					"value" : "itemYesNoUnknownDefText"
				}, {
					"name" : "collectionItemReferences",
					"children" : [ {
						"name" : "ref",
						"repeatId" : "0",
						"value" : "recordTypeTypeChoice1"
					}, {
						"name" : "ref",
						"repeatId" : "1",
						"value" : "recordTypeTypeChoice2"
					}
					// , {
					// "name" : "ref",
					// "repeatId" : "2",
					// "value" : "itemUnknown"
					// }
					]
				} ],
				"attributes" : {
					"type" : "itemCollection"
				}
			};
		}
		if (idToGet === "recordTypeTypeCollectionVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				},
				"children" : [ {
					"name" : "ref",
					"value" : "recordTypeTypeCollection"
				}, {
					"name" : "finalValue",
					"value" : "aFinalValue"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "recordTypeParentCollectionVar") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				},
				"children" : [ {
					"name" : "refCollectionId",
					"value" : "recordTypeTypeCollection"
				// }
				// ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
				} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId("recordTypeTypeCollectionVar"))
			};
		}
		if (idToGet === "metadata") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [
						{
							"name" : "attributeReferences",
							"children" : [ {
								"name" : "ref",
								"value" : "recordTypeTypeCollectionVar"
							} ]
						},
						{
							"name" : "childReferences",
							"children" : [
									createChildReferenceWithRefAndRepeatId1to1("recordInfo", "1"),
									createChildReferenceWithRefAndRepeatId1to1("nameInData", "2"),
									createChildReferenceWithRefAndRepeatId1to1("textId", "3"),
									createChildReferenceWithRefAndRepeatId1to1("defTextId", "4"),
									createChildReferenceWithRefAndRepeatId1to1(
											"attributeReferences", "5"),
									createChildReferenceWithRefAndRepeatId1to1("childReferences",
											"6") ]

						} ]
						.concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "nameInData") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "textId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "defTextId") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "attributeReferences") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"ref", "1", "1", "X") ]

				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "ref") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				},
				"children" : [ {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "childReferences") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"childReference", "1", "1", "X") ]

				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "childReference") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("ref", "1"),
							createChildReferenceWithRefAndRepeatId1to1("repeatMin", "2"),
							createChildReferenceWithRefAndRepeatId1to1("repeatMinKey", "3"),
							createChildReferenceWithRefAndRepeatId1to1("repeatMax", "4"),
							createChildReferenceWithRefAndRepeatId1to1("secret", "5"),
							createChildReferenceWithRefAndRepeatId1to1("secretKey", "6"),
							createChildReferenceWithRefAndRepeatId1to1("readOnly", "7"),
							createChildReferenceWithRefAndRepeatId1to1("readOnlyKey", "8") ]

				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))

			};
		}
		if (idToGet === "repeatMin") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9\_]{1,3}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "repeatMinKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "repeatMax") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[0-9|X\_]{1,3}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "secret") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "secretKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "readOnly") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "^true$|^false$"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "readOnlyKey") {
			return {
				"name" : "metadata",
				"children" : [ {
					"regEx" : "(^[A-Z\_]{2,50}$)"
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet)),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "presentationVarGroup") {
			return {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarGroup"
					}, {
						"name" : "type",
						"value" : "metadataGroup"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "textId",
					"value" : "presentationVarGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationVarGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPVarGroup"
						// "value" : "recordInfo"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					} ],
					"name" : "childReferences"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "presentationTypePVarCollectionVar"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "presentationVarAttributeGroup") {
			return {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarAttributeGroup"
					}, {
						"name" : "type",
						"value" : "metadataGroup"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "textId",
					"value" : "presentationVarGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationVarGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPVarAttributeGroup"
						// "value" : "recordInfo"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					} ],
					"name" : "childReferences"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "presentationTypePVarCollectionVar"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "idTextVar") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "idTextVar"
					}, {
						"name" : "type",
						"value" : "metadataTextVariable"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "id"
				}, {
					"name" : "textId",
					"value" : "idTextVarText"
				}, {
					"name" : "defTextId",
					"value" : "idTextVarDefText"
				}, {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "recordInfoPVarGroup") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoPVarGroup"
					}, {
						"name" : "type",
						"value" : "metadataGroup"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"name" : "textId",
					"value" : "recordInfoText"
				}, {
					"name" : "defTextId",
					"value" : "recordInfoDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "idPVarTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					} ],
					"name" : "childReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "recordInfoPVarAttributeGroup") {
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoPVarAttributeGroup"
					}, {
						"name" : "type",
						"value" : "metadataGroup"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "nameInData",
					"value" : "recordInfo"
				}, {
					"name" : "textId",
					"value" : "recordInfoText"
				}, {
					"name" : "defTextId",
					"value" : "recordInfoDefText"
				}, {
					"name" : "attributeReferences",
					"children" : [ {
						"name" : "ref",
						"value" : "anAttribute",
						"repeatId" : "1"
					} ]

				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "idPVarTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					} ],
					"name" : "childReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
		}
		if (idToGet === "groupIdOneRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("myLink", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "groupId0to1RecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax(
							"myLink", "1", "0", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myLink"
				}, {
					"name" : "textId",
					"value" : "myLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				} ]
			};
		}

		if (idToGet === "groupIdOneRecordLinkChildWithFinalValue") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("myFinalValueLink",
							"1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myFinalValueLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myFinalValueLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myFinalValueLink"
				}, {
					"name" : "textId",
					"value" : "myFinalValueLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myFinalValueLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "finalValue",
					"value" : "someInstance"
				} ]
			};
		}
		if (idToGet === "groupIdOneChildOfBinaryRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax("myChildOfBinaryLink",
						"one", "0", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myChildOfBinaryLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myChildOfBinaryLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myChildOfBinaryLink"
				}, {
					"name" : "textId",
					"value" : "myChildOfBinaryLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myChildOfBinaryLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "image"
				} ]
			};
		}
		if (idToGet === "groupIdOneBinaryRecordLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax("myBinaryLink",
						"one", "0", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myBinaryLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myBinaryLink"
				}, {
					"name" : "textId",
					"value" : "myBinaryLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myBinaryLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "binary"
				} ]
			};
		}
		if (idToGet === "groupIdOneBinaryRecordNoDataDividerLinkChild") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatIdAndRepeatMinAndRepeatMax("myBinaryNoDataDividerLink",
						"one", "0", "X") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myBinaryNoDataDividerLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myBinaryNoDataDividerLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myBinaryNoDataDividerLink"
				}, {
					"name" : "textId",
					"value" : "myBinaryNoDataDividerLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myBinaryNoDataDividerLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "noDataDividerBinary"
				} ]
			};
		}
		if (idToGet === "groupIdOneRecordLinkChildWithPath") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				},
				"children" : [ {
					"name" : "childReferences",
					"children" : [ createChildReferenceWithRefAndRepeatId1to1("myPathLink", "1") ]
				} ].concat(createArrayWithRecordInfoAndNameInDataAndTextIdAndDefTextId(idToGet))
			};
		}
		if (idToGet === "myPathLink") {
			return {
				"name" : "metadata",
				"attributes" : {
					"type" : "recordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPathLink"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "myPathLink"
				}, {
					"name" : "textId",
					"value" : "myPathLinkText"
				}, {
					"name" : "defTextId",
					"value" : "myPathLinkDefText"
				}, {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "name"
					}

					]
				} ]
			};
		}
		if (idToGet === "linkedRecordTypeTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ].concat([ createRecordInfoJson(idToGet) ]
						.concat(createNameInDataTextIdDefTextIdWithNameInDataAndId(
								"linkedRecordType", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		function createNameInDataTextIdDefTextIdWithNameInDataAndId(nameInData, id) {
			return [ {
				"name" : "nameInData",
				"value" : nameInData
			}, {
				"name" : "textId",
				"value" : id + "Text"
			}, {
				"name" : "defTextId",
				"value" : id + "DefText"
			} ];
		}
		if (idToGet === "linkedRecordIdTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{2,50}$"
				} ].concat([ createRecordInfoJson(idToGet) ]
						.concat(createNameInDataTextIdDefTextIdWithNameInDataAndId(
								"linkedRecordId", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "linkedRepeatIdTextVar") {
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "regEx",
					"value" : "^[0-9A-Öa-ö\\s!*.]{1,50}$"
				} ].concat([ createRecordInfoJson(idToGet) ]
						.concat(createNameInDataTextIdDefTextIdWithNameInDataAndId(
								"linkedRepeatId", idToGet))),
				"attributes" : {
					"type" : "textVariable"
				}
			};
		}
		if (idToGet === "imageNewGroup") {
			return {
				  "children": [
				               {
				                 "children": [
				                   {
				                     "name": "id",
				                     "value": "imageNewGroup"
				                   },
				                   {
				                     "name": "type",
				                     "value": "metadataGroup"
				                   },
				                   {
				                     "name": "createdBy",
				                     "value": "userId"
				                   },
				                   {
				                     "children": [
				                       {
				                         "name": "linkedRecordType",
				                         "value": "system"
				                       },
				                       {
				                         "name": "linkedRecordId",
				                         "value": "cora"
				                       }
				                     ],
				                     "actionLinks": {
				                       "read": {
				                         "requestMethod": "GET",
				                         "rel": "read",
				                         "url": "http://localhost:8080/therest/rest/record/system/cora",
				                         "accept": "application/uub+record+json"
				                       }
				                     },
				                     "name": "dataDivider"
				                   }
				                 ],
				                 "name": "recordInfo"
				               },
				               {
				                 "name": "nameInData",
				                 "value": "binary"
				               },
				               {
				                 "name": "textId",
				                 "value": "imageNewGroupText"
				               },
				               {
				                 "name": "defTextId",
				                 "value": "imageNewGroupDefText"
				               },
				               {
				                 "name": "refParentId",
				                 "value": "imageGroup"
				               },
				               {
				                 "children": [
				                   {
				                     "repeatId": "3",
				                     "children": [
				                       {
				                         "name": "ref",
				                         "value": "recordInfoCoraAutogeneratedNewGroup"
				                       },
				                       {
				                         "name": "repeatMin",
				                         "value": "1"
				                       },
				                       {
				                         "name": "repeatMax",
				                         "value": "1"
				                       }
				                     ],
				                     "name": "childReference"
				                   },
				                   {
				                     "repeatId": "1",
				                     "children": [
				                       {
				                         "name": "ref",
				                         "value": "filenameTextVar"
				                       },
				                       {
				                         "name": "repeatMin",
				                         "value": "1"
				                       },
				                       {
				                         "name": "repeatMax",
				                         "value": "1"
				                       }
				                     ],
				                     "name": "childReference"
				                   },
				                   {
				                     "repeatId": "2",
				                     "children": [
				                       {
				                         "name": "ref",
				                         "value": "filesizeTextVar"
				                       },
				                       {
				                         "name": "repeatMin",
				                         "value": "1"
				                       },
				                       {
				                         "name": "repeatMax",
				                         "value": "1"
				                       }
				                     ],
				                     "name": "childReference"
				                   }
				                 ],
				                 "name": "childReferences"
				               },
				               {
				                 "children": [
				                   {
				                     "repeatId": "0",
				                     "name": "ref",
				                     "value": "binaryTypeImageCollectionVar"
				                   }
				                 ],
				                 "name": "attributeReferences"
				               }
				             ],
				             "name": "metadata",
				             "attributes": {
				               "type": "group"
				             }
				           };
               
		}
		if (idToGet === "binaryTypeImageCollectionVar") {
			return {
				      "children": [
				        {
				          "children": [
				            {
				              "name": "id",
				              "value": "binaryTypeImageCollectionVar"
				            },
				            {
				              "children": [
				                {
				                  "name": "linkedRecordType",
				                  "value": "system"
				                },
				                {
				                  "name": "linkedRecordId",
				                  "value": "cora"
				                }
				              ],
				              "actionLinks": {
				                "read": {
				                  "requestMethod": "GET",
				                  "rel": "read",
				                  "url": "http://localhost:8080/therest/rest/record/system/cora",
				                  "accept": "application/uub+record+json"
				                }
				              },
				              "name": "dataDivider"
				            },
				            {
				              "name": "type",
				              "value": "metadataCollectionVariable"
				            },
				            {
				              "name": "createdBy",
				              "value": "userId"
				            }
				          ],
				          "name": "recordInfo"
				        },
				        {
				          "name": "nameInData",
				          "value": "type"
				        },
				        {
				          "name": "textId",
				          "value": "binaryTypeImageCollectionVarText"
				        },
				        {
				          "name": "defTextId",
				          "value": "binaryTypeImageCollectionVarDefText"
				        },
				        {
				          "name": "refCollectionId",
				          "value": "binaryTypeCollection"
				        },
				        {
				          "name": "refParentId",
				          "value": "binaryTypeCollectionVar"
				        },
				        {
				          "name": "finalValue",
				          "value": "image"
				        }
				      ],
				      "name": "metadata",
				      "attributes": {
				        "type": "collectionVariable"
				      }
				};
		}
		if (idToGet === "genericBinaryNewGroup") {
			return {
				"children": [
					{
						"children": [
							{
								"name": "id",
								"value": "genericBinaryNewGroup"
							},
							{
								"name": "type",
								"value": "metadataGroup"
							},
							{
								"name": "createdBy",
								"value": "userId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "system"
									},
									{
										"name": "linkedRecordId",
										"value": "cora"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "http://localhost:8080/therest/rest/record/system/cora",
										"accept": "application/uub+record+json"
									}
								},
								"name": "dataDivider"
							}
						],
						"name": "recordInfo"
					},
					{
						"name": "nameInData",
						"value": "binary"
					},
					{
						"name": "textId",
						"value": "genericBinaryNewGroupText"
					},
					{
						"name": "defTextId",
						"value": "genericBinaryNewGroupDefText"
					},
					{
						"name": "refParentId",
						"value": "genericBinaryGroup"
					},
					{
						"children": [
							{
								"repeatId": "0",
								"children": [
									{
										"name": "ref",
										"value": "recordInfoCoraAutogeneratedNewGroup"
									},
									{
										"name": "repeatMin",
										"value": "1"
									},
									{
										"name": "repeatMax",
										"value": "1"
									}
								],
								"name": "childReference"
							},
							{
								"repeatId": "1",
								"children": [
									{
										"name": "ref",
										"value": "filenameTextVar"
									},
									{
										"name": "repeatMin",
										"value": "1"
									},
									{
										"name": "repeatMax",
										"value": "1"
									}
								],
								"name": "childReference"
							},
							{
								"repeatId": "2",
								"children": [
									{
										"name": "ref",
										"value": "filesizeTextVar"
									},
									{
										"name": "repeatMin",
										"value": "1"
									},
									{
										"name": "repeatMax",
										"value": "1"
									}
								],
								"name": "childReference"
							}
						],
						"name": "childReferences"
					},
		               {
		                 "children": [
		                   {
		                     "repeatId": "0",
		                     "name": "ref",
		                     "value": "binaryTypeGenericBinaryCollectionVar"
		                   }
		                 ],
		                 "name": "attributeReferences"
		               }
				],
				"name": "metadata",
				"attributes": {
					"type": "group"
				}
			};
		}
		if (idToGet === "binaryTypeGenericBinaryCollectionVar") {
			return {
				      "children": [
				        {
				          "children": [
				            {
				              "name": "id",
				              "value": "binaryTypeGenericBinaryCollectionVar"
				            },
				            {
				              "children": [
				                {
				                  "name": "linkedRecordType",
				                  "value": "system"
				                },
				                {
				                  "name": "linkedRecordId",
				                  "value": "cora"
				                }
				              ],
				              "actionLinks": {
				                "read": {
				                  "requestMethod": "GET",
				                  "rel": "read",
				                  "url": "http://localhost:8080/therest/rest/record/system/cora",
				                  "accept": "application/uub+record+json"
				                }
				              },
				              "name": "dataDivider"
				            },
				            {
				              "name": "type",
				              "value": "metadataCollectionVariable"
				            },
				            {
				              "name": "createdBy",
				              "value": "userId"
				            }
				          ],
				          "name": "recordInfo"
				        },
				        {
				          "name": "nameInData",
				          "value": "type"
				        },
				        {
				          "name": "textId",
				          "value": "binaryTypeGenericBinaryCollectionVarText"
				        },
				        {
				          "name": "defTextId",
				          "value": "binaryTypeGenericBinaryCollectionVarDefText"
				        },
				        {
				          "name": "refCollectionId",
				          "value": "binaryTypeCollection"
				        },
				        {
				          "name": "refParentId",
				          "value": "binaryTypeCollectionVar"
				        },
				        {
				          "name": "finalValue",
				          "value": "genericBinary"
				        }
				      ],
				      "name": "metadata",
				      "attributes": {
				        "type": "collectionVariable"
				    }
				}
		}
		if (idToGet === "noDataDividerBinaryNewGroup") {
			return {
				"children": [
					{
						"children": [
							{
								"name": "id",
								"value": "noDataDividerBinaryNewGroup"
							},
							{
								"name": "type",
								"value": "metadataGroup"
							},
							{
								"name": "createdBy",
								"value": "userId"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "system"
									},
									{
										"name": "linkedRecordId",
										"value": "cora"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "http://localhost:8080/therest/rest/record/system/cora",
										"accept": "application/uub+record+json"
									}
								},
								"name": "dataDivider"
							}
						],
						"name": "recordInfo"
					},
					{
						"name": "nameInData",
						"value": "binary"
					},
					{
						"name": "textId",
						"value": "noDataDividerBinaryNewGroupText"
					},
					{
						"name": "defTextId",
						"value": "noDataDividerBinaryNewGroupDefText"
					},
					{
						"name": "refParentId",
						"value": "noDataDividerBinaryGroup"
					},
					{
						"children": [
							{
								"repeatId": "0",
								"children": [
									{
										"name": "ref",
										"value": "recordInfoNoDataDividerAutogeneratedNewGroup"
									},
									{
										"name": "repeatMin",
										"value": "1"
									},
									{
										"name": "repeatMax",
										"value": "1"
									}
								],
								"name": "childReference"
							}
						],
						"name": "childReferences"
					},
		               {
		                 "children": [
		                   {
		                     "repeatId": "0",
		                     "name": "ref",
		                     "value": "binaryTypeGenericBinaryCollectionVar"
		                   }
		                 ],
		                 "name": "attributeReferences"
		               }
				],
				"name": "metadata",
				"attributes": {
					"type": "group"
				}
			};
		}
		if (idToGet === "recordInfoCoraAutogeneratedNewGroup") {
			return {
			      "children": [
               {
                 "children": [
                   {
                     "name": "id",
                     "value": "recordInfoCoraAutogeneratedNewGroup"
                   },
                   {
                     "children": [
                       {
                         "name": "linkedRecordType",
                         "value": "system"
                       },
                       {
                         "name": "linkedRecordId",
                         "value": "cora"
                       }
                     ],
                     "actionLinks": {
                       "read": {
                         "requestMethod": "GET",
                         "rel": "read",
                         "url": "http://localhost:8080/therest/rest/record/system/cora",
                         "accept": "application/uub+record+json"
                       }
                     },
                     "name": "dataDivider"
                   },
                   {
                     "name": "type",
                     "value": "metadataGroup"
                   },
                   {
                     "name": "createdBy",
                     "value": "userId"
                   }
                 ],
                 "name": "recordInfo"
               },
               {
                 "name": "nameInData",
                 "value": "recordInfo"
               },
               {
                 "name": "textId",
                 "value": "recordInfoCoraAutogeneratedNewText"
               },
               {
                 "name": "defTextId",
                 "value": "recordInfoCoraAutogeneratedNewDefText"
               },
               {
                 "children": [
                   {
                     "repeatId": "0",
                     "children": [
                       {
                         "name": "ref",
                         "value": "dataDividerCoraLink"
                       },
                       {
                         "name": "repeatMin",
                         "value": "1"
                       },
                       {
                         "name": "repeatMax",
                         "value": "1"
                       }
                     ],
                     "name": "childReference"
                   }
                 ],
                 "name": "childReferences"
               }
             ],
             "name": "metadata",
             "attributes": {
               "type": "group"
             }
           };
		}
		if (idToGet === "recordInfoNoDataDividerAutogeneratedNewGroup") {
			return {
				"children": [
					{
						"children": [
							{
								"name": "id",
								"value": "recordInfoNoDataDividerAutogeneratedNewGroup"
							},
							{
								"children": [
									{
										"name": "linkedRecordType",
										"value": "system"
									},
									{
										"name": "linkedRecordId",
										"value": "cora"
									}
								],
								"actionLinks": {
									"read": {
										"requestMethod": "GET",
										"rel": "read",
										"url": "http://localhost:8080/therest/rest/record/system/cora",
										"accept": "application/uub+record+json"
									}
								},
								"name": "dataDivider"
							},
							{
								"name": "type",
								"value": "metadataGroup"
							},
							{
								"name": "createdBy",
								"value": "userId"
							}
						],
						"name": "recordInfo"
					},
					{
						"name": "nameInData",
						"value": "recordInfo"
					},
					{
						"name": "textId",
						"value": "recordInfoNoDataDividerAutogeneratedNewText"
					},
					{
						"name": "defTextId",
						"value": "recordInfoNoDataDividerAutogeneratedNewDefText"
					},
					{
						"children": [
							{
								"repeatId": "0",
								"children": [
									{
										"name": "ref",
										"value": "idTextVar"
									},
									{
										"name": "repeatMin",
										"value": "1"
									},
									{
										"name": "repeatMax",
										"value": "1"
									}
								],
								"name": "childReference"
							}
						],
						"name": "childReferences"
					}
				],
				"name": "metadata",
				"attributes": {
					"type": "group"
				}
			};
		}
		if (idToGet === "dataDividerCoraLink") {
			return {
			      "children": [
               {
                 "children": [
                   {
                     "name": "id",
                     "value": "dataDividerCoraLink"
                   },
                   {
                     "children": [
                       {
                         "name": "linkedRecordType",
                         "value": "system"
                       },
                       {
                         "name": "linkedRecordId",
                         "value": "cora"
                       }
                     ],
                     "actionLinks": {
                       "read": {
                         "requestMethod": "GET",
                         "rel": "read",
                         "url": "http://localhost:8080/therest/rest/record/system/cora",
                         "accept": "application/uub+record+json"
                       }
                     },
                     "name": "dataDivider"
                   },
                   {
                     "name": "type",
                     "value": "metadataRecordLink"
                   },
                   {
                     "name": "createdBy",
                     "value": "userId"
                   }
                 ],
                 "name": "recordInfo"
               },
               {
                 "name": "nameInData",
                 "value": "dataDivider"
               },
               {
                 "name": "textId",
                 "value": "dataDividerCoraLinkText"
               },
               {
                 "name": "defTextId",
                 "value": "dataDividerCoraLinkDefText"
               },
               {
                 "name": "linkedRecordType",
                 "value": "system"
               },
               {
                 "name": "finalValue",
                 "value": "cora"
               }
             ],
             "name": "metadata",
             "attributes": {
               "type": "recordLink"
             }
           };
		}
		// presentation

		switch (idToGet) {
		case "recordInfoPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "recordInfo"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "idTextOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
		case "recordInfoAttributePGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoAttributePGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "recordInfoAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "idTextOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
		case "idTextOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "idTextTextOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "idTextVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "pVarTextVariableId":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVariableId"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "enterTextHereText"
				} ]
			};
			case "textVariableIdShowTextAreaFalsePVar":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pVar"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textVariableIdShowTextAreaFalsePVar"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "textVariableId"
					}, {
						"name" : "mode",
						"value" : "input"
					}, {
						"name" : "emptyTextId",
						"value" : "enterTextHereText"
					}, {
						"name" : "showAsTextArea",
						"value" : "false"
					}  ]
				};
			case "textVariableIdTextAreaPVar":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pVar"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textVariableIdTextAreaPVar"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "textVariableId"
					}, {
						"name" : "mode",
						"value" : "input"
					}, {
						"name" : "emptyTextId",
						"value" : "enterTextHereText"
					}, {
						"name" : "inputType",
						"value" : "textarea"
					} ]
				};

		case "pVarTextVariableIdOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVariableId"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "pVarTextVariableIdOutputImage":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVariableId"
				}, {
					"name" : "mode",
					"value" : "output"
				}, {
					"name" : "outputFormat",
					"value" : "image"
				} ]
			};

		case "yesNoUnknownPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "initialEmptyValueText"
				} ]
			};

		case "yesNoUnknownNoEmptyTextIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "yesNoUnknownOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "yesNoUnknownOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "yesNoUnknownVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};

		case "pVarTextVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVar"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "pVarTextVarOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVarOutput"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
			case "myChildOfBinaryPLink":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pLink"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "myChildOfBinaryPLink"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "myChildOfBinaryLink"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};
			case "myBinaryPLink":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pLink"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "myBinaryPLink"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "myBinaryLink"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};

			case "myBinaryNoDataDividerPLink":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pLink"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "myBinaryNoDataDividerPLink"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "myBinaryNoDataDividerLink"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};

		case "pgGroupIdOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildOutput":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
		case "groupOneTextChildOutputImagePGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutputImage"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupId1toXCollectionChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupId1toXCollectionChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "yesNoUnknownPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextTwoTextChildren":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildRepeat1to3"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "refMinimized",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextChildMinimizedDefault":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "refMinimized",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "refMinimized"
						} ]
					} ]
				} ])
			};

		case "pVarTextVariableId2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pVarTextVariableId2"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVariableId2"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};

		case "pgGroupIdTwoTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdTwoTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId2"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

			// groupInGroupOneTextChild
		case "pgGroupInGroupIdOneTextOneTextChild":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupInGroupOneTextChild"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pgGroupIdOneTextOneTextChild"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupParentAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVarOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupParentAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVarOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOtherAttribute":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupOtherAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOtherAttributeMinimized":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupOtherAttribute"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgTextVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ]
						.concat([
								{
									"name" : "presentationOf",
									"value" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"
								},
								{
									"name" : "childReferences",
									"children" : [
											{
												"name" : "childReference",
												"repeatId" : "1",
												"children" : [ {
													"name" : "ref",
													"value" : "aHeadlineText"
												}, {
													"name" : "default",
													"value" : "ref"
												} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "2",
												"children" : [
														{
															"name" : "ref",
															"value" : "pgTextVarRepeat1to3InGroupOneAttribute"
														},
														{
															"name" : "refMinimized",
															"value" : "pgTextVarRepeat1to3InGroupOneAttributeMinimized"
														}, {
															"name" : "default",
															"value" : "refMinimized"
														} ]
											},
											{
												"name" : "childReference",
												"repeatId" : "3",
												"children" : [
														{
															"name" : "ref",
															"value" : "pgTextVarRepeat1to3InGroupOtherAttribute"
														},
														{
															"name" : "refMinimized",
															"value" : "pgTextVarRepeat1to3InGroupOtherAttributeMinimized"
														}, {
															"name" : "default",
															"value" : "ref"
														} ]
											} ]
								} ])
			};
		case "pgTextVarRepeat1to3InGroupParentAttribute1toXInGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "textVarRepeat1to3InGroupParentAttribute1toXInGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pgTextVarRepeat1to3InGroupParentAttribute"
						}, {
							"name" : "refMinimized",
							"value" : "pgTextVarRepeat1to3InGroupParentAttributeMinimized"
						}, {
							"name" : "default",
							"value" : "refMinimized"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextOneTextChildTwoAttributes":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildTwoAttributes"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pgGroupIdOneTextTwoTextChildrenRepeat1toX":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildRepeat1toX"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			// groupIdOneTextChildRepeat1to3
		case "pgGroupIdOneTextTwoTextChildrenRepeat1to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildRepeat1to3"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			// groupIdOneTextChildRepeat3to3
		case "pgGroupIdOneTextTwoTextChildrenRepeat3to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildRepeat3to3"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

			// pTextVariableIdRContainer
		case "pTextVariableIdRContainer":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "this"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariableIdRContainer"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "textVariableId"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "refMinimzed",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableIdOutput"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ]
			};

		case "pgGroupIdRepeatingContainerRepeat1to3":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneTextChildRepeat1to3"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pTextVariableIdRContainer"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

			// groupIdTwoTextChild
			// pgGroupIdTwoTextChild
		case "pTextVariablePlus2SContainer":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariablePlus2SContainer"
					} ]
				}, {
					"name" : "presentationsOf",
					"children" : [ {
						"repeatId" : "1",
						"name" : "presentationOf",
						"value" : "textVariableId"
					}, {
						"repeatId" : "2",
						"name" : "presentationOf",
						"value" : "textVariableId2"
					} ]
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "pVarTextVariableId2"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ]
			};

			// groupIdTwoTextChildRepeat1to5
			// "pTextVariablePlus2SContainer":

		case "pgGroupIdTwoTextChildSurrounding2TextPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdTwoTextChildRepeat1to5"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pTextVariablePlus2SContainer"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "pTextVariablePlus2SContainer2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "pTextVariablePlus2SContainer2"
					} ]
				}, {
					"name" : "presentationsOf",
					"children" : [ {
						"repeatId" : "1",
						"name" : "presentationOf",
						"value" : "textVariableId"
					}, {
						"repeatId" : "2",
						"name" : "presentationOf",
						"value" : "textVariableId2"
					} ]
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "aHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "pTextVariablePlus2SContainer"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ]
			};

		case "pgGroupIdTwoTextChildSurrounding2TextPGroup2":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdTwoTextChildRepeat1to5"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "pTextVariablePlus2SContainer2"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};

		case "asdfasdfsad":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPGroup"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "myHeadlineText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "myChildPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "myChildPGroup"
						}, {
							"name" : "refMinimized",
							"value" : "myChildMinPGroup"
						}, {
							"name" : "default",
							"value" : "refMinimized"
						} ]
					} ]
				} ]
			};
		case "myLinkNoPresentationOfLinkedRecordPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkNoPresentationOfLinkedRecordPLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myLink"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
		case "myLinkNoPresentationOfLinkedRecordWithFinalValuePLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myFinalValueLink"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
			case "myLinkNoPresentationOfLinkedRecordChildOfBinary":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pRecordLink"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "myLinkNoPresentationOfLinkedRecordChildOfBinary"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "myChildOfBinaryLink"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};
		case "myPathLinkNoPresentationOfLinkedRecordPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPathLinkNoPresentationOfLinkedRecordPLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myPathLink"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
			case "myChildOfBinaryLinkPLink":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pRecordLink"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "myChildOfBinaryLinkPLink"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "myChildOfBinaryLink"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};
		case "myLinkNoPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkNoPresentationOfLinkedRecordOutputPLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myLink"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "myPathLinkNoPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myPathLinkNoPresentationOfLinkedRecordOutputPLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myPathLink"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "myLinkPresentationOfLinkedRecordOutputPLink":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pRecordLink"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "myLinkPresentationOfLinkedRecordOutputPLink"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "myLink"
				}, {
					"name" : "mode",
					"value" : "output"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "metadataTextVariable"
						}, {
							"name" : "presentationId",
							"value" : "metadataTextVariableViewPGroup"
						} ],
						"name" : "linkedRecordPresentation"
					} ],
					"name" : "linkedRecordPresentations"
				} ]
			};
		case "myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType":
			return {
			"name" : "presentation",
			"attributes" : {
				"type" : "pRecordLink"
			},
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"
				} ]
			}, {
				"name" : "presentationOf",
				"value" : "myLink"
			}, {
				"name" : "mode",
				"value" : "output"
			}, {
				"children" : [ {
					"repeatId" : "1",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "NOTmetadataTextVariable"
					}, {
						"name" : "presentationId",
						"value" : "metadataTextVariableViewPGroup"
					} ],
					"name" : "linkedRecordPresentation"
				} ],
				"name" : "linkedRecordPresentations"
			} ]
		};
		case "linkedRecordTypeOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordTypeOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "linkedRecordTypeTextVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "linkedRecordIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordIdPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "linkedRecordIdTextVar"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "enterTextHereText"
				} ]
			};
		case "linkedRecordIdOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRecordIdOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "linkedRecordIdTextVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "linkedRepeatIdPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRepeatIdPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "linkedRepeatIdTextVar"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "enterTextHereText"
				} ]
			};
		case "linkedRepeatIdOutputPVar":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "linkedRepeatIdOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "linkedRepeatIdTextVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
		case "groupIdOneRecordLinkChildWithPathPGroup":
			return {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson(idToGet) ].concat([ {
					"name" : "presentationOf",
					"value" : "groupIdOneRecordLinkChildWithPath"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "myPathLinkNoPresentationOfLinkedRecordPLink"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "myPathLinkNoPresentationOfLinkedRecordOutputPLink"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			case "groupIdOneChildOfBinaryRecordLinkChildPGroup":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pGroup"
					},
					"children" : [ createRecordInfoJson(idToGet) ].concat([ {
						"name" : "presentationOf",
						"value" : "groupIdOneChildOfBinaryRecordLinkChild"
					}, {
						"name" : "childReferences",
						"children" : [ {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "myChildOfBinaryLinkPLink"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ])
				};
		case "metadataTextVariableViewPGroup":
			return {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataTextVariableViewPGroup"
					}, {
						"name" : "type",
						"value" : "presentationGroup"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "cora"
						} ],
						"name" : "dataDivider"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "presentationOf",
					"value" : "metadataTextVariableGroup"
				}, {
					"children" : [ {
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "nameInDataTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "nameInDataTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "textIdTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "textIdTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "defTextIdTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "6",
						"children" : [ {
							"name" : "ref",
							"value" : "defTextIdTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "7",
						"children" : [ {
							"name" : "ref",
							"value" : "everythingRegExpTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "8",
						"children" : [ {
							"name" : "ref",
							"value" : "everythingRegExpTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "9",
						"children" : [ {
							"name" : "ref",
							"value" : "refParentIdTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "10",
						"children" : [ {
							"name" : "ref",
							"value" : "refParentIdTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "finalValueTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "12",
						"children" : [ {
							"name" : "ref",
							"value" : "finalValueTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ],
						"name" : "childReference"
					} ],
					"name" : "childReferences"
				} ],
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				}
			};

			// TEXT
		case "textVariableIdText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "my2Text"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Exempel textvariabel"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Example text variable"
					} ]
				} ]
			};

		case "textVariableIdDefText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "my2Text"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Detta är en exempeldefinition för en textvariabel."
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "This is an example definition for a text variable."
					} ]
				} ]
			};

		case "aHeadlineText":
			return {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "aHeadlineText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "En rubrik"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "A headline"
					} ]
				} ]
			};
		case "groupIdOneTextChildText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdOneTextChildText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdOneTextChildText"
				} ]
			}]
		};
		case "groupIdOneTextChildDefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdOneTextChildText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdOneTextChildText"
				} ]
			}]
		};
		case "groupIdTwoTextChildRepeat1to5Text":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdTwoTextChildRepeat1to5Text"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdTwoTextChildRepeat1to5Text"
				} ]
			}]
		};
		case "groupIdTwoTextChildRepeat1to5DefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdTwoTextChildRepeat1to5DefText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdTwoTextChildRepeat1to5DefText"
				} ]
			}]
		};
		case "groupIdOneTextChildRepeat1to3Text":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdOneTextChildRepeat1to3Text"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdOneTextChildRepeat1to3Text"
				} ]
			}]
		};
		case "groupIdTwoTextChildRepeat1to3DefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdTwoTextChildRepeat1to3DefText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdTwoTextChildRepeat1to3DefText"
				} ]
			}]
		};
		case "groupIdTwoTextChildText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdTwoTextChildText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdTwoTextChildText"
				} ]
			}]
		};
		case "groupIdTwoTextChildDefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupIdTwoTextChildDefText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupIdTwoTextChildDefText"
				} ]
			}]
		};
		case "textVarRepeat1to3InGroupOneAttributeText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "textVarRepeat1to3InGroupOneAttributeText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "textVarRepeat1to3InGroupOneAttributeText"
				} ]
			}]
		};
		case "textVarRepeat1to3InGroupOneAttributeDefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "textVarRepeat1to3InGroupOneAttributeDefText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "textVarRepeat1to3InGroupOneAttributeDefText"
				} ]
			}]
		};
		case "groupInGroupOneTextChildText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupInGroupOneTextChildText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupInGroupOneTextChildText"
				} ]
			}]
		};
		case "groupInGroupOneTextChildDefText":
			return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "groupInGroupOneTextChildDefText"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "groupInGroupOneTextChildDefText"
				} ]
			}]
		};
		default:
			throw new Error("Id(" + idToGet + ") not found in stub");

		}

		// throw new Error("Id(" + idToGet + ") not found in stub");
	};

	// this.getPresentationById = function(idToGet) {
	// switch (idToGet) {
	// case "pgTextVariableId":
	// return {
	// "name" : "presentation",
	// "attributes" : {
	// "type" : "pVar"
	// },
	// "children" : [ {
	// "name" : "recordInfo",
	// "children" : [ {
	// "name" : "id",
	// "value" : "pgTextVariableId"
	// } ]
	// }, {
	// "name" : "presentationOf",
	// "value" : "textVariableId"
	// }, {
	// "name" : "mode",
	// "value" : "input"
	// } ]
	// };
	// 
	//
	// case "pgGroupIdOneTextChild":
	// return {
	// "presentation" : {
	// "children" : [ createRecordInfoJson(idToGet) ].concat([ {
	// "id" : "pgGroupIdOneTextChild"
	// }, {
	// "presentationOf" : "groupIdOneTextChild"
	// }, {
	// "childReferences" : {
	// "children" : [ {
	// "childReference" : {
	// "children" : [ {
	// "presentationOf" : "textVariableId"
	// }, {
	// "ref" : "pgTextVariableId"
	// }, {
	// "name" : "default",
	// "value" : "ref"
	// } ]
	// }
	// } ]
	// }
	// } ]),
	// "attributes" : {
	// "type" : "refGroup"
	// }
	// }
	// };
	// 
	//
	// case "asdfasdfsad":
	// return {
	// "name" : "presentation",
	// "attributes" : {
	// "type" : "pGroup"
	// },
	// "children" : [ {
	// "name" : "recordInfo",
	// "children" : [ {
	// "name" : "id",
	// "value" : "myPGroup"
	// } ]
	// }, {
	// "name" : "presentationOf",
	// "value" : "myGroup"
	// }, {
	// "name" : "childReferences",
	// "children" : [ {
	// "name" : "childReference",
	// "repeatId" : "1",
	// "children" : [ {
	// "name" : "ref",
	// "value" : "myHeadlineText"
	// }, {
	// "name" : "default",
	// "value" : "ref"
	// } ]
	// }, {
	// "name" : "childReference",
	// "repeatId" : "2",
	// "children" : [ {
	// "name" : "ref",
	// "value" : "myChildPVar"
	// }, {
	// "name" : "default",
	// "value" : "ref"
	// } ]
	// }, {
	// "name" : "childReference",
	// "repeatId" : "3",
	// "children" : [ {
	// "name" : "ref",
	// "value" : "myChildPGroup"
	// }, {
	// "name" : "refMinimized",
	// "value" : "myChildMinPGroup"
	// }, {
	// "name" : "default",
	// "value" : "refMinimized"
	// } ]
	// } ]
	// } ]
	// };
	// 
	// default:
	// throw new Error("Id(" + idToGet + ") not found in stub");
	// 
	// }
	// }

	this.getTextById = function() {
		return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "my2Text"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "Min andra text på svenska"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "alternative",
					"lang" : "en"
				},
				"children" : [ {
					"name" : "text",
					"value" : "My second text in english"
				} ]
			} ]
		};
	};
}