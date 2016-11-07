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

QUnit.module("workItemViewTest.js", {
	beforeEach : function() {
		var factoredHolders = [];
		this.factoredHolders = factoredHolders;
		this.holderFactory = {
			"factor" : function(holderSpec) {
				var factoredHolder = CORA.holder(holderSpec);
				factoredHolders.push({
					"holderSpec" : holderSpec,
					"factoredHolder" : factoredHolder
				});
				return factoredHolder;
			}
		};

		this.workItemViewSpec = {
			"extraClassName" : "extraClassName",
			"holderFactory" : this.holderFactory
		};
		this.workItemView = CORA.workItemView(this.workItemViewSpec);
		this.view = this.workItemView.getView();
		this.topBar = this.view.childNodes[0];
		this.toolHolder = this.view.childNodes[1];
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.strictEqual(this.view.nodeName, "SPAN");
	assert.strictEqual(this.view.className, "workItem extraClassName");

	assert.strictEqual(this.view.childNodes.length, 2);

	assert.strictEqual(this.topBar.nodeName, "SPAN");
	assert.strictEqual(this.topBar.className, "topBar");
	assert.strictEqual(this.topBar.childNodes.length, 1);

	var factoredToolHolderSpec = this.factoredHolders[0].holderSpec;
	assert.strictEqual(factoredToolHolderSpec.className, "tool");
	assert.strictEqual(factoredToolHolderSpec.appendTo, this.view);

	assert.strictEqual(this.toolHolder.nodeName, "SPAN");
	assert.strictEqual(this.toolHolder.className, "holder tool");
	assert.strictEqual(this.toolHolder.childNodes.length, 0);
});

QUnit.test("addToolViewToToolHolder", function(assert) {
	var someToolView = document.createElement("span");
	this.workItemView.addToolViewToToolHolder(someToolView);

	assert.strictEqual(this.toolHolder.childNodes.length, 1);
	assert.strictEqual(this.toolHolder.childNodes[0], someToolView);
});

QUnit.test("addViewToView", function(assert) {
	var someView = document.createElement("span");
	this.workItemView.addViewToView(someView);
	
	assert.strictEqual(this.view.childNodes.length, 3);
	assert.strictEqual(this.view.childNodes[2], someView);
});