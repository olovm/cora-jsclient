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
	coraTest.attachedPResourceLinkFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, recordTypeProvider, fixture) {
		var factor = function(presentationId) {
			var cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));

			// var factor = function(path, pSurroundingContainerId,
			// presentationParentId) {
			// var cPSurroundingContainer = CORA.coraData(metadataProvider
			// .getMetadataById(pSurroundingContainerId));
			// var cParentPresentation = CORA.coraData(metadataProvider
			// .getMetadataById(presentationParentId));

			var spec = {
				// "presentationId" : presentationId,
				"path" : {},
				"cPresentation" : cPresentation,
				"cParentPresentation" : undefined,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper,
				"recordTypeProvider" : recordTypeProvider,
				"dataDivider" : "systemX"
			};
			// var spec = {
			// "path" : path,
			// "cPresentation" : cPSurroundingContainer,
			// "cParentPresentation" : cParentPresentation,
			// "metadataProvider" : metadataProvider,
			// "pubSub" : pubSub,
			// "textProvider" : textProvider,
			// "presentationFactory" : presentationFactory,
			// "jsBookkeeper" : jsBookkeeper
			//
			// };
			var pResourceLink = CORA.pResourceLink(spec);

			var view = pResourceLink.getView();
			fixture.appendChild(view);
			return {
				pResourceLink : pResourceLink,
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

QUnit.module("pResourceLinkTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.presentationFactory = CORATEST.presentationFactorySpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();
		this.newAttachedPResourceLink = CORATEST.attachedPResourceLinkFactory(
				this.metadataProvider, this.pubSub, this.textProvider, this.presentationFactory,
				this.jsBookkeeper, this.recordTypeProvider, this.fixture);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	assert.strictEqual(attachedPResourceLink.pResourceLink.type, "pResourceLink");
	var view = attachedPResourceLink.view;
	assert.visible(view, "pResourceLink view should be visible");
	var expectedClassName = 'pResourceLink masterPResLink';
	assert.deepEqual(view.className, expectedClassName);
});

QUnit.test("testInitInfo", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	var view = attachedPResourceLink.view;

	var infoButton = view.childNodes[0];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "infoButton");

	assert.notOk(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));
	assert.equal(view.childNodes.length, 2);

	var event = document.createEvent('Event');
	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 3);
	assert.ok(new RegExp("^(.*\\s)*infoActive(\\s.*)*$").test(view.className));

	var infoView = view.childNodes[1];
	assert.equal(infoView.childNodes.length, 2);
	assert.equal(infoView.nodeName, "SPAN");
	assert.equal(infoView.className, "infoView");

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
			"metadataGroupForResourceLinkGroupText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
			"metadataGroupForResourceLinkGroupDefText", assert);

	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 3);
	assert.equal(infoView.childNodes.length, 5);

	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
			"textId: metadataGroupForResourceLinkGroupText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
			"defTextId: metadataGroupForResourceLinkGroupDefText", assert);
	CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
			"metadataId: metadataGroupForResourceLinkGroup", assert);

	infoButton.onclick(event);
	assert.equal(view.childNodes.length, 2);
});

 QUnit.test("testInitOneChild", function(assert) {
	var attachedPResourceLink = this.newAttachedPResourceLink.factor("masterPResLink");
	var view = attachedPResourceLink.view;

	assert.ok(view.childNodes.length === 3, "masterPResLink, should have two children");
	
	var childRefHandler = view.childNodes[1];
	assert.deepEqual(childRefHandler.className, "pChildRefHandler filenamePVar");

	var image =  view.childNodes[2];
	assert.equal(image.nodeName, "IMG");
	
});

