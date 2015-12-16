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

QUnit.module("DataHolder", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
	},
	teardown : function() {
	}
});

QUnit.test("client.DataHolder.init", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
	ok(dataHolder.getPubSub());
}); 

QUnit.test("client.DataHolder.testCreatedBroken", function() {
	throws(function() {
		new CORA.DataHolder("brokenMetadataNoNameInData", this.metadataProvider, this.pubSub)
	}, "TypeError");
}); 

QUnit.test("client.DataHolder.testCreatedOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}');
});

QUnit.test("client.DataHolder.testCreatedGroupInGroupOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupInGroupOneTextChild\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}]}');
});

QUnit.test("client.DataHolder.testCreatedTwoChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupIdTwoTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"},'+
			'{\"name\":\"textVariableId2\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedOneChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"2\"}'+']}');
});
QUnit.test("client.DataHolder.testCreatedOneChildGroupMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneChildGroupRepeatingMinRepeatThree\",'
			+ '\"children\":['+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"0\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"1\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"2\"}'+
			']}');
});
QUnit.test("client.DataHolder.testCreatedOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}');
});
QUnit.test("client.DataHolder.testCreatedGroupInGroupOneTextChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});

QUnit.test("client.DataHolder.testCreatedOneChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
			+ ',\"anOtherAttribute\":\"aOtherFinalValue\"'
			+'}' + '}');
});
QUnit.test("client.DataHolder.testCreatedGroupInGroupOneTextChildTwoAttributes", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
			+ ',\"anOtherAttribute\":\"aOtherFinalValue\"'
			+'}' + '}]}');
});
QUnit.test("client.DataHolder.testCreatedOneChildOOOLLLLDDDD", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON
			.stringify(dataHolder.getData()),
			'{\"name\":\"recordTypeOnlyMetadataIdChild\",\"children\":['+
			'{\"name\":\"metadataId\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedTwoChildren", function() {
	var dataHolder = new CORA.DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name\":\"recordTypeOnlyMetadataIdPresentationViewIdChild\",\"children\":['
					+ '{\"name\":\"metadataId\",\"value\":\"\"},'
					+ '{\"name\":\"presentationViewId\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedMoreChildren", function() {
	var dataHolder = new CORA.DataHolder("recordType", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name\":\"recordType\",\"children\":['
			+ '{\"name\":\"metadataId\",\"value\":\"\"},'
			+ '{\"name\":\"recordInfo\",\"children\":[{\"name\":\"id\",\"value\":\"\"}]},'
			+ '{\"name\":\"presentationViewId\",\"value\":\"\"},'
			+ '{\"name\":\"presentationFormId\",\"value\":\"\"},'
			+ '{\"name\":\"newMetadataId\",\"value\":\"\"},'
			+ '{\"name\":\"newPresentationFormId\",\"value\":\"\"},'
			+ '{\"name\":\"listPresentationViewId\",\"value\":\"\"},'
			+ '{\"name\":\"searchMetadataId\",\"value\":\"\"},'
			+ '{\"name\":\"searchPresentationFormId\",\"value\":\"\"},'
			+ '{\"name\":\"userSuppliedId\",\"value\":\"\"},'
			+ '{\"name\":\"permissionKey\",\"value\":\"\"},'
			+ '{\"name\":\"selfPresentationViewId\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedWithAttribute", function() {
	var dataHolder = new CORA.DataHolder("metadata", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name\":\"metadata\",\"children\":['
			+ '{\"name\":\"recordInfo\",\"children\":[{\"name\":\"id\",\"value\":\"\"}]},'
			+ '{\"name\":\"nameInData\",\"value\":\"\"},'
			+ '{\"name\":\"textId\",\"value\":\"\"},'
			+ '{\"name\":\"defTextId\",\"value\":\"\"},'
			+ '{\"name\":\"attributeReferences\",\"children\":[{\"name\":\"ref\",\"value\":\"\"}]},'
			+ '{\"name\":\"childReferences\",\"children\":[{\"name\":\"childReference\",'
			+'\"children\":[{\"name\":\"ref\",\"value\":\"\"},'
			+'{\"name\":\"repeatMin\",\"value\":\"\"},'
			+'{\"name\":\"repeatMinKey\",\"value\":\"\"},'
			+'{\"name\":\"repeatMax\",\"value\":\"\"},'
			+'{\"name\":\"secret\",\"value\":\"\"},'
			+'{\"name\":\"secretKey\",\"value\":\"\"},'
			+'{\"name\":\"readOnly\",\"value\":\"\"},'
			+'{\"name\":\"readOnlyKey\",\"value\":\"\"}'
			+']}]}],'
			+'\"attributes\":{\"recordTypeTypeCollectionVar\":\"aFinalValue\"}}');
});

