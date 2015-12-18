/*
 * Copyright 2015 Olov McKie
 * Copyright 2015 Uppsala University Library
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

// begin workaround qunit does not report number of tests
var testCount = 0;
var qunitTest = QUnit.test;
QUnit.test = window.test = function () {
    testCount += 1;
    qunitTest.apply(this, arguments);
};
QUnit.begin(function (args) {
    args.totalTests = testCount;
});
// end workaround qunit does not report number of tests

QUnit.module("CORA.DataHolder", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
	},
	teardown : function() {
	}
});

QUnit.test("testInit", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
	ok(dataHolder.getPubSub());
}); 

QUnit.test("testCreateBroken", function() {
	throws(function() {
		new CORA.DataHolder("brokenMetadataNoNameInData", this.metadataProvider, this.pubSub);
	}, "TypeError");
}); 

QUnit.test("testCreateOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupIdOneTextChild",'
			+ '"children":[{"name":"textVariableId","value":""}]}');
});

QUnit.test("testCreateGroupInGroupOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupInGroupOneTextChild",'
			+ '"children":[{"name":"groupIdOneTextChild",'
			+ '"children":[{"name":"textVariableId","value":""}]}]}');
});

QUnit.test("testCreateTwoChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupIdTwoTextChild",'
			+ '"children":[{"name":"textVariableId","value":""},'+
			'{"name":"textVariableId2","value":""}]}');
});

QUnit.test("testCreateOneChildRepeat0to1", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat0to1",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat0to1",'
			+ '"children":['+']}');
});

QUnit.test("testCreateOneChildRepeat3to3", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat3to3",'
			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
			'{"name":"textVariableId","value":"","repeatId":"1"},'+
			'{"name":"textVariableId","value":"","repeatId":"2"}'+']}');
});
QUnit.test("testCreateOneChildRepeat1toX", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat1toX",'
			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"}'
			+']}');
});

QUnit.test("testCreateOneChildGroupRepeat3to3", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneChildGroupRepeat3to3",'
			+ '"children":['+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"1"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"}'+
			']}');
});
QUnit.test("testCreateOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}');
});

QUnit.test("testCreateOneChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneTextChildTwoAttributes",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"'
			+ ',"anOtherAttribute":"aOtherFinalValue"'
			+'}' + '}');
});

QUnit.test("testCreateGroupInGroupOneTextChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});

QUnit.test("testCreateGroupInGroupOneTextChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildTwoAttributes",'
			+ '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"'
			+ ',"anOtherAttribute":"aOtherFinalValue"'
			+'}' + '}]}');
});

QUnit.test("testCreateGroupInGroupOneTextChildRepeat1to3OneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"' + '}]}');
});

QUnit.test("testCreateTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", function() {
	var dataHolder = new CORA.DataHolder("textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
			+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
			+ '"children":[]'
			+ ',"repeatId":"0"' + '}]}');
});

QUnit.test("testCreateOneChildOOOLLLLDDDD", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON
			.stringify(dataHolder.getData()),
			'{"name":"recordTypeOnlyMetadataIdChild","children":['+
			'{"name":"metadataId","value":""}]}');
});
QUnit.test("testCreateTwoChildren", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"recordTypeOnlyMetadataIdPresentationViewIdChild","children":['
					+ '{"name":"metadataId","value":""},'
					+ '{"name":"presentationViewId","value":""}]}');
});
QUnit.test("testCreateMoreChildren", function() {
	var dataHolder = new CORA.DataHolder("recordType", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"recordType","children":['
			+ '{"name":"metadataId","value":""},'
			+ '{"name":"recordInfo","children":[{"name":"id","value":""}]},'
			+ '{"name":"presentationViewId","value":""},'
			+ '{"name":"presentationFormId","value":""},'
			+ '{"name":"newMetadataId","value":""},'
			+ '{"name":"newPresentationFormId","value":""},'
			+ '{"name":"listPresentationViewId","value":""},'
			+ '{"name":"searchMetadataId","value":""},'
			+ '{"name":"searchPresentationFormId","value":""},'
			+ '{"name":"userSuppliedId","value":""},'
			+ '{"name":"permissionKey","value":""},'
			+ '{"name":"selfPresentationViewId","value":""}]}');
});
QUnit.test("testCreateWithAttribute", function() {
	var dataHolder = new CORA.DataHolder("metadata", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"metadata","children":['
			+ '{"name":"recordInfo","children":[{"name":"id","value":""}]},'
			+ '{"name":"nameInData","value":""},'
			+ '{"name":"textId","value":""},'
			+ '{"name":"defTextId","value":""},'
			+ '{"name":"attributeReferences","children":[{"name":"ref","value":"","repeatId":"0"}]},'
			+ '{"name":"childReferences","children":[{"name":"childReference",'
			+'"children":[{"name":"ref","value":""},'
			+'{"name":"repeatMin","value":""},'
			+'{"name":"repeatMinKey","value":""},'
			+'{"name":"repeatMax","value":""},'
			+'{"name":"secret","value":""},'
			+'{"name":"secretKey","value":""},'
			+'{"name":"readOnly","value":""},'
			+'{"name":"readOnlyKey","value":""}'
			+'],"repeatId":"0"}]}],'
			+'"attributes":{"recordTypeTypeCollectionVar":"aFinalValue"}}');
});

QUnit.test("testSetValueOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupIdOneTextChild",'
			+ '"children":[{"name":"textVariableId","value":"A Value"}]}');
});

function createLinkedPathWithNameInData(nameInData){
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		} ]
	} 
}

QUnit.test("testSetValueTwoChildren", function() {
	var dataHolder = new CORA.DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId2"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupIdTwoTextChild",'
			+ '"children":[{"name":"textVariableId","value":""},'
			+ '{"name":"textVariableId2","value":"A Value"}]}');
});

QUnit.test("testSetValueOneChildRepeat3to3", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("textVariableId","2")
					dataHolder.setValue(path
							, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat3to3",'
			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
			'{"name":"textVariableId","value":"","repeatId":"1"},'+
			'{"name":"textVariableId","value":"A Value","repeatId":"2"}'+']}');
});
function createLinkedPathWithNameInDataAndRepeatId(nameInData, repeatId){
	return {
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : nameInData
		}, {
			"name" : "repeatId",
			"value" : repeatId
		} ]
	}
}
QUnit.test("testSetValueOneChildRepeat1toX", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("textVariableId","0")
	dataHolder.setValue(path
			, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat1toX",'
			+ '"children":[{"name":"textVariableId","value":"A Value","repeatId":"0"}'
			+']}');
});
QUnit.test("testSetValueOneGroupChildRepeat3to3", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChild", "1");
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path
	, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneChildGroupRepeat3to3",'
			+ '"children":['+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":"A Value"}],"repeatId":"1"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"}'+
			']}');
});

QUnit.test("testSetValueOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneTextChildOneAttribute",'
					+ '"children":[{"name":"textVariableId","value":"A Value"}]'
					+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}');
});

QUnit.test("testSetValueOneChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneTextChildTwoAttributes",'
			+ '"children":[{"name":"textVariableId","value":"A Value"}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"'
			+ ',"anOtherAttribute":"aOtherFinalValue"'
			+'}' + '}');
});

QUnit.test("testSetValueGroupInGroupOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
					+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
					+ '"children":[{"name":"textVariableId","value":"A Value"}]'
					+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});

function createAttributes(){
	return {
	      "name": "attributes",
	      "children": []
	    };
}

function createAttributeWithNameAndValue(attributeName, attributeValue){
	return { 
	          "name": "attribute",
	          "repeatId": "1",
	          "children": [ 
	            {
	              "name": "attributeName",
	              "value": attributeName
	            },
	            {
	              "name": "attributeValue",
	              "value": attributeValue
	            }
	          ]
	        }
}

QUnit.test("testSetValueGroupInGroupOneChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	attributes.children
			.push(createAttributeWithNameAndValue("anOtherAttribute", "aOtherFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));

	dataHolder.setValue(path, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildTwoAttributes",'
					+ '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
					+ '"children":[{"name":"textVariableId","value":"A Value"}]'
					+ ',"attributes":{"anAttribute":"aFinalValue"'
					+ ',"anOtherAttribute":"aOtherFinalValue"' + '}' + '}]}');
});

QUnit.test("testSetValueGroupInGroupOneChildRepeat1to3OneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChildOneAttribute","0");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
					+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
					+ '"children":[{"name":"textVariableId","value":"A Value"}]'
					+ ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"' + '}]}');
});

QUnit.test("testSetValueGroupInGroupOneChildAttributeInPathNoAttributeInDataShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChild", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChild");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
	dataHolder.setValue(path
			, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()), '{"name":"groupInGroupOneTextChild",'
			+ '"children":[{"name":"groupIdOneTextChild",'
			+ '"children":[{"name":"textVariableId","value":""}]}]}');
});

QUnit.test("testSetValueGroupInGroupOneChildOneAttributeNoAttributeInPathShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChild");
	var attributes = createAttributes();
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
		
dataHolder.setValue(path
		, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});

QUnit.test("testSetValueGroupInGroupOneChildOneAttributeWrongAttributeNameInPathShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttributeWRONGName", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
		
	dataHolder.setValue(path
			, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});
QUnit.test("testSetValueGroupInGroupOneChildOneAttributeWrongAttributeValueInPathShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalWRONGValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
		dataHolder.setValue(path
				, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});

QUnit.test("testSetValueGroupInGroupOneChildOneAttributeOneAttributeToManyInPathShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	attributes.children.push(createAttributeWithNameAndValue("anOtherAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
		
		dataHolder.setValue(path
				, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildOneAttribute",'
			+ '"children":[{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"}' + '}]}');
});


QUnit.test("testSetValueGroupInGroupOneChildTwoAttributesPathHasOnlyOneAttributeShouldNotSetValue", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildTwoAttributes");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	throws(function() {
		
		dataHolder.setValue(path, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildTwoAttributes",'
			+ '"children":[{"name":"groupIdOneTextChildTwoAttributes",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"'
			+ ',"anOtherAttribute":"aOtherFinalValue"'
			+'}' + '}]}');
});

QUnit.test("testAddRepeatOneChildRepeat0to1", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat0to1",
			this.metadataProvider, this.pubSub);
	var path = {};
	dataHolder.addRepeat(path, "textVariableId", "repeatId");
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat0to1",'
			+ '"children":['+
			'{"name":"textVariableId","value":"","repeatId":"repeatId"}'+']}');
});

QUnit.test("testAddRepeatOneChildRepeat3to3", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat3to3",
			this.metadataProvider, this.pubSub);
	var path = {};
	dataHolder.addRepeat(path, "textVariableId", "repeatId");
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat3to3",'
			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
			'{"name":"textVariableId","value":"","repeatId":"1"},'+
			'{"name":"textVariableId","value":"","repeatId":"2"},'+
			'{"name":"textVariableId","value":"","repeatId":"repeatId"}'+']}');
});

QUnit.test("testAddRepeatOneChildRepeat1toX", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeat1toX",
			this.metadataProvider, this.pubSub);
	var path = {};
	dataHolder.addRepeat(path, "textVariableId", "repeatId");
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{"name":"groupIdOneTextChildRepeat1toX",'
			+ '"children":[{"name":"textVariableId","value":"","repeatId":"0"},'+
			'{"name":"textVariableId","value":"","repeatId":"repeatId"}'+']}');
});

QUnit.test("testAddRepeatGroupIdOneChildGroupRepeat3to3", 
		function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeat3to3",
			this.metadataProvider, this.pubSub);
	var path = {};
	dataHolder.addRepeat(path, "groupIdOneTextChild", "repeatId");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupIdOneChildGroupRepeat3to3",'
			+ '"children":['+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"0"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"1"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"2"},'+
			'{"name":"groupIdOneTextChild","children":[{"name":"textVariableId","value":""}],"repeatId":"repeatId"}'+
			']}');
});
QUnit.test("testAddRepeatGroupInGroupOneChildRepeat1to3OneAttribute", 
		function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildRepeat1to3OneAttribute",
			this.metadataProvider, this.pubSub);
	var path = {};
	dataHolder.addRepeat(path, "groupIdOneTextChildOneAttribute", "repeatId"); 

	deepEqual(JSON.stringify(dataHolder.getData()),
			'{"name":"groupInGroupOneTextChildRepeat1to3OneAttribute",'
			+ '"children":['+
			'{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"0"},'
			+'{"name":"groupIdOneTextChildOneAttribute",'
			+ '"children":[{"name":"textVariableId","value":""}]'
			+ ',"attributes":{"anAttribute":"aFinalValue"},"repeatId":"repeatId"}'
+ ']}');
});

//textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup
//textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup
//textVarRepeat1to3InGroupOneAttribute
//textVar
QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup", 
		function() {
			var dataHolder = new CORA.DataHolder(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
					this.metadataProvider, this.pubSub);
			var path = createLinkedPathWithNameInDataAndRepeatId(
					"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0");
			dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute", "repeatId");
	
			deepEqual(
					JSON.stringify(dataHolder.getData()),
					'{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
							+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
							+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttribute",'
							+ '"children":[{"name":"textVar","value":"","repeatId":"0"}],'
							+ '"attributes":{"anAttribute":"aFinalValue"}'
							+ ',"repeatId":"repeatId"' + '}]' + ',"repeatId":"0"' + '}]}');
});
QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup2", 
		function() {
	var dataHolder = new CORA.DataHolder(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup", "0");
	dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute", "repeatId");
	
	var path2 = createLinkedPathWithNameInDataAndRepeatId("textVarRepeat1to3InGroupOneAttribute",
			"repeatId"); 
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path2.children.push(attributes);
	path.children.push(path2);
	dataHolder.addRepeat(path, "textVar", "one");
	 
	
	deepEqual(
			JSON.stringify(dataHolder.getData()),
			'{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
			+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
			+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttribute",'
			+ '"children":[{"name":"textVar","value":"","repeatId":"0"},'
			+'{"name":"textVar","value":"","repeatId":"one"}],'
			+ '"attributes":{"anAttribute":"aFinalValue"}'
			+ ',"repeatId":"repeatId"' + '}]' + ',"repeatId":"0"' + '}]}');
});

QUnit.test("testAddRepeatTextVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroupWrongNameInDataInPathNothingShouldBeAdded", 
		function() {
	
	var dataHolder = new CORA.DataHolder(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId(
			"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupWRONG", "0");
	throws(function() {
		dataHolder.addRepeat(path, "textVarRepeat1to3InGroupOneAttribute", "repeatId");
	}, "Error");
	
	deepEqual(
			JSON.stringify(dataHolder.getData()),
			'{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroupRepeat1to3InGroup",'
			+ '"children":[{"name":"textVarRepeat1to3InGroupOneAttributeRepeat0to2InGroup",'
			+ '"children":[]' + ',"repeatId":"0"' + '}]}');
});

