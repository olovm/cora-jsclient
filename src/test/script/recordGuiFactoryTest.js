/*
 * Copyright 2016 Uppsala University Library
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
QUnit.module("recordGuiFactoryTest.js", {
	beforeEach : function() {
		var dependencies = {
			"metadataProvider" : new MetadataProviderStub(),
			"textProvider" : CORATEST.textProviderStub()
		}
		this.recordGuiFactory = CORA.recordGuiFactory(dependencies);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	assert.notStrictEqual(this.recordGuiFactory.factor, undefined);
});

QUnit.test("testFactor", function(assert) {
	var metadataId = "groupIdOneTextChild";
	var recordGui = this.recordGuiFactory.factor(metadataId, undefined);

	assert.notStrictEqual(recordGui.getPresentation, undefined);
	assert.notStrictEqual(recordGui.initMetadataControllerStartingGui, undefined);

	assert.notStrictEqual(recordGui.pubSub, undefined);
	assert.notStrictEqual(recordGui.jsBookkeeper, undefined);
	assert.notStrictEqual(recordGui.presentationFactory, undefined);
	assert.notStrictEqual(recordGui.dataHolder, undefined);
	assert.strictEqual(recordGui.metadataController, undefined);

});

QUnit.test("testFactorGetPresentation", function(assert) {
	var metadataId = "groupIdOneTextChild";
	var recordGui = this.recordGuiFactory.factor(metadataId, undefined);

	var presentation = recordGui.getPresentation("pgGroupIdOneTextChild");

	assert.notStrictEqual(presentation.getView, undefined);

});

QUnit.test("testFactorInitMetadataControllerStartingGui", function(assert) {
	var metadataId = "groupIdOneTextChild";
	var recordGui = this.recordGuiFactory.factor(metadataId, undefined);

	recordGui.initMetadataControllerStartingGui();
	assert.notStrictEqual(recordGui.getMetadataController(), undefined);
});