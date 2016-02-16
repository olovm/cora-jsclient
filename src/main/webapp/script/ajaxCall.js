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

		// xhr.open(spec.method, spec.url + "?" + (new Date()).getTime(), true);
		xhr.open(spec.method, spec.url);

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

		function loadListener(event) {
			if (xhr.status === 200 || xhr.status === 201) {
				spec.loadMethod(xhr);
			} else {
				spec.errorMethod(xhr);
			}
		}
		function timeoutListener(event) {
			xhr.abort();
			spec.timeoutMethod(xhr);
		}

		function errorListener(event) {
			console.log(event)
			spec.errorMethod(xhr);

		}

		var out = Object.freeze({
		// childRemoved : childRemoved
		});
		return out;
	};
	return cora;
}(CORA));

function reqListener() {
	console.log(this.responseText);
	console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOT HERE");
}
var oReq = new XMLHttpRequest();
function test2() {
	oReq.addEventListener("load", reqListener);
	oReq.addEventListener("load", transferComplete);
	oReq.addEventListener("progress", updateProgress);
	oReq.addEventListener("error", transferFailed);
	oReq.addEventListener("abort", transferCanceled);
	// oReq.responseType = "json";
	// oReq.open("GET", "http://epc.ub.uu.se/cora/rest/record/recordType");
	// oReq.open("GET", "http://localhost:8080/therest/rest/record/recordType?"
	// + (new Date()).getTime());
	// oReq.open("GET",
	// "http://130.238.171.39:8080/therest/rest/record/recordType?"
	// + (new Date()).getTime());
	oReq.open("GET", "http://130.238.171.39:8080/therest/rest/record/recordType");
	oReq.setRequestHeader("accept", "application/uub+recordList+json");
	// oReq.setRequestHeader("accept", "application/uub+record+json");
	// oReq.setRequestHeader("Content-Type", "application/uub+record+json");
	// oReq.setRequestHeader("Content-Type", "application/json");
	// oReq.setRequestHeader("Content-Type",
	// "application/x-www-form-urlencoded");
	// oReq.setRequestHeader("Origin", "localhost");
	// oReq.open("GET",
	// "http://epc.ub.uu.se/cora/rest/record/recordType/textSystemOne");
	// oReq.open("GET", "http://google.com");
	// oReq.overrideMimeType("text/plain; charset=x-user-defined");
	oReq.send();
}
// progress on transfers from the server to the client (downloads)
function updateProgress(oEvent) {
	// if (oEvent.lengthComputable) {
	// var percentComplete = oEvent.loaded / oEvent.total;
	// // ...
	// } else {
	// // Unable to compute progress information since the total size is
	// // unknown
	// }
}

function transferComplete(evt) {
	console.log("The transfer is complete.");
}

function transferFailed(evt) {
	console.log("An error occurred while transferring the file.");
	console.log(evt)
	console.log(oReq.statusText)
	console.log(oReq.status)
}

function transferCanceled(evt) {
	console.log("The transfer has been canceled by the user.");
}