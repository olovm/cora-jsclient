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

QUnit.module("ldapLoginFactoryTest.js", {
	beforeEach : function() {
		this.providers = {
			"textProvider" : CORATEST.textProviderSpy(),
//			"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy()
		};
		this.globalFactories = {
			"ajaxCallFactory" : CORATEST.standardFactorySpy("ajaxCallSpy"),
			"recordGuiFactory" : CORATEST.standardFactorySpy("recordGuiSpy"),
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};
		this.dependencies = {
			"providers" : this.providers,
			"globalFactories" : this.globalFactories

		};
		this.spec = {
			"metadataId" : "someMetadataGroup",
			"presentationId" : "somePresentationGroup",
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	assert.strictEqual(ldapLoginFactory.type, "ldapLoginFactory");
});

QUnit.test("getDependencies", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	assert.strictEqual(ldapLoginFactory.getDependencies(), this.dependencies);
});

QUnit.test("testFactor", function(assert) {
	var ldapLoginFactory = CORA.ldapLoginFactory(this.dependencies);
	var ldapLogin = ldapLoginFactory.factor(this.spec);
	assert.strictEqual(ldapLogin.type, "ldapLogin");
});

//QUnit.test("testFactorAddedIncomingDependencies", function(assert) {
//	var searchHandlerFactory = CORA.searchHandlerFactory(this.dependencies);
//	var searchHandler = searchHandlerFactory.factor(this.spec);
//	var addedDep = searchHandler.getDependencies();
//	assert.strictEqual(addedDep.recordGuiFactory, this.globalFactories.recordGuiFactory);
//	assert.strictEqual(addedDep.ajaxCallFactory, this.globalFactories.ajaxCallFactory);
//	assert.strictEqual(addedDep.jsClient, this.providers.clientInstanceProvider.getJsClient());
//});
//
//QUnit.test("testFactorAddedCreatedDependencies", function(assert) {
//	var searchHandlerFactory = CORA.searchHandlerFactory(this.dependencies);
//	var searchHandler = searchHandlerFactory.factor(this.spec);
//	var addedDep = searchHandler.getDependencies();
//	assert.strictEqual(addedDep.searchHandlerViewFactory.type, "searchHandlerViewFactory");
//	assert.strictEqual(addedDep.searchHandlerViewFactory.getDependencies().textProvider,
//			this.providers.textProvider);
//	assert.strictEqual(addedDep.managedGuiItemFactory, this.globalFactories.managedGuiItemFactory);
//});
//
//QUnit.test("testFactorAddedDependenciesResultHandlerFactory", function(assert) {
//	var searchHandlerFactory = CORA.searchHandlerFactory(this.dependencies);
//	var searchHandler = searchHandlerFactory.factor(this.spec);
//	var addedDep = searchHandler.getDependencies();
//	assert.strictEqual(addedDep.resultHandlerFactory.type, "resultHandlerFactory");
//	var dependenciesRH = addedDep.resultHandlerFactory.getDependencies();
//	assert.strictEqual(dependenciesRH.textProvider, this.providers.textProvider);
//	assert.strictEqual(dependenciesRH.ajaxCallFactory, this.globalFactories.ajaxCallFactory);
//	assert.strictEqual(dependenciesRH.ajaxCallFactory, this.globalFactories.ajaxCallFactory);
//	assert.strictEqual(dependenciesRH.uploadManager, this.globalFactories.recordGuiFactory.getDependencies().uploadManager);
//	assert.strictEqual(dependenciesRH.recordHandlerFactory.type, "recordHandlerFactory");
//});
//
//QUnit.test("testFactorAddedDependenciesRecordHandlerFactory", function(assert) {
//	var searchHandlerFactory = CORA.searchHandlerFactory(this.dependencies);
//	var searchHandler = searchHandlerFactory.factor(this.spec);
//	var addedDep = searchHandler.getDependencies();
//	var dependenciesRH = addedDep.resultHandlerFactory.getDependencies();
//	var depRecordHandler = dependenciesRH.recordHandlerFactory.getDependencies();
//	assert.strictEqual(depRecordHandler.recordHandlerViewFactory.type, "recordHandlerViewFactory");
//	assert.strictEqual(depRecordHandler.ajaxCallFactory, this.globalFactories.ajaxCallFactory);
//	assert.strictEqual(depRecordHandler.recordGuiFactory, this.globalFactories.recordGuiFactory);
//	assert.strictEqual(depRecordHandler.managedGuiItemFactory,
//			this.globalFactories.managedGuiItemFactory);
//});
