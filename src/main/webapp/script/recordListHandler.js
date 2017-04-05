/*
 * Copyright 2016 Uppsala University Library
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
	cora.recordListHandler = function(dependencies, spec) {
		var managedGuiItemSpec = {
			"handledBy" : function() {
			},
			"activateMethod" : spec.jsClient.showView,
			"removeMethod" : spec.jsClient.viewRemoved
		};
		var managedGuiItem = dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);

		spec.addToRecordTypeHandlerMethod(managedGuiItem);
		spec.jsClient.showView(managedGuiItem);

		var recordId = spec.recordTypeRecordId;

		addTextToMenuView();
		fetchDataFromServer(processFetchedRecords);

		function addTextToMenuView() {
			var menuPresentation = CORA.gui.createSpanWithClassName("");
			menuPresentation.textContent = "List";
			managedGuiItem.addMenuPresentation(menuPresentation);
		}

		function fetchDataFromServer(callAfterAnswer) {
			var listLink = spec.listLink;
			var callSpec = {
				"requestMethod" : listLink.requestMethod,
				"url" : listLink.url,
				"contentType" : listLink.contentType,
				"accept" : listLink.accept,
				"loadMethod" : callAfterAnswer,
				"errorMethod" : callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function processFetchedRecords(answer) {
			createRecordTypeListFromAnswer(answer);
		}

		function createRecordTypeListFromAnswer(answer) {
			var data = JSON.parse(answer.responseText).dataList.data;
			data.forEach(function(recordContainer) {
				tryToAddRecordToWorkView(recordContainer);
			});
		}

		function tryToAddRecordToWorkView(recordContainer) {
			try {
				addRecordToWorkView(recordContainer.record);
			} catch (e) {
				managedGuiItem.addWorkPresentation(document.createTextNode(e));
				managedGuiItem.addWorkPresentation(document.createTextNode(e.stack));
			}
		}

		function addRecordToWorkView(record) {
			var view = createView(record);
			managedGuiItem.addWorkPresentation(view);
			var recordTypeId = getRecordTypeId(record);
			var metadataId = spec.jsClient.getMetadataIdForRecordTypeId(recordTypeId);
			var presentationId = spec.listPresentationViewId;
			var dataDivider = getDataDividerFromData(record.data);
			var recordGui = dependencies.recordGuiFactory.factor(metadataId, record.data,
					dataDivider);

			var presentationView = recordGui.getPresentation(presentationId, metadataId).getView();
			recordGui.initMetadataControllerStartingGui();
			view.appendChild(presentationView);
		}
		function getRecordTypeId(record) {
			var cData = CORA.coraData(record.data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getFirstAtomicValueByNameInData("type");
		}

		function createView(record) {
			var newView = CORA.gui.createSpanWithClassName("listItem " + recordId);
			newView.onclick = function() {
// spec.createRecordHandlerMethod("view", record);
				createRecordHandler("view", record);
			};
			return newView;
		}
		
		function createRecordHandler(presentationMode, record) {
			var recordHandlerSpec = {
					"createRecordHandlerMethod" : createRecordHandler,
					"presentationMode" : presentationMode,
				"record" : record,
// "jsClient" : dependencies.jsClient,
				"jsClient" :spec.jsClient,
				"recordTypeHandler" : self,
// "addToRecordTypeHandlerMethod" : addManagedGuiItem,
				"addToRecordTypeHandlerMethod" : spec.addToRecordTypeHandlerMethod,
				"recordTypeRecordId" : recordId,
// "createLink" : spec.recordTypeRecord.actionLinks.create,
// "newMetadataId" : getRecordTypeRecordValueFromRecordLink("newMetadataId"),
// "newPresentationFormId" :
// getRecordTypeRecordValueFromRecordLink("newPresentationFormId"),
// "presentationViewId" :
// getRecordTypeRecordValueFromRecordLink("presentationViewId"),
// "presentationFormId" :
// getRecordTypeRecordValueFromRecordLink("presentationFormId"),
// "menuPresentationViewId" :
// getRecordTypeRecordValueFromRecordLink("menuPresentationViewId"),
// "abstract" :
// cRecordTypeRecordData.getFirstAtomicValueByNameInData("abstract")
				"createLink" : spec.createLink,
				"newMetadataId" : spec.newMetadataId,
				"newPresentationFormId" : spec.newPresentationFormId,
				"presentationViewId" : spec.presentationViewId,
				"presentationFormId" : spec.presentationFormId,
				"menuPresentationViewId" : spec.menuPresentationViewId,
				"abstract" : spec.abstract
			};
			dependencies.recordHandlerFactory.factor(recordHandlerSpec);
		}

		function getDataDividerFromData(data) {
			var cData = CORA.coraData(data);
			var cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			var cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		}

		function callError(answer) {
			var messageHolder = CORA.messageHolder();
			managedGuiItem.addWorkPresentation(messageHolder.getView());
			var messageSpec = {
				"message" : answer.status,
				"type" : CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}
		var out = Object.freeze({
			"type" : "recordListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			open : open,
			processFetchedRecords : processFetchedRecords
		});
		return out;
	};
	return cora;
}(CORA));