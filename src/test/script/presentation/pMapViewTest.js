/*
 * Copyright 2018 Olov McKie
 * Copyright 2018 Uppsala University Library
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

QUnit.module("pMapViewTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"infoFactory" : CORATEST.infoFactorySpy()
		};
		this.textIdOnclickMethod = {};
		this.defTextIdOnclickMethod = {
			"tramas" : "trams"
		};
		this.spec = {
			"mode" : "input",
			"presentationId" : "somePresentationId",
			"info" : {
				"text" : "someText",
				"defText" : "someDefText",
				"technicalInfo" : [ {
					"text" : "textId: " + "textId",
					"onclickMethod" : this.textIdOnclickMethod
				}, {
					"text" : "defTextId: " + "defTextId",
					"onclickMethod" : this.defTextIdOnclickMethod
				}, {
					"text" : "metadataId: " + "metadataId"
				} ]
			}
		};

		this.pMapView;
		this.getPMapView = function() {
			if (this.pMapView === undefined) {
				this.pMapView = CORA.pMapView(this.dependencies, this.spec);
			}
			return this.pMapView;
		};
		this.getView = function() {
			if (this.pMapView === undefined) {
				this.pMapView = CORA.pMapView(this.dependencies, this.spec);
			}
			return this.pMapView.getView();
		};
		this.getValueView = function() {
			if (this.pMapView === undefined) {
				this.pMapView = CORA.pMapView(this.dependencies, this.spec);
			}
			return this.pMapView.getView().childNodes[1];
		};
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	var pMapView = this.getPMapView();
	assert.strictEqual(pMapView.type, "pMapView");
	assert.ok(this.pMapView);
});

QUnit.test("getSpec", function(assert) {
	var pMapView = this.getPMapView();
	assert.strictEqual(pMapView.getSpec(), this.spec);
});

QUnit.test("getDependencies", function(assert) {
	var pMapView = this.getPMapView();
	assert.strictEqual(pMapView.getDependencies(), this.dependencies);
});

QUnit.test("getView", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.nodeName, "SPAN");
});

QUnit.test("testClassName", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.className, "pMap somePresentationId");
});

QUnit.test("testInfoSpec", function(assert) {
	var expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ],
		"level2" : [ {
			"className" : "technicalView",
			"text" : "textId: textId",
			"onclickMethod" : this.textIdOnclickMethod
		}, {
			"className" : "technicalView",
			"text" : "defTextId: defTextId",
			"onclickMethod" : this.defTextIdOnclickMethod
		}, {
			"className" : "technicalView",
			"text" : "metadataId: metadataId"
		} ]
	};
	var pMapView = this.getPMapView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
	assert.strictEqual(usedSpec.appendTo, this.getView());
	assert.strictEqual(usedSpec.afterLevelChange, pMapView.updateClassName);
	assert.strictEqual(usedSpec.level2[0].onclickMethod, this.textIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[1].onclickMethod, this.defTextIdOnclickMethod);
	assert.strictEqual(usedSpec.level2[2].onclickMethod, undefined);

});
QUnit.test("testInfoButtonAddedToView", function(assert) {
	var view = this.getView();
	assert.strictEqual(view.childNodes[2].className, "infoButtonSpy");
	// assert.strictEqual(view.childNodes[1].className, "infoButtonSpy");

});

QUnit.test("testInfoSpecNoTechnicalPart", function(assert) {
	this.spec.info.technicalInfo = null;
	var expectedSpec = {
		"appendTo" : {},
		"level1" : [ {
			"className" : "textView",
			"text" : "someText"
		}, {
			"className" : "defTextView",
			"text" : "someDefText"
		} ]
	};
	var pMapView = this.getPMapView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	var usedSpec = infoSpy.getSpec();
	assert.stringifyEqual(usedSpec, expectedSpec);
});

QUnit.test("testInfoPlaced", function(assert) {
	var view = this.getView();
	var infoSpan = view.childNodes[0];
	assert.equal(infoSpan.className, "infoSpySpan");
});

QUnit.test("testActiveInfoShownInClassName", function(assert) {
	var pMapView = this.getPMapView();
	var view = this.getView();
	var infoSpy = this.dependencies.infoFactory.getFactored(0);
	assert.strictEqual(view.className, "pMap somePresentationId");
	infoSpy.setInfoLevel(0);
	pMapView.updateClassName();
	assert.strictEqual(view.className, "pMap somePresentationId");
	infoSpy.setInfoLevel(1);
	pMapView.updateClassName();
	assert.strictEqual(view.className, "pMap somePresentationId infoActive");
	infoSpy.setInfoLevel(0);
	pMapView.updateClassName();
	assert.strictEqual(view.className, "pMap somePresentationId");
});

QUnit.test("testStartMap", function(assert) {
	var valueView = this.getValueView();
	assert.strictEqual(valueView.nodeName, "DIV");
	assert.strictEqual(valueView.className.substring(0, 7), "coraMap");
	assert.strictEqual(valueView.childNodes[1], undefined);

	var pMapView = this.getPMapView();
	pMapView.startMap();

	assert.strictEqual(valueView.childNodes[1].className, "leaflet-control-container");
	var mapO = valueView.modelObject;

	assert.strictEqual(mapO.getCenter().lat, 61.7);
	assert.strictEqual(mapO.getCenter().lng, 15.0);
	assert.strictEqual(mapO.getZoom(), 4);

	var layers = [];
	mapO.eachLayer(function(layer) {
		layers.push(layer);
	})
	var openstreetmapLayer = layers[0];
	assert
			.strictEqual(openstreetmapLayer._url,
					'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

	var expectedAttribution = 'Map data &copy;' + '<a href="https://www.openstreetmap.org/">'
			+ 'OpenStreetMap</a> contributors';

	assert.strictEqual(openstreetmapLayer.getAttribution(), expectedAttribution);

	var minimap = valueView.minimap;
	var miniOpenstreetmapLayer = minimap._layer;
	assert.strictEqual(miniOpenstreetmapLayer._url,
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

	// minimap.
	var sbvvcimatm = minimap.getContainer().parentNode.parentNode.parentNode;
	var shouldBeValueViewContainerIfMinimapAddedToMap = sbvvcimatm;
	assert.strictEqual(shouldBeValueViewContainerIfMinimapAddedToMap, valueView);
});

QUnit.test("testSetMarker", function(assert) {
	var valueView = this.getValueView();
	var pMapView = this.getPMapView();
	pMapView.startMap();

	var marker = valueView.marker;
	assert.strictEqual(marker, undefined);
	var lat = 62.7;
	var lng = 16.0;
	pMapView.setMarker(lat, lng);
	
	var map = valueView.modelObject;
	assert.strictEqual(map.getCenter().lat, 62.7);
	assert.strictEqual(map.getCenter().lng, 16.0);
	assert.strictEqual(map.getZoom(), 10);

	marker = valueView.marker;
	assert.strictEqual(marker.getLatLng().lat, 62.7);
	assert.strictEqual(marker.getLatLng().lng, 16.0);

	var sbvvcimatm = marker.getElement().parentNode.parentNode.parentNode;
	var shouldBeValueViewContainerIfMarkerAddedToMap = sbvvcimatm;
	assert.strictEqual(shouldBeValueViewContainerIfMarkerAddedToMap, valueView);
});

QUnit.test("testRemoveMarker", function(assert) {
	var valueView = this.getValueView();
	var pMapView = this.getPMapView();
	pMapView.startMap();

	var marker = valueView.marker;
	assert.strictEqual(marker, undefined);
	var lat = 61.7;
	var lng = 15.0;
	pMapView.setMarker(lat, lng);

	marker = valueView.marker;

	var sbvvcimatm = marker.getElement().parentNode.parentNode.parentNode;
	var shouldBeValueViewContainerIfMarkerAddedToMap = sbvvcimatm;
	assert.strictEqual(shouldBeValueViewContainerIfMarkerAddedToMap, valueView);

	pMapView.removeMarker();

	assert.strictEqual(valueView.marker, undefined);
	
	assert.strictEqual(marker.getElement(), null);
	
	var map = valueView.modelObject;
	assert.strictEqual(map.getCenter().lat, 61.7);
	assert.strictEqual(map.getCenter().lng, 15.0);
	assert.strictEqual(map.getZoom(), 4);
});

QUnit.test("testMoveMarker", function(assert) {
	var valueView = this.getValueView();
	var pMapView = this.getPMapView();
	pMapView.startMap();

	var marker = valueView.marker;
	assert.strictEqual(marker, undefined);
	var lat = 62.7;
	var lng = 16.0;
	pMapView.setMarker(lat, lng);
	pMapView.setMarker(63.5, 16.4);
	
	var map = valueView.modelObject;
	assert.strictEqual(map.getCenter().lat, 63.5);
	assert.strictEqual(map.getCenter().lng, 16.4);
	assert.strictEqual(map.getZoom(), 10);

	marker = valueView.marker;
	assert.strictEqual(marker.getLatLng().lat, 63.5);
	assert.strictEqual(marker.getLatLng().lng, 16.4);

});

