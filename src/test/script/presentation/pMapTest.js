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
QUnit.module("pMapTest.js", {
	beforeEach : function() {
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
	assert.ok(view.modelObject === pMap,
			"modelObject should be a pointer to the javascript object instance");
});

QUnit.test("testInitSubscribesToInitcompleteMessage", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	var subscriptions = this.dependencies.pubSub.getSubscriptions();
	assert.deepEqual(subscriptions.length, 1);

	// var firstSubsription = subscriptions[0];
	// assert.strictEqual(firstSubsription.type, "add");

	// var secondSubscription = subscriptions[1];
	// assert.strictEqual(secondSubscription.type, "move");

	var thirdSubscription = subscriptions[0];
	assert.strictEqual(thirdSubscription.type, "initComplete");
	assert.deepEqual(thirdSubscription.path, {});
	assert.strictEqual(thirdSubscription.functionToCall, pMap.initComplete);
});

QUnit.test("testInitCompleteStartsMapInViewAndUnsubscribesToInitcompleteMessage", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);

	var pMapView = this.dependencies.pMapViewFactory.getFactored(0);
	assert.strictEqual(pMapView.getStartMapCalled(), false);

	pMap.initComplete();
	assert.strictEqual(pMapView.getStartMapCalled(), true);

	// unsubscription
	var unsubscriptions = this.dependencies.pubSub.getUnsubscriptions();
	assert.deepEqual(unsubscriptions.length, 1);
});

QUnit.test("testInitInfoInputMode", function(assert) {
	var pMap = CORA.pMap(this.dependencies, this.spec);
	pMap.initComplete();
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
	var dependencies = pMap.getDependencies();
	assert.equal(dependencies, this.dependencies);
});

