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
	coraTest.pRepeatingElementSpy = function() {
		var view = document.createElement("span");
		var parentModelObject;
		var path;
		// var dataTransfer = function() {
		// var format = "";
		// var data = "";
		// function setData(formatIn, dataIn) {
		// format = formatIn;
		// data = dataIn;
		// // console.log(formatIn + dataIn)
		// }
		// function getFormat(){
		// return format;
		// }
		// function getData(){
		// return data;
		// }
		// return {
		// setData : setData,
		// getFormat : getFormat,
		// getData : getData
		// };
		// }();

		function getView() {
			return view;
		}
		function ondragenter() {
			parentModelObject.setRepeatingElementDragOver(view.modelObject);
		}
		function setParentModelObject(pMO) {
			parentModelObject = pMO;
		}
		function getPath() {
			return path;
		}
		function setPath(p) {
			path = p;
		}
		// return Object.freeze({
		var out = ({
			getView : getView,
			ondragenter : ondragenter,
			setParentModelObject : setParentModelObject,
			getPath : getPath,
			setPath : setPath
		});
		view.modelObject = out;
		view.ondragenter = out.ondragenter;
		return out;
	};
	return coraTest;
}(CORATEST || {}));