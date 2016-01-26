/*
 * Copyright 2016 Uppsala University Library
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

var CORA = (function(cora) {
	"use strict";
	cora.PubSub = function() {
		var arbiter = Arbiter.create();
		
		this.subscribe = function(type, path, context, functionToCall) {
			arbiter.subscribe(this.convertPathToMsg(path) + type, null, context, functionToCall);
		};

		this.publish = function(type, data) {
			arbiter.publish(this.convertPathToMsg(data.path) + type, data);
		};

		this.convertPathToMsg = function(path) {
			return convertAndAddPathToMsg(path, "root");
		};

		function convertAndAddPathToMsg(path, msgPart) {
			var cPath = new CORA.CoraData(path);
			var extendedMsgPart = msgPart + "/";
			if (pathHasAtLeastOneLevel(cPath)) {
				extendedMsgPart += recursivelyConvertPathToMsg(cPath);
			}
			return extendedMsgPart;
		}

		function pathHasAtLeastOneLevel(cPath) {
			return cPath.getData().children !== undefined
					&& cPath.containsChildWithNameInData("nameInData");
		}

		function recursivelyConvertPathToMsg(cPath) {
			var msgPart = "";
			msgPart += cPath.getFirstAtomicValueByNameInData("nameInData");
			msgPart += convertPathAttributes(cPath);
			msgPart += convertRepeatId(cPath);

			if (pathHasMoreLevels(cPath)) {
				return convertAndAddPathToMsg(cPath.getFirstChildByNameInData("linkedPath"),
						msgPart);
			}
			msgPart += "/";
			return msgPart;
		}

		function pathHasMoreLevels(cPath) {
			return cPath.containsChildWithNameInData("linkedPath");
		}

		function convertPathAttributes(cPath) {
			var msgAttribPart = "";
			if (cPath.containsChildWithNameInData("attributes")) {
				var attributes = cPath.getFirstChildByNameInData("attributes").children;
				attributes.forEach(function(attribute) {
					var cAttribute = new CORA.CoraData(attribute);
					msgAttribPart += '#'
							+ cAttribute.getFirstAtomicValueByNameInData("attributeName");
					msgAttribPart += ':'
							+ cAttribute.getFirstAtomicValueByNameInData("attributeValue");
				});
			}
			return msgAttribPart;
		}

		function convertRepeatId(cPath) {
			if (cPath.containsChildWithNameInData("repeatId")) {
				return '.' + cPath.getFirstAtomicValueByNameInData("repeatId");
			}
			return "";
		}
	};
	return cora;
}(CORA || {}));