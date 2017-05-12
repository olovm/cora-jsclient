/*
 * Copyright 2016, 2017 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
QUnit.module("recordHandlerTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.record = CORATEST.recordTypeList.dataList.data[4].record;
		this.recordWithoutUpdateOrDeleteLink = CORATEST.recordWithoutUpdateOrDeleteLink;
		this.recordWithoutDeleteLink = CORATEST.recordWithoutDeleteLink;

		this.pubSub = CORATEST.pubSubSpy();

		this.recordGuiFactorySpy = CORATEST.standardFactorySpy("recordGuiSpy");

		this.recordHandlerViewFactorySpy = CORATEST.standardFactorySpy("recordHandlerViewSpy");
		this.ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
		var dependencies = {
			"recordHandlerFactory" : CORATEST.standardFactorySpy("recordHandlerSpy"),
			"ajaxCallFactory" : this.ajaxCallFactorySpy,
			"recordGuiFactory" : this.recordGuiFactorySpy,
			"recordHandlerViewFactory" : this.recordHandlerViewFactorySpy,
			"managedGuiItemFactory" : CORATEST.standardFactorySpy("managedGuiItemSpy")
		};
		this.dependencies = dependencies;

		this.spec = {
			"fetchUpdatedDataFromServer" : "true",
			"presentationMode" : "view",
			"record" : this.record,
			"jsClient" : CORATEST.jsClientSpy()
		};
		this.specUsePrefetchedData = {
			"fetchUpdatedDataFromServer" : "false",
			"presentationMode" : "view",
			"record" : this.record,
			"jsClient" : CORATEST.jsClientSpy()
		};

		this.specForNew = {
			"fetchUpdatedDataFromServer" : "false",
			"presentationMode" : "new",
			"recordTypeRecordIdForNew" : "recordType",
			"record" : this.record,
			"jsClient" : CORATEST.jsClientSpy()
		};

		this.answerCall = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : this.record
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerCallWithoutUpdateOrDeleteLink = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : this.recordWithoutUpdateOrDeleteLink
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}
		this.answerCallWithoutDeleteLink = function(no) {
			var ajaxCallSpy0 = this.ajaxCallFactorySpy.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : this.recordWithoutDeleteLink
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}

	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.type, "recordHandler");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);
});

QUnit.test("testGetDependencies", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	assert.strictEqual(recordHandler.getDependencies(), this.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	assert.strictEqual(recordHandler.getSpec(), this.spec);
});

QUnit.test("initTestManagedGuiItemFactoryCalled", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);

	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	var managedGuiItemSpec = managedGuiItemSpy.getSpec(0);
	assert.strictEqual(managedGuiItemSpec.activateMethod, this.spec.jsClient.showView);
	assert.strictEqual(managedGuiItemSpec.removeMethod, this.spec.jsClient.removeView);
	assert.ok(managedGuiItemSpy !== undefined);
});

QUnit.test("testGetManagedGuiItem", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(recordHandler.getManagedGuiItem(), managedGuiItem);
});

QUnit.test("testInitRecordHandlerViewSpec", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var usedSpec = this.recordHandlerViewFactorySpy.getSpec(0);
	assert.strictEqual(usedSpec.extraClassName, "recordHandler");
	// TODO: test that buttons are added on init in view...
	assert.strictEqual(usedSpec.showDataMethod, recordHandler.showData);
	assert.strictEqual(usedSpec.copyDataMethod, recordHandler.copyData);
});

QUnit.test("testInitRecordHandlerViewFormFactoredAndAdded", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	var presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormPGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
});

QUnit.test("testInitRecordHandlerViewNewFormFactoredAndAdded", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	var presentationFormIdUsed = factoredRecordGui.getPresentationIdUsed(0);
	assert.strictEqual(presentationFormIdUsed, "recordTypeFormNewPGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var factoredForm = factoredRecordGui.getReturnedPresentations(0);
	assert.strictEqual(factoredForm.getView(), recordHandlerViewSpy.getAddedEditView(0));
});

QUnit.test("testInitRecordHandlerViewViewFactoredAndAdded", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	var presentationViewIdUsed = factoredRecordGui.getPresentationIdUsed(1);
	assert.strictEqual(presentationViewIdUsed, "recordTypeViewPGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var factoredView = factoredRecordGui.getReturnedPresentations(1);
	assert.strictEqual(factoredView.getView(), recordHandlerViewSpy.getAddedShowView(0));
});

QUnit.test("testInitRecordHandlerViewMenuFactoredAndAdded", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	var presentationMenuViewIdUsed = factoredRecordGui.getPresentationIdUsed(2);
	assert.strictEqual(presentationMenuViewIdUsed, "recordTypeMenuPGroup");

	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	var factoredView = factoredRecordGui.getReturnedPresentations(2);
	assert.strictEqual(factoredView.getView(), managedGuiItemSpy.getAddedMenuPresentation(0));
});

QUnit.test("testInitRecordHandlerViewButtonCreated", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	var deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(deleteButtonSpec.text, "DELETE");
	assert.strictEqual(deleteButtonSpec.className, "delete");
	assert.strictEqual(deleteButtonSpec.onclickMethod, recordHandler.shouldRecordBeDeleted);

	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(updateButtonSpec.text, "UPDATE");
	assert.strictEqual(updateButtonSpec.className, "update");
	assert.strictEqual(updateButtonSpec.onclickMethod, recordHandler.sendUpdateDataToServer);
});

QUnit.test("testShowData", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.showData();
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var messageHolder = managedGuiItem.getAddedWorkPresentation(0);

	assert.strictEqual(messageHolder.className, "messageHolder");
	// TODO: move to view...
});

QUnit.test("testCopyAsNew", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	recordHandler.copyData();

	var dataHolderData = this.dependencies.recordGuiFactory.getFactored(0).dataHolder.getData();

	var expectedSpec = {
		"presentationMode" : "new",
		"record" : dataHolderData,
		"jsClient" : this.spec.jsClient,
		"recordTypeRecordIdForNew" : "recordType",
	};

	var createdSpecForCopy = this.dependencies.recordHandlerFactory.getSpec(0);
	assert.strictEqual(createdSpecForCopy.presentationMode, expectedSpec.presentationMode);
	assert.stringifyEqual(createdSpecForCopy.record, expectedSpec.record);
	assert.strictEqual(createdSpecForCopy.jsClient, expectedSpec.jsClient);
	assert.strictEqual(createdSpecForCopy.recordTypeRecordIdForNew,
			expectedSpec.recordTypeRecordIdForNew);
});

QUnit.test("testCopyAsNewManagedGuiItemAddedToJsClient", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.copyData();
	var factoredRecordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getAddedGuiItem(0), factoredRecordHandler
			.getManagedGuiItem());
});

QUnit.test("testCopyAsNewManagedGuiItemShownInJsClient", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	recordHandler.copyData();
	var factoredRecordHandler = this.dependencies.recordHandlerFactory.getFactored(0);
	assert.strictEqual(this.spec.jsClient.getViewShowingInWorkView(0), factoredRecordHandler
			.getManagedGuiItem());
});

QUnit.test("initTestDataFetchedFromServer", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);

	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "GET");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.processFetchedRecord);
});

QUnit.test("initTestUsePrefetchedData", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.specUsePrefetchedData);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);

	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec, undefined);
});

QUnit.test("testInitSubscriptions",
		function(assert) {
			var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
			this.answerCall(0);

			// subscription
			var subscriptions = this.dependencies.recordGuiFactory.getFactored(0).pubSub
					.getSubscriptions();
			assert.deepEqual(subscriptions.length, 1);

			var firstSubscription = subscriptions[0];
			assert.strictEqual(firstSubscription.type, "*");
			assert.deepEqual(firstSubscription.path, {});
			assert.ok(firstSubscription.functionToCall === recordHandler.handleMsg);
		});

QUnit.test("testHandleMessage", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	var data = {
		"data" : "A new value",
		"path" : {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	var data1 = {
		"data" : "",
		"path" : {}
	};
	recordHandler.handleMsg(data1, "initComplete");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);
});

QUnit.test("testHandleMessageAddDoesNotSetDataChanged", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);

	var data = {
		"data" : "A new value",
		"path" : {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	var data1 = {
		"data" : "",
		"path" : {}
	};
	recordHandler.handleMsg(data1, "initComplete");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	recordHandler.handleMsg(data, "add");
	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);
});

QUnit.test("testUpdateCall", function(assert) {
	this.spec.presentationMode = "edit";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);

	var recordHandlerViewSpy2 = this.recordHandlerViewFactorySpy.getFactored(1);
});

QUnit.test("testUpdateThroughPubSubCall", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	var data = {
		"data" : "",
		"path" : {}
	};
	recordHandler.handleMsg(data, "updateRecord");

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
});

QUnit.test("testUpdateDataIsChanged", function(assert) {
	this.spec.presentationMode = "edit";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	this.answerCall(0);

	var data1 = {
		"data" : "",
		"path" : {}
	};
	recordHandler.handleMsg(data1, "initComplete");
	var data = {
		"data" : "A new value",
		"path" : {}
	};
	recordHandler.handleMsg(data, "setValue");
	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItemSpy.getChanged(), true);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();
	this.answerCall(1);

	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getMenuViewCleared(), 2);
	var item = managedGuiItem.getAddedMenuPresentation(1);
	assert.strictEqual(item.nodeName, "SPAN");
	assert.strictEqual(managedGuiItem.getAddedMenuPresentation(2), undefined);
});

QUnit.test("testUpdateCallValidationError", function(assert) {
	this.spec.presentationMode = "edit";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);
	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredRecordGui.setValidateAnswer(false);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	updateButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined);
});

QUnit.test("testNoUpdateButtonAndEditFormWhenNoUpdateLink", function(assert) {
	this.spec.presentationMode = "edit";
	this.spec.record = this.recordWithoutUpdateOrDeleteLink;

	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithoutUpdateOrDeleteLink(0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textSystemOneViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textSystemOneMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textSystemOneListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), undefined);
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), undefined);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	var editViewChild = recordHandlerViewSpy.getAddedEditView(0);
	assert.strictEqual(editViewChild, undefined);

	var showViewChild = recordHandlerViewSpy.getAddedShowView(0);
	assert.strictEqual(showViewChild.className, "presentationStub");

	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(updateButtonSpec, undefined);
});

QUnit.test("testDeleteCall", function(assert) {
	this.spec.presentationMode = "edit";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	deleteButtonSpec.onclickMethod();

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var question = managedGuiItem.getAddedWorkPresentation(3);
	assert.strictEqual(question.className, "question");
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");

	var buttonNo = question.firstChild.childNodes[1];
	assert.strictEqual(buttonNo.value, "Nej");
	buttonNo.onclick();
	assert.notVisible(question);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");

	deleteButtonSpec.onclickMethod();
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var question = managedGuiItem.getAddedWorkPresentation(4);
	assert.strictEqual(question.className, "question");
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy, undefined, "no delete call should have been made yet");
	var buttonYes = question.firstChild.childNodes[2];
	assert.strictEqual(buttonYes.value, "Ja");
	buttonYes.onclick();

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(1);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url,
			"http://epc.ub.uu.se/cora/rest/record/recordType/recordType");
	assert.strictEqual(ajaxCallSpec.requestMethod, "DELETE");
	assert.strictEqual(ajaxCallSpec.accept, undefined);
	assert.strictEqual(ajaxCallSpec.contentType, undefined);
	assert.strictEqual(ajaxCallSpec.data, undefined);
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.afterDelete);

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	assert.strictEqual(managedGuiItem.getRemoved(), 0);
	this.answerCall(1);

	assert.strictEqual(managedGuiItem.getRemoved(), 1);
});

QUnit.test("testDeleteCallNoParentsForViews", function(assert) {
	this.spec.presentationMode = "edit";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var deleteButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	deleteButtonSpec.onclickMethod();

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var question = managedGuiItem.getAddedWorkPresentation(3);

	var buttonYes = question.firstChild.childNodes[2];
	buttonYes.onclick();
	assert.strictEqual(managedGuiItem.getRemoved(), 0);
	this.answerCall(1);

	assert.strictEqual(managedGuiItem.getRemoved(), 1);
});

QUnit.test("testNoDeleteButtonWhenNoDeleteLink", function(assert) {
	this.spec.presentationMode = "edit";
	this.spec.record = this.recordWithoutDeleteLink;

	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCallWithoutDeleteLink(0);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "textSystemOneGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "textSystemOneFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "textSystemOneViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "textSystemOneGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "textSystemOneMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "textSystemOneGroup");

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(updateButtonSpec.className, "update");
});

QUnit.test("initCheckRightGuiCreatedNew", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), true);
	assert.strictEqual(managedGuiItem.getChanged(), true);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy, undefined, "no call to server on new record");

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeNewGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormNewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeNewGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), "recordTypeListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), "recordTypeNewGroup");
	assert.strictEqual(managedGuiItem.getAddedListPresentation(0), factoredRecordGui
			.getReturnedPresentations(3).getView());

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item.nodeName, "SPAN");
});

QUnit.test("initCheckRightGuiCreatedForExisting", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var managedGuiItemSpy = this.dependencies.managedGuiItemFactory.getFactored(0);
	this.answerCall(0);

	assert.strictEqual(recordHandler.getDataIsChanged(), false);
	assert.strictEqual(managedGuiItemSpy.getChanged(), false);

	var factoredSpec = this.dependencies.recordGuiFactory.getSpec(0);
	assert.strictEqual(factoredSpec.metadataId, "recordTypeGroup");

	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(0), "recordTypeFormPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(0), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(1), "recordTypeViewPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(1), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(2), "recordTypeMenuPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(2), "recordTypeGroup");

	assert.strictEqual(factoredRecordGui.getPresentationIdUsed(3), "recordTypeListPGroup");
	assert.strictEqual(factoredRecordGui.getMetadataIdsUsedInData(3), "recordTypeGroup");

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var item = managedGuiItem.getAddedMenuPresentation(0);
	assert.strictEqual(item.nodeName, "SPAN");
});

QUnit.test("testCreateNewCall", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	assert.strictEqual(createButtonSpec.className, "create");
	createButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	var ajaxCallSpec = ajaxCallSpy.getSpec();
	assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/recordType/");
	assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
	assert.strictEqual(ajaxCallSpec.accept, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.contentType, "application/vnd.uub.record+json");
	assert.strictEqual(ajaxCallSpec.data, "{}");
	assert.strictEqual(ajaxCallSpec.loadMethod, recordHandler.resetViewsAndProcessFetchedRecord);
	this.answerCall(0);

	assert.ok(recordHandlerViewSpy.getClearViewsWasCalled());

	var deleteButtonSpec = recordHandlerViewSpy.getAddedButton(1);
	assert.strictEqual(deleteButtonSpec.className, "delete");
	var updateButtonSpec = recordHandlerViewSpy.getAddedButton(2);
	assert.strictEqual(updateButtonSpec.className, "update");
});

QUnit.test("testCreateNewCallValidationError", function(assert) {
	var recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	var factoredRecordGui = this.dependencies.recordGuiFactory.getFactored(0);
	factoredRecordGui.setValidateAnswer(false);
	assert.strictEqual(factoredRecordGui.getDataValidated(), 0);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);
	var createButtonSpec = recordHandlerViewSpy.getAddedButton(0);
	createButtonSpec.onclickMethod();

	assert.strictEqual(factoredRecordGui.getDataValidated(), 1);

	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy, undefined, "no create call should have been made yet");
});

QUnit.test("fetchListCheckError", function(assert) {
	this.spec.presentationMode = "view";
	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	var ajaxCallSpy = this.ajaxCallFactorySpy.getFactored(0);
	ajaxCallSpy.getSpec().errorMethod({
		"status" : 404
	});

	var managedGuiItem = this.dependencies.managedGuiItemFactory.getFactored(0);
	var item = managedGuiItem.getAddedWorkPresentation(0);
	assert.strictEqual(item.textContent, "404");
});

QUnit.test("checkRightGuiCreatedPresentationMetadataIsMissing", function(assert) {
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	this.spec.presentationMode = "view";
	this.dependencies.recordGuiFactory = recordGuiFactorySpy;

	var recordHandler = CORA.recordHandler(this.dependencies, this.spec);
	this.answerCall(0);

	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
			"something went wrong, probably missing metadata, " + "Error: missing metadata");
	assert.stringifyEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), this.record.data);

	assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
});

QUnit.test("rightGuiCreatedPresentationMetadataIsMissingForNew", function(assert) {
	var recordGuiFactorySpy = {
		"factor" : function(metadataId, data) {
			throw new Error("missing metadata");
		}
	};
	this.dependencies.recordGuiFactory = recordGuiFactorySpy;

	var recordHandler = CORA.recordHandler(this.dependencies, this.specForNew);
	var recordHandlerViewSpy = this.recordHandlerViewFactorySpy.getFactored(0);

	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(0),
			"something went wrong, probably missing metadata, " + "Error: missing metadata");
	assert.strictEqual(recordHandlerViewSpy.getObjectAddedToEditView(1), this.record);
	assert.ok(recordHandlerViewSpy.getObjectAddedToEditView(2).length > 20);
});
