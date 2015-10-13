'use strict';
(function(require) {
    require.config({
        baseUrl: '/',
        paths : {
            bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min',
            angular: 'vendor/angular/angular.min',
            ngBootstrap: 'vendor/angular-bootstrap/ui-bootstrap.min',
            ngBootstrapTpls: 'vendor/angular-bootstrap/ui-bootstrap-tpls.min',
            ngRoute: 'vendor/angular-route/angular-route.min',
            ngSanitize: 'vendor/angular-sanitize/angular-sanitize.min',
            ngAnimate: 'vendor/angular-animate/angular-animate.min',
            ngTouch: 'vendor/angular-touch/angular-touch.min',
            duScroll: 'vendor/angular-scroll/angular-scroll.min'
        },
        shim: {
            angular: {exports: 'angular'},
            ngBootstrap: {deps: ['angular']},
            ngBootstrapTpls: {deps: ['angular', 'ngBootstrap']},
            ngRoute: {deps: ['angular']},
            ngSanitize: {deps: ['angular']},
            ngAnimate: {deps: ['angular']},
            ngTouch: {deps: ['angular']},
            duScroll : {deps: ['angular']}
        },
        deps: ['src/index']
    });
})(require);