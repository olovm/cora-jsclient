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
	cora.indexListHandler = function(dependencies, spec) {
		var uploading = false;
		var uploadQue = [];
		var numberOfIndexRecords = 0;
		var indexOrderView;
		var indexHandler;


		function indexDataList(){
			var indexHandlerSpec = {
					"loadMethod" : indexingFinished,
					"timeoutMethod" :timeoutMethod
			};
			indexHandler = dependencies.indexHandlerFactory.factor(indexHandlerSpec);
			addIndexOrderView();
			for(var i=0; i<spec.dataList.data.length; i++){
				indexData(spec.dataList.data[i].record);
			}
		}

		function indexData(dataRecord) {
			uploadQue.push(dataRecord);
			possiblyStartNextUpload();
		}

		function indexingFinished() {
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
        
		function possiblyStartNextUpload() {
			if (getCurrentlyNotUploading()) {
				startNextUploadIfThereIsMoreInQueue();
			}
		}
        
		function getCurrentlyNotUploading() {
			return uploading !== true;
		}
        
		function startNextUploadIfThereIsMoreInQueue() {
			var dataRecord = uploadQue.shift();
			if (dataRecord !== undefined) {
				startNextUpload(dataRecord);
			}
		}
        
		function startNextUpload(dataRecord) {
			uploading = true;
			
			indexHandler.indexData(dataRecord);
		}
        
		//function handleCallError(error) {
		//	throw new Error("error indexing", error);
		//}
        //
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

		function createIndexOrderView(){
			indexOrderView = CORA.gui.createSpanWithClassName("indexOrder");
			indexOrderView.textContent = "Indexerat";
		}


		function getDependencies() {
			return dependencies;
		}

		function getSpec() {
			return spec;
		}

		//function getView(){
		//	return indexOrderView;
		//}

		var out = Object.freeze({
			"type" : "indexListHandler",
			getDependencies : getDependencies,
			getSpec : getSpec,
			indexDataList : indexDataList,
			indexingFinished : indexingFinished,
			timeoutMethod : timeoutMethod,
			//handleCallError : handleCallError,
			getNumberOfIndexedRecords : getNumberOfIndexedRecords
			//getView : getView
		});

		return out;
	};
	return cora;
}(CORA));