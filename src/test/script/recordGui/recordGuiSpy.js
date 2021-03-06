/*
 * Copyright 2017 Olov McKie
 * Copyright 2017 Uppsala University Library
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
	coraTest.recordGuiSpy = function() {

		var presentationIdUsed = [];
		var metadataIdsUsedInData = [];
		var returnedPresentations = [];
		var initCalled = 0;
		var dataValidated = 0;
		var validateAnswer = true;
		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			// return spec;
			return {
				"metadataId" : "recordTypeGroup",
				"data" : {},
				"dataDivider":"cora"
			};
		}
		var pubSub = CORATEST.pubSubSpy();

		var dataHolder = CORATEST.dataHolderSpy();
		function getPresentationHolder(presentationId, metadataIdUsedInData) {
			presentationIdUsed.push(presentationId);
			metadataIdsUsedInData.push(metadataIdUsedInData);
			var pres = CORATEST.presentationStub(presentationId);
			returnedPresentations.push(pres);
			return pres;
		}
		function initMetadataControllerStartingGui() {
			initCalled++;
		}
		function getInitCalled() {
			return initCalled;
		}

		function validateData() {
			dataValidated++;
			return validateAnswer;
		}
		function setValidateAnswer(answer) {
			validateAnswer = answer;
		}
		function getDataValidated() {
			return dataValidated;
		}

		function getPresentationIdUsed(number) {
			return presentationIdUsed[number];
		}
		function getMetadataIdsUsedInData(number) {
			return metadataIdsUsedInData[number];
		}
		function getReturnedPresentations(number) {
			return returnedPresentations[number];
		}
		var out = Object.freeze({
			"type" : "recordGuiSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,

			pubSub : pubSub,
			// jsBookkeeper : jsBookkeeper,
			// presentationFactory : presentationFactory,
			dataHolder : dataHolder,
			// getMetadataController : getMetadataController,
			getPresentationHolder : getPresentationHolder,
			initMetadataControllerStartingGui : initMetadataControllerStartingGui,
			getInitCalled : getInitCalled,
			validateData : validateData,
			getDataValidated : getDataValidated,
			setValidateAnswer : setValidateAnswer,
			getPresentationIdUsed : getPresentationIdUsed,
			getMetadataIdsUsedInData : getMetadataIdsUsedInData,
			getReturnedPresentations : getReturnedPresentations
		});
		return out;
	};
	return coraTest;
}(CORATEST));
