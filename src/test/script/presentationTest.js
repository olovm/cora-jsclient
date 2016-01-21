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
//	var expected = '<div class="presentation pgGroupIdOneTextChild"></div>';
	var expectedClassName = 'presentation pgGroupIdOneTextChild';
	var view = presentation.getView();
	
	this.fixture.appendChild(view);
	assert.ok(view.offsetHeight > 0, "presentation view should be visible");
	assert.deepEqual(view.className, expectedClassName);
	
	assert.ok(view.childNodes.length === 1, "pgGroupIdOneTextChild, should have one child");
	
	var childRefHolder = view.firstChild;
	assert.ok(childRefHolder.childNodes.length === 1, "childRefHolder, should have one child");
	
	
	var pVar = childRefHolder.firstChild;
	assert.deepEqual(pVar.className, "pVar pVarTextVariableId");
	
//	console.log("firstChild: " +childRefHolder.outerHTML);
	
});

QUnit.test("testAddOneChild", function(assert) {
	var presentation = this.newPresentation("pgGroupIdOneTextChild");
	var view = presentation.getView();
	this.fixture.appendChild(view);
	
	var childRefHolder = view.firstChild;
	var pVar = childRefHolder.firstChild;
	
//	console.log("pVar: " +pVar.outerHTML);
//	console.log("pVar: " +pVar.modelObject);
	pVar.modelObject.add();
	assert.ok(pVar.childNodes.length === 1, "pVar, should have one child");
	var span = pVar.firstChild;
	var input = span.firstChild;
	assert.equal(input.value, "");
	
	input.modelObject.setValue("A Value");
	assert.equal(input.value, "A Value");
	
	
//	console.log("firstChild: " +childRefHolder.outerHTML);
	
});

