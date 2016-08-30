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
	coraTest.dependenciesFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function(metadataId, presentationId) {
			var specDataHolder = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var dataHolder = CORA.dataHolder(specDataHolder);
			var specJSBookkeeper = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"dataHolder" : dataHolder
			};
			var jsBookkeeper = CORA.jsBookkeeper(specJSBookkeeper);

			var specPresentationFactory = {
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper
			};
			var presentationFactory = CORA.presentationFactory(specPresentationFactory);

			var spec = {
				"presentationId" : presentationId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"presentationFactory" : presentationFactory
			};
			var presentation = CORA.presentation(spec);

			// // log all messages
			// pubSub.subscribe("*", {}, undefined, function(dataFromMsg, msg) {
			// console.log("msg: " + msg);
			// console.log("dataFromMsg: " + JSON.stringify(dataFromMsg));
			// });
			var specMetadataController = {
				"metadataId" : metadataId,
				"data" : undefined,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub
			};
			var metadataController = CORA.metadataController(specMetadataController);

			return Object.freeze({
				jsBookkeeper : jsBookkeeper,
				presentationFactory : presentationFactory,
				presentation : presentation,
				dataHolder : dataHolder,
				metadataController : metadataController
			});
		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("jsClientIntegrationTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORA.pubSub();
		this.textProvider = CORATEST.textProviderStub();

		this.dependenciesFactory = CORATEST.dependenciesFactory(this.metadataProvider, this.pubSub,
				this.textProvider);
	},
	afterEach : function() {
	}
});

QUnit.test("testIntegrateCoraPubSubPVar", function(assert) {
	var path = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "testVar"
		} ]
	};

	var cPVarPresentation = CORA.coraData(this.metadataProvider
			.getMetadataById("pVarTextVariableIdOutput"));
	var spec = {
		"path" : path,
		"cPresentation" : cPVarPresentation,
		"metadataProvider" : this.metadataProvider,
		"pubSub" : this.pubSub,
		"textProvider" : this.textProvider
	};
	var pVar = CORA.pVar(spec);
	var view = pVar.getView();
	this.fixture.appendChild(view);
	var valueView = view.firstChild;

	pVar.setValue("A Value");
	assert.equal(valueView.innerHTML, "A Value");

	var type = "setValue";
	var data = {
		"data" : "A new value",
		"path" : path
	};
	this.pubSub.publish(type, data);

	assert.equal(valueView.innerHTML, "A new value");
});

QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataController", function(assert) {
	var metadataId = "groupIdOneTextChild";
	var presentationId = "pgGroupIdOneTextChild";

	var dependencies = this.dependenciesFactory.factor(metadataId, presentationId);
	var presentation = dependencies.presentation;
	var dataHolder = dependencies.dataHolder;

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var pGroupView = view.firstChild;
	var childRefHandler = pGroupView.childNodes[1];

	var pVarView = childRefHandler.firstChild.firstChild.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId maximized");
	var input = pVarView.firstChild;
	assert.deepEqual(input.value, "");

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ]
	};
	var data2 = {
		"path" : path2,
		"data" : "a Value"
	};
	this.pubSub.publish("setValue", data2);
	assert.deepEqual(input.value, "a Value");

	assert.deepEqual(dataHolder.getData(), {
		"children" : [ {
			"name" : "textVariableId",
			"value" : "a Value"
		} ],
		"name" : "groupIdOneTextChild"
	});
});
QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataControllerTwoLevels", function(
		assert) {
	var metadataId = "groupInGroupOneTextChild";
	var presentationId = "pgGroupInGroupIdOneTextOneTextChild";

	var dependencies = this.dependenciesFactory.factor(metadataId, presentationId);
	var presentation = dependencies.presentation;
	var dataHolder = dependencies.dataHolder;

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var topPGroupView = view.childNodes[0];


	var childRefHandler1 = topPGroupView.childNodes[2];

	var pGroupView = childRefHandler1.childNodes[0].firstChild.firstChild;
	var childRefHandler2 = pGroupView.childNodes[2];

	var pVarView = childRefHandler2.firstChild.firstChild.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId maximized");
	var input = pVarView.firstChild;
	assert.deepEqual(input.value, "");

	var path2 = {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "groupIdOneTextChild"
		}, {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			} ]
		} ]
	};
	var data2 = {
		"path" : path2,
		"data" : "a Value one level down"
	};
	this.pubSub.publish("setValue", data2);
	assert.deepEqual(input.value, "a Value one level down");

	assert.deepEqual(dataHolder.getData(), {
		"children" : [ {
			"children" : [ {
				"name" : "textVariableId",
				"value" : "a Value one level down"
			} ],
			"name" : "groupIdOneTextChild"
		} ],
		"name" : "groupInGroupOneTextChild"
	});
});

