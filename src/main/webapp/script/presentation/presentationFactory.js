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

		function factor(path, metadataIdUsedInData, cPresentation, cParentPresentation) {
			var specNew = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPresentation,
				"cParentPresentation" : cParentPresentation,
				"metadataProvider" : spec.metadataProvider,
				"pubSub" : spec.pubSub,
				"textProvider" : spec.textProvider,
				"jsBookkeeper" : spec.jsBookkeeper,
				"presentationFactory" : self,
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"recordGuiFactory" : spec.recordGuiFactory,
				"recordTypeProvider" : spec.recordTypeProvider,
				"uploadManager" : spec.uploadManager
			};

			var type = cPresentation.getData().attributes.type;
			if (type === "pVar") {
				return CORA.pVar(specNew);
			} else if (type === "pGroup") {
				return CORA.pGroup(specNew);
			} else if (type === "pRecordLink") {
				return CORA.pRecordLink(specNew);
			} else if (type === "pCollVar") {
				return CORA.pCollectionVar(specNew);
			} else if (type === "pResourceLink") {
				return CORA.pResourceLink(specNew);
			} else {
				var repeat = cPresentation.getData().attributes.repeat;
				if (repeat === "this") {
					return CORA.pRepeatingContainer(specNew);
				}
				return CORA.pSurroundingContainer(specNew);
			}
		}

		function getDataDivider() {
			return spec.dataDivider;
		}

		var out = Object.freeze({
			getDataDivider : getDataDivider,
			factor : factor
		});
		self = out;
		return out;

	};
	return cora;
}(CORA));