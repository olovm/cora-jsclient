/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016 Olov McKie
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
	coraTest.attachedPChildRefHandlerFactory = function(metadataProvider, pubSub, textProvider,
			presentationFactory, jsBookkeeper, recordTypeProvider, fixture) {
		var factor = function(path, parentMetadataId, presentationId) {
			var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById(parentMetadataId));
			var cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));

			var uploadManager = CORATEST.uploadManagerSpy();

			var ajaxCallFactorySpy = CORATEST.ajaxCallFactorySpy();
			var pRepeatingElementFactory = CORATEST.pRepeatingElementFactorySpy();
			var spec = {
				"parentPath" : path,
				"cParentMetadata" : cParentMetadata,
				"cPresentation" : cPresentation,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"presentationFactory" : presentationFactory,
				"jsBookkeeper" : jsBookkeeper,
				"recordTypeProvider" : recordTypeProvider,
				"uploadManager" : uploadManager,
				"ajaxCallFactory" : ajaxCallFactorySpy,
				"pRepeatingElementFactory":pRepeatingElementFactory
			};

			var pChildRefHandler = CORA.pChildRefHandler(spec);
			var view = pChildRefHandler.getView();
			fixture.appendChild(view);
			return {
				pChildRefHandler : pChildRefHandler,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				jsBookkeeper : jsBookkeeper,
				view : view,
				ajaxCallFactorySpy : ajaxCallFactorySpy,
				uploadManager : uploadManager,
				pRepeatingElementFactory:pRepeatingElementFactory
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("pChildRefHandlerTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();

		this.presentationFactory = CORATEST.presentationFactorySpy();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.recordTypeProvider = CORATEST.recordTypeProviderStub();

		this.attachedPChildRefHandlerFactory = CORATEST.attachedPChildRefHandlerFactory(
				this.metadataProvider, this.pubSub, this.textProvider, this.presentationFactory,
				this.jsBookkeeper, this.recordTypeProvider, this.fixture);

		this.assertAjaxCallSpecIsCorrect = function(assert, ajaxCallSpy, recordType) {
			var ajaxCallSpec = ajaxCallSpy.getSpec();
			assert.strictEqual(ajaxCallSpec.url, "http://epc.ub.uu.se/cora/rest/record/"
					+ recordType + "/");
			assert.strictEqual(ajaxCallSpec.requestMethod, "POST");
			assert.strictEqual(ajaxCallSpec.accept, "application/uub+record+json");
			assert.strictEqual(ajaxCallSpec.contentType, "application/uub+record+json");
		}
		this.record = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "alvin"
						} ],
						"actionLinks" : {
							"read" : {
								"requestMethod" : "GET",
								"rel" : "read",
								"url" : "http://localhost:8080/therest/rest/record/system/alvin",
								"accept" : "application/uub+record+json"
							}
						},
						"name" : "dataDivider"
					}, {
						"name" : "id",
						"value" : "image:333759270435575"
					}, {
						"name" : "type",
						"value" : "image"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "fileName",
					"value" : "someFileName"
				}, {
					"name" : "fileSize",
					"value" : "1234567890"
				} ],
				"name" : "binary"
			},
			"actionLinks" : {
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://localhost:8080/therest/rest/record/image/"
							+ "image:333759270435575",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://localhost:8080/therest/rest/record/image/"
							+ "image:333759270435575",
					"accept" : "application/uub+record+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://localhost:8080/therest/rest/record/image/"
							+ "image:333759270435575"
				},
				"upload" : {
					"requestMethod" : "POST",
					"rel" : "upload",
					"contentType" : "multipart/form-data",
					"url" : "http://localhost:8080/therest/rest/record/image/"
							+ "image:333759270435575/upload",
					"accept" : "application/uub+record+json"
				}
			}

		};

		this.answerCall = function(attachedPChildRefHandler, no) {
			var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(no);
			var jsonRecord = JSON.stringify({
				"record" : this.record
			});
			var answer = {
				"spec" : ajaxCallSpy0.getSpec(),
				"responseText" : jsonRecord
			};
			ajaxCallSpy0.getSpec().loadMethod(answer);
		}

		this.data = {
			"name" : "binary",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "dataDivider",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "system"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemX"
					} ]
				} ]
			} ],
			"attributes" : {
				"type" : "image"
			}
		};
		this.data2 = {
			"name" : "binary",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "dataDivider",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "system"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemX"
					} ]
				} ]
			} ],
			"attributes" : {
				"type" : "image"
			}
		};
		this.data3 = {
			"name" : "binary",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "dataDivider",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "system"
					}, {
						"name" : "linkedRecordId",
						"value" : "systemX"
					} ]
				} ]
			} ],
			"attributes" : {
				"type" : "image"
			}
		};

		this.files1 = [];
		var file1 = {
			"name" : "someFile.tif",
			"size" : 1234567890
		};
		this.files1.push(file1);

		this.files1to3 = [];
		this.files1to3.push(file1);
		var file2 = {
			"name" : "someFile2.tif",
			"size" : 9876543210
		};
		this.files1to3.push(file2);
		var file3 = {
			"name" : "someFile3.tif",
			"size" : 1122334455
		};
		this.files1to3.push(file3);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === false);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	var childrenView = view.childNodes[0];
	assert.strictEqual(childrenView.className, "childrenView");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});

