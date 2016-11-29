/*
 * Copyright 2016 Olov McKie
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
	coraTest.loginManagerSpy = function() {
		var currentAuthTokenExists = true;

		function getCurrentAuthToken() {
			// for now hard coded to fitnesseAdminToken
			return "fitnesseAdminToken";
		}
		function hasCurrentAuthToken() {
			return currentAuthTokenExists;
		}
		function setCurrentAuthTokenExists(exists) {
			currentAuthTokenExists = exists;
		}
		var out = Object.freeze({
			"type" : "loginManagerSpy",
			getCurrentAuthToken : getCurrentAuthToken,
			hasCurrentAuthToken : hasCurrentAuthToken,
			setCurrentAuthTokenExists : setCurrentAuthTokenExists
		});
		return out;
	};
	return coraTest;
}(CORATEST));
