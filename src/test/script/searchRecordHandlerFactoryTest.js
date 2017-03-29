/*
 * Copyright 2017 Uppsala University Library
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
"use strict";

QUnit
		.module(
				"searchRecordHandlerFactoryTest.js",
				{
					beforeEach : function() {
						this.dependencies = {
							"searchRecordHandlerViewFactory" : CORATEST
									.searchRecordHandlerViewFactorySpy()
						};
						this.search = {
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
						};
						this.spec = {
							"searchRecord" : this.search,
							"jsClient" : CORATEST.jsClientSpy()
						}
						this.searchRecordHandlerFactory = CORA
								.searchRecordHandlerFactory(this.dependencies);
					},
					afterEach : function() {
					}
				});

QUnit.test("init", function(assert) {
	assert.ok(this.searchRecordHandlerFactory);
	assert.strictEqual(this.searchRecordHandlerFactory.type, "searchRecordHandlerFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.searchRecordHandlerFactory.getDependencies(), this.dependencies);
});

QUnit.test("factor", function(assert) {
	var searchRecordHandler = this.searchRecordHandlerFactory.factor(this.spec);
	assert.strictEqual(searchRecordHandler.type, "searchRecordHandler");

	var searchRecordHandlerDependencies = searchRecordHandler.getDependencies();
	assert.strictEqual(searchRecordHandlerDependencies.messageHolderFactory.type,
			"messageHolderFactory");

	assert.strictEqual(searchRecordHandlerDependencies.searchRecordHandlerViewFactory.type,
			"searchRecordHandlerViewFactory");

	assert.strictEqual(searchRecordHandlerDependencies.jsClient, this.spec.jsClient);

	var managedGuiItemFactory = searchRecordHandlerDependencies.managedGuiItemFactory;
	assert.strictEqual(managedGuiItemFactory.type, "managedGuiItemFactory");

	var searchRecordHandlerSpec = searchRecordHandler.getSpec();
	assert.strictEqual(searchRecordHandlerSpec, this.spec);
});
