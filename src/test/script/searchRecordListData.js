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
	coraTest.searchRecordList = {
		"dataList" : {
			"fromNo" : "1",
			"data" : [
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "coraTextSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "coraText"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/coraText",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/coraTextSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroupGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/metadataGroupGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "someSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataFormPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/metadataFormPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadata",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/someSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
									"accept" : "application/uub+record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
									"accept" : "application/uub+record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataItemCollectionSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataItemCollection"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataItemCollection",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataItemCollectionSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "loginTokenSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "loginToken"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/loginToken",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/loginTokenSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataTextVariableSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataTextVariable"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataTextVariable",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataTextVariableSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "recordTypeSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "recordType"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/recordType",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/recordTypeSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationGroupSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroupSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "personSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "systemOne"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/systemOne",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "person"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/person",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/personSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "binarySearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "binary"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/binary",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/binarySearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "genericBinarySearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "genericBinary"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/genericBinary",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/genericBinarySearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataResourceLinkSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataResourceLink"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataResourceLink",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataResourceLinkSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataGroupSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroupSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationCollectionVarSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationCollectionVar"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationCollectionVar",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationCollectionVarSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataRecordLinkSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataRecordLink"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataRecordLink",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataRecordLinkSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "permissionRuleSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "permissionRule"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/permissionRule",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/permissionRuleSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "systemSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "system"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/system",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/systemSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationRecordLinkSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationRecordLink"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationRecordLink",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationRecordLinkSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "appTokenSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "appToken"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/appToken",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/appTokenSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationResourceLinkSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationResourceLink"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationResourceLink",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationResourceLinkSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "userSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "user"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/user",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/userSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "searchSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "search"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/search",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/searchSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "searchTermSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "searchTerm"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/searchTerm",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/searchTermSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "systemOneUserSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "systemOne"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/systemOne",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "systemOneUser"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/systemOneUser",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/systemOneUserSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionVariableSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionVariable"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataCollectionVariable",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataCollectionVariableSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationSurroundingContainerSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationSurroundingContainer"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationSurroundingContainer",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationSurroundingContainerSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "permissionRoleSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "permissionRole"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/permissionRole",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/permissionRoleSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "imageSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "image"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/image",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/imageSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataCollectionItemSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadataCollectionItem"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadataCollectionItem",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataCollectionItemSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentation"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentation",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "textSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "text"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/text",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/textSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "textSystemOneSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "textSystemOne"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/textSystemOne",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/textSystemOneSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "bookSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
													},
													{
														"children" : [ {
															"name" : "linkedRecordType",
															"value" : "system"
														}, {
															"name" : "linkedRecordId",
															"value" : "systemOne"
														} ],
														"actionLinks" : {
															"read" : {
																"requestMethod" : "GET",
																"rel" : "read",
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/systemOne",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "book"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/book",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/bookSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "loginSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "login"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/login",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/loginSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "loginWebRedirectSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "loginWebRedirect"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/loginWebRedirect",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/loginWebRedirectSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationRepeatingContainerSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationRepeatingContainer"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationRepeatingContainer",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationRepeatingContainerSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "presentationVarSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "presentationVar"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/presentationVar",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/presentationVarSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "soundSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "sound"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/sound",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/soundSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					},
					{
						"record" : {
							"data" : {
								"children" : [
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "metadataGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "metadataId"
										},
										{
											"children" : [
													{
														"name" : "id",
														"value" : "metadataSearch"
													},
													{
														"name" : "type",
														"value" : "search"
													},
													{
														"name" : "createdBy",
														"value" : "141414"
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
																"url" : "http://epc.ub.uu.se/therest/rest/record/system/cora",
																"accept" : "application/uub+record+json"
															}
														},
														"name" : "dataDivider"
													} ],
											"name" : "recordInfo"
										},
										{
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "presentationGroup"
											}, {
												"name" : "linkedRecordId",
												"value" : "autocompleteSearchPGroup"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "presentationId"
										},
										{
											"repeatId" : "0",
											"children" : [ {
												"name" : "linkedRecordType",
												"value" : "recordType"
											}, {
												"name" : "linkedRecordId",
												"value" : "metadata"
											} ],
											"actionLinks" : {
												"read" : {
													"requestMethod" : "GET",
													"rel" : "read",
													"url" : "http://epc.ub.uu.se/therest/rest/record/recordType/metadata",
													"accept" : "application/uub+record+json"
												}
											},
											"name" : "recordTypeToSearchIn"
										} ],
								"name" : "search"
							},
							"actionLinks" : {
								"search" : {
									"requestMethod" : "GET",
									"rel" : "search",
									"url" : "http://epc.ub.uu.se/therest/rest/record/metadataSearch/",
									"accept" : "application/uub+recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/uub+record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
									"accept" : "application/uub+recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/uub+record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/uub+record+json"
								}
							}
						}
					} ],
			"totalNo" : "38",
			"containDataOfType" : "search",
			"toNo" : "38"
		}
	};
	return coraTest;
}(CORATEST));