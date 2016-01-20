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
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
		this.newPresentation = function(presentationId) {
			return new CORA.Presentation(presentationId, this.metadataProvider, this.pubSub);
		}
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var presentation = this.newPresentation("pgGroupIdOneTextChild");
	assert.deepEqual("pgGroupIdOneTextChild", presentation.getPresentationId());
	assert.ok(presentation.getPubSub());
});

QUnit.test("testCreateOneChild", function(assert) {
	var presentation = this.newPresentation("pgGroupIdOneTextChild");
//	var expected = "<div></div>";
//	var expected = '<div style="height: 10px; width: 10px;"></div>';
	var expected = '<div class="presentation"></div>';
	var view = presentation.getView();
//	view.style.height = "10px";
//	view.style.width = "10px";
	
//	var qunitFixture = document.getElementById("qunit-fixture");
//	qunitFixture.appendChild(view);
	this.fixture.appendChild(view);
	console.log("outerHTML:" + view.outerHTML);
	console.log("visible:" + view.offsetHeight); 
//	console.log("qunit-fixture:" + qunitFixture);
	console.log("qunit-fixture:" + this.fixture);
	assert.deepEqual(view.outerHTML, expected);
//	assert.deepEqual(qunitFixture.outerHTML, expected);
});