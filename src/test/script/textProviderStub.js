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
	coraTest.textProviderStub = function() {

		function getTranslation(textId) {
			switch (textId) {
			case "textVariableIdText":
				return "Exempel textvariabel";
				// "Example text variable"

			case "textVariableIdDefText":
				return "Detta är en exempeldefinition för en textvariabel.";
				// This is an example definition for a text variable.

			case "textVariableId2Text":
				return "Exempel textvariabel";
				// "Example text variable"

			case "textVariableId2DefText":
				return "Detta är en exempeldefinition för en textvariabel.";
				// This is an example definition for a text variable.

			case "textVarText":
				return "Exempel textvar";
				// "Example text variable"

			case "textVarDefText":
				return "Detta är en exempeldefinition för en textvar.";
				// This is an example definition for a text variable.

			case "aHeadlineText":
				return "En rubrik";
				// A headline

			case "yesNoUnknownVarText":
				return "Exempel collectionVariable";

			case "yesNoUnknownVarDefText":
				return "Exempel collectionVariable, är en variabel där man kan välja mellan ja, nej och okänt";

			case "itemYesText":
				return "Ja";

			case "itemNoText":
				return "Nej";

			case "itemUnknownText":
				return "Okänt";

			case "initialEmptyValueText":
				return "-- Gör ett val ur listan --";
				
			case "enterTextHereText":
				return "Skriv din text här";
				
			case "linkedRecordIdText":
				return "PostId";
				
			case "linkedRepeatIdText":
				return "RepeatId";	
				
			default:
				console.log("Id(" + textId + ") not found in stub");
				throw new Error("Id(" + textId + ") not found in stub");
			}

			return text;
		}

		return Object.freeze({
			getTranslation : getTranslation
		});
	};
	return coraTest;
}(CORATEST || {}));