QUnit.test("testChildMoved", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	var moveDataFromPChildRefHandlerView = {
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	childRefHandler.childMoved(moveDataFromPChildRefHandlerView);

	assert.deepEqual(this.jsBookkeeper.getMoveDataArray()[0], moveData);
});

QUnit.test("testHandleMoveMessageAfter", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var pChildRefHandler = attachedPChildRefHandler.pChildRefHandler;

	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	pChildRefHandler.add("textVariableId", "one");
	pChildRefHandler.add("textVariableId", "two");

	var secondChild = childrenView.childNodes[1];

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	pChildRefHandler.handleMsg(moveData, "x/y/z/move");

	// order
	assert.strictEqual(childrenView.childNodes[0], secondChild);
});
QUnit.test("testHandleMoveMessageBefore", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var pChildRefHandler = attachedPChildRefHandler.pChildRefHandler;

	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	pChildRefHandler.add("textVariableId", "one");
	pChildRefHandler.add("textVariableId", "two");

	var secondChild = childrenView.childNodes[1];

	var moveData = {
		"path" : {},
		"metadataId" : "textVariableId",
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "before"
	};
	pChildRefHandler.handleMsg(moveData, "x/y/z/move");
	// order
	assert.strictEqual(childrenView.childNodes[1], secondChild);
});

QUnit.test("testInitRepeatingVariableNoOfChildren", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1toX", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === false);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 2);
	assert.strictEqual(view.childNodes[0].className, "childrenView");
	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === childRefHandler.sendAdd);

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);

	var secondSubscription = subscriptions[1];
	assert.strictEqual(secondSubscription.type, "move");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});

QUnit.test("testInitRepeatingStaticNoOfChildren", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat3to3", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === childRefHandler.handleMsg);
});

QUnit.test("testAddButtonFor1toX", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1toX", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === childRefHandler.sendAdd);

	button.onclick();
	var addData = {
		"childReference" : {
			"children" : [ {
				"attributes": {
					"type": "textVariable"
				},
				
				"name" : "ref",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					},
					{
						"name": "linkedRecordId",
						"value": "textVariableId"
					}
				]
			}, {
				"name" : "repeatMin",
				"value" : "1"
			}, {
				"name" : "repeatMax",
				"value" : "X"
			} ],
			"name" : "childReference",
			"repeatId" : "1"
		},
		"metadataId" : "textVariableId",
		"nameInData" : "textVariableId",
		"path" : {}
	};
	assert.deepEqual(this.jsBookkeeper.getAddDataArray()[0], addData);
});

