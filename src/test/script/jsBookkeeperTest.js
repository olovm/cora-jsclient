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
	coraTest.jsBookkeeperFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function(metadataId) {
			var spec = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			return CORA.jsBookkeeper(spec);
		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.jsBookkeeper", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.newJsBookkeeper = CORATEST.jsBookkeeperFactory(this.metadataProvider, this.pubSub,
				this.textProvider);
	},
	afterEach : function() {
	}
});

QUnit.test("testSetValue", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild");
	var data = {
		"data" : "a Value",
		"path" : {}
	};
	jsBookkeeper.setValue(data);
	var messages = this.pubSub.getMessages();

	var expectedMessage = {
		"type" : "setValue",
		"message" : {
			"data" : "a Value",
			"path" : {}
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	assert.equal(messages.length, 1);
});

QUnit.test("testAdd", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild");
	var data = {
		"metadataId" : "aMetadataId",
		"path" : {}
	};
	jsBookkeeper.add(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "add",
		"message" : {
			"metadataId" : "aMetadataId",
			"path" : {},
			"repeatId" : "100"
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.equal(messages.length, 1);
});
QUnit.test("testremove", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild");
	var data = {
			"path" : {}
	};
	jsBookkeeper.remove(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
			"type" : "remove",
			"message" : {
				"path" : {}
			}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	
	assert.equal(messages.length, 1);
});
