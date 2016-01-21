/*
 * Copyright 2016 Uppsala University Library
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

var CORA = (function(cora) {
	"use strict";
	cora.Variable = function(newPath, metadataId, mode, metadataProvider, pubSub) {
		var view = createBaseView(this);
		var input = createInput(this);
		view.appendChild(input);

		function createBaseView(variableFunction) {
			var view = document.createElement("span");
			return view;
		}
		function createInput(variableFunction) {
			var inputNew = document.createElement("input");
			inputNew.type = "text";
			inputNew.id = "id";
			inputNew.modelObject = variableFunction;
			return inputNew;
		}

		this.getView = function() {
			return view;
		};

		this.setValue = function(value) {
			input.value = value;
		};
	};
	return cora;
}(CORA || {}));