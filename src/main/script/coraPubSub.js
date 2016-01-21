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

var CORA = (function(cora) {
	"use strict";
	cora.PubSub = function() {
		var arbiter = Arbiter.create();
		this.subscribe = function(type, path, context, functionToCall) {
			arbiter.subscribe(this.convertPathToMsg(path)+type, null, context, functionToCall);
		}
		this.publish = function(type, data) {
			arbiter.publish(this.convertPathToMsg(data.path)+type, data);
		}

		this.convertPathToMsg = function(path) {
			return convertPathToMsg2(path, "root");
			// return JSON.stringify(path);
		}
		function convertPathToMsg2(path, msgPart) {
			var cPath = new CORA.CoraData(path);
			var msgPart2 = msgPart + "/";
			if (path.children !== undefined && cPath.containsChildWithNameInData("nameInData")) {
				msgPart2 += cPath.getFirstAtomicValueByNameInData("nameInData");

				if (cPath.containsChildWithNameInData("attributes")) {
					var attributes = cPath.getFirstChildByNameInData("attributes").children;
					attributes.forEach(function(attribute) {
						var cAttribute = new CORA.CoraData(attribute);
						msgPart2 += '#' + cAttribute.getFirstAtomicValueByNameInData("attributeName");
						msgPart2 += ':' + cAttribute.getFirstAtomicValueByNameInData("attributeValue");
					});
				}

				if (cPath.containsChildWithNameInData("repeatId")) {
					msgPart2 += '.' + cPath.getFirstAtomicValueByNameInData("repeatId");
				}
				
				if (cPath.containsChildWithNameInData("linkedPath")) {
					return convertPathToMsg2(cPath.getFirstChildByNameInData("linkedPath"), msgPart2);
				}else{
					msgPart2+=  "/";
				}
			}
			return msgPart2;
		}
	};

	return cora;
}(CORA || {}));