/*
 * Copyright 2016, 2018 Olov McKie
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
			// "inputType" : "input",
			// "outputFormat" : "text",
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

// QUnit.test("testStateShownInClassName", function(assert) {
// var pMapView = this.getPMapView();
// var view = this.getView();
// var infoSpy = this.dependencies.infoFactory.getFactored(0);
// assert.strictEqual(view.className, "pMap somePresentationId");
// pMapView.setState("error");
// assert.strictEqual(view.className, "pMap somePresentationId error");
// pMapView.setState("errorStillFocused");
// assert.strictEqual(view.className, "pMap somePresentationId errorStillFocused");
// pMapView.setState("error");
// infoSpy.setInfoLevel(1);
// pMapView.updateClassName();
// assert.strictEqual(view.className,
// "pMap somePresentationId error infoActive");
// pMapView.setState("ok");
// assert.strictEqual(view.className, "pMap somePresentationId infoActive");
// });

QUnit
		.test(
				"testMapPart",
				function(assert) {
					var valueView = this.getValueView();
					assert.strictEqual(valueView.nodeName, "DIV");
					assert.strictEqual(valueView.className.substring(0, 7), "coraMap");
					assert.strictEqual(valueView.childNodes[1].className,
							"leaflet-control-container");

					var mapO = valueView.modelObject;

					assert.strictEqual(mapO.getCenter().lat, 61.7);
					assert.strictEqual(mapO.getCenter().lng, 15.0);
					assert.strictEqual(mapO.getZoom(), 4);

					// console.log("center:", mapO.getCenter());
					// console.log("lat:", mapO.getCenter().lat);
					// console.log("lng:", mapO.getCenter().lng);
					// console.log("zoom:", mapO.getZoom());

					// mapO.setView([ 23.4, 19.2 ]);
					// console.log("center:", mapO.getCenter());
					// console.log("lat:", mapO.getCenter().lat);
					// console.log("lng:", mapO.getCenter().lng);
					// console.log("zoom:", mapO.getZoom());

					// var layer = mapO.getLayer(0);
					var marker = L.marker(mapO.getCenter());
					marker.addTo(mapO);

					var layers = [];
					mapO.eachLayer(function(layer) {
						// console.log(layer);
						layers.push(layer);
					})
					// console.log("layers",layers)
					var openstreetmapLayer = layers[0];
					assert.strictEqual(openstreetmapLayer._url,
							'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

					var expectedAttribution = 'Map data &copy;'
							+ '<a href="https://www.openstreetmap.org/">'
							+ 'OpenStreetMap</a> contributors';

					assert.strictEqual(openstreetmapLayer.getAttribution(), expectedAttribution);

					var minimap = valueView.minimap;
					console.log(minimap)
					// assert.strictEqual(minimap.getCenter().lat, 61.7);
					// assert.strictEqual(minimap.getCenter().lng, 15.0);
					// assert.strictEqual(minimap.getZoom(), 4);
					// var miniLayers = [];
					// minimap.eachLayer(function(layer) {
					// // console.log(layer);
					// miniLayers.push(layer);
					// })
					// console.log("layers",layers)
					var miniOpenstreetmapLayer = minimap._layer;
					assert.strictEqual(miniOpenstreetmapLayer._url,
							'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
//					assert.strictEqual(miniOpenstreetmapLayer._subdomains,
//					'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
					
					// minimap.
					var shouldBeValueViewContainerIfMinimapAddedToMap = minimap.getContainer().parentNode.parentNode.parentNode;
					assert.strictEqual(shouldBeValueViewContainerIfMinimapAddedToMap, valueView);
					// var expectedAttribution = 'Map data &copy;'
					// + '<a href="https://www.openstreetmap.org/">'
					// + 'OpenStreetMap</a> contributors';

					// assert.strictEqual(openstreetmapLayer.getAttribution(), expectedAttribution);

				});

// QUnit.test("testInputUnknownTypeIsText", function(assert) {
// this.spec.inputType = undefined;
// var valueView = this.getValueView();
// assert.strictEqual(valueView.nodeName, "INPUT");
// assert.strictEqual(valueView.type, "text");
// });
//
// QUnit.test("testInputTypeTextArea", function(assert) {
// this.spec.inputType = "textarea";
// var valueView = this.getValueView();
// assert.strictEqual(valueView.nodeName, "TEXTAREA");
// assert.strictEqual(valueView.type, "textarea");
// });
//
// QUnit.test("testInputPlaceholder", function(assert) {
// this.spec.placeholderText = "placeholderText";
// var valueView = this.getValueView();
// assert.strictEqual(valueView.placeholder, "placeholderText");
// });
//
// QUnit.test("testInputOnblur", function(assert) {
// var valueFromView = "";
// this.spec.onblurFunction = function(value) {
// valueFromView = value;
// };
//
// var pMapView = this.getPMapView();
// pMapView.setValue("a Value");
// var valueView = this.getValueView();
// CORATESTHELPER.simulateBlur(this.getValueView());
// assert.strictEqual(valueFromView, "a Value");
// });
// QUnit.test("testInputOnblurNotSet", function(assert) {
// var valueFromView = "";
//	
// var pMapView = this.getPMapView();
// pMapView.setValue("a Value");
// var valueView = this.getValueView();
// CORATESTHELPER.simulateBlur(this.getValueView());
// assert.strictEqual(valueFromView, "");
// });
//
// QUnit.test("testInputOnkeyup", function(assert) {
// var valueFromView = "";
// this.spec.onkeyupFunction = function(value) {
// valueFromView = value;
// };
//	
// var pMapView = this.getPMapView();
// pMapView.setValue("a Value");
// var valueView = this.getValueView();
//	
// CORATESTHELPER.simulateKeyup(this.getValueView(), "a");
//	
// assert.strictEqual(valueFromView, "a Value");
// });
//
// QUnit.test("testInputOnkeyupNotSet", function(assert) {
// var valueFromView = "";
//	
// var pMapView = this.getPMapView();
// pMapView.setValue("a Value");
// var valueView = this.getValueView();
//	
// CORATESTHELPER.simulateKeyup(this.getValueView(), "a");
//	
// assert.strictEqual(valueFromView, "");
// });
//
// QUnit.test("testOutputText", function(assert) {
// this.spec.mode = "output";
// var valueView = this.getValueView();
// assert.strictEqual(valueView.nodeName, "SPAN");
// });
//
// QUnit.test("testOutputImage", function(assert) {
// this.spec.mode = "output";
// this.spec.outputFormat = "image";
// var valueView = this.getValueView();
// assert.strictEqual(valueView.nodeName, "IMG");
// });
//
// QUnit.test("testSetValueInput", function(assert) {
// var pMapView = this.getPMapView();
// var valueView = this.getValueView();
//
// assert.strictEqual(valueView.value, "");
// pMapView.setValue("a Value");
// assert.strictEqual(valueView.value, "a Value");
// });
//
// QUnit.test("testSetValueOutputText", function(assert) {
// this.spec.mode = "output";
// var pMapView = this.getPMapView();
// var valueView = this.getValueView();
//
// assert.strictEqual(valueView.innerHTML, "");
// pMapView.setValue("a Value");
// assert.strictEqual(valueView.innerHTML, "a Value");
// });
//
// QUnit.test("testSetValueOutputImage", function(assert) {
// this.spec.mode = "output";
// this.spec.outputFormat = "image";
// var pMapView = this.getPMapView();
// var valueView = this.getValueView();
//
// assert.strictEqual(valueView.src, "");
// pMapView.setValue("http://www.some.domain.nu/image01.jpg");
// assert.strictEqual(valueView.src, "http://www.some.domain.nu/image01.jpg");
// });
