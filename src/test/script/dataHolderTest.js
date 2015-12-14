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

QUnit.module("DataHolder", {
	setup : function() {
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = new PubSubStub();
	},
	teardown : function() {
	}
});

QUnit.test("client.DataHolder.init", function() {
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual("recordTypeOnlyMetadataIdChild", dataHolder.getMetadataId());
	ok(dataHolder.getPubSub());
}); 

QUnit.test("client.DataHolder.testCreatedBroken", function() {
	throws(function() {
		new DataHolder("brokenMetadataNoNameInData", this.metadataProvider, this.pubSub)
	}, "TypeError");
}); 

QUnit.test("client.DataHolder.testCreatedOneChild", function() {
	var dataHolder = new DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}');
});

QUnit.test("client.DataHolder.testCreatedGroupInGroupOneChild", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupInGroupOneTextChild\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}]}');
});

QUnit.test("client.DataHolder.testCreatedTwoChild", function() {
	var dataHolder = new DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupIdTwoTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"},'+
			'{\"name\":\"textVariableId2\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedOneChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"2\"}'+']}');
});
QUnit.test("client.DataHolder.testCreatedOneChildGroupMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
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
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}');
});
QUnit.test("client.DataHolder.testCreatedGroupInGroupOneTextChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub); 
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});

QUnit.test("client.DataHolder.testCreatedOneChildTwoAttributes", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
			+ ',\"anOtherAttribute\":\"aOtherFinalValue\"'
			+'}' + '}');
});
QUnit.test("client.DataHolder.testCreatedGroupInGroupOneTextChildTwoAttributes", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
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
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdChild", this.metadataProvider,
			this.pubSub);
	deepEqual(JSON
			.stringify(dataHolder.getData()),
			'{\"name\":\"recordTypeOnlyMetadataIdChild\",\"children\":['+
			'{\"name\":\"metadataId\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedTwoChildren", function() {
	var dataHolder = new DataHolder("recordTypeOnlyMetadataIdPresentationViewIdChild",
			this.metadataProvider, this.pubSub);
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name\":\"recordTypeOnlyMetadataIdPresentationViewIdChild\",\"children\":['
					+ '{\"name\":\"metadataId\",\"value\":\"\"},'
					+ '{\"name\":\"presentationViewId\",\"value\":\"\"}]}');
});
QUnit.test("client.DataHolder.testCreatedMoreChildren", function() {
	var dataHolder = new DataHolder("recordType", this.metadataProvider, this.pubSub);
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
	var dataHolder = new DataHolder("metadata", this.metadataProvider, this.pubSub);
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
// + ',{\"repeatMinKey\":\"\"}'
// + ',{\"secret\":\"\"},{\"secretKey\":\"\"},{\"readOnly\":\"\"},'
// + '{\"readOnlyKey\":\"\"}'
QUnit.test("client.DataHolder.testSetValueOneChild", function() {
	var dataHolder = new DataHolder("groupIdOneTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId"
		} ]
	}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name\":\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"A Value\"}]}');
});
QUnit.test("client.DataHolder.testSetValueTwoChildren", function() {
	var dataHolder = new DataHolder("groupIdTwoTextChild", this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		"name" : "linkedPath",
		"children" : [ {
			"name" : "nameInData",
			"value" : "textVariableId2"
		} ]
	}, 'A Value');
	deepEqual(JSON.stringify(dataHolder
			.getData()),'{\"name\":\"groupIdTwoTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"},'+
			'{\"name\":\"textVariableId2\",\"value\":\"A Value\"}]}' );
});

QUnit.test("client.DataHolder.testSetValueOneChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
					dataHolder.setValue({
						"name" : "linkedPath",
						"children" : [ {
							"name" : "nameInData",
							"value" : "textVariableId"
						}, {
							"name" : "repeatId",
							"value" : "2"
						} ]
					}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()), 
			'{\"name"\:\"groupIdOneTextChildRepeatingMinRepeatThree\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"0\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"\",\"repeatId\":\"1\"},'+
			'{\"name\":\"textVariableId\",\"value\":\"A Value\",\"repeatId\":\"2\"}'+']}');
});

