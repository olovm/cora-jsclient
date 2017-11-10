/*
 * Copyright 2017 Olov McKie
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
				"IncomingLinksListHandlerTest.js",
				{
					beforeEach : function() {
						this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
								this.incomingLinksListHandlerViewFactorySpy = CORATEST
										.standardFactorySpy("incomingLinksListHandlerViewSpy"),
								this.dependencies = {
									"globalFactories" : {
										"ajaxCallFactory" : this.ajaxCallFactorySpy,
										"incomingLinksListHandlerViewFactory" : this.incomingLinksListHandlerViewFactorySpy
									}
								};
						this.spec = {
							"read_incoming_links" : {
								"requestMethod" : "GET",
								"rel" : "read_incoming_links",
								"url" : "http://localhost:8080/therest/rest/record/coraText/workOrderRecordIdTextVarText/incomingLinks",
								"accept" : "application/vnd.uub.incomingLinksList+json"
							}
						};

					},
					afterEach : function() {
					}
				});

QUnit.test("testType", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	assert.strictEqual(incomingLinksListHandler.type, "incomingLinksListHandler");
});

QUnit.test("testGetDependencies", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	assert.strictEqual(incomingLinksListHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	assert.strictEqual(incomingLinksListHandler.getSpec(), this.spec);
});

QUnit.test("testGetView", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	var factoredView = this.incomingLinksListHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(incomingLinksListHandler.getView(), factoredView.getView());
});

QUnit.test("init", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://localhost:8080/therest/rest/record/"
			+ "coraText/workOrderRecordIdTextVarText/incomingLinks");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.incomingLinksList+json");
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod,
			incomingLinksListHandler.handleAnswerWithIncomingLinksList);
	assert.strictEqual(ajaxCallSpec.errorMethod, incomingLinksListHandler.handleCallError);
});

QUnit.test("testHandleAnswerWithIncomingLinksList", function(assert) {
	var incomingLinksListHandler = CORA.incomingLinksListHandler(this.dependencies, this.spec);
	var factoredView = this.incomingLinksListHandlerViewFactorySpy.getFactored(0);

	var incomingLinksAnswer = JSON.stringify(CORATEST.incomingLinksAnswer);
	var answer = {
		// "spec" : ajaxCallSpy0.getSpec(),
		"responseText" : incomingLinksAnswer
	};

	incomingLinksListHandler.handleAnswerWithIncomingLinksList(answer);

	var incomingLinkAddedToView = factoredView.getAddedIncomingLink(0);
	var expectedLInkForView = {
		"linkedRecordType" : "metadataTextVariable",
		"linkedRecordId" : "newPresentationFormIdTextVar",
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record"
					+ "/metadataTextVariable/newPresentationFormIdTextVar",
			"accept" : "application/vnd.uub.record+json"
		}
	};
	assert.stringifyEqual(incomingLinkAddedToView, expectedLInkForView);

	var incomingLinkAddedToView1 = factoredView.getAddedIncomingLink(1);
	var expectedLInkForView1 = {
			"linkedRecordType" : "presentationGroup",
			"linkedRecordId" : "recordTypeFormPGroup",
			"readLink" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://localhost:8080/therest/rest/record"
					+ "/presentationGroup/recordTypeFormPGroup",
					"accept" : "application/vnd.uub.record+json"
			}
	};
	assert.stringifyEqual(incomingLinkAddedToView1, expectedLInkForView1);
});
