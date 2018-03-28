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
"use strict";

QUnit.module("recordTypeSorterTest.js", {
	beforeEach : function() {
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var sorter = CORA.recordTypeSorter();
	assert.strictEqual(sorter.type, "recordTypeSorter");
});

QUnit.test("testSortList", function(assert) {
	var listToSort = createSearchListToSort();

	var sorter = CORA.recordTypeSorter();
	var sortedList = sorter.sortListUsingChildWithNameInData(listToSort, "searchGroup");
	console.log(JSON.stringify(sortedList))
	var firstGroup = sortedList["autocomplete"];
	assert.strictEqual(firstGroup.length, 2);
	assert.strictEqual(firstGroup[0], listToSort[0]);
	assert.strictEqual(firstGroup[1], listToSort[2]);

	var secondGroup = sortedList["publicSearch"];
	assert.strictEqual(secondGroup.length, 1);
	assert.strictEqual(secondGroup[0], listToSort[1]);
});

function createSearchListToSort(){
	var listToSort = [];
	listToSort.push(CORATEST.searchRecordList.dataList.data[0].record);
	listToSort.push(CORATEST.searchRecordList.dataList.data[1].record);
	listToSort.push(CORATEST.searchRecordList.dataList.data[2].record);
	return listToSort;
}

QUnit.test("testSortListRepeatableNameInData", function(assert) {
	var listToSort = createRecordTypeListToSort();

	var sorter = CORA.recordTypeSorter();
	var sortedList = sorter.sortListUsingChildWithNameInData(listToSort, "groupOfRecordType");

	var firstGroup = sortedList["presentation"];
	assert.strictEqual(firstGroup.length, 3);
	assert.strictEqual(firstGroup[0], listToSort[0]);
	assert.strictEqual(firstGroup[1], listToSort[2]);
	assert.strictEqual(firstGroup[1], listToSort[3]);

	var secondGroup = sortedList["metadata"];
	assert.strictEqual(secondGroup.length, 2);
	assert.strictEqual(secondGroup[0], listToSort[1]);

	var thirdGroup = sortedList["systemConfiguration"];
	assert.strictEqual(secondGroup.length, 1);
	assert.strictEqual(secondGroup[0], listToSort[1]);
});

function createRecordTypeListToSort(){
	var listToSort = [];
	listToSort.push(CORATEST.recordTypeList.dataList.data[0].record);
	listToSort.push(CORATEST.recordTypeList.dataList.data[1].record);
	listToSort.push(CORATEST.recordTypeList.dataList.data[2].record);
	listToSort.push(CORATEST.recordTypeList.dataList.data[3].record);
	return listToSort;
}