QUnit.test("testAddButtonWithAttributes", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",
			"pgTextVarRepeat1to3InGroupOneAttribute");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === childRefHandler.sendAdd);

	button.onclick();
	var addData = {
		"attributes" : {
			"anAttribute" : [ "aFinalValue" ]
		},
		"childReference" : {
			"children" : [ {
				"attributes": {
					"type": "textVariable"
				},
				"name" : "ref",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataTextVariable"
					},
					{
						"name": "linkedRecordId",
						"value": "textVarRepeat1to3InGroupOneAttribute"
					}
				]
			}, {
				"name" : "repeatMin",
				"value" : "0"
			}, {
				"name" : "repeatMax",
				"value" : "2"
			} ],
			"name" : "childReference",
			"repeatId" : "1"
		},
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"path" : {}
	};
	assert.deepEqual(this.jsBookkeeper.getAddDataArray()[0], addData);
});

QUnit.test("testUploadButtonFor0toX", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.strictEqual(button.type, "file");

});

QUnit.test("testHandleFilesSendingOneFile", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "image");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, childRefHandler.processNewBinary);

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));
});

QUnit.test("testHandleFilesSendingOneBinaryFile", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneBinaryRecordLinkChild", "myBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "genericBinary");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, childRefHandler.processNewBinary);

	var data = JSON.parse(JSON.stringify(this.data));
	data.attributes.type = "genericBinary";
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
});

QUnit.test("testHandleFilesSendingOneFileError", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "image");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, childRefHandler.processNewBinary);

	ajaxCallSpy0.getSpec().errorMethod({
		"status" : 404
	});

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));
	assert.strictEqual(view.firstChild.lastChild.innerHTML, "404");
});

QUnit.test("testHandleFilesReceiveAnswerForOneFile", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	this.answerCall(attachedPChildRefHandler, 0);

	var addData = {
		"childReference" : {
			"children" : [ {
				"attributes": {
					"type": "recordLink"
				},
				"name" : "ref",
				"children": [
					{
						"name": "linkedRecordType",
						"value": "metadataRecordLink"
					},
					{
						"name": "linkedRecordId",
						"value": "myChildOfBinaryLink"
					}
				]
			}, {
				"name" : "repeatMin",
				"value" : "0"
			}, {
				"name" : "repeatMax",
				"value" : "X"
			} ],
			"name" : "childReference",
			"repeatId" : "one"
		},
		"metadataId" : "myChildOfBinaryLink",
		"nameInData" : "myChildOfBinaryLink",
		"path" : {}
	};
	assert.deepEqual(this.jsBookkeeper.getAddDataArray()[0], addData);

	var setValueData = {
		"data" : "image:333759270435575",
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "myChildOfBinaryLink"
			}, {
				"name" : "repeatId",
				"value" : "dummyRepeatId"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "linkedRecordId"
				} ]
			} ]
		}
	}
	assert.deepEqual(this.jsBookkeeper.getDataArray()[0], setValueData);

});

