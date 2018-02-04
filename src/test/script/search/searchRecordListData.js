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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/coraTextSearch",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"delete" : {
									"requestMethod" : "DELETE",
									"rel" : "delete",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/someSearch"
								},
								"index": {
									"requestMethod": "POST",
									"rel": "index",
									"body": {
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "recordType"
													},
													{
														"name": "linkedRecordId",
														"value": "search"
													}
												],
												"name": "recordType"
											},
											{
												"name": "recordId",
												"value": "someSearch"
											},
											{
												"name": "type",
												"value": "index"
											}
										],
										"name": "workOrder"
									},
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/workOrder/",
									"accept": "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginTokenSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataTextVariableSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/recordTypeSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationGroupSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/personSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/binarySearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/genericBinarySearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataResourceLinkSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataGroupSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationCollectionVarSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataRecordLinkSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRuleSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRecordLinkSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/appTokenSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationResourceLinkSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/userSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/searchTermSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/systemOneUserSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionVariableSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSurroundingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/permissionRoleSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/imageSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataCollectionItemSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/textSystemOneSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/bookSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/loginWebRedirectSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationRepeatingContainerSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/presentationVarSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/soundSearch",
									"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
												          "name": "type",
												          "children": [
												            {
												              "name": "linkedRecordType",
												              "value": "recordType"
												            },
												            {
												              "name": "linkedRecordId",
												              "value": "search"
												            }
												          ]
												        },
													{
									      				"name" : "createdBy",
									      				"children": [
									      					{
									      						"name": "linkedRecordType",
									      						"value": "user"
									      					},
									      					{
									      						"name": "linkedRecordId",
									      						"value": "141414"
									      					}
									      				]
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
																"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
													"accept" : "application/vnd.uub.record+json"
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
									"accept" : "application/vnd.uub.recordList+json"
								},
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/vnd.uub.record+json"
								},
								"read_incoming_links" : {
									"requestMethod" : "GET",
									"rel" : "read_incoming_links",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
									"accept" : "application/vnd.uub.recordList+json"
								},
								"update" : {
									"requestMethod" : "POST",
									"rel" : "update",
									"contentType" : "application/vnd.uub.record+json",
									"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
									"accept" : "application/vnd.uub.record+json"
								}
							}
						}
					} ],
			"totalNo" : "38",
			"containDataOfType" : "search",
			"toNo" : "38"
		}
	};
	coraTest.searchRecordListOneRecord = {
			"dataList" : {
				"fromNo" : "1",
				"data" : [
					{
						"record": {
							"data": {
								"children": [
									{
										"children": [
											{
												"name": "id",
												"value": "person2"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "recordType"
													},
													{
														"name": "linkedRecordId",
														"value": "person"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "http://localhost:8080/therest/rest/record/recordType/person",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "type"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"name": "createdBy"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "system"
													},
													{
														"name": "linkedRecordId",
														"value": "systemOne"
													}
												],
												"actionLinks": {
													"read": {
														"requestMethod": "GET",
														"rel": "read",
														"url": "http://localhost:8080/therest/rest/record/system/systemOne",
														"accept": "application/vnd.uub.record+json"
													}
												},
												"name": "dataDivider"
											},
											{
												"name": "tsCreated",
												"value": "2017-10-01 00:00:00.0"
											},
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "user"
													},
													{
														"name": "linkedRecordId",
														"value": "141414"
													}
												],
												"name": "updatedBy"
											},
											{
												"name": "tsUpdated",
												"value": "2018-01-24 12:58:18.189"
											}
										],
										"name": "recordInfo"
									},
									{
										"repeatId": "0",
										"children": [
											{
												"name": "identifierType",
												"value": "viaf"
											},
											{
												"name": "identifierValue",
												"value": ""
											}
										],
										"name": "identifier"
									},
									{
										"children": [
											{
												"children": [
													{
														"name": "value",
														"value": "tv"
													}
												],
												"name": "namePart",
												"attributes": {
													"type": "givenName"
												}
											},
											{
												"children": [
													{
														"name": "value",
														"value": "a"
													}
												],
												"name": "namePart",
												"attributes": {
													"type": "familyName"
												}
											}
										],
										"name": "name",
										"attributes": {
											"type": "authorized"
										}
									},
									{
										"repeatId": "1",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "person"
											},
											{
												"name": "linkedRecordId",
												"value": "sdfd"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/person/sdfd",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedPerson"
									},
									{
										"repeatId": "2",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "person"
											},
											{
												"name": "linkedRecordId",
												"value": "sdfd"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/person/sdfd",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedPerson"
									},
									{
										"repeatId": "3",
										"children": [
											{
												"name": "linkedRecordType",
												"value": "organisation"
											},
											{
												"name": "linkedRecordId",
												"value": "someOrganisation"
											}
										],
										"actionLinks": {
											"read": {
												"requestMethod": "GET",
												"rel": "read",
												"url": "http://localhost:8080/therest/rest/record/organisation/someOrganisation",
												"accept": "application/vnd.uub.record+json"
											}
										},
										"name": "relatedOrganisation",
										"attributes": {
											"type": "other"
										}
									}
								],
								"name": "person"
							},
							"actionLinks": {
								"read": {
									"requestMethod": "GET",
									"rel": "read",
									"url": "http://localhost:8080/therest/rest/record/person/person2",
									"accept": "application/vnd.uub.record+json"
								},
								"read_incoming_links": {
									"requestMethod": "GET",
									"rel": "read_incoming_links",
									"url": "http://localhost:8080/therest/rest/record/person/person2/incomingLinks",
									"accept": "application/vnd.uub.recordList+json"
								},
								"update": {
									"requestMethod": "POST",
									"rel": "update",
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/person/person2",
									"accept": "application/vnd.uub.record+json"
								},
								"index": {
									"requestMethod": "POST",
									"rel": "index",
									"body": {
										"children": [
											{
												"children": [
													{
														"name": "linkedRecordType",
														"value": "recordType"
													},
													{
														"name": "linkedRecordId",
														"value": "person"
													}
												],
												"name": "recordType"
											},
											{
												"name": "recordId",
												"value": "person2"
											},
											{
												"name": "type",
												"value": "index"
											}
										],
										"name": "workOrder"
									},
									"contentType": "application/vnd.uub.record+json",
									"url": "http://localhost:8080/therest/rest/record/workOrder/",
									"accept": "application/vnd.uub.record+json"
								}
							}
						}
					}],
				"totalNo" : "1",
				"containDataOfType" : "person",
				"toNo" : "1"
			}
		};
	coraTest.searchRecordListOneRecordWithNoIndexAction = {
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
											"accept" : "application/vnd.uub.record+json"
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
									          "name": "type",
									          "children": [
									            {
									              "name": "linkedRecordType",
									              "value": "recordType"
									            },
									            {
									              "name": "linkedRecordId",
									              "value": "search"
									            }
									          ]
									        },
										{
											"name" : "createdBy",
											"children": [
												{
													"name": "linkedRecordType",
													"value": "user"
												},
												{
													"name": "linkedRecordId",
													"value": "141414"
												}
											]
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
													"accept" : "application/vnd.uub.record+json"
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
											"accept" : "application/vnd.uub.record+json"
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
											"accept" : "application/vnd.uub.record+json"
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
								"accept" : "application/vnd.uub.recordList+json"
							},
							"read" : {
								"requestMethod" : "GET",
								"rel" : "read",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
								"accept" : "application/vnd.uub.record+json"
							},
							"read_incoming_links" : {
								"requestMethod" : "GET",
								"rel" : "read_incoming_links",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
								"accept" : "application/vnd.uub.recordList+json"
							},
							"update" : {
								"requestMethod" : "POST",
								"rel" : "update",
								"contentType" : "application/vnd.uub.record+json",
								"url" : "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
								"accept" : "application/vnd.uub.record+json"
							}
						}
					}
				} ],
			"totalNo" : "1",
			"containDataOfType" : "search",
			"toNo" : "1"
		}
	};
	return coraTest;
}(CORATEST));