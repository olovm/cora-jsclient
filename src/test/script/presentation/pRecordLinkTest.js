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
			presentationFactory, jsBookkeeper, fixture, xmlHttpRequestFactory, recordGuiFactory) {
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
				"jsBookkeeper" : jsBookkeeper,
				"xmlHttpRequestFactory" : xmlHttpRequestFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			var pRecordLink = CORA.pRecordLink(spec);
			var view = pRecordLink.getView();
			fixture.appendChild(view);
			var childrenView = view.firstChild;
			return {
				pRecordLink : pRecordLink,
				fixture : fixture,
				childrenView : childrenView,
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

		this.presentation = {
			"getView" : function() {
				return document.createElement("span");
			}
		};

		var presentation = this.presentation;
		this.presentationIdUsed = [];
		var presentationIdUsed = this.presentationIdUsed;

		this.xmlHttpRequestSpy = CORATEST.xmlHttpRequestSpy(sendFunction);
		var xmlHttpRequestSpy = this.xmlHttpRequestSpy;
		var record = CORATEST.record;
		function sendFunction() {
			xmlHttpRequestSpy.status = 200;
			xmlHttpRequestSpy.responseText = JSON.stringify({
				"record" : record
			});
			xmlHttpRequestSpy.addedEventListeners["load"][0]();
		}

		this.pubSub = CORATEST.pubSubSpy();
		this.recordGui = {
			"getPresentation" : function(presentationId) {
				presentationIdUsed.push(presentationId);
				return presentation;
			},
			"initMetadataControllerStartingGui" : function initMetadataControllerStartingGui() {
			},
			"dataHolder" : {
				"getData" : function() {
					return {};
				}
			},
			"validateData" : function() {
				return true;
			},
			"pubSub" : this.pubSub
		};

		var recordGui = this.recordGui;
		this.metadataIdUsed = [];
		var metadataIdUsed = this.metadataIdUsed;
		this.recordGuiFactorySpy = {
			"factor" : function(metadataId, data) {
				metadataIdUsed.push(metadataId);
				return recordGui;
			}
		};
		this.pRecordLinkFactory = CORATEST.attachedPRecordLinkFactory(this.metadataProvider,
				this.pubSub, this.textProvider, this.presentationFactory, this.jsBookkeeper,
				this.fixture, CORATEST.xmlHttpRequestFactorySpy(this.xmlHttpRequestSpy),
				this.recordGuiFactorySpy);

		this.getIdForGeneratedPresentationByNo = function(no) {
			return CORA.coraData(
					this.presentationFactory.getCPresentations()[no]
							.getFirstChildByNameInData("recordInfo"))
					.getFirstAtomicValueByNameInData("id");
		}
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

	var childrenView = attachedPRecordLink.childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	assert.strictEqual(recordIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRecordIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(0), "linkedRecordIdPVar");

	var subscriptions = this.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "linkedData");
	assert.deepEqual(firstSubsription.path, {});
	var pRecordLink = attachedPRecordLink.pRecordLink;
	assert.ok(firstSubsription.functionToCall === pRecordLink.handleMsg);

});

