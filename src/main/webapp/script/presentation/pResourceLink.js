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
	cora.pResourceLink = function(dependencies, spec) {
		var cPresentation = spec.cPresentation;

		var my = {};
		var parent;
		var hasOutputFormat;
		var resourceView;

		function start() {
			initParent();
			hasOutputFormat = presentationHasOutputFormat();
			createResourceViewIfOutputFormatInMetadata();
			subscribeToLinkedResourceMessage();
		}

		function initParent() {
			my.metadataId = "metadataGroupForResourceLinkGroup";

			my.cPresentation = cPresentation;
			my.cParentPresentation = cPresentation;
			my.createBaseViewHolder = createBaseViewHolder;

			parent = CORA.pMultipleChildren(spec, my);
			parent.init();
		}

		function createBaseViewHolder() {
			var presentationId = parent.getPresentationId();
			return CORA.gui.createDivWithClassName("pResourceLink " + presentationId);
		}

		function presentationHasOutputFormat() {
			return cPresentation.containsChildWithNameInData("outputFormat");
		}

		function createResourceViewIfOutputFormatInMetadata() {
			if (hasOutputFormat) {
				createResourceViewFromOutputFormat();
			}
		}

		function createResourceViewFromOutputFormat() {
			var outputFormatType = cPresentation.getFirstAtomicValueByNameInData("outputFormat");
			if (outputFormatType === "image") {
				createImage();
			} else {
				createDownload();
			}
			setCommonAttributesOnResourceView();
		}

		function createImage() {
			resourceView = document.createElement("img");
		}

		function createDownload() {
			resourceView = document.createElement("a");
			resourceView.appendChild(document.createTextNode(spec.textProvider
					.getTranslation("resourceLinkDownloadText")));
			resourceView.target = "_blank";
		}

		function setCommonAttributesOnResourceView() {
			resourceView.className = "master";
			parent.getView().appendChild(resourceView);
		}

		function setInfoInLinkedResourceView(dataFromMsg) {
			if (hasOutputFormat) {
				var url = dataFromMsg.data.actionLinks.read.url;
				resourceView.href = url + "?" + getTokenRequestParameter();
				resourceView.src = url + "?" + getTokenRequestParameter();
			}
		}

		function getTokenRequestParameter() {
			var tokenRequestParamenter = "authToken=";
			tokenRequestParamenter += dependencies.authTokenHolder.getCurrentAuthToken();
			return tokenRequestParamenter;
		}

		function subscribeToLinkedResourceMessage() {
			spec.pubSub.subscribe("linkedResource", spec.path, undefined, handleMsg);
		}

		function handleMsg(dataFromMsg) {
			setInfoInLinkedResourceView(dataFromMsg);
		}

		function getView() {
			return parent.getView();
		}
		function getDependencies() {
			return dependencies;
		}
		var out = Object.freeze({
			"type" : "pResourceLink",
			getDependencies : getDependencies,
			getView : getView,
			handleMsg : handleMsg
		});
		start();
		return out;
	};
	return cora;
}(CORA));