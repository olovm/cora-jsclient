/*
 * Copyright 2019 Uppsala University Library
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
				"ldapLoginJsClientIntegratorFactoryTest.js",
				{
					beforeEach : function() {
						this.dependencies = {
							"ldapLoginFactory" : CORATEST
									.standardFactorySpy("ldapLoginSpy"),
							"managedGuiItemFactory" : CORATEST
									.standardFactorySpy("managedGuiItemSpy")
						};
						this.spec = {
							"metadataId" : "someMetadataId",
							"presentationId" : "somePresentationId",
							"jsClient" : CORATEST.jsClientSpy()
						}
					},
					afterEach : function() {
					}
				});

QUnit.test("init", function(assert) {
	var ldapLoginJsClientIntegratorFactory = CORA
			.ldapLoginJsClientIntegratorFactory(this.dependencies);
	assert.strictEqual(ldapLoginJsClientIntegratorFactory.type,
			"ldapLoginJsClientIntegratorFactory");
});

QUnit.test("getDependencies", function(assert) {
	var ldapLoginJsClientIntegratorFactory = CORA
			.ldapLoginJsClientIntegratorFactory(this.dependencies);
	assert.strictEqual(
			ldapLoginJsClientIntegratorFactory.getDependencies(),
			this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var ldapLoginJsClientIntegratorFactory = CORA
			.ldapLoginJsClientIntegratorFactory(this.dependencies);
	var ldapLoginJsClientIntegrator = ldapLoginJsClientIntegratorFactory
			.factor(this.spec);
	assert.strictEqual(ldapLoginJsClientIntegrator.type, "ldapLoginJsClientIntegrator");
});

