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
			var textPart = cTextElement.getFirstChildByNameInDataAndAttributes("textPart",
					attributes);
			var cTextPart = CORA.coraData(textPart);
			var text = cTextPart.getFirstAtomicValueByNameInData("text");

			return text;
		}

		function getMetadataById(id) {
			return CORA.coraData(metadataProvider.getMetadataById(id));
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return cora;
}(CORA || {}));