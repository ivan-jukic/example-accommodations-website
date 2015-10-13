'use strict';
(function() {
    define([
        'src/establishments/controllers/EstablishmentsListController',
        'src/establishments/controllers/CarouselController',
        'src/establishments/services/apiEstablishments',
        'ngRoute',
        'ngSanitize',
        'ngBootstrap',
        'ngBootstrapTpls',
        'ngAnimate',
        'ngTouch',
        'duScroll'
    ], function(
        EstablishmentsListController,
        CarouselController,
        apiEstablishments) {
        var appName = 'establishments';
        var app = angular.module(appName, ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngAnimate', 'ngTouch', 'duScroll']);
        app.controller('EstablishmentsListController', EstablishmentsListController);
        app.controller('CarouselController', CarouselController);
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