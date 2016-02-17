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
	coraTest.recordTypeList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [
					{
						"record" : {
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
									"value" : "pgPresentationVarView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgPresentationVarForm"
								}, {
									"name" : "newMetadataId",
									"value" : "presentationVarNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgPresentationVarFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgPresentationVarList"
								}, {
									"name" : "searchMetadataId",
									"value" : "presentationVarSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgPresentationVarSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_PRESENTATIONVAR"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgPresentationVarSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationVar",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATA"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataSelf"
								}, {
									"name" : "abstract",
									"value" : "true"
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadata",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgPresentationSurroundingContainerView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgPresentationSurroundingContainerForm"
								}, {
									"name" : "newMetadataId",
									"value" : "presentationSurroundingContainerNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgPresentationSurroundingContainerFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgPresentationSurroundingContainerList"
								}, {
									"name" : "searchMetadataId",
									"value" : "presentationSurroundingContainerSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgPresentationSurroundingContainerSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_PRESENTATIONSURROUNDINGCONTAINER"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgPresentationSurroundingContainerSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationSurroundingContainer",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgTextSystemOneView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgTextSystemOneForm"
								}, {
									"name" : "newMetadataId",
									"value" : "textSystemOneNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgTextSystemOneFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgTextSystemOneList"
								}, {
									"name" : "searchMetadataId",
									"value" : "textSystemOneSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgTextSystemOneSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_TEXTSYSTEMONE"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgTextSystemOneSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgRecordTypeView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgRecordTypeForm"
								}, {
									"name" : "newMetadataId",
									"value" : "recordTypeNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgRecordTypeFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgRecordTypeList"
								}, {
									"name" : "searchMetadataId",
									"value" : "recordTypeSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgRecordTypeSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_RECORDTYPE"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgRecordTypeSelf"
								}, {
									"name" : "abstract",
									"value" : "false"
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/recordType",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataGroupView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataGroupForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataGroupNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataGroupFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataGroupList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataGroupSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataGroupSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATAGROUP"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataGroupSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataGroup",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataCollectionItemView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataCollectionItemForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataCollectionItemNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataCollectionItemFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataCollectionItemList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataCollectionItemSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataCollectionItemSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATACOLLECTIONITEM"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataCollectionItemSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionItem",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgPresentationView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgPresentationForm"
								}, {
									"name" : "newMetadataId",
									"value" : "presentationNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgPresentationFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgPresentationList"
								}, {
									"name" : "searchMetadataId",
									"value" : "presentationSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgPresentationSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_PRESENTATION"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgPresentationSelf"
								}, {
									"name" : "abstract",
									"value" : "true"
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentation",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataRecordLinkView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataRecordLinkForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataRecordLinkNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataRecordLinkFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataRecordLinkList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataRecordLinkSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataRecordLinkSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATARECORDLINK"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataRecordLinkSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataRecordLink",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataTextVariableView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataTextVariableForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataTextVariableNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataTextVariableFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataTextVariableList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataTextVariableSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataTextVariableSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATATEXTVARIABLE"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataTextVariableSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataTextVariable",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgPresentationRepeatingContainerView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgPresentationRepeatingContainerForm"
								}, {
									"name" : "newMetadataId",
									"value" : "presentationRepeatingContainerNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgPresentationRepeatingContainerFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgPresentationRepeatingContainerList"
								}, {
									"name" : "searchMetadataId",
									"value" : "presentationRepeatingContainerSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgPresentationRepeatingContainerSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_PRESENTATIONREPEATINGCONTAINER"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgPresentationRepeatingContainerSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationRepeatingContainer",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataCollectionVariableView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataCollectionVariableForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataCollectionVariableNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataCollectionVariableFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataCollectionVariableList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataCollectionVariableSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataCollectionVariableSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATACOLLECTIONVARIABLE"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataCollectionVariableSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataCollectionVariable",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgTextView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgTextForm"
								}, {
									"name" : "newMetadataId",
									"value" : "textNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgTextFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgTextList"
								}, {
									"name" : "searchMetadataId",
									"value" : "textSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgTextSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_TEXT"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgTextSelf"
								}, {
									"name" : "abstract",
									"value" : "true"
								} ],
								"name" : "recordType"
							},
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/text",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgPresentationGroupView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgPresentationGroupForm"
								}, {
									"name" : "newMetadataId",
									"value" : "presentationGroupNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgPresentationGroupFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgPresentationGroupList"
								}, {
									"name" : "searchMetadataId",
									"value" : "presentationGroupSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgPresentationGroupSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_PRESENTATIONGROUP"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgPresentationGroupSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/presentationGroup",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
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
									"value" : "pgMetadataItemCollectionView"
								}, {
									"name" : "presentationFormId",
									"value" : "pgMetadataItemCollectionForm"
								}, {
									"name" : "newMetadataId",
									"value" : "metadataItemCollectionNewGroup"
								}, {
									"name" : "newPresentationFormId",
									"value" : "pgMetadataItemCollectionFormNew"
								}, {
									"name" : "listPresentationViewId",
									"value" : "pgMetadataItemCollectionList"
								}, {
									"name" : "searchMetadataId",
									"value" : "metadataItemCollectionSearchGroup"
								}, {
									"name" : "searchPresentationFormId",
									"value" : "pgMetadataItemCollectionSearchForm"
								}, {
									"name" : "userSuppliedId",
									"value" : "true"
								}, {
									"name" : "permissionKey",
									"value" : "RECORDTYPE_METADATAITEMCOLLECTION"
								}, {
									"name" : "selfPresentationViewId",
									"value" : "pgMetadataItemCollectionSelf"
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
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"contentType" : "application/uub+record+json",
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
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/metadataItemCollection",
									"accept" : "application/uub+record+json"
								}
							}
						}
					} ],
			"totalNo" : "15",
			"containDataOfType" : "recordType",
			"toNo" : "15"
		}
	};
	return coraTest;
}(CORATEST));