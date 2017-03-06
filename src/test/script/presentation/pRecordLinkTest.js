/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2017 Olov McKie
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
QUnit.module("pRecordLinkTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");

		this.getIdForGeneratedPresentationByNo2 = function(no) {
			return CORA.coraData(
					this.dependencies.presentationFactory.getCPresentations()[no]
					.getFirstChildByNameInData("recordInfo"))
					.getFirstAtomicValueByNameInData("id");
		}
		this.answerCall2 = function(no) {
			var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : CORATEST.record
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}

		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.presentationFactorySpy(),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordGuiFactory" :  CORATEST.recordGuiFactorySpy(),
			"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy()
		}
		this.spec = {
			"path" : {},
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"))
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInitRecordLink", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkNoPresentationOfLinkedRecordPLink");

	assert.ok(view.modelObject === pRecordLink);
	assert.ok(view.childNodes.length === 1);

	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	var presentationOfLink = recordIdTextVarSpyDummyView.cPresentation
			.getFirstChildByNameInData("presentationOf");
	var cPresentationOfLink = CORA.coraData(presentationOfLink);
	assert.strictEqual(cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId"),
			"linkedRecordIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdPVar");

	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "linkedData");
	assert.deepEqual(firstSubsription.path, {});
	var pRecordLink = pRecordLink;
	assert.ok(firstSubsription.functionToCall === pRecordLink.handleMsg);

});

QUnit.test("testInitRecordLinkWithFinalValue", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkNoPresentationOfLinkedRecordWithFinalValuePLink");
	assert.ok(view.modelObject === pRecordLink);
	assert.ok(view.childNodes.length === 1);

	var childrenView = childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdOutputPVar");

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	var presentationOfLink = recordIdTextVarSpyDummyView.cPresentation
			.getFirstChildByNameInData("presentationOf");
	var cPresentationOfLink = CORA.coraData(presentationOfLink);

	assert.strictEqual(cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId"),
			"linkedRecordIdTextVar");
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
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myPathLinkNoPresentationOfLinkedRecordPLink");
	assert.ok(view.modelObject === pRecordLink);
	assert.ok(view.childNodes.length === 1);

	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 2);

	var repeatIdView = childrenView.childNodes[1];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");

	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	var presentationOfLink = repeatIdTextVarSpyDummyView.cPresentation
			.getFirstChildByNameInData("presentationOf");
	var cPresentationOfLink = CORA.coraData(presentationOfLink);

	assert.strictEqual(cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId"),
			"linkedRepeatIdTextVar");

	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRepeatId"
		} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdPVar");
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(1), "linkedRepeatIdPVar");

});

QUnit.test("testInitRecordLinkOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkNoPresentationOfLinkedRecordOutputPLink");
	assert.ok(view.modelObject === pRecordLink);
	assert.ok(view.childNodes.length === 1);

	var childrenView = childrenView;
	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var recordIdView = childrenView.childNodes[0];
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");

	var recordIdTextVarSpyDummyView = recordIdView.childNodes[0];
	var presentationOfLink = recordIdTextVarSpyDummyView.cPresentation
			.getFirstChildByNameInData("presentationOf");
	var cPresentationOfLink = CORA.coraData(presentationOfLink);

	assert.strictEqual(cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId"),
			"linkedRecordIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRecordId"
		} ]
	};
	assert.stringifyEqual(recordIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdOutputPVar");
});

QUnit.test("testInitRecordLinkWithPathOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myPathLinkNoPresentationOfLinkedRecordOutputPLink");
	assert.ok(view.modelObject === pRecordLink);
	assert.ok(view.childNodes.length === 1);

	assert.strictEqual(childrenView.nodeName, "SPAN");
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(childrenView.childNodes.length, 2);

	var repeatIdView = childrenView.childNodes[1];
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");

	var repeatIdTextView = repeatIdView.firstChild;
	assert.strictEqual(repeatIdTextView.className, "text");
	assert.strictEqual(repeatIdTextView.innerHTML, "RepeatId");

	var repeatIdTextVarSpyDummyView = repeatIdView.childNodes[1];
	var presentationOfLink = repeatIdTextVarSpyDummyView.cPresentation
			.getFirstChildByNameInData("presentationOf");
	var cPresentationOfLink = CORA.coraData(presentationOfLink);

	assert.strictEqual(cPresentationOfLink.getFirstAtomicValueByNameInData("linkedRecordId"),
			"linkedRepeatIdTextVar");
	var expectedPath = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "linkedRepeatId"
		} ]
	};
	assert.stringifyEqual(repeatIdTextVarSpyDummyView.path, expectedPath);
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdOutputPVar");
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(1), "linkedRepeatIdOutputPVar");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroup", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	assert.ok(view.modelObject === pRecordLink);
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
	pRecordLink.handleMsg(dataFromMsg, "linkedData");
	this.answerCall2(0);

	assert.strictEqual(view.childNodes.length, 1);
	
	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId, "metadataTextVariableGroup");

	var linkedRecordPresentations = view.childNodes[0];
	assert.strictEqual(linkedRecordPresentations.nodeName, "SPAN");
	assert.strictEqual(linkedRecordPresentations.className, "recordViewer");
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	assert.ok(view.modelObject === pRecordLink);
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
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(view.childNodes.length, 1);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
		assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);
	
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className,
			"pRecordLink myLinkPresentationOfLinkedRecordOutputPLink");
	assert.ok(view.modelObject === pRecordLink);
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
	pRecordLink.handleMsg(dataFromMsg, "linkedData");

	assert.strictEqual(view.childNodes.length, 1);

});

QUnit
		.test(
				"testInitRecordLinkOutputWithLinkedRecord"
						+ "PresentationsGroupWrongLinkedRecordType",
				function(assert) {
					this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
							.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"));
					var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
					var view = pRecordLink.getView();
					var childrenView = view.firstChild;
					this.fixture.appendChild(view);
					
					assert.strictEqual(pRecordLink.type, "pRecordLink");
					assert
							.deepEqual(view.className,
									"pRecordLink myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType");
					assert.ok(view.modelObject === pRecordLink);
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
					pRecordLink.handleMsg(dataFromMsg, "linkedData");

					assert.strictEqual(view.childNodes.length, 1);

				});