QUnit.test("testHandleFilesSavingMainRecordAfterReceiveAnswerForOneFile", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	this.answerCall(attachedPChildRefHandler, 0);

	var messages = attachedPChildRefHandler.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

	// send more files
	childRefHandler.handleFiles(this.files1);
	this.answerCall(attachedPChildRefHandler, 1);
	assert.deepEqual(messages.length, 2);
	assert.deepEqual(messages[0].type, "updateRecord");
	assert.deepEqual(messages[1].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreThanOneFile", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChild", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1to3);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	var ajaxCallSpy1 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(2);
	assert.strictEqual(ajaxCallSpy2.getSpec().data, JSON.stringify(this.data3));

	this.answerCall(attachedPChildRefHandler, 0);
	this.answerCall(attachedPChildRefHandler, 1);
	this.answerCall(attachedPChildRefHandler, 2);

	var messages = attachedPChildRefHandler.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

	var uploadManagerSpy = attachedPChildRefHandler.uploadManager;
	assert.ok(uploadManagerSpy.wasUploadCalled());

	var uploadSpecs = uploadManagerSpy.uploadSpecs;
	var uploadSpec1 = uploadSpecs[0];
	var expectedUploadSpec1 = {
		"file" : {
			"name" : "someFile.tif",
			"size" : 1234567890
		},
		"uploadLink" : {
			"accept" : "application/uub+record+json",
			"contentType" : "multipart/form-data",
			"rel" : "upload",
			"requestMethod" : "POST",
			"url" : "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec1, expectedUploadSpec1);

	var uploadSpec2 = uploadSpecs[1];
	var expectedUploadSpec2 = {
		"file" : {
			"name" : "someFile2.tif",
			"size" : 9876543210
		},
		"uploadLink" : {
			"accept" : "application/uub+record+json",
			"contentType" : "multipart/form-data",
			"rel" : "upload",
			"requestMethod" : "POST",
			"url" : "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec2, expectedUploadSpec2);

	var uploadSpec3 = uploadSpecs[2];
	var expectedUploadSpec3 = {
		"file" : {
			"name" : "someFile3.tif",
			"size" : 1122334455
		},
		"uploadLink" : {
			"accept" : "application/uub+record+json",
			"contentType" : "multipart/form-data",
			"rel" : "upload",
			"requestMethod" : "POST",
			"url" : "http://localhost:8080/therest/rest/record/image/image:333759270435575/upload"
		}
	};
	assert.deepEqual(uploadSpec3, expectedUploadSpec3);

});

QUnit.test("testHandleFilesSendingMoreFilesThanAllowed", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChildRepeatMax2", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1to3);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	var ajaxCallSpy1 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

	this.answerCall(attachedPChildRefHandler, 0);
	this.answerCall(attachedPChildRefHandler, 1);

	var messages = attachedPChildRefHandler.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreFilesThanAllowedDifferentRequest", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneChildOfBinaryRecordLinkChildRepeatMax2", "myChildOfBinaryPLink");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	childRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	childRefHandler.handleMsg({
		"metadataId" : "myChildOfBinaryLink"
	}, "x/y/z/add");

	var files2 = [];
	var file2 = {
		"name" : "someFile2.tif",
		"size" : 9876543210
	};
	files2.push(file2);
	var file3 = {
		"name" : "someFile3.tif",
		"size" : 1122334455
	};
	files2.push(file3);
	childRefHandler.handleFiles(files2);

	var ajaxCallSpy1 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = attachedPChildRefHandler.ajaxCallFactorySpy.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

});

QUnit.test("testAddButtonShownFor0to1", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat0to1", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;
	var view = attachedPChildRefHandler.view;

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.visible(button, "button should be visible");

});

