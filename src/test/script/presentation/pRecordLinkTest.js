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
			"pRecordLinkViewFactory" : CORATEST.pRecordLinkViewFactorySpy(),
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.presentationFactorySpy(),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordGuiFactory" : CORATEST.recordGuiFactorySpy(),
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
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	assert.strictEqual(pRecordLinkView.getAddedChild(1), undefined);

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

QUnit.test("testGetDependencies", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	assert.strictEqual(pRecordLink.getDependencies(), this.dependencies);
});

QUnit.test("testViewIsFactored", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);

	var factoredView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	assert.strictEqual(pRecordLink.getView(), factoredView.getView());
	var factoredViewSpec = this.dependencies.pRecordLinkViewFactory.getSpec(0);

	var expectedInfoSpec = {
		"presentationId" : "somePresentationId",
		"mode" : "input",
		"info" : {
			"text" : "myLinkText",
			"defText" : "myLinkDefText",
			"technicalInfo" : [ "textId: " + "myLinkText", "defTextId: " + "myLinkDefText",
					"metadataId: " + "myLink", "linkedRecordType: metadataTextVariable" ]
		}
	};
	assert.stringifyEqual(factoredViewSpec, expectedInfoSpec);

});

QUnit.test("testInitRecordLinkWithFinalValue", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkNoPresentationOfLinkedRecordWithFinalValuePLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	assert.strictEqual(pRecordLinkView.getAddedChild(1), undefined);
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

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	var repeatIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");
	var repeatIdTextView = repeatIdView.firstChild;

	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);

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

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	assert.strictEqual(pRecordLinkView.getAddedChild(1), undefined);
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
	assert.stringifyEqual(this.getIdForGeneratedPresentationByNo2(0), "linkedRecordIdOutputPVar");
});

QUnit.test("testInitRecordLinkWithPathOutput", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myPathLinkNoPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var recordIdView = pRecordLinkView.getAddedChild(0);
	assert.strictEqual(recordIdView.className, "linkedRecordIdView");
	var recordIdTextView = recordIdView.firstChild;

	var repeatIdView = pRecordLinkView.getAddedChild(1);
	assert.strictEqual(repeatIdView.className, "linkedRepeatIdView");
	var repeatIdTextView = repeatIdView.firstChild;

	assert.strictEqual(pRecordLinkView.getAddedChild(2), undefined);

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

	// FOR LINKED PRESENATION:
	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView.className, "recordViewer");

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 1);

	assert.strictEqual(this.dependencies.recordGuiFactory.getSpec(0).metadataId,
			"metadataTextVariableGroup");

});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoData", function(assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

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

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView, undefined);

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
});

QUnit.test("testInitRecordLinkOutputWithLinkedRecordPresentationsGroupNoActionLinks", function(
		assert) {
	this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLink"));
	var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
	var view = pRecordLink.getView();
	var childrenView = view.firstChild;
	this.fixture.appendChild(view);

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

	assert.strictEqual(pRecordLink.type, "pRecordLink");
	assert.deepEqual(view.className, "pRecordLinkViewSpyView");

	var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
	var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
	assert.strictEqual(linkedRecordView, undefined);

	assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);
});

QUnit
		.test(
				"testInitRecordLinkOutputWithLinkedRecord"
						+ "PresentationsGroupWrongLinkedRecordType",
				function(assert) {
					this.spec.cPresentation = CORA
							.coraData(this.dependencies.metadataProvider
									.getMetadataById("myLinkPresentationOfLinkedRecordOutputPLinkWrongLinkedRecordType"));
					var pRecordLink = CORA.pRecordLink(this.dependencies, this.spec);
					var view = pRecordLink.getView();
					var childrenView = view.firstChild;
					this.fixture.appendChild(view);


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

					assert.strictEqual(pRecordLink.type, "pRecordLink");
					assert.deepEqual(view.className, "pRecordLinkViewSpyView");

					var pRecordLinkView = this.dependencies.pRecordLinkViewFactory.getFactored(0);
					var linkedRecordView = pRecordLinkView.getAddedLinkedPresentation(0);
					assert.strictEqual(linkedRecordView, undefined);

					assert.strictEqual(pRecordLinkView.getChildrenHidden(), 0);

				});