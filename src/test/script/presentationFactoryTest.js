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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.presentationFactoryFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function(metadataId) {
			var spec = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			var jsBookkeeper = CORA.jsBookkeeper(spec);
			var specPresentationFactory = {
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			return CORA.presentationFactory(specPresentationFactory);

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.presentationFactory", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
//		var spec = {
//			"metadataId" : metadataId,
//			"metadataProvider" : metadataProvider,
//			"pubSub" : pubSub,
//			"textProvider" : textProvider
//		};
//		var jsBookkeeper = CORA.jsBookkeeper(spec);
//		this.dependencies = {
//			"metadataprovider" : new MetadataProviderStub(),
//			"pubSub" : new PubSubSpy(),
//			"textProvider" : CORATEST.textProviderStub(),
//			"jsBookkeeper" : CORATEST.jsBookkeeperFactory(this.metadataProvider, this.pubSub,
//					this.textProvider)
//		};
		this.newPresentationFactory = CORATEST.presentationFactoryFactory(this.metadataProvider,
				this.pubSub, this.textProvider);
	},
	afterEach : function() {
	}
});

QUnit.test("testSetValue", function(assert) {
	var presentationFactory = this.newPresentationFactory.factor("groupIdOneTextChild");
//	var data = {
//		"data" : "a Value",
//		"path" : {}
//	};
//	jsBookkeeper.setValue(data);
//	var messages = this.pubSub.getMessages();
//	assert.deepEqual(JSON.stringify(messages[0]), '{"type":"setValue","message":{"data":"a Value",'
//			+ '"path":{}}}');
//
//	assert.equal(messages.length, 1);
	assert.ok(true);
});
