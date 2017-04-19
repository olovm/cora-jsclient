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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recordWithoutUpdateOrDeleteLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
				}, {
					"name" : "type",
					"value" : "textSystemOne"
				}, {
					"name" : "createdBy",
					"value" : "userId"
				},
		        {
			          "children": [
			            {
			              "name": "linkedRecordType",
			              "value": "system"
			            },
			            {
			              "name": "linkedRecordId",
			              "value": "cora"
			            }
			          ],
			          "actionLinks": {
			            "read": {
			              "requestMethod": "GET",
			              "rel": "read",
			              "url": "http://localhost:8080/therest/rest/record/system/cora",
			              "accept": "application/vnd.uub.record+json"
			            }
			          },
			          "name": "dataDivider"
			        } ],
				"name" : "recordInfo"
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "En text på både svenska och engelska"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				}
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "A text both in english and swedish"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "alternative",
					"lang" : "en"
				}
			} ],
			"name" : "text"
		},
		"actionLinks" : {
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
			}
		}
	};
	coraTest.recordWithoutDeleteLink = {
		"data" : {
			"children" : [ {
				"children" : [ {
					"name" : "id",
					"value" : "svEnText"
				}, {
					"name" : "type",
					"value" : "textSystemOne"
				}, {
					"name" : "createdBy",
					"value" : "userId"
				},
		        {
			          "children": [
			            {
			              "name": "linkedRecordType",
			              "value": "system"
			            },
			            {
			              "name": "linkedRecordId",
			              "value": "cora"
			            }
			          ],
			          "actionLinks": {
			            "read": {
			              "requestMethod": "GET",
			              "rel": "read",
			              "url": "http://localhost:8080/therest/rest/record/system/cora",
			              "accept": "application/vnd.uub.record+json"
			            }
			          },
			          "name": "dataDivider"
			        } ],
				"name" : "recordInfo"
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "En text på både svenska och engelska"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				}
			}, {
				"children" : [ {
					"name" : "text",
					"value" : "A text both in english and swedish"
				} ],
				"name" : "textPart",
				"attributes" : {
					"type" : "alternative",
					"lang" : "en"
				}
			} ],
			"name" : "text"
		},
		"actionLinks" : {
			"update" : {
				"requestMethod" : "POST",
				"rel" : "update",
				"contentType" : "application/vnd.uub.record+json",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
			},
			"read" : {
				"requestMethod" : "GET",
				"rel" : "read",
				"url" : "http://epc.ub.uu.se/cora/rest/record/textSystemOne/svEnText",
				"accept" : "application/vnd.uub.record+json"
			}
		}
	};
	return coraTest;
}(CORATEST));