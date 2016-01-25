/*
 * Copyright 2016 Olov McKie
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

var CORA = (function(cora) {
	"use strict";
	/**
	 * <pre>
	 * 	 function constructor(spec){
	 * 	 	let {member} = spec, 
	 * 	 		{other} = other_contstructor(spec),
	 * 	 		method = function (){
	 * 	 			//member, other, method, spec
	 * 	 		};
	 * 	 	return Object.freeze({
	 * 	 		method, 
	 * 	 		other,
	 * 	 	});
	 * 	 }
	 * 	
	 * </pre>
	 */

	cora.textProvider = function(spec) {
		var metadataProvider = spec.metadataProvider;
		var lang = spec.lang;

		function getTranslation(textId) {

			var cTextElement = getMetadataById(textId);
			var attributes = {
				"name" : "attributes",
				"children" : [ {
					"name" : "attribute",
					"repeatId" : "1",
					"children" : [ {
						"name" : "attributeName",
						"value" : "type"
					}, {
						"name" : "attributeValue",
						"value" : "default"
					} ]
				}, {
					"name" : "attribute",
					"repeatId" : "1",
					"children" : [ {
						"name" : "attributeName",
						"value" : "lang"
					}, {
						"name" : "attributeValue",
						"value" : lang
					} ]
				} ]
			};
			var compactAttributes1 = [ {
				"name" : "type",
				"value" : "default"
			}, {
				"name" : "lang",
				"value" : "se"
			} ];
			var compactAttributes2 = [ {
				"type" : "default",
				"lang" : "se"
			} ];
			var textElement = cTextElement.getFirstChildByNameInDataAndAttributes("textPart",
					attributes);
			var cTextElement = new CORA.CoraData(textElement);
			var text = cTextElement.getFirstAtomicValueByNameInData("text");

			console.log("text: " + JSON.stringify(textElement));
			console.log("text: " + text);

			return text;
		}
		
		function getMetadataById(id) {
			return new CORA.CoraData(metadataProvider.getMetadataById(id));
		}
		
		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return cora;
}(CORA || {}));