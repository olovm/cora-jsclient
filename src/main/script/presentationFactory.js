/*
 * Copyright 2016 Olov McKie
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
var CORA = (function(cora) {
	"use strict";
	cora.presentationFactory = function(spec) {
		var self;

		function factor(path, cPresentation) {
			var type = cPresentation.getData().attributes.type;
			if (type === "pVar") {
				var varSpec = {
					"path" : path,
					"cPresentation" : cPresentation,
					"metadataProvider" : spec.metadataProvider,
					"pubSub" : spec.pubSub,
					"textProvider" : spec.textProvider,
					"jsBookkeeper" : spec.jsBookkeeper
				};
				return CORA.pVar(varSpec);
			} else if (type === "pGroup") {
				var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
				var presentationId = CORA.coraData(recordInfo)
						.getFirstAtomicValueByNameInData("id");
				var groupSpec = {
					"path" : path,
					"presentationId" : presentationId,
					"metadataProvider" : spec.metadataProvider,
					"pubSub" : spec.pubSub,
					"textProvider" : spec.textProvider,
					"jsBookkeeper" : spec.jsBookkeeper,
					"presentationFactory" : self
				};
				return CORA.pGroup(groupSpec);
			} else {
				// container
				var containerType = cPresentation.getData().attributes.repeat;
				if (containerType === "children") {
					// surroundingContainer
				} else {
					// repeatingContainer
				}
			}
		}
		var out = Object.freeze({
			factor : factor
		});
		self = out;
		return out;

	};
	return cora;
}(CORA));