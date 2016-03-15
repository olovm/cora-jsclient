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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.xmlHttpRequestSpy = function(sendFunction) {
		var addedEventListeners = [];
		var addedRequestHeaders = [];
		var openMethod="";
		var openUrl;
		var sendWasCalled = false;
		var sentData;
		var timeout = 0;
		var status = 0;
		var abortWasCalled = false;
		var responseText;

		function addEventListener(type, listener) {
			if (addedEventListeners[type] === undefined) {
				addedEventListeners[type] = [];
			}
			addedEventListeners[type].push(listener);
		}

		function open(method, url) {
			openMethod = method;
			openUrl = url;
		}
		
		function getOpenUrl(){
			return openUrl;
		}
		function getOpenMethod(){
			return openMethod;
		}
		function setRequestHeader(header, value) {
			if (addedRequestHeaders[header] === undefined) {
				addedRequestHeaders[header] = [];
			}
			addedRequestHeaders[header].push(value);
		}
		
		function send(data) {
			sendWasCalled = true;
			sentData = data;
			sendFunction();
		}
		function getSentData(){
			return sentData;
		}

		function abort(){
			abortWasCalled = true;
		}
		
		function getSendWasCalled(){
			return sendWasCalled;
		}
		function setSendWasCalled(sendWasCalledIn){
			sendWasCalled = sendWasCalledIn;
		}

		var out = {
			timeout:timeout,
			status:status,
			addEventListener : addEventListener,
			addedEventListeners : addedEventListeners,
			open : open,
			setRequestHeader:setRequestHeader,
			addedRequestHeaders:addedRequestHeaders,
			getOpenMethod : getOpenMethod,
			getOpenUrl : getOpenUrl,
			send : send,
			getSentData : getSentData,
			getSendWasCalled:getSendWasCalled,
			setSendWasCalled:setSendWasCalled,
			abort:abort,
			abortWasCalled:abortWasCalled,
			responseText:responseText
		};
		return out;
	};
	return coraTest;
}(CORATEST));