QUnit.test("testInitRecordLinkWithFinalValue", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
			"myLinkNoPresentationOfLinkedRecordWithFinalValuePLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
			"pRecordLink myLinkNoPresentationOfLinkedRecordWithFinalValuePLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.ok(view.childNodes.length === 1);

	var childrenView = attachedPRecordLink.childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(0), "linkedRecordIdOutputPVar");

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	assert.strictEqual(recordIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRecordIdTextVar");
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

	var childrenView = attachedPRecordLink.childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 2);

	var repeatIdView = childrenView.childNodes[1];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");

	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRepeatIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRepeatId"
		} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(0), "linkedRecordIdPVar");
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(1), "linkedRepeatIdPVar");

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

	var childrenView = attachedPRecordLink.childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	assert.strictEqual(recordIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRecordIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(0), "linkedRecordIdOutputPVar");
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

	var childrenView = attachedPRecordLink.childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 2);

	var repeatIdView = childrenView.childNodes[1];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");

	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	assert.strictEqual(repeatIdTextVarSpyDummyView.cPresentation
			.getFirstAtomicValueByNameInData("presentationOf"), "linkedRepeatIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRepeatId"
		} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(0), "linkedRecordIdOutputPVar");
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo(1), "linkedRepeatIdOutputPVar");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
			"myLinkPresentationOfLinkedRecordOutputPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.strictEqual(view.childNodes.length, 1);

	var dataFromMsg = {
		"data" : {
			"children" : [ {
				"name" : "linkedRecordType",
				"value" : "metadataTextVariable"
			}, {
				"name" : "linkedRecordId",
				"value" : "cora"
			} ],
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://localhost:8080/therest/rest/record/system/cora",
					"accept" : "application/uub+record+json"
				}
			},
			"name" : "dataDivider"
		},
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "recordInfo"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "dataDivider"
				} ]
			} ]
		}
	};
	var pRecordLink = attachedPRecordLink.pRecordLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(view.childNodes.length, 2);
	assert.strictEqual(this.metadataIdUsed[0], "metadataTextVariableGroup");
	
	var linkedRecordPresentations = view.childNodes[1];
	assert.strictEqual(linkedRecordPresentations.nodeName, "SPAN");
	assert.strictEqual(linkedRecordPresentations.className, "recordViewer");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
			"myLinkPresentationOfLinkedRecordOutputPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.strictEqual(view.childNodes.length, 1);

	var dataFromMsg = {
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "recordInfo"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "dataDivider"
				} ]
			} ]
		}
	};
	var pRecordLink = attachedPRecordLink.pRecordLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(view.childNodes.length, 1);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
		assert) {
	var attachedPRecordLink = this.pRecordLinkFactory.factor({},
			"myLinkPresentationOfLinkedRecordOutputPLink");
	assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
	assert.deepEqual(attachedPRecordLink.view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	var view = attachedPRecordLink.view;
	assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
	assert.strictEqual(view.childNodes.length, 1);

	var dataFromMsg = {
		"data" : {
			"children" : [ {
				"name" : "linkedRecordType",
				"value" : "metadataTextVariable"
			}, {
				"name" : "linkedRecordId",
				"value" : "cora"
			} ],
			"name" : "dataDivider"
		},
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "recordInfo"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "dataDivider"
				} ]
			} ]
		}
	};
	var pRecordLink = attachedPRecordLink.pRecordLink;
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(view.childNodes.length, 1);

});

QUnit
		.test(
				"testInitRecordLinkOutputWithLinkedRecord"
						+ "PresentationsGroupWrongLinkedRecordType",
				function(assert) {
					var attachedPRecordLink = this.pRecordLinkFactory.factor({},
							"myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType");
					assert.strictEqual(attachedPRecordLink.pRecordLink.type, "pRecordLink");
					assert
							.deepEqual(attachedPRecordLink.view.className,
									"pRecordLink myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType");
					var view = attachedPRecordLink.view;
					assert.ok(view.modelObject === attachedPRecordLink.pRecordLink);
					assert.strictEqual(view.childNodes.length, 1);

					var dataFromMsg = {
						"data" : {
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "cora"
							} ],
							"actionLinks" : {
								"read" : {
									"requestMethod" : "GET",
									"rel" : "read",
									"url" : "http://localhost:8080/therest/rest/record/system/cora",
									"accept" : "application/uub+record+json"
								}
							},
							"name" : "dataDivider"
						},
						"path" : {
							"name" : "linkedPath",
							"children" : [ {
								"name" : "nameInData",
								"value" : "recordInfo"
							}, {
								"name" : "linkedPath",
								"children" : [ {
									"name" : "nameInData",
									"value" : "dataDivider"
								} ]
							} ]
						}
					};
					var pRecordLink = attachedPRecordLink.pRecordLink;
					pRecordLink.handleMsg(dataFromMsg, "linkedData");

					assert.strictEqual(view.childNodes.length, 1);

				});