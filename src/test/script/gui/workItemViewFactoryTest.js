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

QUnit.module("workItemViewFactoryTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var dependencies = {};
	var workItemViewFactory = CORA.workItemViewFactory(dependencies);
	assert.ok(workItemViewFactory);
});

QUnit.test("factor", function(assert) {
	var dependencies = {};
	var workItemViewFactory = CORA.workItemViewFactory(dependencies);
	var spec = {
		"extraClassName" : "someClass"
	};
	var workItemView = workItemViewFactory.factor(spec);
	assert.ok(workItemView);
	var workItemViewSpec = workItemView.getSpec();
	assert.strictEqual(workItemViewSpec.dependencies, dependencies);
	assert.strictEqual(workItemViewSpec.extraClassName, spec.extraClassName);
	assert.ok(workItemViewSpec.holderFactory);
	
});