QUnit.test("testAddOneChild", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), path);
	assert.deepEqual(this.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithRepeatId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), path);
	assert.deepEqual(this.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithOneLevelPath", function(assert) {
	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor(path,
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId");

	assert.strictEqual(childrenView.childNodes.length, 1);
	var childPath = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), childPath);
	assert.deepEqual(this.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithTwoLevelPath", function(assert) {
	var path = {
		"children" : [ {
			"name" : "nameInData1",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData2",
				"value" : "textVariableId"
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor(path,
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId");

	assert.strictEqual(childrenView.childNodes.length, 1);
	var childPath = {
		"children" : [ {
			"name" : "nameInData1",
			"value" : "textVariableId"
		}, {
			"children" : [ {
				"name" : "nameInData2",
				"value" : "textVariableId"
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVariableId"
				} ]
			} ],
			"name" : "linkedPath"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.presentationFactory.getPath(), childPath);
	assert.deepEqual(this.presentationFactory.getMetadataIds()[0], "textVariableId");
});
// groupInGroupOneTextChild
// groupIdOneTextChildTwoAttributes
// use this to make sure path contains attributes...

QUnit.test("testAddChildWithAttributesInPath", function(assert) {
	var fixture = document.getElementById("qunit-fixture");
	var metadataProvider = new MetadataProviderStub();
	var pubSub = CORATEST.pubSubSpy();
	var textProvider = CORATEST.textProviderStub();
	var recordTypeProvider = CORATEST.recordTypeProviderStub();

	var specPresentationFactory = {
		"metadataProvider" : metadataProvider,
		"pubSub" : pubSub,
		"textProvider" : textProvider,
		"jsBookkeeper" : jsBookkeeper
	};
	var presentationFactory = CORA.presentationFactory(specPresentationFactory);
	var jsBookkeeper = CORATEST.jsBookkeeperSpy();

	var attachedPChildRefHandlerFactory = CORATEST.attachedPChildRefHandlerFactory(
			metadataProvider, pubSub, textProvider, presentationFactory, jsBookkeeper,
			recordTypeProvider, fixture);

	var path = {};
	var attachedPChildRefHandler = attachedPChildRefHandlerFactory.factor(path,
			"textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
			"pgTextVarRepeat1to3InGroupOtherAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVarRepeat1to3InGroupOtherAttribute", "one");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factoredSpec = pRepeatingElementFactory.getSpec(0);
	//TODO: better test of spec
	assert.strictEqual(factoredSpec.repeatMin, "0");
	assert.strictEqual(factoredSpec.repeatMax, "2");
	assert.stringifyEqual(factoredSpec.path,  {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVarRepeat1to3InGroupOneAttribute"
		}, {
			"name" : "repeatId",
			"value" : "one"
		}, {
			"name" : "attributes",
			"children" : [ {
				"name" : "attribute",
				"repeatId" : "1",
				"children" : [ {
					"name" : "attributeName",
					"value" : "anOtherAttribute"
				}, {
					"name" : "attributeValue",
					"value" : "aOtherFinalValue"
				} ]
			} ]
		} ]
	});
	
	
//	var variableView = childrenView.firstChild.firstChild;
//	assert.strictEqual(variableView.className,
//			"pGroup pgTextVarRepeat1to3InGroupOtherAttribute maximized");
//
//	// subscription
//	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
//	assert.deepEqual(subscriptions.length, 5);
//
//	var firstSubsription = subscriptions[2];
//	assert.strictEqual(firstSubsription.type, "add");
//	var childPath = {
//		"name" : "linkedPath",
//		"children" : [ {
//			"name" : "nameInData",
//			"value" : "textVarRepeat1to3InGroupOneAttribute"
//		}, {
//			"name" : "repeatId",
//			"value" : "one"
//		}, {
//			"name" : "attributes",
//			"children" : [ {
//				"name" : "attribute",
//				"repeatId" : "1",
//				"children" : [ {
//					"name" : "attributeName",
//					"value" : "anOtherAttribute"
//				}, {
//					"name" : "attributeValue",
//					"value" : "aOtherFinalValue"
//				} ]
//			} ]
//		} ]
//	};
//	assert.deepEqual(firstSubsription.path, childPath);
//	var secondSubsription = subscriptions[4];
//	assert.strictEqual(secondSubsription.type, "remove");
//	assert.stringifyEqual(secondSubsription.path, childPath);

});

// groupIdOneTextChildRepeat1to3
// pgGroupIdOneTextTwoTextChildrenRepeat1to3
QUnit.test("testRepeatingElement", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factoredSpec = pRepeatingElementFactory.getSpec(0);
	//TODO: better test of spec
	assert.strictEqual(factoredSpec.repeatMin, "1");
	assert.strictEqual(factoredSpec.repeatMax, "3");
	assert.stringifyEqual(factoredSpec.path,  {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	});
	// remove button
//	var repeatingElement = childrenView.childNodes[0];
//	assert.strictEqual(repeatingElement.className, "repeatingElement");
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	assert.strictEqual(repeatingButtonView.className, "buttonView");
//	var removeButton = repeatingButtonView.firstChild;
//	assert.strictEqual(removeButton.className, "removeButton");

	// subscription
	var subscriptions = attachedPChildRefHandler.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	var firstSubsription = subscriptions[2];
	assert.strictEqual(firstSubsription.type, "remove");
//	assert.strictEqual(factoredSpec.handleMove, true);
//	assert.strictEqual(factoredSpec.handleRemove, false);
	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(firstSubsription.path, path);

});
//QUnit.test("testRepeatingElementRemoveButton", function(assert) {
//	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
//			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
//	var view = attachedPChildRefHandler.view;
//	var childrenView = view.firstChild;
//	assert.strictEqual(childrenView.childNodes.length, 0);
//
//	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
//
//	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
//	var factoredSpec = pRepeatingElementFactory.getSpec(0);
//	//TODO: better test of spec
//	assert.strictEqual(factoredSpec.repeatMin, "1");
//	assert.strictEqual(factoredSpec.repeatMax, "3");
//	
//	
//	// remove button
//	var repeatingElement = childrenView.childNodes[0];
//	assert.strictEqual(repeatingElement.className, "repeatingElement");
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	assert.strictEqual(repeatingButtonView.className, "buttonView");
//	var removeButton = repeatingButtonView.firstChild;
//	assert.strictEqual(removeButton.className, "removeButton");
//
//	var event = document.createEvent('Event');
//	removeButton.onclick(event);
//	// subscription
//	var removes = attachedPChildRefHandler.jsBookkeeper.getRemoveDataArray();
//	assert.deepEqual(removes.length, 1);
//
//	var firstRemove = removes[0];
//	assert.strictEqual(firstRemove.type, "remove");
//	var path = {
//		"children" : [ {
//			"name" : "nameInData",
//			"value" : "textVariableId"
//		}, {
//			"name" : "repeatId",
//			"value" : "one"
//		} ],
//		"name" : "linkedPath"
//	};
//	assert.deepEqual(firstRemove.path, path);
//
//});
QUnit.test("testRepeatingElementStaticNoOfChildrenNoAddButton", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat3to3", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);
	assert.ok(childRefHandler.isStaticNoOfChildren === true);

	var view = attachedPChildRefHandler.view;
	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === childRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factoredSpec = pRepeatingElementFactory.getSpec(0);
	//TODO: better test of spec
	assert.strictEqual(factoredSpec.repeatMin, "3");
	assert.strictEqual(factoredSpec.repeatMax, "3");
	assert.strictEqual(factoredSpec.isRepeating, true);
//	assert.strictEqual(factoredSpec.handleMove, true);
//	assert.strictEqual(factoredSpec.handleRemove, false);
	
	assert.stringifyEqual(factoredSpec.path,  {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		}, {
			"name" : "repeatId",
			"value" : "one"
		} ]
	});
