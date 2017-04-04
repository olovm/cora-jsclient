/*
 * Copyright 2017 Olov McKie
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
	// coraTest.recordGuiSpy = function(dependencies, spec) {
	coraTest.recordGuiSpy = function(metadataId, data, dataDivider) {
		var presentationIdUsed = [];
		var metadataIdsUsedInData = [];

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			// return spec;
			return {
				"metadataId" : metadataId,
				"data" : data,
				"dataDivider" : dataDivider
			};
		}
		var pubSub = CORATEST.pubSubSpy();

		var dataHolder = {
			"getData" : function() {
				return dataHolderData;
			}
		};
		function getPresentation(presentationId, metadataIdUsedInData) {
			presentationIdUsed.push(presentationId);
			metadataIdsUsedInData.push(metadataIdUsedInData);
			return CORATEST.presentationStub(presentationId);
		}
		function initMetadataControllerStartingGui() {
		}
		function validateData() {
			return true;
		}
		function getPresentationIdUsed(number) {
			return presentationIdUsed[number];
		}
		function getMetadataIdsUsedInData(number) {
			return metadataIdsUsedInData[number];
		}
		var out = Object
				.freeze({
					"type" : "recordGuiSpy",
					getDependencies : getDependencies,
					getSpec : getSpec,

					pubSub : pubSub,
					// jsBookkeeper : jsBookkeeper,
					// presentationFactory : presentationFactory,
					dataHolder : dataHolder,
					// getMetadataController : getMetadataController,
					getPresentation : getPresentation,
					initMetadataControllerStartingGui : initMetadataControllerStartingGui,
					validateData : validateData,
					getPresentationIdUsed : getPresentationIdUsed,
					getMetadataIdsUsedInData : getMetadataIdsUsedInData
				});
		return out;
	};
	return coraTest;
}(CORATEST));
