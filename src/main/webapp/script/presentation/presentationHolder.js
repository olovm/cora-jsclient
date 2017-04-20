/*
 * Copyright 2016 Uppsala University Library
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
	cora.presentationHolder = function(spec) {
		var presentationId = spec.presentationId;
		var metadataProvider = spec.metadataProvider;
		var pubSub = spec.pubSub;
		var presentationFactory = spec.presentationFactory;

		var view = createBaseView();

		function createBaseView() {
			var viewNew = createBaseViewHolder();
			viewNew.appendChild(createViewForTopPGroup());
			return viewNew;
		}

		function createBaseViewHolder() {
			return CORA.gui.createDivWithClassName("presentation " + presentationId);
		}

		function createViewForTopPGroup() {
			var cPresentation = CORA.coraData(metadataProvider.getMetadataById(presentationId));
			var metadataIdUsedInData = spec.metadataIdUsedInData;
			var presentation = presentationFactory.factor({}, metadataIdUsedInData, cPresentation,
					undefined);
			return presentation.getView();
		}

		function getPresentationId() {
			return presentationId;
		}

		function getPubSub() {
			return pubSub;
		}

		function getView() {
			return view;
		}

		function getSpec() {
			return spec;
		}

		return Object.freeze({
			"type" : "presentationHolder",
			getSpec : getSpec,
			getPresentationId : getPresentationId,
			getPubSub : getPubSub,
			getView : getView
		});

	};
	return cora;
}(CORA));