// QUnit.test("testInitOneTextOneChild", function(assert) {
// var attachedPResourceLink = this.newAttachedPResourceLink
// .factor("pgGroupIdOneTextOneTextChild");
// var view = attachedPResourceLink.view;
//
// assert.ok(view.childNodes.length === 3,
// "pgGroupIdOneTextOneTextChild, should have two children");
//
// var text = view.childNodes[1];
// assert.deepEqual(text.textContent, "En rubrik");
//
// var childRefHandler = view.childNodes[2];
// assert.deepEqual(childRefHandler.className,
// "pChildRefHandler pVarTextVariableId");
// });
//
// QUnit.test("testInitOneCollectionChild", function(assert) {
// var attachedPResourceLink = this.newAttachedPResourceLink
// .factor("groupWithOneCollectionVarChildPResourceLink");
// var view = attachedPResourceLink.view;
//
// assert.ok(view.childNodes.length === 3,
// "pgGroupIdOneTextOneTextChild, should have two children");
//
// var text = view.childNodes[1];
// assert.deepEqual(text.textContent, "En rubrik");
//
// var childRefHandler = view.childNodes[2];
// assert.deepEqual(childRefHandler.className,
// "pChildRefHandler userSuppliedIdCollectionVarPCollVar");
// });
//
// QUnit.test("testInitTwoChildren",
// function(assert) {
// var attachedPResourceLink = this.newAttachedPResourceLink
// .factor("pgGroupIdTwoTextChild");
// var view = attachedPResourceLink.view;
//
// assert.ok(view.childNodes.length === 3);
//
// var childRefHandler = view.childNodes[1];
// assert.deepEqual(childRefHandler.className,
// "pChildRefHandler pVarTextVariableId");
// var childRefHandler2 = view.childNodes[2];
// assert.deepEqual(childRefHandler2.className,
// "pChildRefHandler pVarTextVariableId2");
// });
//
// QUnit.test("testInitOneChildMimimized", function(assert) {
// var attachedPResourceLink = this.newAttachedPResourceLink
// .factor("pgGroupIdOneTextChildMinimized");
// var view = attachedPResourceLink.view;
// var childRefHandler = view.childNodes[1];
// var pChildRefHandler = childRefHandler.modelObject;
// pChildRefHandler.add("groupIdOneTextChild",
// "onelkadsjflökads jflköads jflökadsjfldasj lk");
//
// // minimizedPresentation
// var repeatingElement = childRefHandler.childNodes[0].firstChild;
// assert.strictEqual(repeatingElement.childNodes.length, 3);
//
// var repeatingButtonView = repeatingElement.childNodes[2];
// assert
// .visible(repeatingButtonView,
// "repeatingButtonView should be visible");
//
// var maximizeButton = repeatingButtonView.childNodes[1];
// assert.strictEqual(maximizeButton.className, "maximizeButton");
// assert.notVisible(maximizeButton, "maximizeButton should be hidden");
//
// var minimizeButton = repeatingButtonView.childNodes[2];
// assert.strictEqual(minimizeButton.className, "minimizeButton");
// assert.visible(minimizeButton, "minimizeButton should be visible");
// });
//
// QUnit.test("testInitOneChildMimimizedDefault", function(assert) {
// var attachedPResourceLink = this.newAttachedPResourceLink
// .factor("pgGroupIdOneTextChildMinimizedDefault");
// var view = attachedPResourceLink.view;
// var childRefHandler = view.childNodes[1];
// var pChildRefHandler = childRefHandler.modelObject;
// pChildRefHandler.add("groupIdOneTextChild",
// "onelkadsjflökads jflköads jflökadsjfldasj lk");
//
// // minimizedPresentation
// var repeatingElement = childRefHandler.childNodes[0].firstChild;
// assert.strictEqual(repeatingElement.childNodes.length, 3);
//
// var repeatingButtonView = repeatingElement.childNodes[2];
// assert
// .visible(repeatingButtonView,
// "repeatingButtonView should be visible");
//
// var maximizeButton = repeatingButtonView.childNodes[0];
// assert.strictEqual(maximizeButton.className, "maximizeButton");
// assert.visible(maximizeButton, "maximizeButton should be shown");
//
// var minimizeButton = repeatingButtonView.childNodes[1];
// assert.strictEqual(minimizeButton.className, "minimizeButton");
// assert.notVisible(minimizeButton, "minimizeButton should be hidden");
// });
