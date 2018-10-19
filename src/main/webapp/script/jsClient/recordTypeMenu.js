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
	cora.recordTypeMenu = function(providers, dependencies, spec) {

		var recordTypeProvider = providers.recordTypeProvider;
		var textProvider = providers.textProvider;
		var metadataProvider = providers.metadataProvider;

		var out;
		var recordTypeGroups = [];
		var jsClient;

		function start() {
		}

		function getRecordTypeGroups(jsClientIn) {
			jsClient = jsClientIn;
			createAndAddGroupOfRecordTypesToList();
			return recordTypeGroups;
		}

		function createAndAddGroupOfRecordTypesToList() {
			recordTypeGroups = [];
			var cGroupOfRecordTypesCollection = CORA.coraData(metadataProvider
					.getMetadataById("groupOfRecordTypeCollection"));
			if (cGroupOfRecordTypesCollection
					.containsChildWithNameInData("collectionItemReferences")) {
				var cItemReferences = CORA.coraData(cGroupOfRecordTypesCollection
						.getFirstChildByNameInData("collectionItemReferences"));
				var refs = cItemReferences.getChildrenByNameInData("ref");
				createAndAddGroupOfRecordTypesToListForAllGroups(refs);
			}
		}

		function createAndAddGroupOfRecordTypesToListForAllGroups(refs) {
			refs.forEach(function(ref) {
				var cRef = CORA.coraData(ref);
				var itemId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
				possiblyCreateAndAddGroupOfRecordTypesToListForOneGroup(itemId);
			});
		}

		function possiblyCreateAndAddGroupOfRecordTypesToListForOneGroup(itemId) {
			var group = CORA.gui.createSpanWithClassName("recordTypeGroup");
			var cItem = CORA.coraData(metadataProvider.getMetadataById(itemId));

			var groupId = cItem.getFirstAtomicValueByNameInData("nameInData");
			var recordTypeForGroupList = recordTypeProvider.getRecordTypesByGroupId(groupId);
			
			if(recordTypeGroupHasChildren(recordTypeForGroupList)){
				var groupHeadline = createTranslatedGroupHeadline(cItem);
				group.appendChild(groupHeadline);
				createAndAddGroupOfRecordTypesToListForOneGroup(recordTypeForGroupList, group);
				recordTypeGroups.push(group);
			}
		}
		
		function recordTypeGroupHasChildren(recordTypeForGroupList){
			return recordTypeForGroupList.length > 0;
		}

		function createTranslatedGroupHeadline(cItem) {
			var groupHeadline = CORA.gui.createSpanWithClassName("recordTypeGroupHeadline");
			var cTextIdGroup = CORA.coraData(cItem.getFirstChildByNameInData("textId"));
			var textId = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			groupHeadline.innerHTML = textProvider.getTranslation(textId);
			return groupHeadline;
		}
		
		function createAndAddGroupOfRecordTypesToListForOneGroup(recordTypeForGroupList, group){
			recordTypeForGroupList.forEach(function(recordType) {
				var recordTypeHandler = createRecordTypeHandlerForRecord(recordType);
				if (recordTypeHandler.hasAnyAction()) {
					group.appendChild(recordTypeHandler.getView());
				}
			});
		}

		function createRecordTypeHandlerForRecord(record) {
			var specRecord = {
				"jsClient" : jsClient,
				"recordTypeRecord" : record,
				"baseUrl" : spec.baseUrl
			};
			return dependencies.recordTypeHandlerFactory.factor(specRecord);
		}

		function getProviders() {
			return providers;
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "recordTypeMenu",
			getProviders : getProviders,
			getDependencies : getDependencies,
			getSpec : getSpec,
			getRecordTypeGroups : getRecordTypeGroups
		});
		start();

		return out;

	};
	return cora;
}(CORA));