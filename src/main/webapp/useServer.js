/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
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
addStandardAppTokensToLoginMenu = true;
function start() {

	var href = window.location.href;
	if (href.indexOf("systemone") !== -1) {
		document.getElementById("systemOneCSS").disabled = false;
		useCora();
	} else if (href.indexOf("alvin") !== -1) {
		document.getElementById("alvinCSS").disabled = false;
		useAlvin();
	} else if (href.indexOf("diva") !== -1) {
		document.getElementById("divaCSS").disabled = false;
		useDiva();
	} else if (href.indexOf("localhost:8080") !== -1 ) {
		useLocalhostWithPort("8080", "SystemOne local dev");
	} else if (href.indexOf("localhost:8081") !== -1 ) {
		document.getElementById("alvinCSS").disabled = false;
		useLocalhostWithPort("8081","ALVIN local dev");
	} else if (href.indexOf("localhost:8082") !== -1 ) {
		document.getElementById("divaCSS").disabled = false;
		useLocalhostWithPort("8082", "DiVA local dev");
	} else if (href.indexOf("116:8080") !== -1) {
		useDevWithPort("8080", "SystemOne dev");
	} else if (href.indexOf("116:8081") !== -1) {
		document.getElementById("alvinCSS").disabled = false;
		useDevWithPort("8081", "ALVIN dev");
	} else if (href.indexOf("116:8082") !== -1) {
		document.getElementById("divaCSS").disabled = false;
		useDevWithPort("8082","DiVA dev");
	} else {
		askForServerToUse();
	}
}

function askForServerToUse() {
	var questionSpec = {
		"text" : "Vilken server vill du använda?",
		"buttons" : [ {
			"text" : "Uppsala Universitetsbibliotek",
			"onclickFunction" : useUb
		}, {
			"text" : "localhost",
			"onclickFunction" : useLocalhost
		}, {
			"text" : "localhost8089",
			"onclickFunction" : useLocalhost2
		}, {
			"text" : "ip from url",
			"onclickFunction" : useLocalhost3
		}, {
			"text" : "SystemOne",
			"onclickFunction" : useCora
		}, {
			"text" : "Alvin",
			"onclickFunction" : useAlvin
		}, {
			"text" : "DiVA",
			"onclickFunction" : useDiva
		} ]
	};
	var question = CORA.question(questionSpec);
	var questionView = question.getView();
	document.body.appendChild(questionView);
}

function useUb() {
	baseUrl = "http://epc.ub.uu.se/cora/rest/";
	appTokenBaseUrl = "http://epc.ub.uu.se/";
	startDependencies();
}

function useLocalhost() {
	appTokenBaseUrl = "http://localhost:8080/";
	baseUrl = "http://localhost:8080/therest/rest/";
	startDependencies();
}

function useLocalhostWithPort(port, nameIn) {
	name = nameIn;
	appTokenBaseUrl = "http://localhost:" + port + "/";
	baseUrl = "http://localhost:" + port + "/therest/rest/";
	startDependencies();
}
function useDevWithPort(port, nameIn) {
	name = nameIn;
	appTokenBaseUrl = "http://192.168.1.116:" + port + "/";
	baseUrl = "http://192.168.1.116:" + port + "/therest/rest/";
	startDependencies();
}

function useLocalhost2() {
	appTokenBaseUrl = "http://localhost:8089/";
	baseUrl = "http://localhost:8080/therest/rest/";
	startDependencies();
}
function useLocalhost3() {
	appTokenBaseUrl = "/";
	baseUrl = "/therest/rest/";
	startDependencies();
}
function useCora() {
	name = "Systemone";
	baseUrl = "https://cora.epc.ub.uu.se/systemone/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/systemone/";
	startDependencies();
}
function useAlvin() {
	name = "ALVIN";
	baseUrl = "https://cora.epc.ub.uu.se/alvin/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/alvin/";
	startDependencies();
}
function useDiva() {
	name = "DiVA";
	baseUrl = "https://cora.epc.ub.uu.se/diva/rest/";
	appTokenBaseUrl = "https://cora.epc.ub.uu.se/diva/";
	startDependencies();
}