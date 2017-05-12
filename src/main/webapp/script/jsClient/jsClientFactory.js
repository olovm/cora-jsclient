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
	cora.jsClientFactory = function(providers, dependencies) {

		var jsClient;
		function factor(jsClientSpec) {

			var factories = {};

			var authTokenHolder = dependencies.authTokenHolder;
			var xmlHttpRequestFactory = CORA.xmlHttpRequestFactory();
			var ajaxCallFactoryDependencies = {
				"xmlHttpRequestFactory" : xmlHttpRequestFactory,
				"authTokenHolder" : authTokenHolder
			};
			var ajaxCallFactory = CORA.ajaxCallFactory(ajaxCallFactoryDependencies);

			var appTokenLoginFactoryDependencies = {
				"ajaxCallFactory" : ajaxCallFactory
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
				"textProvider" : providers.textProvider
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

			var depRecordHandler = {
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory,
				"managedGuiItemFactory" : managedGuiItemFactory
			};
			var recordHandlerFactory = CORA.recordHandlerFactory(depRecordHandler);

			var depResultHandler = {
				"textProvider" : providers.textProvider,
				"recordHandlerFactory" : recordHandlerFactory
			};
			var resultHandlerFactory = CORA.resultHandlerFactory(depResultHandler);

			var searchRecordHandlerViewFactory = CORA.searchRecordHandlerViewFactory({});
			var searchRecordHandlerFactoryDep = {
				"searchRecordHandlerViewFactory" : searchRecordHandlerViewFactory,
				"textProvider" : providers.textProvider,
				"ajaxCallFactory" : ajaxCallFactory,
				"recordGuiFactory" : recordGuiFactory
			};
			var searchRecordHandlerFactory = CORA
					.searchRecordHandlerFactory(searchRecordHandlerFactoryDep);

			var depRecordListHandler = {
				"factories" : factories
			};
			var recordListHandlerFactory = CORA.recordListHandlerFactory(depRecordListHandler);

			var recordTypeHandlerViewFactory = CORA.recordTypeHandlerViewFactory();

			var dependenciesRTH = {
				"factories" : factories
			};
			var recordTypeHandlerFactory = CORA.recordTypeHandlerFactory(dependenciesRTH);

			factories.ajaxCallFactory = ajaxCallFactory;
			factories.appTokenLoginFactory = appTokenLoginFactory;
			factories.openGuiItemHandlerFactory = openGuiItemHandlerFactory;
			factories.managedGuiItemFactory = managedGuiItemFactory;
			factories.recordGuiFactory = recordGuiFactory;
			factories.resultHandlerFactory = resultHandlerFactory;
			factories.searchRecordHandlerFactory = searchRecordHandlerFactory;
			factories.searchRecordHandlerViewFactory = searchRecordHandlerViewFactory;
			factories.recordTypeHandlerFactory = recordTypeHandlerFactory;
			factories.recordHandlerFactory = recordHandlerFactory;
			factories.recordListHandlerFactory = recordListHandlerFactory;
			factories.recordTypeHandlerViewFactory = recordTypeHandlerViewFactory;

			var dep = {
				"factories" : factories,
				"recordTypeProvider" : providers.recordTypeProvider,
				"authTokenHolder" : authTokenHolder,
				"jsClientViewFactory" : CORA.jsClientViewFactory(),
				"ajaxCallFactory" : ajaxCallFactory,
				"appTokenLoginFactory" : appTokenLoginFactory,
				"loginManagerFactory" : loginManagerFactory,
				"openGuiItemHandlerFactory" : openGuiItemHandlerFactory,
				"uploadManager" : uploadManager,
				"searchRecordHandlerFactory" : searchRecordHandlerFactory,
				"recordTypeHandlerFactory" : CORA.recordTypeHandlerFactory(dependenciesRTH),
				"metadataProvider" : providers.metadataProvider,
				"textProvider" : providers.textProvider,
				"searchProvider" : providers.searchProvider
			};

			jsClient = CORA.jsClient(dep, jsClientSpec);
			return jsClient;
		}

		var out = Object.freeze({
			"type" : "jsClientFactory",
			factor : factor
		});
		return out;
	};
	return cora;
}(CORA));