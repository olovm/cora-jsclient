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

QUnit.module("client.DataHolderTest", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
	},
	teardown : function() {
	}
});
QUnit.test("client.DataHolder.init", function() {
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdChild",
			this.metadataProvider, this.pubSub);
	deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
	ok(dataHolder.getPubSub());
	ok(dataHolder.getData().data);
});
QUnit.test("client.DataHolder.testCreatedBroken", function() {
	throws(function() {
		new DataHolder("brokenMetadataNoNameInData", this.metadataProvider,
				this.pubSub)
	}, "TypeError");
});
QUnit.test("client.DataHolder.testCreatedOneChild", function() {
	var dataHolder = new DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(
			'{\"data\":[{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}]}',
			JSON.stringify(dataHolder.getData()));
});
QUnit.test("client.DataHolder.testCreatedOneChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual('{\"data\":[{\"groupIdOneChildGroupRepeatingMinRepeatThree\":{\"children\":['
			+ '{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}' + ']}}]}',
			JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testCreatedOneChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	deepEqual('{\"data\":[{\"groupIdOneTextChildOneAttribute\":{'
			+ '\"children\":[{\"textVariableId\":\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testCreatedOneChildTwoAttributes", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual('{\"data\":[{\"groupIdOneTextChildTwoAttributes\":{'
			+ '\"children\":[{\"textVariableId\":\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
			+ ',\"anOtherAttribute\":\"aOtherFinalValue\"}' + '}}]}', JSON.stringify(dataHolder
			.getData()));
});  
QUnit.test("client.DataHolder.testCreatedTwoChildren", function() {
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
			this.metadataProvider, this.pubSub);
	deepEqual('{\"data\":[{\"recordType\":{\"children\":[{\"metadataId\":\"\"},'
			+ '{\"presentationViewId\":\"\"}]}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testCreatedMoreChildren", function() {
	var dataHolder = new DataHolder("recordType", this.metadataProvider, this.pubSub);
	deepEqual('{\"data\":[{\"recordType\":{\"children\":[{\"metadataId\":\"\"},'
			+ '{\"recordInfo\":{\"children\":[{\"id\":\"\"}]}},{\"presentationViewId\":\"\"},'
			+ '{\"presentationFormId\":\"\"},{\"newMetadataId\":\"\"},'
			+ '{\"newPresentationFormId\":\"\"},{\"listPresentationViewId\":\"\"},'
			+ '{\"searchMetadataId\":\"\"},{\"searchPresentationFormId\":\"\"},'
			+ '{\"userSuppliedId\":\"\"},{\"permissionKey\":\"\"},'
			+ '{\"selfPresentationViewId\":\"\"}]}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testCreatedWithAttribute", function() {
	var dataHolder = new DataHolder("metadata", this.metadataProvider, this.pubSub);
	deepEqual('{\"data\":[{\"metadata\":{' + '\"children\":[{\"recordInfo\":{'
			+ '\"children\":[{\"id\":\"\"}]}},{\"nameInData\":\"\"},{\"textId\":\"\"},'
			+ '{\"defTextId\":\"\"},{\"attributeReferences\":{\"children\":[{\"ref\":\"\"}]}},'
			+ '{\"childReferences\":{\"children\":[{\"childReference\":{\"children\":'
			+ '[{\"ref\":\"\"},{\"repeatMin\":\"\"}'
			// + ',{\"repeatMinKey\":\"\"}'
			+ ',{\"repeatMax\":\"\"}'
			// + ',{\"secret\":\"\"},{\"secretKey\":\"\"},{\"readOnly\":\"\"},'
			// + '{\"readOnlyKey\":\"\"}'
			+ ']}}]}}]' + '' + ',\"attributes\":{\"recordTypeTypeCollectionVar\":\"aFinalValue\"}'
			+ '}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChild2", function() {
	var dataHolder = new DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"id" : "groupIdOneTextChild",
		"forChild" : {
			"id" : "textVariableId"
		}
	}, 'A Value');
	deepEqual(
			'{\"data\":[{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"A Value\"}]}}]}',
			JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueTwoChildren", function() {
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
			this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"id" : "recordType",
		"forChild" : {
			"id" : "presentationViewId"
		}
	}, 'A Value');
	deepEqual('{\"data\":[{\"recordType\":{\"children\":[{\"metadataId\":\"\"},'
			+ '{\"presentationViewId\":\"A Value\"}]}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"id" : "groupIdOneTextChildRepeatingMinRepeatThree",
		"forChild" : {
			"id" : "textVariableId",
			"repeatNo" : 2
		}
	}, 'A Value');
	deepEqual('{\"data\":[{\"groupIdOneTextChildRepeatingMinRepeatThree\":{\"children\":['
			+ '{\"textVariableId\":\"\"}'
			+ ',{\"textVariableId\":\"\"},{\"textVariableId\":\"A Value\"}]}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneGroupChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"id" : "groupIdOneChildGroupRepeatingMinRepeatThree",
		"forChild" : {
			"id" : "groupIdOneTextChild",
			"repeatNo" : 1,
			"forChild" : {
				"id" : "textVariableId"
			}
		}
	}, 'A Value');
	deepEqual('{\"data\":[{\"groupIdOneChildGroupRepeatingMinRepeatThree\":{\"children\":['
			+ '{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"A Value\"}]}}'
			+ ',{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}' + ']}}]}',
			JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue({
		"id" : "groupIdOneTextChildOneAttribute",
		// + '"attributes":[{"key":"anAttribute", "value":"aFinalValue"}], '
		"attributes" : {
			"anAttribute" : "aFinalValue"
		},
		"forChild" : {
			"id" : "textVariableId"
		}
	}, 'A Value');
	deepEqual('{\"data\":[{\"groupIdOneTextChildOneAttribute\":{'
			+ '\"children\":[{\"textVariableId\":\"A Value\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildAttributeInPathNoAttributeInDataShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	throws(function() {
		dataHolder.setValue({
			"id" : "groupIdOneTextChild",
			"forChild" : {
				"id" : "textVariableId",
				// + '"attributes":[{"key":"anAttribute",
				// "value":"aFinalValue"}] }}',
				// 'A Value');
				"attributes" : {
					"anAttribute" : "aFinalValue"
				}
			}
		}, 'A Value');
	}, "Error");
	deepEqual(
			'{\"data\":[{\"groupIdOneTextChild\":{\"children\":[{\"textVariableId\":\"\"}]}}]}',
			JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildOneAttributeNoAttributeInPathShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	throws(function() {
		dataHolder.setValue({
			"id" : "groupIdOneTextChildOneAttribute",
			// + '"attributes":[{"anAttribute":"aFinalValue"}], '
			// + '"attributes":[{"key":"anAttribute", "value":"aFinalValue"}]
			// }}',
			"forChild" : {
				"id" : "textVariableId"
			}
		}, 'A Value');
	}, "Error");
	deepEqual('{\"data\":[{\"groupIdOneTextChildOneAttribute\":{'
			+ '\"children\":[{\"textVariableId\":\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildOneAttributeWrongAttributeIdInPathShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	throws(function() {
		dataHolder.setValue({
			"id" : "groupIdOneTextChildOneAttribute",
			"attributes" : {
				"anAttributeWRONGiD" : "aFinalValue"
			},
			"forChild" : {
				"id" : "textVariableId"
			}
		}, 'A Value');
	}, "Error");
	deepEqual('{\"data\":[{\"groupIdOneTextChildOneAttribute\":{'
			+ '\"children\":[{\"textVariableId\":\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildOneAttributeWrongAttributeValueInPathShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	throws(function() {
		dataHolder.setValue({
			"id" : "groupIdOneTextChildOneAttribute",
			"attributes" : {
				"anAttribute" : "aFinalValueWRONGvALUE"
			},
			"forChild" : {
				"id" : "textVariableId"
			}
		}, 'A Value');
	}, "Error");
	deepEqual('{\"data\":[{\"groupIdOneTextChildOneAttribute\":{'
			+ '\"children\":[{\"textVariableId\":\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildTwoAttributes", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue({
		"id" : "groupIdOneTextChildTwoAttributes",
		// + '"attributes":[{"key":"anAttribute", "value":"aFinalValue"} '
		// + ',{"key":"anOtherAttribute", "value":"aOtherFinalValue"}' + '],'
		"attributes" : {
			"anAttribute" : "aFinalValue",
			"anOtherAttribute" : "aOtherFinalValue"
		},
		"forChild" : {
			"id" : "textVariableId"
		}
	}, 'A Value');
	deepEqual(
			'{\"data\":[{\"groupIdOneTextChildTwoAttributes\":{'
					+ '\"children\":[{\"textVariableId\":\"A Value\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\",\"anOtherAttribute\":\"aOtherFinalValue\"}'
					+ '}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testSetValueOneChildTwoAttributePathHasOnlyOneAttributeShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	throws(function() {
		dataHolder.setValue({
			"id" : "groupIdOneTextChildTwoAttributes",
			// + '"attributes":[{"key":"anAttribute", "value":"aFinalValue"} '
			"attributes" : {
				"anAttribute" : "aFinalValue"
			}
			// + ',{"key":"anOtherAttribute", "value":"aOtherFinalValue"}'
			// +'],'
			,
			"forChild" : {
				"id" : "textVariableId"
			}
		}, 'A Value');
	}, "Error");
	deepEqual(
			'{\"data\":[{\"groupIdOneTextChildTwoAttributes\":{'
					+ '\"children\":[{\"textVariableId\":\"\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\",\"anOtherAttribute\":\"aOtherFinalValue\"}'
					+ '}}]}', JSON.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testAddRepeatOneChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	dataHolder.addRepeat({
		"id" : "groupIdOneTextChildRepeatingMinRepeatThree"
	}, 'textVariableId');
	deepEqual('{\"data\":[{\"groupIdOneTextChildRepeatingMinRepeatThree\":{\"children\":['
			+ '{\"textVariableId\":\"\"}' + ',{\"textVariableId\":\"\"}'
			+ ',{\"textVariableId\":\"\"},{\"textVariableId\":\"\"}]}}]}', JSON
			.stringify(dataHolder.getData()));
});  
QUnit.test("client.DataHolder.testAddRepeatOneGroupChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
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
QUnit.test("client.DataHolder.testAddRepeatOneGroupChildMinRepeatThreeChild", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
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

