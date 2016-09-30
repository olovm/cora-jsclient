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
var CORA = (function(cora) {
	"use strict";
	cora.pResourceLink = function(spec) {
		var cPresentation = spec.cPresentation;

		var my = {};
		var presentationGroup = cPresentation.getFirstChildByNameInData("presentationOf");
		var cPresentationGroup = CORA.coraData(presentationGroup);
		var resourceView;
		// my.metadataId =
		// cPresentationGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		// my.metadataId =
		// "fakeMetadataGroupWithStreamIdFilenameFilesizeMimeType";
		my.metadataId = "metadataGroupForResourceLinkGroup";

		my.cPresentation = cPresentation;
		my.cParentPresentation = cPresentation;
		my.createBaseViewHolder = createBaseViewHolder;

		var parent = CORA.pMultipleChildren(spec, my);
		parent.init();
		spec.pubSub.subscribe("linkedResource", spec.path, undefined, handleMsg);
		createOutputFormat();

		function createBaseViewHolder() {
			var presentationId = parent.getPresentationId();
			var newView = document.createElement("div");
			newView.className = "pResourceLink " + presentationId;
			return newView;
		}
		function handleMsg(dataFromMsg) {
			createLinkedResourceView(dataFromMsg);
		}
		function createOutputFormat() {
			var outputFormatType = cPresentation.getFirstAtomicValueByNameInData("outputFormat");
			if (outputFormatType === "image") {
				// var presentationOfGroup =
				// cPresentation.getFirstChildByNameInData("presentationOf");
				// var url = presentationOfGroup.actionLinks.read.url;
				 var image = document.createElement("img");
				// image.src = url;
				 parent.getView().appendChild(image);
				 resourceView = image;
			}
		}
		function createLinkedResourceView(dataFromMsg){
			var url = dataFromMsg.actionLinks.read.url;
			resourceView.src = url;
		}

		return Object.freeze({
			"type" : "pResourceLink",
			getView : parent.getView,
			handleMsg : handleMsg
		});

	};
	return cora;
}(CORA));