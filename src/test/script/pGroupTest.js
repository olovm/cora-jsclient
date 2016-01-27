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
	coraTest.attachedPGroupFactory = function(metadataProvider, pubSub, textProvider, fixture) {
		var factor = function(presentationId) {
			var spec = {
				"presentationId" : presentationId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider
			};
			var pGroup = CORA.pGroup(spec);

			var view = pGroup.getView();
			fixture.appendChild(view);
			return {
				pGroup : pGroup,
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

QUnit.module("CORA.pGroup", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.newAttachedPGroup = CORATEST.attachedPGroupFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPGroup = this.newAttachedPGroup.factor("pgGroupIdOneTextChild");
	var view = attachedPGroup.view;
	assert.ok(view.offsetHeight > 0, "pGroup view should be visible");
	var expectedClassName = 'pGroup pgGroupIdOneTextChild';
	assert.deepEqual(view.className, expectedClassName);
});

QUnit.test("testInitOneChild", function(assert) {
	var attachedPGroup = this.newAttachedPGroup.factor("pgGroupIdOneTextChild");
	var view = attachedPGroup.view;

	var expectedClassName = 'presentation pgGroupIdOneTextChild';
	var pGroup = attachedPGroup.pGroup;
//console.log(view);
//console.log(view.childNodes.length);
	assert.ok(view.childNodes.length === 1, "pgGroupIdOneTextChild, should have one child");

	var childRefHandler = view.firstChild;
//	assert.ok(childRefHandler.childNodes.length === 1, "childRefHandler, should have one child");
	assert.deepEqual(childRefHandler.className, "pChildRefHandler pVarTextVariableId");

//	var pVarView = childRefHolder.firstChild;
//	assert.deepEqual(pVarView.className, "pChildRefHandler pVarTextVariableId");
});