//	// remove button
//	var repeatingElement = childrenView.childNodes[0];
//	assert.strictEqual(repeatingElement.className, "repeatingElement");
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	assert.strictEqual(repeatingButtonView.className, "buttonView");
//	assert.strictEqual(repeatingButtonView.childNodes.length, 1);
//
//	assert.strictEqual(repeatingButtonView.childNodes[0].className, "dragButton");

});

QUnit.test("testDragButtonHidden", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var childRefHandler = attachedPChildRefHandler.pChildRefHandler;

	assert.ok(childRefHandler.isRepeating === true);

	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideDragButtonCalled(), 1);
	assert.strictEqual(factored.getShowDragButtonCalled(), 0);

//	// no buttons
//	var repeatingElement = childrenView.childNodes[0];
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	assert.strictEqual(repeatingButtonView.className, "buttonView");
//	var buttonChildren = repeatingButtonView.childNodes;
//	assert.strictEqual(buttonChildren.length, 2);
//
//	assert.strictEqual(buttonChildren[0].className, "removeButton");
//	assert.strictEqual(buttonChildren[1].className, "dragButton");
//	assert.notVisible(buttonChildren[1], "dragButton should be hidden");

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "two");
//	assert.visible(buttonChildren[1], "dragButton should be visible");
	assert.strictEqual(factored.getHideDragButtonCalled(), 1);
	assert.strictEqual(factored.getShowDragButtonCalled(), 1);

});

QUnit.test("testHideAddButtonWhenMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "two");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");
});

QUnit.test("testShowAddButtonWhenBelowMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "two");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function in pChildRefHandler
	attachedPChildRefHandler.pubSub.getSubscriptions()[2].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideAddButtonWhenAtMaxRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "two");
	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function
	attachedPChildRefHandler.pubSub.getSubscriptions()[2].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideRemoveButtonWhenAtMinRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat1to3", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 0);

	// remove button
