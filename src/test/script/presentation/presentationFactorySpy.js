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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.presentationFactorySpy = function() {
		var path = undefined;
		var cPresentation = undefined;
		var paths = [];
		var cPresentations = [];
		var cParentPresentations = [];
		var metadataIds = [];
		function factor(pathIn, metadataIdIn, cPresentationIn, cParentPresentationIn) {
			path = pathIn;
			paths.push(pathIn);
			cPresentation = cPresentationIn;
			cPresentations.push(cPresentationIn);
			cParentPresentations.push(cParentPresentationIn);
			metadataIds.push(metadataIdIn);
			return {
				"getView" : function() {
					var span = document.createElement("span");
					span.path = pathIn;
					span.cPresentation = cPresentationIn;
					return span;
				}
			};
		}
		
		function getPath(){
			return path;
		}
		function getCPresentation(){
			return cPresentation;
		}
		function getCPresentations(){
			return cPresentations;
		}
		function getCParentPresentations(){
			return cParentPresentations;
		}
		function getMetadataIds(){
			return metadataIds;
		}
		function getDataDivider(){
			return "systemX";
		}
		
		return Object.freeze({
			factor : factor,
			getPath:getPath,
			getCPresentation: getCPresentation,
			getCPresentations: getCPresentations,
			getCParentPresentations: getCParentPresentations,
			getMetadataIds:getMetadataIds,
			getDataDivider : getDataDivider
		});
	};
	return coraTest;
}(CORATEST || {}));