QUnit.test("client.DataHolder.testSetValueOneGroupChildMinRepeatThree", function() {
	var dataHolder = new DataHolder("groupIdOneChildGroupRepeatingMinRepeatThree",
			this.metadataProvider, this.pubSub);
	dataHolder.setValue({
		  "name": "linkedPath",
		  "children": [
		    {
		      "name": "nameInData",
		      "value": "groupIdOneTextChild"
		    },
		    {
		      "name": "repeatId",
		      "value": "1"
		    },
		    {
		      "name": "linkedPath",
		      "children": [
		        {
		          "name": "nameInData",
		          "value": "textVariableId"
		        }
		      ]
		    }
		  ]
		}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneChildGroupRepeatingMinRepeatThree\",'
			+ '\"children\":['+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"0\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"A Value\"}],\"repeatId\":\"1\"},'+
			'{\"name\":\"groupIdOneTextChild\",\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}],\"repeatId\":\"2\"}'+
			']}');
});

QUnit.test("client.DataHolder.testSetValueOneChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue({
		  "name": "linkedPath",
		  "children": [
		    {
		      "name": "nameInData",
		      "value": "textVariableId"
		    }
		  ]
		}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}');
});
QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue(
			{
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupIdOneTextChildOneAttribute"
					},
					
		    {
		      "name": "attributes",
		      "children": [
		        {
		          "name": "attribute",
		          "repeatId": "1",
		          "children": [ 
		            {
		              "name": "attributeName",
		              "value": "anAttribute"
		            },
		            {
		              "name": "attributeValue",
		              "value": "aFinalValue"
		            }
		          ]
		        }
		      ]
		    }, 
					{
		"name": "linkedPath",
		"children": [
		             {
		            	 "name": "nameInData",
		            	 "value": "textVariableId"
		             }
		             ]
	}]}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});
QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttribute", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildTwoAttributes", this.metadataProvider,
			this.pubSub);
	dataHolder.setValue(
			{
				  "name": "linkedPath",
				  "children": [
				    {
				      "name": "nameInData",
				      "value": "groupIdOneTextChildTwoAttributes"
				    },
				    {
				      "name": "attributes",
				      "children": [
				        {
				          "name": "attribute",
				          "repeatId": "1",
				          "children": [
				            {
				              "name": "attributeName",
				              "value": "anAttribute"
				            },
				            {
				              "name": "attributeValue",
				              "value": "aFinalValue"
				            }
				          ]
				        },
				        {
				          "name": "attribute",
				          "repeatId": "1",
				          "children": [
				            {
				              "name": "attributeName",
				              "value": "anOtherAttribute"
				            },
				            {
				              "name": "attributeValue",
				              "value": "aOtherFinalValue"
				            }
				          ]
				        }
				      ]
				    },
				    {
				      "name": "linkedPath",
				      "children": [
				        {
				          "name": "nameInData",
				          "value": "textVariableId"
				        }
				      ]
				    }
				  ]
				}, 'A Value');
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildTwoAttributes\",'
					+ '\"children\":[{\"name"\:\"groupIdOneTextChildTwoAttributes\",'
					+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"A Value\"}]'
					+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"'
					+ ',\"anOtherAttribute\":\"aOtherFinalValue\"' + '}' + '}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildAttributeInPathNoAttributeInDataShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChild", this.metadataProvider,
			this.pubSub);
	throws(function() {
	dataHolder.setValue(
			{
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupIdOneTextChild"
					},
					
		    {
		      "name": "attributes",
		      "children": [
		        {
		          "name": "attribute",
		          "repeatId": "1",
		          "children": [ 
		            {
		              "name": "attributeName",
		              "value": "anAttribute"
		            },
		            {
		              "name": "attributeValue",
		              "value": "aFinalValue"
		            }
		          ]
		        }
		      ]
		    }, 
					{
		"name": "linkedPath",
		"children": [
		             {
		            	 "name": "nameInData",
		            	 "value": "textVariableId"
		             }
		             ]
	}]}, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()), '{\"name"\:\"groupInGroupOneTextChild\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChild\",'
			+ '\"children\":[{\"name\":\"textVariableId\",\"value\":\"\"}]}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeNoAttributeInPathShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	throws(function() {
		
