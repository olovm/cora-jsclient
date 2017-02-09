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
	cora.uploadManager = function(dependencies, spec) {
		var uploading = false;
		var uploadQue = [];
		var viewSpec = {
			"showWorkViewMethod" : spec.showView,
			"textProvider" : dependencies.textProvider
		};
		var view = CORA.uploadManagerView(viewSpec);

		spec.addView(view.getItem().menuView);

		function upload(uploadSpec) {
			var uploadLink = uploadSpec.uploadLink;
			var formData = new FormData();
			formData.append("file", uploadSpec.file);

			var fileView = view.addFile(uploadSpec.file.name);
			var callSpec = {
				"requestMethod" : uploadLink.requestMethod,
				"url" : uploadLink.url,
				"accept" : uploadLink.accept,
				"loadMethod" : uploadFinished,
				"errorMethod" : fileView.errorMethod,
				"timeoutMethod" : fileView.timeoutMethod,
				"data" : formData,
				// long time needed as time between last progress and answer can
				// be long (flusing)
				"timeoutInMS" : 600000,
				"uploadProgressMethod" : fileView.progressMethod
			};
			uploadQue.push(callSpec);
			possiblyStartNextUpload();

		}

		function uploadFinished() {
			uploading = false;
			view.deactivate();
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
			view.activate();
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		var out = Object.freeze({
			upload : upload,
			view : view,
			uploadFinished : uploadFinished
		});

		return out;
	};

	return cora;
}(CORA));