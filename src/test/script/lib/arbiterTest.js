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

QUnit.module("CORA.Arbiter", {
	beforeEach : function() {
		this.arbiter = Arbiter.create()
		this.fixture = document.getElementById("qunit-fixture");
		// this.metadataProvider = new MetadataProviderStub();
		// this.pubSub = new PubSubStub();
		// this.newPresentation = function(presentationId) {
		// return new CORA.Presentation(presentationId, this.metadataProvider,
		// this.pubSub);
		// }
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	// var presentation = this.newPresentation("pgGroupIdOneTextChild");
	// assert.deepEqual("pgGroupIdOneTextChild",
	// presentation.getPresentationId());
	// assert.ok(presentation.getPubSub());
//	this.arbiter.subscribe("test/setValue", function(data, msg) {
//		console.log("test/setValue: " + JSON.stringify(data));
//	})
//	this.arbiter.publish("test/setValue", {
//		"test" : "try"
//	});
//	this.arbiter.publish("test/setValue", createLinkedPathWithNameInData("someName"));

//	this.arbiter.subscribe(
//			'{"name":"linkedPath","children":[{"name":"nameInData","value":"someName"}]}',
//			function(data, msg) {
//				console.log("path/setValue: " + JSON.stringify(data));
//			})
//	this.arbiter.publish('{"name":"linkedPath","children":[{"name":"nameInData","value":"someName"}]}', createLinkedPathWithNameInData("someName"));
	this.arbiter.subscribe(
			'someName.attribName:attribValue.one/*',
			function(data, msg) {
//				console.log("path/setValue: "+msg +' : ' + JSON.stringify(data));
			})
			this.arbiter.publish('someName#attribName:attribValue.one/setValue', createLinkedPathWithNameInData("someName"));
	this.arbiter.publish('someName#attribName:attribValue.one/add', createLinkedPathWithNameInData("someName"));
	assert.ok(true);
});
