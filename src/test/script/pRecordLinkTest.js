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
	coraTest.attachedPRecordLinkFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, fixture) {
		var factor = function(path, pRecordLinkPresentationId) {
			var cPRecordLinkPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pRecordLinkPresentationId));

			var spec = {
				"path" : path,
				"cPresentation" : cPRecordLinkPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper
			};
			var pRecordLink = CORA.pRecordLink(spec);
			var view = pRecordLink.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				pRecordLink : pRecordLink,
				fixture : fixture,
				valueView : valueView,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
				view : view
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("pRecordLinkTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.presentationFactory = CORATEST.presentationFactorySpy();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pRecordLinkFactory = CORATEST.attachedPRecordLinkFactory(this.metadataProvider,
				this.pubSub, this.textProvider, this.presentationFactory, this.jsBookkeeper,
				this.fixture);
	},
	afterEach : function() {
	}
});


QUnit.test("testInitRecordLink", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
			"myLinkNoPresentationOfLinkedRecordPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
			"pRecordLink myLinkNoPresentationOfLinkedRecordPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.ok(view.childNodes.length === 1);

	var valueView = attachedPRecordLink.valueView;
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "valueView");
	assert.strictEqual(valueView.childNodes.length, 2);

	var recordTypeView = valueView.childNodes[0];
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	var recordTypeTextView = recordTypeView.firstChild;
	assert.strictEqual(recordTypeTextView.className, "text");
	assert.strictEqual(recordTypeTextView.innerHTML, "Posttyp");
	
	var recordIdView = valueView.childNodes[1];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;
	assert.strictEqual(recordIdTextView.className, "text");
	assert.strictEqual(recordIdTextView.innerHTML, "PostId");

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRecordIdTVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
});

QUnit.test("testInitRecordLinkWithPath", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
	"myPathLinkNoPresentationOfLinkedRecordPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
	"pRecordLink myPathLinkNoPresentationOfLinkedRecordPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.ok(view.childNodes.length === 1);
	
	var valueView = attachedPRecordLink.valueView;
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "valueView");
	assert.strictEqual(valueView.childNodes.length, 3);
	
	var repeatIdView = valueView.childNodes[2];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");
	
	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");
	
	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRepeatIdTVar");
	var expectedPath = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "linkedRepeatId"
			} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
});

QUnit.test("testInitRecordLinkOutput", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
	"myLinkNoPresentationOfLinkedRecordOutputPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
	"pRecordLink myLinkNoPresentationOfLinkedRecordOutputPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.ok(view.childNodes.length === 1);
	
	var valueView = attachedPRecordLink.valueView;
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "valueView");
	assert.strictEqual(valueView.childNodes.length, 2);
	
	var recordTypeView = valueView.childNodes[0];
	assert.strictEqual(recordTypeView.className, "linkedRecordTypeView");
	var recordTypeTextView = recordTypeView.firstChild;
	assert.strictEqual(recordTypeTextView.className, "text");
	assert.strictEqual(recordTypeTextView.innerHTML, "Posttyp");
	
	var recordIdView = valueView.childNodes[1];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;
	assert.strictEqual(recordIdTextView.className, "text");
	assert.strictEqual(recordIdTextView.innerHTML, "PostId");
	
	var recordIdTextVarSpyDummyView = recordIdView.childNodes[1];
	assert.strictEqual(recordIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRecordIdTVar");
	var expectedPath = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "linkedRecordId"
			} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
});

QUnit.test("testInitRecordLinkWithPathOutput", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
	"myPathLinkNoPresentationOfLinkedRecordOutputPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
	"pRecordLink myPathLinkNoPresentationOfLinkedRecordOutputPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.ok(view.childNodes.length === 1);
	
	var valueView = attachedPRecordLink.valueView;
	assert.strictEqual(valueView.nodeName, "SPAN");
	assert.strictEqual(valueView.className, "valueView");
	assert.strictEqual(valueView.childNodes.length, 3);
	
	var repeatIdView = valueView.childNodes[2];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");
	
	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");
	
	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRepeatIdTVar");
	var expectedPath = {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "linkedRepeatId"
			} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
});