dataHolder.setValue(
			{
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupIdOneTextChildOneAttribute"
					},
					{
		"name": "linkedPath",
		"children": [
		             {
		            	 "name": "nameInData",
		            	 "value": "textVariableId"
		             }
		             ]
	}]}, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});

QUnit.test("client.DataHolder.testSetValueGroupInGroupOneChildOneAttributeWrongAttributeIdInPathShouldNotSetValue", function() {
	var dataHolder = new DataHolder("groupInGroupOneTextChildOneAttribute", this.metadataProvider,
			this.pubSub);
	throws(function() {
		
	dataHolder.setValue(
			{
				"name": "linkedPath",
				"children": [
					{
						"name": "nameInData",
						"value": "groupIdOneTextChildOneAttribute"
					},
					
		    {
		      "name": "attributes",
		      "children": [
		        {
		          "name": "attribute",
		          "repeatId": "1",
		          "children": [ 
		            {
		              "name": "attributeName",
		              "value": "anAttributeWRONGName"
		            },
		            {
		              "name": "attributeValue",
		              "value": "aFinalValue"
		            }
		          ]
		        }
		      ]
		    }, 
					{
		"name": "linkedPath",
		"children": [
		             {
		            	 "name": "nameInData",
		            	 "value": "textVariableId"
		             }
		             ]
	}]}, 'A Value');
	}, "Error");
	deepEqual(JSON.stringify(dataHolder.getData()),
			'{\"name"\:\"groupInGroupOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"groupIdOneTextChildOneAttribute\",'
			+ '\"children\":[{\"name"\:\"textVariableId\",\"value"\:\"\"}]'
			+ ',\"attributes\":{\"anAttribute\":\"aFinalValue\"}' + '}]}');
});
/*

QUnit
		.test(
				"client.DataHolder.testSetValueOneChildOneAttributeWrongAttributeIdInPathShouldNotSetValue",
				function() {
					var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute",
							this.metadataProvider, this.pubSub);
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
QUnit
		.test(
				"client.DataHolder.testSetValueOneChildOneAttributeWrongAttributeValueInPathShouldNotSetValue",
				function() {
					var dataHolder = new DataHolder("groupIdOneTextChildOneAttribute",
							this.metadataProvider, this.pubSub);
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
QUnit
		.test(
				"client.DataHolder.testSetValueOneChildTwoAttributes",
				function() {
					var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes",
							this.metadataProvider, this.pubSub);
					dataHolder.setValue({
						"id" : "groupIdOneTextChildTwoAttributes",
						// + '"attributes":[{"key":"anAttribute",
						// "value":"aFinalValue"} '
						// + ',{"key":"anOtherAttribute",
						// "value":"aOtherFinalValue"}' + '],'
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
QUnit
		.test(
				"client.DataHolder.testSetValueOneChildTwoAttributePathHasOnlyOneAttributeShouldNotSetValue",
				function() {
					var dataHolder = new DataHolder("groupIdOneTextChildTwoAttributes",
							this.metadataProvider, this.pubSub);
					throws(function() {
						dataHolder.setValue({
							"id" : "groupIdOneTextChildTwoAttributes",
							// + '"attributes":[{"key":"anAttribute",
							// "value":"aFinalValue"} '
							"attributes" : {
								"anAttribute" : "aFinalValue"
							}
							// + ',{"key":"anOtherAttribute",
							// "value":"aOtherFinalValue"}'
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
QUnit
		.test(
				"client.DataHolder.testAddRepeatOneGroupChildMinRepeatThreeChild",
				function() {
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
*/
