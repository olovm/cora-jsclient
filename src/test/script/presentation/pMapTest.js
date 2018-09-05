/*
 * Copyright 2018 Uppsala University Library
 * Copyright 2018 Olov McKie
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
// var CORATEST = (function(coraTest) {
// "use strict";
// coraTest.attachedPSurroundingContainerFactory = function(metadataProvider, pubSub,
// textProvider, presentationFactory, jsBookkeeper, recordTypeProvider, fixture) {
// var factor = function(path, metadataIdUsedInData, pSurroundingContainerId,
// presentationParentId) {
// var cPSurroundingContainer = CORA.coraData(metadataProvider
// .getMetadataById(pSurroundingContainerId));
// var cParentPresentation = CORA.coraData(metadataProvider
// .getMetadataById(presentationParentId));
// var dependencies = {
// "metadataProvider" : metadataProvider,
// "pubSub" : pubSub,
// "textProvider" : textProvider,
// "presentationFactory" : presentationFactory,
// "jsBookkeeper" : jsBookkeeper,
// "recordTypeProvider" : recordTypeProvider,
// "pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
// "pNonRepeatingChildRefHandlerFactory" : CORATEST
// .standardFactorySpy("pNonRepeatingChildRefHandlerSpy")
// };
// var spec = {
// "metadataIdUsedInData" : metadataIdUsedInData,
// "path" : path,
// "cPresentation" : cPSurroundingContainer,
// "cParentPresentation" : cParentPresentation
// };
// var pMap = CORA.pMap(dependencies, spec);
// var view = pMap.getView();
// fixture.appendChild(view);
// var valueView = view.firstChild;
// return {
// pMap : pMap,
// fixture : fixture,
// valueView : valueView,
// metadataProvider : metadataProvider,
// pubSub : pubSub,
// textProvider : textProvider,
// jsBookkeeper : jsBookkeeper,
// view : view
// };
//
// };
// return Object.freeze({
// factor : factor
// });
// };
//
// return coraTest;
// }(CORATEST || {}));

QUnit.module("pMapTest.js", {
	beforeEach : function() {
		// this.getId = function(cData) {
		// var recordInfo = cData.getFirstChildByNameInData("recordInfo");
		// var id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		// return id;
		// }
		//
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			"metadataProvider" : new MetadataCoordinatesProviderStub(),
			"infoFactory" : CORATEST.infoFactorySpy(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderSpy(),
			"pMapViewFactory" : CORATEST.standardFactorySpy("pMapViewSpy"),
		// "presentationFactory" : CORATEST.standardFactorySpy("presentationSpy"),
		// "jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
		// "recordTypeProvider" : CORATEST.recordTypeProviderStub(),
		// "pChildRefHandlerFactory" : CORATEST.standardFactorySpy("pChildRefHandlerSpy"),
		// "pNonRepeatingChildRefHandlerFactory" : CORATEST
		// .standardFactorySpy("pNonRepeatingChildRefHandlerSpy")
		};
		this.spec = {
			"metadataIdUsedInData" : "coordinatesGroup",
			// "path" : {},
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("coordinatesPGroup")),
		// "cParentPresentation" : CORA.coraData(this.dependencies.metadataProvider
		// .getMetadataById("pgGroupIdTwoTextChildSurrounding2TextPGroup"))
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	assert.strictEqual(pMap.type, "pMap");

	var view = pMap.getView();
	this.fixture.appendChild(view);
	assert.strictEqual(view, this.dependencies.pMapViewFactory.getFactored(0).getView());
	// assert.deepEqual(view.className, "pMap " + "coordinatesPGroup");
	assert.ok(view.modelObject === pMap,
			"modelObject should be a pointer to the javascript object instance");
	// assert.strictEqual(view.childNodes.length, 4);
	//
	// assert.strictEqual(view.childNodes[1].textContent, "En rubrik");
	//
	// assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");
	//
	// var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	// assert.deepEqual(factoredSpec.parentPath, this.spec.path);
	//
	// assert.strictEqual(this.getId(factoredSpec.cParentMetadata),
	// "groupIdTwoTextChildRepeat1to5");
	// assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	// assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
	// "pgGroupIdTwoTextChildSurrounding2TextPGroup");
	// assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});

QUnit.test("testInitSubscribesToInitcompleteMessage", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	// var messages = this.dependencies.pubSub.getMessages();
	// assert.deepEqual(JSON.stringify(messages[0]), '{"type":"add","message":{'
	// + '"metadataId":"textVariableId","path":{},"nameInData":"textVariableId"}}');

	// assert.deepEqual(messages[0].type, "initComplete");
	// assert.equal(messages.length, 2);
	// assert.deepEqual(JSON.stringify(messages[1]),
	// '{"type":"initComplete","message":{"data":"","path":{}}}');
	// subscription
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

//	var firstSubsription = subscriptions[0];
//	assert.strictEqual(firstSubsription.type, "add");

//	var secondSubscription = subscriptions[1];
//	assert.strictEqual(secondSubscription.type, "move");

	var thirdSubscription = subscriptions[0];
	assert.strictEqual(thirdSubscription.type, "initComplete");
	assert.deepEqual(thirdSubscription.path, {});
	assert.strictEqual(thirdSubscription.functionToCall, pMap.initComplete);

	// unsubscription
//	var unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
//	assert.deepEqual(unsubscriptions.length, 0);
});

QUnit.test("testInitInfoInputMode", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var view = pMap.getView();
	this.fixture.appendChild(view);

	// var infoFactory = this.dependencies.infoFactory;
	// var firstFactoredInfo = infoFactory.getFactored(0);
	// var firstFactoredInfosButton = firstFactoredInfo.getButton();
	//
	// var infoButton = view.childNodes[0];
	// assert.equal(infoButton, firstFactoredInfosButton);

	// var expectedInfoSpec = {
	// "level1" : [ {
	// "className" : "textView",
	// "text" : "translated_coordinatesGroupText"
	// }, {
	// "className" : "defTextView",
	// "text" : "translated_coordinatesGroupDefText"
	// } ],
	// "level2" : [ {
	// "className" : "textIdView",
	// "text" : "textId: coordinatesGroupText"
	// }, {
	// "className" : "defTextIdView",
	// "text" : "defTextId: coordinatesGroupDefText"
	// }, {
	// "className" : "metadataIdView",
	// "text" : "metadataId: coordinatesGroup"
	// }, {
	// "className" : "technicalView",
	// "text" : "nameInData: coordinates"
	// }, {
	// "className" : "technicalView",
	// "text" : "presentationId: coordinatesPGroup"
	// } ],
	// "insertAfter" : infoButton
	// };
	// var spec = {
	// "appendTo" : this.fixture,
	// "level1" : [ {
	// "className" : "textView",
	// "text" : "someText"
	// }, {
	// "className" : "defTextView",
	// "text" : "someDefText"
	// } ],
	// "level2" : [ {
	// "className" : "metadataIdView",
	// "text" : "someMetadataText"
	// }, {
	// "className" : "regExView",
	// "text" : "someRegEx"
	// } ]
	// };
	// assert.stringifyEqual(firstFactoredInfo.getSpec(), expectedInfoSpec);
	var expectedSpec = {
		"mode" : "input",
		// "inputType" : getInputType(),
		// "outputFormat" : outputFormat,
		// "presentationId" : presentationId,
		"info" : {
			"text" : "translated_coordinatesGroupText",
			"defText" : "translated_coordinatesGroupDefText",
			"technicalInfo" : [ {
				"text" : "textId: coordinatesGroupText",
			// onclickMethod : openTextIdRecord
			}, {
				"text" : "defTextId: coordinatesGroupDefText",
			// onclickMethod : openDefTextIdRecord
			}, {
				"text" : "metadataId: coordinatesGroup",
			// onclickMethod : openMetadataIdRecord
			}, {
				"text" : "nameInData: coordinates"
			// }, {
			// "text" : "regEx: " + regEx
			}, {
				"text" : "presentationId: coordinatesPGroup"
			} ]
		}
	};
	assert.stringifyEqual(this.dependencies.pMapViewFactory.getSpec(0), expectedSpec);

});

QUnit.test("testGetDependencies", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	// assert.strictEqual(pMap.type, "pMap");
	var dependencies = pMap.getDependencies();
	assert.equal(dependencies, this.dependencies);
});

// QUnit.test("testNestedSurroundingContainer", function(assert) {
// this.spec.cPresentation = CORA.coraData(this.dependencies.metadataProvider
// .getMetadataById("pTextVariablePlus2SContainer2")),
// this.spec.cParentPresentation = CORA.coraData(this.dependencies.metadataProvider
// .getMetadataById("pgGroupIdTwoTextChildSurrounding2TextPGroup2"))
// var pMap = CORA.pMap(this.dependencies, this.spec);
// var view = pMap.getView();
// this.fixture.appendChild(view);
//
// assert.strictEqual(pMap.type, "pMap");
// assert.deepEqual(view.className, "pMap " + "pTextVariablePlus2SContainer2");
// assert.ok(view.modelObject === pMap,
// "modelObject should be a pointer to the javascript object instance");
// assert.strictEqual(view.childNodes.length, 3);
//
// assert.strictEqual(view.childNodes[1].textContent, "En rubrik");
//
//
// var factoredSpec = this.dependencies.pNonRepeatingChildRefHandlerFactory.getSpec(0);
//
// assert.strictEqual(factoredSpec.parentPath, this.spec.path);
// assert.strictEqual(factoredSpec.parentMetadataId, "groupIdTwoTextChildRepeat1to5");
// assert.strictEqual(this.getId(factoredSpec.cPresentation), "pTextVariablePlus2SContainer");
// assert.strictEqual(this.getId(factoredSpec.cParentPresentation),
// "pgGroupIdTwoTextChildSurrounding2TextPGroup2");
//
// var factored = this.dependencies.pNonRepeatingChildRefHandlerFactory.getFactored(0)
// assert.strictEqual(view.childNodes[2], factored.getView());
//
// });
