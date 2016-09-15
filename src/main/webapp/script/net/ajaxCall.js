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

		var defaultTimeoutMS = 50000;
		var xhr = factorXmlHttpRequestUsingFactoryFromSpec();
		addListenersToXmlHttpRequest();
		open();
		setTimeout();
		setHeadersSpecifiedInSpec();
		sendRequest();

		function factorXmlHttpRequestUsingFactoryFromSpec() {
			return spec.xmlHttpRequestFactory.factor();
		}

		function addListenersToXmlHttpRequest() {
			xhr.addEventListener("load", handleLoadEvent);
			xhr.addEventListener("error", createReturnObjectAndCallErrorMethodFromSpec);
			addDownloadProgressListnerIfSpecifiedInSpec();
			addUploadProgressListnerIfSpecifiedInSpec();
		}

		function handleLoadEvent() {
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
			return {
				"status" : xhr.status,
				"responseText" : xhr.responseText,
				"spec" : spec
			};
		}

		function createReturnObjectAndCallErrorMethodFromSpec() {
			spec.errorMethod(createReturnObject());
		}

		function addDownloadProgressListnerIfSpecifiedInSpec() {
			if (spec.downloadProgressMethod !== undefined) {
				xhr.addEventListener("progress", spec.downloadProgressMethod);
			}
		}

		function addUploadProgressListnerIfSpecifiedInSpec() {
			if (spec.uploadProgressMethod !== undefined) {
				xhr.upload.addEventListener("progress", spec.uploadProgressMethod);
			}
		}

		function open() {
			if (spec.method === "GET") {
				xhr.open(spec.method, spec.url + "?" + (new Date()).getTime());
			} else {
				xhr.open(spec.method, spec.url);
			}
		}

		function setTimeout() {
			xhr.timeout = spec.timeoutInMS ? spec.timeoutInMS : defaultTimeoutMS;
			xhr.addEventListener("timeout", handleTimeout);
		}

		function handleTimeout() {
			xhr.abort();
			spec.timeoutMethod(createReturnObject());
		}

		function setHeadersSpecifiedInSpec() {
			if (spec.accept !== undefined) {
				xhr.setRequestHeader("accept", spec.accept);
			}
			if (spec.contentType !== undefined) {
				xhr.setRequestHeader("content-type", spec.contentType);
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
			xhr : xhr
		});
		return out;
	};
	return cora;
}(CORA));