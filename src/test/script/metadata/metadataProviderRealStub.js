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

			var metadataArray = [];

			// switch (metadataId) {
			metadataArray["defaultItem"] = {
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
			metadataArray["alternativeItem"] = {
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
			metadataArray["textPartTypeCollection"] = {
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
			metadataArray["textPartTypeCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "textPartTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["textPartTypeDefaultCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "textPartTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
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
			metadataArray["textPartTypeAlternativeCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "textPartTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
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
			metadataArray["svItem"] = {
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
			metadataArray["enItem"] = {
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
			metadataArray["systemLanguagesCollection"] = {
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
			metadataArray["systemLanguagesCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "systemLanguagesCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["systemLanguageSvCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "systemLanguagesCollection"
	                             }
	                           ],
	                           "name": "refCollection"
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
			metadataArray["systemLanguageEnCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "systemLanguagesCollection"
	                             }
	                           ],
	                           "name": "refCollection"
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
			metadataArray["textTextVar"] = {
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
			metadataArray["textPartGroup"] = {
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
			metadataArray["textPartDefaultGroup"] = {
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
			metadataArray["textPartSvGroup"] = {
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
			metadataArray["textPartAlternativeGroup"] = {
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
			metadataArray["textPartEnGroup"] = {
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
			metadataArray["textGroup"] = {
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
			metadataArray["textDefaultAlternativeGroup"] = {
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
			metadataArray["textSystemOneGroup"] = {
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
			metadataArray["textSystemOneNewGroup"] = {
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
			metadataArray["recordInfoNewTextGroup"] = {
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
			metadataArray["recordInfoNewPVarGroup"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoNewPVarGroup"
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
			metadataArray["idTextTextVar"] = {
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
			metadataArray["idPVarTextVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "idPVarTextVar"
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
					"value" : "idPVarTextVarText"
				}, {
					"name" : "defTextId",
					"value" : "idPVarTextVarDefText"
				}, {
					"name" : "regEx",
					"value" : "(.*PVar$)"
				}, {
					"name" : "refParentId",
					"value" : "idTextVar"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["idTextVar"] = {
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
			metadataArray["recordTypeGroup"] = {
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
			metadataArray["metadataIdTextVar"] = {
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
			metadataArray["abstractTextVar"] = {
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
			metadataArray["parentIdTextVar"] = {
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
			metadataArray["recordInfo"] = {
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
			metadataArray["typeTextVar"] = {
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
			metadataArray["createdByTextVar"] = {
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
			metadataArray["presentationViewIdTextVar"] = {
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
			metadataArray["presentationFormIdTextVar"] = {
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
			metadataArray["newMetadataIdTextVar"] = {
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
			metadataArray["newPresentationFormIdTextVar"] = {
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
			metadataArray["listPresentationViewIdTextVar"] = {
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
			metadataArray["searchMetadataIdTextVar"] = {
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
			metadataArray["searchPresentationFormIdTextVar"] = {
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
			metadataArray["userSuppliedIdTextVar"] = {
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
			metadataArray["permissionKeyTextVar"] = {
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
			metadataArray["selfPresentationViewIdTextVar"] = {
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
			metadataArray["recordInfoTextGroup"] = {
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
			// case "systemLanguagesCollectionVar":
			// return {
			// "children" : [ {
			// "children" : [ {
			// "name" : "id",
			// "value" : "systemLanguagesCollectionVar"
			// }, {
			// "name" : "type",
			// "value" : "metadataCollectionVariable"
			// }, {
			// "name" : "createdBy",
			// "value" : "userId"
			// }, {
			// "name" : "updatedBy",
			// "value" : "userId"
			// } ],
			// "name" : "recordInfo"
			// }, {
			// "name" : "nameInData",
			// "value" : "lang"
			// }, {
			// "name" : "textId",
			// "value" : "systemLanguagesCollectionVarTextId"
			// }, {
			// "name" : "defTextId",
			// "value" : "systemLanguagesCollectionVarDefTextId"
			// }, {
			// "name" : "refCollectionId",
			// "value" : "systemLanguagesCollection"
			// } ],
			// "name" : "metadata",
			// "attributes" : {
			// "type" : "collectionVariable"
			// }
			// };
			// TODO: REMOVE
			metadataArray["systemLanguageCollectionVar"] = {
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
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "systemLanguagesCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["presentationVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVar"
					}, {
						"name" : "type",
						"value" : "recordType"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"value" : "presentationVarGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "presentationVarViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "presentationVarFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "presentationVarNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "presentationVarFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "presentationVarMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "presentationVarListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "presentationVarSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "presentationVarFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_PRESENTATIONVAR"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "presentationVarViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "presentation"
				} ],
				"name" : "recordType"
			};
			metadataArray["presentationVarNewGroup"] = {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarNewGroup"
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
					"value" : "presentationVarNewGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationVarNewGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoNewPVarGroup"
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
							"value" : "presentationOfTextVar"
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
							"value" : "modeCollectionVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "0"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatCollectionVar"
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
					"children" : [ {
						"name" : "ref",
						"value" : "presentationTypePVarCollectionVar"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationVarGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
			metadataArray["presentationVarGroup"] = {
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
							// "value": "recordInfoPVarGroup"
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
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVar"
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
							"value" : "modeCollectionVar"
						}, {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVar"
						}, {
							"name" : "repeatMin",
							"value" : "0"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatCollectionVar"
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
			metadataArray["emptyTextIdTextVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "emptyTextIdTextVar"
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
					"value" : "emptyTextId"
				}, {
					"name" : "textId",
					"value" : "emptyTextIdTextVarText"
				}, {
					"name" : "defTextId",
					"value" : "emptyTextIdTextVarDefText"
				}, {
					"name" : "regEx",
					"value" : "(.*Text$)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["presentationOfTextVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationOfTextVar"
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
					"value" : "presentationOf"
				}, {
					"name" : "textId",
					"value" : "presentationOfTextVarText"
				}, {
					"name" : "defTextId",
					"value" : "presentationOfTextVarDefText"
				}, {
					"name" : "regEx",
					"value" : "(.*)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["modeCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "modeCollectionVar"
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
					"value" : "mode"
				}, {
					"name" : "textId",
					"value" : "modeCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "modeCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "modeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         }],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["modeCollection"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "modeCollection"
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
					"value" : "modeCollection"
				}, {
					"name" : "textId",
					"value" : "modeCollectionTextId"
				}, {
					"name" : "defTextId",
					"value" : "modeCollectionDefTextId"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "inputItem"
					}, {
						"name" : "ref",
						"value" : "outputItem"
					} ],
					"name" : "collectionItemReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "itemCollection"
				}
			};
			metadataArray["inputItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "inputItem"
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
					"value" : "input"
				}, {
					"name" : "textId",
					"value" : "inputItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "inputItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["outputItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "outputItem"
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
					"value" : "output"
				}, {
					"name" : "textId",
					"value" : "outputItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "outputItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["presentationTypePVarCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationTypePVarCollectionVar"
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
					"value" : "presentationTypePVarCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "presentationTypePVarCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "presentationTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         }, {
					"name" : "refParentId",
					"value" : "presentationTypeCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "pVar"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["presentationTypeCollection"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationTypeCollection"
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
					"value" : "presentationTypeCollection"
				}, {
					"name" : "textId",
					"value" : "presentationTypeCollectionTextId"
				}, {
					"name" : "defTextId",
					"value" : "presentationTypeCollectionDefTextId"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "pGroupItem"
					}, {
						"name" : "ref",
						"value" : "pVarItem"
					}, {
						"name" : "ref",
						"value" : "containerItem"
					} ],
					"name" : "collectionItemReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "itemCollection"
				}
			};
			metadataArray["containerItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "containerItem"
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
					"value" : "container"
				}, {
					"name" : "textId",
					"value" : "containerItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "containerItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["pGroupItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "pGroupItem"
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
					"value" : "pGroup"
				}, {
					"name" : "textId",
					"value" : "pGroupItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "pGroupItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["pVarItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "pVarItem"
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
					"value" : "pVar"
				}, {
					"name" : "textId",
					"value" : "pVarItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "pVarItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["presentationTypeCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationTypeCollectionVar"
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
					"value" : "presentationTypeCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "presentationTypeCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "presentationTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["outputFormatCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "outputFormatCollectionVar"
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
					"value" : "outputFormat"
				}, {
					"name" : "textId",
					"value" : "outputFormatCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "outputFormatCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "outputFormatCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["outputFormatCollection"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "outputFormatCollection"
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
					"value" : "outputFormatCollection"
				}, {
					"name" : "textId",
					"value" : "outputFormatCollectionTextId"
				}, {
					"name" : "defTextId",
					"value" : "outputFormatCollectionDefTextId"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "textItem"
					}, {
						"name" : "ref",
						"value" : "imageItem"
					}, {
						"name" : "ref",
						"value" : "videoItem"
					}, {
						"name" : "ref",
						"value" : "soundItem"
					}, {
						"name" : "ref",
						"value" : "downloadItem"
					} ],
					"name" : "collectionItemReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "itemCollection"
				}
			};
			metadataArray["textItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "textItem"
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
					"value" : "text"
				}, {
					"name" : "textId",
					"value" : "textItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "textItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["imageItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "imageItem"
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
					"value" : "image"
				}, {
					"name" : "textId",
					"value" : "imageItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "imageItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["videoItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "videoItem"
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
					"value" : "video"
				}, {
					"name" : "textId",
					"value" : "videoItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "videoItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["soundItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "soundItem"
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
					"value" : "sound"
				}, {
					"name" : "textId",
					"value" : "soundItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "soundItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["downloadItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "downloadItem"
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
					"value" : "download"
				}, {
					"name" : "textId",
					"value" : "downloadItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "downloadItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["presentationGroup"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationGroup"
					}, {
						"name" : "type",
						"value" : "recordType"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"value" : "presentationGroupGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "presentationGroupViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "presentationGroupFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "presentationGroupNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "presentationGroupFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "presentationGroupMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "presentationGroupListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "presentationGroupSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "presentationGroupFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_PRESENTATIONGROUP"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "presentationGroupViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "presentation"
				} ],
				"name" : "recordType"
			};
			metadataArray["presentationGroupNewGroup"] = {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationGroupNewGroup"
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
					"value" : "presentationGroupNewGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationGroupNewGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoNewPGroupGroup"
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
							"value" : "presentationOfTextVar"
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
							"value" : "presentationChildReferencesGroup"
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
						"value" : "presentationTypePGroupCollectionVar"
					} ],
					"name" : "attributeReferences"
				}, {
					"name" : "refParentId",
					"value" : "presentationGroupGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "group"
				}
			};
			metadataArray["presentationGroupGroup"] = {
				"children" : [ {
					"name" : "nameInData",
					"value" : "presentation"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationGroupGroup"
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
					"value" : "presentationGroupGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationGroupGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
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
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVar"
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
							"value" : "presentationChildReferencesGroup"
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
						"value" : "presentationTypePGroupCollectionVar"
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
			metadataArray["recordInfoNewPGroupGroup"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordInfoNewPGroupGroup"
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
							"value" : "idPGroupTextVar"
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
			metadataArray["presentationChildReferencesGroup"] = {
				"children" : [ {
					"name" : "nameInData",
					"value" : "childReferences"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationChildReferencesGroup"
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
					"value" : "presentationChildReferencesGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationChildReferencesGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceGroup"
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
			metadataArray["presentationChildReferenceGroup"] = {
				"children" : [ {
					"name" : "nameInData",
					"value" : "childReference"
				}, {
					"children" : [ {
						"name" : "id",
						"value" : "presentationChildReferenceGroup"
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
					"value" : "presentationChildReferenceGroupText"
				}, {
					"name" : "defTextId",
					"value" : "presentationChildReferenceGroupDefText"
				}, {
					"children" : [ {
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationRef"
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
							"value" : "presentationRefMinimized"
						}, {
							"name" : "repeatMin",
							"value" : "0"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						} ],
						"name" : "childReference"
					}, {
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "defaultPresentationCollectionVar"
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
			metadataArray["presentationTypePGroupCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationTypePGroupCollectionVar"
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
					"value" : "presentationTypePGroupCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "presentationTypePGroupCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "presentationTypeCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         }, {
					"name" : "refParentId",
					"value" : "presentationTypeCollectionVar"
				}, {
					"name" : "finalValue",
					"value" : "pGroup"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["presentationRef"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationRef"
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
					"value" : "ref"
				}, {
					"name" : "textId",
					"value" : "presentationRefText"
				}, {
					"name" : "defTextId",
					"value" : "presentationRefDefText"
				}, {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["presentationRefMinimized"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationRefMinimized"
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
					"value" : "refMinimized"
				}, {
					"name" : "textId",
					"value" : "presentationRefMinimizedText"
				}, {
					"name" : "defTextId",
					"value" : "presentationRefMinimizedDefText"
				}, {
					"name" : "regEx",
					"value" : "(^[0-9A-Za-z:-_]{2,50}$)"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["defaultPresentationCollectionVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "defaultPresentationCollectionVar"
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
					"value" : "default"
				}, {
					"name" : "textId",
					"value" : "defaultPresentationCollectionVarTextId"
				}, {
					"name" : "defTextId",
					"value" : "defaultPresentationCollectionVarDefTextId"
				}, {
	                "children": [
	                             {
	                               "name": "linkedRecordType",
	                               "value": "metadataItemCollection"
	                             },
	                             {
	                               "name": "linkedRecordId",
	                               "value": "defaultPresentationCollection"
	                             }
	                           ],
	                           "name": "refCollection"
	                         } ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionVariable"
				}
			};
			metadataArray["defaultPresentationCollection"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "defaultPresentationCollection"
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
					"value" : "defaultPresentationCollection"
				}, {
					"name" : "textId",
					"value" : "defaultPresentationCollectionTextId"
				}, {
					"name" : "defTextId",
					"value" : "defaultPresentationCollectionDefTextId"
				}, {
					"children" : [ {
						"name" : "ref",
						"value" : "refItem"
					}, {
						"name" : "ref",
						"value" : "refMinimizedItem"
					} ],
					"name" : "collectionItemReferences"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "itemCollection"
				}
			};
			metadataArray["refItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "refItem"
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
					"value" : "ref"
				}, {
					"name" : "textId",
					"value" : "refItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "refItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["refMinimizedItem"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "refMinimizedItem"
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
					"value" : "refMinimized"
				}, {
					"name" : "textId",
					"value" : "refMinimizedItemTextId"
				}, {
					"name" : "defTextId",
					"value" : "refMinimizedItemDefTextId"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "collectionItem"
				}
			};
			metadataArray["presentationChildReferencesGroupText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationChildReferencesGroupText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Referenser till barn som ska visas i presentationen"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Child referenced that is included in the presentation"
					} ]
				} ]
			};
			metadataArray["presentationChildReferenceRefText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationChildReferenceRefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id på barnpresentationen"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id of the child presentation"
					} ]
				} ]
			};
			metadataArray["presentationChildReferenceMinimizedRefText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationChildReferenceMinimizedRefText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id på den minimierade barnpresentationen"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id of the minimized child presentation"
					} ]
				} ]
			};
			// presentation
			metadataArray["textListPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textListPGroup") ].concat([ {
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
			metadataArray["textSystemOneListPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textSystemOneListPGroup") ].concat([ {
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
			metadataArray["textSystemOneFormNewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textSystemOneFormNewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "textSystemOneNewGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "textSystemOneNewPGroupText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoNewTextPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "textPartSvPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
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
			metadataArray["textSystemOneFormPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textSystemOneFormPGroup") ].concat([ {
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
			metadataArray["textSystemOneViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textSystemOneViewPGroup") ].concat([ {
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
			metadataArray["textViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textViewPGroup") ].concat([ {
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
					// "value" : "textDefaultPGroupText"
					// }, {
					// "name" : "default",
					// "value" : "ref"
					// } ]
					// },
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
			metadataArray["textMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textMenuPGroup") ].concat([ {
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
			metadataArray["textSystemOneMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textSystemOneMenuPGroup") ].concat([ {
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
			metadataArray["recordInfoNewTextPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoNewTextPGroup") ].concat([ {
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
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "idTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["recordInfoNewPVarPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoNewPVarPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "recordInfoNewPVarGroup"
				}, {
					"name" : "childReferences",
					"children" : [
					// {
					// "name" : "childReference",
					// "repeatId" : "1",
					// "children" : [ {
					// "name" : "ref",
					// "value" : "recordInfoNewTextPGroupText"
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
							"value" : "idPVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["recordInfoTextPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoTextPGroup") ].concat([ {
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
						"repeatId" : "2",
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
			metadataArray["recordInfoTextMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoTextMenuPGroup") ].concat([ {
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
			metadataArray["textPartDefaultPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartDefaultPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "textPartDefaultGroup"
				}, {
					"name" : "childReferences",
					"children" : [
					// {
					// "name" : "childReference",
					// "repeatId" : "1",
					// "children" : [ {
					// "name" : "ref",
					// "value" : "textPartDefaultPGroupText"
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
							"value" : "textTextOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["textPartAlternativePGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartAlternativePGroup") ].concat([ {
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
						"repeatId" : "2",
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
			metadataArray["textPartSvPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartSvPGroup") ].concat([ {
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
						"repeatId" : "2",
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
			metadataArray["textPartSvOutputPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartSvOutputPGroup") ].concat([ {
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
						"repeatId" : "2",
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
			metadataArray["textPartSvMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartSvMenuPGroup") ].concat([ {
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
			metadataArray["textPartEnSContainer"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartEnSContainer"
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
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "textPartEnPGroupText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
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
			metadataArray["textPartEnOutputSContainer"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "container",
					"repeat" : "children"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "textPartEnOutputSContainer"
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
						"repeatId" : "11",
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
			metadataArray["textPartEnPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartEnPGroup") ].concat([ {
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
			metadataArray["textPartEnOutputPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("textPartEnOutputPGroup") ].concat([ {
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
			metadataArray["idPVarPVar"] = {
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
			metadataArray["idTextVarPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "idTextVarPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "idTextTextVar"
				}, {
					"name" : "mode",
					"value" : "input"
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
			metadataArray["textTextPVar"] = {
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
			metadataArray["textTextOutputPVar"] = {
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

			metadataArray["idTextTextOutputPVar"] = {
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
			metadataArray["recordTypeListPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordTypeListPGroup") ].concat([ {
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
						"repeatId" : "11",
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
			metadataArray["recordInfoPGroup"] = {
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
			metadataArray["idTextOutputPVar"] = {
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
			// Text
			metadataArray["recordTypePGroupText"] = {
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
			metadataArray["textSystemOneNewPGroupText"] = {
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
			metadataArray["textSystemOnePGroupText"] = {
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
			metadataArray["recordInfoNewTextPGroupText"] = {
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
			metadataArray["recordInfoTextPGroupText"] = {
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
			metadataArray["textPartDefaultPGroupText"] = {
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
			metadataArray["textPartAlternativePGroupText"] = {
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
			metadataArray["textPartSvPGroupText"] = {
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
			metadataArray["textPartEnPGroupText"] = {
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
			metadataArray["presentationVarFormNewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationVarFormNewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationVarNewGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationVarIdText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoNewPVarPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {

						"name" : "childReference",
						"repeatId" : "6",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "7",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {

						"name" : "childReference",
						"repeatId" : "8",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatCollectionVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationVarFormPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationVarFormPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationVarGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationVarIdText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {

						"name" : "childReference",
						"repeatId" : "6",
						"children" : [ {
							"name" : "ref",
							"value" : "emptyTextIdTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "7",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {

						"name" : "childReference",
						"repeatId" : "8",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatCollectionVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationVarMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationVarMenuPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationVarGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationVarViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationVarViewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationVarGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationVarIdText"
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
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "modeCollectionVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "7",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {

						"name" : "childReference",
						"repeatId" : "8",
						"children" : [ {
							"name" : "ref",
							"value" : "outputFormatCollectionVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["emptyTextIdTextVarPVar"] = {
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
			metadataArray["presentationOfTextVarPVar"] = {
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
				} ]
			};
			metadataArray["presentationOfTextVarOutputPVar"] = {
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
				} ]
			};
			metadataArray["modeCollectionVarPVar"] = {
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
				} ]
			};
			metadataArray["modeCollectionVarOutputPVar"] = {
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
					"value" : "output"
				}
				// , {
				// "name" : "emptyTextId",
				// "value" : "initialEmptyValueText"
				// }
				]
			};
			metadataArray["outputFormatCollectionVarPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "outputFormatCollectionVarPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "outputFormatCollectionVar"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "initialEmptyValueText"
				} ]
			};
			metadataArray["outputFormatCollectionVarOutputPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "outputFormatCollectionVarPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "outputFormatCollectionVar"
				}, {
					"name" : "mode",
					"value" : "output"
				}
				// , {
				// "name" : "emptyTextId",
				// "value" : "initialEmptyValueText"
				// }
				]
			};
			metadataArray["presentationVarIdText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationVarIdText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id"
					} ]
				} ]
			};
			metadataArray["presentationGroupIdText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationGroupIdText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Id"
					} ]
				} ]
			};
			metadataArray["presentationOfTextVarText"] = {
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
			metadataArray["defaultPresentationCollectionText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "defaultPresentationCollectionText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Presentation att visa initialt"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Default presentation"
					} ]
				} ]
			};
			metadataArray["modeCollectionTextVarText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "modeCollectionTextVarText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Presentationsläge"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Mode of presentation"
					} ]
				} ]
			};
			metadataArray["outputFormatVarText"] = {
				"name" : "text",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "outputFormatVarText"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "default",
						"lang" : "sv"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Format för output"
					} ]
				}, {
					"name" : "textPart",
					"attributes" : {
						"type" : "alternative",
						"lang" : "en"
					},
					"children" : [ {
						"name" : "text",
						"value" : "Output format"
					} ]
				} ]
			};
			metadataArray["emptyTextIdTextVarText"] = {
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
			metadataArray["presentationVarListPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationVarListPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationVarGroup"
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
						"repeatId" : "11",
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
			metadataArray["recordInfoPVarPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoPVarPGroup") ].concat([ {
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
			metadataArray["recordInfoPVarGroup"] = {
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
			metadataArray["presentationGroupFormNewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationGroupFormNewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationGroupNewGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationGroupIdText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoNewPGroupPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferencesGroupPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationGroupFormPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationGroupFormPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationGroupGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationGroupIdText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferencesGroupPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationGroupViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationGroupViewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationGroupGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationGroupIdText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "11",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferencesGroupViewPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["recordInfoNewPGroupPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("recordInfoNewPGroupPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "recordInfoNewPGroupGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "idPGroupPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["idPGroupPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "idPGroupPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "idPGroupTextVar"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
			metadataArray["idPGroupTextVar"] = {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "idPGroupTextVar"
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
					"value" : "idPGroupTextVarText"
				}, {
					"name" : "defTextId",
					"value" : "idPGroupTextVarDefText"
				}, {
					"name" : "regEx",
					"value" : "(.*PGroup$)"
				}, {
					"name" : "refParentId",
					"value" : "idTextVar"
				} ],
				"name" : "metadata",
				"attributes" : {
					"type" : "textVariable"
				}
			};
			metadataArray["presentationGroupMenuPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationGroupMenuPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationGroupGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "recordInfoPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationOfTextGroupOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationOfTextGroupOutputPVar"] = {
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
				} ]
			};
			metadataArray["presentationChildReferencesGroupPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationChildReferencesGroupPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationChildReferencesGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferencesGroupText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceGroupPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationChildReferenceGroupPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationChildReferenceGroupPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationChildReferenceGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceRefText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationRefPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceMinimizedRefText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationRefMinimizedPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "defaultPresentationCollectionText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "5",
						"children" : [ {
							"name" : "ref",
							"value" : "defaultPresentationCollectionVarPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationChildReferencesGroupViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationChildReferencesGroupViewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationChildReferencesGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferencesGroupText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceGroupViewPGroup"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationChildReferenceGroupViewPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationChildReferenceGroupViewPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationChildReferenceGroup"
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"repeatId" : "0",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceRefText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "1",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationRefOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "2",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationChildReferenceMinimizedRefText"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "3",
						"children" : [ {
							"name" : "ref",
							"value" : "presentationRefMinimizedOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					}, {
						"name" : "childReference",
						"repeatId" : "4",
						"children" : [ {
							"name" : "ref",
							"value" : "defaultPresentationCollectionVarOutputPVar"
						}, {
							"name" : "default",
							"value" : "ref"
						} ]
					} ]
				} ])
			};
			metadataArray["presentationRefPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationRefPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "presentationRef"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
			metadataArray["presentationRefOutputPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationRefOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "presentationRef"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
			metadataArray["presentationRefMinimizedPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationRefMinimizedPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "presentationRefMinimized"
				}, {
					"name" : "mode",
					"value" : "input"
				} ]
			};
			metadataArray["presentationRefMinimizedOutputPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "presentationRefMinimizedOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "presentationRefMinimized"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
			metadataArray["defaultPresentationCollectionVarPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "defaultPresentationCollectionVarPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "defaultPresentationCollectionVar"
				}, {
					"name" : "mode",
					"value" : "input"
				}, {
					"name" : "emptyTextId",
					"value" : "initialEmptyValueText"
				} ]
			};
			metadataArray["defaultPresentationCollectionVarOutputPVar"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pVar"
				},
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "defaultPresentationCollectionVarOutputPVar"
					} ]
				}, {
					"name" : "presentationOf",
					"value" : "defaultPresentationCollectionVar"
				}, {
					"name" : "mode",
					"value" : "output"
				} ]
			};
			metadataArray["presentationGroupListPGroup"] = {
				"name" : "presentation",
				"attributes" : {
					"type" : "pGroup"
				},
				"children" : [ createRecordInfoJson("presentationGroupListPGroup") ].concat([ {
					"name" : "presentationOf",
					"value" : "presentationGroupGroup"
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
						"repeatId" : "11",
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
			function getMetadataById(metadataId) {
				
			if (metadataArray[metadataId] !== undefined) {
				return metadataArray[metadataId];
			} else {

				// default:
				console.log("Id(" + metadataId + ") not found in metadataProviderRealStub");
				throw new Error("Id(" + metadataId + ") not found in metadataProviderRealStub");
			}
		}

		return Object.freeze({
			getMetadataById : getMetadataById,
			metadataArray:metadataArray
		});
	};
	return coraTest;
}(CORATEST || {}));