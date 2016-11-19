/*
 * Copyright 2016 Olov McKie
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
	coraTest.pVarViewSpy = function(spec) {
		var addedViews = [];
		var addedToolViews = [];
		var showDataF = null;
		var view = document.createElement("span");
		function getView() {
			return view;
		}


		function getSpec() {
			return spec;
		}

		var out = Object.freeze({
			getView : getView,
			getSpec : getSpec
		});
		return out;
	};
	return coraTest;
}(CORATEST));
