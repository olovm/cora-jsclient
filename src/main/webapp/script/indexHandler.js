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

		function indexData(dataRecord, viewToAppendTo) {
			var record = dataRecord;
			var indexLink = record.actionLinks.index;
			var loadMethod = getLoadMethod();
			var callSpec = {
				"url" : indexLink.url,
				"requestMethod" : indexLink.requestMethod,
				"accept" : indexLink.accept,
				"contentType" : indexLink.contentType,
				"data" : JSON.stringify(indexLink.body),
				"loadMethod" : loadMethod,
				"errorMethod" : handleCallError
			};
			uploadQue.push(callSpec);
			possiblyStartNextUpload();
		}
		
		function getLoadMethod(){
			return loadMethodIsSpecifiedInSpec() ? spec.loadMethod : uploadFinished;
		}

		function loadMethodIsSpecifiedInSpec(){
			return spec !== undefined && spec.loadMethod !== undefined;
		}
		function uploadFinished() {
			uploading = false;
			//view.deactivate();
			numberOfIndexRecords++;

			var child = CORA.gui.createSpanWithClassName("indexItem");
			if(indexOrderView === undefined){
				indexOrderView = CORA.gui.createSpanWithClassName("indexOrder");
			}
			child.textContent = numberOfIndexRecords;
			indexOrderView.appendChild(child);
			possiblyStartNextUpload();
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
			//view.activate();
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function handleCallError(error) {
			throw new Error("error indexing", error);
		}
		
		function getNumberOfIndexedRecords(){
			return numberOfIndexRecords;
		}

		function addIndexOrderView(){
			indexOrderView = CORA.gui.createSpanWithClassName("indexOrder");
			dependencies.uploadManager.view.getWorkView().appendChild(indexOrderView);
		}

		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			"type" : "indexHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			indexData : indexData,
			uploadFinished : uploadFinished,
			handleCallError : handleCallError,
			getNumberOfIndexedRecords : getNumberOfIndexedRecords,
			addIndexOrderView : addIndexOrderView
		});

		return out;
	};
	return cora;
}(CORA));