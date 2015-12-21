/*
 * Copyright 2015 Olov McKie
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

QUnit.module("CORA.MetadataController", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
	},
	teardown : function() {
	}
});

QUnit.test("testInit", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChild",
			this.metadataProvider, this.pubSub, undefined);
	ok(metadataController !== undefined);
	var messages = this.pubSub.getMessages();
	ok(messages !== undefined);
});

//QUnit.test("testCreateOneChild", function() {
//	var dataHolder = new CORA.DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
//	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupIdOneTextChild",'
//			+ '"children":[{"name":"textVariableId","value":""}]}');
//});
QUnit.test("testInitGroupIdOneTextChild", function() {
	var metadataController = new CORA.MetadataController("groupIdOneTextChild",
			this.metadataProvider, this.pubSub, {});
	var messages = this.pubSub.getMessages();
//	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{"data":{},'+
//			'"metadataId":"groupIdOneTextChild","path":{}}}');
	deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{"data":{},'+
	'"metadataId":"textVariableId"},"path":{}}');
}); 