QUnit.test("testIntegrateRepeatingContainer", function(assert) {
	var metadataId = "groupIdOneTextChildRepeat1to3";
	var presentationId = "pgGroupIdRepeatingContainerRepeat1to3";

	var dependencies = this.dependenciesFactory.factor(metadataId, presentationId);
	var presentation = dependencies.presentation;

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var topPGroupView = view.firstChild;
	var headline = topPGroupView.childNodes[1];
	assert.strictEqual(headline.textContent, "En rubrik");

	var repeatingContainer = topPGroupView.childNodes[2];
	assert.deepEqual(repeatingContainer.className, "pChildRefHandler pTextVariableIdRContainer");

	var childrenView = repeatingContainer.firstChild;
	var repeatingElement = childrenView.firstChild;
	var pVarView = repeatingElement.firstChild;
	assert.deepEqual(pVarView.className, "pRepeatingContainer pTextVariableIdRContainer maximized");
});

QUnit.test("testIntegrateCoraPubSubDataHolderPresentationMetadataControllerSurroundingC", function(
		assert) {
	var metadataId = "groupIdTwoTextChildRepeat1to5";
	var presentationId = "pgGroupIdTwoTextChildSurrounding2TextPGroup";

	var dependencies = this.dependenciesFactory.factor(metadataId, presentationId);
	var presentation = dependencies.presentation;

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var topPGroupView = view.firstChild;

	var surroundingContainer = topPGroupView.childNodes[1];

	var headline = surroundingContainer.childNodes[1];
	assert.strictEqual(headline.textContent, "En rubrik");

	var childRefHandler1 = surroundingContainer.childNodes[2];
	var childrenView = childRefHandler1.firstChild;
	var repeatingElement = childrenView.firstChild;
	var pVarView = repeatingElement.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId maximized");

	var childRefHandler2 = surroundingContainer.childNodes[3];
	var childrenView2 = childRefHandler2.firstChild;
	var repeatingElement2 = childrenView2.firstChild;
	var pVarView2 = repeatingElement2.firstChild;
	assert.deepEqual(pVarView2.className, "pVar pVarTextVariableId2 maximized");
});

QUnit.test("testIntegrateSurroundingContainerInSurroundingContainer", function(assert) {
	var metadataId = "groupIdTwoTextChildRepeat1to5";
	var presentationId = "pgGroupIdTwoTextChildSurrounding2TextPGroup2";

	var dependencies = this.dependenciesFactory.factor(metadataId, presentationId);
	var presentation = dependencies.presentation;

	var view = presentation.getView();
	this.fixture.appendChild(view);

	var topPGroupView = view.firstChild;
	var surroundingContainer = topPGroupView.childNodes[1];

	var headline = surroundingContainer.childNodes[1];
	assert.strictEqual(headline.textContent, "En rubrik");

	var surroundingContainerLevel2 = surroundingContainer.childNodes[2];
	var headline2 = surroundingContainerLevel2.childNodes[1];
	assert.strictEqual(headline2.textContent, "En rubrik");

	var childRefHandler1 = surroundingContainerLevel2.childNodes[2];
	var childrenView = childRefHandler1.firstChild;
	var repeatingElement = childrenView.firstChild;
	var pVarView = repeatingElement.firstChild;
	assert.deepEqual(pVarView.className, "pVar pVarTextVariableId maximized");

	var childRefHandler2 = surroundingContainerLevel2.childNodes[3];
	var childrenView2 = childRefHandler2.firstChild;
	var repeatingElement2 = childrenView2.firstChild;
	var pVarView2 = repeatingElement2.firstChild;
	assert.deepEqual(pVarView2.className, "pVar pVarTextVariableId2 maximized");
});
