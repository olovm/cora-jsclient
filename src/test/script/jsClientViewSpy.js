/*
 * Copyright 2016, 2017 Uppsala University Library
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
	coraTest.jsClientViewSpy = function(spec) {
		var searchViews = [];
		var recordTypeViews = [];
		var loginManagerViews = [];
		var workViews = [];
		var removedWorkViews = [];
		var recordTypesClearedNoOfTimes = 0;
		var html = CORA.gui.createSpanWithClassName("jsClientViewSpy");
		function getHtml() {
			return html;
		}
		var view = CORA.gui.createSpanWithClassName("jsClientViewSpy");
		function getView() {
			return view;
		}
		function addToSearchesView(searchView) {
			searchViews.push(searchView);
		}
		function getSearchesView(number) {
			return searchViews[number];
		}
		function addToRecordTypesView(recordTypeView) {
			recordTypeViews.push(recordTypeView);
		}
		function getRecordTypesView(number) {
			return recordTypeViews[number];
		}

		function addLoginManagerView(viewToAdd) {
			loginManagerViews.push(viewToAdd);
		}
		function getLoginManagerView(number) {
			return loginManagerViews[number];
		}

		var workView = CORA.gui.createSpanWithClassName("workViewSpy");
		function addToWorkView(viewToAdd) {
			workView.appendChild(viewToAdd);
			workViews.push(viewToAdd);
		}

		function getAddedWorkView(number) {
			return workViews[number];
		}

		function getWorkView() {
			return workView;
		}
		function addGlobalView() {
			// return workView;
		}
		function clearRecordTypesView() {
			recordTypesClearedNoOfTimes++;
			recordTypeViews = [];
		}
		function getRecordTypesClearedNoOfTimes() {
			return recordTypesClearedNoOfTimes;
		}
		
		function removeFromWorkView(viewToRemove){
			removedWorkViews.push(viewToRemove);
		}
		function getRemovedWorkView(number){
			return removedWorkViews[number];
		}
		var out = Object.freeze({
			"type" : "jsClientViewSpy",
			getView : getView,
			addToSearchesView : addToSearchesView,
			getSearchesView : getSearchesView,
			addToRecordTypesView : addToRecordTypesView,
			getRecordTypesView : getRecordTypesView,
			addLoginManagerView : addLoginManagerView,
			getLoginManagerView : getLoginManagerView,
			clearRecordTypesView : clearRecordTypesView,
			getRecordTypesClearedNoOfTimes : getRecordTypesClearedNoOfTimes,
			getWorkView : getWorkView,
			addToWorkView : addToWorkView,
			getAddedWorkView : getAddedWorkView,
			addGlobalView : addGlobalView,
			removeFromWorkView : removeFromWorkView,
			getRemovedWorkView : getRemovedWorkView
		});

		return out;
	};
	return coraTest;
}(CORATEST));