QUnit.test("client.DataHolder.testSetValueOneChild", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name\":\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"A Value\"}]}');
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

QUnit.test("client.DataHolder.testSetValueTwoChildren", function() {
	var dataHolder = new CORA.DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId2"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name\":\"groupIdTwoTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"},'
			+ '{\"name\":\"textVariableId2\",\"value\":\"A Value\"}]}');
});

QUnit.test("client.DataHolder.testSetValueOneChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("textVariableId","2")
					dataHolder.setValue(path
							, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"A Value\",\"repeatId\":\"2\"}'+']}');
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
QUnit.test("client.DataHolder.testSetValueOneGroupChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	var path = createLinkedPathWithNameInDataAndRepeatId("groupIdOneTextChild", "1");
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path
	, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneChildGroupRepeatingMinRepeatThree\",'
			+ '\"children\":['+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"0\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"A Value\"}],\"repeatId\":\"1\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"2\"}'+
			']}');
});

QUnit.test("client.DataHolder.testSetValueOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue(createLinkedPathWithNameInData("textVariableId"), 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildOneAttribute\",'
					+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttribute", function() {
	var dataHolder = new CORA.DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	var path = createLinkedPathWithNameInData("groupIdOneTextChildOneAttribute");
	var attributes = createAttributes();
	attributes.children.push(createAttributeWithNameAndValue("anAttribute", "aFinalValue"));
	path.children.push(attributes);
	path.children.push(createLinkedPathWithNameInData("textVariableId"));
	dataHolder.setValue(path, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
					+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
					+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
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

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildTwoAttributes", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildTwoAttributes\",'
					+ '\"children\":[{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
					+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
					+ ',\"anOtherAttribute\":\"aOtherFinalValue\"' + '}' + '}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildAttributeInPathNoAttributeInDataShouldNotSetValue", function() {
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
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupInGroupOneTextChild\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeNoAttributeInPathShouldNotSetValue", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeWrongAttributeNameInPathShouldNotSetValue", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});
QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeWrongAttributeValueInPathShouldNotSetValue", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeOneAttributeToManyInPathShouldNotSetValue", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});


QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildTwoAttributesPathHasOnlyOneAttributeShouldNotSetValue", function() {
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
			'{\"name"\:\"groupInGroupOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
			+ ',\"anOtherAttribute\":\"aOtherFinalValue\"'
			+'}' + '}]}');
});


QUnit.test("client.DataHolder.testAddRepeatOneChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
//	var path = createLinkedPathWithNameInData();
//	console.log("EMPTY PATH:"+JSON.stringify(path));
	var path = {};
	dataHolder.addRepeat(path, "textVariableid", "repeatId");
//			{
//		"id" : "groupIdOneTextChildRepeatingMinRepeatThree"
//	}, 'textVariableId');
//	deepEqual('{\"data\":[{\"groupIdOneTextChildRepeatingMinRepeatThree\":{\"children\":['
//			+ '{\"textVariableId\":\"\"}' + ',{\"textVariableId\":\"\"}'
//			+ ',{\"textVariableId\":\"\"},{\"textVariableId\":\"\"}]}}]}', JSON
//			.stringify(dataHolder.getData()));
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"2\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"repeatId\"}'+']}');
});
/*

QUnit.test("client.DataHolder.testCreatedOneChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"2\"}'+']}');
});
QUnit.test("client.DataHolder.testCreatedOneChildGroupMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneChildGroupRepeatingMinRepeatThree\",'
			+ '\"children\":['+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"0\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"1\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"2\"}'+
			']}');
});








QUnit.test("client.DataHolder.testAddRepeatOneGroupChildMinRepeatThree", function() {
	var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	dataHolder.addRepeat({
		"id" : "groupIdOneChildGroupRepeatingMinRepeatThree"
	}, 'groupIdOneTextChild');
	deepEqual('{\"data\":[{\"groupIdOneChildGroupRepeatingMinRepeatThree\":{\"children\":['
			+ '{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}' + ']}}]}',
			JSON.stringify(dataHolder.getData()));
});
QUnit
		.test(
				"client.DataHolder.testAddRepeatOneGroupChildMinRepeatThreeChild",
				function() {
					var dataHolder = new CORA.DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
							this.metadataProvider, this.pubSub);
					dataHolder.addRepeat({
						"id" : "groupIdOneChildGroupRepeatingMinRepeatThree",
						"forChild" : {
							"id" : "groupIdOneTextChild",
							"repeatNo" : 1
						}
					}, 'textVariableId');
					deepEqual(
							'{\"data\":[{\"groupIdOneChildGroupRepeatingMinRepeatThree\":{\"children\":['
									+ '{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
									+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"},{\"textVariableId\":\"\"}]}}'
									+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
									+ ']}}]}', JSON.stringify(dataHolder.getData()));
				});
*/
