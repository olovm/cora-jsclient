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
	coraTest.managedGuiItemSpy = function(dependencies, spec) {
		var addedMenuPresentations = [];
		var addedWorkPresentations = [];
		var menuView = CORA.gui.createSpanWithClassName("menuViewSpy");
		var workView = CORA.gui.createSpanWithClassName("menuViewSpy");
		var changed = false;
		var active = false;
		
		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function getMenuView() {
			return menuView;
		}

		function getWorkView() {
			return workView;
		}
		function handleBy(someThing) {
			// spec.handleBy(someThing);
		}

		function addMenuPresentation(presentationToAdd) {
			addedMenuPresentations.push(presentationToAdd);
		}

		function getAddedMenuPresentation(number){
			return addedMenuPresentations[number];
		}
		
		function addWorkPresentation(presentationToAdd) {
			addedWorkPresentations.push(presentationToAdd);
		}
		
		function getAddedWorkPresentation(number){
			return addedWorkPresentations[number];
		}
		function setChanged(changedIn){
			changed = changedIn;
		}
		function getChanged(){
			return changed;
		}
		function setActive(activeIn){
			active = activeIn
		}
		function getActive(){
			return active;
		}
		var out = Object.freeze({
			"type" : "managedGuiItemSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			handleBy : handleBy,
			addMenuPresentation : addMenuPresentation,
			getAddedMenuPresentation:getAddedMenuPresentation,
			addWorkPresentation : addWorkPresentation,
			getAddedWorkPresentation:getAddedWorkPresentation,
			setChanged:setChanged,
			getChanged:getChanged,
			setActive:setActive,
			getActive:getActive
		});
		
		return out;
	};
	return coraTest;
}(CORATEST));
