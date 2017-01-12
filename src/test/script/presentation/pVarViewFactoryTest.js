/*
 * Copyright 2016 Olov McKie
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

QUnit.module("pVarViewFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.pVarViewFactory = CORA.pVarViewFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.pVarViewFactory);
	assert.strictEqual(this.pVarViewFactory.type, "pVarViewFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.pVarViewFactory.getDependencies(), this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var spec = {
		"extraClassName" : "someClass",
		"info" : {
			"text" : "someText",
			"defText" : "someDefText",
			"technicalInfo" : [ "textId: " + "textId", "defTextId: " + "defTextId",
					"metadataId: " + "metadataId" ]
		}
	};
	var pVarView = this.pVarViewFactory.factor(spec);
	assert.ok(pVarView);
	assert.strictEqual(pVarView.getDependencies(), this.dependencies);
});

QUnit.test("factorTestSpec", function(assert) {
	var spec = {
		"extraClassName" : "someClass",
		"info" : {
			"text" : "someText",
			"defText" : "someDefText",
			"technicalInfo" : [ "textId: " + "textId", "defTextId: " + "defTextId",
					"metadataId: " + "metadataId" ]
		}
	};
	var pVarView = this.pVarViewFactory.factor(spec);
	assert.ok(pVarView);
	var pVarViewSpec = pVarView.getSpec();
	assert.strictEqual(pVarViewSpec.extraClassName, spec.extraClassName);
});
