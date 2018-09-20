/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
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
	cora.pSurroundingContainer = function(dependencies, spec) {
		var cPresentation = spec.cPresentation;
		var cParentPresentation = spec.cParentPresentation;

		var my = {};
		my.metadataId = spec.metadataIdUsedInData;

		my.cPresentation = cPresentation;
		my.cParentPresentation = cParentPresentation;
		my.createBaseViewHolder = createBaseViewHolder;

		var parent = CORA.pMultipleChildren(dependencies, spec, my);
		parent.init();

		function createBaseViewHolder() {
			var presentationStyle = getPresentationStyle();
			var presentationId = parent.getPresentationId();
			return CORA.gui.createSpanWithClassName("pSurroundingContainer " + presentationStyle
					+ presentationId);
		}

		function getPresentationStyle() {
			if (cPresentation.containsChildWithNameInData("presentationStyle")) {
				return cPresentation.getFirstAtomicValueByNameInData("presentationStyle") + " ";
			}
			return "";
		}

		var out = Object.freeze({
			"type" : "pSurroundingContainer",
			getView : parent.getView
		});
		parent.getView().modelObject = out;
		return out;
	};
	return cora;
}(CORA));