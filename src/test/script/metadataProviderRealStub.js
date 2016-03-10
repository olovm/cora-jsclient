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
								"value" : "defaultItem"
							}, {
								"name" : "ref",
								"value" : "alternativeItem"
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
				case "recordInfoNewPVarGroup":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "recordInfoNewPVarGroup"
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
										"name": "updatedBy",
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
								"value": "recordInfoText"
							},
							{
								"name": "defTextId",
								"value": "recordInfoDefText"
							},
							{
								"children": [
									{
										"repeatId": "1",
										"children": [
											{
												"name": "ref",
												"value": "idPVarTextVar"
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
				case "idPVarTextVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "idPVarTextVar"
									},
									{
										"name": "type",
										"value": "metadataTextVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "id"
							},
							{
								"name": "textId",
								"value": "idPVarTextVarText"
							},
							{
								"name": "defTextId",
								"value": "idPVarTextVarDefText"
							},
							{
								"name": "regEx",
								"value": "(.*PVar$)"
							},
							{
								"name": "refParentId",
								"value": "idTextVar"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "textVariable"
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
				case "recordTypeGroup":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "recordTypeGroup"
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
							"value" : "recordType"
						}, {
							"name" : "textId",
							"value" : "recordTypeText"
						}, {
							"name" : "defTextId",
							"value" : "recordTypeDefText"
						}, {
							"children" : [ {
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "metadataIdTextVar"
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
									"value" : "abstractTextVar"
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
									"value" : "parentIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "0"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "4",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfo"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "5",
								"children" : [ {
									"name" : "ref",
									"value" : "presentationViewIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "6",
								"children" : [ {
									"name" : "ref",
									"value" : "presentationFormIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "7",
								"children" : [ {
									"name" : "ref",
									"value" : "newMetadataIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "8",
								"children" : [ {
									"name" : "ref",
									"value" : "newPresentationFormIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "9",
								"children" : [ {
									"name" : "ref",
									"value" : "listPresentationViewIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "10",
								"children" : [ {
									"name" : "ref",
									"value" : "searchMetadataIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "11",
								"children" : [ {
									"name" : "ref",
									"value" : "searchPresentationFormIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "12",
								"children" : [ {
									"name" : "ref",
									"value" : "userSuppliedIdTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "13",
								"children" : [ {
									"name" : "ref",
									"value" : "permissionKeyTextVar"
								}, {
									"name" : "repeatMin",
									"value" : "1"
								}, {
									"name" : "repeatMax",
									"value" : "1"
								} ],
								"name" : "childReference"
							}, {
								"repeatId" : "14",
								"children" : [ {
									"name" : "ref",
									"value" : "selfPresentationViewIdTextVar"
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
				case "metadataIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "metadataIdTextVar"
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
							"value" : "metadataId"
						}, {
							"name" : "textId",
							"value" : "metadataIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "metadataIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "abstractTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "abstractTextVar"
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
							"value" : "abstract"
						}, {
							"name" : "textId",
							"value" : "abstractTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "abstractTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "^true$|^false$"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "parentIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "parentIdTextVar"
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
							"value" : "parentId"
						}, {
							"name" : "textId",
							"value" : "parentIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "parentIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "recordInfo":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "recordInfo"
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
									"value" : "idTextVar"
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
									"value" : "typeTextVar"
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
									"value" : "createdByTextVar"
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
				case "typeTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "typeTextVar"
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
							"value" : "type"
						}, {
							"name" : "textId",
							"value" : "typeTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "typeTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "createdByTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "createdByTextVar"
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
							"value" : "createdBy"
						}, {
							"name" : "textId",
							"value" : "createdByTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "createdByTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "presentationViewIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "presentationViewIdTextVar"
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
							"value" : "presentationViewId"
						}, {
							"name" : "textId",
							"value" : "presentationViewIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "presentationViewIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "presentationFormIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "presentationFormIdTextVar"
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
							"value" : "presentationFormId"
						}, {
							"name" : "textId",
							"value" : "presentationFormIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "presentationFormIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "newMetadataIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "newMetadataIdTextVar"
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
							"value" : "newMetadataId"
						}, {
							"name" : "textId",
							"value" : "newMetadataIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "newMetadataIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "newPresentationFormIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "newPresentationFormIdTextVar"
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
							"value" : "newPresentationFormId"
						}, {
							"name" : "textId",
							"value" : "newPresentationFormIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "newPresentationFormIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "listPresentationViewIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "listPresentationViewIdTextVar"
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
							"value" : "listPresentationViewId"
						}, {
							"name" : "textId",
							"value" : "listPresentationViewIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "listPresentationViewIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "searchMetadataIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "searchMetadataIdTextVar"
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
							"value" : "searchMetadataId"
						}, {
							"name" : "textId",
							"value" : "searchMetadataIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "searchMetadataIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "searchPresentationFormIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "searchPresentationFormIdTextVar"
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
							"value" : "searchPresentationFormId"
						}, {
							"name" : "textId",
							"value" : "searchPresentationFormIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "searchPresentationFormIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "userSuppliedIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "userSuppliedIdTextVar"
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
							"value" : "userSuppliedId"
						}, {
							"name" : "textId",
							"value" : "userSuppliedIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "userSuppliedIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "^true$|^false$"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "permissionKeyTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "permissionKeyTextVar"
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
							"value" : "permissionKey"
						}, {
							"name" : "textId",
							"value" : "permissionKeyTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "permissionKeyTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[A-Z\\_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "selfPresentationViewIdTextVar":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "selfPresentationViewIdTextVar"
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
							"value" : "selfPresentationViewId"
						}, {
							"name" : "textId",
							"value" : "selfPresentationViewIdTextVarText"
						}, {
							"name" : "defTextId",
							"value" : "selfPresentationViewIdTextVarDefText"
						}, {
							"name" : "regEx",
							"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
						} ],
						"name" : "metadata",
						"attributes" : {
							"type" : "textVariable"
						}
					};
				case "recordInfoTextGroup":
					return {
						"children" : [ {
							"children" : [ {
								"name" : "id",
								"value" : "recordInfoTextGroup"
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
							}, {
								"repeatId" : "2",
								"children" : [ {
									"name" : "ref",
									"value" : "typeTextVar"
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
									"value" : "createdByTextVar"
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
				case "recordInfoPVarGroup":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "recordInfoPVarGroup"
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
										"name": "updatedBy",
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
								"value": "recordInfoText"
							},
							{
								"name": "defTextId",
								"value": "recordInfoDefText"
							},
							{
								"children": [
									{
										"repeatId": "1",
										"children": [
											{
												"name": "ref",
												"value": "idPVarTextVar"
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
									,
									//{
									//	"repeatId": "2",
									//	"children": [
									//		{
									//			"name": "ref",
									//			"value": "typeTextVar"
									//		},
									//		{
									//			"name": "repeatMin",
									//			"value": "1"
									//		},
									//		{
									//			"name": "repeatMax",
									//			"value": "1"
									//		}
									//	],
									//	"name": "childReference"
									//},
									//{
									//	"repeatId": "3",
									//	"children": [
									//		{
									//			"name": "ref",
									//			"value": "createdByTextVar"
									//		},
									//		{
									//			"name": "repeatMin",
									//			"value": "1"
									//		},
									//		{
									//			"name": "repeatMax",
									//			"value": "1"
									//		}
									//	],
									//	"name": "childReference"
									//}
								],
								"name": "childReferences"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "group"
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
				// TODO: REMOVE
				case "systemLanguageCollectionVar":
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
				case "presentationVar":
					return {
						"children": [{
							"children": [{
								"name": "id",
								"value": "presentationVar"
							},{
								"name": "type",
								"value": "recordType"
							},{
								"name": "createdBy",
								"value": "userId"
							},{
								"name": "updatedBy",
								"value": "userId"
							}],
							"name": "recordInfo"
						},
							{
								"name": "metadataId",
								"value": "presentationVarGroup"
							},
							{
								"name": "presentationViewId",
								"value": "presentationVarViewPGroup"
							},
							{
								"name": "presentationFormId",
								"value": "presentationVarFormPGroup"
							},
							{
								"name": "newMetadataId",
								"value": "presentationVarNewGroup"
							},
							{
								"name": "newPresentationFormId",
								"value": "presentationVarFormNewPGroup"
							},
							{
								"name": "menuPresentationViewId",
								"value": "presentationVarMenuPGroup"
							},
							{
								"name": "listPresentationViewId",
								"value": "presentationVarListPGroup"
							},
							{
								"name": "searchMetadataId",
								"value": "presentationVarSearchGroup"
							},
							{
								"name": "searchPresentationFormId",
								"value": "presentationVarFormSearchPGroup"
							},
							{
								"name": "userSuppliedId",
								"value": "true"
							},
							{
								"name": "permissionKey",
								"value": "RECORDTYPE_PRESENTATIONVAR"
							},
							{
								"name": "selfPresentationViewId",
								"value": "presentationVarViewSelfPGroup"
							},
							{
								"name": "abstract",
								"value": "false"
							},
							{
								"name": "parentId",
								"value": "presentation"
							}
						],
						"name": "recordType"
					};
				case "presentationVarNewGroup":
					return {
						"children": [
							{
								"name": "nameInData",
								"value": "presentation"
							},
							{
								"children": [
									{
										"name": "id",
										"value": "presentationVarNewGroup"
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
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "textId",
								"value": "presentationVarNewGroupText"
							},
							{
								"name": "defTextId",
								"value": "presentationVarNewGroupDefText"
							},
							{
								"children": [
									{
										"repeatId": "1",
										"children": [
											{
												"name": "ref",
												//"value": "recordInfoNewPVarGroup"
												"value": "recordInfoNewPVarGroup"
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
												"value": "presentationOfTextVar"
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
									,
									{
										"repeatId": "3",
										"children": [
											{
												"name": "ref",
												"value": "modeCollectionVar"
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
									,
									{
										"repeatId": "4",
										"children": [
											{
												"name": "ref",
												"value": "emptyTextIdTextVar"
											},
											{
												"name": "repeatMin",
												"value": "0"
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
										"name": "ref",
										"value": "presentationTypePVarCollectionVar"
									}
								],
								"name": "attributeReferences"
							}
							,
							{
								"name": "refParentId",
								"value": "presentationVarGroup"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "group"
						}
					};
				case "presentationVarGroup":
					return{
						"children": [
							{
								"name": "nameInData",
								"value": "presentation"
							},
							{
								"children": [
									{
										"name": "id",
										"value": "presentationVarGroup"
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
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "textId",
								"value": "presentationVarGroupText"
							},
							{
								"name": "defTextId",
								"value": "presentationVarGroupDefText"
							},
							{
								"children": [
									{
										"repeatId": "1",
										"children": [
											{
												"name": "ref",
												"value": "recordInfoPVarGroup"
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
												"value": "presentationOfTextVar"
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
										"repeatId": "3",
										"children": [
											{
												"name": "ref",
												"value": "modeCollectionVar"
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
										"repeatId": "4",
										"children": [
											{
												"name": "ref",
												"value": "emptyTextIdTextVar"
											},
											{
												"name": "repeatMin",
												"value": "0"
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
										"name": "ref",
										"value": "presentationTypePVarCollectionVar"
									}
								],
								"name": "attributeReferences"
							},
							{
								"name": "refParentId",
								"value": "presentationGroup"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "group"
						}
					};
				case "emptyTextIdTextVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "emptyTextIdTextVar"
									},
									{
										"name": "type",
										"value": "metadataTextVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "emptyTextId"
							},
							{
								"name": "textId",
								"value": "emptyTextIdTextVarText"
							},
							{
								"name": "defTextId",
								"value": "emptyTextIdTextVarDefText"
							},
							{
								"name": "regEx",
								"value": "(.*Text$)"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "textVariable"
						}
					};
				case "presentationOfTextVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "presentationOfTextVar"
									},
									{
										"name": "type",
										"value": "metadataTextVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "presentationOf"
							},
							{
								"name": "textId",
								"value": "presentationOfTextVarText"
							},
							{
								"name": "defTextId",
								"value": "presentationOfTextVarDefText"
							},
							{
								"name": "regEx",
								"value": "(.*)"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "textVariable"
						}
					};
				case "modeCollectionVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "modeCollectionVar"
									},
									{
										"name": "type",
										"value": "metadataCollectionVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "mode"
							},
							{
								"name": "textId",
								"value": "modeCollectionVarTextId"
							},
							{
								"name": "defTextId",
								"value": "modeCollectionVarDefTextId"
							},
							{
								"name": "refCollectionId",
								"value": "modeCollection"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionVariable"
						}
					};
				case "modeCollection":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "modeCollection"
									},
									{
										"name": "type",
										"value": "metadataItemCollection"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "modeCollection"
							},
							{
								"name": "textId",
								"value": "modeCollectionTextId"
							},
							{
								"name": "defTextId",
								"value": "modeCollectionDefTextId"
							},
							{
								"children": [
									{
										"name": "ref",
										"value": "inputItem"
									},
									{
										"name": "ref",
										"value": "outputItem"
									}
								],
								"name": "collectionItemReferences"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "itemCollection"
						}
					};
				case "inputItem":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "inputItem"
									},
									{
										"name": "type",
										"value": "metadataCollectionItem"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "input"
							},
							{
								"name": "textId",
								"value": "inputItemTextId"
							},
							{
								"name": "defTextId",
								"value": "inputItemDefTextId"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionItem"
						}
					};
				case "outputItem":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "outputItem"
									},
									{
										"name": "type",
										"value": "metadataCollectionItem"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "output"
							},
							{
								"name": "textId",
								"value": "outputItemTextId"
							},
							{
								"name": "defTextId",
								"value": "outputItemDefTextId"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionItem"
						}
					};
				case "presentationTypePVarCollectionVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "presentationTypePVarCollectionVar"
									},
									{
										"name": "type",
										"value": "metadataCollectionVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
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
								"value": "presentationTypePVarCollectionVarTextId"
							},
							{
								"name": "defTextId",
								"value": "presentationTypePVarCollectionVarDefTextId"
							},
							{
								"name": "refCollectionId",
								"value": "presentationTypeCollection"
							},
							{
								"name": "refParentId",
								"value": "presentationTypeCollectionVar"
							},
							{
								"name": "finalValue",
								"value": "pVar"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionVariable"
						}
					};
				case "presentationTypeCollection":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "presentationTypeCollection"
									},
									{
										"name": "type",
										"value": "metadataItemCollection"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "presentationTypeCollection"
							},
							{
								"name": "textId",
								"value": "presentationTypeCollectionTextId"
							},
							{
								"name": "defTextId",
								"value": "presentationTypeCollectionDefTextId"
							},
							{
								"children": [
									{
										"name": "ref",
										"value": "pGroupItem"
									},
									{
										"name": "ref",
										"value": "pVarItem"
									},
									{
										"name": "ref",
										"value": "containerItem"
									}
								],
								"name": "collectionItemReferences"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "itemCollection"
						}
					};
				case "containerItem":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "containerItem"
									},
									{
										"name": "type",
										"value": "metadataCollectionItem"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "container"
							},
							{
								"name": "textId",
								"value": "containerItemTextId"
							},
							{
								"name": "defTextId",
								"value": "containerItemDefTextId"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionItem"
						}
					};
				case "pGroupItem":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "pGroupItem"
									},
									{
										"name": "type",
										"value": "metadataCollectionItem"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "pGroup"
							},
							{
								"name": "textId",
								"value": "pGroupItemTextId"
							},
							{
								"name": "defTextId",
								"value": "pGroupItemDefTextId"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionItem"
						}
					};
				case "pVarItem":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "pVarItem"
									},
									{
										"name": "type",
										"value": "metadataCollectionItem"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
										"value": "userId"
									}
								],
								"name": "recordInfo"
							},
							{
								"name": "nameInData",
								"value": "pVar"
							},
							{
								"name": "textId",
								"value": "pVarItemTextId"
							},
							{
								"name": "defTextId",
								"value": "pVarItemDefTextId"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionItem"
						}
					};
				case "presentationTypeCollectionVar":
					return {
						"children": [
							{
								"children": [
									{
										"name": "id",
										"value": "presentationTypeCollectionVar"
									},
									{
										"name": "type",
										"value": "metadataCollectionVariable"
									},
									{
										"name": "createdBy",
										"value": "userId"
									},
									{
										"name": "updatedBy",
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
								"value": "presentationTypeCollectionVarTextId"
							},
							{
								"name": "defTextId",
								"value": "presentationTypeCollectionVarDefTextId"
							},
							{
								"name": "refCollectionId",
								"value": "presentationTypeCollection"
							}
						],
						"name": "metadata",
						"attributes": {
							"type": "collectionVariable"
						}
					};
				case "":
					return;
				case "":
					return;
				// presentation
				case "textListPGroup":
				case "textSystemOneListPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textDefaultAlternativeGroup"
						}, {
							"name" : "childReferences",
							"children" : [
								// {
								// "name" : "childReference",
								// "repeatId" : "1",
								// "children" : [ {
								// "name" : "ref",
								// "value" : "textSystemOneNewPGroupText"
								// }, {
								// "name" : "default",
								// "value" : "ref"
								// } ]
								// }
								// ,
								{
									"name" : "childReference",
									"repeatId" : "0",
									"children" : [ {
										"name" : "ref",
										// "value" : "recordInfoTextPGroup"
										"value" : "recordInfoTextMenuPGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}, {
									"name" : "childReference",
									"repeatId" : "1",
									"children" : [ {
										"name" : "ref",
										// "value" : "textPartSvPGroup"
										"value" : "textPartDefaultPGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}, {
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "textPartAlternativePGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								} ]
						} ])
					};
				case "textSystemOneFormNewPGroup":
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
				case "textSystemOneFormPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textSystemOneGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoTextPGroup"
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
				case "textSystemOneViewPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textSystemOneGroup"
						}, {
							"name" : "childReferences",
							"children" : [  {
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoTextPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textPartSvOutputPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "2",
								"children" : [ {
									"name" : "ref",
									"value" : "textPartEnOutputSContainer"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "textViewPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textDefaultAlternativeGroup"
						}, {
							"name" : "childReferences",
							"children" : [
//					              {
//						"name" : "childReference",
//						"repeatId" : "1",
//						"children" : [ {
//							"name" : "ref",
//							"value" : "textDefaultPGroupText"
//						}, {
//							"name" : "default",
//							"value" : "ref"
//						} ]
//					},
								{
									"name" : "childReference",
									"repeatId" : "0",
									"children" : [ {
										"name" : "ref",
										"value" : "recordInfoTextPGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								{
									"name" : "childReference",
									"repeatId" : "1",
									"children" : [ {
										"name" : "ref",
										"value" : "textPartDefaultPGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
								, {
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "textPartAlternativePGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
							]
						} ])
					};
				case "textMenuPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textDefaultAlternativeGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoTextMenuPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textPartDefaultPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "textSystemOneMenuPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textSystemOneGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoTextMenuPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textPartSvMenuPGroup"
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
									"value" : "idPVarPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "recordInfoNewPVarPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "recordInfoNewPVarGroup"
						}, {
							"name" : "childReferences",
							"children" : [
							//	{
							//	"name" : "childReference",
							//	"repeatId" : "1",
							//	"children" : [ {
							//		"name" : "ref",
							//		"value" : "recordInfoNewTextPGroupText"
							//	}, {
							//		"name" : "default",
							//		"value" : "ref"
							//	} ]
							//},
								{
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "idPVarPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "recordInfoPVarPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "recordInfoPVarGroup"
						}, {
							"name" : "childReferences",
							"children" : [
								//	{
								//	"name" : "childReference",
								//	"repeatId" : "1",
								//	"children" : [ {
								//		"name" : "ref",
								//		"value" : "recordInfoNewTextPGroupText"
								//	}, {
								//		"name" : "default",
								//		"value" : "ref"
								//	} ]
								//},
								{
									"name" : "childReference",
									"repeatId" : "1",
									"children" : [ {
										"name" : "ref",
										"value" : "idPVarOutputPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								} ]
						} ])
					};
				//common recordinfo presentation
				//case "recordInfoPGroup":
				//	return {
				//		"name" : "presentation",
				//		"attributes" : {
				//			"type" : "pGroup"
				//		},
				//		"children" : [ createRecordInfoJson(metadataId) ].concat([ {
				//			"name" : "presentationOf",
				//			"value" : "recordInfo"
				//		}, {
				//			"name" : "childReferences",
				//			"children" : [ {
				//				"name" : "childReference",
				//				"repeatId" : "1",
				//				"children" : [ {
				//					"name" : "ref",
				//					"value" : "recordInfo"
				//				}, {
				//					"name" : "default",
				//					"value" : "ref"
				//				} ]
				//			}, {
				//				"name" : "childReference",
				//				"repeatId" : "1",
				//				"children" : [ {
				//					"name" : "ref",
				//					"value" : "idTextOutputPVar"
				//				}, {
				//					"name" : "default",
				//					"value" : "ref"
				//				} ]
				//			} ]
				//		} ])
				//	};
				case "recordInfoTextPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "recordInfoTextGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoTextPGroupText"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "idTextTextOutputPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "recordInfoTextMenuPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "recordInfoTextGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "idTextTextOutputPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "recordInfoPVarMenuPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "recordInfoPVarGroup"
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
				case "textPartDefaultPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textPartDefaultGroup"
						}, {
							"name" : "childReferences",
							"children" : [
//						               {
//							"name" : "childReference",
//							"repeatId" : "1",
//							"children" : [ {
//								"name" : "ref",
//								"value" : "textPartDefaultPGroupText"
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
										"value" : "textTextOutputPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								} ]
						} ])
					};
				case "textPartAlternativePGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "textPartAlternativeGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textPartAlternativePGroupText"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textTextOutputPVar"
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
				case "textPartSvOutputPGroup":
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
									"value" : "textTextOutputPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "textPartSvMenuPGroup":
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
									"value" : "textTextOutputPVar"
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
				case "textPartEnOutputSContainer":
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
									"value" : "textPartEnOutputPGroup"
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
								// {
								// "name" : "childReference",
								// "repeatId" : "1",
								// "children" : [ {
								// "name" : "ref",
								// "value" : "textPartEnPGroupText"
								// }, {
								// "name" : "default",
								// "value" : "ref"
								// } ]
								// },
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
				case "textPartEnOutputPGroup":
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
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "textTextOutputPVar"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "idPVarPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "idPVarPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "idPVarTextVar"
						}, {
							"name" : "mode",
							"value" : "input"
						} ]
					};
				case "idPVarOutputPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "idPVarOutputPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "idPVarTextVar"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
					};
				// case "idTextTextOutputPVar":
				// return {
				// "name" : "presentation",
				// "attributes" : {
				// "type" : "pVar"
				// },
				// "children" : [ {
				// "name" : "recordInfo",
				// "children" : [ {
				// "name" : "id",
				// "value" : "idTextTextPVar"
				// } ]
				// }, {
				// "name" : "presentationOf",
				// "value" : "idTextTextVar"
				// }, {
				// "name" : "mode",
				// "value" : "output"
				// } ]
				// };
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
				case "textTextOutputPVar":
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
							"value" : "output"
						} ]
					};

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
				// case "recordTypePGroup":
				case "recordTypeListPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson("recordTypePGroup") ].concat([ {
							"name" : "presentationOf",
							"value" : "recordTypeGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "recordTypePGroupText"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}, {
								"name" : "childReference",
								"repeatId" : "1",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
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
								"value" : "idTextOutputPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "idTextVar"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
					};
				// Text
				case "recordTypePGroupText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "recordTypePGroupText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Posttyp"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Record type"
							} ]
						} ]
					};
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
				case "textSystemOnePGroupText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "textSystemOnePGroupText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "En text"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "A text"
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
				case "recordInfoTextPGroupText":
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
				case "textPartDefaultPGroupText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "textPartDefaultPGroupText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Default"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Default"
							} ]
						} ]
					};
				case "textPartAlternativePGroupText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "textPartAlternativePGroupText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Alternativa översättningar"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Alternative translations"
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
				case "presentationVarFormNewPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "presentationVarNewGroup"
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
							}
								,
								{
									"name" : "childReference",
									"repeatId" : "0",
									"children" : [ {
										"name" : "ref",
										"value" : "recordInfoNewPVarPGroup"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
								,{
									"name" : "childReference",
									"repeatId" : "1",
									"children" : [ {
										"name" : "ref",
										"value" : "presentationOfTextVarText"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
								,
								{
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "presentationOfTextVarPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								{
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "modeCollectionVarPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								{
									"name" : "childReference",
									"repeatId" : "5",
									"children" : [ {
										"name" : "ref",
										"value" : "emptyTextIdTextVarText"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								{

									"name" : "childReference",
									"repeatId" : "6",
									"children" : [ {
										"name" : "ref",
										"value" : "emptyTextIdTextVarPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
							]
						} ])
					};
				case "presentationVarMenuPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "presentationVarGroup"
						}, {
							"name" : "childReferences",
							"children" : [ {
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoPVarMenuPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							} ]
						} ])
					};
				case "presentationVarViewPGroup":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pGroup"
						},
						"children" : [ createRecordInfoJson(metadataId) ].concat([ {
							"name" : "presentationOf",
							"value" : "presentationVarGroup"
						}, {
							"name" : "childReferences",
							"children" : [
								{
								"name" : "childReference",
								"repeatId" : "0",
								"children" : [ {
									"name" : "ref",
									"value" : "recordInfoPVarPGroup"
								}, {
									"name" : "default",
									"value" : "ref"
								} ]
							}
								,
								 {
									"name" : "childReference",
									"repeatId" : "1",
									"children" : [ {
										"name" : "ref",
										"value" : "presentationOfTextVarText"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								//,
								{
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "presentationOfTextVarOutputPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
								,
								{
									"name" : "childReference",
									"repeatId" : "2",
									"children" : [ {
										"name" : "ref",
										"value" : "modeCollectionVarOutputPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
								,
								{
									"name" : "childReference",
									"repeatId" : "5",
									"children" : [ {
										"name" : "ref",
										"value" : "emptyTextIdTextVarText"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								},
								{

									"name" : "childReference",
									"repeatId" : "6",
									"children" : [ {
										"name" : "ref",
										"value" : "emptyTextIdTextVarOutputPVar"
									}, {
										"name" : "default",
										"value" : "ref"
									} ]
								}
							]
							} ])
					};
				case "emptyTextIdTextVarPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "emptyTextIdTextVarPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "emptyTextIdTextVar"
						}, {
							"name" : "mode",
							"value" : "input"
						} ]
					};
				case "emptyTextIdTextVarOutputPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "emptyTextIdTextVarOutputPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "emptyTextIdTextVar"
						}, {
							"name" : "mode",
							"value" : "output"
						} ]
					};
				case "presentationOfTextVarPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "presentationOfTextVarPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "presentationOfTextVar"
						}, {
							"name" : "mode",
							"value" : "input"
						}]
					};
				case "presentationOfTextVarOutputPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "presentationOfTextVarPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "presentationOfTextVar"
						}, {
							"name" : "mode",
							"value" : "output"
						}]
					};
				case "modeCollectionVarPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "modeCollectionVarPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "modeCollectionVar"
						}, {
							"name" : "mode",
							"value" : "input"
						}, {
							"name" : "emptyTextId",
							"value" : "initialEmptyValueText"
						}  ]
					};
				case "modeCollectionVarOutputPVar":
					return {
						"name" : "presentation",
						"attributes" : {
							"type" : "pVar"
						},
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "modeCollectionVarOutputPVar"
							} ]
						}, {
							"name" : "presentationOf",
							"value" : "modeCollectionVar"
						}, {
							"name" : "mode",
							"value" : "output"
						}  ]
					};
				case "presentationOfTextVarText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "presentationOfTextVarText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Presentation av"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Presentation of"
							} ]
						} ]
					};
				case "emptyTextIdTextVarText":
					return {
						"name" : "text",
						"children" : [ {
							"name" : "recordInfo",
							"children" : [ {
								"name" : "id",
								"value" : "emptyTextIdTextVarText"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "default",
								"lang" : "sv"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Empty text id??"
							} ]
						}, {
							"name" : "textPart",
							"attributes" : {
								"type" : "alternative",
								"lang" : "en"
							},
							"children" : [ {
								"name" : "text",
								"value" : "Empty text id??"
							} ]
						} ]
					};
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
		}

		return Object.freeze({
			getMetadataById : getMetadataById
		});
	};
	return coraTest;
}(CORATEST || {}));