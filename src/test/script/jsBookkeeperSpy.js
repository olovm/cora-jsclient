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
	coraTest.jsBookkeeperSpy = function() {
		var dataArray = [];
		var addDataArray = [];
		var removeDataArray = [];
		var moveDataArray = [];

		function setValue(data) {
			dataArray.push(data);
		}

		function getDataArray() {
			return dataArray;
		}
		
		function add(data){
			addDataArray.push(data);
		}
		
		function getAddDataArray() {
			return addDataArray;
		}
		
		function remove(data){
			removeDataArray.push(data);
		}
		function getRemoveDataArray() {
			return removeDataArray;
		}
		
		function move(data){
			moveDataArray.push(data);
		}
		function getMoveDataArray() {
			return moveDataArray;
		}
		
		
		return Object.freeze({
			setValue : setValue,
			getDataArray : getDataArray,
			add:add,
			getAddDataArray : getAddDataArray,
			getRemoveDataArray:getRemoveDataArray,
			remove:remove,
			move:move,
			getMoveDataArray:getMoveDataArray
		});
	};
	return coraTest;
}(CORATEST || {}));