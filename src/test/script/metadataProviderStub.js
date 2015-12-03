/*
 * Copyright 2015 Olov McKie
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
	function createRecordInfoJson(id) {
		return '{"recordInfo":{"children":[{"id":"' + id + '"},{"type":"metadata"},'
				+ '{"createdBy":"userId"},{"updatedBy":"userId"}]}}';
	}
	function createNameInDataTextIdDefTextId(id) {
		return '{"nameInData":"' + id + '"},{"textId":"' + id + 'Text"},{"defTextId":"' + id
				+ 'DeffText"}';
	}
	function createRecordInfoJson2(id) {
		return {
			"recordInfo" : {
				"children" : [ {
					"id" : " id"
				}, {
					"type" : "metadata"
				}, {
					"createdBy" : "userId"
				}, {
					"updatedBy" : "userId"
				} ]
			}
		};
	}
	function createNameInDataTextIdDefTextId2(id) {
		return [ {
			"nameInData" : id
		}, {
			"textId" : id + "Text"
		}, {
			"defTextId" : id + "DeffText"
		} ];
	}
	this.getMetadataById = function(idToGet) {
		if (idToGet == "textVariableId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "groupIdOneTextChild") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "textVariableId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};

		}
		if (idToGet == "groupIdOneTextChildRepeatingMinRepeatThree") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "textVariableId"
									}, {
										"repeatMin" : "3"
									}, {
										"repeatMax" : "3"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};

		}
		if (idToGet == "groupIdOneChildGroupRepeatingMinRepeatThree") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "groupIdOneTextChild"
									}, {
										"repeatMin" : "3"
									}, {
										"repeatMax" : "3"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}

		if (idToGet == "anAttribute") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"ref" : "recordTypeTypeCollection"
					}, {
						"finalValue" : "aFinalValue"
					} ]),
					"attributes" : {
						"type" : "collectionVariable"
					}
				}
			};
		}
		if (idToGet == "groupIdOneTextChildOneAttribute") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"attributeReferences" : {
							"children" : [ {
								"ref" : "anAttribute"
							} ]
						}
					}, {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "textVariableId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "anOtherAttribute") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"ref" : "recordTypeTypeCollection"
					}, {
						"finalValue" : "aOtherFinalValue"
					} ]),
					"attributes" : {
						"type" : "collectionVariable"
					}
				}
			};
		}
		if (idToGet == "groupIdOneTextChildTwoAttributes") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"attributeReferences" : {
							"children" : [ {
								"ref" : "anAttribute"
							}, {
								"ref" : "anOtherAttribute"
							} ]
						}
					}, {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "textVariableId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}

		if (idToGet == "brokenMetadataNoNameInData") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ , {
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
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "metadataNew") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ , {
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
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "recordTypeOnlyMetadataIdChild") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2('recordType') ].concat(
							createNameInDataTextIdDefTextId2('recordType')).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "metadataId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "metadataId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "recordTypeOnlyMetadataIdPresentationViewIdChild") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2('recordType') ].concat(
							createNameInDataTextIdDefTextId2('recordType')).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "metadataId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "presentationViewId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "presentationViewId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "recordType") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "metadataId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "recordInfo"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "presentationViewId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "presentationFormId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "newMetadataId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "newPresentationFormId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "listPresentationViewId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "searchMetadataId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "searchPresentationFormId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "userSuppliedId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "permissionKey"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "selfPresentationViewId"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "recordInfo") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "id"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "id") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "presentationFormId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "newMetadataId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "newPresentationFormId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "listPresentationViewId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "searchMetadataId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "searchPresentationFormId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "userSuppliedId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "^true$|^false$"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "permissionKey") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[A-Z\_]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "selfPresentationViewId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "recordTypeTypeCollection") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"ref" : "recordTypeTypeChoice1"
					} ]),
					"attributes" : {
						"type" : "collection"
					}
				}
			};
		}
		if (idToGet == "recordTypeTypeCollectionVar") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"ref" : "recordTypeTypeCollection"
					}, {
						"finalValue" : "aFinalValue"
					} ]),
					"attributes" : {
						"type" : "collectionVariable"
					}
				}
			};
		}
		if (idToGet == "metadata") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
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
										"ref" : "recordInfo"
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
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "nameInData") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "textId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "defTextId") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "attributeReferences") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "ref"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "X"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "ref") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9A-Za-z]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "childReferences") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "childReference"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "X"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "childReference") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"ref" : "ref"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "repeatMin"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "repeatMinKey"
									}, {
										"repeatMin" : "0"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "repeatMax"
									}, {
										"repeatMin" : "1"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "secret"
									}, {
										"repeatMin" : "0"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "secretKey"
									}, {
										"repeatMin" : "0"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "readOnly"
									}, {
										"repeatMin" : "0"
									}, {
										"repeatMax" : "1"
									} ]
								}
							}, {
								"childReference" : {
									"children" : [ {
										"ref" : "readOnlyKey"
									}, {
										"repeatMin" : "0"
									}, {
										"repeatMax" : "1"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "group"
					}
				}
			};
		}
		if (idToGet == "repeatMin") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9\_]{1,3}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "repeatMinKey") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[A-Z\_]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "repeatMax") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[0-9|X\_]{1,3}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "secret") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "^true$|^false$"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "secretKey") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[A-Z\_]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "readOnly") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "^true$|^false$"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		if (idToGet == "readOnlyKey") {
			return {
				"metadata" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat(
							createNameInDataTextIdDefTextId2(idToGet)).concat([ {
						"regEx" : "(^[A-Z\_]{2,50}$)"
					} ]),
					"attributes" : {
						"type" : "textVariable"
					}
				}
			};
		}
		throw new Error("Id(" + idToGet + ") not found in stub");
	}

	this.getPresentationById = function(idToGet) {
		switch (idToGet) {
		case "pgTextVariableId":
			return {
				"presentation" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ {
						"id" : "pgTextVariableId"
					}, {
						"presentationOf" : "textVariableId"
					}, {
						"what" : "input"
					} ]),
					"attributes" : {
						"type" : "refVar"
					}
				}
			};

			break;
		case "pgGroupIdOneTextChild":
			return {
				"presentation" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ {
						"id" : "pgGroupIdOneTextChild"
					}, {
						"presentationOf" : "groupIdOneTextChild"
					}, {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"presentationOf" : "textVariableId"
									}, {
										"ref" : "pgTextVariableId"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "refGroup"
					}
				}
			};
		case "pgGroupIdOneTextChildOneAttribute":
			return {
				"presentation" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ {
						"id" : "pgGroupIdOneTextChildOneAttribute"
					}, {
						"presentationOf" : "groupIdOneTextChildOneAttribute"
					}, {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"presentationOf" : "textVariableId"
									}, {
										"ref" : "pgTextVariableId"
									} ]
								}
							} ]
						}
					} ]),
					"attributes" : {
						"type" : "refGroup"
					}
				}
			};
		case "pgGroupIdOneTextChildRepeatingMinRepeatThree":
			return {
				"presentation" : {
					"children" : [ createRecordInfoJson2(idToGet) ].concat([ {
						"id" : "pgGroupIdOneTextChildRepeatingMinRepeatThree"
					}, {
						"presentationOf" : "groupIdOneTextChildRepeatingMinRepeatThree"
					}, {
						"childReferences" : {
							"children" : [ {
								"childReference" : {
									"children" : [ {
										"presentationOf" : "textVariableId"
									}, {
										"ref" : "pgTextVariableId"
									} ]
								}
							} ]
										}
									} ]),
					"attributes" : {
						"type" : "refGroup"
					}
				}
			};
		default:
			throw new Error("Id(" + idToGet + ") not found in stub");
			break;
		}
	}

	this.getTextById = function() {
		return null;
	}
};