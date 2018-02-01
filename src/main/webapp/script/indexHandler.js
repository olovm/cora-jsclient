/*
 * Copyright 2018 Uppsala University Library
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
	cora.indexHandler = function(dependencies, spec) {
		var uploading = false;
		var uploadQue = [];
		var numberOfIndexRecords = 0;
		var indexOrderView;

		function indexData(dataRecord) {
			var record = dataRecord;
			var indexLink = record.actionLinks.index;

			var callSpec = {
				"url" : indexLink.url,
				"requestMethod" : indexLink.requestMethod,
				"accept" : indexLink.accept,
				"contentType" : indexLink.contentType,
				"data" : JSON.stringify(indexLink.body),
				"loadMethod" : spec.loadMethod,
				"errorMethod" : handleCallError,
				"timeoutMethod" : spec.timeoutMethod
			};
			uploadQue.push(callSpec);
			possiblyStartNextUpload();
		}

		function uploadFinished() {
			uploading = false;
			numberOfIndexRecords++;

			var child = CORA.gui.createSpanWithClassName("indexItem");
			if(indexOrderView === undefined){
				createIndexOrderView();
			}
			child.textContent = numberOfIndexRecords;
			indexOrderView.appendChild(child);
			possiblyStartNextUpload();
		}

		function createIndexOrderView(){
			indexOrderView = CORA.gui.createSpanWithClassName("indexOrder");
			indexOrderView.textContent = "Indexerat";
		}

		function possiblyStartNextUpload() {
			if (getCurrentlyNotUploading()) {
				startNextUploadIfThereIsMoreInQueue();
			}
		}

		function getCurrentlyNotUploading() {
			return uploading !== true;
		}

		function startNextUploadIfThereIsMoreInQueue() {
			var callSpec = uploadQue.shift();
			if (callSpec !== undefined) {
				startNextUpload(callSpec);
			}
		}

		function startNextUpload(callSpec) {
			uploading = true;
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function handleCallError(error) {
			throw new Error("error indexing", error);
		}

		function timeoutMethod(){
			var child = CORA.gui.createSpanWithClassName("indexItem");
			child.textContent = "TIMEOUT";
			indexOrderView.appendChild(child);

		}

		function getNumberOfIndexedRecords(){
			return numberOfIndexRecords;
		}

		function addIndexOrderView(){
			createIndexOrderView();
			var indexOrders  = dependencies.uploadManager.view.getWorkView().firstChild;
			indexOrders.appendChild(indexOrderView);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		function getView(){
			return indexOrderView;
		}

		var out = Object.freeze({
			"type" : "indexHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			indexData : indexData,
			uploadFinished : uploadFinished,
			handleCallError : handleCallError,
			getNumberOfIndexedRecords : getNumberOfIndexedRecords,
			addIndexOrderView : addIndexOrderView,
			getView : getView
		});

		return out;
	};
	return cora;
}(CORA));