/*
 * Copyright 2017 Olov McKie
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
	cora.incomingLinksListHandlerView = function(dependencies, spec) {
		var view;
		var incomingLinks;

		function start() {
			view = createView();
			createincomingLinks();
		}

		function createView() {
			return CORA.gui.createSpanWithClassName("incomingLinksList");
		}

		function createincomingLinks() {
			incomingLinks = CORA.gui.createSpanWithClassName("incomingLinks");
			view.appendChild(incomingLinks);
		}

		function addIncomingLink(incomingLink) {
			var incomingLinkView = CORA.gui.createSpanWithClassName("incomingLink");
			incomingLinks.appendChild(incomingLinkView);

			var recordTypeView = CORA.gui.createSpanWithClassName("recordType");
			recordTypeView.textContent = incomingLink.linkedRecordType;
			incomingLinkView.appendChild(recordTypeView);

			var recordIdView = CORA.gui.createSpanWithClassName("recordId");
			recordIdView.textContent = incomingLink.linkedRecordId;
			incomingLinkView.appendChild(recordIdView);
		}

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		start();
		return Object.freeze({
			"type" : "incomingLinksListHandlerView",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			addIncomingLink : addIncomingLink
		});
	};
	return cora;
}(CORA));