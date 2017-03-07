/*
 * Copyright 2016 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
	cora.pGroup = function(dependencies, spec) {
		var cPresentation = spec.cPresentation;

		var my = {};
		my.metadataId = spec.metadataIdUsedInData;

		my.cPresentation = cPresentation;
		my.cParentPresentation = cPresentation;
		my.createBaseViewHolder = createBaseViewHolder;

		var parent = CORA.pMultipleChildren(dependencies, spec, my);
		parent.init();

		function createBaseViewHolder() {
			var presentationId = parent.getPresentationId();
			return CORA.gui.createDivWithClassName("pGroup " + presentationId);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		return Object.freeze({
			"type" : "pGroup",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : parent.getView
		});

	};
	return cora;
}(CORA));