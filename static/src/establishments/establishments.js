'use strict';
(function() {
    define([
        'src/establishments/controllers/EstablishmentsListController',
        'src/establishments/services/apiEstablishments',
        'ngRoute',
        'ngSanitize',
        'ngBootstrap',
        'ngBootstrapTpls',
        'ngAnimate',
        'ngTouch',
        'duScroll',
        'rzModule'
    ], function(
        EstablishmentsListController,
        apiEstablishments) {
        var appName = 'establishments';
        var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'duScroll', 'rzModule']);
        app.controller('EstablishmentsListController', EstablishmentsListController);
        app.service('apiEstablishments', apiEstablishments);

        app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/travel/ng-template/establishments/list'
                })
                .otherwise({redirectTo: '/'});
        });

        return appName;
    });
})();