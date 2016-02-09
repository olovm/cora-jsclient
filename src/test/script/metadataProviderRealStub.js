/*
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

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.metadataProviderRealStub = function() {

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

		function getMetadataById(metadataId) {
			switch (metadataId) {
			case "defaultItem":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "defaultItem"
						}, {
							"name" : "type",
							"value" : "metadataCollectionItem"
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
						"value" : "default"
					}, {
						"name" : "textId",
						"value" : "defaultItemTextId"
					}, {
						"name" : "defTextId",
						"value" : "defaultItemDefTextId"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionItem"
					}
				};
			case "alternativeItem":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "alternativeItem"
						}, {
							"name" : "type",
							"value" : "metadataCollectionItem"
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
						"value" : "alternative"
					}, {
						"name" : "textId",
						"value" : "alternativeItemTextId"
					}, {
						"name" : "defTextId",
						"value" : "alternativeItemDefTextId"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionItem"
					}
				};
			case "textPartTypeCollection":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "textPartTypeCollection"
						}, {
							"name" : "type",
							"value" : "metadataItemCollection"
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
						"value" : "textPartTypeCollection"
					}, {
						"name" : "textId",
						"value" : "textPartTypeCollectionTextId"
					}, {
						"name" : "defTextId",
						"value" : "textPartTypeCollectionDefTextId"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "default"
						}, {
							"name" : "ref",
							"value" : "alternative"
						} ],
						"name" : "collectionItemReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "itemCollection"
					}
				};
			case "textPartTypeCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "textPartTypeCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "type"
					}, {
						"name" : "textId",
						"value" : "textPartTypeCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "textPartTypeCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "textPartTypeCollection"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "textPartTypeDefaultCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "textPartTypeDefaultCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "type"
					}, {
						"name" : "textId",
						"value" : "textPartTypeDefaultCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "textPartTypeDefaultCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "textPartTypeCollection"
					}, {
						"name" : "refParentId",
						"value" : "textPartTypeCollectionVar"
					}, {
						"name" : "finalValue",
						"value" : "default"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "textPartTypeAlternativeCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "textPartTypeAlternativeCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "type"
					}, {
						"name" : "textId",
						"value" : "textPartTypeAlternativeCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "textPartTypeAlternativeCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "textPartTypeCollection"
					}, {
						"name" : "refParentId",
						"value" : "textPartTypeCollectionVar"
					}, {
						"name" : "finalValue",
						"value" : "alternative"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "svItem":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "svItem"
						}, {
							"name" : "type",
							"value" : "metadataCollectionItem"
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
						"value" : "sv"
					}, {
						"name" : "textId",
						"value" : "svItemTextId"
					}, {
						"name" : "defTextId",
						"value" : "svItemDefTextId"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionItem"
					}
				};
			case "enItem":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "enItem"
						}, {
							"name" : "type",
							"value" : "metadataCollectionItem"
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
						"value" : "en"
					}, {
						"name" : "textId",
						"value" : "enItemTextId"
					}, {
						"name" : "defTextId",
						"value" : "enItemDefTextId"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionItem"
					}
				};
			case "systemLanguagesCollection":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "systemLanguagesCollection"
						}, {
							"name" : "type",
							"value" : "metadataItemCollection"
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
						"value" : "systemLanguagesCollection"
					}, {
						"name" : "textId",
						"value" : "systemLanguagesCollectionTextId"
					}, {
						"name" : "defTextId",
						"value" : "systemLanguagesCollectionDefTextId"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "svItem"
						}, {
							"name" : "ref",
							"value" : "enItem"
						} ],
						"name" : "collectionItemReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "itemCollection"
					}
				};
			case "systemLanguagesCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "systemLanguagesCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "lang"
					}, {
						"name" : "textId",
						"value" : "systemLanguagesCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "systemLanguagesCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "systemLanguagesCollection"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "systemLanguageSvCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "systemLanguageSvCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "lang"
					}, {
						"name" : "textId",
						"value" : "systemLanguageSvCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "systemLanguageSvCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "systemLanguagesCollection"
					}, {
						"name" : "refParentId",
						"value" : "systemLanguagesCollectionVar"
					}, {
						"name" : "finalValue",
						"value" : "sv"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "systemLanguageEnCollectionVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "systemLanguageEnCollectionVar"
						}, {
							"name" : "type",
							"value" : "metadataCollectionVariable"
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
						"value" : "lang"
					}, {
						"name" : "textId",
						"value" : "systemLanguageEnCollectionVarTextId"
					}, {
						"name" : "defTextId",
						"value" : "systemLanguageEnCollectionVarDefTextId"
					}, {
						"name" : "refCollectionId",
						"value" : "systemLanguagesCollection"
					}, {
						"name" : "refParentId",
						"value" : "systemLanguagesCollectionVar"
					}, {
						"name" : "finalValue",
						"value" : "en"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "collectionVariable"
					}
				};
			case "textTextVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "textTextVar"
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
						"value" : "text"
					}, {
						"name" : "textId",
						"value" : "textTextVarText"
					}, {
						"name" : "defTextId",
						"value" : "textTextVarDefText"
					}, {
						"name" : "regEx",
						"value" : "(.*)"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "textVariable"
					}
				};
			case "textPartGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "textPart"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textPartGroup"
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
						"value" : "textPartGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textPartGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextVar"
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
							"value" : "textPartTypeCollectionVar"
						}, {
							"name" : "ref",
							"value" : "systemLanguageCollectionVar"
						} ],
						"name" : "attributeReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textPartDefaultGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "textPart"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textPartDefaultGroup"
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
						"value" : "textPartDefaultGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textPartDefaultGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextVar"
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
						"name" : "refParentId",
						"value" : "textPartGroup"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "textPartTypeDefaultCollectionVar"
						}, {
							"name" : "ref",
							"value" : "systemLanguageCollectionVar"
						} ],
						"name" : "attributeReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textPartSvGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "textPart"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textPartSvGroup"
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
						"value" : "textPartSvGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textPartSvGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextVar"
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
						"name" : "refParentId",
						"value" : "textPartDefaultGroup"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "textPartTypeDefaultCollectionVar"
						}, {
							"name" : "ref",
							"value" : "systemLanguageSvCollectionVar"
						} ],
						"name" : "attributeReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textPartAlternativeGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "textPart"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textPartAlternativeGroup"
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
						"value" : "textPartAlternativeGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textPartAlternativeGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextVar"
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
						"name" : "refParentId",
						"value" : "textPartGroup"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "textPartTypeAlternativeCollectionVar"
						}, {
							"name" : "ref",
							"value" : "systemLanguageCollectionVar"
						} ],
						"name" : "attributeReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textPartEnGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "textPart"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textPartEnGroup"
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
						"value" : "textPartEnGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textPartEnGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextVar"
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
						"name" : "refParentId",
						"value" : "textPartAlternativeGroup"
					}, {
						"children" : [ {
							"name" : "ref",
							"value" : "textPartTypeAlternativeCollectionVar"
						}, {
							"name" : "ref",
							"value" : "systemLanguageEnCollectionVar"
						} ],
						"name" : "attributeReferences"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "text"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textGroup"
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
						"value" : "textGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoTextGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "X"
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
			case "textDefaultAlternativeGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "text"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textDefaultAlternativeGroup"
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
						"value" : "textDefaultAlternativeGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textDefaultAlternativeGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoTextGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartDefaultGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "3",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartAlternativeGroup"
							}, {
								"name" : "repeatMin",
								"value" : "0"
							}, {
								"name" : "repeatMax",
								"value" : "X"
							} ],
							"name" : "childReference"
						} ],
						"name" : "childReferences"
					}, {
						"name" : "refParentId",
						"value" : "text"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textSystemOneGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "text"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneGroup"
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
						"value" : "textSystemOneGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textSystemOneGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoTextGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartSvGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "3",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartEnGroup"
							}, {
								"name" : "repeatMin",
								"value" : "0"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						} ],
						"name" : "childReferences"
					}, {
						"name" : "refParentId",
						"value" : "textDefaultAlternativeGroup"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};
			case "textSystemOneNewGroup":
				return {
					"children" : [ {
						"name" : "nameInData",
						"value" : "text"
					}, {
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneNewGroup"
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
						"value" : "textSystemOneGroupText"
					}, {
						"name" : "defTextId",
						"value" : "textSystemOneGroupDefText"
					}, {
						"children" : [ {
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoNewTextGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartSvGroup"
							}, {
								"name" : "repeatMin",
								"value" : "1"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						}, {
							"repeatId" : "3",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartEnGroup"
							}, {
								"name" : "repeatMin",
								"value" : "0"
							}, {
								"name" : "repeatMax",
								"value" : "1"
							} ],
							"name" : "childReference"
						} ],
						"name" : "childReferences"
					}, {
						"name" : "refParentId",
						"value" : "textDefaultAlternativeGroup"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "group"
					}
				};

			case "recordInfoNewTextGroup":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "recordInfoNewTextGroup"
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
								"value" : "idTextTextVar"
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
			case "idTextTextVar":
				return {
					"children" : [ {
						"children" : [ {
							"name" : "id",
							"value" : "idTextTextVar"
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
						"value" : "idTextTextVarText"
					}, {
						"name" : "defTextId",
						"value" : "idTextTextVarDefText"
					}, {
						"name" : "regEx",
						"value" : "(.*Text$)"
					}, {
						"name" : "refParentId",
						"value" : "idTextVar"
					} ],
					"name" : "metadata",
					"attributes" : {
						"type" : "textVariable"
					}
				};
			case "idTextVar":
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
			case "":
				return;
				// presentation
			case "textSystemOneNewPGroup":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pGroup"
					},
					"children" : [ createRecordInfoJson(metadataId) ].concat([ {
						"name" : "presentationOf",
						"value" : "textSystemOneNewGroup"
					}, {
						"name" : "childReferences",
						"children" : [ {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textSystemOneNewPGroupText"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "0",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoNewTextPGroup"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartSvPGroup"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartEnSContainer"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ])
				};
			case "recordInfoNewTextPGroup":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pGroup"
					},
					"children" : [ createRecordInfoJson(metadataId) ].concat([ {
						"name" : "presentationOf",
						"value" : "recordInfoNewTextGroup"
					}, {
						"name" : "childReferences",
						"children" : [ {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "recordInfoNewTextPGroupText"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "idTextTextPVar"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ])
				};
			case "textPartSvPGroup":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pGroup"
					},
					"children" : [ createRecordInfoJson(metadataId) ].concat([ {
						"name" : "presentationOf",
						"value" : "textPartSvGroup"
					}, {
						"name" : "childReferences",
						"children" : [ {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartSvPGroupText"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextPVar"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ])
				};
			case "textPartEnSContainer":
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
							"value" : "textPartEnGroup"
						} ]
					}, {
						"name" : "childReferences",
						"children" : [ {
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartEnPGroupText"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						}, {
							"name" : "childReference",
							"repeatId" : "2",
							"children" : [ {
								"name" : "ref",
								"value" : "textPartEnPGroup"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ]
				};
			case "textPartEnPGroup":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pGroup"
					},
					"children" : [ createRecordInfoJson(metadataId) ].concat([ {
						"name" : "presentationOf",
						"value" : "textPartEnGroup"
					}, {
						"name" : "childReferences",
						"children" : [ 
//						               {
//							"name" : "childReference",
//							"repeatId" : "1",
//							"children" : [ {
//								"name" : "ref",
//								"value" : "textPartEnPGroupText"
//							}, {
//								"name" : "default",
//								"value" : "ref"
//							} ]
//						}, 
						{
							"name" : "childReference",
							"repeatId" : "1",
							"children" : [ {
								"name" : "ref",
								"value" : "textTextPVar"
							}, {
								"name" : "default",
								"value" : "ref"
							} ]
						} ]
					} ])
				};
			case "idTextTextPVar":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pVar"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "idTextTextPVar"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "idTextTextVar"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};
				break;
			case "textTextPVar":
				return {
					"name" : "presentation",
					"attributes" : {
						"type" : "pVar"
					},
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textTextPVar"
						} ]
					}, {
						"name" : "presentationOf",
						"value" : "textTextVar"
					}, {
						"name" : "mode",
						"value" : "input"
					} ]
				};
				break;

			case "idTextTextOutputPVar":
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
						"value" : "idTextTextVar"
					}, {
						"name" : "mode",
						"value" : "output"
					} ]
				};
				break;

			case "":
				return;
			case "":
				return;
			case "":
				// Text
			case "textSystemOneNewPGroupText":
				return {
					"name" : "text",
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneNewPGroupText"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "default",
							"lang" : "sv"
						},
						"children" : [ {
							"name" : "text",
							"value" : "En ny text"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "alternative",
							"lang" : "en"
						},
						"children" : [ {
							"name" : "text",
							"value" : "A new text"
						} ]
					} ]
				};
			case "recordInfoNewTextPGroupText":
				return {
					"name" : "text",
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneNewPGroupText"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "default",
							"lang" : "sv"
						},
						"children" : [ {
							"name" : "text",
							"value" : "Textid"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "alternative",
							"lang" : "en"
						},
						"children" : [ {
							"name" : "text",
							"value" : "Text id"
						} ]
					} ]
				};
			case "textPartSvPGroupText":
				return {
					"name" : "text",
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneNewPGroupText"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "default",
							"lang" : "sv"
						},
						"children" : [ {
							"name" : "text",
							"value" : "Svenska"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "alternative",
							"lang" : "en"
						},
						"children" : [ {
							"name" : "text",
							"value" : "Swedish"
						} ]
					} ]
				};

			case "textPartEnPGroupText":
				return {
					"name" : "text",
					"children" : [ {
						"name" : "recordInfo",
						"children" : [ {
							"name" : "id",
							"value" : "textSystemOneNewPGroupText"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "default",
							"lang" : "sv"
						},
						"children" : [ {
							"name" : "text",
							"value" : "Engelska"
						} ]
					}, {
						"name" : "textPart",
						"attributes" : {
							"type" : "alternative",
							"lang" : "en"
						},
						"children" : [ {
							"name" : "text",
							"value" : "English"
						} ]
					} ]
				};
			case "":
				return;
			case "":
				return;
			case "":
				return;
			case "":
				return;
			default:
				console.log("Id(" + metadataId + ") not found in metadataProviderRealStub");
				throw new Error("Id(" + metadataId + ") not found in metadataProviderRealStub");
			}

			return text;
		}

		return Object.freeze({
			getMetadataById : getMetadataById
		});
	};
	return coraTest;
}(CORATEST || {}));