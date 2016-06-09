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
	coraTest.recordTypeProviderStub = function() {
		var recordTypeArray = [];

		// switch (metadataId) {
		recordTypeArray["presentationVar"] = {
			"data" : {
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
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar"
				}
			}
		};
		recordTypeArray["metadata"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadata"
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
					"value" : "metadataGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATA"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "true"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata"
				}
			}
		};
		recordTypeArray["presentationSurroundingContainer"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationSurroundingContainer"
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
					"value" : "presentationSurroundingContainerGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "presentationSurroundingContainerViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "presentationSurroundingContainerFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "presentationSurroundingContainerNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "presentationSurroundingContainerFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "presentationSurroundingContainerMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "presentationSurroundingContainerListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "presentationSurroundingContainerSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "presentationSurroundingContainerFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_PRESENTATIONSURROUNDINGCONTAINER"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "presentationSurroundingContainerViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "presentation"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer"
				}
			}
		};
		recordTypeArray["textSystemOne"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "textSystemOne"
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
					"value" : "textSystemOneGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "textSystemOneViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "textSystemOneFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "textSystemOneNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "textSystemOneFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "textSystemOneMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "textSystemOneListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "textSystemOneSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "textSystemOneFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_TEXTSYSTEMONE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "textSystemOneViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "text"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne"
				}
			}
		};
		recordTypeArray["recordType"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "recordType"
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
					"value" : "recordTypeGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "recordTypeViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "recordTypeFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "recordTypeNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "recordTypeFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "recordTypeMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "recordTypeListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "recordTypeSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "recordTypeFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_RECORDTYPE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "recordTypeViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType"
				}
			}
		};
		recordTypeArray["metadataGroup"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataGroup"
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
					"value" : "metadataGroupGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataGroupViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataGroupFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataGroupNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataGroupFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataGroupMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataGroupListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataGroupSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataGroupFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATAGROUP"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataGroupViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup"
				}
			}
		};
		recordTypeArray["metadataCollectionItem"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataCollectionItem"
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
					"value" : "metadataCollectionItemGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataCollectionItemViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataCollectionItemFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataCollectionItemNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataCollectionItemFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataCollectionItemMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataCollectionItemListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataCollectionItemSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataCollectionItemFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATACOLLECTIONITEM"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataCollectionItemViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem"
				}
			}
		};
		recordTypeArray["presentation"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentation"
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
					"value" : "presentationGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "presentationViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "presentationFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "presentationNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "presentationFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "presentationMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "presentationListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "presentationSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "presentationFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_PRESENTATION"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "presentationViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "true"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation"
				}
			}
		};
		recordTypeArray["metadataRecordLink"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataRecordLink"
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
					"value" : "metadataRecordLinkGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataRecordLinkViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataRecordLinkFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataRecordLinkNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataRecordLinkFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataRecordLinkMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataRecordLinkListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataRecordLinkSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataRecordLinkFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATARECORDLINK"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataRecordLinkViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink"
				}
			}
		};
		recordTypeArray["metadataTextVariable"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataTextVariable"
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
					"value" : "metadataTextVariableGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataTextVariableViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataTextVariableFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataTextVariableNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataTextVariableFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataTextVariableMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataTextVariableListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataTextVariableSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataTextVariableFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATATEXTVARIABLE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataTextVariableViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable"
				}
			}
		};
		recordTypeArray["presentationRepeatingContainer"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "presentationRepeatingContainer"
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
					"value" : "presentationRepeatingContainerGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "presentationRepeatingContainerViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "presentationRepeatingContainerFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "presentationRepeatingContainerNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "presentationRepeatingContainerFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "presentationRepeatingContainerMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "presentationRepeatingContainerListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "presentationRepeatingContainerSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "presentationRepeatingContainerFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_PRESENTATIONREPEATINGCONTAINER"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "presentationRepeatingContainerViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "presentation"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer"
				}
			}
		};
		recordTypeArray["metadataCollectionVariable"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataCollectionVariable"
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
					"value" : "metadataCollectionVariableGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataCollectionVariableViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataCollectionVariableFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataCollectionVariableNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataCollectionVariableFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataCollectionVariableMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataCollectionVariableListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataCollectionVariableSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataCollectionVariableFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATACOLLECTIONVARIABLE"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataCollectionVariableViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable"
				}
			}
		};
		recordTypeArray["text"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "text"
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
					"value" : "textGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "textViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "textFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "textNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "textFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "textMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "textListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "textSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "textFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_TEXT"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "textViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "true"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text"
				}
			}
		};
		recordTypeArray["presentationGroup"] = {
			"data" : {
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
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup"
				}
			}
		};
		recordTypeArray["metadataItemCollection"] = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataItemCollection"
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
					"value" : "metadataItemCollectionGroup"
				}, {
					"name" : "presentationViewId",
					"value" : "metadataItemCollectionViewPGroup"
				}, {
					"name" : "presentationFormId",
					"value" : "metadataItemCollectionFormPGroup"
				}, {
					"name" : "newMetadataId",
					"value" : "metadataItemCollectionNewGroup"
				}, {
					"name" : "newPresentationFormId",
					"value" : "metadataItemCollectionFormNewPGroup"
				}, {
					"name" : "menuPresentationViewId",
					"value" : "metadataItemCollectionMenuPGroup"
				}, {
					"name" : "listPresentationViewId",
					"value" : "metadataItemCollectionListPGroup"
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataItemCollectionSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataItemCollectionFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "permissionKey",
					"value" : "RECORDTYPE_METADATAITEMCOLLECTION"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataItemCollectionViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"value" : "metadata"
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection"
				}
			}
		};
		recordTypeArray["image"] = {
			"data": {
				"children": [
					{
						"name": "metadataId",
						"value": "imageGroup"
					},
					{
						"name": "abstract",
						"value": "false"
					},
					{
						"name": "parentId",
						"value": "binary"
					},
					{
						"children": [
							{
								"name": "id",
								"value": "image"
							},
							{
								"name": "type",
								"value": "recordType"
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
										"url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
										"accept": "application/uub+record+json"
									}
								},
								"name": "dataDivider"
							}
						],
						"name": "recordInfo"
					},
					{
						"name": "presentationViewId",
						"value": "imageViewPGroup"
					},
					{
						"name": "presentationFormId",
						"value": "imageFormPGroup"
					},
					{
						"name": "newMetadataId",
						"value": "imageNewGroup"
					},
					{
						"name": "newPresentationFormId",
						"value": "imageFormNewPGroup"
					},
					{
						"name": "menuPresentationViewId",
						"value": "imageMenuPGroup"
					},
					{
						"name": "listPresentationViewId",
						"value": "imageListPGroup"
					},
					{
						"name": "searchMetadataId",
						"value": "imageSearchGroup"
					},
					{
						"name": "searchPresentationFormId",
						"value": "imageFormSearchPGroup"
					},
					{
						"name": "userSuppliedId",
						"value": "false"
					},
					{
						"name": "permissionKey",
						"value": "RECORDTYPE_IMAGE"
					},
					{
						"name": "selfPresentationViewId",
						"value": "imageViewSelfPGroup"
					}
				],
				"name": "recordType"
			},
			"actionLinks": {
				"search": {
					"requestMethod": "GET",
					"rel": "search",
					"url": "http://epc.ub.uu.se/cora/rest/record/image/",
					"accept": "application/uub+recordList+json"
				},
				"read": {
					"requestMethod": "GET",
					"rel": "read",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/image",
					"accept": "application/uub+record+json"
				},
				"create_by_upload": {
					"requestMethod": "POST",
					"rel": "create_by_upload",
					"contentType": "multipart/form-data",
					"url": "http://epc.ub.uu.se/cora/rest/record/image/"
				},
				"update": {
					"requestMethod": "POST",
					"rel": "update",
					"contentType": "application/uub+record+json",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/image",
					"accept": "application/uub+record+json"
				},
				"create": {
					"requestMethod": "POST",
					"rel": "create",
					"contentType": "application/uub+record+json",
					"url": "http://epc.ub.uu.se/cora/rest/record/image/",
					"accept": "application/uub+record+json"
				},
				"list": {
					"requestMethod": "GET",
					"rel": "list",
					"url": "http://epc.ub.uu.se/cora/rest/record/image/",
					"accept": "application/uub+recordList+json"
				},
				"delete": {
					"requestMethod": "DELETE",
					"rel": "delete",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/image"
				}
			}
		};
		recordTypeArray["binary"] = {
			"data": {
				"children": [
					{
						"name": "metadataId",
						"value": "binaryGroup"
					},
					{
						"name": "abstract",
						"value": "true"
					},
					{
						"children": [
							{
								"name": "id",
								"value": "binary"
							},
							{
								"name": "type",
								"value": "recordType"
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
										"url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
										"accept": "application/uub+record+json"
									}
								},
								"name": "dataDivider"
							}
						],
						"name": "recordInfo"
					},
					{
						"name": "presentationViewId",
						"value": "binaryViewPGroup"
					},
					{
						"name": "presentationFormId",
						"value": "binaryFormPGroup"
					},
					{
						"name": "newMetadataId",
						"value": "binaryNewGroup"
					},
					{
						"name": "newPresentationFormId",
						"value": "binaryFormNewPGroup"
					},
					{
						"name": "menuPresentationViewId",
						"value": "binaryMenuPGroup"
					},
					{
						"name": "listPresentationViewId",
						"value": "binaryListPGroup"
					},
					{
						"name": "searchMetadataId",
						"value": "binarySearchGroup"
					},
					{
						"name": "searchPresentationFormId",
						"value": "binaryFormSearchPGroup"
					},
					{
						"name": "userSuppliedId",
						"value": "true"
					},
					{
						"name": "permissionKey",
						"value": "RECORDTYPE_BINARY"
					},
					{
						"name": "selfPresentationViewId",
						"value": "binaryViewSelfPGroup"
					}
				],
				"name": "recordType"
			},
			"actionLinks": {
				"search": {
					"requestMethod": "GET",
					"rel": "search",
					"url": "http://epc.ub.uu.se/cora/rest/record/binary/",
					"accept": "application/uub+recordList+json"
				},
				"read": {
					"requestMethod": "GET",
					"rel": "read",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary",
					"accept": "application/uub+record+json"
				},
				"create_by_upload": {
					"requestMethod": "POST",
					"rel": "create_by_upload",
					"contentType": "multipart/form-data",
					"url": "http://epc.ub.uu.se/cora/rest/record/binary/"
				},
				"update": {
					"requestMethod": "POST",
					"rel": "update",
					"contentType": "application/uub+record+json",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary",
					"accept": "application/uub+record+json"
				},
				"list": {
					"requestMethod": "GET",
					"rel": "list",
					"url": "http://epc.ub.uu.se/cora/rest/record/binary/",
					"accept": "application/uub+recordList+json"
				},
				"delete": {
					"requestMethod": "DELETE",
					"rel": "delete",
					"url": "http://epc.ub.uu.se/cora/rest/record/recordType/binary"
				}
			}
		};
	recordTypeArray["genericBinary"] = {
		    "data": {
		        "children": [
		          {
		            "name": "metadataId",
		            "value": "genericBinaryGroup"
		          },
		          {
		            "name": "abstract",
		            "value": "false"
		          },
		          {
		            "name": "parentId",
		            "value": "binary"
		          },
		          {
		            "children": [
		              {
		                "name": "id",
		                "value": "genericBinary"
		              },
		              {
		                "name": "type",
		                "value": "recordType"
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
		                    "url": "http://epc.ub.uu.se/cora/rest/record/system/cora",
		                    "accept": "application/uub+record+json"
		                  }
		                },
		                "name": "dataDivider"
		              }
		            ],
		            "name": "recordInfo"
		          },
		          {
		            "name": "presentationViewId",
		            "value": "genericBinaryViewPGroup"
		          },
		          {
		            "name": "presentationFormId",
		            "value": "genericBinaryFormPGroup"
		          },
		          {
		            "name": "newMetadataId",
		            "value": "genericBinaryNewGroup"
		          },
		          {
		            "name": "newPresentationFormId",
		            "value": "genericBinaryFormNewPGroup"
		          },
		          {
		            "name": "menuPresentationViewId",
		            "value": "genericBinaryMenuPGroup"
		          },
		          {
		            "name": "listPresentationViewId",
		            "value": "genericBinaryListPGroup"
		          },
		          {
		            "name": "searchMetadataId",
		            "value": "genericBinarySearchGroup"
		          },
		          {
		            "name": "searchPresentationFormId",
		            "value": "genericBinaryFormSearchPGroup"
		          },
		          {
		            "name": "userSuppliedId",
		            "value": "false"
		          },
		          {
		            "name": "permissionKey",
		            "value": "RECORDTYPE_GENERIC_BINARY"
		          },
		          {
		            "name": "selfPresentationViewId",
		            "value": "genericBinaryViewSelfPGroup"
		          }
		        ],
		        "name": "recordType"
		      },
		      "actionLinks": {
		        "search": {
		          "requestMethod": "GET",
		          "rel": "search",
		          "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
		          "accept": "application/uub+recordList+json"
		        },
		        "read": {
		          "requestMethod": "GET",
		          "rel": "read",
		          "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary",
		          "accept": "application/uub+record+json"
		        },
		        "create_by_upload": {
		          "requestMethod": "POST",
		          "rel": "create_by_upload",
		          "contentType": "multipart/form-data",
		          "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/"
		        },
		        "update": {
		          "requestMethod": "POST",
		          "rel": "update",
		          "contentType": "application/uub+record+json",
		          "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary",
		          "accept": "application/uub+record+json"
		        },
		        "create": {
		          "requestMethod": "POST",
		          "rel": "create",
		          "contentType": "application/uub+record+json",
		          "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
		          "accept": "application/uub+record+json"
		        },
		        "list": {
		          "requestMethod": "GET",
		          "rel": "list",
		          "url": "http://epc.ub.uu.se/cora/rest/record/genericBinary/",
		          "accept": "application/uub+recordList+json"
		        },
		        "delete": {
		          "requestMethod": "DELETE",
		          "rel": "delete",
		          "url": "http://epc.ub.uu.se/cora/rest/record/recordType/genericBinary"
		        }
		      }
		    };

		function getRecordTypeById(recordTypeId) {

			if (recordTypeArray[recordTypeId] !== undefined) {
				return recordTypeArray[recordTypeId];
			} else {

				// default:
				console.log("Id(" + recordTypeId + ") not found in recordTypeProviderStub");
				throw new Error("Id(" + recordTypeId + ") not found in recordTypeProviderStub");
			}
		}
		
		function getAllRecordTypes() {
			var recordTypeList = [];
			Object.keys(recordTypeArray).forEach(function(id) {
				recordTypeList.push(recordTypeArray[id]);
			});
			return recordTypeList;
		}
		
		return Object.freeze({
			getRecordTypeById : getRecordTypeById,
			getAllRecordTypes : getAllRecordTypes
		});
	};
	return coraTest;
}(CORATEST || {}));