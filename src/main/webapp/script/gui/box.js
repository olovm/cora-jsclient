/*
 * Copyright 2019 Uppsala University Library
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
var CORA = (function (cora) {
    "use strict";
    cora.gui.box = function (view) {
        var view = view;
        var out = {};

        out.clearHideTimeout = function () {
            if (out.hideIfTransitionendNotCalled) {
                window.clearTimeout(out.hideIfTransitionendNotCalled);
            }
        };

        out.hide = function () {
            out.clearHideTimeout();
            view.className = view.className + " hidden";
        };

        out.hideWithEffect = function () {
            out.hideIfTransitionendNotCalled = window.setTimeout(function () {
                view.modelObject.hide();
            }, 1000);
            view.addEventListener("transitionend", function () {
                view.modelObject.hide();
            }, true);
            view.className = view.className + " toBeRemoved";
        };

        out.getView = function () {
            return view;
        };

        return out;

    };

    return cora;
}(CORA));