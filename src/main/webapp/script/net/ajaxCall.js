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
	cora.ajaxCall = function(spec) {

		var defaultTimeoutMS = 10000;
		var timeoutTime = spec.timeoutInMS ? spec.timeoutInMS : defaultTimeoutMS;
		var intervalId;
		var xhr = factorXmlHttpRequestUsingFactoryFromSpec();
		var intervalStart;
		var timeProgress;

		addListenersToXmlHttpRequest();
		open();
		setTimeout();
		setHeadersSpecifiedInSpec();
		setResponseTypeSpecifiedInSpec();
		sendRequest();

		function factorXmlHttpRequestUsingFactoryFromSpec() {
			return spec.xmlHttpRequestFactory.factor();
		}

		function addListenersToXmlHttpRequest() {
			xhr.addEventListener("load", handleLoadEvent);
			xhr.addEventListener("error", handleErrorEvent);
			addDownloadProgressListnerIfSpecifiedInSpec();
			xhr.addEventListener("progress", updateProgressTime);
			addUploadProgressListnerIfSpecifiedInSpec();
			xhr.upload.addEventListener("progress", updateProgressTime);
		}

		function handleLoadEvent() {
			window.clearInterval(intervalId);

			if (statusIsOk()) {
				createReturnObjectAndCallLoadMethodFromSpec();
			} else {
				createReturnObjectAndCallErrorMethodFromSpec();
			}
		}

		function statusIsOk() {
			return xhr.status === 200 || xhr.status === 201;
		}

		function createReturnObjectAndCallLoadMethodFromSpec() {
			spec.loadMethod(createReturnObject());
		}

		function createReturnObject() {
			var returnObject = {
				"spec" : spec,
				"status" : xhr.status,
				"response" : xhr.response
			};
			var responseType = spec.responseType;
			if(responseType===undefined ||responseType==='document'){
				returnObject.responseText = xhr.responseText;
			}
			return returnObject;
		}

		function handleErrorEvent() {
			window.clearInterval(intervalId);
			createReturnObjectAndCallErrorMethodFromSpec();
		}

		function createReturnObjectAndCallErrorMethodFromSpec() {
			spec.errorMethod(createReturnObject());
		}

		function addDownloadProgressListnerIfSpecifiedInSpec() {
			if (spec.downloadProgressMethod !== undefined) {
				xhr.addEventListener("progress", spec.downloadProgressMethod);
			}
		}

		function updateProgressTime() {
			timeProgress = performance.now();
		}

		function addUploadProgressListnerIfSpecifiedInSpec() {
			if (spec.uploadProgressMethod !== undefined) {
				xhr.upload.addEventListener("progress", spec.uploadProgressMethod);
			}
		}

		function open() {
			if (spec.requestMethod === "GET") {
				xhr.open(spec.requestMethod, spec.url + "?" + (new Date()).getTime());
			} else {
				xhr.open(spec.requestMethod, spec.url);
			}
			timeProgress = performance.now();
			intervalStart = performance.now();
		}

		function setTimeout() {
			intervalId = window.setInterval(handleTimeout, timeoutTime);
		}

		function handleTimeout() {
			var progressAfterStartTime = timeProgress - intervalStart;
			if (progressAfterStartTime > 0) {
				intervalStart = performance.now();
			} else {
				window.clearInterval(intervalId);
				xhr.abort();
				spec.timeoutMethod(createReturnObject());
			}
		}

		function setHeadersSpecifiedInSpec() {
			if (spec.requestHeaders) {
				var keys = Object.keys(spec.requestHeaders);
				for(let key of keys){
					xhr.setRequestHeader(key, spec.requestHeaders[key]);
				}
			}
		}
		function setResponseTypeSpecifiedInSpec() {
			if (spec.responseType) {
				xhr.responseType = spec.responseType;
			}
		}

		function sendRequest() {
			if (spec.data !== undefined) {
				xhr.send(spec.data);
			} else {
				xhr.send();
			}
		}

		var out = Object.freeze({
			"type":"ajaxCall",
			xhr : xhr,
			spec : spec
		});
		return out;
	};
	return cora;
}(CORA));