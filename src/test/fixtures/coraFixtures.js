var CORAFIXTURES = (function(coraFixtures) {
	"use strict";
	coraFixtures.coraData = function() {
		var firstChild = {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "1"
		};
		var secondChild = {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "2"
		};
		var dataOneLevel = {
			"name" : "groupIdOneTextChild",
			"children" : [ firstChild, secondChild ]
		};
		var coraData = CORA.coraData(dataOneLevel);

		function setTrams() {

		}
		function getStuff() {
//			return "blaaaaaaa";
			return JSON.stringify(coraData.getFirstChildByNameInData("textVariableId"));
		}
		return Object.freeze({
			setTrams : setTrams,
			getStuff : getStuff
		});
	};

	return coraFixtures;
}({}));