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
"use strict";
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.textProviderFactory = function(metadataProvider) {
		var factor = function(lang) {
			var spec = {
				"metadataProvider" : metadataProvider,
				"lang" : lang
			};
			return CORA.textProvider(spec);
		};
		return Object.freeze({
			factor : factor
		});
	};
	return coraTest;
}(CORATEST || {}));

QUnit.module("CORA.textProvider", {
	beforeEach : function() {
		var metadataProvider = new MetadataProviderStub();
		this.textProviderFactory = CORATEST.textProviderFactory(metadataProvider);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var textProvider = this.textProviderFactory.factor("sv");
	assert.ok(textProvider !== null);
});

QUnit.test("testGetTranslation", function(assert) {
	var textProvider = this.textProviderFactory.factor("sv");
	var translation = textProvider.getTranslation("textVariableIdText");
	assert.deepEqual(translation, "Exempel textvariabel");
});
