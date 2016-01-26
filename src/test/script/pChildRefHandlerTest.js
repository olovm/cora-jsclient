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
"use strict";
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPChildRefHandlerFactory = function(metadataProvider, pubSub, textProvider,
			fixture) {
		var factor = function(path, parentMetadataId, presentationId) {
			var cParentMetadata = new CORA.CoraData(metadataProvider
					.getMetadataById(parentMetadataId));
			var cPresentation = new CORA.CoraData(metadataProvider.getMetadataById(presentationId));

			var spec = {
				"parentPath" : path,
				"cParentMetadata" : cParentMetadata,
				"cPresentation" : cPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			var pChildRefHandler = CORA.pChildRefHandler(spec);
			var view = pChildRefHandler.getView();
			fixture.appendChild(view);
			return {
				pChildRefHandler : pChildRefHandler,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.pChildRefHandler", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.attachedPChildRefHandlerFactory = CORATEST.attachedPChildRefHandlerFactory(
				this.metadataProvider, this.pubSub, this.textProvider, this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === attachedPChildRefHandler.pChildRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.ok(view.childNodes.length === 0, "pChildRefHandler, should have no children");
	
	
	//subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	var pChildRefHandler = attachedPChildRefHandler.pChildRefHandler;
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);
});

QUnit.test("testAddOneChild", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	attachedPChildRefHandler.pChildRefHandler.add();
	var view = attachedPChildRefHandler.view;
	assert.ok(view.childNodes.length === 1, "pChildRefHandler, should have one child");
	var variableView = view.firstChild;
	assert.strictEqual(variableView.className, "");
});
