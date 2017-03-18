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

QUnit.module("pRepeatingElementFactoryTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.pRepeatingElementFactory = CORA
				.pRepeatingElementFactory(this.dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.pRepeatingElementFactory);
	assert.strictEqual(this.pRepeatingElementFactory.type,
			"pRepeatingElementFactory");
});

QUnit.test("getDependencies", function(assert) {
	assert.strictEqual(this.pRepeatingElementFactory.getDependencies(),
			this.dependencies);
});

QUnit.test("factorTestDependencies", function(assert) {
	var spec = {};
	var pRepeatingElement = this.pRepeatingElementFactory.factor(spec);
	assert.ok(pRepeatingElement);
	assert.strictEqual(pRepeatingElement.getDependencies(), this.dependencies);
});

QUnit.test("factorTestSpec", function(assert) {
	var spec = {
		"x" : "y"
	};
	var pRepeatingElement = this.pRepeatingElementFactory.factor(spec);
	assert.ok(pRepeatingElement);
	var pRepeatingElementSpec = pRepeatingElement.getSpec();
	assert.strictEqual(pRepeatingElementSpec, spec);
});
