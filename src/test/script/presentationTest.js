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

QUnit.module("CORA.Presentation", {
	beforeEach : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
//		this.newDataHolder = function(metadataId) {
//			return new CORA.DataHolder(metadataId, this.metadataProvider, this.pubSub);
//		}
	},
	afterEach : function() {
	}
});

//QUnit.test("testInit", function(assert) {
//	var dataHolder = this.newDataHolder("recordTypeOnlyMetadataIdChild");
//	assert.deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
//	assert.ok(dataHolder.getPubSub());
//});