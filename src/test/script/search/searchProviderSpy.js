/*
 * Copyright 2016, 2017 Uppsala University Library
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
	coraTest.searchProviderSpy = function() {
		var searchArray = [];

		searchArray["coraTextSearch"] = {
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
		};
		searchArray["someSearch"] = {
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
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/someSearch",
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
				}
			}
		};
		searchArray["metadataItemCollectionSearch"] = {
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
					"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
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
		};
		searchArray["searchWithoutSearchLink"] = {
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
									"value" : "searchWithoutSearchLink"
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
//					"search" : {
//						"requestMethod" : "GET",
//						"rel" : "search",
//						"url" : "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
//						"accept" : "application/vnd.uub.recordList+json"
//					},
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
		};

		function getSearchById(searchId) {

			if (searchArray[searchId] !== undefined) {
				return searchArray[searchId];
			} else {

				// default:
				console.log("Id(" + searchId + ") not found in searchProviderStub");
				throw new Error("Id(" + searchId + ") not found in searchProviderStub");
			}
		}

		function getAllSearches() {
			var searchList = [];
			Object.keys(searchArray).forEach(function(id) {
				searchList.push(searchArray[id]);
			});
			return searchList;
		}

		return Object.freeze({
			"type" : "searchProviderSpy",
			getSearchById : getSearchById,
			getAllSearches : getAllSearches
		});
	};
	return coraTest;
}(CORATEST || {}));