//	var repeatingElement = childrenView.childNodes[0];
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	var removeButton = repeatingButtonView.firstChild;
//
//	assert.notVisible(removeButton, "removeButton should be hidden");

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 1);
//	assert.visible(removeButton, "removeButton should be visible");
	// remove button
	var factored2 = pRepeatingElementFactory.getFactored(1);
	assert.strictEqual(factored2.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(factored2.getShowRemoveButtonCalled(), 1);
//	var repeatingElement2 = childrenView.childNodes[1];
//	var repeatingButtonView2 = repeatingElement2.childNodes[1];
//	var removeButton2 = repeatingButtonView2.firstChild;
//	assert.visible(removeButton2, "removeButton should be visible");

	// call remove function in pChildRefHandler
	var firstChildRemoveSubscription = attachedPChildRefHandler.pubSub.getSubscriptions()[2];
	firstChildRemoveSubscription.functionToCall();
	assert.strictEqual(factored2.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored2.getShowRemoveButtonCalled(), 1);
//	assert.strictEqual(childrenView.childNodes.length, 1);
//	assert.notVisible(removeButton2, "removeButton should be hidden");

});

QUnit.test("testShownRemoveButtonWhenAboveMinRepeat", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChildRepeat0to1", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.add("textVariableId", "one");
	var pRepeatingElementFactory = attachedPChildRefHandler.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 1);
//	// remove button
//	var repeatingElement = childrenView.childNodes[0];
//	var repeatingButtonView = repeatingElement.childNodes[1];
//	var removeButton = repeatingButtonView.firstChild;
//
//	assert.visible(removeButton, "removeButton should be visible");
});

QUnit.test("testHandleMessageRightMetadataId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVariableId"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageMatchingNameInDataAndAttribute", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"textVarRepeat1to3InGroupParentAttribute1toXInGroup",
			"pgTextVarRepeat1to3InGroupParentAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"attributes" : {
			"recordTypeTypeCollectionVar" : [ "aFinalValue" ]
		}
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageMatchingNameInDataAndMoreGenericAttributeDefinition",
		function(assert) {
			// aFinalValue
			// aOtherFinalValue
			var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
					"textVarRepeat1to3InGroupParentAttribute1toXInGroup",
					"pgTextVarRepeat1to3InGroupParentAttribute");
			var view = attachedPChildRefHandler.view;
			var childrenView = view.firstChild;
			assert.strictEqual(childrenView.childNodes.length, 0);

			attachedPChildRefHandler.pChildRefHandler.handleMsg({
				"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
				"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
				"attributes" : {
					// "recordTypeTypeCollectionVar" : [ "aFinalValue" ]
					"recordTypeTypeCollectionVar" : [ "aOtherFinalValue" ]
				}
			}, "x/y/z/add");

			assert.strictEqual(childrenView.childNodes.length, 1);
		});

QUnit.test("testHandleMessageMatchingNameInDataWrongAttribute", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"textVarRepeat1to3InGroupParentAttribute1toXInGroup",
			"pgTextVarRepeat1to3InGroupParentAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"attributes" : {
			"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
		}
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttribute", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"textVarRepeat1to3InGroupParentAttribute1toXInGroup",
			"pgTextVarRepeat1to3InGroupParentAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"attributes" : {}
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataMissingAttribute", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"textVarRepeat1to3InGroupParentAttribute1toXInGroup",
			"pgTextVarRepeat1to3InGroupParentAttribute");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttributeInMetadata", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		// textVarRepeat1to3InGroupOneAttribute (existing metadataId but not the
		// one used here)
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVariableId"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageNotRightMetadataId", function(assert) {
	var attachedPChildRefHandler = this.attachedPChildRefHandlerFactory.factor({},
			"groupIdOneTextChild", "pVarTextVariableId");
	var view = attachedPChildRefHandler.view;
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	attachedPChildRefHandler.pChildRefHandler.handleMsg({
		"metadataId" : "textVariableIdNOT"
	});

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testWithMinimized", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("groupIdOneTextChild"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("pVarTextVariableId"));
	var cPresentationMinimized = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));
	var pRepeatingElementFactory = CORATEST.pRepeatingElementFactorySpy();
	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"cPresentationMinimized" : cPresentationMinimized,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper,
		"pRepeatingElementFactory":pRepeatingElementFactory
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var factored = pRepeatingElementFactory.getFactored(0);
	assert.ok(factored.getPresentationMinimized() !== undefined);
	assert.strictEqual(factored.getMinimizedDefault(), undefined);
	
