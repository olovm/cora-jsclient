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

QUnit.module("recordTypeHandlerViewTest.js", {
	beforeEach : function() {
		this.record = {
			"data" : {
				"children" : [ {
					"children" : [ {
						"name" : "id",
						"value" : "metadataCollectionItem"
					}, {
						"name" : "type",
						"value" : "recordType"
					}, {
						"name" : "createdBy",
						"value" : "userId"
					}, {
						"name" : "updatedBy",
						"value" : "userId"
					} ],
					"name" : "recordInfo"
				}, {
					"name" : "metadataId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemGroup"
						}
					]
				}, {
					"name" : "presentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemViewPGroup"
						}
					]
				}, {
					"name" : "presentationFormId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemFormPGroup"
						}
					]
				}, {
					"name" : "newMetadataId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "metadataGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemNewGroup"
						}
					]
				}, {
					"name" : "newPresentationFormId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemFormNewPGroup"
						}
					]
				}, {
					"name" : "menuPresentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemMenuPGroup"
						}
					]
				}, {
					"name" : "listPresentationViewId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "presentationGroup"
						},
						{
							"name": "linkedRecordId",
							"value": "metadataCollectionItemListPGroup"
						}
					]
				}, {
					"name" : "searchMetadataId",
					"value" : "metadataCollectionItemSearchGroup"
				}, {
					"name" : "searchPresentationFormId",
					"value" : "metadataCollectionItemFormSearchPGroup"
				}, {
					"name" : "userSuppliedId",
					"value" : "true"
				}, {
					"name" : "selfPresentationViewId",
					"value" : "metadataCollectionItemViewSelfPGroup"
				}, {
					"name" : "abstract",
					"value" : "false"
				}, {
					"name" : "parentId",
					"children": [
						{
							"name": "linkedRecordType",
							"value": "recordType"
						},
						{
							"name": "linkedRecordId",
							"value": "metadata"
						}
					]
				} ],
				"name" : "recordType"
			},
			"actionLinks" : {
				"search" : {
					"requestMethod" : "GET",
					"rel" : "search",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"read" : {
					"requestMethod" : "GET",
					"rel" : "read",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"update" : {
					"requestMethod" : "POST",
					"rel" : "update",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem",
					"accept" : "application/uub+record+json"
				},
				"create" : {
					"requestMethod" : "POST",
					"rel" : "create",
					"contentType" : "application/uub+record+json",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+record+json"
				},
				"list" : {
					"requestMethod" : "GET",
					"rel" : "list",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/",
					"accept" : "application/uub+recordList+json"
				},
				"delete" : {
					"requestMethod" : "DELETE",
					"rel" : "delete",
					"url" : "http://epc.ub.uu.se/cora/rest/record/recordType/"
							+ "metadataCollectionItem"
				}
			}
		};
	},
	afterEach : function() {
	}
});
QUnit.test("init", function(assert) {
	var viewSpec = {
		"headerText" : "some text",
		"fetchListMethod" : function(){}
	};
	var recordTypeHandlerView = CORA.recordTypeHandlerView(viewSpec);

	var view = recordTypeHandlerView.getView();
	assert.strictEqual(view.className, "recordType");

	var header = view.firstChild;
	assert.strictEqual(header.className, "header");
	assert.strictEqual(header.textContent, "some text");

	var buttonView = view.childNodes[1];
	assert.strictEqual(buttonView.className, "buttonView");
	
	var childrenView = view.childNodes[2];
	assert.strictEqual(childrenView.className, "childrenView");
	assert.strictEqual(buttonView.childNodes.length, 0);
});

QUnit.test("initWithCreateButton", function(assert) {
	var createNewMethodIsCalled = false;
	var presentationModeCalled;
	function createNewMethod(presentationMode){
		presentationModeCalled = presentationMode;
		createNewMethodIsCalled = true;
	}
	var viewSpec = {
			"headerText" : "some text",
			"fetchListMethod" : function(){},
			"createNewMethod":createNewMethod
	};
	var recordTypeHandlerView = CORA.recordTypeHandlerView(viewSpec);
	
	var view = recordTypeHandlerView.getView();
	
	var buttonView = view.childNodes[1];
	var createButton = buttonView.childNodes[0];
	assert.strictEqual(createButton.className, "createButton");
	var event = document.createEvent('Event');
	createButton.onclick(event);
	assert.strictEqual(presentationModeCalled, "new");
	assert.strictEqual(createNewMethodIsCalled, true);
});
