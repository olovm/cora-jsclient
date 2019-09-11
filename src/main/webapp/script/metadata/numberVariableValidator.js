/*
 * Copyright 2018 Uppsala University Library
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
	cora.numberVariableValidator = function(dependencies) {
		var value;
		var cMetadataElement;
		
		function validateData(valueIn, cMetadataElementIn){
			value = valueIn;
			cMetadataElement = cMetadataElementIn;
			if(isNaN(value) || value===""){
				return false;
			}
			return valueIsBetweenMinAndMax(value);
		}
		
		function valueIsBetweenMinAndMax(valueIn, cMetadataElementIn) {
					if (valueBetweenMinAndMax(value)
					&& valueHasCorrectNumberOfDecimals(value)) {
				return true;
			} 
			return false;
		}
		
		function valueBetweenMinAndMax(value){
			var max = cMetadataElement.getFirstAtomicValueByNameInData("max");
			var min = cMetadataElement.getFirstAtomicValueByNameInData("min");
			if(valueAboveMax(value, max) || valueBelowMin(value, min)){
				return false;
			}
			return true;
		}
		
		function valueAboveMax(value, max){
			return parseFloat(value) > parseFloat(max);
		}
		
		function valueBelowMin(value, min){
			return parseFloat(value)  < parseFloat(min);
		}
		
		function valueHasCorrectNumberOfDecimals(value){
			var numberOfDecimals = cMetadataElement.getFirstAtomicValueByNameInData("numberOfDecimals");
			if(valueHasDecimals(value)){
				return handleValueWithDecimals(value, numberOfDecimals);
			}
			return numberOfDecimals === "0";
		}
		
		function valueHasDecimals(value){
			var splittedString = value.split('.');
			return splittedString[1] !== undefined;
		}
		
		function handleValueWithDecimals(value, numberOfDecimals){
			var splittedString = value.split('.');
			var actualNumOfDecimals = splittedString[1].length;
			return actualNumOfDecimals === Number(numberOfDecimals);
		}

		function getDependencies(){
			return dependencies;
		}

		var out = Object.freeze({
			type: "numberVariableValidator",
			validateData: validateData,
			getDependencies: getDependencies
		});
		return out;
	};
	return cora;
}(CORA));