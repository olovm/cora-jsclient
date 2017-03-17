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

QUnit.module("pRecordLinkViewFactoryTest.js", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
				"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.spec = {
			"presentationId" : "somePresentationId",
			"info" : {
				"text" : "someText",
				"defText" : "someDefText",
				"technicalInfo" : [ "textId: " + "textId", "defTextId: " + "defTextId",
						"metadataId: " + "metadataId" ]
			}
		};
		this.pRecordLinkViewFactory = CORA.pRecordLinkViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.pRecordLinkViewFactory);
	assert.strictEqual(this.pRecordLinkViewFactory.type, "pRecordLinkViewFactory"); 
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.pRecordLinkViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var pRecordLinkView = this.pRecordLinkViewFactory.factor(this.spec);
	assert.ok(pRecordLinkView);
	assert.strictEqual(pRecordLinkView.getDependencies(), this.dependencies);
});

QUnit.test("factorTestType", function(assert) {
	var pRecordLinkView = this.pRecordLinkViewFactory.factor(this.spec);
	assert.ok(pRecordLinkView);
	assert.strictEqual(pRecordLinkView.type, "pRecordLinkView");
});

QUnit.test("factorTestSpec", function(assert) {
	var pRecordLinkView = this.pRecordLinkViewFactory.factor(this.spec);
	var pRecordLinkViewSpec = pRecordLinkView.getSpec();
	assert.strictEqual(pRecordLinkViewSpec, this.spec);
});
