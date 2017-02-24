/*
 * Copyright 2016 Uppsala University Library
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
QUnit.module("pChildRefHandlerTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		
		this.metadataProvider = new MetadataProviderStub();
		this.dependencies = {
				"metadataProvider" : this.metadataProvider,
				"pubSub" : CORATEST.pubSubSpy(),
				"textProvider" : CORATEST.textProviderStub(),
				"presentationFactory" : CORATEST.presentationFactorySpy(),
				"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
				"recordTypeProvider" :  CORATEST.recordTypeProviderStub(),
				"uploadManager" : CORATEST.uploadManagerSpy(),
				"ajaxCallFactory" : CORATEST.ajaxCallFactorySpy(),
				"pRepeatingElementFactory" : CORATEST.pRepeatingElementFactorySpy()
		};
		this.spec = {
			"parentPath" : {},
			"cParentMetadata" : CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChild")),
			"cPresentation" : CORA.coraData(this.metadataProvider.getMetadataById("pVarTextVariableId")),
			"cPresentationMinimized" : CORA.coraData(this.metadataProvider
					.getMetadataById("pVarTextVariableIdOutput"))
		};
		
		
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
		this.answerCall2 = function(ajaxCallFactory, no) {
			var ajaxCallSpy0 = ajaxCallFactory.getFactored(no);
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
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	var childrenView = view.firstChild;
	
	assert.ok(pChildRefHandler.isRepeating === false);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === pChildRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	var childrenView = view.childNodes[0];
	assert.strictEqual(childrenView.className, "childrenView");

	// subscription
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);
});

QUnit.test("testChildMoved", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
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
	pChildRefHandler.childMoved(moveDataFromPChildRefHandlerView);

	assert.deepEqual(this.dependencies.jsBookkeeper.getMoveDataArray()[0], moveData);
});

QUnit.test("testHandleMoveMessageAfter", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
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
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

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
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1toX"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === false);

	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === pChildRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 2);
	assert.strictEqual(view.childNodes[0].className, "childrenView");
	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === pChildRefHandler.sendAdd);

	// subscription
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);

	var secondSubscription = subscriptions[1];
	assert.strictEqual(secondSubscription.type, "move");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);
});

QUnit.test("testInitRepeatingStaticNoOfChildren", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat3to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === pChildRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	// subscription
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 2);

	var firstSubsription = subscriptions[0];
	assert.strictEqual(firstSubsription.type, "add");
	assert.deepEqual(firstSubsription.path, {});
	assert.ok(firstSubsription.functionToCall === pChildRefHandler.handleMsg);
});

QUnit.test("testAddButtonFor1toX", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1toX"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === pChildRefHandler.sendAdd);

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
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], addData);
});

QUnit.test("testAddButtonWithAttributes", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupOneAttribute"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.ok(button.onclick === pChildRefHandler.sendAdd);

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
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], addData);
});

QUnit.test("testUploadButtonFor0toX", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.strictEqual(button.type, "file");
});

QUnit.test("testHandleFilesSendingOneFile", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "image");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));
});

QUnit.test("testHandleFilesSendingOneBinaryFile", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "genericBinary");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

	var data = JSON.parse(JSON.stringify(this.data));
	data.attributes.type = "genericBinary";
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(data));
});

QUnit.test("testHandleFilesSendingOneFileError", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	this.assertAjaxCallSpecIsCorrect(assert, ajaxCallSpy0, "image");

	assert.strictEqual(ajaxCallSpy0.getSpec().loadMethod, pChildRefHandler.processNewBinary);

	ajaxCallSpy0.getSpec().errorMethod({
		"status" : 404
	});

	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));
	assert.strictEqual(view.firstChild.lastChild.innerHTML, "404");
});

QUnit.test("testHandleFilesReceiveAnswerForOneFile", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);

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
	assert.deepEqual(this.dependencies.jsBookkeeper.getAddDataArray()[0], addData);

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
	assert.deepEqual(this.dependencies.jsBookkeeper.getDataArray()[0], setValueData);

});

QUnit.test("testHandleFilesSavingMainRecordAfterReceiveAnswerForOneFile", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);

	var messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

	// send more files
	pChildRefHandler.handleFiles(this.files1);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);
	assert.deepEqual(messages.length, 2);
	assert.deepEqual(messages[0].type, "updateRecord");
	assert.deepEqual(messages[1].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreThanOneFile", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChild"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1to3);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	var ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2.getSpec().data, JSON.stringify(this.data3));

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);
	this.answerCall2(this.dependencies.ajaxCallFactory, 2);

	var messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

	var uploadManagerSpy = this.dependencies.uploadManager;
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
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1to3);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	var ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

	this.answerCall2(this.dependencies.ajaxCallFactory, 0);
	this.answerCall2(this.dependencies.ajaxCallFactory, 1);

	var messages = this.dependencies.pubSub.getMessages();
	assert.deepEqual(messages.length, 1);
	assert.deepEqual(messages[0].type, "updateRecord");

});

QUnit.test("testHandleFilesSendingMoreFilesThanAllowedDifferentRequest", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneChildOfBinaryRecordLinkChildRepeatMax2"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("myChildOfBinaryPLink"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	pChildRefHandler.handleFiles(this.files1);

	var ajaxCallSpy0 = this.dependencies.ajaxCallFactory.getFactored(0);
	assert.strictEqual(ajaxCallSpy0.getSpec().data, JSON.stringify(this.data));

	pChildRefHandler.handleMsg({
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
	pChildRefHandler.handleFiles(files2);

	var ajaxCallSpy1 = this.dependencies.ajaxCallFactory.getFactored(1);
	assert.strictEqual(ajaxCallSpy1.getSpec().data, JSON.stringify(this.data2));

	var ajaxCallSpy2 = this.dependencies.ajaxCallFactory.getFactored(2);
	assert.strictEqual(ajaxCallSpy2, undefined);

});

QUnit.test("testAddButtonShownFor0to1", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat0to1"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	var button = buttonView.firstChild;
	assert.visible(button, "button should be visible");

});

QUnit.test("testAddOneChild", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var path = {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	assert.deepEqual(this.dependencies.presentationFactory.getPath(), path);
	assert.deepEqual(this.dependencies.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithRepeatId", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");

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
	assert.deepEqual(this.dependencies.presentationFactory.getPath(), path);
	assert.deepEqual(this.dependencies.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithOneLevelPath", function(assert) {
	this.spec.parentPath =  {
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ],
		"name" : "linkedPath"
	};
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId");

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
	assert.deepEqual(this.dependencies.presentationFactory.getPath(), childPath);
	assert.deepEqual(this.dependencies.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddOneChildWithTwoLevelPath", function(assert) {
	this.spec.parentPath  = {
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
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId");

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
	assert.deepEqual(this.dependencies.presentationFactory.getPath(), childPath);
	assert.deepEqual(this.dependencies.presentationFactory.getMetadataIds()[0], "textVariableId");
});

QUnit.test("testAddChildWithAttributesInPath", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupOtherAttribute"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVarRepeat1to3InGroupOtherAttribute", "one");

	assert.strictEqual(childrenView.childNodes.length, 1);

	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	var factoredSpec = this.dependencies.pRepeatingElementFactory.getSpec(0);
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

});

QUnit.test("testRepeatingElement", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	this.spec.textStyle = "textStyleTest";
	this.spec.childStyle = "childStyleTest";
	this.spec.textStyleMinimized = "textStyleMinimizedTest";
	this.spec.childStyleMinimized = "childStyleMinimizedTest";
	
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	var factoredSpec = pRepeatingElementFactory.getSpec(0);
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
	//TODO: better test of spec 
//	assert.strictEqual(factoredSpec.parentModelObject, view.modelObject);
	assert.strictEqual(factoredSpec.isRepeating, true);
	assert.strictEqual(factoredSpec.textStyle, this.spec.textStyle);
	assert.strictEqual(factoredSpec.childStyle, this.spec.childStyle);
	assert.strictEqual(factoredSpec.textStyleMinimized, this.spec.textStyleMinimized);
	assert.strictEqual(factoredSpec.childStyleMinimized, this.spec.childStyleMinimized);

	// subscription
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 3);

	var firstSubsription = subscriptions[2];
	assert.strictEqual(firstSubsription.type, "remove");
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
QUnit.test("testRepeatingElementStaticNoOfChildrenNoAddButton", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat3to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);


	assert.ok(pChildRefHandler.isRepeating === true);
	assert.ok(pChildRefHandler.isStaticNoOfChildren === true);

	assert.deepEqual(view.className, "pChildRefHandler pVarTextVariableId");
	assert.deepEqual(view.nodeName, "SPAN");
	assert.ok(view.modelObject === pChildRefHandler,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 1);
	assert.strictEqual(view.childNodes[0].className, "childrenView");

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
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
});

QUnit.test("testDragButtonHidden", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	assert.ok(pChildRefHandler.isRepeating === true);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");

	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideDragButtonCalled(), 1);
	assert.strictEqual(factored.getShowDragButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factored.getHideDragButtonCalled(), 1);
	assert.strictEqual(factored.getShowDragButtonCalled(), 1);

});

QUnit.test("testHideAddButtonWhenMaxRepeat", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	pChildRefHandler.add("textVariableId", "one");
	pChildRefHandler.add("textVariableId", "two");
	pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");
});

QUnit.test("testShowAddButtonWhenBelowMaxRepeat", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	pChildRefHandler.add("textVariableId", "one");
	pChildRefHandler.add("textVariableId", "two");
	pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function in pChildRefHandler
	this.dependencies.pubSub.getSubscriptions()[2].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideAddButtonWhenAtMaxRepeat", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	var buttonView = view.childNodes[1];
	assert.visible(buttonView, "buttonView should be visible");

	pChildRefHandler.add("textVariableId", "one");
	pChildRefHandler.add("textVariableId", "two");
	pChildRefHandler.add("textVariableId", "three");

	assert.strictEqual(childrenView.childNodes.length, 3);
	assert.notVisible(buttonView, "buttonView should be hidden");

	// call remove function
	this.dependencies.pubSub.getSubscriptions()[2].functionToCall();
	assert.strictEqual(childrenView.childNodes.length, 2);
	assert.visible(buttonView, "buttonView should be visible");
});

QUnit.test("testHideRemoveButtonWhenAtMinRepeat", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat1to3"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 0);

	pChildRefHandler.add("textVariableId", "two");
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 1);

	var factored2 = pRepeatingElementFactory.getFactored(1);
	assert.strictEqual(factored2.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(factored2.getShowRemoveButtonCalled(), 1);

	// call remove function in pChildRefHandler
	var firstChildRemoveSubscription = this.dependencies.pubSub.getSubscriptions()[2];
	firstChildRemoveSubscription.functionToCall();
	assert.strictEqual(factored2.getHideRemoveButtonCalled(), 1);
	assert.strictEqual(factored2.getShowRemoveButtonCalled(), 1);
});

QUnit.test("testShownRemoveButtonWhenAboveMinRepeat", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("groupIdOneTextChildRepeat0to1"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	var pRepeatingElementFactory = this.dependencies.pRepeatingElementFactory;
	var factored = pRepeatingElementFactory.getFactored(0);
	assert.strictEqual(factored.getHideRemoveButtonCalled(), 0);
	assert.strictEqual(factored.getShowRemoveButtonCalled(), 1);
});

QUnit.test("testHandleMessageRightMetadataId", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		"metadataId" : "textVariableId"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageMatchingNameInDataAndAttribute", function(assert) {
	this.spec.cParentMetadata= 
	CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
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
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
		
			var childrenView = view.firstChild;
			assert.strictEqual(childrenView.childNodes.length, 0);

			pChildRefHandler.handleMsg({
				"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
				"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
				"attributes" : {
					"recordTypeTypeCollectionVar" : [ "aOtherFinalValue" ]
				}
			}, "x/y/z/add");

			assert.strictEqual(childrenView.childNodes.length, 1);
		});

QUnit.test("testHandleMessageMatchingNameInDataWrongAttribute", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"attributes" : {
			"recordTypeTypeCollectionVarNOT" : [ "aFinalValue" ]
		}
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttribute", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute",
		"attributes" : {}
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataMissingAttribute", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("textVarRepeat1to3InGroupParentAttribute1toXInGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("pgTextVarRepeat1to3InGroupParentAttribute"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVarRepeat1to3InGroupOneAttribute"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testHandleMessageMatchingNameInDataNoAttributeInMetadata", function(assert) {
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		// textVarRepeat1to3InGroupOneAttribute (existing metadataId but not the
		// one used here)
		"metadataId" : "textVarRepeat1to3InGroupOneAttribute",
		"nameInData" : "textVariableId"
	}, "x/y/z/add");

	assert.strictEqual(childrenView.childNodes.length, 1);
});

QUnit.test("testHandleMessageNotRightMetadataId", function(assert) {
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.handleMsg({
		"metadataId" : "textVariableIdNOT"
	});

	assert.strictEqual(childrenView.childNodes.length, 0);
});

QUnit.test("testWithMinimized", function(assert) {
	this.spec.cPresentationMinimized= 
		CORA.coraData(this.metadataProvider.getMetadataById("pVarTextVariableIdOutput"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);

	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(childrenView.childNodes.length, 1);

	var factored = this.dependencies.pRepeatingElementFactory.getFactored(0);
	assert.ok(factored.getPresentationMinimized() !== undefined);
	assert.strictEqual(factored.getMinimizedDefault(), undefined);
});

QUnit.test("testWithMinimizedDefault", function(assert) {
	this.spec.cPresentationMinimized= 
		CORA.coraData(this.metadataProvider.getMetadataById("pVarTextVariableIdOutput"));
	this.spec.minimizedDefault = "true";
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
	var childrenView = view.firstChild;
	assert.strictEqual(childrenView.childNodes.length, 0);

	pChildRefHandler.add("textVariableId", "one");
	assert.strictEqual(childrenView.childNodes.length, 1);


	var factored = this.dependencies.pRepeatingElementFactory.getFactored(0);
	assert.ok(factored.getPresentationMinimized() !== undefined);
	assert.strictEqual(factored.getMinimizedDefault(), "true");
});

QUnit.test("testPresentationMatchingNameInData", function(assert) {
	this.spec.cParentMetadata= 
	CORA.coraData(this.metadataProvider.getMetadataById("presentationVarGroup"));
	this.spec.cPresentation= 
		CORA.coraData(this.metadataProvider.getMetadataById("recordInfoPGroup"));
	var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
	var view = pChildRefHandler.getView();
	this.fixture.appendChild(view);
	
	assert.strictEqual(view.className, "pChildRefHandler recordInfoPGroup");
});

QUnit.test("testPresentationMatchingNameInDataAndAttributes", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("presentationVarAttributeGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("recordInfoAttributePGroup"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
		
	this.fixture.appendChild(view);

	assert.strictEqual(view.className, "pChildRefHandler recordInfoAttributePGroup");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("presentationVarAttributeGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("recordInfoPGroup"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
		
	assert.strictEqual(view.className, "fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfo");
});

QUnit.test("testPresentationNonMatchingNameInDataAndAttributes2", function(assert) {
	this.spec.cParentMetadata= 
		CORA.coraData(this.metadataProvider.getMetadataById("presentationVarGroup"));
		this.spec.cPresentation= 
			CORA.coraData(this.metadataProvider.getMetadataById("recordInfoAttributePGroup"));
		var pChildRefHandler = CORA.pChildRefHandler(this.dependencies, this.spec);
		var view = pChildRefHandler.getView();
		this.fixture.appendChild(view);
		
	assert.strictEqual(view.className,
			"fakePChildRefHandlerViewAsNoMetadataExistsFor recordInfoAttribute");
});
