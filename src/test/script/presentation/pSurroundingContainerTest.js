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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPSurroundingContainerFactory = function(metadataProvider, pubSub,
			textProvider, presentationFactory, jsBookkeeper, recordTypeProvider, fixture) {
		var factor = function(path, metadataIdUsedInData, pSurroundingContainerId,
				presentationParentId) {
			var cPSurroundingContainer = CORA.coraData(metadataProvider
					.getMetadataById(pSurroundingContainerId));
			var cParentPresentation = CORA.coraData(metadataProvider
					.getMetadataById(presentationParentId));
			var dependencies = {
					"metadataProvider" : metadataProvider,
					"pubSub" : pubSub,
					"textProvider" : textProvider,
					"presentationFactory" : presentationFactory,
					"jsBookkeeper" : jsBookkeeper,
					"recordTypeProvider" : recordTypeProvider,
					"pChildRefHandlerFactory" : CORATEST.pChildRefHandlerFactorySpy()
			};
			var spec = {
				"metadataIdUsedInData" : metadataIdUsedInData,
				"path" : path,
				"cPresentation" : cPSurroundingContainer,
				"cParentPresentation" : cParentPresentation
			};
			var pSurroundingContainer = CORA.pSurroundingContainer(dependencies, spec);
			var view = pSurroundingContainer.getView();
			fixture.appendChild(view);
			var valueView = view.firstChild;
			return {
				pSurroundingContainer : pSurroundingContainer,
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

QUnit.module("pSurroundingContainerTest.js", {
	beforeEach : function() {
		this.getId = function (cData){
			var recordInfo = cData.getFirstChildByNameInData("recordInfo");
			var id = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
			return id;
		}
		
		this.fixture = document.getElementById("qunit-fixture");
		this.dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"presentationFactory" : CORATEST.presentationFactorySpy(),
			"jsBookkeeper" : CORATEST.jsBookkeeperSpy(),
			"recordTypeProvider" : CORATEST.recordTypeProviderStub(),
			"pChildRefHandlerFactory" : CORATEST.pChildRefHandlerFactorySpy()
		};
		this.spec = {
			"metadataIdUsedInData" : "groupIdTwoTextChildRepeat1to5",
			"path" : {},
			"cPresentation" : CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pTextVariablePlus2SContainer")),
			"cParentPresentation" : CORA.coraData(this.dependencies.metadataProvider
							.getMetadataById("pgGroupIdTwoTextChildSurrounding2TextPGroup"))
//			"dataDivider" : "systemX"
		};
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
//	var attachedPSurroundingContainer = this.pSurroundingContainerFactory.factor({},
//			"groupIdTwoTextChildRepeat1to5", "pTextVariablePlus2SContainer",
//			"pgGroupIdTwoTextChildSurrounding2TextPGroup");
	
	var pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	var view = pSurroundingContainer.getView();
	this.fixture.appendChild(view);
	
	assert.strictEqual(pSurroundingContainer.type,
			"pSurroundingContainer");
	assert.deepEqual(view.className, "pSurroundingContainer "
			+ "pTextVariablePlus2SContainer");
//	var view = attachedPSurroundingContainer.view;
	assert.ok(view.modelObject === pSurroundingContainer,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 4);

	assert.strictEqual(view.childNodes[1].textContent, "En rubrik");

//	var childRefHandler = view.childNodes[2];
//	assert.deepEqual(childRefHandler.className, "pChildRefHandler pVarTextVariableId");
//
//	var childRefHandler2 = view.childNodes[3];
//	assert.deepEqual(childRefHandler2.className, "pChildRefHandler pVarTextVariableId2");
	
	
assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");
	
	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
	assert.deepEqual(factoredSpec.parentPath, this.spec.path);
	
	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdTwoTextChildRepeat1to5");
	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup");
	assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});

QUnit.test("testInitInfo", function(assert) {
//	var attachedPSurroundingContainer = this.pSurroundingContainerFactory.factor({},
//			"groupIdTwoTextChildRepeat1to5", "pTextVariablePlus2SContainer",
//			"pgGroupIdTwoTextChildSurrounding2TextPGroup");
//	var view = attachedPSurroundingContainer.view;
	var pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	var view = pSurroundingContainer.getView();
	this.fixture.appendChild(view);
	
	var infoButton = view.childNodes[0];
	assert.equal(infoButton.nodeName, "SPAN");
	assert.equal(infoButton.className, "infoButton");

	// var event = document.createEvent('Event');
	// infoButton.onclick(event);
	// assert.equal(view.childNodes.length, 3);
	//
	// var infoView = view.childNodes[2];
	// assert.equal(infoView.childNodes.length, 2);
	// assert.equal(infoView.nodeName, "SPAN");
	// assert.equal(infoView.className, "infoView");
	//
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[0], "textView",
	// "Exempel textvariabel", assert);
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[1], "defTextView",
	// "Detta är en exempeldefinition för en textvariabel.", assert);
	//
	// infoButton.onclick(event);
	// assert.equal(view.childNodes.length, 3);
	// assert.equal(infoView.childNodes.length, 6);
	//
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[2], "textIdView",
	// "textId: textVariableIdText", assert);
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[3], "defTextIdView",
	// "defTextId: textVariableIdDefText", assert);
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[4], "metadataIdView",
	// "metadataId: textVariableId", assert);
	// CORATEST.testSpanWithClassNameOnlyContainsText(infoView.childNodes[5], "regExView",
	// "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$", assert);
	//
	// infoButton.onclick(event); 
	// assert.equal(view.childNodes.length, 2);
	//
	// infoButton.onclick(event); 
	// assert.equal(view.childNodes.length, 3);
});	

QUnit.test("testNestedSurroundingContainer", function(assert) {
//	var attachedPSurroundingContainer = this.pSurroundingContainerFactory.factor({},
//			"groupIdTwoTextChildRepeat1to5", "pTextVariablePlus2SContainer2",
//			"pgGroupIdTwoTextChildSurrounding2TextPGroup2");
	this.spec.cPresentation= CORA.coraData(this.dependencies.metadataProvider
			.getMetadataById("pTextVariablePlus2SContainer2")),
			this.spec.cParentPresentation= CORA.coraData(this.dependencies.metadataProvider
					.getMetadataById("pgGroupIdTwoTextChildSurrounding2TextPGroup2"))
	var pSurroundingContainer = CORA.pSurroundingContainer(this.dependencies, this.spec);
	var view = pSurroundingContainer.getView();
	this.fixture.appendChild(view);
	
	assert.strictEqual(pSurroundingContainer.type,
			"pSurroundingContainer");
	assert.deepEqual(view.className, "pSurroundingContainer "
			+ "pTextVariablePlus2SContainer2");
//	var view = attachedPSurroundingContainer.view;
	assert.ok(view.modelObject === pSurroundingContainer,
			"modelObject should be a pointer to the javascript object instance");
	assert.strictEqual(view.childNodes.length, 3);

	assert.strictEqual(view.childNodes[1].textContent, "En rubrik");

	var requestedCPresentation = this.dependencies.presentationFactory.getCPresentation();
	var recordInfo = requestedCPresentation.getFirstChildByNameInData("recordInfo");

	var presentationId = CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
	assert.strictEqual(presentationId, "pTextVariablePlus2SContainer");
	
	
//assert.strictEqual(view.childNodes[2].className, "pChildRefHandlerSpyView");
	//TODO: is above ok 
//	var factoredSpec = this.dependencies.pChildRefHandlerFactory.getSpec(0);
//	assert.deepEqual(factoredSpec.parentPath, this.spec.path);
//	
//	assert.strictEqual(this.getId(factoredSpec.cParentMetadata), "groupIdTwoTextChildRepeat1to5");
//	assert.strictEqual(this.getId(factoredSpec.cPresentation), "pVarTextVariableId");
//	assert.strictEqual(this.getId(factoredSpec.cParentPresentation), "pgGroupIdTwoTextChildSurrounding2TextPGroup");
//	assert.strictEqual(factoredSpec.minimizedDefault, undefined);
});
