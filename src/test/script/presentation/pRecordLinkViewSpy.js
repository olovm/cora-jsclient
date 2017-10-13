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
	coraTest.pRecordLinkViewSpy = function(dependencies, spec) {
		var addedChildren = [];
		var addedLinkedPresentations = [];
		var addedToolViews = [];
		var childrenHidden = 0;
		var showDataF = null;
		// var view = document.createElement("span");
		var view = CORA.gui.createSpanWithClassName("pRecordLinkViewSpyView");
		var state;
		var value;

		var showOpenLinkedRecordCalled = 0;
		var hideOpenLinkedRecordCalled = 0;

		var addedSearchHandlerViews = [];

		function getView() {
			return view;
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function addChild(childToAdd) {
			addedChildren.push(childToAdd);
		}
		function getAddedChild(number) {
			return addedChildren[number];
		}

		function updateClassName() {
		}
		function hideChildren() {
			childrenHidden++;
		}
		function getChildrenHidden() {
			return childrenHidden;
		}
		function addLinkedPresentation(presentationToAdd) {
			addedLinkedPresentations.push(presentationToAdd);
		}
		function getAddedLinkedPresentation(number) {
			return addedLinkedPresentations[number];
		}

		function showOpenLinkedRecord() {
			showOpenLinkedRecordCalled++;
		}
		function getShowOpenLinkedRecord() {
			return showOpenLinkedRecordCalled;
		}
		function hideOpenLinkedRecord() {
			hideOpenLinkedRecordCalled++;
		}
		function getHideOpenLinkedRecord() {
			return hideOpenLinkedRecordCalled;
		}

		function addSearchHandlerView(searchHandlerToAdd) {
			addedSearchHandlerViews.push(searchHandlerToAdd);
		}
		function getAddedSearchHandlerView(number) {
			return addedSearchHandlerViews[number];
		}

		var out = Object.freeze({
			"type" : "pRecordLinkViewSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getView : getView,
			updateClassName : updateClassName,
			addChild : addChild,
			getAddedChild : getAddedChild,
			hideChildren : hideChildren,
			getChildrenHidden : getChildrenHidden,
			addLinkedPresentation : addLinkedPresentation,
			getAddedLinkedPresentation : getAddedLinkedPresentation,
			showOpenLinkedRecord : showOpenLinkedRecord,
			getShowOpenLinkedRecord : getShowOpenLinkedRecord,
			hideOpenLinkedRecord : hideOpenLinkedRecord,
			getHideOpenLinkedRecord : getHideOpenLinkedRecord,

			addSearchHandlerView : addSearchHandlerView,
			getAddedSearchHandlerView : getAddedSearchHandlerView
		});
		return out;
	};
	return coraTest;
}(CORATEST));
