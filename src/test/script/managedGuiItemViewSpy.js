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
	coraTest.managedGuiItemViewSpy = function(dependencies, spec) {
		var addedChildren = [];
		var removedChildren = [];
		var movedChildren = [];
		var menuView = CORA.gui.createSpanWithClassName("managedGuiItemMenuViewSpyView");
		var workView = CORA.gui.createSpanWithClassName("managedGuiItemWorkViewSpyView");

		
		function getMenuView() {
			return menuView;
		}
		
		function getWorkView() {
			return workView;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		
		
		var out = Object.freeze({
			"type" : "managedGuiItemViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
		});
		return out;
	};
	return coraTest;
}(CORATEST));
