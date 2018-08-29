/*
 * Copyright 2016, 2018 Uppsala University Library
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
	cora.pMap = function(dependencies, spec) {
		var view;
		var cPresentation = spec.cPresentation;
		var presentationId;

		function start() {
			presentationId = getPresentationId();
			view = createBaseViewHolder();
			addInfoToView();
		}
		// var cPresentation = spec.cPresentation;
		// var cParentPresentation = spec.cParentPresentation;
		//
		// var my = {};
		// my.metadataId = spec.metadataIdUsedInData;
		//
		// my.cPresentation = cPresentation;
		// my.cParentPresentation = cParentPresentation;
		// my.createBaseViewHolder = createBaseViewHolder;
		//
		// var parent = CORA.pMultipleChildren(dependencies, spec, my);
		// parent.init();
		//
		function getPresentationId() {
			var recordInfo = cPresentation.getFirstChildByNameInData("recordInfo");
			return CORA.coraData(recordInfo).getFirstAtomicValueByNameInData("id");
		}

		function createBaseViewHolder() {
			return CORA.gui.createSpanWithClassName("pMap " + presentationId);
		}

		function addInfoToView() {
			var createdInfo = createInfo();
			view.appendChild(createdInfo.getButton());
		}
		function createInfo() {
			var infoSpec = {
			// "insertAfter" is set to infoButton below
			// "afterLevelChange" : updateClassName,
			// "level1" : [ {
			// "className" : "textView",
			// "text" : spec.info.text
			// }, {
			// "className" : "defTextView",
			// "text" : spec.info.defText
			// } ]
			};
			// possiblyAddLevel2Info(infoSpec);

			var newInfo = dependencies.infoFactory.factor(infoSpec);
			// infoSpec.insertBefore = childrenView;
			infoSpec.insertAfter = newInfo.getButton();
			return newInfo;
		}

		function getView() {
			return view;
		}

		var out = Object.freeze({
			"type" : "pMap",
			getView : getView
		});
		start();
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORA));