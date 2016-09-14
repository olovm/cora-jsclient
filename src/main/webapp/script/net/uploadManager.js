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
	cora.uploadManager = function(spec) {
		var uploading = false;
		var uploadQue = [];
		var viewSpec = {
			"showWorkViewMethod" : spec.jsClient.showView
		};
		var view = CORA.uploadManagerView(viewSpec);

		spec.jsClient.addGlobalView(view.getItem().menuView);

		function upload(uploadSpec) {
			var uploadLink = uploadSpec.uploadLink;
			var formData = new FormData();
			formData.append("file", uploadSpec.file);
			// formData.append("userId", "aUserName");

			var callSpec = {
				"xmlHttpRequestFactory" : spec.xmlHttpRequestFactory,
				"method" : uploadLink.requestMethod,
				"url" : uploadLink.url,
				// "contentType" : uploadLink.contentType,
				"accept" : uploadLink.accept,
				"loadMethod" : uploadFinished,
				"errorMethod" : callError,
				"timeoutMethod" : callTimeout,
				"data" : formData,
				"timeoutInMS" : 60000,
				"uploadProgressMethod" : progressMethod
			};
			uploadQue.push(callSpec);
			view.addFile(uploadSpec.file.name);
			possiblyStartNextUpload();

		}
		function progressMethod(progressEvent) {
			console.log("upload progress in uploadManager");
			console.log(progressEvent);
		}
		function uploadFinished() {
			uploading = false;
			view.deactivate();
			possiblyStartNextUpload();
		}
		function possiblyStartNextUpload() {
			if (uploading !== true) {
				var callSpec = uploadQue.pop();
				if (callSpec !== undefined) {
					uploading = true;
					view.activate();
					CORA.ajaxCall(callSpec);
				}
			}
		}
		function callError() {

		}
		function callTimeout() {

		}
		var out = Object.freeze({
			upload : upload,
			view : view
		});

		return out;
	};

	return cora;
}(CORA));