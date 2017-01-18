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
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationVar"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "metadataGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "presentationVarGroup"
											}
										]
										}, {
											"name" : "presentationViewId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "presentationGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "presentationVarViewPGroup"
											}
										]
										}, {
											"name" : "presentationFormId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "presentationGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "presentationVarFormPGroup"
											}
										]
										}, {
											"name" : "newMetadataId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "metadataGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "presentationVarNewGroup"
											}
										]
										}, {
											"name" : "newPresentationFormId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "presentationGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "presentationVarFormNewPGroup"
											}
										]
										}, {
											"name" : "menuPresentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationVarMenuPGroup"
												}
											]
										}, {
											"name" : "listPresentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationVarListPGroup"
												}
											]
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
											"name" : "selfPresentationViewId",
											"value" : "presentationVarViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "recordType"
												},
												{
													"name": "linkedRecordId",
													"value": "presentation"
												}
											]
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadata"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										}, {
											"name" : "metadataId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "metadataGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "metadataGroup"
											}
										]
										}, {
											"name" : "presentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "metadataViewPGroup"
												}
											]
										}, {
											"name" : "presentationFormId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "metadataFormPGroup"
												}
											]
										}, {
											"name" : "newMetadataId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "metadataGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "metadataNewGroup"
											}
										]
										}, {
											"name" : "newPresentationFormId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "metadataFormNewPGroup"
												}
											]
										}, {
											"name" : "menuPresentationViewId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "presentationGroup"
											},
											{
												"name": "linkedRecordId",
												"value": "metadataMenuPGroup"
											}
										]
										}, {
											"name" : "listPresentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "metadataListPGroup"
												}
											]
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationSurroundingContainer"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "metadataId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "metadataGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerGroup"
												}
											]
										},
										{
											"name" : "presentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerViewPGroup"
												}
											]
										},
										{
											"name" : "presentationFormId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerFormPGroup"
												}
											]
										},
										{
											"name" : "newMetadataId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "metadataGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerNewGroup"
												}
											]
										},
										{
											"name" : "newPresentationFormId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerFormNewPGroup"
												}
											]
										},
										{
											"name" : "menuPresentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerMenuPGroup"
												}
											]
										},
										{
											"name" : "listPresentationViewId",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "presentationGroup"
												},
												{
													"name": "linkedRecordId",
													"value": "presentationSurroundingContainerListPGroup"
												}
											]
										},
										{
											"name" : "searchMetadataId",
											"value" : "presentationSurroundingContainerSearchGroup"
										},
										{
											"name" : "searchPresentationFormId",
											"value" : "presentationSurroundingContainerFormSearchPGroup"
										},
										{
											"name" : "userSuppliedId",
											"value" : "true"
										},
										{
											"name" : "selfPresentationViewId",
											"value" : "presentationSurroundingContainerViewSelfPGroup"
										}, {
											"name" : "abstract",
											"value" : "false"
										}, {
											"name" : "parentId",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "recordType"
											},
											{
												"name": "linkedRecordId",
												"value": "presentation"
											}
										]
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "textSystemOne"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "recordType"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataGroup"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionItem"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentation"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataRecordLink"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataTextVariable"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationRepeatingContainer"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"name" : "metadataId",
											"value" : "presentationRepeatingContainerGroup"
										},
										{
											"name" : "presentationViewId",
											"value" : "presentationRepeatingContainerViewPGroup"
										},
										{
											"name" : "presentationFormId",
											"value" : "presentationRepeatingContainerFormPGroup"
										},
										{
											"name" : "newMetadataId",
											"value" : "presentationRepeatingContainerNewGroup"
										},
										{
											"name" : "newPresentationFormId",
											"value" : "presentationRepeatingContainerFormNewPGroup"
										},
										{
											"name" : "menuPresentationViewId",
											"value" : "presentationRepeatingContainerMenuPGroup"
										},
										{
											"name" : "listPresentationViewId",
											"value" : "presentationRepeatingContainerListPGroup"
										},
										{
											"name" : "searchMetadataId",
											"value" : "presentationRepeatingContainerSearchGroup"
										},
										{
											"name" : "searchPresentationFormId",
											"value" : "presentationRepeatingContainerFormSearchPGroup"
										},
										{
											"name" : "userSuppliedId",
											"value" : "true"
										},
										{
											"name" : "permissionKey",
											"value" : "RECORDTYPE_PRESENTATIONREPEATINGCONTAINER"
										},
										{
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionVariable"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "text"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationGroup"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataItemCollection"
													},
													{
														"name" : "type",
														"value" : "recordType"
													},
													{
														"name" : "createdBy",
														"value" : "userId"
													},
													{
														"name" : "updatedBy",
														"value" : "userId"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "cora"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://localhost:8080/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
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
						}
					} ],
			"totalNo" : "15",
			"containDataOfType" : "recordType",
			"toNo" : "15"
		}
	};
	coraTest.recordTypeBrokenList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [ {
				"record" : {
					"dataBROKEN" : {
						"children" : [
								{
									"children" : [
											{
												"name" : "id",
												"value" : "presentationVar"
											},
											{
												"name" : "type",
												"value" : "recordType"
											},
											{
												"name" : "createdBy",
												"value" : "userId"
											},
											{
												"name" : "updatedBy",
												"value" : "userId"
											},
											{
												"children" : [ {
													"name" : "linkedRecordType",
													"value" : "system"
												}, {
													"name" : "linkedRecordId",
													"value" : "cora"
												} ],
												"actionLinks" : {
													"read" : {
														"requestMethod" : "GET",
														"rel" : "read",
														"url" : "http://localhost:8080/therest/rest/record/system/cora",
														"accept" : "application/uub+record+json"
													}
												},
												"name" : "dataDivider"
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
				}
			} ],
			"totalNo" : "15",
			"containDataOfType" : "recordType",
			"toNo" : "15"
		}
	};
	return coraTest;
}(CORATEST));