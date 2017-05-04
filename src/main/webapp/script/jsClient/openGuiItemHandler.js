/*
 * Copyright 2016, 2017 Uppsala University Library
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
	cora.openGuiItemHandler = function(dependencies, spec) {
		// var searchId = getIdFromRecord(spec.openGuiItem);

		var viewSpec = {
			"headerText" : dependencies.textProvider.getTranslation("theClient_openedText"),
		// "openSearchMethod" : openSearch
		};

		var view = dependencies.openGuiItemHandlerViewFactory.factor(viewSpec);

		// function getIdFromRecord(record) {
		// var cData = CORA.coraData(record.data);
		// var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
		// return cRecordInfo.getFirstAtomicValueByNameInData("id");
		// }

		function getView() {
			return view.getView();
		}

		// function openSearch() {
		// var searchHandlerSpec = {
		// "addToopenGuiItemHandlerMethod" : addManagedGuiItem,
		// "showViewMethod" : dependencies.jsClient.showView,
		// "removeViewMethod" : dependencies.jsClient.viewRemoved,
		// "metadataId" : getLinkValueFromopenGuiItem("metadataId"),
		// "presentationId" : getLinkValueFromopenGuiItem("presentationId")
		// };
		// possiblyAddSearchLinkToSpec(searchHandlerSpec);
		// dependencies.searchHandlerFactory.factor(searchHandlerSpec);
		// }
		//
		// function getLinkValueFromopenGuiItem(id) {
		// var copenGuiItemData = CORA.coraData(spec.openGuiItem.data);
		// var cRecordLink = CORA.coraData(copenGuiItemData.getFirstChildByNameInData(id));
		// return cRecordLink.getFirstAtomicValueByNameInData("linkedRecordId");
		// }
		//
		// function possiblyAddSearchLinkToSpec(searchHandlerSpec) {
		// searchHandlerSpec.searchLink = spec.openGuiItem.actionLinks.search;
		// }

		function addManagedGuiItem(managedGuiItem) {
			view.addManagedGuiItem(managedGuiItem);
		}

		function getSpec() {
			return spec;
		}

		function getDependencies() {
			return dependencies;
		}

		var out = Object.freeze({
			"type" : "openGuiItemHandler",
			getSpec : getSpec,
			getDependencies : getDependencies,
			getView : getView,
			// openSearch : openSearch,
			addManagedGuiItem : addManagedGuiItem
		});
		return out;
	};
	return cora;
}(CORA));