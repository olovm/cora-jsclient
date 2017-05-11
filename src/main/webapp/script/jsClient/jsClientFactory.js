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
var CORA = (function(cora) {
	"use strict";
	cora.jsClientFactory = function(providers) {

		function factor(jsClientSpec) {
			var jsClient;

			var authTokenHolder = CORA.authTokenHolder();
			var xmlHttpRequestFactory = CORA.xmlHttpRequestFactory();
			var ajaxCallFactoryDependencies = {
				"xmlHttpRequestFactory" : xmlHttpRequestFactory,
				"authTokenHolder" : authTokenHolder
			};
			var ajaxCallFactory = CORA.ajaxCallFactory(ajaxCallFactoryDependencies);

			var appTokenLoginFactoryDependencies = {
				"ajaxCallFactory" : ajaxCallFactory,
			};
			var appTokenLoginFactory = CORA.appTokenLoginFactory(appTokenLoginFactoryDependencies);

			var loginManagerFactoryDependencies = {
				"authTokenHolder" : authTokenHolder,
				"textProvider" : providers.textProvider,
				"appTokenLoginFactory" : appTokenLoginFactory,
				"ajaxCallFactory" : ajaxCallFactory
			};
			var loginManagerFactory = CORA.loginManagerFactory(loginManagerFactoryDependencies);

			var openGuiItemHandlerFactoryDep = {
				"textProvider" : providers.textProvider,
			};
			var openGuiItemHandlerFactory = CORA
					.openGuiItemHandlerFactory(openGuiItemHandlerFactoryDep);

			var managedGuiItemFactory = CORA.managedGuiItemFactory();
			var uploadManagerDep = {
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"managedGuiItemFactory" : managedGuiItemFactory
			};
			var uploadManagerFactory = CORA.uploadManagerFactory(uploadManagerDep);

			var uploadManagerSpec = {
				"showView" : function(viewToShow) {
					jsClient.showView(viewToShow);
				}
			};
			var uploadManager = uploadManagerFactory.factor(uploadManagerSpec);

			var recordGuiFactoryDep = {
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"metadataProvider" : providers.metadataProvider,
				"authTokenHolder" : authTokenHolder,
				"recordTypeProvider" : providers.recordTypeProvider,
				"uploadManager" : uploadManager
			};
			var recordGuiFactory = CORA.recordGuiFactory(recordGuiFactoryDep);

			var searchRecordHandlerViewFactory = CORA.searchRecordHandlerViewFactory({});
			var searchRecordHandlerFactoryDep = {
				"searchRecordHandlerViewFactory" : searchRecordHandlerViewFactory,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			var searchRecordHandlerFactory = CORA
					.searchRecordHandlerFactory(searchRecordHandlerFactoryDep);

			var dependenciesRTH = {
				"recordGuiFactory" : recordGuiFactory,
				"jsClient" : jsClient,
				"ajaxCallFactory" : ajaxCallFactory,
			};
			var recordTypeHandlerFactory = CORA.recordTypeHandlerFactory(dependenciesRTH);

			var dep = {
				"factories" : {
					"ajaxCallFactory" : ajaxCallFactory,
					"appTokenLoginFactory" : appTokenLoginFactory,
					"openGuiItemHandlerFactory" : openGuiItemHandlerFactory,
					"managedGuiItemFactory" : managedGuiItemFactory,
					"recordGuiFactory" : recordGuiFactory,
					"searchRecordHandlerFactory" : searchRecordHandlerFactory,
					"searchRecordHandlerViewFactory" : searchRecordHandlerViewFactory,
					"recordTypeHandlerFactory" : CORA.recordTypeHandlerFactory(dependenciesRTH)
				},
				"recordTypeProvider" : providers.recordTypeProvider,
				"authTokenHolder" : authTokenHolder,
				"jsClientViewFactory" : CORA.jsClientViewFactory(),
				"ajaxCallFactory" : ajaxCallFactory,
				"appTokenLoginFactory" : appTokenLoginFactory,
				"loginManagerFactory" : loginManagerFactory,
				"openGuiItemHandlerFactory" : openGuiItemHandlerFactory,
				"uploadManager" : uploadManager,
				"searchRecordHandlerFactory" : searchRecordHandlerFactory,
				"recordTypeHandlerFactory" : CORA.recordTypeHandlerFactory(dependenciesRTH)
			};
			// return CORA.jsClient(dep, jsClientSpec);
			jsClient = {
				"type" : "jsClient",
				"getDependencies" : function() {
					return dep
				},
				"showView" : {}
			};
			return jsClient;
		}

		// function getproviders() {
		// return providers;
		// }

		var out = Object.freeze({
			"type" : "jsClientFactory",
			// getproviders : getproviders,
			factor : factor
		});
		return out;
	};
	return cora;
}(CORA));