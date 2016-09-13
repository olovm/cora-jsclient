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
		var xhr = spec.xmlHttpRequestFactory.factor();
		var defaultTimeoutMS = 5000;

		xhr.addEventListener("load", loadListener);
		xhr.addEventListener("error", errorListener);

		if (spec.method === "GET") {
			xhr.open(spec.method, spec.url + "?" + (new Date()).getTime());
		} else {
			xhr.open(spec.method, spec.url);
		}

		xhr.timeout = spec.timeoutInMS ? spec.timeoutInMS : defaultTimeoutMS;
		if (spec.accept !== undefined) {
			xhr.setRequestHeader("accept", spec.accept);
		}
		if (spec.contentType !== undefined) {
			xhr.setRequestHeader("content-type", spec.contentType);
		}
		xhr.addEventListener("timeout", timeoutListener);
		if (spec.data !== undefined) {
			xhr.send(spec.data);
		} else {
			xhr.send();
		}

		function loadListener() {
			if (xhr.status === 200 || xhr.status === 201) {
				spec.loadMethod(createReturnObject());
			} else {
				spec.errorMethod(createReturnObject());
			}
		}

		function timeoutListener() {
			xhr.abort();
			spec.timeoutMethod(createReturnObject());
		}

		function errorListener() {
			spec.errorMethod(createReturnObject());
		}

		function createReturnObject() {
			return {
				"status" : xhr.status,
				"responseText" : xhr.responseText,
				"spec":spec
			};
		}
		var out = Object.freeze({});
		return out;
	};
	return cora;
}(CORA));