//	// minimizedPresentation
//	var repeatingElement = childrenView.childNodes[0];
//	assert.strictEqual(repeatingElement.childNodes.length, 3);
//
//	var repeatingButtonView = repeatingElement.childNodes[2];
//	assert.visible(repeatingButtonView, "repeatingButtonView should be visible");
//
//	var maximizeButton = repeatingButtonView.childNodes[0];
//	assert.strictEqual(maximizeButton.className, "maximizeButton");
//	assert.notVisible(maximizeButton, "maximizeButton should be hidden");
//
//	var minimizeButton = repeatingButtonView.childNodes[1];
//	assert.strictEqual(minimizeButton.className, "minimizeButton");
//	assert.visible(minimizeButton, "minimizeButton should be visible");
//
//	assert.deepEqual(this.presentationFactory.getMetadataIds()[0], "textVariableId");
//	assert.deepEqual(this.presentationFactory.getMetadataIds()[1], "textVariableId");
//	assert.deepEqual(this.presentationFactory.getMetadataIds().length, 2);
});

QUnit.test("testWithMinimizedDefault", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("groupIdOneTextChild"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("pVarTextVariableId"));
	var cPresentationMinimized = CORA.coraData(metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));

	var pRepeatingElementFactory = CORATEST.pRepeatingElementFactorySpy();
	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"cPresentationMinimized" : cPresentationMinimized,
		"minimizedDefault" : "true",
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper,
		"pRepeatingElementFactory":pRepeatingElementFactory
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(childrenView.childNodes.length, 1);


	var factored = pRepeatingElementFactory.getFactored(0);
	assert.ok(factored.getPresentationMinimized() !== undefined);
	assert.strictEqual(factored.getMinimizedDefault(), "true");
//	// minimizedPresentation
//	var repeatingElement = childrenView.childNodes[0];
//	assert.strictEqual(repeatingElement.childNodes.length, 3);
//
//	var repeatingButtonView = repeatingElement.childNodes[2];
//	var minimizeButton = repeatingButtonView.childNodes[1];
//	assert.strictEqual(minimizeButton.className, "minimizeButton");
//	assert.notVisible(minimizeButton, "minimizeButton should be hidden");
});

QUnit.test("testPresentationMatchingNameInData", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("presentationVarGroup"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("recordInfoPGroup"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	assert.strictEqual(view.className, "pChildRefHandler recordInfoPGroup");
});

QUnit.test("testPresentationMatchingNameInDataAndAttributes", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarAttributeGroup"));
	var cPresentation = CORA
			.coraData(metadataProvider.getMetadataById("recordInfoAttributePGroup"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.strictEqual(view.className, "pChildRefHandler recordInfoAttributePGroup");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider
			.getMetadataById("presentationVarAttributeGroup"));
	var cPresentation = CORA.coraData(metadataProvider.getMetadataById("recordInfoPGroup"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};

	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfo");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes2", function(assert) {
	var metadataProvider = this.metadataProvider;
	var cParentMetadata = CORA.coraData(metadataProvider.getMetadataById("presentationVarGroup"));
	var cPresentation = CORA
			.coraData(metadataProvider.getMetadataById("recordInfoAttributePGroup"));

	var spec = {
		"parentPath" : {},
		"cParentMetadata" : cParentMetadata,
		"cPresentation" : cPresentation,
		"metadataProvider" : metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider,
		"presentationFactory" : this.presentationFactory,
		"jsBookkeeper" : this.jsBookkeeper
	};
	var pChildRefHandler = CORA.pChildRefHandler(spec);
	var view = pChildRefHandler.getView();
	assert.strictEqual(view.className,
			"fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfoAttribute");
});
